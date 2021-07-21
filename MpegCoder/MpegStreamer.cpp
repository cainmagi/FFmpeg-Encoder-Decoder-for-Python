#define NO_IMPORT_ARRAY
#define PY_ARRAY_UNIQUE_SYMBOL MPEGARRAY_API
#define NPY_NO_DEPRECATED_API NPY_1_7_API_VERSION
#include <numpy/arrayobject.h>
#include "MpegCoder.h"
#include "MpegStreamer.h"

cmpc::CMpegClient::CMpegClient(void):
    videoPath(), width(0), height(0), widthDst(0), heightDst(0),
    PPixelFormat(AVPixelFormat::AV_PIX_FMT_NONE), PFormatCtx(nullptr), PCodecCtx(nullptr),
    PVideoStream(nullptr), frame(nullptr), PVideoStreamIDX(0), PVideoFrameCount(0),
    buffer(), PswsCtx(nullptr), cache_size(0), read_size(0),
    frameRate({ 0,0 }), read_handle(), read_check(), info_lock(), reading(false),
    _str_codec(), _duration(0), _predictFrameNum(0), nthread(0), refcount(1) {
}
cmpc::CMpegClient::~CMpegClient(void) {
    clear();
}
cmpc::CMpegClient::CMpegClient(CMpegClient &&ref) noexcept:
    videoPath(std::move(ref.videoPath)), width(ref.width), height(ref.height),
    widthDst(ref.widthDst), heightDst(ref.heightDst),
    PPixelFormat(ref.PPixelFormat), PFormatCtx(ref.PFormatCtx), PCodecCtx(ref.PCodecCtx),
    PVideoStream(ref.PVideoStream), frame(ref.frame),
    PVideoStreamIDX(ref.PVideoStreamIDX), PVideoFrameCount(ref.PVideoFrameCount),
    buffer(std::move(ref.buffer)), PswsCtx(ref.PswsCtx),
    cache_size(ref.cache_size), read_size(ref.read_size),
    frameRate(ref.frameRate), read_handle(std::move(std::thread())), read_check(), info_lock(),
    reading(ref.reading), _str_codec(std::move(ref._str_codec)), _duration(ref._duration),
    _predictFrameNum(ref._predictFrameNum), nthread(ref.nthread), refcount(ref.refcount) {
    ref.PFormatCtx = nullptr;
    ref.PCodecCtx = nullptr;
    ref.PVideoStream = nullptr;
    ref.frame = nullptr;
    ref.PswsCtx = nullptr;
}
cmpc::CMpegClient& cmpc::CMpegClient::operator=(CMpegClient &&ref) noexcept {
    if (this != &ref) {
        videoPath = std::move(ref.videoPath);
        width = ref.width;
        height = ref.height;
        widthDst = ref.widthDst;
        heightDst = ref.heightDst;
        PPixelFormat = ref.PPixelFormat;
        PVideoStreamIDX = ref.PVideoStreamIDX;
        PVideoFrameCount = ref.PVideoFrameCount;
        cache_size = ref.cache_size;
        read_size = ref.read_size;
        frameRate = ref.frameRate;
        reading = ref.reading;
        _duration = ref._duration;
        _predictFrameNum = ref._predictFrameNum;
        refcount = ref.refcount;
        PFormatCtx = ref.PFormatCtx;
        PCodecCtx = ref.PCodecCtx;
        PVideoStream = ref.PVideoStream;
        frame = ref.frame;
        PswsCtx = ref.PswsCtx;
        buffer = std::move(ref.buffer);
        read_handle = std::move(std::thread());
        nthread = ref.nthread;
        ref.PFormatCtx = nullptr;
        ref.PCodecCtx = nullptr;
        ref.PVideoStream = nullptr;
        ref.frame = nullptr;
        ref.PswsCtx = nullptr;
    }
    return *this;
}

void cmpc::CMpegClient::meta_protected_clear(void) {
    auto protectWidth = widthDst;
    auto protectHeight = heightDst;
    auto protectCacheSize = cache_size;
    auto protectReadSize = read_size;
    auto protectFrameRate = frameRate;
    auto protectNthread = nthread;
    clear();
    widthDst = protectWidth;
    heightDst = protectHeight;
    cache_size = protectCacheSize;
    read_size = protectReadSize;
    frameRate = protectFrameRate;
    nthread = protectNthread;
}

void cmpc::CMpegClient::clear(void) {
    if (read_handle.joinable()) {
        read_check.lock();
        reading = false;
        read_check.unlock();
        read_handle.join();
        //std::terminate();
        read_handle = std::move(std::thread());
    }
    else {
        read_handle = std::move(std::thread());
    }
    width = height = 0;
    widthDst = heightDst = 0;
    PPixelFormat = AVPixelFormat::AV_PIX_FMT_NONE;
    PVideoStreamIDX = -1;
    PVideoFrameCount = 0;
    _duration = 0;
    _predictFrameNum = 0;
    _str_codec.clear();
    //videoPath.clear();
    buffer.clear();
    cache_size = 0;
    read_size = 0;
    frameRate = _setAVRational(0, 0);
    read_check.lock();
    read_check.unlock();
    info_lock.lock();
    info_lock.unlock();
    nthread = 0;
    PVideoStream = nullptr;
    if (frame) {
        av_frame_free(&frame);
        frame = nullptr;
    }
    if (PswsCtx) {
        sws_freeContext(PswsCtx);
        PswsCtx = nullptr;
    }
    if (PCodecCtx) {
        avcodec_free_context(&PCodecCtx);
        PCodecCtx = nullptr;
    }
    if (PFormatCtx) {
        avformat_close_input(&PFormatCtx);
        PFormatCtx = nullptr;
    }
    refcount = 1;
}

int cmpc::CMpegClient::_open_codec_context(int &stream_idx, AVCodecContext *&dec_ctx, \
    AVFormatContext *PFormatCtx, enum cmpc::AVMediaType type) { // Search the correct decoder, and make the configurations.
    int ret;

    //search video stream
    ret = av_find_best_stream(PFormatCtx, type, -1, -1, nullptr, 0);
    if (ret < 0) {
        cerr << "Could not find " << av_get_media_type_string(type) << \
            " stream in input address: '" << videoPath << "'" << endl;
        return ret;
    }
    else {
        auto stream_index = ret;
        auto st = PFormatCtx->streams[stream_index];  // The AVStream object.

        /* find decoder for the stream */
        auto dec = avcodec_find_decoder(st->codecpar->codec_id);  // Decoder (AVCodec).
        if (!dec) {
            cerr << "Failed to find " << av_get_media_type_string(type) << " codec" << endl;
            return AVERROR(EINVAL);
        }
        _str_codec.assign(dec->name);

        /* Allocate a codec context for the decoder / Add this to allocate the context by codec */
        auto dec_ctx_ = avcodec_alloc_context3(dec);  // Decoder context (AVCodecContext).
        if (!dec_ctx_) {
            cerr << "Failed to allocate the " << av_get_media_type_string(type) << " codec context" << endl;
            return AVERROR(ENOMEM);
        }

        if (nthread > 0) {
            dec_ctx_->thread_count = nthread;
        }

        /* Copy codec parameters from input stream to output codec context */
        if ((ret = avcodec_parameters_to_context(dec_ctx_, st->codecpar)) < 0) {
            cerr << "Failed to copy " << av_get_media_type_string(type) << \
                " codec parameters to decoder context" << endl;
            return ret;
        }

        /* Init the decoders, with or without reference counting */
        AVDictionary* opts = nullptr;  // The uninitialized argument dictionary.
        av_dict_set(&opts, "refcounted_frames", refcount ? "1" : "0", 0);
        if ((ret = avcodec_open2(dec_ctx_, dec, &opts)) < 0) {
            cerr << "Failed to open " << av_get_media_type_string(type) << " codec" << endl;
            return ret;
        }
        dec_ctx = dec_ctx_;
        stream_idx = stream_index;
    }
    return 0;
}

bool cmpc::CMpegClient::__setup_check() const {
    if (cache_size > 0 && read_size > 0 && frameRate.den > 0 && frameRate.num > 0 && (!read_handle.joinable())) {
        return true;
    }
    else {
        return false;
    }
}

bool cmpc::CMpegClient::FFmpegSetup(string inVideoPath) {
    videoPath.assign(inVideoPath);
    return FFmpegSetup();
}

bool cmpc::CMpegClient::FFmpegSetup() {
    if (!__setup_check()) {
        cerr << "Have not get necessary and correct configurations, so FFmpegSetup() should not be called." << endl;
        return false;
    }
    meta_protected_clear();

    /* open Stream: register all formats and codecs */
    if (avformat_open_input(&PFormatCtx, videoPath.c_str(), nullptr, nullptr) < 0) {
        cerr << "Could not open source address " << videoPath << endl;
        clear();
        return false;
    } // For example, "rtsp://localhost:8554/h264.3gp"

    /* retrieve stream information */
    if (avformat_find_stream_info(PFormatCtx, nullptr) < 0) {
        cerr << "Could not find stream information" << endl;
        clear();
        return false;
    }
    AVRational time_base, frame_base;
    if (_open_codec_context(PVideoStreamIDX, PCodecCtx, PFormatCtx, AVMEDIA_TYPE_VIDEO) >= 0) {
        PVideoStream = PFormatCtx->streams[PVideoStreamIDX];
        time_base = PVideoStream->time_base;
        frame_base = PVideoStream->avg_frame_rate;

        /* allocate image where the decoded image will be put */
        width = PCodecCtx->width;
        height = PCodecCtx->height;
        if (widthDst <= 0) {
            widthDst = width;
        }
        if (heightDst <= 0) {
            heightDst = height;
        }
        PPixelFormat = PCodecCtx->pix_fmt;
        _duration = static_cast<double>(PVideoStream->duration) / static_cast<double>(time_base.den) * static_cast<double>(time_base.num);
        _predictFrameNum = av_rescale(static_cast<int64_t>(_duration * 0xFFFF), frame_base.num, frame_base.den) / 0xFFFF;
    }
    else {
        cerr << "Could not get codec context from the stream, aborting" << endl;
        clear();
        return false;
    }

    /* dump input information to stderr */
    if (__dumpControl > 1) {
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 0);
    }

    if (!PVideoStream) { // Check whether the video stream is correctly opened.
        cerr << "Could not find audio or video stream in the network, aborting" << endl;
        clear();
        return false;
    }

    if (width == 0 || height == 0) {
        cerr << "Could not get enough meta-data in the network, aborting" << endl;
        clear();
        return false;
    }

    PswsCtx = sws_getContext(width, height, PCodecCtx->pix_fmt, widthDst, heightDst, AV_PIX_FMT_RGB24,
        SCALE_FLAGS, nullptr, nullptr, nullptr);

    buffer.set(cache_size, width, height, widthDst, heightDst);
    buffer.set_timer(frameRate, time_base);
    if (!buffer.reset_memory()) { // Check whether the buffer is allocated correctly.
        cerr << "Could not allocate the memory of frame buffer list." << endl;
        clear();
        return false;
    }

    read_check.lock();
    reading = true;
    read_check.unlock();
    return true;
}

void cmpc::CMpegClient::dumpFormat() {
    if ((!videoPath.empty()) && PFormatCtx) {
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 0);
    }
    else {
        cerr << "Still need to FFmpegSetup()" << endl;
    }
}

void cmpc::CMpegClient::resetPath(string inVideoPath) {
    videoPath.assign(inVideoPath);
}

cmpc::AVRational cmpc::CMpegClient::_setAVRational(int num, int den) {
    AVRational res;
    res.num = num; res.den = den;
    return res;
}

int cmpc::CMpegClient::__save_frame(AVFrame *&frame, AVPacket *&pkt, bool &got_frame, int cached) {
    int ret = 0;
    int decoded = pkt->size;

    got_frame = false;

    if (pkt->stream_index == PVideoStreamIDX) {
        /* decode video frame */
        ret = __avcodec_decode_video2(PCodecCtx, frame, got_frame, pkt);
        if (ret < 0) {
            cout << "Error decoding video frame (" << av_err2str(ret) << ")" << endl;
            return ret;
        }

        if (got_frame) {

            if (frame->width != width || frame->height != height ||
                frame->format != PPixelFormat) {
                /* To handle this change, one could call av_image_alloc again and
                * decode the following frames into another rawvideo file. */
                cout << "Error: Width, height and pixel format have to be "
                    "constant in a rawvideo file, but the width, height or "
                    "pixel format of the input video changed:\n"
                    "old: width = " << width << ", height = " << height << ", format = "
                    << av_get_pix_fmt_name(PPixelFormat) << endl <<
                    "new: width = " << frame->width << ", height = " << frame->height << ", format = "
                    << av_get_pix_fmt_name(static_cast<AVPixelFormat>(frame->format)) << endl;
                return -1;
            }

            info_lock.lock();
            PVideoFrameCount++;
            info_lock.unlock();
            if (__dumpControl > 0) {
                std::ostringstream str_data;
                str_data << "video_frame" << (cached ? "(cached)" : "") << " n:" << PVideoFrameCount <<
                    " coded_n:" << frame->coded_picture_number << endl;
                auto str_data_s = str_data.str();
                av_log(nullptr, AV_LOG_INFO, "%s", str_data_s.c_str());
            }

            /* copy decoded frame to destination buffer:
            * this is required since rawvideo expects non aligned data */

            buffer.write(PswsCtx, frame);
        }
    }

    /* If we use frame reference counting, we own the data and need
    * to de-reference it when we don't use it anymore */

    if (got_frame && refcount)
        av_frame_unref(frame);

    return decoded;
}

void cmpc::CMpegClient::__client_holder() {
    int ret;
    bool got_frame;
    if (frame) {
        cerr << "Current frame is occupied, could not start a new client." << endl;
        return;
    }
    frame = av_frame_alloc();
    auto pkt = av_packet_alloc();
    if (!frame) {
        cerr << "Could not allocate frame" << endl;
        ret = AVERROR(ENOMEM);
        return;
    }
    /* initialize packet, set data to NULL, let the demuxer fill it */
    if (PVideoStream && (__dumpControl > 0)) {
        std::ostringstream str_data;
        str_data << "Demuxing video from address '" << videoPath << "' into Python-List" << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_INFO, "%s", str_data_s.c_str());
    }

    /* Reset the contex to remove the flushed state. */
    avcodec_flush_buffers(PCodecCtx);

    /* read frames from the file */
    info_lock.lock();
    PVideoFrameCount = 0;
    info_lock.unlock();

    //start reading packets from stream and write them to file
    av_read_play(PFormatCtx);    //play RTSP

    auto temp_pkt = av_packet_alloc();
    while (av_read_frame(PFormatCtx, pkt) >= 0) {
        //cout << "[Test - " << pkt.size << " ]" << endl;
        av_packet_ref(temp_pkt, pkt);
        do {
            ret = __save_frame(frame, temp_pkt, got_frame, 0);
            if (ret < 0)
                break;
            temp_pkt->data += ret;
            temp_pkt->size -= ret;
        } while (temp_pkt->size > 0);
        /* flush cached frames */
        av_packet_unref(pkt);
        av_packet_unref(temp_pkt);
        read_check.lock();
        if (!reading) {
            read_check.unlock();
            break;
        }
        else {
            read_check.unlock();
        }
    }
    av_packet_free(&temp_pkt);

    do {
        __save_frame(frame, pkt, got_frame, 1);
    } while (got_frame);

    //cout << "Demuxing succeeded." << endl;

    if (PVideoStream && (__dumpControl > 0)) {
        std::ostringstream str_data;
        str_data << "End of stream client." << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_INFO, "%s", str_data_s.c_str());
    }

    if (frame) {
        av_frame_free(&frame);
        frame = nullptr;
    }
    if (pkt) {
        av_packet_free(&pkt);
    }

    read_check.lock();
    reading = false;
    read_check.unlock();
}

int cmpc::CMpegClient::__avcodec_decode_video2(AVCodecContext *avctx, AVFrame *frame, bool &got_frame, AVPacket *pkt) {
    int ret;

    got_frame = false;

    if (pkt) {
        ret = avcodec_send_packet(avctx, pkt);
        // In particular, we don't expect AVERROR(EAGAIN), because we read all
        // decoded frames with avcodec_receive_frame() until done.
        if (ret < 0) {
            //cout << ret << ", " << AVERROR(EAGAIN) << ", " << AVERROR_EOF << endl;
            return ret == AVERROR_EOF ? 0 : ret;
        }
    }

    ret = avcodec_receive_frame(avctx, frame);
    if (ret < 0 && ret != AVERROR(EAGAIN) && ret != AVERROR_EOF)
        return ret;
    if (ret >= 0)
        got_frame = true;

    //cout << ret << ", " << AVERROR(EAGAIN) << ", " << AVERROR_EOF << endl;

    return 0;
}

PyObject* cmpc::CMpegClient::ExtractFrame() {
    return ExtractFrame(read_size);
}

PyObject* cmpc::CMpegClient::ExtractFrame(int64_t readsize) {
    if (readsize==0 || readsize > cache_size) {
        cerr << "Read size of frames is out of range." << endl;
        return nullptr;
    }
    else if (frame == nullptr) {
        cerr << "Current frame object is empty, maybe the client has not been started." << endl;
        return nullptr;
    }
    buffer.freeze_write(readsize);
    auto res = buffer.read();
    if (res == nullptr) {
        cerr << "Unable to get frames from current buffer." << endl;
    }
    return res;
}

void cmpc::CMpegClient::setParameter(string keyword, void *ptr) {
    if (keyword.compare("widthDst") == 0) {
        auto ref = reinterpret_cast<int *>(ptr);
        widthDst = *ref;
    }
    else if (keyword.compare("heightDst") == 0) {
        auto ref = reinterpret_cast<int *>(ptr);
        heightDst = *ref;
    }
    else if (keyword.compare("cacheSize") == 0) {
        auto ref = reinterpret_cast<int64_t *>(ptr);
        cache_size = *ref;
    }
    else if (keyword.compare("readSize") == 0) {
        auto ref = reinterpret_cast<int64_t *>(ptr);
        read_size = *ref;
    }
    else if (keyword.compare("dstFrameRate") == 0) {
        PyObject *ref = reinterpret_cast<PyObject *>(ptr);
        auto refObj = PyTuple_GetItem(ref, 0);
        int num = static_cast<int>(PyLong_AsLong(refObj));
        refObj = PyTuple_GetItem(ref, 1);
        int den = static_cast<int>(PyLong_AsLong(refObj));
        frameRate = _setAVRational(num, den);
    }
    else if (keyword.compare("nthread") == 0) {
        auto ref = reinterpret_cast<int*>(ptr);
        if (PCodecCtx) {
            PCodecCtx->thread_count = *ref;
        }
        nthread = *ref;
    }
}

PyObject * cmpc::CMpegClient::getParameter(string keyword) {
    if (keyword.compare("videoAddress") == 0) {
        return PyUnicode_DecodeFSDefaultAndSize(videoPath.c_str(), static_cast<Py_ssize_t>(videoPath.size()));
    }
    else if (keyword.compare("width") == 0) {
        return Py_BuildValue("i", width);
    }
    else if (keyword.compare("height") == 0) {
        return Py_BuildValue("i", height);
    }
    else if (keyword.compare("frameCount") == 0) {
        info_lock.lock();
        auto value = Py_BuildValue("i", PVideoFrameCount);
        info_lock.unlock();
        return value;
    }
    else if (keyword.compare("coderName") == 0) {
        return PyUnicode_DecodeFSDefaultAndSize(_str_codec.c_str(), static_cast<Py_ssize_t>(_str_codec.size()));
    }
    else if (keyword.compare("duration") == 0) {
        return Py_BuildValue("d", _duration);
    }
    else if (keyword.compare("estFrameNum") == 0) {
        return Py_BuildValue("L", _predictFrameNum);
    }
    else if (keyword.compare("srcFrameRate") == 0) {
        if (!PVideoStream) {
            return Py_BuildValue("d", 0.0);
        }
        auto frame_base = PVideoStream->avg_frame_rate;
        double srcFrameRate = static_cast<double>(frame_base.num) / static_cast<double>(frame_base.den);
        return Py_BuildValue("d", srcFrameRate);
    }
    else if (keyword.compare("nthread") == 0) {
        if (PCodecCtx) {
            return Py_BuildValue("i", PCodecCtx->thread_count);
        }
        else {
            return Py_BuildValue("i", nthread);
        }
    }
    else {
        Py_RETURN_NONE;
    }
}

PyObject* cmpc::CMpegClient::getParameter() {
    auto res = PyDict_New();
    string key;
    PyObject* val = nullptr;
    // Fill the values.
    key.assign("videoAddress");
    val = Py_BuildValue("y", videoPath.c_str());
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("codecName");
    val = Py_BuildValue("y", _str_codec.c_str());
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    if (PCodecCtx) {
        key.assign("bitRate");
        val = Py_BuildValue("L", PCodecCtx->bit_rate);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
        key.assign("GOPSize");
        val = Py_BuildValue("i", PCodecCtx->gop_size);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
        key.assign("maxBframe");
        val = Py_BuildValue("i", PCodecCtx->max_b_frames);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
        key.assign("nthread");
        val = Py_BuildValue("i", PCodecCtx->thread_count);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    else {
        key.assign("nthread");
        val = Py_BuildValue("i", nthread);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    if (widthDst > 0) {
        key.assign("widthDst");
        val = Py_BuildValue("i", widthDst);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    if (heightDst > 0) {
        key.assign("heightDst");
        val = Py_BuildValue("i", heightDst);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    key.assign("width");
    val = Py_BuildValue("i", width);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("height");
    val = Py_BuildValue("i", height);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    if (PVideoStream) {
        key.assign("frameRate");
        auto& frame_rate = PVideoStream->avg_frame_rate;
        val = Py_BuildValue("(ii)", frame_rate.num, frame_rate.den);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    return res;
}

bool cmpc::CMpegClient::start() {
    if (reading && (frame == nullptr)) {
        read_handle = std::move(std::thread(std::mem_fn(&CMpegClient::__client_holder), std::ref(*this)));
        return true;
    }
    return false;
}
void cmpc::CMpegClient::terminate() {
    read_check.lock();
    auto protectReading = reading;
    read_check.unlock();
    if (read_handle.joinable()) {
        read_check.lock();
        reading = false;
        read_check.unlock();
        read_handle.join();
        //std::terminate();
        read_handle = std::move(std::thread());
    }
    else {
        read_handle = std::move(std::thread());
    }
    info_lock.lock();
    info_lock.unlock();
    read_check.lock();
    reading = protectReading;
    read_check.unlock();
    if (frame) {
        av_frame_free(&frame);
    }
}
ostream & cmpc::operator<<(ostream & out, cmpc::CMpegClient & self_class) {
    double dstFrameRate;
    out << std::setw(1) << "/";
    out << std::setfill('*') << std::setw(44) << "" << std::setfill(' ') << endl;
    out << std::setw(1) << " * Packed FFmpeg Client - Y. Jin V" << MPEGCODER_CURRENT_VERSION << endl;
    out << " " << std::setfill('*') << std::setw(44) << "" << std::setfill(' ') << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * VideoAddress: " \
        << self_class.videoPath << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * (Width, Height): " \
        << self_class.width << ", " << self_class.height << endl;
    if (self_class.widthDst > 0 && self_class.heightDst > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * (WidthDst, HeightDst): " \
            << self_class.widthDst << ", " << self_class.heightDst << endl;
    }
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Deccoder: " \
        << self_class._str_codec << endl;
    if (self_class.PCodecCtx) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * Thread number: " \
            << self_class.PCodecCtx->thread_count << endl;
    }
    else {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * Thread number (P): " \
            << self_class.nthread << endl;
    }
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Duration: " \
        << self_class._duration << " [s]" << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Predicted FrameNum: " \
        << self_class._predictFrameNum << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Read/Cache size: " \
        << self_class.read_size << "/" << self_class.cache_size << endl;
    if (self_class.PVideoStream) {
        auto frame_base = self_class.PVideoStream->avg_frame_rate;
        double srcFrameRate = static_cast<double>(frame_base.num) / static_cast<double>(frame_base.den);
        if (self_class.frameRate.den) {
            dstFrameRate = static_cast<double>(self_class.frameRate.num) / static_cast<double>(self_class.frameRate.den);
        }
        else {
            dstFrameRate = 0;
        }
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * Dst./Src. frame rate: " \
            << std::setprecision(3) << dstFrameRate << "/" << srcFrameRate << std::setprecision(6) << endl;
    }
    else {
        if (self_class.frameRate.den) {
            dstFrameRate = static_cast<double>(self_class.frameRate.num) / static_cast<double>(self_class.frameRate.den);
        }
        else {
            dstFrameRate = 0;
        }
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * Src. frame rate: " \
            << std::setprecision(3) << dstFrameRate << std::setprecision(6) << endl;
    }
    out << std::setw(1) << " */";
    return out;
}

cmpc::BufferList::BufferList(void):
    _Buffer_pos(0), _Buffer_rpos(-1), _Buffer_size(0), __Read_size(0),
    next_pts(0), interval_pts(0), dst_width(0), dst_height(0),
    src_width(0), src_height(0), _Buffer_capacity(0),
    frameRGB(nullptr), _Buffer_List(nullptr) {
}
cmpc::BufferList::~BufferList(void) {
    if (_Buffer_List) {
        for (auto i = 0; i < _Buffer_size; i++) {
            if (_Buffer_List[i]) {
                av_free(_Buffer_List[i]);
                _Buffer_List[i] = nullptr;
            }
        }
        delete[]_Buffer_List;
        _Buffer_List = nullptr;
    }
    if (frameRGB) {
        av_frame_free(&frameRGB);
    }
}
cmpc::BufferList::BufferList(const BufferList &ref):
    _Buffer_pos(ref._Buffer_pos), _Buffer_rpos(ref._Buffer_rpos), _Buffer_size(ref._Buffer_size),
    __Read_size(ref.__Read_size), next_pts(ref.next_pts), interval_pts(ref.interval_pts),
    dst_width(ref.dst_width), dst_height(ref.dst_height),
    src_width(ref.src_width), src_height(ref.src_height),
    _Buffer_capacity(ref._Buffer_capacity), frameRGB(ref.frameRGB), _Buffer_List(nullptr) {
    if (!(frameRGB = av_frame_alloc())) {
        cerr << "Could Allocate Temp Frame (RGB)" << endl;
        return;
    }
    _Buffer_List = new uint8_t*[_Buffer_size];
    memset(_Buffer_List, 0, _Buffer_size * sizeof(uint8_t*));
    if (_Buffer_capacity > 0) {
        for (auto i = 0; i < _Buffer_size; i++) {
            if (ref._Buffer_List[i] != nullptr) {
                _Buffer_List[i] = (uint8_t *)av_malloc(_Buffer_capacity * sizeof(uint8_t));
                memcpy(_Buffer_List[i], ref._Buffer_List[i], _Buffer_capacity * sizeof(uint8_t));
            }
        }
    }
}
cmpc::BufferList& cmpc::BufferList::operator=(const BufferList &ref) {
    if (this != &ref) {
        _Buffer_pos = ref._Buffer_pos;
        _Buffer_rpos = ref._Buffer_rpos;
        _Buffer_size = ref._Buffer_size;
        __Read_size = ref.__Read_size;
        next_pts = ref.next_pts;
        interval_pts = ref.interval_pts;
        dst_width = ref.dst_width;
        dst_height = ref.dst_height;
        src_width = ref.src_width;
        src_height = ref.src_height;
        _Buffer_capacity = ref._Buffer_capacity;
        if (!(frameRGB = av_frame_alloc())) {
            cerr << "Could Allocate Temp Frame (RGB)" << endl;
            return *this;
        }
        _Buffer_List = new uint8_t*[_Buffer_size];
        memset(_Buffer_List, 0, _Buffer_size * sizeof(uint8_t*));
        if (_Buffer_capacity > 0) {
            for (auto i = 0; i < _Buffer_size; i++) {
                if (ref._Buffer_List[i] != nullptr) {
                    _Buffer_List[i] = (uint8_t *)av_malloc(_Buffer_capacity * sizeof(uint8_t));
                    memcpy(_Buffer_List[i], ref._Buffer_List[i], _Buffer_capacity * sizeof(uint8_t));
                }
            }
        }
    }
    return *this;
}
cmpc::BufferList::BufferList(BufferList &&ref) noexcept:
    _Buffer_pos(ref._Buffer_pos), _Buffer_rpos(ref._Buffer_rpos), _Buffer_size(ref._Buffer_size),
    __Read_size(ref.__Read_size), next_pts(ref.next_pts), interval_pts(ref.interval_pts),
    dst_width(ref.dst_width), dst_height(ref.dst_height),
    src_width(ref.src_width), src_height(ref.src_height),
    _Buffer_capacity(ref._Buffer_capacity), frameRGB(ref.frameRGB), _Buffer_List(ref._Buffer_List) {
    ref._Buffer_List = nullptr;
    ref.frameRGB = nullptr;
}
cmpc::BufferList& cmpc::BufferList::operator=(BufferList &&ref) noexcept {
    if (this != &ref) {
        _Buffer_pos = ref._Buffer_pos;
        _Buffer_rpos = ref._Buffer_rpos;
        _Buffer_size = ref._Buffer_size;
        __Read_size = ref.__Read_size;
        interval_pts = ref.interval_pts;
        next_pts = ref.next_pts;
        dst_width = ref.dst_width;
        dst_height = ref.dst_height;
        src_width = ref.src_width;
        src_height = ref.src_height;
        _Buffer_capacity = ref._Buffer_capacity;
        _Buffer_List = ref._Buffer_List;
        frameRGB = ref.frameRGB;
        ref._Buffer_List = nullptr;
        ref.frameRGB = nullptr;
    }
    return *this;
}
void cmpc::BufferList::clear(void) {
    if (_Buffer_List) {
        for (auto i = 0; i < _Buffer_size; i++) {
            if (_Buffer_List[i]) {
                av_free(_Buffer_List[i]);
                _Buffer_List[i] = nullptr;
            }
        }
        delete[]_Buffer_List;
        _Buffer_List = nullptr;
    }
    _Buffer_pos = 0;
    _Buffer_rpos = -1;
    _Buffer_size = 0;
    __Read_size = 0;
    next_pts = 0;
    interval_pts = 0;
    src_width = 0;
    src_height = 0;
    dst_width = 0;
    dst_height = 0;
    if (frameRGB) {
        av_frame_free(&frameRGB);
    }
}
const int64_t cmpc::BufferList::size() const {
    return _Buffer_size;
}
void cmpc::BufferList::set(int64_t set_size, int width, int height, int widthDst, int heightDst) {
    _Buffer_size = set_size;
    if (widthDst != 0) {
        dst_width = widthDst;
    }
    else {
        dst_width = width;
    }
    if (heightDst != 0) {
        dst_height = heightDst;
    }
    else {
        dst_height = height;
    }
    src_width = width;
    src_height = height;
    _Buffer_capacity = av_image_get_buffer_size(AV_PIX_FMT_RGB24, dst_width, dst_height, 1);
}
void cmpc::BufferList::set_timer(AVRational targetFrameRate, AVRational timeBase) {
    interval_pts = av_rescale(av_rescale(1, timeBase.den, timeBase.num), targetFrameRate.den, targetFrameRate.num);
}
bool cmpc::BufferList::reset_memory() {
    if (!frameRGB) {
        if (!(frameRGB = av_frame_alloc())) {
            cerr << "Could Allocate Temp Frame (RGB)" << endl;
            return false;
        }
    }
    if (!_Buffer_List) {
        _Buffer_List = new uint8_t*[_Buffer_size];
        memset(_Buffer_List, 0, _Buffer_size * sizeof(uint8_t*));
    }
    for (auto i = 0; i < _Buffer_size; i++) {
        if (!_Buffer_List[i]) {
            _Buffer_List[i] = (uint8_t *)av_malloc(_Buffer_capacity * sizeof(uint8_t));
        }
        memset(_Buffer_List[i], 0, _Buffer_capacity * sizeof(uint8_t));
    }
    return true;
}
void cmpc::BufferList::freeze_write(int64_t read_size) {
    auto read_pos = _Buffer_pos - read_size;
    if (read_pos < 0) {
        read_pos += _Buffer_size;
    }
    _Buffer_rpos = read_pos;
    __Read_size = read_size;
}
bool cmpc::BufferList::write(SwsContext *PswsCtx, AVFrame *frame) {
    if (frame->pts < next_pts) {
        if (frame->pts > (next_pts - 2 * interval_pts)) {
            return false;
        }
        else {
            next_pts = frame->pts + interval_pts;
        }
    }
    else {
        if (next_pts > 0)
            next_pts += interval_pts;
        else
            next_pts = frame->pts;
    }
    if (_Buffer_pos == _Buffer_rpos) {
        return false;
    }
    av_image_fill_arrays(frameRGB->data, frameRGB->linesize, _Buffer_List[_Buffer_pos], AV_PIX_FMT_RGB24, dst_width, dst_height, 1);
    sws_scale(PswsCtx, frame->data, frame->linesize, 0, src_height, frameRGB->data, frameRGB->linesize);
    _Buffer_pos++;
    if (_Buffer_pos >= _Buffer_size)
        _Buffer_pos -= _Buffer_size;
    return true;
}
PyObject * cmpc::BufferList::read() {
    if (_Buffer_rpos < 0) {
        return nullptr;
    }
    auto _Buffer_rend = (_Buffer_rpos + __Read_size) % _Buffer_size;
    npy_intp dims[] = { __Read_size, dst_height, dst_width, 3 };
    auto newdata = new uint8_t[__Read_size * _Buffer_capacity];
    auto p = newdata;
    for (auto i = _Buffer_rpos; i != _Buffer_rend; i = (i + 1) % _Buffer_size) {
        memcpy(p, _Buffer_List[i], _Buffer_capacity * sizeof(uint8_t));
        p += _Buffer_capacity; 
    }
    PyObject *PyFrame = PyArray_SimpleNewFromData(4, dims, NPY_UINT8, reinterpret_cast<void *>(newdata));
    PyArray_ENABLEFLAGS((PyArrayObject*)PyFrame, NPY_ARRAY_OWNDATA);
    _Buffer_rpos = -1;
    __Read_size = 0;
    return PyArray_Return((PyArrayObject*)PyFrame);
    //Py_RETURN_NONE;
}

/**
 * Related with the encoder.
 */

 // Constructors following 3-5 law.
cmpc::CMpegServer::CMpegServer(void) :
    videoPath(), __formatName(), codecName(), bitRate(1024),
    __start_time(0), __cur_time(0), width(100), height(100), widthSrc(0), heightSrc(0),
    timeBase(_setAVRational(1, 25)), frameRate(_setAVRational(25, 1)),
    time_base_q(_setAVRational(1, AV_TIME_BASE)), GOPSize(10), MaxBFrame(1),
    PStreamContex({ 0 }), PFormatCtx(nullptr), Ppacket(nullptr), PswsCtx(nullptr),
    __frameRGB(nullptr), RGBbuffer(nullptr), __have_video(false), __enable_header(false),
    nthread(0) {
    __pts_ahead = av_rescale(av_rescale(20, timeBase.den, timeBase.num), frameRate.den, frameRate.num);
}

void cmpc::CMpegServer::meta_protected_clear(void) {
    auto protectWidth = width;
    auto protectHeight = height;
    auto protectWidthSrc = widthSrc;
    auto protectHeightSrc = heightSrc;
    auto protectBitRate = bitRate;
    auto protectGOPSize = GOPSize;
    auto protectMaxBFrame = MaxBFrame;
    auto protectPTSAhead = __pts_ahead;
    auto protectVideoPath(videoPath);
    auto protectFormatName(__formatName);
    auto protectCodecName(codecName);
    auto protectTimeBase(timeBase);
    auto protectFrameRate(frameRate);
    auto protectNthread = nthread;
    clear();
    width = protectWidth;
    height = protectHeight;
    widthSrc = protectWidthSrc;
    heightSrc = protectHeightSrc;
    bitRate = protectBitRate;
    GOPSize = protectGOPSize;
    MaxBFrame = protectMaxBFrame;
    timeBase = protectTimeBase;
    frameRate = protectFrameRate;
    __pts_ahead = protectPTSAhead;
    videoPath.assign(protectVideoPath);
    __formatName.assign(protectFormatName);
    codecName.assign(protectCodecName);
    nthread = protectNthread;
}

void cmpc::CMpegServer::clear(void) {
    FFmpegClose();
    videoPath.clear();
    __formatName.clear();
    codecName.clear();
    bitRate = 1024;
    width = 100;
    height = 100;
    heightSrc = 0;
    widthSrc = 0;
    timeBase = _setAVRational(1, 25);
    frameRate = _setAVRational(25, 1);
    GOPSize = 10;
    MaxBFrame = 1;
    nthread = 0;
    PStreamContex = { 0 };
    __have_video = false;
    __enable_header = false;
    __pts_ahead = av_rescale(av_rescale(20, timeBase.den, timeBase.num), frameRate.den, frameRate.num);
    __start_time = 0;
    __cur_time = 0;
}

cmpc::CMpegServer::~CMpegServer(void) {
    clear();
}


cmpc::CMpegServer::CMpegServer(const CMpegServer& ref):
    videoPath(ref.videoPath), __formatName(ref.__formatName), codecName(ref.codecName),
    bitRate(ref.bitRate), __pts_ahead(ref.__pts_ahead), __start_time(0), __cur_time(0),
    width(ref.width), height(ref.height), widthSrc(ref.widthSrc), heightSrc(ref.heightSrc),
    timeBase(ref.timeBase), frameRate(ref.frameRate),
    time_base_q(_setAVRational(1, AV_TIME_BASE)), GOPSize(ref.GOPSize), MaxBFrame(ref.MaxBFrame),
    PStreamContex({ 0 }), PFormatCtx(nullptr), Ppacket(nullptr), PswsCtx(nullptr),
    __frameRGB(nullptr), RGBbuffer(nullptr), __have_video(false), __enable_header(false),
    nthread(ref.nthread) {
    if (!FFmpegSetup()) {
        clear();
    }
}

cmpc::CMpegServer& cmpc::CMpegServer::operator=(const CMpegServer& ref) {
    if (this != &ref) {
        videoPath = ref.videoPath;
        __formatName = ref.__formatName;
        codecName = ref.codecName;
        bitRate = ref.bitRate;
        __pts_ahead = ref.__pts_ahead;
        __start_time = 0;
        __cur_time = 0;
        width = ref.width;
        height = ref.height;
        widthSrc = ref.widthSrc;
        heightSrc = ref.heightSrc;
        timeBase = ref.timeBase;
        frameRate = ref.frameRate;
        time_base_q = _setAVRational(1, AV_TIME_BASE);
        GOPSize = ref.GOPSize;
        MaxBFrame = ref.MaxBFrame;
        PStreamContex = { 0 };
        PFormatCtx = nullptr;
        Ppacket = nullptr;
        PswsCtx = nullptr;
        __frameRGB = nullptr;
        RGBbuffer = nullptr;
        __have_video = false;
        __enable_header = false;
        nthread = ref.nthread;
        if (!FFmpegSetup()) {
            clear();
        }
    }
    return *this;
}

cmpc::CMpegServer::CMpegServer(CMpegServer&& ref) noexcept :
    videoPath(std::move(ref.videoPath)), __formatName(std::move(ref.__formatName)),
    codecName(std::move(ref.codecName)), bitRate(ref.bitRate), __pts_ahead(ref.__pts_ahead),
    __start_time(ref.__start_time), __cur_time(ref.__cur_time),
    width(ref.width), height(ref.height), widthSrc(ref.widthSrc), heightSrc(ref.heightSrc),
    timeBase(ref.timeBase), frameRate(ref.frameRate), time_base_q(ref.time_base_q),
    GOPSize(ref.GOPSize), MaxBFrame(ref.MaxBFrame), PStreamContex(std::move(ref.PStreamContex)),
    PFormatCtx(ref.PFormatCtx), Ppacket(ref.Ppacket), PswsCtx(ref.PswsCtx),
     __frameRGB(ref.__frameRGB), RGBbuffer(ref.RGBbuffer),
    __have_video(ref.__have_video), __enable_header(ref.__enable_header), nthread(ref.nthread) {
    ref.PFormatCtx = nullptr;
    ref.PStreamContex = { 0 };
    ref.PswsCtx = nullptr;
    ref.RGBbuffer = nullptr;
    ref.Ppacket = nullptr;
    ref.__frameRGB = nullptr;
}

cmpc::CMpegServer& cmpc::CMpegServer::operator=(CMpegServer&& ref) noexcept {
    if (this != &ref) {
        videoPath.assign(std::move(ref.videoPath));
        __formatName.assign(std::move(ref.__formatName));
        codecName.assign(std::move(ref.codecName));
        bitRate = ref.bitRate;
        width = ref.width;
        height = ref.height;
        widthSrc = ref.widthSrc;
        heightSrc = ref.heightSrc;
        timeBase = ref.timeBase;
        frameRate = ref.frameRate;
        time_base_q = ref.time_base_q;
        GOPSize = ref.GOPSize;
        MaxBFrame = ref.MaxBFrame;
        __pts_ahead = ref.__pts_ahead;
        __start_time = ref.__start_time;
        __cur_time = ref.__cur_time;
        PFormatCtx = ref.PFormatCtx;
        PStreamContex = std::move(ref.PStreamContex);
        PswsCtx = ref.PswsCtx;
        RGBbuffer = ref.RGBbuffer;
        Ppacket = ref.Ppacket;
        nthread = ref.nthread;
        __frameRGB = ref.__frameRGB;
        __have_video = ref.__have_video;
        __enable_header = ref.__enable_header;
        ref.PFormatCtx = nullptr;
        ref.PStreamContex = { 0 };
        ref.PswsCtx = nullptr;
        ref.RGBbuffer = nullptr;
        ref.Ppacket = nullptr;
        ref.__frameRGB = nullptr;
    }
    return *this;
}

void cmpc::CMpegServer::resetPath(string inVideoPath) {
    videoPath.assign(inVideoPath);
    if (videoPath.compare(0, 7, "rtsp://") == 0) {
        __formatName.assign("rtsp");
    }
    else if (videoPath.compare(0, 7, "rtmp://") == 0) {
        __formatName.assign("rtmp");
    }
    else if (videoPath.compare(0, 7, "http://") == 0) {
        __formatName.assign("http");
    }
    else if (videoPath.compare(0, 6, "ftp://") == 0) {
        __formatName.assign("ftp");
    }
    else if (videoPath.compare(0, 7, "sftp://") == 0) {
        __formatName.assign("sftp");
    }
    else {
        __formatName.clear();
    }
}

bool cmpc::CMpegServer::FFmpegSetup(string inVideoPath) {
    resetPath(inVideoPath);
    return FFmpegSetup();
}

cmpc::AVRational cmpc::CMpegServer::_setAVRational(int num, int den) {
    AVRational res;
    res.num = num; res.den = den;
    return res;
}

int64_t cmpc::CMpegServer::__FrameToPts(int64_t seekFrame) const {
    return av_rescale(av_rescale(seekFrame, timeBase.den, timeBase.num), frameRate.den, frameRate.num);
}

int64_t cmpc::CMpegServer::__TimeToPts(double seekTime) const {
    return av_rescale(static_cast<int64_t>(seekTime * 1000), timeBase.den, timeBase.num) / 1000;
}

bool cmpc::CMpegServer::__setup_check() const {
    if ((! videoPath.empty()) && (! __formatName.empty()) && frameRate.den > 0 && frameRate.num > 0) {
        return true;
    }
    else {
        return false;
    }
}

void cmpc::CMpegServer::__log_packet() {
    AVRational* time_base = &PFormatCtx->streams[Ppacket->stream_index]->time_base;
    std::ostringstream str_data;
    str_data << "pts:" << av_ts2str(Ppacket->pts) << " pts_time:" << av_ts2timestr(Ppacket->pts, time_base)
        << " dts:" << av_ts2str(Ppacket->dts) << " dts_time:" << av_ts2timestr(Ppacket->dts, time_base) << endl;
    auto str_data_s = str_data.str();
    av_log(nullptr, AV_LOG_INFO, "%s", str_data_s.c_str());
}

int cmpc::CMpegServer::__write_frame() {
    /* rescale output packet timestamp values from codec to stream timebase */
    av_packet_rescale_ts(Ppacket, PStreamContex.enc->time_base, PStreamContex.st->time_base);
    Ppacket->stream_index = PStreamContex.st->index;

    // Update the time cursor according to the packet index.
    AVRational &time_base = PFormatCtx->streams[Ppacket->stream_index]->time_base;
    
    auto cur_time = av_rescale_q(Ppacket->pts, time_base, time_base_q);
    if (cur_time > __cur_time) {
        __cur_time = cur_time;
    }

    /* Write the compressed frame to the media file. */
    if (__dumpControl > 0)
        __log_packet();
    return av_interleaved_write_frame(PFormatCtx, Ppacket);
}

/* Add an output stream. */
bool cmpc::CMpegServer::__add_stream(AVCodec** codec) {
    /* find the encoder */
    AVCodecID codec_id;
    auto srcwidth = widthSrc > 0 ? widthSrc : width;
    auto srcheight = heightSrc > 0 ? heightSrc : height;
    *codec = avcodec_find_encoder_by_name(codecName.c_str());
    if (!(*codec)) {
        codec_id = PFormatCtx->oformat->video_codec;
        cerr << "Could not find encoder " << codecName << ", use " << avcodec_get_name(codec_id) << " as an alternative." << endl;
        *codec = avcodec_find_encoder(codec_id);
    }
    else {
        codec_id = (*codec)->id;
        PFormatCtx->oformat->video_codec = codec_id;
    }
    if (!(*codec)) {
        cerr << "Could not find encoder for '" << avcodec_get_name(codec_id) << "'" << endl;
        return false;
    }

    PStreamContex.st = avformat_new_stream(PFormatCtx, nullptr);
    if (!PStreamContex.st) {
        cerr << "Could not allocate stream" << endl;
        return false;
    }
    PStreamContex.st->id = PFormatCtx->nb_streams - 1;
    auto c = avcodec_alloc_context3(*codec);
    if (!c) {
        cerr << "Could not alloc an encoding context" << endl;
        return false;
    }
    if (nthread > 0) {
        c->thread_count = nthread;
    }
    PStreamContex.enc = c;

    switch ((*codec)->type) {
    case AVMediaType::AVMEDIA_TYPE_VIDEO:
        c->codec_id = codec_id;

        c->bit_rate = bitRate;
        /* Resolution must be a multiple of two. */
        c->width = width;
        c->height = height;
        /* timebase: This is the fundamental unit of time (in seconds) in terms
        * of which frame timestamps are represented. For fixed-fps content,
        * timebase should be 1/framerate and timestamp increments should be
        * identical to 1. */
        PStreamContex.st->time_base.den = 0;
        PStreamContex.st->time_base.num = 0;
        //av_stream_set_r_frame_rate(PStreamContex.st, frameRate);
        //cout << "(" << frameRate.num << ", " << frameRate.den << ")" << endl;
        //PStreamContex.st->r_frame_rate
        c->time_base = timeBase;

        //PStreamContex.st->frame
        c->framerate = frameRate;

        c->gop_size = GOPSize; /* emit one intra frame every twelve frames at most */
        c->max_b_frames = MaxBFrame;
        c->pix_fmt = STREAM_PIX_FMT;
        if (c->codec_id == AVCodecID::AV_CODEC_ID_FLV1) {
            /* just for testing, we also add B-frames */
            c->max_b_frames = 0;
        }
        if (c->codec_id == AVCodecID::AV_CODEC_ID_MPEG2VIDEO) {
            /* just for testing, we also add B-frames */
            c->max_b_frames = 2;
        }
        if (c->codec_id == AVCodecID::AV_CODEC_ID_MPEG1VIDEO) {
            /* Needed to avoid using macroblocks in which some coeffs overflow.
            * This does not happen with normal video, it just happens here as
            * the motion of the chroma plane does not match the luma plane. */
            c->mb_decision = 2;
        }
        if (c->pix_fmt != STREAM_PIX_FMT) {
            /* as we only generate a YUV420P picture, we must convert it
            * to the codec pixel format if needed */
            if (!PStreamContex.sws_ctx) {
                PStreamContex.sws_ctx = sws_getContext(c->width, c->height,
                    STREAM_PIX_FMT,
                    c->width, c->height,
                    c->pix_fmt,
                    SCALE_FLAGS, nullptr, nullptr, nullptr);
                if (!PStreamContex.sws_ctx) {
                    cerr << "Could not initialize the conversion context" << endl;
                    return false;
                }
            }
        }
        if (!PswsCtx) {
            PswsCtx = sws_getContext(srcwidth, srcheight,
                AVPixelFormat::AV_PIX_FMT_RGB24,
                c->width, c->height,
                c->pix_fmt,
                SCALE_FLAGS, nullptr, nullptr, nullptr);
            if (!PswsCtx) {
                cerr << "Could not initialize the conversion context" << endl;
                return false;
            }
        }
        if (!RGBbuffer) {
            auto numBytes = av_image_get_buffer_size(AVPixelFormat::AV_PIX_FMT_RGB24, srcwidth, srcheight, 1);
            RGBbuffer = (uint8_t*)av_malloc(numBytes * sizeof(uint8_t));
        }
        break;

    default:
        break;
    }

    /* Some formats want stream headers to be separate. */
    if (PFormatCtx->oformat->flags & AVFMT_GLOBALHEADER)
        c->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;
    return true;
}

/* video output */
cmpc::AVFrame* cmpc::CMpegServer::__alloc_picture(enum AVPixelFormat pix_fmt, int width, int height) {
    auto picture = av_frame_alloc();
    if (!picture)
        return nullptr;
    picture->format = pix_fmt;
    picture->width = width;
    picture->height = height;
    /* allocate the buffers for the frame data */
    auto ret = av_frame_get_buffer(picture, 32);
    if (ret < 0) {
        cerr << "Could not allocate frame data." << endl;
        return nullptr;
    }
    return picture;
}

bool cmpc::CMpegServer::__open_video(AVCodec* codec, AVDictionary* opt_arg) {
    int ret;
    auto c = PStreamContex.enc;
    AVDictionary* opt = nullptr;

    av_dict_copy(&opt, opt_arg, 0);
    /* open the codec */
    ret = avcodec_open2(c, codec, &opt);
    av_dict_free(&opt);
    if (ret < 0) {
        cerr << "Could not open video codec: " << av_err2str(ret) << endl;
        return false;
    }
    /* allocate and init a re-usable frame */
    PStreamContex.frame = __alloc_picture(c->pix_fmt, c->width, c->height);
    if (!PStreamContex.frame) {
        cerr << "Could not allocate video frame" << endl;
        return false;
    }
    /* If the output format is not YUV420P, then a temporary YUV420P
    * picture is needed too. It is then converted to the required
    * output format. */
    PStreamContex.tmp_frame = nullptr;
    if (c->pix_fmt != STREAM_PIX_FMT) {
        PStreamContex.tmp_frame = __alloc_picture(STREAM_PIX_FMT, c->width, c->height);
        if (!PStreamContex.tmp_frame) {
            cerr << "Could not allocate temporary picture" << endl;
            return false;
        }
    }
    /* copy the stream parameters to the muxer */
    ret = avcodec_parameters_from_context(PStreamContex.st->codecpar, c);
    if (ret < 0) {
        cerr << "Could not copy the stream parameters" << endl;
        return false;
    }
    return true;
}

cmpc::AVFrame* cmpc::CMpegServer::__get_video_frame(PyArrayObject* PyFrame) {
    auto c = PStreamContex.enc;

    /* check if we want to generate more frames */
    //if (av_compare_ts(PStreamContex.next_pts, c->time_base, STREAM_DURATION, { 1, 1 }) >= 0)
    //    return nullptr;
    /* when we pass a frame to the encoder, it may keep a reference to it
    * internally; make sure we do not overwrite it here */
    if (av_frame_make_writable(PStreamContex.frame) < 0)
        return nullptr;
    if (c->pix_fmt != STREAM_PIX_FMT) {
        /* as we only generate a YUV420P picture, we must convert it
        * to the codec pixel format if needed */
        if (!PStreamContex.sws_ctx) {
            PStreamContex.sws_ctx = sws_getContext(c->width, c->height,
                STREAM_PIX_FMT,
                c->width, c->height,
                c->pix_fmt,
                SCALE_FLAGS, nullptr, nullptr, nullptr);
            if (!PStreamContex.sws_ctx) {
                cerr << "Could not initialize the conversion context" << endl;
                return nullptr;
            }
        }
        if (!_LoadFrame_castFromPyFrameArray(PStreamContex.tmp_frame, PyFrame)) {
            return nullptr;
        }
        sws_scale(PStreamContex.sws_ctx,
            (const uint8_t* const*)PStreamContex.tmp_frame->data, PStreamContex.tmp_frame->linesize,
            0, c->height, PStreamContex.frame->data, PStreamContex.frame->linesize);
    }
    else {
        if (!_LoadFrame_castFromPyFrameArray(PStreamContex.frame, PyFrame)) {
            return nullptr;
        }
    }

    PStreamContex.frame->pts = PStreamContex.next_frame;
    PStreamContex.next_frame++;
    return PStreamContex.frame;
}

bool cmpc::CMpegServer::_LoadFrame_castFromPyFrameArray(AVFrame* frame, PyArrayObject* PyFrame) {
    /* make sure the frame data is writable */
    if (!__frameRGB) {
        cerr << "Could not allocate frameRGB" << endl;
        return false;
    }
    auto out_dataptr = reinterpret_cast<uint8_t*>(PyArray_DATA(PyFrame));
    auto srcwidth = widthSrc > 0 ? widthSrc : width;
    auto srcheight = heightSrc > 0 ? heightSrc : height;
    memcpy(RGBbuffer, out_dataptr, static_cast<size_t>(srcwidth) * static_cast<size_t>(srcheight) * 3 * sizeof(uint8_t));
    // Assign appropriate parts of buffer to image planes in pFrameRGB Note that pFrameRGB is an AVFrame, but AVFrame is a superset of AVPicture
    av_image_fill_arrays(__frameRGB->data, __frameRGB->linesize, RGBbuffer, AVPixelFormat::AV_PIX_FMT_RGB24, srcwidth, srcheight, 1);
    sws_scale(PswsCtx, __frameRGB->data, __frameRGB->linesize, 0, srcheight, frame->data, frame->linesize);
    //cout << "Free 1" << endl;
    //delete frameRGB;
    //cout << "Free 2" << endl;
    return true;
}

/*
* encode one video frame and send it to the muxer
* return 1 when encoding is finished, 0 otherwise
*/
int cmpc::CMpegServer::__avcodec_encode_video2(AVCodecContext* enc_ctx, AVPacket* pkt, AVFrame* frame) {
    int ret;
    int wfret = 0;

    if (frame) {
        if (__dumpControl > 1) {
            std::ostringstream str_data;
            str_data << "Send frame " << frame->pts << endl;
            auto str_data_s = str_data.str();
            av_log(nullptr, AV_LOG_DEBUG, "%s", str_data_s.c_str());
        }
    }
    else {
        return AVERROR(EAGAIN);
    }

    ret = avcodec_send_frame(enc_ctx, frame);
    // In particular, we don't expect AVERROR(EAGAIN), because we read all
    // decoded frames with avcodec_receive_frame() until done.
    if (ret < 0) {
        return ret == AVERROR_EOF ? 0 : ret;
    }

    ret = avcodec_receive_packet(enc_ctx, pkt);
    if (ret == AVERROR(EAGAIN))
        return 0;

    if (__dumpControl > 0) {
        std::ostringstream str_data;
        str_data << "Write packet " << pkt->pts << " (size=" << pkt->size << "), ";
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_INFO, "%s", str_data_s.c_str());
    }

    if (!ret) {
        wfret = __write_frame();
        av_packet_unref(Ppacket);
        if (wfret < 0) {
            cerr << "Error while writing video frame: " << av_err2str(ret) << endl;
            return wfret;
        }
    }
    return ret;
}

int cmpc::CMpegServer::__avcodec_encode_video2_flush(AVCodecContext* enc_ctx, AVPacket* pkt) {
    int ret;
    int wfret = 0;
    if (__dumpControl > 1) {
        std::ostringstream str_data;
        str_data << "Flush all packets" << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_DEBUG, "%s", str_data_s.c_str());
    }

    ret = avcodec_send_frame(enc_ctx, nullptr);
    // In particular, we don't expect AVERROR(EAGAIN), because we read all
    // decoded frames with avcodec_receive_frame() until done.
    if (ret < 0) {
        return ret == AVERROR_EOF ? 0 : ret;
    }

    while (ret >= 0) {
        ret = avcodec_receive_packet(enc_ctx, pkt);
        if (ret == AVERROR_EOF || ret == AVERROR(EAGAIN)) {
            return 0;
        }
        if (__dumpControl > 0) {
            std::ostringstream str_data;
            str_data << "Write packet " << pkt->pts << " (size=" << pkt->size << "), ";
            auto str_data_s = str_data.str();
            av_log(nullptr, AV_LOG_INFO, "%s", str_data_s.c_str());
        }
        if (!ret) {
            wfret = __write_frame();
            av_packet_unref(pkt);
        }
        else {
            wfret = 0;
        }
        if (wfret < 0) {
            cerr << "Error while writing video frame: " << av_err2str(ret) << endl;
            return wfret;
        }
    }
    return ret;
}

int cmpc::CMpegServer::ServeFrameBlock(PyArrayObject* PyFrame) {
    if (__start_time > 0) {
        auto cur_time = static_cast<int64_t>(av_gettime() - __start_time);
        if (cur_time < __cur_time) {
            av_usleep(static_cast<unsigned int>((__cur_time - cur_time) / 2));
        }
        ServeFrame(PyFrame);
        return 0;
    }
    else {
        return -1;
    }
}

int cmpc::CMpegServer::ServeFrame(PyArrayObject* PyFrame) {
    int ret;
    auto c = PStreamContex.enc;
    AVFrame* frame = nullptr;

    if ((!__have_video) || (!__enable_header))
        cerr << "Not allowed to use this method before FFmpegSetup()" << endl;
    if (PyFrame) {
        frame = __get_video_frame(PyFrame);
        ret = __avcodec_encode_video2(c, Ppacket, frame);
    }
    else {
        frame = nullptr;
        ret = __avcodec_encode_video2_flush(c, Ppacket);
    }

    if (ret < 0) {
        cerr << "Error encoding video frame: " << av_err2str(ret) << endl;
        return ret;
    }
    return frame ? 0 : 1;
}

void cmpc::CMpegServer::setParameter(string keyword, void* ptr) {
    if (keyword.compare("decoder") == 0) {
        CMpegDecoder* ref = reinterpret_cast<CMpegDecoder*>(ptr);
        resetPath(ref->videoPath);
        codecName.assign(ref->_str_codec);
        if (ref->PCodecCtx) {
            bitRate = ref->PCodecCtx->bit_rate;
            GOPSize = ref->PCodecCtx->gop_size;
            MaxBFrame = ref->PCodecCtx->max_b_frames;
            if (PStreamContex.enc) {
                PStreamContex.enc->thread_count = ref->PCodecCtx->thread_count;
            }
            nthread = ref->PCodecCtx->thread_count;
        }
        else {
            if (PStreamContex.enc) {
                PStreamContex.enc->thread_count = ref->nthread;
            }
            nthread = ref->nthread;
        }
        if (ref->widthDst > 0 && ref->heightDst > 0) {
            width = ref->widthDst;
            height = ref->heightDst;
        }
        else {
            width = ref->width;
            height = ref->height;
        }
        widthSrc = width;
        heightSrc = height;
        if (ref->PVideoStream) {
            //timeBase = ref->PVideoStream->time_base;
            frameRate = ref->PVideoStream->avg_frame_rate;
            timeBase = _setAVRational(frameRate.den, frameRate.num);
        }
        if (GOPSize > 0) {
            auto frame_ahead = 2 * GOPSize;
            __pts_ahead = __FrameToPts(static_cast<int64_t>(frame_ahead));
        }
    }
    else if (keyword.compare("client") == 0) {
        CMpegClient* ref = reinterpret_cast<CMpegClient*>(ptr);
        resetPath(ref->videoPath);
        codecName.assign(ref->_str_codec);
        if (ref->PCodecCtx) {
            bitRate = ref->PCodecCtx->bit_rate;
            GOPSize = ref->PCodecCtx->gop_size;
            MaxBFrame = ref->PCodecCtx->max_b_frames;
            if (PStreamContex.enc) {
                PStreamContex.enc->thread_count = ref->PCodecCtx->thread_count;
            }
            nthread = ref->PCodecCtx->thread_count;
        }
        else {
            if (PStreamContex.enc) {
                PStreamContex.enc->thread_count = ref->nthread;
            }
            nthread = ref->nthread;
        }
        if (ref->widthDst > 0 && ref->heightDst > 0) {
            width = ref->widthDst;
            height = ref->heightDst;
        }
        else {
            width = ref->width;
            height = ref->height;
        }
        widthSrc = width;
        heightSrc = height;
        if (ref->PVideoStream) {
            //timeBase = ref->PVideoStream->time_base;
            frameRate = ref->PVideoStream->avg_frame_rate;
            timeBase = _setAVRational(frameRate.den, frameRate.num);
        }
        if (GOPSize > 0) {
            auto frame_ahead = 2 * GOPSize;
            __pts_ahead = __FrameToPts(static_cast<int64_t>(frame_ahead));
        }
    }
    else if (keyword.compare("configDict") == 0) {
        PyObject* ref = reinterpret_cast<PyObject*>(ptr);
        if (PyDict_Check(ref)) {
            string key;
            PyObject* val;
            // Set parameters.
            key.assign("videoPath");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyBytes_Check(val)) {
                    auto val_str = string(PyBytes_AsString(val));
                    resetPath(val_str);
                }
            }
            else {
                key.assign("videoAddress");
                val = PyDict_GetItemString(ref, key.c_str());
                if (val) {
                    if (PyBytes_Check(val)) {
                        auto val_str = string(PyBytes_AsString(val));
                        resetPath(val_str);
                    }
                }
            }
            key.assign("codecName");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyBytes_Check(val)) {
                    auto val_str = string(PyBytes_AsString(val));
                    codecName.assign(val_str);
                }
            }
            key.assign("bitRate");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num = static_cast<int64_t>(PyLong_AsLongLong(val));
                    bitRate = val_num;
                }
            }
            key.assign("GOPSize");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num = static_cast<int>(PyLong_AsLong(val));
                    GOPSize = val_num;
                }
            }
            key.assign("maxBframe");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num = static_cast<int>(PyLong_AsLong(val));
                    MaxBFrame = val_num;
                }
            }
            key.assign("width");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num = static_cast<int>(PyLong_AsLong(val));
                    width = val_num;
                    widthSrc = val_num;
                }
            }
            key.assign("height");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num = static_cast<int>(PyLong_AsLong(val));
                    height = val_num;
                    heightSrc = val_num;
                }
            }
            key.assign("widthSrc");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num_1 = static_cast<int>(PyLong_AsLong(val));
                    key.assign("heightSrc");
                    val = PyDict_GetItemString(ref, key.c_str());
                    if (val) {
                        if (PyLong_Check(val)) {
                            auto val_num_2 = static_cast<int>(PyLong_AsLong(val));
                            widthSrc = val_num_1;
                            heightSrc = val_num_2;
                        }
                    }
                }
            }
            key.assign("widthDst");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num_1 = static_cast<int>(PyLong_AsLong(val));
                    key.assign("heightDst");
                    val = PyDict_GetItemString(ref, key.c_str());
                    if (val) {
                        if (PyLong_Check(val)) {
                            auto val_num_2 = static_cast<int>(PyLong_AsLong(val));
                            width = val_num_1;
                            height = val_num_2;
                        }
                    }
                }
            }
            key.assign("frameRate");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyTuple_Check(val)) {
                    auto valObj = PyTuple_GetItem(val, 0);
                    int num = static_cast<int>(PyLong_AsLong(valObj));
                    valObj = PyTuple_GetItem(val, 1);
                    int den = static_cast<int>(PyLong_AsLong(valObj));
                    frameRate = _setAVRational(num, den);
                    timeBase = _setAVRational(den, num);
                    if (GOPSize > 0) {
                        auto frame_ahead = 2 * GOPSize;
                        __pts_ahead = __FrameToPts(static_cast<int64_t>(frame_ahead));
                    }
                }
            }
            key.assign("nthread");
            val = PyDict_GetItemString(ref, key.c_str());
            if (val) {
                if (PyLong_Check(val)) {
                    auto val_num = static_cast<int>(PyLong_AsLong(val));
                    if (PStreamContex.enc) {
                        PStreamContex.enc->thread_count = val_num;
                    }
                    nthread = val_num;
                }
            }
        }
    }
    else if (keyword.compare("videoAddress") == 0) {
        string* ref = reinterpret_cast<string*>(ptr);
        resetPath(*ref);
    }
    else if (keyword.compare("codecName") == 0) {
        string* ref = reinterpret_cast<string*>(ptr);
        codecName.assign(*ref);
    }
    else if (keyword.compare("bitRate") == 0) {
        double* ref = reinterpret_cast<double*>(ptr);
        auto bit_rate = static_cast<int64_t>((*ref) * 1024);
        bitRate = bit_rate;
    }
    else if (keyword.compare("width") == 0) {
        int* ref = reinterpret_cast<int*>(ptr);
        width = *ref;
    }
    else if (keyword.compare("height") == 0) {
        int* ref = reinterpret_cast<int*>(ptr);
        height = *ref;
    }
    else if (keyword.compare("widthSrc") == 0) {
        int* ref = reinterpret_cast<int*>(ptr);
        widthSrc = *ref;
    }
    else if (keyword.compare("heightSrc") == 0) {
        int* ref = reinterpret_cast<int*>(ptr);
        heightSrc = *ref;
    }
    else if (keyword.compare("GOPSize") == 0) {
        int* ref = reinterpret_cast<int*>(ptr);
        GOPSize = *ref;
    }
    else if (keyword.compare("frameAhead") == 0) {
        int* ref = reinterpret_cast<int*>(ptr);
        auto frame_ahead = *ref;
        __pts_ahead = __FrameToPts(static_cast<int64_t>(frame_ahead));
    }
    else if (keyword.compare("maxBframe") == 0) {
        int* ref = reinterpret_cast<int*>(ptr);
        MaxBFrame = *ref;
    }
    else if (keyword.compare("frameRate") == 0) {
        PyObject* ref = reinterpret_cast<PyObject*>(ptr);
        auto refObj = PyTuple_GetItem(ref, 0);
        int num = static_cast<int>(PyLong_AsLong(refObj));
        refObj = PyTuple_GetItem(ref, 1);
        int den = static_cast<int>(PyLong_AsLong(refObj));
        frameRate = _setAVRational(num, den);
        timeBase = _setAVRational(den, num);
        if (GOPSize > 0) {
            auto frame_ahead = 2 * GOPSize;
            __pts_ahead = __FrameToPts(static_cast<int64_t>(frame_ahead));
        }
    }
    else if (keyword.compare("nthread") == 0) {
        auto ref = reinterpret_cast<int*>(ptr);
        if (PStreamContex.enc) {
            PStreamContex.enc->thread_count = *ref;
        }
        nthread = *ref;
    }
}

PyObject* cmpc::CMpegServer::getParameter(string keyword) {
    if (keyword.compare("videoAddress") == 0) {
        return PyUnicode_DecodeFSDefaultAndSize(videoPath.c_str(), static_cast<Py_ssize_t>(videoPath.size()));
    }
    else if (keyword.compare("codecName") == 0) {
        return PyUnicode_DecodeFSDefaultAndSize(codecName.c_str(), static_cast<Py_ssize_t>(codecName.size()));
    }
    else if (keyword.compare("formatName") == 0) {
        return PyUnicode_DecodeFSDefaultAndSize(__formatName.c_str(), static_cast<Py_ssize_t>(__formatName.size()));
    }
    else if (keyword.compare("bitRate") == 0) {
        auto bit_rate = static_cast<double>(bitRate) / 1024;
        return Py_BuildValue("d", bit_rate);
    }
    else if (keyword.compare("width") == 0) {
        return Py_BuildValue("i", width);
    }
    else if (keyword.compare("height") == 0) {
        return Py_BuildValue("i", height);
    }
    else if (keyword.compare("widthSrc") == 0) {
        return Py_BuildValue("i", widthSrc);
    }
    else if (keyword.compare("heightSrc") == 0) {
        return Py_BuildValue("i", heightSrc);
    }
    else if (keyword.compare("GOPSize") == 0) {
        return Py_BuildValue("i", GOPSize);
    }
    else if (keyword.compare("maxBframe") == 0) {
        return Py_BuildValue("i", MaxBFrame);
    }
    else if (keyword.compare("ptsAhead") == 0) {
        return Py_BuildValue("L", __pts_ahead);
    }
    else if (keyword.compare("waitRef") == 0) {
        int64_t cur_time = 0;
        if (__start_time > 0) {
            cur_time = av_gettime() - __start_time;
            if (cur_time < __cur_time) {
                return Py_BuildValue("d", static_cast<double>(__cur_time - cur_time) * av_q2d(time_base_q) / 2);
            }
            else {
                return Py_BuildValue("d", 0.0);
            }
        }
        else {
            return Py_BuildValue("d", 0.0);
        }
    }
    else if (keyword.compare("frameRate") == 0) {
        auto frame_base = frameRate;
        auto frame_rate = static_cast<double>(frame_base.num) / static_cast<double>(frame_base.den);
        return Py_BuildValue("d", frame_rate);
    }
    else if (keyword.compare("nthread") == 0) {
        if (PStreamContex.enc) {
            return Py_BuildValue("i", PStreamContex.enc->thread_count);
        }
        else {
            return Py_BuildValue("i", nthread);
        }
    }
    else {
        Py_RETURN_NONE;
    }
}

PyObject* cmpc::CMpegServer::getParameter() {
    auto res = PyDict_New();
    string key;
    PyObject* val = nullptr;
    // Fill the values.
    key.assign("videoAddress");
    val = Py_BuildValue("y", videoPath.c_str());
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("codecName");
    val = Py_BuildValue("y", codecName.c_str());
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("formatName");
    val = Py_BuildValue("y", __formatName.c_str());
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("bitRate");
    val = Py_BuildValue("L", bitRate);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("GOPSize");
    val = Py_BuildValue("i", GOPSize);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("maxBframe");
    val = Py_BuildValue("i", MaxBFrame);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("ptsAhead");
    val = Py_BuildValue("L", __pts_ahead);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    if (widthSrc > 0) {
        key.assign("widthSrc");
        val = Py_BuildValue("i", widthSrc);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    if (heightSrc > 0) {
        key.assign("heightSrc");
        val = Py_BuildValue("i", heightSrc);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    key.assign("width");
    val = Py_BuildValue("i", width);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("height");
    val = Py_BuildValue("i", height);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("frameRate");
    val = Py_BuildValue("(ii)", frameRate.num, frameRate.den);
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    if (PStreamContex.enc) {
        key.assign("nthread");
        val = Py_BuildValue("i", PStreamContex.enc->thread_count);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    else {
        key.assign("nthread");
        val = Py_BuildValue("i", nthread);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    return res;
}

bool cmpc::CMpegServer::FFmpegSetup() {
    if (!__setup_check()) {
        cerr << "Have not get necessary and correct configurations, so FFmpegSetup() should not be called." << endl;
        return false;
    }
    AVCodec* video_codec = nullptr;
    int ret;

    if (Ppacket)
        av_packet_free(&Ppacket);
    Ppacket = av_packet_alloc();
    if (!Ppacket)
        return false;

    AVDictionary* opt = nullptr;
    //av_dict_set(&opt, "vcodec", codecName.c_str(), 0);
    //av_dict_set(&opt, "fflags", "", 0);

    /* allocate the output media context */
    //auto getFormat = av_guess_format(codecName.c_str(), nullptr, nullptr);
    string format_name;
    if (__formatName.compare("rtsp") == 0) {
        format_name.assign("rtsp");
    }
    else if(__formatName.compare("rtmp") == 0) {
        format_name.assign("flv");
    }
    else if (__formatName.compare("http") == 0) {
        format_name.assign("flv");
    }
    else if (__formatName.compare("ftp") == 0) {
        format_name.assign("flv");
    }
    else if (__formatName.compare("sftp") == 0) {
        format_name.assign("flv");
    }
    else {
        cout << "The format name " << __formatName << " is not supported. Now we only support \"rtsp\", \"rtmp\", \"http\"." << endl;
        return false;
    }
    avformat_alloc_output_context2(&PFormatCtx, nullptr, format_name.c_str(), videoPath.c_str());
    PFormatCtx->avoid_negative_ts = AVFMT_AVOID_NEG_TS_AUTO;
    if (!PFormatCtx) {
        cout << "Could not select the encoder. The allocation is failed." << endl;
        return false;
    }

    auto fmt = PFormatCtx->oformat;

    /* Add the audio and video streams using the default format codecs
    * and initialize the codecs. */
    if (fmt->video_codec != AVCodecID::AV_CODEC_ID_NONE) {
        if (!__add_stream(&video_codec)) {
            FFmpegClose();
            return false;
        }
        else
            __have_video = true;
    }

    /* Now that all the parameters are set, we can open the audio and
    * video codecs and allocate the necessary encode buffers. */
    if (__have_video) {
        if (!__open_video(video_codec, opt)) {
            FFmpegClose();
            return false;
        }
        else
            __have_video = true;
    }

    if (__dumpControl > 1) {
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 1);
    }

    /* open the output file, if needed */
    if (!(fmt->flags & AVFMT_NOFILE)) {
        AVDictionary* opt_io = nullptr;
        /*if (__formatName.compare("http") == 0) {
            ret = av_dict_set(&opt_io, "listen", "1", 0);
            if (ret < 0) {
                cerr << "Could not set the options for the file: " << av_err2str(ret) << endl;
                FFmpegClose();
                return false;
            }
        }*/
        ret = avio_open2(&PFormatCtx->pb, videoPath.c_str(), AVIO_FLAG_WRITE, nullptr, &opt_io);
        if (ret < 0) {
            cerr << "Could not open '" << videoPath << "': " << av_err2str(ret) << endl;
            FFmpegClose();
            return false;
        }
        if (opt_io) {
            av_dict_free(&opt_io);
        }
    }

    if (!(__frameRGB = av_frame_alloc())) {
        cerr << "Could Allocate Temp Frame" << endl;
        FFmpegClose();
        return false;
    }

    /* Write the stream header, if any. */
    ret = avformat_write_header(PFormatCtx, &opt);
    if (ret < 0) {
        cerr << "Error occurred when opening output file: " << av_err2str(ret) << endl;
        FFmpegClose();
        return false;
    }
    else {
        __enable_header = true;
    }

    // Register the start time.
    __start_time = av_gettime();
    return true;
}

void cmpc::CMpegServer::FFmpegClose() {
    if (__enable_header && __have_video) {
        //cout << "Flush Video" << endl;
        int x;
        if ((x = ServeFrame(nullptr)) == 0) {
            // cout << "Ret: " << x << endl;
        }
        if (__dumpControl > 0) {
            std::ostringstream str_data;
            str_data << "All frames are flushed from cache, the video would be closed." << endl;
            auto str_data_s = str_data.str();
            av_log(nullptr, AV_LOG_INFO, "%s", str_data_s.c_str());
        }
    }
    __start_time = 0;
    __cur_time = 0;
    if (PFormatCtx) {
        if (__enable_header) {
            av_write_trailer(PFormatCtx);
            __enable_header = false;
        }
        /* Close each codec. */
        if (__have_video) {
            /* free the stream */
            //avformat_free_context(PFormatCtx);
            if (PStreamContex.enc)
                avcodec_free_context(&PStreamContex.enc);
            if (PStreamContex.frame)
                av_frame_free(&PStreamContex.frame);
            if (PStreamContex.tmp_frame)
                av_frame_free(&PStreamContex.tmp_frame);
            if (PStreamContex.sws_ctx) {
                sws_freeContext(PStreamContex.sws_ctx);
                PStreamContex.sws_ctx = nullptr;
            }
            if (PswsCtx) {
                sws_freeContext(PswsCtx);
                PswsCtx = nullptr;
            }
            if (RGBbuffer) {
                av_free(RGBbuffer);
                RGBbuffer = nullptr;
            }
            __have_video = false;
        }
        auto fmt = PFormatCtx->oformat;
        if (!(fmt->flags & AVFMT_NOFILE))
            /* Close the output file. */
            avio_closep(&PFormatCtx->pb);
        /* free the stream */
        avformat_free_context(PFormatCtx);
        PFormatCtx = nullptr;
    }
    if (Ppacket) {
        av_packet_free(&Ppacket);
        Ppacket = nullptr;
    }
    if (__frameRGB) {
        av_frame_free(&__frameRGB);
    }
}

void cmpc::CMpegServer::dumpFormat() {
    if (PFormatCtx)
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 1);
    else
        cerr << "Not loaded video format context now. dumpFormat() is not avaliable." << endl;
}

ostream& cmpc::operator<<(ostream& out, cmpc::CMpegServer& self_class) {
    out << std::setw(1) << "/";
    out << std::setfill('*') << std::setw(44) << "" << std::setfill(' ') << endl;
    out << std::setw(1) << " * Packed FFmpeg Server - Y. Jin V" << MPEGCODER_CURRENT_VERSION << endl;
    out << " " << std::setfill('*') << std::setw(44) << "" << std::setfill(' ') << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * VideoAddress: " \
        << self_class.videoPath << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * (Width, Height): " \
        << self_class.width << ", " << self_class.height << endl;
    if (self_class.widthSrc > 0 && self_class.heightSrc > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * (WidthSrc, HeightSrc): " \
            << self_class.widthSrc << ", " << self_class.heightSrc << endl;
    }
    else if (self_class.widthSrc > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * WidthSrc: " \
            << self_class.widthSrc << endl;
    }
    else if (self_class.heightSrc > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * HeightSrc: " \
            << self_class.heightSrc << endl;
    }
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Enccoder: " \
        << self_class.codecName << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Stream format: " \
        << self_class.__formatName << endl;
    if (self_class.PStreamContex.enc) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * Thread number: " \
            << self_class.PStreamContex.enc->thread_count << endl;
    }
    else {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * Thread number (P): " \
            << self_class.nthread << endl;
    }
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Bit Rate: " \
        << (self_class.bitRate >> 10) << " [Kbit/s]" << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Frame Rate: " \
        << static_cast<double>(self_class.frameRate.num) / static_cast<double>(self_class.frameRate.den) << " [FPS]" << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Ahead PTS: " \
        << self_class.__pts_ahead << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * GOP Size: " \
        << self_class.GOPSize << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Maxmal Bframe Density: " \
        << self_class.MaxBFrame << " [/GOP]" << endl;
    out << std::setw(1) << " */";
    return out;
}

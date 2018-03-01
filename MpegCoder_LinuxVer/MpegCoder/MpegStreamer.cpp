//#include "stdafx.h"
#include "MpegStreamer.h"

cmpc::CMpegClient::CMpegClient(void) :
    width(0), height(0), widthDst(0), heightDst(0), PPixelFormat(AV_PIX_FMT_NONE), PVideoStreamIDX(0),
    PVideoFrameCount(0), cache_size(0), read_size(0), frameRate({ 0,0 }), reading(false),
    _duration(0), _predictFrameNum(0), refcount(0), PFormatCtx(nullptr), PCodecCtx(nullptr),
    PVideoStream(nullptr), frame(nullptr), PswsCtx(nullptr), buffer(), read_handle(), read_check(),
    info_lock(){
}
cmpc::CMpegClient::~CMpegClient(void) {
    clear();
}
cmpc::CMpegClient::CMpegClient(CMpegClient &&ref) noexcept:
    width(ref.width), height(ref.height), widthDst(ref.widthDst), heightDst(ref.heightDst), 
    PPixelFormat(ref.PPixelFormat), PVideoStreamIDX(ref.PVideoStreamIDX), PVideoFrameCount(ref.PVideoFrameCount), 
    cache_size(ref.cache_size), read_size(ref.read_size), frameRate(ref.frameRate), reading(ref.reading),
    _duration(ref._duration), _predictFrameNum(ref._predictFrameNum), refcount(ref.refcount), 
    PFormatCtx(ref.PFormatCtx), PCodecCtx(ref.PCodecCtx), PVideoStream(ref.PVideoStream), frame(ref.frame), 
    PswsCtx(ref.PswsCtx), buffer(std::move(ref.buffer)), read_check(),
    info_lock(){
    read_handle = std::move(ref.read_handle);
    ref.PFormatCtx = nullptr;
    ref.PCodecCtx = nullptr;
    ref.PVideoStream = nullptr;
    ref.frame = nullptr;
    ref.PswsCtx = nullptr;
}
cmpc::CMpegClient& cmpc::CMpegClient::operator=(CMpegClient &&ref) noexcept {
    if (this != &ref) {
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
        read_handle = std::move(ref.read_handle);
        ref.PFormatCtx = nullptr;
        ref.PCodecCtx = nullptr;
        ref.PVideoStream = nullptr;
        ref.frame = nullptr;
        ref.PswsCtx = nullptr;
    }
}

void cmpc::CMpegClient::meta_protected_clear(void) {
    auto protectWidth = widthDst;
    auto protectHeight = heightDst;
    auto protectCacheSize = cache_size;
    auto protectReadSize = read_size;
    auto protectFrameRate = frameRate;
    clear();
    widthDst = protectWidth;
    heightDst = protectHeight;
    cache_size = protectCacheSize;
    read_size = protectReadSize;
    frameRate = protectFrameRate;
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
    width = height = 0;
    widthDst = heightDst = 0;
    PPixelFormat = AV_PIX_FMT_NONE;
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
    read_check.try_lock();
    read_check.unlock();
    info_lock.try_lock();
    info_lock.unlock();
    PVideoStream = nullptr;
    if (frame) {
        av_frame_free(&frame);
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
    AVFormatContext *PFormatCtx, enum AVMediaType type) { //搜索合适的解码器，并进行相关设置
    int ret;
    AVStream *st;               // 流
    AVCodec *dec = nullptr;        // 解码器
    AVDictionary *opts = nullptr;  // 参数设置字典

                                   //search video stream
    ret = av_find_best_stream(PFormatCtx, type, -1, -1, nullptr, 0);
    if (ret < 0) {
        cerr << "Could not find " << av_get_media_type_string(type) << \
            " stream in input address: '" << videoPath << "'" << endl;
        return ret;
    }
    else {
        stream_idx = ret;
        st = PFormatCtx->streams[stream_idx];

        /* find decoder for the stream */
        dec = avcodec_find_decoder(st->codecpar->codec_id);
        if (!dec) {
            cerr << "Failed to find " << av_get_media_type_string(type) << " codec" << endl;
            return AVERROR(EINVAL);
        }
        _str_codec.assign(dec->name);

        /* Allocate a codec context for the decoder / Add this to allocate the context by codec */
        dec_ctx = avcodec_alloc_context3(dec);
        if (!dec_ctx) {
            cerr << "Failed to allocate the " << av_get_media_type_string(type) << " codec context" << endl;
            return AVERROR(ENOMEM);
        }

        /* Copy codec parameters from input stream to output codec context */
        if ((ret = avcodec_parameters_to_context(dec_ctx, st->codecpar)) < 0) {
            cerr << "Failed to copy " << av_get_media_type_string(type) << \
                " codec parameters to decoder context" << endl;
            return ret;
        }

        /* Init the decoders, with or without reference counting */
        av_dict_set(&opts, "refcounted_frames", refcount ? "1" : "0", 0);
        if ((ret = avcodec_open2(dec_ctx, dec, &opts)) < 0) {
            cerr << "Failed to open " << av_get_media_type_string(type) << " codec" << endl;
            return ret;
        }

    }
    return 0;
}

bool cmpc::CMpegClient::__setup_check() {
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
        cerr << "Have not get necessary configurations set, so FFmpegSetup() should not be called." << endl;
        return false;
    }
    meta_protected_clear();
    // Open the initial context variables that are needed
    PFormatCtx = avformat_alloc_context();
    PCodecCtx = nullptr;

    // Register everything
    av_register_all();
    avformat_network_init();

    /* open RTSP: register all formats and codecs */
    if (avformat_open_input(&PFormatCtx, videoPath.c_str(), nullptr, nullptr) < 0) {
        cerr << "Could not open source address " << videoPath << endl;
        clear();
        return false;
    } // "rtsp://134.169.178.187:8554/h264.3gp"

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
    if (__dumpControl > 1)
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 0);

    if (!PVideoStream) { //检查视频流是否正常开启
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
    if (!buffer.reset_memory()) { //是否分配好存储区
        cerr << "Could not allocate the memory of frame buffer list." << endl;
        clear();
        return false;
    }

    reading = true;
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

AVRational cmpc::CMpegClient::_setAVRational(int num, int den) {
    AVRational res;
    res.num = num; res.den = den;
    return res;
}

int cmpc::CMpegClient::__save_frame(AVFrame *&frame, AVPacket &pkt, bool &got_frame, int cached) {
    int ret = 0;
    int decoded = pkt.size;

    got_frame = false;

    if (pkt.stream_index == PVideoStreamIDX) {
        /* decode video frame */
        ret = __avcodec_decode_video2(PCodecCtx, frame, got_frame, &pkt);
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
            if (__dumpControl > 1) {
                cout << "video_frame" << (cached ? "(cached)" : "") << " n:" << PVideoFrameCount <<
                    " coded_n:" << frame->coded_picture_number << endl;
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

bool cmpc::CMpegClient::__client_holder() {
    int ret;
    bool got_frame;
    frame = av_frame_alloc();
    AVPacket pkt;
    if (!frame) {
        cerr << "Could not allocate frame" << endl;
        ret = AVERROR(ENOMEM);
        return false;
    }
    /* initialize packet, set data to NULL, let the demuxer fill it */
    av_init_packet(&pkt);
    pkt.data = nullptr;
    pkt.size = 0;
    if (PVideoStream && (__dumpControl > 0))
        cout << "Demuxing video from address '" << videoPath << "' into Python-List" << endl;

    /* Reset the contex to remove the flushed state. */
    avcodec_flush_buffers(PCodecCtx);

    /* read frames from the file */
    info_lock.lock();
    PVideoFrameCount = 0;
    info_lock.unlock();

    //start reading packets from stream and write them to file
    av_read_play(PFormatCtx);    //play RTSP

    while (av_read_frame(PFormatCtx, &pkt) >= 0) {
        //cout << "[Test - " << pkt.size << " ]" << endl;
        AVPacket orig_pkt = pkt;
        do {
            ret = __save_frame(frame, pkt, got_frame, 0);
            if (ret < 0)
                break;
            pkt.data += ret;
            pkt.size -= ret;
        } while (pkt.size > 0);
        av_packet_unref(&orig_pkt);
        if (read_check.try_lock()) {
            if (!reading) {
                read_check.unlock();
                break;
            }
            else {
                read_check.unlock();
            }
        }
    }

    /* flush cached frames */
    pkt.data = nullptr;
    pkt.size = 0;
    do {
        __save_frame(frame, pkt, got_frame, 1);
    } while (got_frame);

    //cout << "Demuxing succeeded." << endl;

    if (PVideoStream && (__dumpControl > 0)) {
        cout << "End of stream client." << endl;
    }

    if (frame) {
        av_frame_free(&frame);
    }
    return true;
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
        return nullptr;
    }
    buffer.freezeWrite(readsize);
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
}

PyObject * cmpc::CMpegClient::getParameter(string keyword) {
    if (keyword.compare("videoPath") == 0) {
        return Py_BuildValue("y", videoPath.c_str());
    }
    else if (keyword.compare("width") == 0) {
        return Py_BuildValue("i", width);
    }
    else if (keyword.compare("height") == 0) {
        return Py_BuildValue("i", height);
    }
    else if (keyword.compare("frameCount") == 0) {
        info_lock.lock();
        return Py_BuildValue("i", PVideoFrameCount);
        info_lock.unlock();
    }
    else if (keyword.compare("coderName") == 0) {
        return Py_BuildValue("y", _str_codec.c_str());
    }
    else if (keyword.compare("duration") == 0) {
        return Py_BuildValue("d", _duration);
    }
    else if (keyword.compare("estFrameNum") == 0) {
        return Py_BuildValue("L", _predictFrameNum);
    }
    else if (keyword.compare("srcFrameRate") == 0) {
        auto frame_base = PVideoStream->avg_frame_rate;
        double srcFrameRate = static_cast<double>(frame_base.num) / static_cast<double>(frame_base.den);
        return Py_BuildValue("d", srcFrameRate);
    }
    else {
        Py_RETURN_NONE;
    }
}

bool cmpc::CMpegClient::start() {
    if (reading || (frame!=nullptr)) {
        read_handle = std::move(std::thread(std::mem_fn(&CMpegClient::__client_holder), std::ref(*this)));
        return true;
    }
    return false;
}
void cmpc::CMpegClient::terminate() {
    auto protectReading = true;
    if (read_handle.joinable()) {
        read_check.lock();
        reading = false;
        read_check.unlock();
        read_handle.join();
        //std::terminate();
        read_handle = std::move(std::thread());
    }
    read_check.try_lock();
    read_check.unlock();
    info_lock.try_lock();
    info_lock.unlock();
    reading = protectReading;
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
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * VideoPath: " \
        << self_class.videoPath << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * (Width, Height): " \
        << self_class.width << ", " << self_class.height << endl;
    if (self_class.widthDst > 0 && self_class.heightDst > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * (WidthDst, HeightDst): " \
            << self_class.widthDst << ", " << self_class.heightDst << endl;
    }
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Deccoder: " \
        << self_class._str_codec << endl;
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
    out << std::setw(1) << "*/";
    return out;
}

cmpc::Buffer_List::Buffer_List(void): 
    _Buffer_pos(0), _Buffer_rpos(-1), _Buffer_size(0), dst_width(0), dst_height(0), _Buffer_capacity(0),
    _Buffer_List(nullptr), __Read_size(0), next_pts(0), interval_pts(0), src_width(0), src_height(0), 
    frameRGB(nullptr){
}
cmpc::Buffer_List::~Buffer_List(void) {
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
cmpc::Buffer_List::Buffer_List(const Buffer_List &ref):
    _Buffer_pos(ref._Buffer_pos), _Buffer_rpos(ref._Buffer_rpos), _Buffer_size(ref._Buffer_size), 
    dst_width(ref.dst_width), dst_height(ref.dst_height), _Buffer_capacity(ref._Buffer_capacity),
    __Read_size(ref.__Read_size), next_pts(ref.next_pts), interval_pts(ref.interval_pts),
    src_width(ref.src_width), src_height(ref.src_height), frameRGB(ref.frameRGB){
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
cmpc::Buffer_List& cmpc::Buffer_List::operator=(const Buffer_List &ref) {
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
cmpc::Buffer_List::Buffer_List(Buffer_List &&ref) noexcept: 
    _Buffer_pos(ref._Buffer_pos), _Buffer_rpos(ref._Buffer_rpos), _Buffer_size(ref._Buffer_size),
    dst_width(ref.dst_width), dst_height(ref.dst_height), _Buffer_capacity(ref._Buffer_capacity),
    _Buffer_List(ref._Buffer_List), __Read_size(ref.__Read_size), next_pts(ref.next_pts),
    interval_pts(ref.interval_pts), src_width(ref.src_width), src_height(ref.src_height), 
    frameRGB(ref.frameRGB) {
    ref._Buffer_List = nullptr;
    ref.frameRGB = nullptr;
}
cmpc::Buffer_List& cmpc::Buffer_List::operator=(Buffer_List &&ref) noexcept {
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
void cmpc::Buffer_List::clear(void) {
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
const int64_t cmpc::Buffer_List::size() const {
    return _Buffer_size;
}
void cmpc::Buffer_List::set(int64_t set_size, int width, int height, int widthDst, int heightDst) {
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
void cmpc::Buffer_List::set_timer(AVRational targetFrameRate, AVRational timeBase) {
    auto interval_pts = av_rescale(av_rescale(1, timeBase.den, timeBase.num), targetFrameRate.den, targetFrameRate.num);
}
bool cmpc::Buffer_List::reset_memory() {
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
void cmpc::Buffer_List::freezeWrite(int64_t read_size) {
    auto read_pos = _Buffer_pos - read_size;
    if (read_pos < 0) {
        read_pos += _Buffer_size;
    }
    _Buffer_rpos = read_pos;
    __Read_size = read_size;
}
bool cmpc::Buffer_List::write(SwsContext *PswsCtx, AVFrame *frame) {
    if (frame->pts < next_pts)
        return false;
    else
        next_pts += interval_pts;
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
PyObject * cmpc::Buffer_List::read() {
    if (_Buffer_rpos < 0) {
        return nullptr;
    }
    else if (PyArray_API == nullptr) {
        import_array();
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
    _Buffer_rpos = -1;
    __Read_size = 0;
    return PyFrame;
}
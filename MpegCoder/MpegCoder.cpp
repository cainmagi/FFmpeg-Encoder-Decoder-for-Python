// MpegCoder.cpp: 定义 DLL 应用程序的导出函数。
//

#include "stdafx.h"

#define NO_IMPORT_ARRAY
#define PY_ARRAY_UNIQUE_SYMBOL MPEGARRAY_API
#include <numpy/arrayobject.h>
#include "MpegCoder.h"
#include "MpegStreamer.h"

int8_t cmpc::__dumpControl = 1;

// 这是已导出类的构造函数。
// 有关类定义的信息，请参阅 MpegCoder.h

// Constructors.
cmpc::CMpegDecoder::CMpegDecoder(void)
    : PFormatCtx(nullptr), PCodecCtx(nullptr), width(0), height(0), PVideoStream(nullptr), \
    PVideoStreamIDX(-1), PVideoFrameCount(0), _duration(0), _predictFrameNum(0), RGBbuffer(nullptr), \
    PswsCtx(nullptr), currentGOPTSM(0), EndofGOP(false), widthDst(0), heightDst(0), \
    PPixelFormat(STREAM_PIX_FMT) {
    videoPath.clear();
    _str_codec.clear();

    /* Enable or disable frame reference counting. You are not supposed to support
    * both paths in your application but pick the one most appropriate to your
    * needs. Look for the use of refcount in this example to see what are the
    * differences of API usage between them. */
    refcount = 1;
}

void cmpc::CMpegDecoder::meta_protected_clear(void) {
    auto protectWidth = widthDst;
    auto protectHeight = heightDst;
    clear();
    widthDst = protectWidth;
    heightDst = protectHeight;
}

void cmpc::CMpegDecoder::clear(void) {
    width = height = 0;
    widthDst = heightDst = 0;
    PVideoStreamIDX = -1;
    PVideoFrameCount = 0;
    _duration = 0;
    _predictFrameNum = 0;
    currentGOPTSM = 0;
    EndofGOP = false;
    PPixelFormat = STREAM_PIX_FMT;
    _str_codec.clear();
    //videoPath.clear();

    PVideoStream = nullptr;
    if (PswsCtx) {
        sws_freeContext(PswsCtx);
        PswsCtx = nullptr;
    }
    if (RGBbuffer) {
        av_free(RGBbuffer);
        RGBbuffer = nullptr;
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

cmpc::CMpegDecoder::~CMpegDecoder() {
    clear();
}

cmpc::CMpegDecoder::CMpegDecoder(const CMpegDecoder &ref) {
    videoPath.assign(ref.videoPath);
    if (!FFmpegSetup()) {
        clear();
    }
}

cmpc::CMpegDecoder& cmpc::CMpegDecoder::operator=(const CMpegDecoder &ref) {
    videoPath.assign(ref.videoPath);
    if (!FFmpegSetup()) {
        clear();
    }
    return *this;
}

cmpc::CMpegDecoder::CMpegDecoder(CMpegDecoder &&ref) noexcept
    : PFormatCtx(ref.PFormatCtx), PCodecCtx(ref.PCodecCtx), width(ref.width), height(ref.height), \
    PVideoStream(ref.PVideoStream), PVideoStreamIDX(ref.PVideoStreamIDX), refcount(ref.refcount), \
    PVideoFrameCount(ref.PVideoFrameCount), _str_codec(ref._str_codec), _duration(ref._duration), \
    _predictFrameNum(ref._predictFrameNum), RGBbuffer(ref.RGBbuffer), PPixelFormat(ref.PPixelFormat) \
    , PswsCtx(ref.PswsCtx), currentGOPTSM(ref.currentGOPTSM), EndofGOP(ref.EndofGOP), \
    widthDst(ref.widthDst), heightDst(ref.heightDst){
    ref.PFormatCtx = nullptr;
    ref.PCodecCtx = nullptr;
    ref.PVideoStream = nullptr;
    ref.PswsCtx = nullptr;
}

cmpc::CMpegDecoder& cmpc::CMpegDecoder::operator=(CMpegDecoder &&ref) noexcept {
    if (this != &ref) {
        clear();
        width = ref.width;
        height = ref.height;
        widthDst = ref.widthDst;
        heightDst = ref.heightDst;
        PVideoStreamIDX = ref.PVideoStreamIDX;
        videoPath.assign(ref.videoPath);
        _str_codec.assign(ref._str_codec);
        _duration = ref._duration;
        _predictFrameNum = ref._predictFrameNum;
        PFormatCtx = ref.PFormatCtx;
        PCodecCtx = ref.PCodecCtx;
        PVideoStream = ref.PVideoStream;
        PVideoFrameCount = ref.PVideoFrameCount;
        currentGOPTSM = ref.currentGOPTSM;
        EndofGOP = ref.EndofGOP;
        RGBbuffer = ref.RGBbuffer;
        PPixelFormat = ref.PPixelFormat;
        PswsCtx = ref.PswsCtx;
        ref.PFormatCtx = nullptr;
        ref.PCodecCtx = nullptr;
        ref.PVideoStream = nullptr;
        ref.RGBbuffer = nullptr;
        ref.PswsCtx = nullptr;
        refcount = ref.refcount;
    }
    return *this;
}

void cmpc::CMpegDecoder::resetPath(string inVideoPath) {
    videoPath.assign(inVideoPath);
}

//以下是封装FFmpeg的C接口
void cmpc::CMpegDecoder::setGOPPosition(int64_t inpos) {
    currentGOPTSM = __FrameToPts(inpos);
    EndofGOP = false;
}

void cmpc::CMpegDecoder::setGOPPosition(double inpos) {
    currentGOPTSM = __TimeToPts(inpos);
    EndofGOP = false;
}

int cmpc::CMpegDecoder::_open_codec_context(int &stream_idx, AVCodecContext *&dec_ctx, \
    AVFormatContext *PFormatCtx, enum AVMediaType type) { // Search the correct decoder, and make the configurations.
    auto ret = av_find_best_stream(PFormatCtx, type, -1, -1, nullptr, 0);
    if (ret < 0) {
        cerr << "Could not find "<< av_get_media_type_string(type)  << \
            " stream in input file '" << videoPath << "'" << endl;
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

        /* Allocate a codec context for the decoder */
        auto dec_ctx_ = avcodec_alloc_context3(dec);  // Decoder context (AVCodecContext).
        if (!dec_ctx_) {
            cerr << "Failed to allocate the " << av_get_media_type_string(type) << " codec context" << endl;
            return AVERROR(ENOMEM);
        }

        /* Copy codec parameters from input stream to output codec context */
        if ((ret = avcodec_parameters_to_context(dec_ctx_, st->codecpar)) < 0) {
            cerr << "Failed to copy " << av_get_media_type_string(type) << \
                " codec parameters to decoder context" << endl;
            return ret;
        }

        /* Init the decoders, with or without reference counting */
        AVDictionary *opts = nullptr;  // The uninitialized argument dictionary.
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

bool cmpc::CMpegDecoder::FFmpegSetup(string inVideoPath) {
    resetPath(inVideoPath);
    return FFmpegSetup();
}

bool cmpc::CMpegDecoder::FFmpegSetup() {  // Open the video file, and search the correct codec.
    meta_protected_clear();
    int ret = 0;

    /* open input file, and allocate format context */
    if (avformat_open_input(&PFormatCtx, videoPath.c_str(), nullptr, nullptr) < 0) {
        cerr << "Could not open source file " << videoPath << endl;
        return false;
    }

    /* retrieve stream information */
    if (avformat_find_stream_info(PFormatCtx, nullptr) < 0) {
        cerr <<  "Could not find stream information" << endl;
        return false;
    }

    if (_open_codec_context(PVideoStreamIDX, PCodecCtx, PFormatCtx, AVMediaType::AVMEDIA_TYPE_VIDEO) >= 0) {
        PVideoStream = PFormatCtx->streams[PVideoStreamIDX];
        auto time_base = PVideoStream->time_base;
        auto frame_base = PVideoStream->avg_frame_rate;

        /* allocate image where the decoded image will be put */
        width = PCodecCtx->width;
        height = PCodecCtx->height;
        PPixelFormat = PCodecCtx->pix_fmt;
        _duration = static_cast<double>(PVideoStream->duration) / static_cast<double>(time_base.den) * static_cast<double>(time_base.num);
        _predictFrameNum = av_rescale(static_cast<int64_t>(_duration*0xFFFF), frame_base.num, frame_base.den)/0xFFFF;
    }

    /* dump input information to stderr */
    auto dump_level = av_log_get_level();
    if (dump_level >= AV_LOG_INFO) {
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 0);
    }

    if (!PVideoStream) { // Check whether the video stream is opened correctly.
        cerr << "Could not find audio or video stream in the input, aborting" << endl;
        clear();
        return false;
    }

    // Initialize SWS context for software scaling.
    if (widthDst > 0 && heightDst > 0) {
        PswsCtx = sws_getContext(width, height, PPixelFormat, widthDst, heightDst, AVPixelFormat::AV_PIX_FMT_RGB24, SCALE_FLAGS, nullptr, nullptr, nullptr);
        auto numBytes = av_image_get_buffer_size(AVPixelFormat::AV_PIX_FMT_RGB24, widthDst, heightDst, 1);
        RGBbuffer = (uint8_t *)av_malloc(numBytes * sizeof(uint8_t));
    }
    else {
        PswsCtx = sws_getContext(width, height, PPixelFormat, width, height, AVPixelFormat::AV_PIX_FMT_RGB24, SCALE_FLAGS, nullptr, nullptr, nullptr);
        auto numBytes = av_image_get_buffer_size(AVPixelFormat::AV_PIX_FMT_RGB24, width, height, 1);
        RGBbuffer = (uint8_t *)av_malloc(numBytes * sizeof(uint8_t));
    }
    return true;
}

void cmpc::CMpegDecoder::dumpFormat() {
    if ((!videoPath.empty()) && PFormatCtx) {
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 0);
    }
    else {
        cerr << "Still need to FFmpegSetup()" << endl;
    }
}

void cmpc::CMpegDecoder::setParameter(string keyword, void *ptr) {
    if (keyword.compare("widthDst") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        widthDst = *ref;
    }
    else if (keyword.compare("heightDst") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        heightDst = *ref;
    }
}

PyObject* cmpc::CMpegDecoder::getParameter() {
    auto res = PyDict_New();
    string key;
    PyObject* val = nullptr;
    // Fill the values.
    key.assign("videoPath");
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
        auto &frame_rate = PVideoStream->avg_frame_rate;
        val = Py_BuildValue("(ii)", frame_rate.num, frame_rate.den);
        PyDict_SetItemString(res, key.c_str(), val);
        Py_DECREF(val);
    }
    return res;
}

PyObject * cmpc::CMpegDecoder::getParameter(string keyword) {
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
        return Py_BuildValue("i", PVideoFrameCount);
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
    else if (keyword.compare("avgFrameRate") == 0) {
        auto frame_base = PVideoStream->avg_frame_rate;
        double frameRate = static_cast<double>(frame_base.num) / static_cast<double>(frame_base.den);
        return Py_BuildValue("d", frameRate);
    }
    else {
        Py_RETURN_NONE;
    }
}

// The flush packet is a non-NULL packet with size 0 and data NULL
int cmpc::CMpegDecoder::__avcodec_decode_video2(AVCodecContext *avctx, AVFrame *frame, bool &got_frame, AVPacket *pkt) {
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

int cmpc::CMpegDecoder::_SaveFrame(PyObject *PyFrameList, AVFrame *&frame, AVFrame *&frameRGB, AVPacket *&pkt, bool &got_frame, int64_t minPTS, bool &processed, int cached) {
    int ret = 0;
    int decoded = pkt->size;
    PyObject *OneFrame = nullptr;

    got_frame = false;

    if (pkt->stream_index == PVideoStreamIDX) {
        /* decode video frame */
        ret = __avcodec_decode_video2(PCodecCtx, frame, got_frame, pkt);
        if (ret < 0) {
            cout << "Error decoding video frame (" << av_err2str(ret) << ")" << endl;
            return ret;
        }

        if (got_frame) {

            if (frame->pts < minPTS) {
                //cout << frame->pts << " < " << minPTS << endl;
                processed = false;
                return decoded;
            }

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

            
            PVideoFrameCount++;
            if (__dumpControl > 0) {
                std::ostringstream str_data;
                str_data << "video_frame" << (cached ? "(cached)" : "") << " n:" << PVideoFrameCount <<
                         " coded_n:" << frame->coded_picture_number << endl;
                auto str_data_s = str_data.str();
                av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
            }

            /* copy decoded frame to destination buffer:
            * this is required since rawvideo expects non aligned data */

            sws_scale(PswsCtx, frame->data, frame->linesize, 0, height, frameRGB->data, frameRGB->linesize);
            
            /* write to rawvideo file */
            if (widthDst>0 && heightDst>0)
                OneFrame = _SaveFrame_castToPyFrameArray(frameRGB->data, widthDst, heightDst);
            else
                OneFrame = _SaveFrame_castToPyFrameArray(frameRGB->data, width, height);
            PyList_Append(PyFrameList, OneFrame);
            processed = true;
        }
    }

    /* If we use frame reference counting, we own the data and need
    * to de-reference it when we don't use it anymore */

    if (got_frame && refcount)
        av_frame_unref(frame);

    return decoded;
}

int cmpc::CMpegDecoder::_SaveFrameForGOP(PyObject *PyFrameList, AVFrame *&frame, AVFrame *&frameRGB, AVPacket *&pkt, bool &got_frame, int &GOPstate, bool &processed, int cached) {
    int ret = 0;
    int decoded = pkt->size;
    PyObject *OneFrame = nullptr;

    got_frame = false;

    if (pkt->stream_index == PVideoStreamIDX) {
        /* decode video frame */
        ret = __avcodec_decode_video2(PCodecCtx, frame, got_frame, pkt);
        if (ret < 0) {
            cout << "Error decoding video frame (" << av_err2str(ret) << ")" << endl;
            return ret;
        }

        if (got_frame) {

            currentGOPTSM = frame->pts+1;

            switch (GOPstate) {
            case 0:
                if (frame->key_frame) {
                    GOPstate = 1;
                }
                else {
                    processed = false;
                    return decoded;
                }
                break;
            case 1:
                if (frame->key_frame) {
                    GOPstate = 2;
                    processed = false;
                    return decoded;
                }
                break;
            default:
                break;
            }

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

            PVideoFrameCount++;
            if (__dumpControl > 0) {
                std::ostringstream str_data;
                str_data << "video_frame" << (cached ? "(cached)" : "") << " n:" << PVideoFrameCount <<
                    " coded_n:" << frame->coded_picture_number << endl;
                auto str_data_s = str_data.str();
                av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
            }

            /* copy decoded frame to destination buffer:
            * this is required since rawvideo expects non aligned data */
            /*av_image_copy(video_dst_data, video_dst_linesize,
                (const uint8_t **)frame->data, frame->linesize,
                PPixelFormat, width, height);*/

            sws_scale(PswsCtx, frame->data, frame->linesize, 0, height, frameRGB->data, frameRGB->linesize);

            /* write to rawvideo file */
            if (widthDst>0 && heightDst>0)
                OneFrame = _SaveFrame_castToPyFrameArray(frameRGB->data, widthDst, heightDst);
            else
                OneFrame = _SaveFrame_castToPyFrameArray(frameRGB->data, width, height);
            PyList_Append(PyFrameList, OneFrame);
            //cout << "[" << width << "-" << height << ", " << width*height << ", " << video_dst_bufsize << "]" << endl;
            //cout << "PTS = " << frameRGB->pts << ", coded Fnum = " << frameRGB->coded_picture_number << endl;
            processed = true;
        }
    }

    /* If we use frame reference counting, we own the data and need
    * to de-reference it when we don't use it anymore */

    if (got_frame && refcount)
        av_frame_unref(frame);

    return decoded;
}

PyObject *cmpc::CMpegDecoder::_SaveFrame_castToPyFrameArray(uint8_t *data[], int fWidth, int fHeight) {
    npy_intp dims[] = { fHeight, fWidth, 3 };
    auto newdata = new uint8_t[static_cast<size_t>(fHeight) * static_cast<size_t>(fWidth) * 3];
    memcpy(newdata, data[0], static_cast<size_t>(fHeight) * static_cast<size_t>(fWidth) * 3);
    PyObject *PyFrame = PyArray_SimpleNewFromData(3, dims, NPY_UINT8, reinterpret_cast<void *>(newdata));
    PyArray_ENABLEFLAGS((PyArrayObject*)PyFrame, NPY_ARRAY_OWNDATA);
    return PyFrame;
}

attribute_deprecated
PyObject *cmpc::CMpegDecoder::_SaveFrame_castToPyFrameArrayOld(uint8_t *data[], int fWidth, int fHeight) {
    npy_intp dims[] = { static_cast<size_t>(fHeight) * static_cast<size_t>(fWidth) * 3 };
    PyObject *PyFrame = PyArray_SimpleNew(1, dims, NPY_UINT8);
    if (PyFrame == NULL) {
        Py_RETURN_NONE;
    }
    auto out_iter = NpyIter_New((PyArrayObject *)PyFrame, NPY_ITER_READWRITE,
        NPY_CORDER, NPY_NO_CASTING, NULL);
    if (out_iter == NULL) {
        Py_DECREF(PyFrame);
        Py_RETURN_NONE;
    }
    /*
    * The iternext function gets stored in a local variable
    * so it can be called repeatedly in an efficient manner.
    */
    auto iternext = NpyIter_GetIterNext(out_iter, NULL);
    if (iternext == NULL) {
        NpyIter_Deallocate(out_iter);
        Py_DECREF(PyFrame);
        Py_RETURN_NONE;
    }
    /* The location of the data pointer which the iterator may update */
    auto dataptr = NpyIter_GetDataPtrArray(out_iter);
    //auto out_iter = (PyArrayIterObject *)PyArray_IterNew(PyFrame);
    uint8_t * pdata = data[0];
    for (auto i = 0; i < fHeight; i++) {
        for (auto j = 0; j < fWidth; j++) {
            for (auto k = 0; k < 3; k++, pdata++ ) {
                uint8_t * out_dataptr = (uint8_t *) (*dataptr);
                *out_dataptr = *pdata;
                iternext(out_iter);
            }
        }
    }
    PyObject *pyshape = Py_BuildValue("[iii]", fHeight, fWidth, 3);
    PyFrame = PyArray_Reshape((PyArrayObject*)PyFrame, pyshape);
    Py_DECREF(pyshape);
    NpyIter_Deallocate(out_iter);
    PyGC_Collect();
    //Py_INCREF(PyFrame);
    return PyFrame;
}

int64_t cmpc::CMpegDecoder::__FrameToPts(int64_t seekFrame) const{
    auto time_base = PVideoStream->time_base;
    auto frame_base = PVideoStream->avg_frame_rate;
    //cout << "Frame_Base: den=" << frame_base.den << ", num=" << frame_base.num << endl;
    auto seekTimeStamp = PVideoStream->start_time + av_rescale( av_rescale(seekFrame, time_base.den, time_base.num), frame_base.den, frame_base.num );
    return seekTimeStamp;
}

int64_t cmpc::CMpegDecoder::__TimeToPts(double seekTime) const {
    auto time_base = PVideoStream->time_base;
    auto seekTimeStamp = PVideoStream->start_time + av_rescale(static_cast<int64_t>(seekTime*1000), time_base.den, time_base.num)/1000;
    return seekTimeStamp;
}

bool cmpc::CMpegDecoder::ExtractGOP(PyObject* PyFrameList) {
    int ret;
    bool got_frame;

    if (EndofGOP)
        return false;

    AVFrame *frame = av_frame_alloc();
    auto pkt = av_packet_alloc();
    if (!frame) {
        cerr << "Could not allocate frame" << endl;
        ret = AVERROR(ENOMEM);
        return false;
    }
    AVFrame *frameRGB = av_frame_alloc();
    if (!frameRGB) {
        cerr << "Could not allocate frameRGB" << endl;
        return false;
    }
    /* initialize packet, set data to NULL, let the demuxer fill it */
    if (PVideoStream && (__dumpControl > 0)) {
        std::ostringstream str_data;
        str_data << "Demuxing video from file '" << videoPath << "' into Python-List" << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
    }

    /* Reset the contex to remove the flushed state. */
    avcodec_flush_buffers(PCodecCtx);

    /* read frames from the file */
    bool frameProcessed = false;
    PVideoFrameCount = 0;

    //cout << framePos_TimeBase << endl;
    if (av_seek_frame(PFormatCtx, PVideoStreamIDX, currentGOPTSM, AVSEEK_FLAG_BACKWARD) < 0) {
        cerr << "AV seek frame fail!" << endl;
        av_seek_frame(PFormatCtx, -1, 0, AVSEEK_FLAG_BACKWARD);
    }

    // Assign appropriate parts of buffer to image planes in pFrameRGB Note that pFrameRGB is an AVFrame, but AVFrame is a superset of AVPicture
    if (widthDst > 0 && heightDst > 0) {
        av_image_fill_arrays(frameRGB->data, frameRGB->linesize, RGBbuffer, AVPixelFormat::AV_PIX_FMT_RGB24, widthDst, heightDst, 1);
    }
    else {
        av_image_fill_arrays(frameRGB->data, frameRGB->linesize, RGBbuffer, AVPixelFormat::AV_PIX_FMT_RGB24, width, height, 1);
    }

    int GOPstate = 0; // 0: Have not meed key frame; 1: During GOP; 2: End of GOP
    int count = 0;

    auto temp_pkt = av_packet_alloc();
    while (av_read_frame(PFormatCtx, pkt) >= 0) {
        //cout << "[Test - " << pkt.size << " ]" << endl;
        av_packet_ref(temp_pkt, pkt);
        frameProcessed = false;
        do {
            ret = _SaveFrameForGOP(PyFrameList, frame, frameRGB, temp_pkt, got_frame, GOPstate, frameProcessed, 0);
            if (ret < 0)
                break;
            temp_pkt->data += ret;
            temp_pkt->size -= ret;
        } while (temp_pkt->size > 0);
        /* flush cached frames */
        av_packet_unref(temp_pkt);
        av_packet_unref(pkt);
        if (frameProcessed)
            count++;
        if (GOPstate == 2)
            break;
    }
    av_packet_free(&temp_pkt);

    if (GOPstate == 1) { //If the end of reading is not raised by I frame, it indicates that the video reaches the end.
        EndofGOP = true;
    }

    do {
        _SaveFrameForGOP(PyFrameList, frame, frameRGB, pkt, got_frame, GOPstate, frameProcessed, 1);
    } while (got_frame);

    //cout << "Demuxing succeeded." << endl;

    if (PVideoStream && (__dumpControl > 0)) {
        std::ostringstream str_data;
        str_data << "Succeed in convert GOP into Python_List, got " << count << " frames." << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
    }

    //av_free(RGBbuffer);
    //RGBbuffer = nullptr;
    //cout << "Free Buffer" << endl;
    //sws_freeContext(PswsCtx);
    //cout << "Free ctx" << endl;
    //PswsCtx = nullptr;
    if (frameRGB) {
        av_frame_free(&frameRGB);
    }
    if (frame) {
        av_frame_free(&frame);
    }
    if (pkt) {
        av_packet_free(&pkt);
    }

    //cout << "End Process" << endl;

    return true;
}

bool cmpc::CMpegDecoder::ExtractFrame(PyObject* PyFrameList, int64_t framePos, int64_t frameNum, double timePos, int mode) {
    int ret;
    bool got_frame;
    auto frame = av_frame_alloc();
    if (!frame) {
        cerr << "Could not allocate frame" << endl;
        ret = AVERROR(ENOMEM);
        return false;
    }
    auto pkt = av_packet_alloc();
    if (!pkt) {
        cerr << "Could not allocate packet" << endl;
        ret = AVERROR(ENOMEM);
        return false;
    }
    auto frameRGB = av_frame_alloc();
    if (!frameRGB) {
        cerr << "Could not allocate frameRGB" << endl;
        return false;
    }
    /* initialize packet, set data to NULL, let the demuxer fill it */
    if (PVideoStream && (__dumpControl > 0)) {
        std::ostringstream str_data;
        str_data << "Demuxing video from file '" << videoPath << "' into Python-List" << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
    }

    /* Reset the contex to remove the flushed state. */
    avcodec_flush_buffers(PCodecCtx);

    /* read frames from the file */
    int64_t count = 0;
    bool frameProcessed = false;
    PVideoFrameCount = 0;

    int64_t framePos_TimeBase;
    if (mode && 0x1) {
        framePos_TimeBase = __TimeToPts(timePos);
    }
    else {
        framePos_TimeBase = __FrameToPts(framePos);
    }
    if (av_seek_frame(PFormatCtx, PVideoStreamIDX, framePos_TimeBase, AVSEEK_FLAG_BACKWARD) < 0) {
        cerr << "AV seek frame fail!" << endl;
        av_seek_frame(PFormatCtx, -1, 0, AVSEEK_FLAG_BACKWARD);
    }

    // Assign appropriate parts of buffer to image planes in pFrameRGB Note that pFrameRGB is an AVFrame, but AVFrame is a superset of AVPicture
    if (widthDst > 0 && heightDst > 0) {
        av_image_fill_arrays(frameRGB->data, frameRGB->linesize, RGBbuffer, AVPixelFormat::AV_PIX_FMT_RGB24, widthDst, heightDst, 1);
    }
    else {
        av_image_fill_arrays(frameRGB->data, frameRGB->linesize, RGBbuffer, AVPixelFormat::AV_PIX_FMT_RGB24, width, height, 1);
    }

    auto temp_pkt = av_packet_alloc();
    while (av_read_frame(PFormatCtx, pkt) >= 0) {
        av_packet_ref(temp_pkt, pkt);
        frameProcessed = false;
        do {
            ret = _SaveFrame(PyFrameList, frame, frameRGB, temp_pkt, got_frame, framePos_TimeBase, frameProcessed, 0);
            if (ret < 0)
                break;
            temp_pkt->data += ret;
            temp_pkt->size -= ret;
        } while (temp_pkt->size > 0);
        /* flush cached frames */
        av_packet_unref(temp_pkt);
        av_packet_unref(pkt);
        if (frameProcessed)
            count++;
        if (count >= frameNum)
            break;
    }
    av_packet_free(&temp_pkt);

    do {
        _SaveFrame(PyFrameList, frame, frameRGB, pkt, got_frame, framePos_TimeBase, frameProcessed, 1);
    } while (got_frame);

    if (PVideoStream && count > 0 && (__dumpControl > 0)) {
        std::ostringstream str_data;
        str_data << "Succeed in convert frames into Python_List" << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
    }

    if (frameRGB) {
        av_frame_free(&frameRGB);
    }
    if (frame) {
        av_frame_free(&frame);
    }
    if (pkt) {
        av_packet_free(&pkt);
    }

    return true;
}

ostream & cmpc::operator<<(ostream & out, cmpc::CMpegDecoder & self_class) {
    out << std::setw(1) << "/";
    out << std::setfill('*') << std::setw(44) << "" << std::setfill(' ') << endl;
    out << std::setw(1) << " * Packed FFmpeg Decoder - Y. Jin V" << MPEGCODER_CURRENT_VERSION << endl;
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
    out << std::setw(1) << "*/";
    return out;
}


/**
 * Related with the encoder.
 */

 // Constructors following 3-5 law.
cmpc::CMpegEncoder::CMpegEncoder(void):
    bitRate(1024), width(100), height(100), timeBase(_setAVRational(1, 25)), frameRate(_setAVRational(25, 1)),\
    GOPSize(10), MaxBFrame(1), PStreamContex({ 0 }), PFormatCtx(nullptr), PswsCtx(nullptr), RGBbuffer(nullptr), \
    Ppacket(nullptr), __have_video(false), __enable_header(false), widthSrc(0), heightSrc(0), __frameRGB(nullptr){
    videoPath.clear();
    codecName.clear();
}

void cmpc::CMpegEncoder::clear(void) {
    FFmpegClose();
    videoPath.clear();
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
    PStreamContex = { 0 };
    __have_video = false;
    __enable_header = false;
}

void cmpc::CMpegEncoder::__copyMetaData(const CMpegEncoder &ref) {
    videoPath.assign(ref.videoPath);
    codecName.assign(ref.codecName);
    bitRate = ref.bitRate;
    width = ref.width;
    height = ref.height;
    widthSrc = ref.widthSrc;
    heightSrc = ref.heightSrc;
    timeBase = ref.timeBase;
    frameRate = ref.frameRate;
    GOPSize = ref.GOPSize;
    MaxBFrame = ref.MaxBFrame;
}

cmpc::CMpegEncoder::~CMpegEncoder(void) {
    clear();
}


cmpc::CMpegEncoder::CMpegEncoder(const CMpegEncoder &ref) {
    __copyMetaData(ref);
    if (!FFmpegSetup()) {
        clear();
    }
}

cmpc::CMpegEncoder& cmpc::CMpegEncoder::operator=(const CMpegEncoder &ref) {
    __copyMetaData(ref);
    if (!FFmpegSetup()) {
        clear();
    }
    return *this;
}

cmpc::CMpegEncoder::CMpegEncoder(CMpegEncoder &&ref) noexcept:
    bitRate(ref.bitRate), width(ref.width), height(ref.height), timeBase(ref.timeBase), frameRate(ref.frameRate), \
    GOPSize(ref.GOPSize), MaxBFrame(ref.MaxBFrame), PStreamContex(ref.PStreamContex), PswsCtx(ref.PswsCtx), \
    RGBbuffer(ref.RGBbuffer), Ppacket(ref.Ppacket), PFormatCtx(ref.PFormatCtx), __have_video(ref.__have_video), \
    __enable_header(ref.__enable_header), widthSrc(ref.widthSrc), heightSrc(ref.heightSrc), __frameRGB(ref.__frameRGB){
    videoPath.assign(ref.videoPath);
    codecName.assign(ref.codecName);
}

cmpc::CMpegEncoder& cmpc::CMpegEncoder::operator=(CMpegEncoder &&ref) noexcept {
    videoPath.assign(ref.videoPath);
    codecName.assign(ref.codecName);
    bitRate = ref.bitRate;
    width = ref.width;
    height = ref.height;
    widthSrc = ref.widthSrc;
    heightSrc = ref.heightSrc;
    timeBase = ref.timeBase;
    frameRate = ref.frameRate;
    GOPSize = ref.GOPSize;
    MaxBFrame = ref.MaxBFrame;
    PFormatCtx = ref.PFormatCtx;
    PStreamContex = ref.PStreamContex;
    PswsCtx = ref.PswsCtx;
    RGBbuffer = ref.RGBbuffer;
    Ppacket = ref.Ppacket;
    __frameRGB = ref.__frameRGB;
    __have_video = ref.__have_video;
    __enable_header = ref.__enable_header;
    ref.PFormatCtx = nullptr;
    ref.PStreamContex = { 0 };
    ref.PswsCtx = nullptr;
    ref.RGBbuffer = nullptr;
    ref.Ppacket = nullptr;
    ref.__frameRGB = nullptr;
    return *this;
}

void cmpc::CMpegEncoder::resetPath(string inVideoPath) {
    videoPath.assign(inVideoPath);
}

bool cmpc::CMpegEncoder::FFmpegSetup(string inVideoPath) {
    resetPath(inVideoPath);
    return FFmpegSetup();
}

cmpc::AVRational cmpc::CMpegEncoder::_setAVRational(int num, int den) {
    AVRational res;
    res.num = num; res.den = den;
    return res;
}

int64_t cmpc::CMpegEncoder::__FrameToPts(int64_t seekFrame) const {
    return av_rescale(av_rescale(seekFrame, timeBase.den, timeBase.num), frameRate.den, frameRate.num);
}

int64_t cmpc::CMpegEncoder::__TimeToPts(double seekTime) const {
    return av_rescale(static_cast<int64_t>(seekTime * 1000), timeBase.den, timeBase.num) / 1000;
}

void cmpc::CMpegEncoder::__log_packet(){
    AVRational *time_base = &PFormatCtx->streams[Ppacket->stream_index]->time_base;
    std::ostringstream str_data;
    str_data << "pts:" << av_ts2str(Ppacket->pts) << " pts_time:" << av_ts2timestr(Ppacket->pts, time_base)
             << " dts:" << av_ts2str(Ppacket->dts) << " dts_time:" << av_ts2timestr(Ppacket->dts, time_base) << endl;
    auto str_data_s = str_data.str();
    av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
}

int cmpc::CMpegEncoder::__write_frame(){
    /* rescale output packet timestamp values from codec to stream timebase */
    av_packet_rescale_ts(Ppacket, PStreamContex.enc->time_base, PStreamContex.st->time_base);
    Ppacket->stream_index = PStreamContex.st->index;

    /* Write the compressed frame to the media file. */
    if (__dumpControl > 0)
        __log_packet();
    return av_interleaved_write_frame(PFormatCtx, Ppacket);
}

/* Add an output stream. */
bool cmpc::CMpegEncoder::__add_stream(AVCodec **codec){
    /* find the encoder */
    AVCodecID codec_id;
    auto srcwidth = widthSrc > 0 ? widthSrc : width;
    auto srcheight = heightSrc > 0 ? heightSrc : height;
    *codec = avcodec_find_encoder_by_name(codecName.c_str());
    if (!(*codec)) {
        codec_id = PFormatCtx->oformat->video_codec;
        cerr << "Could not find encoder "<< codecName <<", use " << avcodec_get_name(codec_id) << " as an alternative." << endl;
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
            RGBbuffer = (uint8_t *)av_malloc(numBytes * sizeof(uint8_t));
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
cmpc::AVFrame* cmpc::CMpegEncoder::__alloc_picture(enum AVPixelFormat pix_fmt, int width, int height) {
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

bool cmpc::CMpegEncoder::__open_video(AVCodec *codec, AVDictionary *opt_arg){
    int ret;
    auto c = PStreamContex.enc;
    AVDictionary *opt = nullptr;

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

cmpc::AVFrame *cmpc::CMpegEncoder::__get_video_frame(PyArrayObject* PyFrame) {
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
            (const uint8_t * const *)PStreamContex.tmp_frame->data, PStreamContex.tmp_frame->linesize,
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

bool cmpc::CMpegEncoder::_LoadFrame_castFromPyFrameArray(AVFrame *frame, PyArrayObject* PyFrame) {
    /* make sure the frame data is writable */
    if (!__frameRGB) {
        cerr << "Could not allocate frameRGB" << endl;
        return false;
    }
    auto out_dataptr = reinterpret_cast<uint8_t *>(PyArray_DATA(PyFrame));
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
int cmpc::CMpegEncoder::__avcodec_encode_video2(AVCodecContext *enc_ctx, AVPacket *pkt, AVFrame *frame){
    int ret;
    int wfret = 0;

    if (frame) {
        if (__dumpControl > 1) {
            std::ostringstream str_data;
            str_data << "Send frame " << frame->pts << endl;
            auto str_data_s = str_data.str();
            av_log(nullptr, AV_LOG_DEBUG, str_data_s.c_str());
        }
    }
    else{
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
        av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
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

int cmpc::CMpegEncoder::__avcodec_encode_video2_flush(AVCodecContext *enc_ctx, AVPacket *pkt) {
    int ret;
    int wfret = 0;
    if (__dumpControl > 1) {
        std::ostringstream str_data;
        str_data << "Flush all packets" << endl;
        auto str_data_s = str_data.str();
        av_log(nullptr, AV_LOG_DEBUG, str_data_s.c_str());
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
            av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
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

int cmpc::CMpegEncoder::EncodeFrame(PyArrayObject* PyFrame) {
    int ret;
    auto c = PStreamContex.enc;
    AVFrame *frame = nullptr;
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

void cmpc::CMpegEncoder::setParameter(string keyword, void *ptr) {
    if (keyword.compare("decoder") == 0) {
        CMpegDecoder *ref = reinterpret_cast<CMpegDecoder *>(ptr);
        resetPath(ref->videoPath);
        codecName.assign(ref->_str_codec);
        if (ref->PCodecCtx) {
            bitRate = ref->PCodecCtx->bit_rate;
            GOPSize = ref->PCodecCtx->gop_size;
            MaxBFrame = ref->PCodecCtx->max_b_frames;
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
    }
    else if (keyword.compare("client") == 0) {
        CMpegClient* ref = reinterpret_cast<CMpegClient*>(ptr);
        resetPath(ref->videoPath);
        codecName.assign(ref->_str_codec);
        if (ref->PCodecCtx) {
            bitRate = ref->PCodecCtx->bit_rate;
            GOPSize = ref->PCodecCtx->gop_size;
            MaxBFrame = ref->PCodecCtx->max_b_frames;
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
                }
            }
        }
    }
    else if (keyword.compare("videoPath") == 0) {
        string *ref = reinterpret_cast<string *>(ptr);
        resetPath(*ref);
    }
    else if (keyword.compare("codecName") == 0) {
        string *ref = reinterpret_cast<string *>(ptr);
        codecName.assign(*ref);
    }
    else if (keyword.compare("bitRate") == 0) {
        double *ref = reinterpret_cast<double *>(ptr);
        auto bit_rate = static_cast<int64_t>((*ref) * 1024);
        bitRate = bit_rate;
    }
    else if (keyword.compare("width") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        width = *ref;
    }
    else if (keyword.compare("height") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        height = *ref;
    }
    else if (keyword.compare("widthSrc") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        widthSrc = *ref;
    }
    else if (keyword.compare("heightSrc") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        heightSrc = *ref;
    }
    else if (keyword.compare("GOPSize") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        GOPSize = *ref;
    }
    else if (keyword.compare("maxBframe") == 0) {
        int *ref = reinterpret_cast<int *>(ptr);
        MaxBFrame = *ref;
    }
    else if (keyword.compare("frameRate") == 0) {
        PyObject *ref = reinterpret_cast<PyObject *>(ptr);
        auto refObj = PyTuple_GetItem(ref, 0);
        int num = static_cast<int>(PyLong_AsLong(refObj));
        refObj = PyTuple_GetItem(ref, 1);
        int den = static_cast<int>(PyLong_AsLong(refObj));
        frameRate = _setAVRational(num, den);
        timeBase = _setAVRational(den, num);
    }
}

PyObject* cmpc::CMpegEncoder::getParameter(string keyword) {
    if (keyword.compare("videoPath") == 0) {
        return Py_BuildValue("y", videoPath.c_str());
    }
    else if (keyword.compare("codecName") == 0) {
        return Py_BuildValue("y", codecName.c_str());
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
    else if (keyword.compare("frameRate") == 0) {
        auto frame_base = frameRate;
        double frameRate = static_cast<double>(frame_base.num) / static_cast<double>(frame_base.den);
        return Py_BuildValue("d", frameRate);
    }
    else {
        Py_RETURN_NONE;
    }
}

PyObject* cmpc::CMpegEncoder::getParameter() {
    auto res = PyDict_New();
    string key;
    PyObject* val = nullptr;
    // Fill the values.
    key.assign("videoPath");
    val = Py_BuildValue("y", videoPath.c_str());
    PyDict_SetItemString(res, key.c_str(), val);
    Py_DECREF(val);
    key.assign("codecName");
    val = Py_BuildValue("y", codecName.c_str());
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
    return res;
}

bool cmpc::CMpegEncoder::FFmpegSetup() {
    AVCodec *video_codec = nullptr;
    int ret;

    if (Ppacket)
        av_packet_free(&Ppacket);
    Ppacket = av_packet_alloc();
    if (!Ppacket)
        return false;

    AVDictionary *opt = nullptr;
    //av_dict_set(&opt, "vcodec", codecName.c_str(), 0);
    //av_dict_set(&opt, "fflags", "", 0);

    /* allocate the output media context */
    //auto getFormat = av_guess_format(codecName.c_str(), nullptr, nullptr);
    avformat_alloc_output_context2(&PFormatCtx, nullptr, nullptr, videoPath.c_str());
    PFormatCtx->avoid_negative_ts = AVFMT_AVOID_NEG_TS_AUTO;
    if (!PFormatCtx) {
        cout << "Could not select the encoder automatically: using MPEG." << endl;
        //cout << "Could not deduce output format from file extension: using MPEG." << endl;
        avformat_alloc_output_context2(&PFormatCtx, nullptr, "mpeg", videoPath.c_str());
    }
    if (!PFormatCtx)
        return false;

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
        ret = avio_open2(&PFormatCtx->pb, videoPath.c_str(), AVIO_FLAG_WRITE, nullptr, nullptr);
        if (ret < 0) {
            cerr << "Could not open '" << videoPath << "': " << av_err2str(ret) << endl;
            FFmpegClose();
            return false;
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
    else{
        __enable_header = true;
    }
    return true;
}

void cmpc::CMpegEncoder::FFmpegClose(){
    if (__enable_header && __have_video) {
        //cout << "Flush Video" << endl;
        int x;
        if ((x = EncodeFrame(nullptr)) == 0) {
           // cout << "Ret: " << x << endl;
        }
        if (__dumpControl > 0) {
            std::ostringstream str_data;
            str_data << "All frames are flushed from cache, the video would be closed." << endl;
            auto str_data_s = str_data.str();
            av_log(nullptr, AV_LOG_INFO, str_data_s.c_str());
        }
    }
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

void cmpc::CMpegEncoder::dumpFormat() {
    if (PFormatCtx)
        av_dump_format(PFormatCtx, 0, videoPath.c_str(), 1);
    else
        cerr << "Not loaded video format context now. dumpFormat() is not avaliable." << endl;
}

ostream & cmpc::operator<<(ostream & out, cmpc::CMpegEncoder & self_class) {
    out << std::setw(1) << "/";
    out << std::setfill('*') << std::setw(44) << "" << std::setfill(' ') << endl;
    out << std::setw(1) << " * Packed FFmpeg Encoder - Y. Jin V" << MPEGCODER_CURRENT_VERSION << endl;
    out << " " << std::setfill('*') << std::setw(44) << "" << std::setfill(' ') << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * VideoPath: " \
        << self_class.videoPath << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * (Width, Height): " \
        << self_class.width << ", " << self_class.height << endl;
    if (self_class.widthSrc > 0 && self_class.heightSrc > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * (WidthSrc, HeightSrc): " \
            << self_class.widthSrc << ", " << self_class.heightSrc << endl;
    }
    else if(self_class.widthSrc > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * WidthSrc: " \
            << self_class.widthSrc << endl;
    }
    else if (self_class.heightSrc > 0) {
        out << std::setiosflags(std::ios::left) << std::setw(25) << " * HeightSrc: " \
            << self_class.heightSrc << endl;
    }
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Enccoder: " \
        << self_class.codecName << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Bit Rate: " \
        << (self_class.bitRate >> 10) << " [Kbit/s]" << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Frame Rate: " \
        << static_cast<double>(self_class.frameRate.num) / static_cast<double>(self_class.frameRate.den) << " [FPS]" << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * GOP Size: " \
        << self_class.GOPSize << endl;
    out << std::setiosflags(std::ios::left) << std::setw(25) << " * Maxmal Bframe Density: " \
        << self_class.MaxBFrame << " [/GOP]" << endl;
    out << std::setw(1) << "*/";
    return out;
}

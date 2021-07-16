#ifndef MPEGBASE_H_INCLUDED
#define MPEGBASE_H_INCLUDED

#define MPEGCODER_EXPORTS
#ifdef MPEGCODER_EXPORTS
    #define MPEGCODER_API __declspec(dllexport)
#else
    #define MPEGCODER_API __declspec(dllimport)
#endif

#define FFMPG3_4
#define FFMPG4_0
#define FFMPG4_4

#define MPEGCODER_CURRENT_VERSION "3.0.0"

#define STREAM_PIX_FMT AVPixelFormat::AV_PIX_FMT_YUV420P /* default pix_fmt */

#define SCALE_FLAGS SWS_BICUBIC
//SWS_BILINEAR

#include <cstdint>
#include <iostream>
//#include <memory>
#include <string>
#include <functional>
#include <iomanip>
#include <sstream>
#include <fstream>
#include <thread>
#include <mutex>
#include <Python.h>
using std::string;
using std::cerr;
using std::cout;
using std::endl;
using std::ostream;

namespace cmpc {
    extern "C"
    {
        #include "libavcodec/avcodec.h"
        #include "libavformat/avformat.h"
        #include "libswscale/swscale.h"
        #include "libavutil/imgutils.h"
        #include "libavutil/samplefmt.h"
        #include "libavutil/timestamp.h"
        #include "libavutil/opt.h"
        #include "libavutil/avassert.h"
        #include "libavutil/channel_layout.h"
        #include "libavutil/mathematics.h"
        #include "libavutil/time.h"
        #include "libswresample/swresample.h"
    }
}

#ifdef  __cplusplus
namespace cmpc {
    static const string av_make_error_string2(int errnum) {
        char errbuf[AV_ERROR_MAX_STRING_SIZE];
        av_strerror(errnum, errbuf, AV_ERROR_MAX_STRING_SIZE);
        string strerrbuf = errbuf;
        return strerrbuf;
    }
    #undef av_err2str
    #define av_err2str(errnum) av_make_error_string2(errnum).c_str()
    static const string av_ts_make_string_cpp(int64_t ts) {
        char tsstrbuf[AV_TS_MAX_STRING_SIZE];
        av_ts_make_string(tsstrbuf, ts);
        string strtsstrbuf = tsstrbuf;
        return strtsstrbuf;
    }
    #undef av_ts2str
    #define av_ts2str(ts) av_ts_make_string_cpp(ts).c_str()
    static const string av_ts_make_time_string_cpp(int64_t ts, AVRational* tb) {
        char tsstrbuf[AV_TS_MAX_STRING_SIZE];
        av_ts_make_time_string(tsstrbuf, ts, tb);
        string strtsstrbuf = tsstrbuf;
        return strtsstrbuf;
    }
    #undef av_ts2timestr
    #define av_ts2timestr(ts, tb) av_ts_make_time_string_cpp(ts, tb).c_str()
}
#endif // __cplusplus

namespace cmpc {
    // a wrapper around a single output AVStream
    typedef struct _OutputStream {
        AVStream* st;
        AVCodecContext* enc;

        /* pts of the next frame that will be generated */
        int64_t next_frame;

        AVFrame* frame;
        AVFrame* tmp_frame;

        struct SwsContext* sws_ctx;
    } OutputStream;
}

// compatibility with newer API
#if LIBAVCODEC_VERSION_INT < AV_VERSION_INT(55,28,1)
    #define av_frame_alloc avcodec_alloc_frame
    #define av_frame_free avcodec_free_frame
#endif

#endif

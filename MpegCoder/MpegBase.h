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
#define FFMPG5_0

#define MPEGCODER_CURRENT_VERSION "3.2.0"

#define STREAM_PIX_FMT AVPixelFormat::AV_PIX_FMT_YUV420P /* default pix_fmt */

#define SCALE_FLAGS SWS_BICUBIC
//SWS_BILINEAR

#include <cstdint>
#include <iostream>
#include <string>
#include <functional>
#include <iomanip>
#include <sstream>
#include <fstream>
#include <vector>
#include <memory>
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
    const string av_make_error_string2_cpp(int errnum);
    #undef av_err2str
    #define av_err2str(errnum) av_make_error_string2_cpp(errnum)
    const string av_ts_make_string_cpp(int64_t ts);
    #undef av_ts2str
    #define av_ts2str(ts) av_ts_make_string_cpp(ts)
    const string av_ts_make_time_string_cpp(int64_t ts, AVRational* tb);
    #undef av_ts2timestr
    #define av_ts2timestr(ts, tb) av_ts_make_time_string_cpp(ts, tb)
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

    // A wrapper of the char *[]
    class CharList {
    public:
        CharList(void);                                            // Constructor.
        CharList(const std::vector<string>& args);                 // Copy constructor (string ver).
        CharList(const std::vector<string>&& args) noexcept;       // Move constructor (string ver).
        ~CharList(void);                                           // 3-5 law. Destructor.
        CharList(const CharList& ref);                             // Copy constructor.
        CharList& operator=(const CharList& ref);                  // Copy assignment operator.
        CharList(CharList&& ref) noexcept;                         // Move constructor.
        CharList& operator=(CharList&& ref) noexcept;              // Move assignment operator.
        CharList& operator=(const std::vector<string>& args);      // Copy assignment operator (string ver).
        CharList& operator=(std::vector<string>&& args) noexcept;  // Move assignment operator (string ver).
        void set(const std::vector<string>& args);  // Set strings as data.
        void set(std::vector<string>&& args) noexcept;  // Set strings as data (move).
        void clear();  // clear all data.
        std::shared_ptr<const char*> c_str();  // Equivalent conversion for char **
    private:
        std::vector<string> data;
    };
}

// compatibility with newer API
#if LIBAVCODEC_VERSION_INT < AV_VERSION_INT(55,28,1)
    #define av_frame_alloc avcodec_alloc_frame
    #define av_frame_free avcodec_free_frame
#endif

#endif

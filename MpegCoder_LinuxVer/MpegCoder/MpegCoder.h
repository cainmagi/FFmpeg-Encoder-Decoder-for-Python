// 下列 ifdef 块是创建使从 DLL 导出更简单的
// 宏的标准方法。此 DLL 中的所有文件都是用命令行上定义的 MPEGCODER_EXPORT
// 符号编译的。在使用此 DLL 的
// 任何其他项目上不应定义此符号。这样，源文件中包含此文件的任何其他项目都会将
// MPEGCODER_API 函数视为自 DLL 导入，而此 DLL 则将用此宏定义的
// 符号视为是被导出的。
#ifndef MPEGCODER_H_INCLUDED
#define MPEGCODER_H_INCLUDED

#include "MpegBase.h"

#define MPEGCODER_DEBUG
#define NPY_NO_DEPRECATED_API NPY_1_7_API_VERSION

// 此类导出自 MpegCoder.dll
namespace cmpc {

    extern int8_t __dumpControl;

    class CMpegDecoder {
    public:
        CMpegDecoder(void);                                         //构造函数
        // 以下部分就是传说中的三五法则，定义其中之一就必须全部手动定义
        ~CMpegDecoder(void);                                        //析构函数
        CMpegDecoder(const CMpegDecoder &ref);                      //拷贝构造函数
        CMpegDecoder& operator=(const CMpegDecoder &ref);           //拷贝赋值函数
        CMpegDecoder(CMpegDecoder &&ref) noexcept;                  //移动构造函数
        CMpegDecoder& operator=(CMpegDecoder &&ref) noexcept; //移动赋值函数
        friend class CMpegEncoder; //使编码器能访问解码器的私有成员
        // TODO:  在此添加您的方法。
        //运算符重载
        friend ostream & operator<<(ostream & out, CMpegDecoder & self_class);
        void clear(void); //清除资源
        void meta_protected_clear(void);
        void dumpFormat(); //显示格式内容
        void setParameter(string keyword, void *ptr); //设置参量
        PyObject * getParameter(string keyword); //获取一些关键字信息
        void resetPath(string inVideoPath); //重设输入路径
        bool FFmpegSetup(); //设置解码器、提取基本参数，该过程也蕴涵在构造中
        bool FFmpegSetup(string inVideoPath); //带参设置，相当于重设视频路径
        bool ExtractFrame(PyObject* PyFrameList, int64_t framePos, int64_t frameNum, double timePos, int mode); //将帧数为framePos开始的frameNum数目的帧提取到PyFrame中
        bool ExtractGOP(PyObject* PyFrameList); //提取一个GOP到PyFrame中
        void setGOPPosition(int64_t inpos);
        void setGOPPosition(double inpos);
    private:
        string videoPath;                   // 待解码文件的存储路径
        AVFormatContext *PFormatCtx;        // 视频文件的格式上下文
        AVCodecContext *PCodecCtx;          // 视频文件的解码上下文
        int width, height;                  // 视频的宽和高
        int widthDst, heightDst;            // 目标视频的尺寸
        enum AVPixelFormat PPixelFormat;    // 像素格式枚举
        AVStream *PVideoStream;             // 视频流

        int PVideoStreamIDX;                // 视频流的编号
        int PVideoFrameCount;               // 解码的帧数计数
        uint8_t *RGBbuffer;                 // RGB图像的缓存
        struct SwsContext *PswsCtx;         // 尺度变换器

        string _str_codec;                  // 显示当前的解码器
        double _duration;                   // 显示当前的时长（s）
        int64_t _predictFrameNum;           // 显示预测的总帧数

        int64_t currentGOPTSM;              // 当前GOP时间戳指向的位置
        bool EndofGOP;                      // GOP读取是否结束，只有重设起始位置才会将它复位为0

        /* Enable or disable frame reference counting. You are not supposed to support
        * both paths in your application but pick the one most appropriate to your
        * needs. Look for the use of refcount in this example to see what are the
        * differences of API usage between them. */
        int refcount;                       // 视频帧的参考计数
        int _open_codec_context(int &stream_idx, AVCodecContext *&dec_ctx, AVFormatContext *PFormatCtx, enum AVMediaType type);
        int _SaveFrame(PyObject *PyFrameList, AVFrame *&frame, AVFrame *&frameRGB, AVPacket &pkt, bool &got_frame, int64_t minPTS, bool &processed, int cached);
        int _SaveFrameForGOP(PyObject *PyFrameList, AVFrame *&frame, AVFrame *&frameRGB, AVPacket &pkt, bool &got_frame, int &GOPstate, bool &processed, int cached);
        PyObject *_SaveFrame_castToPyFrameArray(uint8_t *data[], int fWidth, int fHeight);
        PyObject *_SaveFrame_castToPyFrameArrayOld(uint8_t *data[], int fWidth, int fHeight);
        PyObject *_SaveFrame_castToPyFrame(uint8_t *data[], int fWidth, int fHeight);
        int __avcodec_decode_video2(AVCodecContext *avctx, AVFrame *frame, bool &got_frame, AVPacket *pkt);
        int64_t __FrameToPts(int64_t seekFrame) const;
        int64_t __TimeToPts(double seekTime) const;
    };

    // a wrapper around a single output AVStream
    typedef struct _OutputStream {
        AVStream *st;
        AVCodecContext *enc;

        /* pts of the next frame that will be generated */
        int64_t next_frame;

        AVFrame *frame;
        AVFrame *tmp_frame;

        struct SwsContext *sws_ctx;
    } OutputStream;

    class CMpegEncoder {
    public:
        CMpegEncoder(void);                                         //构造函数
                                                                    // 以下部分就是传说中的三五法则，定义其中之一就必须全部手动定义
        ~CMpegEncoder(void);                                        //析构函数
        CMpegEncoder(const CMpegEncoder &ref);                      //拷贝构造函数
        CMpegEncoder& operator=(const CMpegEncoder &ref);           //拷贝赋值函数
        CMpegEncoder(CMpegEncoder &&ref) noexcept;                  //移动构造函数
        CMpegEncoder& operator=(CMpegEncoder &&ref) noexcept; //移动赋值函数
                                                                // TODO:  在此添加您的方法。
                                                                //运算符重载
        friend ostream & operator<<(ostream & out, CMpegEncoder & self_class);
        void clear(void); //清除资源
        void resetPath(string inVideoPath); //重设输入路径
        void dumpFormat(); //显示格式内容
        bool FFmpegSetup(); //设置编码器，打开待保存文件
        bool FFmpegSetup(string inVideoPath); //带参设置，相当于重设视频路径
        void FFmpegClose(); //关闭编码器，完成视频写入
        int EncodeFrame(PyArrayObject* PyFrame);
        void setParameter(string keyword, void *ptr); //设置参量
    private:
        string videoPath;                   // 待解码文件的存储路径
        string codecName;                   // 编码器名称
        int64_t bitRate;                    // 码率
        int width, height;                  // 帧尺寸
        int widthSrc, heightSrc;            // 输入尺寸
        AVRational timeBase, frameRate;     // 时基和帧率
        int GOPSize, MaxBFrame;             // GOP大小和B帧的最大数目
        OutputStream PStreamContex;         // 流的当前信息
        AVFormatContext *PFormatCtx;
        AVPacket *Ppacket;                  // AV包
        struct SwsContext *PswsCtx;         // 尺度变换器
        AVFrame *__frameRGB; //临时参量，不会用在正常的参数设置里。
        uint8_t *RGBbuffer;                 // 缓存
        bool __have_video, __enable_header;
        AVRational _setAVRational(int num, int den);
        int64_t __FrameToPts(int64_t seekFrame) const;
        int64_t __TimeToPts(double seekTime) const;
        bool _LoadFrame_castFromPyFrameArray(AVFrame *frame, PyArrayObject* PyFrame);
        void __log_packet();
        int __write_frame();
        bool __add_stream(AVCodec **codec);
        AVFrame* __alloc_picture(enum AVPixelFormat pix_fmt, int width, int height);
        bool __open_video(AVCodec *codec, AVDictionary *opt_arg);
        AVFrame *__get_video_frame(PyArrayObject* PyFrame);
        int __avcodec_encode_video2(AVCodecContext *enc_ctx, AVPacket *pkt, AVFrame *frame, bool &got_packet);
        int __avcodec_encode_video2_flush(AVCodecContext *enc_ctx, AVPacket *pkt, bool &got_packet);
        int __avcodec_encode_video2Old(AVCodecContext *enc_ctx, AVPacket *pkt, AVFrame *frame, bool &got_packet);
        void __copyMetaData(const CMpegEncoder &ref);
    };
}
#endif
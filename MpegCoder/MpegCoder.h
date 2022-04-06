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

// Exported from MpegCoder.dll
namespace cmpc {

    extern int8_t __dumpControl;
    class CMpegClient;
    class CMpegServer;

    class CMpegDecoder {
    public:
        CMpegDecoder(void);                                         // Constructor.
        ~CMpegDecoder(void);                                        // 3-5 law. Destructor.
        CMpegDecoder(const CMpegDecoder& ref);                      // Copy constructor.
        CMpegDecoder& operator=(const CMpegDecoder& ref);           // Copy assignment operator.
        CMpegDecoder(CMpegDecoder&& ref) noexcept;                  // Move constructor.
        CMpegDecoder& operator=(CMpegDecoder&& ref) noexcept;       // Move assignment operator.
        friend class CMpegEncoder;  // Let the encoder be able to access the member of this class.
        friend class CMpegServer;  // Let the server be able to access the member of this class.
        friend ostream& operator<<(ostream& out, CMpegDecoder& self_class);  // Show the results.
        void clear(void);  // Clear all configurations and resources.
        void meta_protected_clear(void);  // Clear the resources, but the configurations are remained.
        void dumpFormat();  // Show the av_format results.
        void setParameter(string keyword, void* ptr);  // Set arguments.
        PyObject* getParameter(string keyword);  // Get the current arguments.
        PyObject* getParameter();  // Get all key arguments.
        void resetPath(string inVideoPath);  // Reset the path (encoded) of the online video stream.
        bool FFmpegSetup();  // Configure the decoder, and extract the basic meta-data. This method is also equipped in the constructor.
        bool FFmpegSetup(string inVideoPath);  // Configure the decoder with extra arguments.
        bool ExtractFrame(PyObject* PyFrameList, int64_t framePos, int64_t frameNum, double timePos, int mode);  // Extract n frames as PyFrame, where n is given by frameNum, and the starting postion is given by framePos.
        bool ExtractGOP(PyObject* PyFrameList);  // Extract a GOP as PyFrames.
        void setGOPPosition(int64_t inpos);  // Set the current GOP poistion by the index of frames.
        void setGOPPosition(double inpos);  // Set the cuurent GOP position by the time.
    private:
        string videoPath;                   // The path of video stream to be decoded.
        int width, height;                  // Width, height of the video.
        int widthDst, heightDst;            // Target width, height of ExtractFrame().
        enum AVPixelFormat PPixelFormat;    // Enum object of the pixel format.
        AVFormatContext* PFormatCtx;        // Format context of the video.
        AVCodecContext* PCodecCtx;          // Codec context of the video.
        AVStream* PVideoStream;             // Video stream.

        int PVideoStreamIDX;                // The index of the video stream.
        int PVideoFrameCount;               // The counter of the decoded frames.
        uint8_t* RGBbuffer;                 // The buffer of the RGB formatted images.
        struct SwsContext* PswsCtx;         // The context of the scale transformator.

        string _str_codec;                  // Show the name of the current codec.
        double _duration;                   // Show the time of the video play.
        int64_t _predictFrameNum;           // The prediction of the total number of frames.

        int64_t currentGOPTSM;              // The timestamp where the GOP cursor is pointinng to.
        bool EndofGOP;                      // A flag of reading GOP. This value need to be reset to be false by the reset methods.
        int nthread;                        // The number of threads;

        /* Enable or disable frame reference counting. You are not supposed to support
        * both paths in your application but pick the one most appropriate to your
        * needs. Look for the use of refcount in this example to see what are the
        * differences of API usage between them. */
        int refcount;                       // Reference count of the video frame.
        int _open_codec_context(int& stream_idx, AVCodecContext*& dec_ctx, AVFormatContext* PFormatCtx, enum AVMediaType type);
        int _SaveFrame(PyObject* PyFrameList, AVFrame*& frame, AVFrame*& frameRGB, AVPacket*& pkt, bool& got_frame, int64_t minPTS, bool& processed, int cached);
        int _SaveFrameForGOP(PyObject* PyFrameList, AVFrame*& frame, AVFrame*& frameRGB, AVPacket*& pkt, bool& got_frame, int& GOPstate, bool& processed, int cached);
        PyObject* _SaveFrame_castToPyFrameArray(uint8_t* data[], int fWidth, int fHeight);
        PyObject* _SaveFrame_castToPyFrameArrayOld(uint8_t* data[], int fWidth, int fHeight);
        int __avcodec_decode_video2(AVCodecContext* avctx, AVFrame* frame, bool& got_frame, AVPacket* pkt);
        int64_t __FrameToPts(int64_t seekFrame) const;
        int64_t __TimeToPts(double seekTime) const;
    };

    class CMpegEncoder {
    public:
        CMpegEncoder(void);                                         // Constructor.
        ~CMpegEncoder(void);                                        // 3-5 law. Destructor.
        CMpegEncoder(const CMpegEncoder& ref);                      // Copy constructor.
        CMpegEncoder& operator=(const CMpegEncoder& ref);           // Copy assignment operator.
        CMpegEncoder(CMpegEncoder&& ref) noexcept;                  // Move constructor.
        CMpegEncoder& operator=(CMpegEncoder&& ref) noexcept;       // Move assignment operator.
        friend ostream& operator<<(ostream& out, CMpegEncoder& self_class);  // Show the results.
        void clear(void);  // Clear all configurations and resources.
        void resetPath(string inVideoPath);  // Reset the path of the output video stream.
        void dumpFormat();  // Show the av_format results.
        bool FFmpegSetup();  // Configure the encoder, and create the file handle. This method is also equipped in the constructor.
        bool FFmpegSetup(string inVideoPath);  // Configure the encoder with extra arguments.
        void FFmpegClose();  // Close the encoder, and finalize the written of the encoded video.
        int EncodeFrame(PyArrayObject* PyFrame);  // Encode one frame.
        void setParameter(string keyword, void* ptr);  // Set arguments.
        PyObject* getParameter(string keyword);  // Get the current arguments.
        PyObject* getParameter();  // Get all key arguments.
    private:
        string videoPath;                   // The path of the output video stream.
        string codecName;                   // The name of the codec
        int64_t bitRate;                    // The bit rate of the output video.
        int width, height;                  // The size of the frames in the output video.
        int widthSrc, heightSrc;            // The size of the input data (frames).
        AVRational timeBase, frameRate;     // The time base and the frame rate.
        int GOPSize, MaxBFrame;             // The size of GOPs, and the maximal number of B frames.
        OutputStream PStreamContex;         // The context of the current video parser.
        AVFormatContext* PFormatCtx;        // Format context of the video.
        AVPacket* Ppacket;                  // AV Packet used for writing frames.
        struct SwsContext* PswsCtx;         // The context of the scale transformator.
        AVFrame* __frameRGB;                // A temp AV frame object. Used for converting the data format.
        uint8_t* RGBbuffer;                 // Data buffer.
        bool __have_video, __enable_header;

        int nthread;                        // The number of threads;

        AVRational _setAVRational(int num, int den);
        int64_t __FrameToPts(int64_t seekFrame) const;
        int64_t __TimeToPts(double seekTime) const;
        bool _LoadFrame_castFromPyFrameArray(AVFrame* frame, PyArrayObject* PyFrame);
        void __log_packet();
        int __write_frame();
        const AVCodec* __add_stream();
        AVFrame* __alloc_picture(enum AVPixelFormat pix_fmt, int width, int height);
        bool __open_video(const AVCodec* codec, const AVDictionary* opt_arg);
        AVFrame* __get_video_frame(PyArrayObject* PyFrame);
        int __avcodec_encode_video2(AVCodecContext* enc_ctx, AVPacket* pkt, AVFrame* frame);
        int __avcodec_encode_video2_flush(AVCodecContext* enc_ctx, AVPacket* pkt);
    };

    ostream& operator<<(ostream& out, CMpegDecoder& self_class);
    ostream& operator<<(ostream& out, CMpegEncoder& self_class);
}

#endif

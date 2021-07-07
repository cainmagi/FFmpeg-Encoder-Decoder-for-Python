// 下列 ifdef 块是创建使从 DLL 导出更简单的
// 宏的标准方法。此 DLL 中的所有文件都是用命令行上定义的 MPEGCODER_EXPORT
// 符号编译的。在使用此 DLL 的
// 任何其他项目上不应定义此符号。这样，源文件中包含此文件的任何其他项目都会将
// MPEGCODER_API 函数视为自 DLL 导入，而此 DLL 则将用此宏定义的
// 符号视为是被导出的。
#ifndef MPEGSTREAMER_H_INCLUDED
#define MPEGSTREAMER_H_INCLUDED

#include "MpegBase.h"

// Exported from MpegCoder.dll
namespace cmpc {

    extern int8_t __dumpControl;
    class CMpegDecoder;
    class CMpegEncoder;

    class BufferList {  // A buffer holder of several frames
    public:
        BufferList(void);
        ~BufferList(void);
        BufferList(const BufferList &ref);
        BufferList& operator=(const BufferList &ref);
        BufferList(BufferList &&ref) noexcept;
        BufferList& operator=(BufferList &&ref) noexcept;
        void clear(void);
        const int64_t size() const;
        void set(int64_t set_size, int width, int height, int widthDst=0, int heightDst=0);
        void set_timer(AVRational targetFrameRate, AVRational timeBase);
        bool reset_memory();
        void freeze_write(int64_t read_size);
        bool write(SwsContext *PswsCtx, AVFrame *frame);
        PyObject *read();
    private:
        int64_t _Buffer_pos;               // Writring cursor of the source buffer，pointing to the index of the currently written frame.
        int64_t _Buffer_rpos;              // Reading cursor of the source buffer，pointing to the index of the currently read frame.
        int64_t _Buffer_size;              // Size of the source buffer, it should be determined by the numeber of required frames.
        int64_t __Read_size;               // A temporary variable used for showing the size of the data to be read.
        int64_t next_pts;
        int64_t interval_pts;
        int dst_width, dst_height;
        int src_width, src_height;
        int _Buffer_capacity;
        AVFrame *frameRGB;
        uint8_t **_Buffer_List;           // Source buffer, the size of this buffer is determined by the number of required frames.
    };

    class CMpegClient {
    public:
        CMpegClient(void);                                        // Constructor.
        ~CMpegClient(void);                                       // 3-5 law. Destructor.
        CMpegClient(const CMpegClient &ref) = delete;             // Delete the copy constructor.
        CMpegClient& operator=(const CMpegClient &ref) = delete;  // Delete the copy assignment operator. 
        CMpegClient(CMpegClient &&ref) noexcept;                  // Move constructor.
        CMpegClient& operator=(CMpegClient &&ref) noexcept;       // Move assignment operator.
        friend class CMpegEncoder;  // Let the encoder be able to access the member of this class.
        friend class CMpegServer;  // Let the server be able to access the member of this class.
        friend ostream & operator<<(ostream & out, CMpegClient & self_class);  // Show the results.
        void clear(void);  // Clear all configurations and resources.
        void meta_protected_clear(void);  // Clear the resources, but the configurations are remained.
        void dumpFormat();  // Show the av_format results.
        void setParameter(string keyword, void *ptr);  // Set arguments.
        PyObject* getParameter(string keyword);  // Get the current arguments.
        PyObject* getParameter();  // Get all key arguments.
        void resetPath(string inVideoPath);  // Reset the path (URL) of the online video stream.
        bool FFmpegSetup();  // Configure the decoder, and extract the basic meta-data. This method is also equipped in the constructor.
        bool FFmpegSetup(string inVideoPath);  // Configure the decoder with extra arguments.
        bool start();  // Start the listening to the online stream.
        void terminate();  // Terminate the listener.
        PyObject * ExtractFrame(int64_t readsize);  // Extract frames with the given number. 
        PyObject * ExtractFrame();  // Extract frames. The number is configured in the class properties.
    private:
        string videoPath;                   // The path (URL) of the online video stream.
        AVFormatContext *PFormatCtx;        // Format context of the video.
        AVCodecContext *PCodecCtx;          // Codec context of the video.
        int width, height;                  // Width, height of the video.
        int widthDst, heightDst;            // Target width, height of ExtractFrame().
        enum AVPixelFormat PPixelFormat;    // Enum object of the pixel format.
        AVStream *PVideoStream;             // Video stream.

        AVFrame *frame;

        int PVideoStreamIDX;                // The index of the video stream.
        int PVideoFrameCount;               // The counter of the decoded frames.
        BufferList buffer;                 // The buffer of the RGB formatted images.
        struct SwsContext *PswsCtx;         // The context of the scale transformator.
        int64_t cache_size, read_size;
        AVRational frameRate;

        std::thread read_handle;            // The thread of the circular frame reader.
        std::mutex read_check;              // Lock for reading the status.
        std::mutex info_lock;               // Lock for reading the info.
        bool reading;

        string _str_codec;                  // The name of the current codec.
        double _duration;                   // The duration of the current video.
        int64_t _predictFrameNum;           // The prediction of the total number of frames.

        /* Enable or disable frame reference counting. You are not supposed to support
        * both paths in your application but pick the one most appropriate to your
        * needs. Look for the use of refcount in this example to see what are the
        * differences of API usage between them. */
        int refcount;                       // Reference count of the video frame.
        bool __setup_check() const;
        int _open_codec_context(int &stream_idx, AVCodecContext *&dec_ctx, AVFormatContext *PFormatCtx, enum AVMediaType type);
        bool __client_holder();
        AVRational _setAVRational(int num, int den);
        int __save_frame(AVFrame *&frame, AVPacket *&pkt, bool &got_frame, int cached);
        int __avcodec_decode_video2(AVCodecContext *avctx, AVFrame *frame, bool &got_frame, AVPacket *pkt);
    };

    class CMpegServer {
    public:
        CMpegServer(void);                                        // Constructor.
        ~CMpegServer(void);                                       // 3-5 law. Destructor.
        CMpegServer(const CMpegServer& ref);             // Delete the copy constructor.
        CMpegServer& operator=(const CMpegServer& ref);  // Delete the copy assignment operator. 
        CMpegServer(CMpegServer&& ref) noexcept;                  // Move constructor.
        CMpegServer& operator=(CMpegServer&& ref) noexcept;       // Move assignment operator.
        //friend class CMpegEncoder; // Let the server be able to access the member of this class.
        friend ostream& operator<<(ostream& out, CMpegServer& self_class);  // Show the results.
        void clear(void);  // Clear all configurations and resources.
        void meta_protected_clear(void);  // Clear the resources, but the configurations are remained.
        void resetPath(string inVideoPath);  // Reset the path of the output video stream.
        void dumpFormat();  // Show the av_format results.
        bool FFmpegSetup();  // Configure the encoder, and create the file handle. This method is also equipped in the constructor.
        bool FFmpegSetup(string inVideoPath);  // Configure the encoder with extra arguments.
        void FFmpegClose();  // Close the encoder, and finalize the written of the encoded video.
        void setParameter(string keyword, void* ptr);  // Set arguments.
        PyObject* getParameter(string keyword);  // Get the current arguments.
        PyObject* getParameter();  // Get all key arguments.
        int ServeFrameBlock(PyArrayObject* PyFrame);  // Encode the frame into the output stream (block mode). 
        int ServeFrame(PyArrayObject* PyFrame);  // Encode the frame into the output stream. 
    private:
        string videoPath;                   // The path of the output video stream.
        string __formatName;                // The format name of the stream. Could be "rtsp" or "rtmp". This value is detected from the videoPath.
        string codecName;                   // The name of the codec
        int64_t bitRate;                    // The bit rate of the output video.
        int64_t __pts_ahead;                // The ahead pts.
        int64_t __start_time;               // The start time stamp. This value is used for controlling the writing of the frames.
        int64_t __cur_time;                 // The current time stamp. This value is restricted by __pts_ahead.
        int width, height;                  // The size of the frames in the output video.
        int widthSrc, heightSrc;            // The size of the input data (frames).
        AVRational timeBase, frameRate;     // The time base and the frame rate.
        AVRational time_base_q;             // The time base used for calculating the absolute time.
        int GOPSize, MaxBFrame;             // The size of GOPs, and the maximal number of B frames.
        OutputStream PStreamContex;         // The context of the current video parser.
        AVFormatContext* PFormatCtx;        // Format context of the video.
        AVPacket* Ppacket;                  // AV Packet used for writing frames.
        struct SwsContext* PswsCtx;         // The context of the scale transformator.
        AVFrame* __frameRGB;                // A temp AV frame object. Used for converting the data format.
        uint8_t* RGBbuffer;                 // Data buffer.
        bool __have_video, __enable_header;
        AVRational _setAVRational(int num, int den);
        int64_t __FrameToPts(int64_t seekFrame) const;
        int64_t __TimeToPts(double seekTime) const;
        bool __setup_check() const;
        bool _LoadFrame_castFromPyFrameArray(AVFrame* frame, PyArrayObject* PyFrame);
        void __log_packet();
        int __write_frame();
        bool __add_stream(AVCodec** codec);
        AVFrame* __alloc_picture(enum AVPixelFormat pix_fmt, int width, int height);
        bool __open_video(AVCodec* codec, AVDictionary* opt_arg);
        AVFrame* __get_video_frame(PyArrayObject* PyFrame);
        int __avcodec_encode_video2(AVCodecContext* enc_ctx, AVPacket* pkt, AVFrame* frame);
        int __avcodec_encode_video2_flush(AVCodecContext* enc_ctx, AVPacket* pkt);
        void __copyMetaData(const CMpegServer& ref);
    };
}
#endif

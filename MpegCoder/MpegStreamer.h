// 下列 ifdef 块是创建使从 DLL 导出更简单的
// 宏的标准方法。此 DLL 中的所有文件都是用命令行上定义的 MPEGCODER_EXPORT
// 符号编译的。在使用此 DLL 的
// 任何其他项目上不应定义此符号。这样，源文件中包含此文件的任何其他项目都会将
// MPEGCODER_API 函数视为自 DLL 导入，而此 DLL 则将用此宏定义的
// 符号视为是被导出的。
#ifndef MPEGSTREAMER_H_INCLUDED
#define MPEGSTREAMER_H_INCLUDED

#include "MpegBase.h"
#define NPY_NO_DEPRECATED_API NPY_1_7_API_VERSION

// 此类导出自 MpegCoder.dll
    namespace cmpc {

        extern int8_t __dumpControl;

        class Buffer_List {  // A buffer holder of several frames
        public:
            Buffer_List(void);
            ~Buffer_List(void);
            Buffer_List(const Buffer_List &ref);
            Buffer_List& operator=(const Buffer_List &ref);
            Buffer_List(Buffer_List &&ref) noexcept;
            Buffer_List& operator=(Buffer_List &&ref) noexcept;
            void clear(void);
            const int64_t size() const;
            void set(int64_t set_size, int width, int height, int widthDst=0, int heightDst=0);
            void set_timer(AVRational targetFrameRate, AVRational timeBase);
            bool reset_memory();
            void freezeWrite(int64_t read_size);
            bool write(SwsContext *PswsCtx, AVFrame *frame);
            PyObject *read();
        private:
            int64_t _Buffer_pos;               // 源缓存指针，指向现在正在写入的帧编号
            int64_t _Buffer_rpos;              // 源缓存读指针，指向现在正在读取的帧编号
            int64_t _Buffer_size;              // 源缓存大小，由所需帧数决定
            int64_t __Read_size;               // 临时变量，用来记录需要读取的数据
            int64_t next_pts;
            int64_t interval_pts;
            int dst_width, dst_height;
            int src_width, src_height;
            int _Buffer_capacity;
            AVFrame *frameRGB;
            uint8_t **_Buffer_List;           // 源缓存，大小由所需帧数决定
        };

        class CMpegClient {
        public:
            CMpegClient(void);                                        //构造函数
            // 以下部分就是传说中的三五法则，定义其中之一就必须全部手动定义
            ~CMpegClient(void);                                       //析构函数
            CMpegClient(const CMpegClient &ref) = delete;             //删除拷贝构造函数
            CMpegClient& operator=(const CMpegClient &ref) = delete;  //删除拷贝赋值函数
            CMpegClient(CMpegClient &&ref) noexcept;                  //移动构造函数
            CMpegClient& operator=(CMpegClient &&ref) noexcept;       //移动赋值函数
            //friend class CMpegEncoder; //使编码器能访问解码器的私有成员
            // TODO:  在此添加您的方法。
            //运算符重载
            friend ostream & operator<<(ostream & out, CMpegClient & self_class);
            void clear(void); //清除资源
            void meta_protected_clear(void);
            void dumpFormat(); //显示格式内容
            void setParameter(string keyword, void *ptr); //设置参量
            PyObject * getParameter(string keyword); //获取一些关键字信息
            void resetPath(string inVideoPath); //重设输入路径
            bool FFmpegSetup(); //设置解码器、提取基本参数，该过程也蕴涵在构造中
            bool FFmpegSetup(string inVideoPath); //带参设置，相当于重设视频路径
            bool start();
            void terminate();
            PyObject * ExtractFrame(int64_t readsize);
            PyObject * ExtractFrame();
        private:
            string videoPath;                   // 待解码文件的存储路径
            AVFormatContext *PFormatCtx;        // 视频文件的格式上下文
            AVCodecContext *PCodecCtx;          // 视频文件的解码上下文
            int width, height;                  // 视频的宽和高
            int widthDst, heightDst;            // 目标视频的尺寸
            enum AVPixelFormat PPixelFormat;    // 像素格式枚举
            AVStream *PVideoStream;             // 视频流

            AVFrame *frame;

            int PVideoStreamIDX;                // 视频流的编号
            int PVideoFrameCount;               // 解码的帧数计数
            Buffer_List buffer;                 // RGB图像的缓存
            struct SwsContext *PswsCtx;         // 尺度变换器
            int64_t cache_size, read_size;
            AVRational frameRate;

            std::thread read_handle;            // 接收数据的线程，用来控制上述这些参量
            std::mutex read_check;              // 读状态检查锁
            std::mutex info_lock;               // 取信息检查锁
            bool reading;

            string _str_codec;                  // 显示当前的解码器
            double _duration;                   // 显示当前的时长（s）
            int64_t _predictFrameNum;           // 显示预测的总帧数

            /* Enable or disable frame reference counting. You are not supposed to support
            * both paths in your application but pick the one most appropriate to your
            * needs. Look for the use of refcount in this example to see what are the
            * differences of API usage between them. */
            int refcount;                       // 视频帧的参考计数
            bool __setup_check();
            int _open_codec_context(int &stream_idx, AVCodecContext *&dec_ctx, AVFormatContext *PFormatCtx, enum AVMediaType type);
            bool __client_holder();
            AVRational _setAVRational(int num, int den);
            int __save_frame(AVFrame *&frame, AVPacket &pkt, bool &got_frame, int cached);
            int __avcodec_decode_video2(AVCodecContext *avctx, AVFrame *frame, bool &got_frame, AVPacket *pkt);
        };
    }
#endif
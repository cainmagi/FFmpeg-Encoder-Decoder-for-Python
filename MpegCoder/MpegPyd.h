#ifndef MPEGPYD_H_INCLUDED
#define MPEGPYD_H_INCLUDED

#define NPY_NO_DEPRECATED_API NPY_1_7_API_VERSION

#include <iostream>
#include <Python.h>
#include <numpy/arrayobject.h>
#include <structmember.h>
#include <windows.h>
#include <string>
#include <sstream>
#include "MpegCoder.h"
using std::string;
using std::ostringstream;

/*****************************************************************************
* 类/结构的定义:
* 直接引用CMISS_Handle的类
* 除此之外，不在该类中内置任何Python对口的数据，
* 因为相应的数据已经封装在CMISS_Handle中
*****************************************************************************/
typedef struct _C_MpegDecoder
{
    PyObject_HEAD             // == PyObject ob_base;  定义一个PyObject对象.
                              //////////////////////////////////////////////////////////////////////////
                              // 类/结构的真正成员部分.
                              //
    cmpc::CMpegDecoder *_in_Handle;
}C_MpegDecoder;

typedef struct _C_MpegEncoder
{
    PyObject_HEAD             // == PyObject ob_base;  定义一个PyObject对象.
                              //////////////////////////////////////////////////////////////////////////
                              // 类/结构的真正成员部分.
                              //
    cmpc::CMpegEncoder *_in_Handle;
}C_MpegEncoder;

static PyMemberDef C_MPDC_DataMembers[] =        //注册类/结构的数据成员.
{ //不注册任何数据，因为类数据CMpegDecoder在上层是不可见的
  //{"m_dEnglish", T_FLOAT,  offsetof(CScore, m_dEnglish), 0, "The English score of instance."},
    { "hAddress",   T_ULONGLONG, offsetof(C_MpegDecoder, _in_Handle),   READONLY, "The address of the handle in memory." },
    { nullptr, 0, 0, 0, nullptr }
};

static PyMemberDef C_MPEC_DataMembers[] =        //注册类/结构的数据成员.
{ //不注册任何数据，因为类数据CMpegDecoder在上层是不可见的
  //{"m_dEnglish", T_FLOAT,  offsetof(CScore, m_dEnglish), 0, "The English score of instance."},
    { "hAddress",   T_ULONGLONG, offsetof(C_MpegEncoder, _in_Handle),   READONLY, "The address of the handle in memory." },
    { nullptr, 0, 0, 0, nullptr }
};

/*****************************************************************************
* 全函数声明:
* 为后续的函数注册准备好声明的对象
*****************************************************************************/
/*static void C_CMISS_init(C_CMISS_h* Self, PyObject* pArgs);
static void C_CMISS_Destruct(C_CMISS_h* Self);
static PyObject* C_CMISS_Str(C_CMISS_h* Self);
static PyObject* C_CMISS_Repr(C_CMISS_h* Self);
static PyObject* C_CMISS_login(C_CMISS_h* Self, PyObject *args, PyObject *kwargs);
static PyObject* C_CMISS_set_config(C_CMISS_h* Self, PyObject *args, PyObject *kwargs);
static PyObject* C_CMISS_save_config(C_CMISS_h* Self, PyObject* args);
static PyObject* C_CMISS_load_config(C_CMISS_h* Self, PyObject* args);
static PyObject* C_CMISS_save_as_file(C_CMISS_h* Self);
static PyObject* C_CMISS_download_bin_file(C_CMISS_h* Self);
static PyObject* C_CMISS_save_as_file_XML(C_CMISS_h* Self, PyObject* args);
PyMODINIT_FUNC PyInit_Score(void);*/

static PyObject* C_MPC_Global(PyObject* Self, PyObject *args, PyObject *kwargs) {
    char dumpLevel = -1;
    static char *kwlist[] = { "dumpLevel", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|B", kwlist, &dumpLevel)) {
        cerr << "Error.GlobalSettings: invalid keyword'" << endl;
        return nullptr;
    }
    if (dumpLevel != -1) {
        cmpc::__dumpControl = static_cast<int8_t>(dumpLevel);
    }
    Py_RETURN_NONE;
}

static PyObject* C_MPC_Help(PyObject* Self) {
    cout << R"(================================================================================
      __   _                         _ _ _                ,___            
     ( /  /        /        o       ( / ) )              /   /     /      
      (__/ , , _, /_  _  _ _'  (     / / /  ,_   _  _,  /    __ __/ _  _  
       _/_(_/_(__/ /_(/_/ / /_/_)_  / / (__/|_)_(/_(_)_(___/(_)(_/_(/_/ (_
      //                                   /|       /|                    
     (/                                   (/       (/                     
================================================================================
Yuchen's Mpeg Coder - Readme
    This is a mpegcoder adapted from FFmpeg & Python-c-api.Using it you could 
        get access to processing video easily. Just use it as a common module in 
        python like this.
        >>> import mpegCoder
    Noted that this API need you to install numpy.
    An example of decoding a video in an arbitrary format:
        >>> d = mpegCoder.MpegDecoder()
        >>> d.FFmpegSetup(b'inputVideo.mp4')
        >>> p = d.ExtractGOP(10) # Get a gop of current video by setting the 
                                   start position of 10th frame.
        >>> p = d.ExtractGOP() # Get a gop of current video, using the current 
                                 position after the last ExtractGOP.
        >>> d.ExtractFrame(100, 100) # Extract 100 frames from the begining of 
                                       100th frame.
    An example of transfer the coding of a video with an assigned codec:
        >>> d = mpegCoder.MpegDecoder()
        >>> d.FFmpegSetup(b'i.avi')
        >>> e = mpegCoder.MpegEncoder()
        >>> e.setParameter(decoder=d, codecName=b'libx264', videoPath=b'o.mp4')
            # inherit most of parameters from the decoder.
        >>> opened = e.FFmpegSetup() # Load the encoder.
        >>> if opened: # If encoder is not loaded successfully, do not continue.
        ...     p = True
        ...     while p:
        ...         p = d.ExtractGOP() # Extract current GOP.
        ...         for i in p: # Select every frame.
        ...             e.EncodeFrame(i) # Encode current frame.
        ...     e.FFmpegClose() # End encoding, and flush all frames in cache.
        >>> d.clear() # Close the input video.
    For more instructions, you could tap help(mpegCoder). 
================================================================================
V1.8 update report:
    1. Provide options (widthDst, heightDst) to let MpegDecoder could control the
       output size manually. To ensure the option is valid, we must use the method
        'setParameter' before 'FFmpegSetup'.
    2. Optimize some realization of Decoder so that its efficiency could be 
       improved.
V1.7 update report:
    1. Realize the encoder totally.
    2. Provide a global option 'dumpLevel' to control the log shown in the screen.
    3. Fix bugs in initalize functions.
V1.5 update report:
    1. Provide an incomplete version of encoder, which could encode frames as a 
       video stream that could not be played by player.
V1.4 update report:
    1. Fix a severe bug of the decoder, which causes the memory collapsed if 
       decoding a lot of frames.
V1.2 update report:
    1. Use numpy array to replace the native pyList, which improves the speed 
       significantlly.
V1.0 update report:
    1. Provide the decoder which could decode videos in arbitrary formats and 
       arbitrary coding.
)";
    Py_RETURN_NONE;
}

/*****************************************************************************
* 重载C_CMISS_h类的所有内置、构造方法。
*****************************************************************************/
static int C_MPDC_init(C_MpegDecoder* Self, PyObject* args, PyObject *kwargs) { //重载·构造方法.
    Py_buffer vpath = { 0 };
    static char *kwlist[] = { "videoPath", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|y*", kwlist, &vpath)) {
        cerr << "Error.Initialize: need 'videoPath(string)'" << endl;
        return -1;
    }
    string in_vpath;
    if (vpath.buf)
        in_vpath.assign(reinterpret_cast<char *>(vpath.buf));
    else
        in_vpath.clear();
    Self->_in_Handle = new cmpc::CMpegDecoder;
    if (!in_vpath.empty())
        Self->_in_Handle->FFmpegSetup(in_vpath);

    in_vpath.clear();
    PyBuffer_Release(&vpath);
    //cout << sizeof(Self->_in_Handle) << " - " << sizeof(unsigned long long) << endl;
    return 0;
}

static int C_MPEC_init(C_MpegEncoder* Self) { //重载·构造方法.
    Self->_in_Handle = new cmpc::CMpegEncoder;
    /*if (cmpc::__dumpControl > 1)
        cout << "Create Handle of Encoder." << endl;*/
    return 0;
}

static void C_MPDC_Destruct(C_MpegDecoder* Self) { //重载·析构方法
    delete Self->_in_Handle; //通过动态分配/释放来间接析构，比静态声明更保险

                             //如果还有PyObject*成员的话，要一并释放之.
                             //如：Py_XDECREF(Self->Member);
    Py_TYPE(Self)->tp_free((PyObject*)Self); //释放对象/实例.
}

static void C_MPEC_Destruct(C_MpegEncoder* Self) { //重载·析构方法
    delete Self->_in_Handle; //通过动态分配/释放来间接析构，比静态声明更保险

                             //如果还有PyObject*成员的话，要一并释放之.
                             //如：Py_XDECREF(Self->Member);
    Py_TYPE(Self)->tp_free((PyObject*)Self); //释放对象/实例.
}

static PyObject* C_MPDC_Str(C_MpegDecoder* Self) { //重载·调用str/print时自动调用此函数.
    ostringstream OStr;
    OStr << *(Self->_in_Handle);
    string Str = OStr.str();

    //将原始输出转为Unicode
    int wlen = MultiByteToWideChar(CP_ACP, NULL, Str.c_str(), int(Str.size()), NULL, 0);
    wchar_t* wszString = new wchar_t[wlen + 1];
    MultiByteToWideChar(CP_ACP, NULL, Str.c_str(), int(Str.size()), wszString, wlen);
    wszString[wlen] = 0;
    PyObject* res = PyUnicode_FromUnicode((const Py_UNICODE*)wszString, wlen);
    delete[] wszString;
    return res;
}

static PyObject* C_MPEC_Str(C_MpegEncoder* Self) { //重载·调用str/print时自动调用此函数.
    ostringstream OStr;
    OStr << *(Self->_in_Handle);
    string Str = OStr.str();

    //将原始输出转为Unicode
    int wlen = MultiByteToWideChar(CP_ACP, NULL, Str.c_str(), int(Str.size()), NULL, 0);
    wchar_t* wszString = new wchar_t[wlen + 1];
    MultiByteToWideChar(CP_ACP, NULL, Str.c_str(), int(Str.size()), wszString, wlen);
    wszString[wlen] = 0;
    PyObject* res = PyUnicode_FromUnicode((const Py_UNICODE*)wszString, wlen);
    delete[] wszString;
    return res;
}

static PyObject* C_MPDC_Repr(C_MpegDecoder* Self) { //重载·调用repr内置函数时自动调用.
    return C_MPDC_Str(Self);
}

static PyObject* C_MPEC_Repr(C_MpegEncoder* Self) { //重载·调用repr内置函数时自动调用.
    return C_MPEC_Str(Self);
}

/*****************************************************************************
* 定义C_MpegDecoder类的面向Python接口。
* C_MPDC_Setup:             按路径取用视频，并进行解码器设置
* C_MPDC_ExtractFrame       提取指定位置的指定数目的连续帧
*****************************************************************************/
static PyObject* C_MPDC_Setup(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(bool)C_MPDC_Setup函数，输入依次为:
    *   videoPath [byte->buffer]: 待读取视频路径
    */
    Py_buffer vpath = { 0 };
    static char *kwlist[] = { "videoPath", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|y*", kwlist, &vpath)) {
        cerr << "Error.FFmpegSetup: need 'videoPath(string)'" << endl;
        return nullptr;
    }
    string in_vpath;
    if (vpath.buf)
        in_vpath.assign(reinterpret_cast<char *>(vpath.buf));
    else
        in_vpath.clear();
    bool res;
    if (!in_vpath.empty())
        res = Self->_in_Handle->FFmpegSetup(in_vpath);
    else
        res = Self->_in_Handle->FFmpegSetup();

    in_vpath.clear();
    PyBuffer_Release(&vpath);
    if (res)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPEC_Setup(C_MpegEncoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(bool)C_MPEC_Setup函数，输入依次为:
    *   videoPath [byte->buffer]: 待读取视频路径
    */
    Py_buffer vpath = { 0 };
    static char *kwlist[] = { "videoPath", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|y*", kwlist, &vpath)) {
        cerr << "Error.FFmpegSetup: need 'videoPath(string)'" << endl;
        return nullptr;
    }
    string in_vpath;
    if (vpath.buf)
        in_vpath.assign(reinterpret_cast<char *>(vpath.buf));
    else
        in_vpath.clear();
    bool res;
    if (!in_vpath.empty())
        res = Self->_in_Handle->FFmpegSetup(in_vpath);
    else
        res = Self->_in_Handle->FFmpegSetup();

    in_vpath.clear();
    PyBuffer_Release(&vpath);
    if (res)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPDC_resetPath(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(bool)C_MPDC_resetPath函数，输入依次为:
    *   videoPath [byte->buffer]: 待读取视频路径
    */
    Py_buffer vpath = { 0 };
    static char *kwlist[] = { "videoPath", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|y*", kwlist, &vpath)) {
        cerr << "Error.resetPath: need 'videoPath(string)'" << endl;
        return nullptr;
    }
    string in_vpath;
    if (vpath.buf)
        in_vpath.assign(reinterpret_cast<char *>(vpath.buf));
    else
        in_vpath.clear();
    Self->_in_Handle->resetPath(in_vpath);

    in_vpath.clear();
    PyBuffer_Release(&vpath);
    Py_RETURN_NONE;
}

//注意下面这俩函数，为什么它们不需要Py_IN/DECREF呢？因为未创建临时变量，也没有
//使用形如None这样的现成返回对象！
static PyObject* FreePyArray(PyArrayObject *PyArray) {
    if (PyArray_API == nullptr) {
        import_array();
    }
    /*auto out_iter = NpyIter_New((PyArrayObject *)PyArray, NPY_ITER_READWRITE,
        NPY_CORDER, NPY_NO_CASTING, NULL);
    if (out_iter == NULL) {
        return nullptr;
    }
    auto dataptr = NpyIter_GetDataPtrArray(out_iter);
    uint8_t * out_dataptr = (uint8_t *)(*dataptr);*/
    uint8_t * out_dataptr = (uint8_t *)PyArray_DATA(PyArray);
    delete [] out_dataptr;
    return nullptr;
}
void FreePyList(PyObject *PyList) {
    Py_ssize_t getlen = PyList_Size(PyList);
    for (Py_ssize_t i = 0; i < getlen; i++) {
        PyObject *Item = PyList_GetItem(PyList, i);
        FreePyArray((PyArrayObject*)Item);
    }
    Py_DECREF(PyList);
    int x = PyList_ClearFreeList();
    //cout << "Freed: " << x << " items" << endl;
}

static PyObject* C_MPDC_ExtractFrame(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(int)ExtractFrame函数，输入依次为:
    *   framePos [int->int64_t]: 待处理的帧位置
    */
    if (PyArray_API == nullptr) {
        import_array();
    }
    int64_t framePos = 0, frameNum = 1;
    static char *kwlist[] = { "framePos", "frameNum", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|LL", kwlist, &framePos, &frameNum)) {
        cerr << "Error.ExtractFrame: need 'framePos(int)/frameNum(int)'" << endl;
        return nullptr;
    }
    PyObject *PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    bool res = Self->_in_Handle->ExtractFrame(PyFrameList, framePos, frameNum, 0, 0);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject *PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyList_ClearFreeList();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPDC_ExtractFrame_Time(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(int)ExtractFrame函数，输入依次为:
    *   timePos [float->double]: 待处理的帧位置
    */
    if (PyArray_API == nullptr) {
        import_array();
    }
    double timePos = 0;
    int64_t frameNum = 1;
    static char *kwlist[] = { "timePos", "frameNum", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|dL", kwlist, &timePos, &frameNum)) {
        cerr << "Error.ExtractFrame_Time: need 'timePos(float)/frameNum(int)'" << endl;
        return nullptr;
    }
    PyObject *PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    bool res = Self->_in_Handle->ExtractFrame(PyFrameList, 0, frameNum, timePos, 1);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject *PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyList_ClearFreeList();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPEC_EncodeFrame(C_MpegEncoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(bool)EncodeFrame函数，输入依次为:
    *   PyArrayFrame [ndarray->PyArrayObject]: 待处理的帧
    */
    if (PyArray_API == nullptr) {
        import_array();
    }
    PyObject *PyArrayFrame = nullptr;
    int64_t framePos = -1;
    double  timePos = -1;
    static char *kwlist[] = { "PyArrayFrame", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &PyArrayFrame)) {
        cerr << "Error.EncodeFrame: need 'PyArrayFrame(ndarray) & framePos(int)/timePos(float)'" << endl;
        return nullptr;
    }
    PyObject *PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    int res = Self->_in_Handle->EncodeFrame(reinterpret_cast<PyArrayObject *>(PyArrayFrame));
    if (res>=0)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPDC_ExtractGOP(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(int)ExtractGOP函数，输入依次为:
    *   framePos [int->int64_t]: 待处理的帧位置
    */
    if(PyArray_API == nullptr) {
        import_array();
    }
    int64_t framePos = -1;
    static char *kwlist[] = { "framePos", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|L", kwlist, &framePos)) {
        cerr << "Error.ExtractGOP: need 'framePos(int)'" << endl;
        return nullptr;
    }
    PyObject *PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    if (!(framePos < 0))
        Self->_in_Handle->setGOPPosition(framePos);
    bool res = Self->_in_Handle->ExtractGOP(PyFrameList);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject *PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyList_ClearFreeList();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPDC_ExtractGOP_Time(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(int)ExtractGOP_Time函数，输入依次为:
    *   timePos [float->double]: 待处理的帧位置
    */
    if (PyArray_API == nullptr) {
        import_array();
    }
    double timePos = -1;
    static char *kwlist[] = { "timePos", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|d", kwlist, &timePos)) {
        cerr << "Error.ExtractGOP_Time: need 'timePos(float)'" << endl;
        return nullptr;
    }
    PyObject *PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    if (!(timePos < 0))
        Self->_in_Handle->setGOPPosition(timePos);
    bool res = Self->_in_Handle->ExtractGOP(PyFrameList);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject *PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyList_ClearFreeList();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPDC_setGOPPosition(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(void)setGOPPosition函数，输入依次为:
    *   framePos [int->int64_t]: 待处理的帧位置
    *   timePos [float->double]: 待处理的帧位置
    */
    int64_t framePos = -1;
    double timePos = -1;
    static char *kwlist[] = { "framePos", "timePos", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|Ld", kwlist, &framePos, &timePos)) {
        cerr << "Error.setGOPPosition: need 'framePos(int)'/'timePos(float)'" << endl;
        return nullptr;
    }
    if (!(framePos < 0))
        Self->_in_Handle->setGOPPosition(framePos);
    else if (!(timePos < 0))
        Self->_in_Handle->setGOPPosition(timePos);
    Py_RETURN_NONE;
}

static PyObject* C_MPDC_getParam(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(bool)C_MPDC_getParam函数，输入依次为:
    *   parameter [byte->buffer]: 需要提取的参数
    *       videoPath:    [byte]  当前视频路径
    *       width/height: [int]   帧宽/高
    *       frameCount:   [int]   本次解码的帧数计数
    *       coderName:    [byte]  解码器名称
    *       duration:     [float] 视频长度(s)
    *       estFrameNum:  [int]   预估的总帧数
    *       avgFrameRate  [float] 平均帧率
    */
    Py_buffer param = { 0 };
    static char *kwlist[] = { "paramName", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|y*", kwlist, &param)) {
        cerr << "Error.FFmpegSetup: need 'paramName(string)'" << endl;
        return nullptr;
    }
    string in_param;
    if (param.buf)
        in_param.assign(reinterpret_cast<char *>(param.buf));
    else
        in_param.clear();
    PyObject * res = Self->_in_Handle->getParameter(in_param);
    in_param.clear();
    PyBuffer_Release(&param);
    return res;
}

static PyObject* C_MPDC_setParam(C_MpegDecoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(void)C_MPDC_setParam函数，输入依次为:
    *   parameter [byte->buffer]: 需要提取的参数
    *       widthDst/heightDst: [int]   目标帧宽/高
    */
    int widthDst = 0;
    int heightDst = 0;
    static char *kwlist[] = { "widthDst", "heightDst", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|ii", kwlist, &widthDst, &heightDst)) {
        cout << "Error.FFmpegSetup: need 'paramName(string)'" << endl;
        return nullptr;
    }
    if (widthDst>0) {
        Self->_in_Handle->setParameter("widthDst", &widthDst);
    }
    if (heightDst>0) {
        Self->_in_Handle->setParameter("heightDst", &heightDst);
    }
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_setParam(C_MpegEncoder* Self, PyObject *args, PyObject *kwargs) {
    /* 封装(bool)C_MPEC_setParam函数，输入依次为:
    *   parameter [byte->buffer]: 需要提取的参数
    *       decode:    [Decoder]  解码器的PyObject
    *       videoPath:    [byte]  当前视频路径
    *       codecName:    [byte]  编码器名称
    *       bitRate:      [int]   码率
    *       width/height: [int]   帧宽/高
    *       GOPSize:      [int]   GOP大小
    *       timeBase:     [tuple] 时基
    *       frameRate:    [tuple] 帧率
    */
    PyObject *decoder = nullptr;
    Py_buffer videoPath = { 0 };
    Py_buffer codecName = { 0 };
    double bitRate = -1;
    int width = 0;
    int height = 0;
    int widthSrc = 0;
    int heightSrc = 0;
    int GOPSize = 0;
    int MaxBframe = -1;
    PyObject *frameRate = nullptr;
    static char *kwlist[] = { "decoder", "videoPath", "codecName", "bitRate", "width", "height", "widthSrc", "heightSrc", "GOPSize", "maxBframe", "frameRate", nullptr };
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|Oy*y*diiiiiiO", kwlist, &decoder, &videoPath, &codecName, &bitRate, &width, &height, &widthSrc, &heightSrc, &GOPSize, &MaxBframe, &frameRate)) {
        cout << "Error.FFmpegSetup: need 'paramName(string)'" << endl;
        return nullptr;
    }
    string temp_str;
    if (decoder) {
        temp_str.assign(decoder->ob_type->tp_name);
        if (temp_str.compare("mpegCoder.MpegDecoder") == 0) {
            auto decoderPtr = reinterpret_cast<C_MpegEncoder *>(decoder);
            Self->_in_Handle->setParameter("decoder", decoderPtr->_in_Handle);
        }
        else {
            cerr << "Warning.setParameter: Not intended decoder type, no valid update in this step." << endl;
        }
    }
    if (videoPath.buf) {
        temp_str.assign(reinterpret_cast<char *>(videoPath.buf));
        Self->_in_Handle->setParameter("videoPath", &temp_str);
    }
    if (codecName.buf) {
        temp_str.assign(reinterpret_cast<char *>(codecName.buf));
        Self->_in_Handle->setParameter("codecName", &temp_str);
    }
    if (bitRate>0) {
        auto p = static_cast<int64_t>(bitRate * 1024);
        Self->_in_Handle->setParameter("bitRate", &p);
    }
    if (width>0) {
        Self->_in_Handle->setParameter("width", &width);
    }
    if (height>0) {
        Self->_in_Handle->setParameter("height", &height);
    }
    if (widthSrc>0) {
        Self->_in_Handle->setParameter("widthSrc", &widthSrc);
    }
    if (heightSrc>0) {
        Self->_in_Handle->setParameter("heightSrc", &heightSrc);
    }
    if (GOPSize>0) {
        Self->_in_Handle->setParameter("GOPSize", &GOPSize);
    }
    if (MaxBframe>=0) {
        Self->_in_Handle->setParameter("maxBframe", &MaxBframe);
    }
    if (frameRate) {
        if (PyTuple_Check(frameRate) && PyTuple_Size(frameRate) == 2) {
            Self->_in_Handle->setParameter("frameRate", frameRate);
        }
        else {
            cerr << "Warning.setParameter: {frameRate} must be a 2-dim tuple, so there is no valid update in this step." << endl;
        }
    }
    temp_str.clear();
    PyBuffer_Release(&videoPath);
    PyBuffer_Release(&codecName);
    Py_RETURN_NONE;
}

static PyObject* C_MPDC_DumpFile(C_MpegDecoder* Self) {
    /* 封装(void)dumpFormat函数，输入必须空置 */
    Self->_in_Handle->dumpFormat();
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_DumpFile(C_MpegEncoder* Self) {
    /* 封装(void)dumpFormat函数，输入必须空置 */
    Self->_in_Handle->dumpFormat();
    Py_RETURN_NONE;
}

static PyObject* C_MPDC_Clear(C_MpegDecoder* Self) {
    /* 封装(void)clear函数，输入必须空置 */
    Self->_in_Handle->clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_Clear(C_MpegEncoder* Self) {
    /* 封装(void)clear函数，输入必须空置 */
    Self->_in_Handle->clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_Close(C_MpegEncoder* Self) {
    /* 封装(void)close函数，输入必须空置 */
    Self->_in_Handle->FFmpegClose();
    Py_RETURN_NONE;
}

/*****************************************************************************
* 函数模块登录与注册
*****************************************************************************/
static PyMethodDef C_MPC_MethodMembers[] =      //注册全局函数列表
{
    { "setGlobal",       (PyCFunction)C_MPC_Global,             METH_VARARGS | METH_KEYWORDS, \
    "Set global setting parameters.\n - dumpLevel: [int] the level of dumped log.\n   -|- 0: silent executing.\n   -|- 1: [default] dump basic informations.\n   -|- 2: dump all informations." },
    { "readme",          (PyCFunction)C_MPC_Help,               METH_NOARGS, \
    "Use it to see readme and some useful instructions." },
    { nullptr, nullptr, 0, nullptr }
};

static PyMethodDef C_MPDC_MethodMembers[] =      //注册类的所有成员函数结构列表.
{ //该步的意义即为进一步封装CMISS_Handle，为其提供面向Python的接口
    { "ResetPath",          (PyCFunction)C_MPDC_resetPath,         METH_VARARGS | METH_KEYWORDS, \
    "Reset the path of decoded video.\n - videoPath: [bytes] the path of decoded video file." },
    { "FFmpegSetup",        (PyCFunction)C_MPDC_Setup,             METH_VARARGS | METH_KEYWORDS, \
    "Reset the decoder and the video format.\n - videoPath: [bytes] the path of decoded video file." },
    { "ExtractFrame",       (PyCFunction)C_MPDC_ExtractFrame,      METH_VARARGS | METH_KEYWORDS, \
    "Extract a series of continius frames at the specific position.\n - framePos: [int] the start position of the decoder.\n - frameNum: [int] the expected number of extracted frames." },
    { "ExtractFrameByTime", (PyCFunction)C_MPDC_ExtractFrame_Time, METH_VARARGS | METH_KEYWORDS, \
    "Extract a series of continius frames at the specific position (time based).\n - timePos: [double] the start position (second) of the decoder.\n - frameNum: [int] the expected number of extracted frames." },
    { "ExtractGOP",         (PyCFunction)C_MPDC_ExtractGOP,        METH_VARARGS | METH_KEYWORDS, \
    "Extract a series of continius frames as a GOP at the specific position.\n - framePos: [int] the start position of the decoder." },
    { "ExtractGOPByTime",   (PyCFunction)C_MPDC_ExtractGOP_Time,   METH_VARARGS | METH_KEYWORDS, \
    "Extract a series of continius frames as a GOP at the specific position (time based).\n - timePos: [double] the start position (second) of the decoder." },
    { "ResetGOPPosition",   (PyCFunction)C_MPDC_setGOPPosition,    METH_VARARGS | METH_KEYWORDS, \
    "Reset the start position of GOP flow.\n - framePos: [int] the start position of the decoder.\n - timePos: [double] the start position (second) of the decoder." },
    { "clear",              (PyCFunction)C_MPDC_Clear,             METH_NOARGS, \
    "Clear all states (except the videoPath)." },
    { "dumpFile",           (PyCFunction)C_MPDC_DumpFile,          METH_NOARGS, \
    "Show current state of formatContex." },
    { "setParameter",       (PyCFunction)C_MPDC_setParam,          METH_VARARGS | METH_KEYWORDS, \
    "Set the optional parameters of 'Setup' & 'Extract' functions via different methods.\n - widthDst: [int] the width of destination (frame), if <=0 (default), it would take no effect.\n heightDst: [int] the height of destination (frame), if <=0 (default), it would take no effect." },
    { "getParameter",       (PyCFunction)C_MPDC_getParam,          METH_VARARGS | METH_KEYWORDS, \
    "Input a parameter's name to get it.\n - paramName: [bytes] the name of needed parameter.\n   -|- videoPath: [bytes] the current path of the read video.\n   -|- width/height: [int] the size of one frame.\n   -|- frameCount: [int] the number of returned frames in the last ExtractFrame().\n   -|- coderName: [bytes] the name of the decoder.\n   -|- duration: [double] the total seconds of this video.\n   -|- estFrameNum: [int] the estimated total frame number(may be not accurate).\n   -|- avgFrameRate: [double] the average of FPS." },
    { nullptr, nullptr, 0, nullptr }
};

static PyMethodDef C_MPEC_MethodMembers[] =      //注册类的所有成员函数结构列表.
{ //该步的意义即为进一步封装CMISS_Handle，为其提供面向Python的接口
    { "FFmpegSetup",        (PyCFunction)C_MPEC_Setup,             METH_VARARGS | METH_KEYWORDS, \
    "Open the encoded video and reset the encoder.\n - videoPath: [bytes] the path of encoded(written) video file." },
    { "EncodeFrame",        (PyCFunction)C_MPEC_EncodeFrame,       METH_VARARGS | METH_KEYWORDS, \
    "Encode one frame.\n - PyArrayFrame: [ndarray] the frame that needs to be encoded." },
    { "setParameter",       (PyCFunction)C_MPEC_setParam,          METH_VARARGS | METH_KEYWORDS, \
    "Set the necessary parameters of 'Setup' & 'Encode' functions via different methods.\n - decoder: [MpegDecoder] copy metadata from a known decoder.\n - videoPath: [bytes] the current path of the encoded video.\n - codecName: [bytes] the name of the encoder.\n - bitRate: [float] the indended bit rate (Kb/s).\n - width/height: [int] the size of one (scaled) frame.\n - widthSrc/heightSrc: [int] the size of one input frame, if set <=0, these parameters would not be enabled.\n - GOPSize: [int] the number of frames in a GOP.\n - maxBframe: [int] the maximal number of B frames in a GOP.\n - frameRate: [tuple] a 2-dim tuple indicating the FPS(num, den) of the stream." },
    { "clear",              (PyCFunction)C_MPEC_Clear,             METH_NOARGS, \
    "Clear all states." },
    { "dumpFile",           (PyCFunction)C_MPEC_DumpFile,          METH_NOARGS, \
    "Show current state of formatContex." },
    { "FFmpegClose",        (PyCFunction)C_MPEC_Close,             METH_NOARGS, \
    "Close currently encoded video and write the end code of a MPEG file." },
    { nullptr, nullptr, 0, nullptr }
};


/*****************************************************************************
* 类/结构的所有成员、内置属性的说明信息..
* 为Python类提供顶层的封装
*****************************************************************************/
static PyTypeObject C_MPDC_ClassInfo =
{
    PyVarObject_HEAD_INIT(nullptr, 0)"mpegCoder.MpegDecoder",  //可以通过__class__获得这个字符串. CPP可以用类.__name__获取.
    sizeof(C_MpegDecoder),                 //类/结构的长度.调用PyObject_New时需要知道其大小.
    0,
    (destructor)C_MPDC_Destruct,    //类的析构函数.
    0,
    0,
    0,
    0,
    (reprfunc)C_MPDC_Repr,
    0,
    0,
    0,
    0,
    0,
    (reprfunc)C_MPDC_Str,         //Str/print内置函数调用.
    0,
    0,
    0,
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE,     //如果没有提供方法的话，为Py_TPFLAGS_DEFAULE
    "This class has wrapped the C-API of FFmpeg decoder so that users could call its methods\n to decode the frame data in python quickly.",   //__doc__,类/结构的DocString.
    0,
    0,
    0,
    0,
    0,
    0,
    C_MPDC_MethodMembers,       //类的所有方法集合.
    C_MPDC_DataMembers,         //类的所有数据成员集合.
    0,
    0,
    0,
    0,
    0,
    0,
    (initproc)C_MPDC_init,      //类的构造函数.
    0,
};

static PyTypeObject C_MPEC_ClassInfo =
{
    PyVarObject_HEAD_INIT(nullptr, 0)"mpegCoder.MpegEncoder",  //可以通过__class__获得这个字符串. CPP可以用类.__name__获取.
    sizeof(C_MpegEncoder),                 //类/结构的长度.调用PyObject_New时需要知道其大小.
    0,
    (destructor)C_MPEC_Destruct,    //类的析构函数.
    0,
    0,
    0,
    0,
    (reprfunc)C_MPEC_Repr,
    0,
    0,
    0,
    0,
    0,
    (reprfunc)C_MPEC_Str,         //Str/print内置函数调用.
    0,
    0,
    0,
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE,     //如果没有提供方法的话，为Py_TPFLAGS_DEFAULE
    "This class has wrapped the C-API of FFmpeg encoder so that users could call its methods\n to encode frames by using numpy-data quickly.",   //__doc__,类/结构的DocString.
    0,
    0,
    0,
    0,
    0,
    0,
    C_MPEC_MethodMembers,       //类的所有方法集合.
    C_MPEC_DataMembers,         //类的所有数据成员集合.
    0,
    0,
    0,
    0,
    0,
    0,
    (initproc)C_MPEC_init,      //类的构造函数.
    0,
};


/*****************************************************************************
* 此模块说明信息..
* 为Python模块提供顶层的封装
*****************************************************************************/
static PyModuleDef ModuleInfo =
{
    PyModuleDef_HEAD_INIT,
    "mpegCoder",               //模块的内置名--__name__.
    "A FFmpeg module which could provide a class for encode/decode a video in any format.",  //模块的DocString.__doc__
    -1,
    nullptr, nullptr, nullptr, nullptr, nullptr
};

#endif
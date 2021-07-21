#ifndef MPEGPYD_H_INCLUDED
#define MPEGPYD_H_INCLUDED

#define PY_ARRAY_UNIQUE_SYMBOL MPEGARRAY_API

#include <cstdint>
#include <iostream>
#include <Python.h>
#include <numpy/arrayobject.h>
#include <structmember.h>
#include <windows.h>
#include <string>
#include <sstream>
#include "MpegCoder.h"
#include "MpegStreamer.h"
using std::string;
using std::ostringstream;

PyObject *str2PyStr(string Str) {  // Convert the output string to the widechar unicode string.
    int wlen = MultiByteToWideChar(CP_ACP, NULL, Str.c_str(), int(Str.size()), NULL, 0);
    wchar_t* wszString = new wchar_t[static_cast<size_t>(wlen) + 1];
    MultiByteToWideChar(CP_ACP, NULL, Str.c_str(), int(Str.size()), wszString, wlen);
    wszString[wlen] = 0;
    PyObject* res = PyUnicode_FromWideChar(wszString, wlen);
    delete[] wszString;
    return res;
}

bool PyStr2str(PyObject* py_str, string& s_str) {  // Convert a python str to std::string.
    if (!py_str) {
        return false;
    }
    if (PyUnicode_Check(py_str)) {
        auto py_bytes = PyUnicode_EncodeFSDefault(py_str);
        if (!py_bytes) {
            PyErr_SetString(PyExc_TypeError, "Error.PyStr2str: fail to encode the unicode str.'");
            return false;
        }
        auto c_str = PyBytes_AsString(py_bytes);
        if (!c_str) {
            PyErr_SetString(PyExc_TypeError, "Error.PyStr2str: fail to parse data from the encoded str.'");
            return false;
        }
        s_str.assign(c_str);
        Py_DECREF(py_bytes);
    }
    else {
        if (PyBytes_Check(py_str)) {
            auto c_str = PyBytes_AsString(py_str);
            if (!c_str) {
                PyErr_SetString(PyExc_TypeError, "Error.PyStr2str: fail to parse data from the bytes object.'");
                return false;
            }
            s_str.assign(c_str);
        }
        else {
            PyErr_SetString(PyExc_TypeError, "Error.PyStr2str: fail to convert the object to string, maybe the object is not str or bytes.'");
            return false;
        }
    }
    return true;
}

/*****************************************************************************
* C style definition of Python classes.
* Each class would ref the C implemented class directly.
* No extra python data member is added to these classes,
* because the data members have been already packed as private members of the
* C classes.
*****************************************************************************/
typedef struct _C_MpegDecoder
{
    PyObject_HEAD                    // == PyObject ob_base; Define the PyObject header.
    cmpc::CMpegDecoder* _in_Handle;  // Define the implementation of the C Object.
} C_MpegDecoder;

typedef struct _C_MpegEncoder
{
    PyObject_HEAD                    // == PyObject ob_base; Define the PyObject header.
    cmpc::CMpegEncoder* _in_Handle;  // Define the implementation of the C Object.
} C_MpegEncoder;

typedef struct _C_MpegClient
{
    PyObject_HEAD                    // == PyObject ob_base; Define the PyObject header.
    cmpc::CMpegClient* _in_Handle;   // Define the implementation of the C Object.
} C_MpegClient;

typedef struct _C_MpegServer
{
    PyObject_HEAD                    // == PyObject ob_base; Define the PyObject header.
    cmpc::CMpegServer* _in_Handle;   // Define the implementation of the C Object.
} C_MpegServer;

static PyMemberDef C_MPDC_DataMembers[] =        // Register the members of the python class.
{ // Do not register any data, because all data of this class is private.
  //{"m_dEnglish", T_FLOAT,  offsetof(CScore, m_dEnglish), 0, "The English score of instance."},
    { "hAddress",   T_ULONGLONG, offsetof(C_MpegDecoder, _in_Handle),   READONLY, "The address of the handle in memory." },
    { nullptr, 0, 0, 0, nullptr }
};

static PyMemberDef C_MPEC_DataMembers[] =        // Register the members of the python class.
{ // Do not register any data, because all data of this class is private.
  //{"m_dEnglish", T_FLOAT,  offsetof(CScore, m_dEnglish), 0, "The English score of instance."},
    { "hAddress",   T_ULONGLONG, offsetof(C_MpegEncoder, _in_Handle),   READONLY, "The address of the handle in memory." },
    { nullptr, 0, 0, 0, nullptr }
};

static PyMemberDef C_MPCT_DataMembers[] =        // Register the members of the python class.
{ // Do not register any data, because all data of this class is private.
  //{"m_dEnglish", T_FLOAT,  offsetof(CScore, m_dEnglish), 0, "The English score of instance."},
    { "hAddress",   T_ULONGLONG, offsetof(C_MpegClient, _in_Handle),   READONLY, "The address of the handle in memory." },
    { nullptr, 0, 0, 0, nullptr }
};

static PyMemberDef C_MPSV_DataMembers[] =        // Register the members of the python class.
{ // Do not register any data, because all data of this class is private.
  //{"m_dEnglish", T_FLOAT,  offsetof(CScore, m_dEnglish), 0, "The English score of instance."},
    { "hAddress",   T_ULONGLONG, offsetof(C_MpegServer, _in_Handle),   READONLY, "The address of the handle in memory." },
    { nullptr, 0, 0, 0, nullptr }
};

/*****************************************************************************
* Delearaction of all methods and functions.
* Prepare the function objects for the registeration of the classes and
* functions.
*****************************************************************************/
/*static void Example(ClassName* Self, PyObject* pArgs);
PyMODINIT_FUNC PyFunc_Example(void);*/

static PyObject* C_MPC_Global(PyObject* Self, PyObject* args, PyObject* kwargs) {
    char dumpLevel = -1;
    cmpc::CharList kwlist_str({ "dumpLevel" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|B", kwlist, &dumpLevel)) {
        PyErr_SetString(PyExc_TypeError, "Error.GlobalSettings: invalid keyword'");
        return nullptr;
    }
    if (dumpLevel != -1) {
        cmpc::__dumpControl = static_cast<int8_t>(dumpLevel);
        switch (dumpLevel) {
        case 0:
            cmpc::av_log_set_level(AV_LOG_ERROR);
            break;
        case 1:
            cmpc::av_log_set_level(AV_LOG_INFO);
            break;
        case 2:
        default:
            cmpc::av_log_set_level(AV_LOG_DEBUG);
            break;
        }
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
        ...         if p is not None:
        ...             for i in p: # Select every frame.
        ...                 e.EncodeFrame(i) # Encode current frame.
        ...     e.FFmpegClose() # End encoding, and flush all frames in cache.
        >>> d.clear() # Close the input video.
    An example of demuxing the video streamer from a server:
        >>> d = mpegCoder.MpegClient() # create the handle
        >>> d.setParameter(dstFrameRate=(5,1), readSize=5, cacheSize=12)
            # normalize the frame rate to 5 FPS, and use a cache which size is 
            # 12 frames. Read 5 frames each time.
        >>> success = d.FFmpegSetup(b'rtsp://localhost:8554/video')
        >>> if not success: # exit if fail to connect with the server
        ...     exit()
        >>> d.start() # start the sub-thread for demuxing the stream.
        >>> for i in range(10): # processing loop
        ...     time.sleep(5)
        ...     p = d.ExtractFrame() # every 5 seconds, read 5 frames (1 sec.)
        ...     # do some processing
        >>> d.terminate() # shut down the current thread. You could call start() 
                          # and let it restart.
        >>> d.clear() # Disconnect with the stream.
    For more instructions, you could tap help(mpegCoder). 
================================================================================
V3.1.0 update report:
    1. Support str() type for all string arguments.
    2. Support http, ftp, sftp streams for MpegServer.
    3. Support "nthread" option for MpegDecoder, MpegEncoder, MpegClient and
       MpegServer.
    4. Fix a bug caused by the constructor MpegServer().
    5. Clean up all gcc warnings of the source codes.
    6. Fix typos in docstrings.
V3.0.0 update report:
    1. Fix a severe memory leaking bugs when using AVPacket.
    2. Fix a bug caused by using MpegClient.terminate() when a video is closed
       by the server.
    3. Support the MpegServer. This class is used for serving the online video
       streams.
    4. Refactor the implementation of the loggings.
    5. Add getParameter() and setParameter(configDict) APIs to MpegEncoder and
       MpegServer.
    6. Move FFMpeg depedencies and the OutputStream class to the cmpc space.
    7. Fix dependency issues and cpp standard issues.
    8. Upgrade to `FFMpeg 4.4` Version.
    9. Add a quick script for fetching the `FFMpeg` dependencies.
V2.05 update report:
    1. Fix a severe bug that causes the memory leak when using MpegClient.
    This bug also exists in MpegDecoder, but it seems that the bug would not cause
    memory leak in that case. (Although we have also fixed it now.)
    2. Upgrade to FFMpeg 4.0 Version.
V2.01 update report:
    Fix a bug that occurs when the first received frame may has a PTS larger than 
    zero.
V2.0 update report:
    1. Revise the bug of the encoder which may cause the stream duration is shorter
       than the real duration of the video in some not advanced media players.
    2. Improve the structure of the code and remove some unnecessary codes.
    3. Provide a complete version of client, which could demux the video stream
       from a server in any network protocol.
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
* Declare the core methods of the classes.
*****************************************************************************/
static int C_MPDC_init(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {  // Construct
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoPath" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.Initialize: need 'videoPath(str)'");
        return -1;
    }
    string in_vpath;
    if (!vpath) {
        in_vpath.clear();
    }
    else if (!PyStr2str(vpath, in_vpath)) {
        return -1;
    }
    Self->_in_Handle = new cmpc::CMpegDecoder;
    if (!in_vpath.empty()) {
        Self->_in_Handle->FFmpegSetup(in_vpath);
    }

    in_vpath.clear();
    //cout << sizeof(Self->_in_Handle) << " - " << sizeof(unsigned long long) << endl;
    return 0;
}

static int C_MPEC_init(C_MpegEncoder* Self) {  // Construct
    Self->_in_Handle = new cmpc::CMpegEncoder;
    return 0;
}

static int C_MPCT_init(C_MpegClient* Self) {  // Construct
    Self->_in_Handle = new cmpc::CMpegClient;
    return 0;
}

static int C_MPSV_init(C_MpegServer* Self) {  // Construct
    Self->_in_Handle = new cmpc::CMpegServer;
    return 0;
}

static void C_MPDC_Destruct(C_MpegDecoder* Self) {  // Destructor
    delete Self->_in_Handle;  // Delete the allocated class implementation.
    /* If there are still other members, also need to deallocate them,
     * for example, Py_XDECREF(Self->Member); */
    Py_TYPE(Self)->tp_free((PyObject*)Self);  // Destruct the PyObject.
}

static void C_MPEC_Destruct(C_MpegEncoder* Self) {  // Destructor
    delete Self->_in_Handle;  // Delete the allocated class implementation.
    /* If there are still other members, also need to deallocate them,
     * for example, Py_XDECREF(Self->Member); */
    Py_TYPE(Self)->tp_free((PyObject*)Self);  // Destruct the PyObject.
}

static void C_MPCT_Destruct(C_MpegClient* Self) {  // Destructor
    delete Self->_in_Handle;  // Delete the allocated class implementation.
    /* If there are still other members, also need to deallocate them,
     * for example, Py_XDECREF(Self->Member); */
    Py_TYPE(Self)->tp_free((PyObject*)Self);  // Destruct the PyObject.
}

static void C_MPSV_Destruct(C_MpegServer* Self) {  // Destructor
    delete Self->_in_Handle;  // Delete the allocated class implementation.
    /* If there are still other members, also need to deallocate them,
     * for example, Py_XDECREF(Self->Member); */
    Py_TYPE(Self)->tp_free((PyObject*)Self);  // Destruct the PyObject.
}

static PyObject* C_MPDC_Str(C_MpegDecoder* Self) {  // The __str__ (print) operator.
    ostringstream OStr;
    OStr << *(Self->_in_Handle);
    string Str = OStr.str();
    return str2PyStr(Str);  // Convert the string to unicode wide char.
}

static PyObject* C_MPEC_Str(C_MpegEncoder* Self) {  // The __str__ (print) operator.
    ostringstream OStr;
    OStr << *(Self->_in_Handle);
    string Str = OStr.str();
    return str2PyStr(Str);  // Convert the string to unicode wide char.
}

static PyObject* C_MPCT_Str(C_MpegClient* Self) {  // The __str__ (print) operator.
    ostringstream OStr;
    OStr << *(Self->_in_Handle);
    string Str = OStr.str();
    return str2PyStr(Str);  // Convert the string to unicode wide char.
}

static PyObject* C_MPSV_Str(C_MpegServer* Self) {  // The __str__ (print) operator.
    ostringstream OStr;
    OStr << *(Self->_in_Handle);
    string Str = OStr.str();
    return str2PyStr(Str);  // Convert the string to unicode wide char.
}

static PyObject* C_MPDC_Repr(C_MpegDecoder* Self) {  // The __repr__ operator.
    return C_MPDC_Str(Self);
}

static PyObject* C_MPEC_Repr(C_MpegEncoder* Self) {  // The __repr__ operator.
    return C_MPEC_Str(Self);
}

static PyObject* C_MPCT_Repr(C_MpegClient* Self) {  // The __repr__ operator.
    return C_MPCT_Str(Self);
}

static PyObject* C_MPSV_Repr(C_MpegServer* Self) {  // The __repr__ operator.
    return C_MPSV_Str(Self);
}

/*****************************************************************************
* Define the Python-C-APIs for .
* C_MPDC_Setup:             Configure the decoder by the video.
* C_MPDC_ExtractFrame       Extract serveral frames.
*****************************************************************************/
static PyObject* C_MPDC_Setup(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPDC_Setup method, the inputs are:
    *   videoPath [str/bytes->str]: the video path to be decoded.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoPath" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoPath(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!vpath) {
        in_vpath.clear();
    }
    else if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    bool res;
    if (!in_vpath.empty())
        res = Self->_in_Handle->FFmpegSetup(in_vpath);
    else
        res = Self->_in_Handle->FFmpegSetup();

    in_vpath.clear();
    if (res)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPEC_Setup(C_MpegEncoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPEC_Setup method, the inputs are:
    *   videoPath [str/bytes->str]: the video path to be encoded.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoPath" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoPath(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!vpath) {
        in_vpath.clear();
    }
    else if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    bool res;
    if (!in_vpath.empty())
        res = Self->_in_Handle->FFmpegSetup(in_vpath);
    else
        res = Self->_in_Handle->FFmpegSetup();

    in_vpath.clear();
    if (res)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPCT_Setup(C_MpegClient* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPCT_Setup method, the inputs are:
    *   videoAddress [str/bytes->str]: the video path to be demuxed.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoAddress" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoAddress(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!vpath) {
        in_vpath.clear();
    }
    else if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    bool res;
    if (!in_vpath.empty())
        res = Self->_in_Handle->FFmpegSetup(in_vpath);
    else
        res = Self->_in_Handle->FFmpegSetup();

    in_vpath.clear();
    if (res)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPSV_Setup(C_MpegServer* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPSV_Setup method, the inputs are:
    *   videoAddress [str/bytes->str]: the video address to be served.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoAddress" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoAddress(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!vpath) {
        in_vpath.clear();
    }
    else if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    bool res;
    if (!in_vpath.empty())
        res = Self->_in_Handle->FFmpegSetup(in_vpath);
    else
        res = Self->_in_Handle->FFmpegSetup();

    in_vpath.clear();
    if (res)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPDC_resetPath(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPDC_resetPath method, the inputs are:
    *   videoPath [str/bytes->str]: the video path to be decoded.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoPath" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoPath(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    Self->_in_Handle->resetPath(in_vpath);

    in_vpath.clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_resetPath(C_MpegEncoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPEC_resetPath method, the inputs are:
    *   videoPath [str/bytes->str]: the video path to be encoded.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoPath" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoPath(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    Self->_in_Handle->resetPath(in_vpath);

    in_vpath.clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPCT_resetPath(C_MpegClient* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPCT_resetPath method, the inputs are:
    *   videoAddress [str/bytes->str]: the video path to be demuxed.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoAddress" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoAddress(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    Self->_in_Handle->resetPath(in_vpath);

    in_vpath.clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPSV_resetPath(C_MpegServer* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPSV_resetPath method, the inputs are:
    *   videoAddress [str/bytes->str]: the video address to be served.
    */
    PyObject* vpath = nullptr;
    cmpc::CharList kwlist_str({ "videoAddress" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &vpath)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'videoAddress(str)'");
        return nullptr;
    }
    string in_vpath;
    if (!PyStr2str(vpath, in_vpath)) {
        return nullptr;
    }
    Self->_in_Handle->resetPath(in_vpath);

    in_vpath.clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPCT_Start(C_MpegClient* Self) {
    /* Wrapped (void)Start method, the input is required to be empty. */
    auto success = Self->_in_Handle->start();
    if (!success) {
        PyErr_SetString(PyExc_ConnectionError, "Error.Start: before call this method, need to call FFmpegSetup() successfully, and also you should not call it when the decoding thread is running.'");
        return nullptr;
    }
    Py_RETURN_NONE;
}

static PyObject* C_MPCT_Terminate(C_MpegClient* Self) {
    /* Wrapped (void)Terminate method, the input is required to be empty. */
    Self->_in_Handle->terminate();
    Py_RETURN_NONE;
}

/* Pay attention to the following two methods :
 * Why do we remove the Py_IN/DECREF?
 * Because no temp variables are created, so we do not need to manage them,
 * but just use None as the returned value. */
static PyObject* FreePyArray(PyArrayObject* PyArray) {
    uint8_t* out_dataptr = (uint8_t*)PyArray_DATA(PyArray);
    delete[] out_dataptr;
    return nullptr;
}
void FreePyList(PyObject* PyList) {
    Py_ssize_t getlen = PyList_Size(PyList);
    for (Py_ssize_t i = 0; i < getlen; i++) {
        PyObject* Item = PyList_GetItem(PyList, i);
        FreePyArray((PyArrayObject*)Item);
    }
    Py_DECREF(PyList);
    PyGC_Collect();
}

static PyObject* C_MPDC_ExtractFrame(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (int)ExtractFrame method, the inputs are:
    *   framePos [int->int64_t]: the start position of the extracted frames.
    *   frameNum [int->int64_t]: the number of extracted frames.
    */
    int64_t framePos = 0, frameNum = 1;
    cmpc::CharList kwlist_str({ "framePos", "frameNum" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|LL", kwlist, &framePos, &frameNum)) {
        PyErr_SetString(PyExc_TypeError, "Error.ExtractFrame: need 'framePos(int)/frameNum(int)'");
        return nullptr;
    }
    PyObject* PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    bool res = Self->_in_Handle->ExtractFrame(PyFrameList, framePos, frameNum, 0, 0);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject* PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyGC_Collect();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPDC_ExtractFrame_Time(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (int)ExtractFrame method, the inputs are:
    *   timePos [float->double]: the start position (time unit) of the extracted frames.
    *   frameNum [int->int64_t]: the number of extracted frames.
    */
    double timePos = 0;
    int64_t frameNum = 1;
    cmpc::CharList kwlist_str({ "timePos", "frameNum" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|dL", kwlist, &timePos, &frameNum)) {
        PyErr_SetString(PyExc_TypeError, "Error.ExtractFrame_Time: need 'timePos(float)/frameNum(int)'");
        return nullptr;
    }
    PyObject* PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    bool res = Self->_in_Handle->ExtractFrame(PyFrameList, 0, frameNum, timePos, 1);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject* PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyGC_Collect();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPEC_EncodeFrame(C_MpegEncoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)EncodeFrame method, the inputs are:
    *   PyArrayFrame [ndarray->PyArrayObject]: the frame to be encoded.
    */
    PyObject* PyArrayFrame = nullptr;
    cmpc::CharList kwlist_str({ "PyArrayFrame" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &PyArrayFrame)) {
        PyErr_SetString(PyExc_TypeError, "Error.EncodeFrame: need 'PyArrayFrame(ndarray)'");
        return nullptr;
    }
    int res = Self->_in_Handle->EncodeFrame(reinterpret_cast<PyArrayObject*>(PyArrayFrame));
    if (res >= 0)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPSV_ServeFrame(C_MpegServer* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)ServeFrame method, the inputs are:
    *   PyArrayFrame [ndarray->PyArrayObject]: the frame to be encoded and served.
    */
    PyObject* PyArrayFrame = nullptr;
    cmpc::CharList kwlist_str({ "PyArrayFrame" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &PyArrayFrame)) {
        PyErr_SetString(PyExc_TypeError, "Error.EncodeFrame: need 'PyArrayFrame(ndarray)'");
        return nullptr;
    }
    int res = Self->_in_Handle->ServeFrame(reinterpret_cast<PyArrayObject*>(PyArrayFrame));
    if (res >= 0)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPSV_ServeFrameBlock(C_MpegServer* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)ServeFrameBlock method, the inputs are:
    *   PyArrayFrame [ndarray->PyArrayObject]: the frame to be encoded and served.
    */
    PyObject* PyArrayFrame = nullptr;
    cmpc::CharList kwlist_str({ "PyArrayFrame" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &PyArrayFrame)) {
        PyErr_SetString(PyExc_TypeError, "Error.EncodeFrame: need 'PyArrayFrame(ndarray)'");
        return nullptr;
    }
    int res = Self->_in_Handle->ServeFrameBlock(reinterpret_cast<PyArrayObject*>(PyArrayFrame));
    if (res >= 0)
        Py_RETURN_TRUE;
    else
        Py_RETURN_FALSE;
}

static PyObject* C_MPCT_ExtractFrame(C_MpegClient* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (int)ExtractFrame method, the inputs are:
    *   readSize [int->int64_t]: the number of frames to be readed. This value could not
    *       exceeded the size of the frame buffer.
    */
    int64_t readSize = 0;
    cmpc::CharList kwlist_str({ "readSize" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|L", kwlist, &readSize)) {
        PyErr_SetString(PyExc_TypeError, "Error.ExtractFrame: need 'readSize(int)'");
        return nullptr;
    }
    PyObject* res = nullptr;
    if (readSize > 0)
        res = Self->_in_Handle->ExtractFrame(readSize);
    else
        res = Self->_in_Handle->ExtractFrame();
    if (res) {
        return res;
    }
    else {
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPDC_ExtractGOP(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (int)ExtractGOP method, the inputs are:
    *   framePos [int->int64_t]: the start position of the GOP to be extracted.
    */
    int64_t framePos = -1;
    cmpc::CharList kwlist_str({ "framePos" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|L", kwlist, &framePos)) {
        PyErr_SetString(PyExc_TypeError, "Error.ExtractGOP: need 'framePos(int)'");
        return nullptr;
    }
    PyObject* PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    if (!(framePos < 0))
        Self->_in_Handle->setGOPPosition(framePos);
    bool res = Self->_in_Handle->ExtractGOP(PyFrameList);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject* PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyGC_Collect();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPDC_ExtractGOP_Time(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (int)ExtractGOP_Time method, the inputs are:
    *   timePos [float->double]: the start position (time unit) of the GOP to be extracted.
    */
    double timePos = -1;
    cmpc::CharList kwlist_str({ "timePos" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|d", kwlist, &timePos)) {
        PyErr_SetString(PyExc_TypeError, "Error.ExtractGOP_Time: need 'timePos(float)'");
        return nullptr;
    }
    PyObject* PyFrameList = PyList_New(static_cast<Py_ssize_t>(0));
    //cout << framePos << " - " << frameNum << endl;
    if (!(timePos < 0))
        Self->_in_Handle->setGOPPosition(timePos);
    bool res = Self->_in_Handle->ExtractGOP(PyFrameList);
    Py_ssize_t getlen = PyList_Size(PyFrameList);
    res = res && (getlen > 0);
    if (res) {
        PyObject* PyFrameArray = PyArray_FromObject(PyFrameList, NPY_UINT8, 4, 4);
        FreePyList(PyFrameList);
        return PyFrameArray;
    }
    else {
        Py_DECREF(PyFrameList);
        PyGC_Collect();
        Py_RETURN_NONE;
    }
}

static PyObject* C_MPDC_setGOPPosition(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (void)setGOPPosition method, the inputs are:
    *   framePos [int->int64_t]: the start position of the GOP to be extracted.
    *   timePos [float->double]: the start position (time unit) of the GOP to be extracted.
    */
    int64_t framePos = -1;
    double timePos = -1;
    cmpc::CharList kwlist_str({ "framePos", "timePos" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|Ld", kwlist, &framePos, &timePos)) {
        PyErr_SetString(PyExc_TypeError, "Error.setGOPPosition: need 'framePos(int)'/'timePos(float)'");
        return nullptr;
    }
    if (!(framePos < 0))
        Self->_in_Handle->setGOPPosition(framePos);
    else if (!(timePos < 0))
        Self->_in_Handle->setGOPPosition(timePos);
    Py_RETURN_NONE;
}

static PyObject* C_MPDC_getParam(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPDC_getParam function, the inputs are:
    *   paramName [str/bytes->str]: The name of the parameter to be gotten, could be.
    *       videoPath:    [str]   Path of the current video.
    *       width/height: [int]   The width / height of the frame.
    *       frameCount:   [int]   The count of frames of the current decoding work.
    *       coderName:    [str]   The name of the decoder.
    *       nthread:      [int]   The number of decoder threads.
    *       duration:     [float] The duration of the video.
    *       estFrameNum:  [int]   The estimated total frame number.
    *       avgFrameRate  [float] The average frame rate.
    */
    PyObject* param = nullptr;
    cmpc::CharList kwlist_str({ "paramName" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &param)) {
        PyErr_SetString(PyExc_TypeError, "Error.getParameter: need 'paramName(str)'");
        return nullptr;
    }
    string in_param;
    if (!param) {
        in_param.clear();
    }
    else if (!PyStr2str(param, in_param)) {
        return nullptr;
    }
    PyObject* res = nullptr;
    if (in_param.empty()) {
        res = Self->_in_Handle->getParameter();
    }
    else {
        res = Self->_in_Handle->getParameter(in_param);
    }
    in_param.clear();
    return res;
}

static PyObject* C_MPEC_getParam(C_MpegEncoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPEC_getParam function, the inputs are:
    *   paramName [str/bytes->str]: The name of the parameter to be gotten, could be.
    *       videoPath:          [str]   Path of the current video.
    *       codecName:          [str]   The name of the codec.
    *       nthread:            [int]   The number of encoder threads.
    *       bitRate:            [int]   The target bit rate.
    *       width/height:       [int]   The width / height of the encoded frame.
    *       widthSrc/heightSrc: [int]   The width / height of the input frame.
    *       GOPSize:            [int]   The size of one GOP.
    *       maxBframe:          [int]   The maximal number of continuous B frames.
    *       frameRate:          [float] The target frame rate.
    */
    PyObject* param = nullptr;
    cmpc::CharList kwlist_str({ "paramName" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &param)) {
        PyErr_SetString(PyExc_TypeError, "Error.getParameter: need 'paramName(str)'");
        return nullptr;
    }
    string in_param;
    if (!param) {
        in_param.clear();
    }
    else if (!PyStr2str(param, in_param)) {
        return nullptr;
    }
    PyObject* res = nullptr;
    if (in_param.empty()) {
        res = Self->_in_Handle->getParameter();
    }
    else {
        res = Self->_in_Handle->getParameter(in_param);
    }
    in_param.clear();
    return res;
}

static PyObject* C_MPCT_getParam(C_MpegClient* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPCT_getParam method, the inputs are:
    *   parameter [str/bytes->str]: The name of the parameter to be gotten, could be.
    *       videoAddress: [str]   The address of the current video.
    *       width/height: [int]   The width / height of the received frame.
    *       frameCount:   [int]   The count of frames of the current decoding work.
    *       coderName:    [str]   The name of the decoder.
    *       nthread:      [int]   The number of decoder threads.
    *       duration:     [float] The duration of the video.
    *       estFrameNum:  [int]   The estimated total frame number.
    *       avgFrameRate  [float] The average frame rate.
    */
    PyObject* param = nullptr;
    cmpc::CharList kwlist_str({ "paramName" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &param)) {
        PyErr_SetString(PyExc_TypeError, "Error.getParameter: need 'paramName(str)'");
        return nullptr;
    }
    string in_param;
    if (!param) {
        in_param.clear();
    }
    else if (!PyStr2str(param, in_param)) {
        return nullptr;
    }
    PyObject* res = nullptr;
    if (in_param.empty()) {
        res = Self->_in_Handle->getParameter();
    }
    else {
        res = Self->_in_Handle->getParameter(in_param);
    }
    in_param.clear();
    return res;
}

static PyObject* C_MPSV_getParam(C_MpegServer* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPSV_getParam function, the inputs are:
    *   paramName [str/bytes->str]: The name of the parameter to be gotten, could be.
    *       videoAddress:       [str]   The address of the current video.
    *       codecName:          [str]   The name of the codec.
    *       formatName:         [str]   The name of the stream format.
    *       nthread:            [int]   The number of encoder threads.
    *       bitRate:            [int]   The target bit rate.
    *       width/height:       [int]   The width / height of the encoded frame.
    *       widthSrc/heightSrc: [int]   The width / height of the input frame.
    *       GOPSize:            [int]   The size of one GOP.
    *       maxBframe:          [int]   The maximal number of continuous B frames.
    *       frameRate:          [float] The target frame rate.
    *       waitRef             [float] The reference used for sync. waiting.
    *       ptsAhead            [int]   The ahead time duration in the uit of time stamp.
    */
    PyObject* param = nullptr;
    cmpc::CharList kwlist_str({ "paramName" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|O", kwlist, &param)) {
        PyErr_SetString(PyExc_TypeError, "Error.getParameter: need 'paramName(str)'");
        return nullptr;
    }
    string in_param;
    if (!param) {
        in_param.clear();
    }
    else if (!PyStr2str(param, in_param)) {
        return nullptr;
    }
    PyObject* res = nullptr;
    if (in_param.empty()) {
        res = Self->_in_Handle->getParameter();
    }
    else {
        res = Self->_in_Handle->getParameter(in_param);
    }
    in_param.clear();
    return res;
}

static PyObject* C_MPDC_setParam(C_MpegDecoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (void)C_MPDC_setParam method, the inputs are:
    *   widthDst/heightDst: [int] The width / height of the decoded frames.
    *   nthread:      [int]   The number of decoder threads.
    */
    int widthDst = 0;
    int heightDst = 0;
    int nthread = 0;
    cmpc::CharList kwlist_str({ "widthDst", "heightDst", "nthread" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|iii", kwlist, &widthDst, &heightDst, &nthread)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'params'");
        return nullptr;
    }
    if (widthDst > 0) {
        Self->_in_Handle->setParameter("widthDst", &widthDst);
    }
    if (heightDst > 0) {
        Self->_in_Handle->setParameter("heightDst", &heightDst);
    }
    if (nthread > 0) {
        Self->_in_Handle->setParameter("nthread", &nthread);
    }
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_setParam(C_MpegEncoder* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPEC_setParam method, the inputs are:
    *   decoder:            [MpegDecoder / MpegClient]: The parameters to be configured.
    *   configDict:         [dict]       A collection of key params.
    *   videoPath:          [str/bytes]  Path of the current video.
    *   codecName:          [str/bytes]  The name of the codec.
    *   nthread:            [int]        The number of encoder threads.
    *   bitRate:            [double]     The target bit rate.
    *   width/height:       [int]        The width / height of the encoded frame.
    *   widthSrc/heightSrc: [int]        The width / height of the input frame.
    *   GOPSize:            [int]        The size of one GOP.
    *   maxBframe:          [int]        The maximal number of continuous B frames.
    *   frameRate:          [tuple]      The target frame rate.
    */
    PyObject* decoder = nullptr;
    PyObject* configDict = nullptr;
    PyObject* videoPath = nullptr;
    PyObject* codecName = nullptr;
    double bitRate = -1;
    int nthread = 0;
    int width = 0;
    int height = 0;
    int widthSrc = 0;
    int heightSrc = 0;
    int GOPSize = 0;
    int MaxBframe = -1;
    PyObject* frameRate = nullptr;
    cmpc::CharList kwlist_str({ "decoder", "configDict", "videoPath", "codecName", "nthread", "bitRate", "width", "height", "widthSrc", "heightSrc", "GOPSize", "maxBframe", "frameRate" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|OOOOidiiiiiiO", kwlist, &decoder, &configDict, &videoPath, &codecName, &nthread, &bitRate, &width, &height, &widthSrc, &heightSrc, &GOPSize, &MaxBframe, &frameRate)) {
        PyErr_SetString(PyExc_TypeError, "Error.setParameter: need 'params'");
        return nullptr;
    }
    string temp_str;
    if (decoder) {
        temp_str.assign(decoder->ob_type->tp_name);
        if (temp_str.compare("mpegCoder.MpegDecoder") == 0) {
            auto decoderPtr = reinterpret_cast<C_MpegDecoder*>(decoder);
            Self->_in_Handle->setParameter("decoder", decoderPtr->_in_Handle);
        }
        else if (temp_str.compare("mpegCoder.MpegClient") == 0) {
            auto decoderPtr = reinterpret_cast<C_MpegClient*>(decoder);
            Self->_in_Handle->setParameter("client", decoderPtr->_in_Handle);
        }
        else {
            cerr << "Warning.setParameter: Not intended decoder type, no valid update in this step." << endl;
        }
    }
    else if (configDict) {
        if (PyDict_Check(configDict)) {
            Self->_in_Handle->setParameter("configDict", configDict);
        }
        else {
            cerr << "Warning.setParameter: Not intended configDict type (require to be a dict), no valid update in this step." << endl;
        }
    }
    if (videoPath) {
        if (PyStr2str(videoPath, temp_str)) {
            Self->_in_Handle->setParameter("videoPath", &temp_str);
        }
        else {
            return nullptr;
        }
    }
    if (codecName) {
        if (PyStr2str(codecName, temp_str)) {
            Self->_in_Handle->setParameter("codecName", &temp_str);
        }
        else {
            return nullptr;
        }
    }
    if (nthread > 0) {
        Self->_in_Handle->setParameter("nthread", &nthread);
    }
    if (bitRate > 0) {
        Self->_in_Handle->setParameter("bitRate", &bitRate);
    }
    if (width > 0) {
        Self->_in_Handle->setParameter("width", &width);
    }
    if (height > 0) {
        Self->_in_Handle->setParameter("height", &height);
    }
    if (widthSrc > 0) {
        Self->_in_Handle->setParameter("widthSrc", &widthSrc);
    }
    if (heightSrc > 0) {
        Self->_in_Handle->setParameter("heightSrc", &heightSrc);
    }
    if (GOPSize > 0) {
        Self->_in_Handle->setParameter("GOPSize", &GOPSize);
    }
    if (MaxBframe >= 0) {
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
    Py_RETURN_NONE;
}

static PyObject* C_MPCT_setParam(C_MpegClient* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (void)C_MPCT_setParam method, the inputs are:
    *   widthDst/heightDst: [int] The width / height of the decoded frames.
    *   cacheSize/readSize: [int] The size of the cache, and the reading size.
    *   dstFrameRate:       [tuple] The target frame rate of the client.
    *   nthread:            [int]   The number of decoder threads.
    */
    int widthDst = 0;
    int heightDst = 0;
    int nthread = 0;
    int64_t cacheSize = 0;
    int64_t readSize = 0;
    PyObject* frameRate = nullptr;
    cmpc::CharList kwlist_str({ "widthDst", "heightDst", "cacheSize", "readSize", "dstFrameRate", "nthread" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|iiLLOi", kwlist, &widthDst, &heightDst, &cacheSize, &readSize, &frameRate, &nthread)) {
        PyErr_SetString(PyExc_TypeError, "Error.FFmpegSetup: need 'params'");
        return nullptr;
    }
    if (widthDst > 0) {
        Self->_in_Handle->setParameter("widthDst", &widthDst);
    }
    if (heightDst > 0) {
        Self->_in_Handle->setParameter("heightDst", &heightDst);
    }
    if (cacheSize > 0) {
        Self->_in_Handle->setParameter("cacheSize", &cacheSize);
    }
    if (readSize > 0) {
        Self->_in_Handle->setParameter("readSize", &readSize);
    }
    if (frameRate) {
        if (PyTuple_Check(frameRate) && PyTuple_Size(frameRate) == 2) {
            Self->_in_Handle->setParameter("dstFrameRate", frameRate);
        }
        else {
            cerr << "Warning.setParameter: {dstFrameRate} must be a 2-dim tuple, so there is no valid update in this step." << endl;
        }
    }
    if (nthread > 0) {
        Self->_in_Handle->setParameter("nthread", &nthread);
    }
    Py_RETURN_NONE;
}

static PyObject* C_MPSV_setParam(C_MpegServer* Self, PyObject* args, PyObject* kwargs) {
    /* Wrapped (bool)C_MPSV_setParam method, the inputs are:
    *   decoder             [MpegDecoder / MpegClient]: The parameters to be configured.
    *   videoAddress:       [str/bytes]  The address of the current video.
    *   codecName:          [str/bytes]  The name of the codec.
    *   nthread:            [int]        The number of encoder threads.
    *   bitRate:            [double]     The target bit rate.
    *   width/height:       [int]        The width / height of the encoded frame.
    *   widthSrc/heightSrc: [int]        The width / height of the input frame.
    *   GOPSize:            [int]        The size of one GOP.
    *   maxBframe:          [int]        The maximal number of continuous B frames.
    *   frameRate:          [tuple]      The target frame rate.
    *   frameAhead          [int]        The number of ahead frames. This value is suggested
    *                                    to be larger than the GOPSize.
    */
    PyObject* decoder = nullptr;
    PyObject* configDict = nullptr;
    PyObject* videoAddress = nullptr;
    PyObject* codecName = nullptr;
    double bitRate = -1;
    int nthread = 0;
    int width = 0;
    int height = 0;
    int widthSrc = 0;
    int heightSrc = 0;
    int GOPSize = 0;
    int MaxBframe = -1;
    int frameAhead = 0;
    PyObject* frameRate = nullptr;
    cmpc::CharList kwlist_str({ "decoder", "configDict", "videoAddress", "codecName", "nthread", "bitRate", "width", "height", "widthSrc", "heightSrc", "GOPSize", "maxBframe", "frameRate", "frameAhead" });
    auto kwlist_ptr = kwlist_str.c_str();
    auto kwlist = (char**)(kwlist_ptr.get());
    if (!PyArg_ParseTupleAndKeywords(args, kwargs, "|OOOOidiiiiiiOi", kwlist, &decoder, &configDict, &videoAddress, &codecName, &nthread, &bitRate, &width, &height, &widthSrc, &heightSrc, &GOPSize, &MaxBframe, &frameRate, &frameAhead)) {
        PyErr_SetString(PyExc_TypeError, "Error.setParameter: need 'params'");
        return nullptr;
    }
    string temp_str;
    if (decoder) {
        temp_str.assign(decoder->ob_type->tp_name);
        if (temp_str.compare("mpegCoder.MpegDecoder") == 0) {
            auto decoderPtr = reinterpret_cast<C_MpegDecoder*>(decoder);
            Self->_in_Handle->setParameter("decoder", decoderPtr->_in_Handle);
        }
        else if (temp_str.compare("mpegCoder.MpegClient") == 0) {
            auto decoderPtr = reinterpret_cast<C_MpegClient*>(decoder);
            Self->_in_Handle->setParameter("client", decoderPtr->_in_Handle);
        }
        else {
            cerr << "Warning.setParameter: Not intended decoder type, no valid update in this step." << endl;
        }
    }
    else if (configDict) {
        if (PyDict_Check(configDict)) {
            Self->_in_Handle->setParameter("configDict", configDict);
        }
        else {
            cerr << "Warning.setParameter: Not intended configDict type (require to be a dict), no valid update in this step." << endl;
        }
    }
    if (videoAddress) {
        if (PyStr2str(videoAddress, temp_str)) {
            Self->_in_Handle->setParameter("videoAddress", &temp_str);
        }
        else {
            return nullptr;
        }
    }
    if (codecName) {
        if (PyStr2str(codecName, temp_str)) {
            Self->_in_Handle->setParameter("codecName", &temp_str);
        }
        else {
            return nullptr;
        }
    }
    if (nthread > 0) {
        Self->_in_Handle->setParameter("nthread", &nthread);
    }
    if (bitRate > 0) {
        Self->_in_Handle->setParameter("bitRate", &bitRate);
    }
    if (width > 0) {
        Self->_in_Handle->setParameter("width", &width);
    }
    if (height > 0) {
        Self->_in_Handle->setParameter("height", &height);
    }
    if (widthSrc > 0) {
        Self->_in_Handle->setParameter("widthSrc", &widthSrc);
    }
    if (heightSrc > 0) {
        Self->_in_Handle->setParameter("heightSrc", &heightSrc);
    }
    if (GOPSize > 0) {
        Self->_in_Handle->setParameter("GOPSize", &GOPSize);
    }
    if (MaxBframe >= 0) {
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
    if (frameAhead > 0) {
        Self->_in_Handle->setParameter("frameAhead", &frameAhead);
    }
    temp_str.clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPDC_DumpFile(C_MpegDecoder* Self) {
    /* Wrapped (void)dumpFormat method, the input is required to be empty. */
    Self->_in_Handle->dumpFormat();
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_DumpFile(C_MpegEncoder* Self) {
    /* Wrapped (void)dumpFormat method, the input is required to be empty. */
    Self->_in_Handle->dumpFormat();
    Py_RETURN_NONE;
}

static PyObject* C_MPCT_DumpFile(C_MpegClient* Self) {
    /* Wrapped (void)dumpFormat method, the input is required to be empty. */
    Self->_in_Handle->dumpFormat();
    Py_RETURN_NONE;
}

static PyObject* C_MPSV_DumpFile(C_MpegServer* Self) {
    /* Wrapped (void)dumpFormat method, the input is required to be empty. */
    Self->_in_Handle->dumpFormat();
    Py_RETURN_NONE;
}

static PyObject* C_MPDC_Clear(C_MpegDecoder* Self) {
    /* Wrapped (void)clear method, the input is required to be empty. */
    Self->_in_Handle->clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_Clear(C_MpegEncoder* Self) {
    /* Wrapped (void)clear method, the input is required to be empty. */
    Self->_in_Handle->clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPCT_Clear(C_MpegClient* Self) {
    /* Wrapped (void)clear method, the input is required to be empty. */
    Self->_in_Handle->clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPSV_Clear(C_MpegServer* Self) {
    /* Wrapped (void)clear method, the input is required to be empty. */
    Self->_in_Handle->clear();
    Py_RETURN_NONE;
}

static PyObject* C_MPEC_Close(C_MpegEncoder* Self) {
    /* Wrapped (void)close method, the input is required to be empty. */
    Self->_in_Handle->FFmpegClose();
    Py_RETURN_NONE;
}

static PyObject* C_MPSV_Close(C_MpegServer* Self) {
    /* Wrapped (void)close method, the input is required to be empty. */
    Self->_in_Handle->FFmpegClose();
    Py_RETURN_NONE;
}

/*****************************************************************************
* Register the methods of each class.
*****************************************************************************/
static PyMethodDef C_MPC_MethodMembers[] =      // Register the global method list.
{
    { "setGlobal",       (PyCFunction)C_MPC_Global,             METH_VARARGS | METH_KEYWORDS, \
    "Set global setting parameters.\n - dumpLevel: [int] the level of dumped log.\n   -|- 0: silent executing.\n   -|- 1: [default] dump basic informations.\n   -|- 2: dump all informations." },
    { "readme",          (PyCFunction)C_MPC_Help,               METH_NOARGS, \
    "Use it to see readme and some useful instructions." },
    { nullptr, nullptr, 0, nullptr }
};

static PyMethodDef C_MPDC_MethodMembers[] =      // Register the member methods of Decoder.
{  // This step add the methods to the C-API of the class.
    { "FFmpegSetup",        (PyCFunction)C_MPDC_Setup,             METH_VARARGS | METH_KEYWORDS, \
    "Reset the decoder and the video format.\n - videoPath: [str/bytes] the path of decoded video file." },
    { "resetPath",          (PyCFunction)C_MPDC_resetPath,         METH_VARARGS | METH_KEYWORDS, \
    "Reset the path of decoded video.\n - videoPath: [str/bytes] the path of decoded video file." },
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
    "Set the optional parameters of 'Setup' & 'Extract' functions via different methods.\n - widthDst: [int] the width of destination (frame), if <=0 (default), it would take no effect.\n - heightDst: [int] the height of destination (frame), if <=0 (default), it would take no effect.\n - nthread: [int] number of decoder threads." },
    { "getParameter",       (PyCFunction)C_MPDC_getParam,          METH_VARARGS | METH_KEYWORDS, \
    "Input a parameter's name to get it.\n - paramName: [str/bytes] the name of needed parameter. If set empty, would return all key params.\n   -|- videoPath: [str] the current path of the read video.\n   -|- width/height: [int] the size of one frame.\n   -|- frameCount: [int] the number of returned frames in the last ExtractFrame().\n   -|- coderName: [str] the name of the decoder.\n   -|- nthread: [int] number of decoder threads.\n   -|- duration: [double] the total seconds of this video.\n   -|- estFrameNum: [int] the estimated total frame number(may be not accurate).\n   -|- avgFrameRate: [double] the average of FPS." },
    { nullptr, nullptr, 0, nullptr }
};

static PyMethodDef C_MPEC_MethodMembers[] =      // Register the member methods of Encoder.
{ // This step add the methods to the C-API of the class.
    { "FFmpegSetup",        (PyCFunction)C_MPEC_Setup,             METH_VARARGS | METH_KEYWORDS, \
    "Open the encoded video and reset the encoder.\n - videoPath: [str/bytes] the path of encoded(written) video file." },
    { "resetPath",          (PyCFunction)C_MPEC_resetPath,         METH_VARARGS | METH_KEYWORDS, \
    "Reset the output path of encoded video.\n - videoPath: [str/bytes] the path of encoded video file." },
    { "EncodeFrame",        (PyCFunction)C_MPEC_EncodeFrame,       METH_VARARGS | METH_KEYWORDS, \
    "Encode one frame.\n - PyArrayFrame: [ndarray] the frame that needs to be encoded." },
    { "setParameter",       (PyCFunction)C_MPEC_setParam,          METH_VARARGS | METH_KEYWORDS, \
    "Set the necessary parameters of 'Setup' & 'Encode' functions via different methods.\n - decoder: [MpegDecoder / MpegClient] copy metadata from a known decoder.\n - configDict: [dict] a config dict returned by getParameter().\n - videoPath: [str/bytes] the current path of the encoded video.\n - codecName: [str/bytes] the name of the encoder.\n - nthread: [int] number of encoder threads.\n - bitRate: [float] the indended bit rate (Kb/s).\n - width/height: [int] the size of one encoded (scaled) frame.\n - widthSrc/heightSrc: [int] the size of one input frame, if set <=0, these parameters would not be enabled.\n - GOPSize: [int] the number of frames in a GOP.\n - maxBframe: [int] the maximal number of B frames in a GOP.\n - frameRate: [tuple] a 2-dim tuple indicating the FPS(num, den) of the stream." },
    { "getParameter",       (PyCFunction)C_MPEC_getParam,          METH_VARARGS | METH_KEYWORDS, \
    "Input a parameter's name to get it.\n - paramName: [str/bytes] the name of needed parameter. If set empty, would return all key params.\n   -|- videoPath: [str] the current path of the encoded video.\n   -|- codecName: [str] the name of the encoder.\n   -|- nthread: [int] number of encoder threads.\n   -|- bitRate: [float] the indended bit rate (Kb/s).\n   -|- width/height: [int] the size of one encoded (scaled) frame.\n   -|- widthSrc/heightSrc: [int] the size of one input frame, if set <=0, these parameters would not be enabled.\n   -|- GOPSize: [int] the number of frames in a GOP.\n   -|- maxBframe: [int] the maximal number of B frames in a GOP.\n   -|- frameRate: [tuple] a 2-dim tuple indicating the FPS(num, den) of the stream." },
    { "clear",              (PyCFunction)C_MPEC_Clear,             METH_NOARGS, \
    "Clear all states." },
    { "dumpFile",           (PyCFunction)C_MPEC_DumpFile,          METH_NOARGS, \
    "Show current state of formatContex." },
    { "FFmpegClose",        (PyCFunction)C_MPEC_Close,             METH_NOARGS, \
    "Close currently encoded video and write the end code of a MPEG file." },
    { nullptr, nullptr, 0, nullptr }
};

static PyMethodDef C_MPCT_MethodMembers[] =      // Register the member methods of Encoder.
{ // This step add the methods to the C-API of the class.
    { "FFmpegSetup",        (PyCFunction)C_MPCT_Setup,             METH_VARARGS | METH_KEYWORDS, \
    "Reset the decoder and the video format.\n - videoAddress: [str/bytes] the path of decoded video file." },
    { "resetPath",          (PyCFunction)C_MPCT_resetPath,         METH_VARARGS | METH_KEYWORDS, \
    "Reset the address of decoded video.\n - videoAddress: [str/bytes] the path of decoded video file." },
    { "start",              (PyCFunction)C_MPCT_Start,             METH_NOARGS, \
    "Start the demuxing thread, must be called after FFmpegSetup()." },
    { "terminate",           (PyCFunction)C_MPCT_Terminate,        METH_NOARGS, \
    "Terminate all current demuxing threads, usually used when there is only one thread." },
    { "ExtractFrame",       (PyCFunction)C_MPCT_ExtractFrame,      METH_VARARGS | METH_KEYWORDS, \
    "Extract frames from the current buffer.\n - readSize: [int] the number of extracted frames, should not be larger than cache number. \nIf not set, will be used as the default value." },
    { "clear",              (PyCFunction)C_MPCT_Clear,             METH_NOARGS, \
    "Clear all states (except the videoAddress)." },
    { "dumpFile",           (PyCFunction)C_MPCT_DumpFile,          METH_NOARGS, \
    "Show current state of formatContex." },
    { "setParameter",       (PyCFunction)C_MPCT_setParam,          METH_VARARGS | METH_KEYWORDS, \
    "Set the optional parameters of 'Setup' & 'Extract' functions and the demuxing thread via different methods.\n - widthDst: [int] the width of destination (frame), if <=0 (default), it would take no effect.\n - heightDst: [int] the height of destination (frame), if <=0 (default), it would take no effect.\n - cacheSize: [int] the number of allocated avaliable frames in the cache.\n - readSize: [int] the default value of ExtractFrame().\n - dstFrameRate: [tuple] a 2-dim tuple indicating the destination FPS(num, den) of the stream.\n - nthread: [int] number of decoder threads." },
    { "getParameter",       (PyCFunction)C_MPCT_getParam,          METH_VARARGS | METH_KEYWORDS, \
    "Input a parameter's name to get it.\n - paramName: [str/bytes] the name of needed parameter. If set empty, would return all key params.\n   -|- videoAddress: [str] the current path of the read video.\n   -|- width/height: [int] the size of one frame.\n   -|- frameCount: [int] the number of returned frames in the last ExtractFrame().\n   -|- coderName: [str] the name of the decoder.\n   -|- nthread: [int] number of decoder threads.\n   -|- duration: [double] the total seconds of this video.\n   -|- estFrameNum: [int] the estimated total frame number(may be not accurate).\n   -|- srcFrameRate: [double] the average of FPS of the source video." },
    { nullptr, nullptr, 0, nullptr }
};

static PyMethodDef C_MPSV_MethodMembers[] =      // Register the member methods of Server.
{ // This step add the methods to the C-API of the class.
    { "FFmpegSetup",        (PyCFunction)C_MPSV_Setup,             METH_VARARGS | METH_KEYWORDS, \
    "Open the encoded video and reset the encoder.\n - videoAddress: [str/bytes] the path of encoded(written) video file." },
    { "resetPath",          (PyCFunction)C_MPSV_resetPath,         METH_VARARGS | METH_KEYWORDS, \
    "Reset the output path of encoded video.\n - videoAddress: [str/bytes] the path of encoded video file." },
    { "ServeFrame",         (PyCFunction)C_MPSV_ServeFrame,        METH_VARARGS | METH_KEYWORDS, \
    "Encode one frame and send the frame non-blockly.\n - PyArrayFrame: [ndarray] the frame that needs to be encoded." },
    { "ServeFrameBlock",    (PyCFunction)C_MPSV_ServeFrameBlock,   METH_VARARGS | METH_KEYWORDS, \
    "Encode one frame and send the frame blockly. This method is suggested to be used in sub-processes.\n - PyArrayFrame: [ndarray] the frame that needs to be encoded." },
    { "setParameter",       (PyCFunction)C_MPSV_setParam,          METH_VARARGS | METH_KEYWORDS, \
    "Set the necessary parameters of 'Setup' & 'Serve' functions via different methods.\n - decoder: [MpegDecoder / MpegClient] copy metadata from a known decoder.\n - configDict: [dict] a config dict returned by getParameter().\n - videoAddress: [str/bytes] the current path of the encoded video.\n - codecName: [str/bytes] the name of the encoder.\n - nthread: [int] number of encoder threads.\n - bitRate: [float] the indended bit rate (Kb/s).\n - width/height: [int] the size of one encoded (scaled) frame.\n - widthSrc/heightSrc: [int] the size of one input frame, if set <=0, these parameters would not be enabled.\n - GOPSize: [int] the number of frames in a GOP.\n - maxBframe: [int] the maximal number of B frames in a GOP.\n - frameRate: [tuple] a 2-dim tuple indicating the FPS(num, den) of the stream.\n - frameAhead: [int] The number of ahead frames. This value is suggested to be larger than the GOPSize.." },
    { "getParameter",       (PyCFunction)C_MPSV_getParam,          METH_VARARGS | METH_KEYWORDS, \
    "Input a parameter's name to get it.\n - paramName: [str/bytes] the name of needed parameter. If set empty, would return all key params.\n   -|- videoAddress: [str] the current path of the encoded video.\n   -|- codecName: [str] the name of the encoder.\n  -|- formatName: [str] the format name of the stream.\n   -|- nthread: [int] number of encoder threads.\n   -|- bitRate: [float] the indended bit rate (Kb/s).\n   -|- width/height: [int] the size of one encoded (scaled) frame.\n   -|- widthSrc/heightSrc: [int] the size of one input frame, if set <=0, these parameters would not be enabled.\n   -|- GOPSize: [int] the number of frames in a GOP.\n   -|- maxBframe: [int] the maximal number of B frames in a GOP.\n   -|- frameRate: [tuple] a 2-dim tuple indicating the FPS(num, den) of the stream.\n   -|- waitRef: [float] The reference used for sync. waiting.\n   -|- ptsAhead: [int] The ahead time duration in the uit of time stamp." },
    { "clear",              (PyCFunction)C_MPSV_Clear,             METH_NOARGS, \
    "Clear all states." },
    { "dumpFile",           (PyCFunction)C_MPSV_DumpFile,          METH_NOARGS, \
    "Show current state of formatContex." },
    { "FFmpegClose",        (PyCFunction)C_MPSV_Close,             METH_NOARGS, \
    "Close currently encoded video and write the end code of a MPEG file." },
    { nullptr, nullptr, 0, nullptr }
};

/*****************************************************************************
* Declaration of the class, including the name, information and the members.
* This is the top-level packing of the class APIs.
*****************************************************************************/
static PyTypeObject C_MPDC_ClassInfo =
{
    PyVarObject_HEAD_INIT(nullptr, 0)"mpegCoder.MpegDecoder",  // The implementation of the __class__.__name__.
    sizeof(C_MpegDecoder),          // The memory length of the class. This value is required for PyObject_New.
    0,
    (destructor)C_MPDC_Destruct,    // Destructor.
    0,
    0,
    0,
    0,
    (reprfunc)C_MPDC_Repr,          // __repr__ method.
    0,
    0,
    0,
    0,
    0,
    (reprfunc)C_MPDC_Str,           // __str__ method.
    0,
    0,
    0,
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE,     // If no methods are provided, this value is Py_TPFLAGS_DEFAULE.
    "This class has wrapped the C-API of FFmpeg decoder so that users could call its methods\n to decode the frame data in python quickly.",   // __doc__, the docstring of the class.
    0,
    0,
    0,
    0,
    0,
    0,
    C_MPDC_MethodMembers,       // The collection of all method members.
    C_MPDC_DataMembers,         // THe collection of all data members.
    0,
    0,
    0,
    0,
    0,
    0,
    (initproc)C_MPDC_init,      // Constructor.
    0,
};

static PyTypeObject C_MPEC_ClassInfo =
{
    PyVarObject_HEAD_INIT(nullptr, 0)"mpegCoder.MpegEncoder",  // The implementation of the __class__.__name__.
    sizeof(C_MpegEncoder),          // The memory length of the class. This value is required for PyObject_New.
    0,
    (destructor)C_MPEC_Destruct,    // Destructor.
    0,
    0,
    0,
    0,
    (reprfunc)C_MPEC_Repr,          // __repr__ method.
    0,
    0,
    0,
    0,
    0,
    (reprfunc)C_MPEC_Str,           // __str__ method.
    0,
    0,
    0,
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE,     // If no methods are provided, this value is Py_TPFLAGS_DEFAULE.
    "This class has wrapped the C-API of FFmpeg encoder so that users could call its methods\n to encode frames by using numpy-data quickly.",   // __doc__, the docstring of the class.
    0,
    0,
    0,
    0,
    0,
    0,
    C_MPEC_MethodMembers,       // The collection of all method members.
    C_MPEC_DataMembers,         // THe collection of all data members.
    0,
    0,
    0,
    0,
    0,
    0,
    (initproc)C_MPEC_init,      // Constructor.
    0,
};

static PyTypeObject C_MPCT_ClassInfo =
{
    PyVarObject_HEAD_INIT(nullptr, 0)"mpegCoder.MpegClient",  // The implementation of the __class__.__name__.
    sizeof(C_MpegClient),           // The memory length of the class. This value is required for PyObject_New.
    0,
    (destructor)C_MPCT_Destruct,    // Destructor.
    0,
    0,
    0,
    0,
    (reprfunc)C_MPCT_Repr,          // __repr__ method.
    0,
    0,
    0,
    0,
    0,
    (reprfunc)C_MPCT_Str,           // __str__ method.
    0,
    0,
    0,
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE,     // If no methods are provided, this value is Py_TPFLAGS_DEFAULE.
    "This class has wrapped the C-API of FFmpeg demuxer so that users could call its methods\n to demux the network stream in python quickly.",   // __doc__, the docstring of the class.
    0,
    0,
    0,
    0,
    0,
    0,
    C_MPCT_MethodMembers,       // The collection of all method members.
    C_MPCT_DataMembers,         // THe collection of all data members.
    0,
    0,
    0,
    0,
    0,
    0,
    (initproc)C_MPCT_init,      // Constructor.
    0,
};

static PyTypeObject C_MPSV_ClassInfo =
{
    PyVarObject_HEAD_INIT(nullptr, 0)"mpegCoder.MpegServer",  // The implementation of the __class__.__name__.
    sizeof(C_MpegServer),          // The memory length of the class. This value is required for PyObject_New.
    0,
    (destructor)C_MPSV_Destruct,    // Destructor.
    0,
    0,
    0,
    0,
    (reprfunc)C_MPSV_Repr,          // __repr__ method.
    0,
    0,
    0,
    0,
    0,
    (reprfunc)C_MPSV_Str,           // __str__ method.
    0,
    0,
    0,
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE,     // If no methods are provided, this value is Py_TPFLAGS_DEFAULE.
    "This class has wrapped the C-API of FFmpeg stream server so that users could call its methods\n to server streamed frames by using numpy-data quickly.",   // __doc__, the docstring of the class.
    0,
    0,
    0,
    0,
    0,
    0,
    C_MPSV_MethodMembers,       // The collection of all method members.
    C_MPSV_DataMembers,         // THe collection of all data members.
    0,
    0,
    0,
    0,
    0,
    0,
    (initproc)C_MPSV_init,      // Constructor.
    0,
};

/*****************************************************************************
* Decleartion of the module.
* This is the top-level packing of the module APIs.
*****************************************************************************/
static PyModuleDef ModuleInfo =
{
    PyModuleDef_HEAD_INIT,
    "mpegCoder",               // The __name__ of the module.
    "A FFmpeg module which could provide a class for encode/decode a video in any format.",  // __doc__; The docstring of the module.
    -1,
    nullptr, nullptr, nullptr, nullptr, nullptr
};

#endif

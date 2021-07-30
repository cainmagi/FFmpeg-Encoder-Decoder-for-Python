# FFmpeg-Encoder-Decoder-for-Python

This is a mpegCoder adapted from FFmpeg & Python-c-api. Using it you could get access to processing video easily. Just use it as a common module in python like this.

```python
import mpegCoder
```

|     Branch      |  Description  |
| :-------------: | :-----------: |
| [`master`][git-master] | The source project of `mpegCoder`, Windows version. |
| [`master-linux`][git-linux] | The source project of `mpegCoder`, Linux version. |
| [`example-client-check`][exp1] | A testing project of the online video stream demuxing. |
| [`example-client-player`][exp2] | A testing project of the simple online video stream player. |

## Documentation

The documentation could be reviewed here:

https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python

## Brief introduction of this project

This project is also named as "*FFmpeg-Encoder-Decoder-for-Python*". It is implemented based on [FFMpeg][link-ffmpeg], [Python-C-API][link-python-c-api] and [C++11][link-cpp11]. It is under [GPL v3 License][git-license], and recommended for researching purposes. The project could be used for **processing** or **streaming** videos.

With this package, users could:

* Make use of **all** FFMpeg video encoders and decoders. When decoding a video (or an online stream), like the original FFMpeg (C version), the provided APIs could detect the video format and codec format automatically. When encoding a video, users could control the codec format, bit rate and some other options by setting parameters.
* Work with FFMpeg directly. This project invokes the FFMpeg C APIs in the bottom level. Unlike [ffmpeg-python][git-ffmpeg-python] and [pyffmpeg][git-pyffmpeg], our project is not driven by the FFMpeg CLI interfaces. The data format used by this package is [`np.ndarray`][link-ndarray]. In other words, our project enables users to combine [numpy][link-numpy] and FFMpeg directly.
* Frame-level APIs. Unlike [pyffmpeg][git-pyffmpeg], this package is not a simple wrapper of FFMpeg. Users could works on the frame-level APIs. For example, when decoding a video, users could get the data frame-by-frame. Each frame is a 3D [`np.ndarray`][link-ndarray].
* Pre-compiled package. This package has been pre-compiled by the author. If users download the dependent dynamic libraries (`.so` or `.dll`), they do not need to compile the package by themself.

However, users could not work with this project in such cases:

* Platform limited. Currently, we only support Linux and Windows. The Linux release is pre-compiled on Debian. It has been only tested in Ubuntu, Debian and Windows. In other cases, the pre-compiled library may not work. Users may need to compile the package by themselves.
* Version limited. Currently, our project only works with FFMpeg `4.4`. Users need to download the dependent dynamic libraries to make the package work. The legacy versions of this project supports FFMpeg `3.3`, `3.4.2` and `4.0`. However, the legacy built packages are not technically supported now.
* Audio not supported. Although the original FFMpeg supports both video and audio streams, our project only works on video streams. For example, if a video contains audio streams, our package would omit all audio frames in the bottom level. In other words, you **could not** perform audio analysis now. In the future (`v4`), we may support the audio frame analysis.
* Filters not supported. Although the original FFMpeg supports some video processing tools ([`avfilter`][link-avfilter] and [`postproc`][link-postproc]), our implementation drops these modules. Instead, we suggest that users should process the frames with [pillow][pip-pillow] or [openCV][pip-opencv]. On the other hand, our implementation still supports frame scaling and re-sampling (supported by [`swscale`][link-swscale] and [`swresample`][link-swresample]).

## An example of the usage

Here we show an example of transcoding a video with our decoder and encoder. To learn more details, please review the [documentation](https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python).

```python
import mpegCoder

d = mpegCoder.MpegDecoder()
d.setParameter(nthread=4)
opened = d.FFmpegSetup('test-video.mp4')  # Setup the decoder
e = mpegCoder.MpegEncoder()
e.setParameter(decoder=d, codecName='libx265', videoPath='test-video-x265.mp4', nthread=8)  # inherit most of parameters from the decoder.
opened = opened and e.FFmpegSetup()  # Setup the encoder.
if opened:  # If either the decoder or the encoder is not loaded successfully, do not continue.
    p = True
    while p is not None:
        p = d.ExtractGOP()  # Extract current GOP.
        if p is not None:
            for i in p:  # Iterate every frame.
                e.EncodeFrame(i)  # Encode current frame.
    e.FFmpegClose() # End encoding, and flush all frames in cache.
e.clear()  # Clean configs of the encoder.
d.clear()  # Close configs of the decoder.
```

[git-master]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python "master (Windows)"
[git-linux]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/master-linux "master (Linux)"
[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"
[docs]:https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python "Documentation of mpegCoder"

[git-ffmpeg-python]:https://github.com/kkroening/ffmpeg-python "ffmpeg-python"
[git-pyffmpeg]:https://github.com/deuteronomy-works/pyffmpeg "pyffmpeg"
[git-license]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/master/LICENSE
[pip-pillow]:https://pypi.org/project/Pillow "Pillow"
[pip-opencv]:https://pypi.org/project/opencv-python "OpenCV Python"
[link-cpp11]:https://en.cppreference.com/w/ "C++ 11"
[link-python-c-api]:https://docs.python.org/3/c-api/index.html "Python-C-API"
[link-numpy]:https://numpy.org "numpy"
[link-ndarray]:https://numpy.org/doc/stable/reference/generated/numpy.ndarray.html "np.ndarray"
[link-ffmpeg]:https://ffmpeg.org "FFMpeg"
[link-avfilter]:http://ffmpeg.org/doxygen/trunk/group__lavfi.html "libavfilter"
[link-postproc]:http://ffmpeg.org/doxygen/trunk/group__lpp.html "libpostproc"
[link-swscale]:http://ffmpeg.org/doxygen/trunk/group__libsws.html "libswscale"
[link-swresample]:http://ffmpeg.org/doxygen/trunk/group__lswr.html "libswresample"

# FFmpeg-Encoder-Decoder-for-Python

## Update Report

### V3.2.0 update report:

1. Upgrade to `FFMpeg 5.0` Version.

2. Fix the const assignment bug caused by the codec configuration method.

### V3.1.0 update report:

1. Support `str()` type for all string arguments.

2. Support `http`, `ftp`, `sftp` streams for `MpegServer`.

3. Support `nthread` option for `MpegDecoder`, `MpegEncoder`, `MpegClient` and `MpegServer`.

4. Fix a bug caused by the constructor `MpegServer()`.

5. Clean up all `gcc` warnings of the source codes.

6. Fix typos in docstrings.

### V3.0.0 update report:

1. Fix a severe memory leaking bugs when using `AVPacket`.

2. Fix a bug caused by using `MpegClient.terminate()` when a video is closed by the server.

3. Support the `MpegServer`. This class is used for serving the online video streams.

4. Refactor the implementation of the loggings.

5. Add `getParameter()` and `setParameter(configDict)` APIs to `MpegEncoder` and `MpegServer`.

6. Move `FFMpeg` depedencies and the `OutputStream` class to the `cmpc` space.

7. Fix dependency issues and cpp standard issues.

8. Upgrade to `FFMpeg 4.4` Version.

9. Add a quick script for fetching the `FFMpeg` dependencies.

### V2.05 update report:

1. Fix a severe bug that causes the memory leak when using `MpegClient`.This bug also exists in `MpegDecoder`, but it seems that the bug would not cause memory leak in that case. (Although we have also fixed it now.)

2. Upgrade to `FFMpeg 4.0` Version.

### V2.01 update report:

1. Fix a bug that occurs when the first received frame may has a PTS larger than zero.

2. Enable the project produce the newest `FFMpeg 3.4.2` version and use `Python 3.6.4`, `numpy 1.14`. 

### V2.0 update report:

1. Revise the bug of the encoder which may cause the stream duration is shorter than the real duration of the video in some not advanced media players.

2. Improve the structure of the code and remove some unnecessary codes.

3. Provide a complete version of client, which could demux the video stream from a server in any network protocol.

### V1.8 update report:

1. Provide options `(widthDst, heightDst)` to let `MpegDecoder` could control the output size manually. To ensure the option is valid, we must use the method `setParameter` before `FFmpegSetup`. Now you could use this options to get a rescaled output directly:

    ```python
      d = mpegCoder.MpegDecoder() # initialize
      d.setParameter(widthDst=400, heightDst=300) # noted that these options must be set before 'FFmpegSetup'! 
      d.FFmpegSetup(b'i.avi') # the original video size would not influence the output
      print(d) # examine the parameters. You could also get the original video size by 'getParameter'
      d.ExtractFrame(0, 100) # get 100 frames with 400x300
    ```

    In another example, the set optional parameters could be inherited by encoder, too:

    ```python
      d.setParameter(widthDst=400, heightDst=300) # set optional parameters
      ...
      e.setParameter(decoder=d) # the width/height would inherit from widthDst/heightDst rather than original width/height of the decoder.
    ```

    Noted that we do not provide `widthDst`/`heightDst` in `getParameter`, because these 2 options are all set by users. There is no need to get them from the video metadata. 

2. Optimize some realization of Decoder so that its efficiency could be improved.

### V1.7-linux update report:

Thanks to God, we succeed in this work!

A new version is avaliable for Linux. To implement this tool, you need to install some libraries firstly:

* python3.5

* numpy 1.13

If you want, you could install `ffmpeg` on Linux: Here are some instructions

1. Check every pack which ffmpeg needs here: [Dependency of FFmpeg](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu "Dependency of FFmpeg")

2. Use these steps to install ffmpeg instead of provided commands on the above site.

```Bash
 $ git clone https://git.ffmpeg.org/ffmpeg.git
 $ cd ffmpeg
 $ ./configure --prefix=host --enable-gpl --enable-libx264 --enable-libx265 --enable-shared --disable-static --disable-doc
 $ make
 $ make install
```

### V1.7 update report:

1. Realize the encoder totally.

2. Provide a global option `dumpLevel` to control the log shown in the screen.

3. Fix bugs in initialize functions.

### V1.5 update report:

1. Provide an incomplete version of encoder, which could encode frames as a video stream that could not be played by player.
 
### V1.4 update report:

1. Fix a severe bug of the decoder, which causes the memory collapsed if decoding a lot of frames.
 
### V1.2 update report:

1. Use numpy array to replace the native pyList, which improves the speed  significantly.
 
### V1.0 update report:

1. Provide the decoder which could decode videos in arbitrary formats and arbitrary coding.

# FFmpeg-Encoder-Decoder-for-Python

*****
```
      __   _                         _ _ _                ,___            
     ( /  /        /        o       ( / ) )              /   /     /      
      (__/ , , _, /_  _  _ _'  (     / / /  ,_   _  _,  /    __ __/ _  _  
       _/_(_/_(__/ /_(/_/ / /_/_)_  / / (__/|_)_(/_(_)_(___/(_)(_/_(/_/ (_
      //                                   /|       /|                    
     (/                                   (/       (/                     
```
*****

## Yuchen's Mpeg Coder - Readme

This is a mpegcoder adapted from FFmpeg & Python-c-api. Using it you could get access to processing video easily. 

## Download

Getting your versions here! You could also visit the [release page](https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases "Release Page") for current mpegCoder.

| Version  | Platform | Python Ver. | Numpy Ver. | FFmpeg Ver. |
| ---------- | ----------- | ----------- | ----------- | ----------- |
| [2.01][down201w] | Windows   | 3.6   | 1.14   | 3.4.2  |
| [2.0][down20l]   | Linux   | 3.5   | 1.13   | 3.3   |
| [2.0][down20w]   | Windows   | 3.5   | 1.13   | 3.3   |
| [1.8][down18l]   | Linux   | 3.5   | 1.13   | 3.3   |
| [1.8][down18w]   | Windows   | 3.5   | 1.13   | 3.3   |
| [1.7][down17l]   | Linux   | 3.5   | 1.13   | 3.3   |
| [1.7][down17w]   | Windows   | 3.5   | 1.13   | 3.3   |

## Usage 

Just use it as a common module in python like this.

```python
    import mpegCoder
```

Noted that this API need you to install numpy. 

An example of decoding a video in an arbitrary format:

```python
    d = mpegCoder.MpegDecoder()
    d.FFmpegSetup(b'inputVideo.mp4')
    p = d.ExtractGOP(10) # Get a gop of current video by setting the start position of 10th frame.
    p = d.ExtractGOP() # Get a gop of current video, using the current position after the last ExtractGOP.
    d.ExtractFrame(100, 100) # Extract 100 frames from the begining of 100th frame.
```

An example of transfer the coding of a video with an assigned codec:

```python
    d = mpegCoder.MpegDecoder()
    d.FFmpegSetup(b'i.avi')
    e = mpegCoder.MpegEncoder()
    e.setParameter(decoder=d, codecName=b'libx264', videoPath=b'o.mp4') # inherit most of parameters from the decoder.
    opened = e.FFmpegSetup() # Load the encoder.
    if opened: # If encoder is not loaded successfully, do not continue.
        p = True
        while p is not None:
            p = d.ExtractGOP() # Extract current GOP.
            for i in p: # Select every frame.
                e.EncodeFrame(i) # Encode current frame.
        e.FFmpegClose() # End encoding, and flush all frames in cache.
    d.clear() # Close the input video.
```

An example of demuxing the video stream from a server:

```python
    d = mpegCoder.MpegClient() # create the handle
    d.setParameter(dstFrameRate=(5,1), readSize=5, cacheSize=12) # normalize the frame rate to 5 FPS, and use a cache which size is 12 frames. Read 5 frames each time.
    success = d.FFmpegSetup(b'rtsp://localhost:8554/video')
    if not success: # exit if fail to connect with the server
        exit()
    d.start() # start the sub-thread for demuxing the stream.
    for i in range(10): # processing loop
        time.sleep(5)
        p = d.ExtractFrame() # every 5 seconds, read 5 frames (1 sec.)
        # do some processing
    d.terminate() # shut down the current thread. You could call start() and let it restart.
    d.clear() # Disconnect with the stream.
```

You could also find some more explanations in two examples about `MpegClient` in [here][exp1] and [here][exp2].

For more instructions, you could tap `help(mpegCoder)`. 

## Update Report

### V2.01 update report:

1. Fix a bug that occurs when the first received frame may has a PTS larger than zero.

2. Enable the project produce the newest ffmpeg 3.4.2 version and use Python 3.6.4, numpy 1.14. 

### V2.0 update report:

1. Revise the bug of the encoder which may cause the stream duration is shorter than the real duration of the video in some not advanced media players.

2. Improve the structure of the code and remove some unnecessary codes.

3. Provide a complete version of client, which could demux the video stream from a server in any network protocol.

### V1.8 update report:

1. Provide options (widthDst, heightDst) to let MpegDecoder could control the output size manually. To ensure the option is valid, we must use the method `setParameter` before `FFmpegSetup`. Now you could use this options to get a rescaled output directly:

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
 
## Version of currently used FFmpeg library
* libavcodec.so.58.6.103
* libavformat.so.58.3.100
* libavutil.so.56.5.100
* libswresample.so.3.0.101
* libswscale.so.5.0.101

[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"

[down201w]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.01/mpegCoder_2_0_1_Win.7z "Windows 2.01"
[down20l]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.0/mpegCoder_2_0_Linux.7z "Linux, 2.0"
[down20w]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.0/mpegCoder_2_0_Win.7z "Windows, 2.0"
[down18l]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.8/mpegCoder_1_8_Linux.7z "Linux, 1.8"
[down18w]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.8/mpegCoder_1_8_Win.7z "Windows, 1.8"
[down17l]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.7/mpegCoder_1_7_Linux.7z "Linux, 1.7"
[down17w]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.7/mpegCoder_1_7_Win.7z "Windows, 1.7"

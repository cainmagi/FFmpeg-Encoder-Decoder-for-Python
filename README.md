# FFmpeg-Encoder-Decoder-for-Python

This is a mpegCoder adapted from FFmpeg & Python-c-api. Using it you could get access to processing video easily. Just use it as a common module in python like this.

```python
import mpegCoder
```

|     Branch      |  Description  |
| :-------------: | :-----------: |
| [`master` :link:][git-master] | The source project of `mpegCoder`, Windows version. |
| [`master-linux` :link:][git-linux] | The source project of `mpegCoder`, Linux version. |
| `example-client-check` :link: | A testing project of the online video stream demuxing. |
| [`example-client-player` :link:][exp2] | A testing project of the simple online video stream player. |

## Video Stream Demuxing Checking Program - Readme

*****
```
       __    __       __        ___  __               __      __   __   __   __   __             
\  /  /__`  |  \     /  ` |__| |__  /  ` |__/ | |\ | / _`    |__) |__) /  \ / _` |__)  /\   |\/| 
 \/  ..__/ .|__/ .   \__, |  | |___ \__, |  \ | | \| \__>    |    |  \ \__/ \__> |  \ /~~\  |  | 
                                                                                                 
```
*****

This is an example of showing the effectiveness of the MpegClient. It would extract the video stream and show you every step where the client write the received data into buffer.

Noted that you need to download the py-library to this project if you want to test it. You could download the compiled libraries in [here][main] or [here][release].

### Theory

As is shown in the figure below, we use a sub-thread to grant that we could demux the source stream continuously.

| The theoretical structure of the client |
| ------ |
|![][theory-show]|

Since the server is pushing stream continuously, we have to decode the stream continuously, too. Otherwise, we may lose some frames when we do not decode frames, which makes we could not recover our decoding process once we want more frames, because in any time a frame needs its prior frames to help itself get decoded. Thus, we have to use 2 threads to solve this problem.

The first thread, `writer`, is decoding the stream without any interruption. No matter whether we need these frames, it would write newly decoded frames in a circular buffer, as is shown in the above graph. Because we usually need to get a series of continuous frames, we have to allocate a larger cache/buffer so that when we need to get frames from the buffer, the writer could keep decoding and writing frames to where we would not read. In this example, we need No.3-No.7 frames, currently the pointer of the writer is at the No.8 frame. The reader would begin to read at No.3 frame until it get the No.7 frame. While during this time the writer would still write No.8, No.9 ... until it get to the No.2 frame. Therefore, we know that if the buffer is large enough (especially relative to the number of frames we read), the writing process would not be blocked because of reading.

### Usage

In short, to extract the stream, you need to follow these steps:

1. **Create the client**: use `d = mpegCoder.MpegClient()` to complete this work.

2. **Set parameters**: Here is an example which shows what we could do with the source stream:
    
    ```python
    d.setParameter(widthDst=480, heightDst=360, dstFrameRate=(5,1), readSize=5, cacheSize=12)
    ```
    
    In this example, we let the `width` and the `height` of the source resized to `(480, 360)`. Then we normalize the FPS of the source to 5 FPS. 
    
    Noted that we have to give two critical parameters: `readSize` and `cacheSize` to the client. Because we need to allocate the buffer and specify the default number of the frames we extract for once.
    
3. **Connect to the server**: Use such code to make the connection:
    
    ```python
    success = d.FFmpegSetup(b'rtsp://localhost:8554/video')
    ```
    
    We could use the returned flag to check whether the connection is successful. Noted that if the connection is failed, we should not do the following steps.
    
4. **Control the decoding thread**: We use a sub-thread to demux the source stream continuously. Call `start()` to start the stream and use `terminate()` to stop it. Noted that these two methods should be called after the success of `FFmpegSetup()`

5. **Extract frames**: Use the code like this to extract frames:
    
    ```python
    p = d.ExtractFrame()
    ```
    
    It would return a numpy-array with a shape of `(num, height, width, channels)` in which `num` indicates the number of extracted frames of this time. If the `p` gets `None`, we know that we lose the connection or the stream is stopped.
    
6. **Clear**: After the program, use `clear()` to clear all parameters including the connection to server. If we have not use it at all, it may be called implicitly before the exit of program.

## Update Report
 
### V1.0 update report @ 2018/3/1:
1. Create the test program for demuxing an real-time stream. This example would show how the API is  running normally.
 
## Version of currently used FFmpeg library
Refer to the master branch.

[main]:https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python/ "main page"
[release]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases "release page"
[theory-show]:display/client_show.png
[git-master]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python "master (Windows)"
[git-linux]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/master-linux "master (Linux)"
[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"

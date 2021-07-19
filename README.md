# FFmpeg-Encoder-Decoder-for-Python

This is a mpegCoder adapted from FFmpeg & Python-c-api. Using it you could get access to processing video easily. Just use it as a common module in python like this.

```python
import mpegCoder
```

|     Branch      |  Description  |
| :-------------: | :-----------: |
| [`master` :link:][git-master] | The source project of `mpegCoder`, Windows version. |
| [`master-linux` :link:][git-linux] | The source project of `mpegCoder`, Linux version. |
| [`example-client-check` :link:][exp1] | A testing project of the online video stream demuxing. |
| `example-client-player` :link: | A testing project of the simple online video stream player. |


## Video Stream Player based on real-time demuxer - Readme

This is an example of a real-time video player for demuxing the video stream from the server.

By learning this example, you could learn how to implement this `MpegClient` to your python GUI. This program has been internationalized by supports from Chinese (Simplified) and Chinese (Traditional).

Noted that you need to download the py-library to this project if you want to test it. You could download the compiled libraries in [here][main] or [here][release].

*****
```
        __   ___  __      __  ___  __   ___                __                 ___  __  
\  / | |  \ |__  /  \    /__`  |  |__) |__   /\   |\/|    |__) |     /\  \ / |__  |__) 
 \/  | |__/ |___ \__/    .__/  |  |  \ |___ /~~\  |  |    |    |___ /~~\  |  |___ |  \ 
                                                                                       
```
*****

### Display

As is shown in the figure below, we could see the performance of this simple player:

| The display of the player |
| ------ |
|![][gui-show]|

We receive the video from a server and normalize it to 5 FPS. The default setting would be effective enough for us to see the demuxed stream.

### Usage

In short, to see the performance, you need to follow these steps:

1. **Set configurations**: edit the configurations of each editable box as you like, so that you could choose your parameters. Noted that for `widthDst` and `heightDst`, if they are set as `0`, the client would use the source's `width`/`height`.

2. **Click `Connect`**: Click the connect button. Because of the shortcoming of the GUI core, the program may lose the response for a while, please wait until it returns a result. If it tells you that the connection is successful, you could do following steps.
    
3. **Click `Start`**: Once you do that, you would see the timer is increasing from 00:00:00 and the video frames would be displayed on the screen.
    
4. **Click `Terminate`**: You could interrupt the video decoding by clicking the `Terminate`. After that, you still could use `Start` to recover the demuxing process.

5. **Click `Clear`**: After you have explored the program, you could use clear to disconnect with the server and remove all settings in the core. If you want to recover the demuxing process again, you need to begin from step 2.

* Noted that we have known that we may have bugs if the server changes its playing position of the source video. However, if the server is shut down or the video has been played totally, the playing process would stop automatically. You could see that the timer would not increase once the sub-thread has been complete.

* We must connect with the server when it is playing the source video. Otherwise, i.e. it is stopped or paused, we could not connect with the server successfully.

## Update Report

### V1.1 update report @ 2021/7/19:

Fix bugs caused by out-of-dated APIs.
 
### V1.0 update report @ 2018/3/1:

This is a tiny example of playing the real-time stream based on a dual-thread scheme. You would learn how to implement some other processing APIs in the demuxing process by learning the structure of this example. 
 
## Version of currently used FFmpeg library
Refer to the master branch.

[main]:https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python/ "main page"
[release]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases "release page"
[gui-show]:display/dispGUI.PNG
[git-master]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python "master (Windows)"
[git-linux]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/master-linux "master (Linux)"
[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"

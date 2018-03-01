# FFmpeg-Encoder-Decoder-for-Python

```
*****
\  /o _| _ _   (~_|_._ _ _ ._ _   |~\ _._ _      o._ (~|  |~|_  _ _| o._ (~|  |~)._ _ (~|._ _ ._ _   
 \/ |(_|}_(_)  _) | | }_(_|| | |  |_/}_| | ||_|><|| | _|  |_| |}_(_|<|| | _|  |~ | (_) _|| (_|| | |  
*****
```

## Video Stream Player based on real-time demuxer - Readme

This is an example of a real-time video player for demuxing the video stream from the server.

By learning this example, you could learn how to implement this `MpegClient` to your python GUI. This program has been internationalized by supports from Chinese (Simplified) and Chinese (Traditional).

Noted that you need to download the py-library to this project if you want to test it. You could download the compiled libraries in [here][main] or [here][release].

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
 
### V1.0 update report @ 2018/3/1:

This is a tiny example of playing the real-time stream based on a dual-thread scheme. You would learn how to implement some other processing APIs in the demuxing process by learning the structure of this example. 
 
## Version of currently used FFmpeg library
* libavcodec.so.58.6.103
* libavformat.so.58.3.100
* libavutil.so.56.5.100
* libswresample.so.3.0.101
* libswscale.so.5.0.101

[main]:https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python/ "main page"
[release]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases "release page"
[gui-show]:display/dispGUI.PNG
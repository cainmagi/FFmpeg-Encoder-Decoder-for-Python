
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
| [1.8]([down1_8_l] "Linux, 1.7")   | Linux   | 3.5   | 1.13   | 3.3   |
| [1.8]([down1_8_w] "Windows, 1.7")   | Windows   | 3.5   | 1.13   | 3.3   |
| [1.7]([down1_7_l] "Linux, 1.7")   | Linux   | 3.5   | 1.13   | 3.3   |
| [1.7]([down1_7_w] "Windows, 1.7")   | Windows   | 3.5   | 1.13   | 3.3   |

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

For more instructions, you could tap `help(mpegCoder)`. 

## Update Report

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
 $ ./configure --prefix=host --enable-gpl --enable-shared --disable-static --disable-doc
 $ make
 $ make install
```

### V1.7 update report:

1. Realize the encoder totally.

2. Provide a global option `dumpLevel` to control the log shown in the screen.

3. Fix bugs in initalize functions.

### V1.5 update report:

1. Provide an incomplete version of encoder, which could encode frames as a 
 video stream that could not be played by player.
 
### V1.4 update report:

1. Fix a severe bug of the decoder, which causes the memory collapsed if 
 decoding a lot of frames.
 
### V1.2 update report:

1. Use numpy array to replace the native pyList, which improves the speed 
 significantlly.
 
### V1.0 update report:
1. Provide the decoder which could decode videos in arbitrary formats and 
 arbitrary coding.
 
## Version of currently used FFmpeg library
* libavcodec.so.58.6.103
* libavformat.so.58.3.100
* libavutil.so.56.5.100
* libswresample.so.3.0.101
* libswscale.so.5.0.101

[down1_8_l]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.8/mpegCoder_1_8_Linux.7z
[down1_8_w]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.8/mpegCoder_1_8_Win.7z
[down1_7_l]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.7/mpegCoder_1_7_Linux.7z
[down1_7_w]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.7/mpegCoder_1_7_Win.7z

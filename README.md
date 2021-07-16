# FFmpeg-Encoder-Decoder-for-Python

This is a mpegcoder adapted from FFmpeg & Python-c-api. Using it you could get access to processing video easily. Just use it as a common module in python like this.

```python
import mpegCoder
```

|     Branch      |  Description  |
| :-------------: | :-----------: |
| [`master` :link:][master] | The source project of `mpegCoder`, Windows version. |
| `master-linux` :link: | The source project of `mpegCoder`, Linux version. |
| [`example-client-check` :link:][exp1] | A testing project of the online video stream demuxing. |
| [`example-client-player` :link:][exp2] | A testing project of the simple online video stream player. |

## Dependencies

This branch is used for archiving the dependencies used for building the project on different platforms. The installation scripts for ffmpeg would be stored here, while the Windows dependencies would be stored in the [release][this-rel].

|     Branch      |  Description  |
| :-------------: | :-----------: |
| `install-ffmpeg-4_0_6.sh` | Scripts for installing `ffmpeg 4.0.6` on Ubuntu. |
| `install-ffmpeg-4_4.sh` | Scripts for installing `ffmpeg 4.4` on Ubuntu. |

[this-rel]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/tag/deps-3.0.0 "Release of dependencies"
[master]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python "Windows source files"
[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"

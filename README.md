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
| [`example-client-player` :link:][exp2] | A testing project of the simple online video stream player. |

## Scripts for building the PyPI package

The scripts in this branch are used for building the PyPI package, which will be uploaded to:

[`mpegCoder` on PyPI](https://pypi.org/project/mpegCoder)

The script will keep updated with the newest releases of the pre-compiled modules. The following table show releases that have been uploaded:

|  `mpegCoder`  |  Uploaded  |
| :-----------: | :--------: |
| `3.2.2` | :heavy_check_mark: |
| `3.2.1` | :heavy_check_mark: |
| `3.2.0` | :heavy_check_mark: |
| `3.1.0` | :heavy_check_mark: |

To learn more about `mpegCoder`, please review the [documentation][docs].

[git-master]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python "master (Windows)"
[git-linux]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/master-linux "master (Linux)"
[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"
[docs]:https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python "Documentation of mpegCoder"

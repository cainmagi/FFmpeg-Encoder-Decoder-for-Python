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

## Dependencies

This branch is used for archiving the dependencies used for building the project on different platforms. The installation scripts for ffmpeg would be stored here, while the Windows dependencies would be stored in the release page liste in the following table:

|     Branch      |  Description  |  Release page  |
| :-------------: | :-----------: | :------------: |
| `install-ffmpeg-4_0_6.sh` | Scripts for installing `ffmpeg 4.0.6` on Ubuntu. | [2.0.5 :link:][rel-2-0-5] |
| `install-ffmpeg-4_4.sh` | Scripts for installing `ffmpeg 4.4` on Ubuntu.     | [3.0.0 :link:][rel-3-0-0] |
| `install-ffmpeg-5_0.sh` | Scripts for installing `ffmpeg 5.0` on Ubuntu.     | [3.2.0 :link:][rel-3-2-0] |

## Usage

### `install-ffmpeg-5_0.sh`

Save the script in `~/`, then run the docker:

```bash
docker run --gpus all --rm -it --shm-size=1g ubuntu:jammy
```

After that, run the following commands inside the container (root mode):

```bash
cd ~ && apt update && apt install wget
wget https://raw.githubusercontent.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/deps/install-ffmpeg-5_0.sh
chmod +rwx install-ffmpeg-5_0.sh
./install-ffmpeg-5_0.sh --all --nvcuda --sudofix
```

We recommend to use `ubuntu:jammy` (the devel version), because its apt repository provides most of the dependencies claimed in the issue [#4 :exclamation:](https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues/4).

[rel-2-0-5]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/tag/2.05 "Release of dependencies (2.0.5)"
[rel-3-0-0]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/tag/deps-3.0.0 "Release of dependencies (3.0.0)"
[rel-3-2-0]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/tag/deps-3.2.0 "Release of dependencies (3.0.0)"

[git-master]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python "master (Windows)"
[git-linux]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/master-linux "master (Linux)"
[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"

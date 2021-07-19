# FFmpeg-Encoder-Decoder-for-Python

This is a mpegCoder adapted from FFmpeg & Python-c-api. Using it you could get access to processing video easily. Just use it as a common module in python like this.

```python
import mpegCoder
```

|     Branch      |  Description  |
| :-------------: | :-----------: |
| [`master` :link:][git-master] | The source project of `mpegCoder`, Windows version. |
| `master-linux` :link: | The source project of `mpegCoder`, Linux version. |
| [`example-client-check` :link:][exp1] | A testing project of the online video stream demuxing. |
| [`example-client-player` :link:][exp2] | A testing project of the simple online video stream player. |

## Source project of `mpegCoder` (Linux)

The following instructions are used for building the project on Windows with Visual Studio 2019.

1. Clone the `master` branch which only contains the codes of `mpegCoder`:

    ```bash
    git clone --single-branch -b master-linux https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python.git
    ```

2. Get the shared version of the Linux FFMpeg. We support three different approaches for this step:
    * Build the shared libs of FFMpeg from the source codes by yourself. We provide [a compiling script :page_with_curl:](https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/deps/install-ffmpeg-4_4.sh) in the deps branch. You could download and build it by the following commands:

        ```shell
        mkdir -p /apps
        chmod +rwx /apps
        curl -O https://raw.githubusercontent.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/deps/install-ffmpeg-4_4.sh
        chmod +rwx install-ffmpeg-4_4.sh
        ./install-ffmpeg-4_4.sh
        ```

        After running this script, the FFMpeg with most of the dependencies would be complied along with the shared libraries. Then you could replace the FFMpeg path in the `setup.py` by

        ```python
        FFMPEG_DIR = '/apps/build/ffmpeg-4.4'
        ```

    * Download the pre-built dependencies. These dependencies are built by myself. You could download the archive [here :package:](https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/dep-linux-ffmpeg_4_4.tar.xz). The files need to be extracted to `./dependencies`:

        ```shell
        cd FFmpeg-Encoder-Decoder-for-Python
        mkdir -p dependencies
        wget -O- https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/dep-linux-ffmpeg_4_4.tar.xz | tar xJ -C "./dependencies"
        ```

    * The dependencies could be also downloaded by the automatic script, you just need to run

        ```shell
        python -m pip install -r requirements.txt
        python webtools.py
        ```

        This script requires users to install `urllib3`. The `tqdm` is also recommended to be installed.

3. Building `mpegCoder` requires `GLIBC>=2.29`. This requirement is not satisfied in some cases. However, if you have built FFMpeg by our script, the requirement would be fulfilled (i.e. you could skip this step). If users are using our pre-built dependencies, users may need to solve this problem by

    ```shell
    cd FFmpeg-Encoder-Decoder-for-Python
    ln -sf ./dependencies/lib-fix/libm-2.31.so /lib/x86_64-linux-gnu/libm.so.6
    ```

4. Build `mpegCoder` by running the following script. The built file would be stored in `./build`. If you has not fetched the dependencies in the step 2, running the `setup.py` may trigger an event for fetching the online dependencies.

    ```shell
    python setup.py build
    ```

5. Rename the built module as `mpegCoder.so`, then you could import it in the same directory. If you have built FFMpeg by our script, you do not need any other dependencies when importing the libs. However, if not, you may need to download [the lib dependencies :package:](https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/so-linux-ffmpeg_4_4.tar.xz) and add the `lib` folder to your `LD_LIBRARY_PATH`:

    ```shell
    mkdir -p /apps/ffmpeg-4.4
    cd /apps/ffmpeg-4.4
    wget -O- https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/so-linux-ffmpeg_4_4.tar.xz | tar xJ -C "."
    echo "export LD_LIBRARY_PATH=/apps/ffmpeg-4.4/lib:\$LD_LIBRARY_PATH" >> ~/.bashrc
    export LD_LIBRARY_PATH=/apps/ffmpeg-4.4/lib:$LD_LIBRARY_PATH
    ```

    If you want to run the `mpegCoder` with a different environment (which means you have compiled `mpegCoder` in another environment), you still need to setup the dependencies by this step. Running FFMpeg still requries `GLIBC>=2.29`, so you may need to add the dependency by

    ```shell
    ln -sf /apps/ffmpeg-4.4/lib-fix/libm-2.31.so /lib/x86_64-linux-gnu/libm.so.6
    ```

## Update reports

Has been moved to [:bookmark_tabs: CHANGELOG.md](./CHANGELOG.md)

## Version of currently used FFmpeg library

Current FFMpeg version is `4.4`.

|   Dependency    |    Version     |
| :-------------: | :------------: |
| `libavcodec`    | `58.134.100.0` |
| `libavformat`   | `58.76.100.0`  |
| `libavutil`     | `56.70.100.0`  |
| `libswresample` | `3.9.100.0`    |
| `libswscale`    | `5.9.100.0`    |

[git-master]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python "master (windows)"
[exp1]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-check "check the client"
[exp2]:https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/tree/example-client-player "client with player"

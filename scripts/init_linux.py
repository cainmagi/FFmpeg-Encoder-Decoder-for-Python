'''
mpegCoder
---------
* FFmpeg-Encoder-Decoder-for-Python
* This is a mpegCoder adapted from FFmpeg & Python-c-api. Using it you could get
  access to processing video easily. Just use it as a common module in python like
  this.
* Author: cainmagi@gmail.com
* website: https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python/
* OS: Linux
'''

import os
import ctypes


class DynamicLibLoader:
    '''A loader used for loading the dependencies automatically.'''
    def __init__(self, base_dir):
        '''Initialization.
        Arguments:
            base_dir: the directory storing all lib files.
        '''
        self.base_dir = base_dir
        self.dependencies = dict()

    def add_dependency(self, name):
        '''Add one dependency lib.
        Arguments:
            name: the file name of the added dynamic lib.
        '''
        self.dependencies[name] = ctypes.CDLL(os.path.join(
            self.base_dir, name
        ))

    def add_dependencies(self, *names):
        '''Add multiple dependencies.
        Load a series of dependencies (dynamic libs). The loading order is the
        reversed list of the argument `names`.
        Arguments:
            names: A sequence of loaded dependencies. Each value is a str.
        '''
        names = list(names)
        for name in reversed(names):
            self.add_dependency(name)


basedir = os.path.abspath(os.path.dirname(__file__))
__dependencies = DynamicLibLoader(os.path.join(basedir, 'lib'))
__dependencies.add_dependencies(
    'libva-drm.so.2', 'libva.so.2', 'libdrm.so.2'
)
__dependencies.add_dependencies(
    'libva-x11.so.2', 'libvdpau.so.1',
    'libXext.so.6', 'libXfixes.so.3', 'libX11.so.6', 'libxcb.so.1',
    'libXau.so.6', 'libXdmcp.so.6', 'libbsd.so.0'
)
__dependencies.add_dependencies(
    'libgssapi_krb5.so.2', 'libkrb5.so.3', 'libk5crypto.so.3',
    'libkrb5support.so.0', 'libkeyutils.so.1'
)
__dependencies.add_dependencies(
    'libsrt.so.1.4', 'libssh.so.4'
)
__dependencies.add_dependencies(
    'libtheoraenc.so.1', 'libtheoradec.so.1', 'libtheora.so.0',
    'libopenmpt.so.0', 'libmpg123.so.0',
    'libvorbisenc.so.2', 'libvorbisfile.so.3', 'libvorbis.so.0',
    'libogg.so.0', 'libnuma.so.1',
    'libopencore-amrwb.so.0', 'libfdk-aac.so.2', 'libmp3lame.so.0',
    'libopus.so.0',
    'libva-x11.so.2', 'libvdpau.so.1',
)
__dependencies.add_dependencies(
    'libopenjp2.so.7',
)
__dependencies.add_dependencies(
    'libvpx.so.6', 'librav1e.so.0', 'libSvtAv1Enc.so.0',
    'libx264.so.164', 'libx265.so.199', 'libxvidcore.so.4'
)
__dependencies.add_dependencies(
    'libavformat.so.58', 'libavcodec.so.58', 'libswresample.so.3',
    'libswscale.so.5', 'libavutil.so.56',
)

from . import mpegCoder as mpegCoder_  # noqa: E402


__all__ = (
    'setGlobal', 'readme',
    'MpegDecoder', 'MpegEncoder',
    'MpegClient', 'MpegServer'
)

setGlobal = mpegCoder_.setGlobal
readme = mpegCoder_.readme
MpegDecoder = mpegCoder_.MpegDecoder
MpegEncoder = mpegCoder_.MpegEncoder
MpegClient = mpegCoder_.MpegClient
MpegServer = mpegCoder_.MpegServer

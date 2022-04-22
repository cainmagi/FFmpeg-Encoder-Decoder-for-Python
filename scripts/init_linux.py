#!/usr/python
# -*- coding: UTF8-*- #
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
import sysconfig
import ctypes
from . import webtools

__version__ = '3.2.3'
__inner_version__ = '3.2.0'
PY_VERSION = sysconfig.get_python_version()


def get_release_name(mpegcoder_ver='3.x', python_ver='3.6'):
    '''Get the name of the mpegCoder released module.'''
    python_ver = python_ver.replace('.', '')
    mpegcoder_ver = mpegcoder_ver.replace('.', '_')
    return 'mpegCoder_{mp_ver}_{platform}_py{py_ver}.tar.xz'.format(
        mp_ver=mpegcoder_ver,
        py_ver=python_ver,
        platform='Linux'
    )


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


# Check existence of the dependency
basedir = os.path.abspath(os.path.dirname(__file__))
if not os.path.isfile(os.path.join(basedir, 'mpegCoder.so')):
    webtools.download_tarball(
        'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
        '{0}-linux'.format(__inner_version__),
        get_release_name(__inner_version__, PY_VERSION),
        path=basedir, mode='auto', verbose=True, token=''
    )
if (
    (not os.path.isdir(os.path.join(basedir, 'lib'))) or  # noqa: W504
    (not os.path.isfile(os.path.join(basedir, 'lib', 'libcrypto.so.1.1')))
):  # Fix a missing dependency problem caused by libssh.
    webtools.download_tarball(
        'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
        'deps-3.2.0', 'so-linux-ffmpeg_5_0.tar.xz',
        path=basedir, mode='auto', verbose=True, token=''
    )


__dependencies = DynamicLibLoader(os.path.join(basedir, 'lib'))
__dependencies.add_dependencies(
    'libva-drm.so.2', 'libva.so.2', 'libdrm.so.2'
)
__dependencies.add_dependencies(
    'libva-x11.so.2', 'libvdpau.so.1', 'libXfixes.so.3',
    'libXext.so.6', 'libX11.so.6', 'libxcb.so.1', 'libXau.so.6',
    'libXdmcp.so.6', 'libbsd.so.0', 'libmd.so.0',
)
__dependencies.add_dependencies(
    'libsrt.so.1.4', 'libssh.so.4', 'libcrypto.so.1.1',
)
__dependencies.add_dependencies(
    'libopencore-amrwb.so.0', 'libogg.so.0', 'libmpg123.so.0',
    'libnuma.so.1',
)
__dependencies.add_dependencies(
    'libopenjp2.so.7',
)
__dependencies.add_dependencies(
    'libfdk-aac.so.2', 'libmp3lame.so.0', 'libopus.so.0',
    'libtheoraenc.so.1', 'libtheoradec.so.1', 'libopenmpt.so.0',
    'libvorbisenc.so.2', 'libvorbisfile.so.3', 'libvorbis.so.0',
)
__dependencies.add_dependencies(
    'libvpx.so.7', 'libdav1d.so.6', 'librav1e.so.0',
    'libSvtAv1Enc.so.1', 'libx264.so.164', 'libx265.so.199',
    'libxvidcore.so.4',
)
__dependencies.add_dependencies(
    'libavformat.so.59', 'libavcodec.so.59', 'libswresample.so.4',
    'libswscale.so.6', 'libavutil.so.57',
)

from . import mpegCoder as mpegCoder_  # noqa: E402


__all__ = (
    'webtools', '__version__',
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

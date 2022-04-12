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
* OS: Windows version
'''

import os
import sysconfig
import webtools

__verion__ = '3.2.0'
PY_VERSION = sysconfig.get_python_version()


def get_release_name(mpegcoder_ver='3.x', python_ver='3.6'):
    '''Get the name of the mpegCoder released module.'''
    python_ver = python_ver.replace('.', '')
    mpegcoder_ver = mpegcoder_ver.replace('.', '_')
    return 'mpegCoder_{mp_ver}_{platform}_py{py_ver}.tar.xz'.format(
        mp_ver=mpegcoder_ver,
        py_ver=python_ver,
        platform='Win'
    )


# Check existence of the dependency
basedir = os.path.abspath(os.path.dirname(__file__))
# Check existence of the dependency
if not os.path.isfile(os.path.join(basedir, 'mpegCoder.pyd')):
    webtools.download_tarball(
        'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
        __verion__, get_release_name(__verion__, PY_VERSION),
        path=basedir, mode='auto', verbose=True, token=''
    )
if not os.path.isfile(os.path.join(basedir, 'avcodec-59.dll')):
    webtools.download_tarball(
        'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
        'deps-3.2.0', 'dll-win-ffmpeg_5_0.tar.xz',
        path=basedir, mode='auto', verbose=True, token=''
    )


__all__ = (
    'setGlobal', 'readme',
    'MpegDecoder', 'MpegEncoder',
    'MpegClient', 'MpegServer'
)

from . import mpegCoder as mpegCoder_  # noqa: E402

setGlobal = mpegCoder_.setGlobal
readme = mpegCoder_.readme
MpegDecoder = mpegCoder_.MpegDecoder
MpegEncoder = mpegCoder_.MpegEncoder
MpegClient = mpegCoder_.MpegClient
MpegServer = mpegCoder_.MpegServer

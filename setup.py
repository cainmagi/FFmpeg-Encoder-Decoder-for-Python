#!python
# -*- coding: UTF-8 -*-
'''
################################################################
# Compiliation file for mpegCoder
# @ FFMpeg encoder and decoder.
# Yuchen Jin @ cainmagi@gmail.com
# Requirements: (Pay attention to version)
#   python 3.3+
#   urllib3 1.26.2+
# This script is used for compiling the core module of the
# mpegCoder.
################################################################
'''

import os
import re
import sysconfig
try:
    from setuptools import setup, Extension
except ImportError:
    from distutils.core import setup, Extension

import find_libpython
import numpy as np

try:
    import webtools
    HAS_WEBTOOLS=True
except ImportError:
    HAS_WEBTOOLS=False

BASE_SRC_DIR = 'MpegCoder'
FFMPEG_DIR = './dependencies'
PYTHON_INC_DIR = sysconfig.get_path('include')  # /usr/include/python3.x
NUMPY_DIR = os.path.join(os.path.dirname(np.__file__), 'core')  # '/usr/local/lib/python3.x/dist-packages/numpy/core'

PYTHON_LIB_PATH = find_libpython.find_libpython()
PYTHON_LIB_DIR = os.path.dirname(PYTHON_LIB_PATH)  # '/usr/lib/python3.x/config-3.xm-x86_64-linux-gnu'
PYTHON_LIB_NAME = re.search(R'(?:lib|)(python3\.(?:.+?))\..*?', os.path.basename(PYTHON_LIB_PATH)).groups(1)[0]
TARGET='mpegCoder'

with open('README.md', 'r') as fh:
    LONG_DESCRIPTION = fh.read()

if (not os.path.isdir(os.path.join(FFMPEG_DIR, 'include'))) or (not os.path.isdir(os.path.join(FFMPEG_DIR, 'lib'))):
    if HAS_WEBTOOLS:
        print('The FFMpeg dependencies are not found. Fetch the files online...')
        webtools.download_tarball('cainmagi', 'FFmpeg-Encoder-Decoder-for-Python', 'deps-3.0.0', 'dep-linux-ffmpeg_4_4.tar.xz', path=os.path.join('.', 'dependencies'), mode='auto', verbose=True, token='')
    else:
        raise FileNotFoundError('The required dependencies ("include" and "lib" directories) are not found in FFMPEG_DIR path ({0})'.format(FFMPEG_DIR))

module_mpegCoder = Extension(
    name = TARGET,
    language = 'c++',
    define_macros = [('MAJOR_VERSION', '3'),
                     ('MINOR_VERSION', '1'),
                     ('BUILD_VERSION', '0')],
    extra_compile_args = ['-std=c++11','-pthread'],
    include_dirs = [PYTHON_INC_DIR, np.get_include(), '{0}/include'.format(FFMPEG_DIR), BASE_SRC_DIR],
    #libraries = [PYTHON_LIB_NAME, 'avcodec', 'avdevice', 'avfilter', 'avformat', 'avutil', 'postproc', 'swresample', 'swscale', 'npymath'],
    libraries = [PYTHON_LIB_NAME, 'avcodec', 'avformat', 'avutil', 'swresample', 'swscale', 'npymath'],
    library_dirs = [PYTHON_LIB_DIR, '{0}/lib'.format(NUMPY_DIR), '{0}/lib'.format(FFMPEG_DIR)],
    sources = [
        '{0}/MpegBase.cpp'.format(BASE_SRC_DIR),
        '{0}/MpegCoder.cpp'.format(BASE_SRC_DIR),
        '{0}/MpegStreamer.cpp'.format(BASE_SRC_DIR),
        '{0}/dllmain.cpp'.format(BASE_SRC_DIR)
    ]
)

setup(
    name = 'mpegCoder',
    version = '3.1.0',
    description = 'A FFmpeg module which could provide a class for encoding, decoding, or streaming a video in any format.',
    author = 'Yuchen Jin',
    author_email = 'cainmagi@gmail.com',
    url = 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python',
    project_urls={
        'Tracker': 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues',
    },
    long_description=LONG_DESCRIPTION,
    long_description_content_type='text/markdown',
    classifiers=[
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
        'Operating System :: POSIX :: Linux',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
    keywords=[
        'python', 'h264', 'video', 'rtsp', 'ffmpeg', 'rtmp', 'encoder', 'numpy', 'python3', 'python3-library', 'ffmpeg-wrapper', 'video-stream', 'python-c-api', 'rtsp-push', 'rtmp-push', 'rtsp-player', 'rtmp-player', 'ffmpeg-encoder'
    ],
    python_requires='>=3.5',
    license='GPLv3',
    ext_modules = [module_mpegCoder]
)


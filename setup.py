#!python
# -*- coding: UTF-8 -*-
'''
################################################################
# Package setup file for mpegCoder
# @ FFMpeg encoder and decoder.
# Yuchen Jin @ cainmagi@gmail.com
# Requirements: (Pay attention to version)
#   python 3.3+
#   urllib3 1.26.2+
# This script is used for building the pre-compiled package
# of mpegCoder.
################################################################
'''

import os
import sysconfig
import shutil
import webtools

try:
    from setuptools import setup, find_packages
    from setuptools.dist import Distribution
except ImportError:
    from distutils.core import setup, Distribution
    from pkgutil import walk_packages

    def find_packages(path=('.', ), prefix=''):
        '''Alternative for setuptools.find_packages
        '''
        for _, name, ispkg in walk_packages(path, prefix):
            if ispkg:
                yield name

VERSION = '3.1.0'

INSTALL_REQUIRES_FILE = [
    'numpy>=1.16.0',
]


def get_release_name(mpegcoder_ver='3.x', python_ver='3.5', is_linux=False):
    '''Get the name of the mpegCoder released module.'''
    python_ver = python_ver.replace('.', '')
    mpegcoder_ver = mpegcoder_ver.replace('.', '_')
    return 'mpegCoder_{mp_ver}_{platform}_py{py_ver}.tar.xz'.format(
        mp_ver=mpegcoder_ver,
        py_ver=python_ver,
        platform='Linux' if is_linux else 'Win'
    )


def fetch_dependencies(python_ver='3.5', is_linux=False):
    '''Fetch dependencies, will return a list of the dependency file names.'''
    package_path = os.path.join('.', 'mpegCoder')
    init_file_name = os.path.join(package_path, '__init__.py')
    os.makedirs(package_path, exist_ok=True)
    if is_linux:
        if not os.path.isfile(init_file_name):
            shutil.copyfile(
                os.path.join('.', 'scripts', 'init_linux.py'),
                os.path.join('.', 'mpegCoder', '__init__.py'),
                follow_symlinks=True
            )
        if not os.path.isfile(os.path.join(package_path, 'mpegCoder.pyd')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                '{0}-linux'.format(VERSION),
                get_release_name(VERSION, python_ver, is_linux),
                path=package_path, mode='auto', verbose=True, token=''
            )
        if not os.path.isdir(os.path.join(package_path, 'lib')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                'deps-3.0.0', 'so-linux-ffmpeg_4_4.tar.xz',
                path=package_path, mode='auto', verbose=True, token=''
            )
        return ('mpegCoder.pyd', 'lib/*', 'lib-fix/*')
    else:
        if not os.path.isfile(init_file_name):
            shutil.copyfile(
                os.path.join('.', 'scripts', 'init_win.py'),
                os.path.join('.', 'mpegCoder', '__init__.py'),
                follow_symlinks=True
            )
        if not os.path.isfile(os.path.join(package_path, 'mpegCoder.pyd')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                VERSION, get_release_name(VERSION, python_ver, is_linux),
                path=package_path, mode='auto', verbose=True, token=''
            )
        if not os.path.isfile(os.path.join(package_path, 'avcodec-58.dll')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                'deps-3.0.0', 'dll-win-ffmpeg_4_4.tar.xz',
                path=package_path, mode='auto', verbose=True, token=''
            )
        return (
            'mpegCoder.pyd', 'avcodec-58.dll', 'avformat-58.dll',
            'avutil-56.dll', 'swresample-3.dll', 'swscale-5.dll'
        )


class BinaryDistribution(Distribution):
    '''Distribution which always forces a binary package with platform name.
    This class is used for forcing the binary to be platform specific.
    '''
    def is_pure(self):
        return False

    def has_ext_modules(foo):
        return True


# Get into the current dir
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Fetch the platform information and dependencies
PLATFORM_NAME = sysconfig.get_platform()
PY_VERSION = sysconfig.get_python_version()
if 'linux' in PLATFORM_NAME:
    PACKAGE_DATA = fetch_dependencies(PY_VERSION, True)
elif 'win' in PLATFORM_NAME:
    PACKAGE_DATA = fetch_dependencies(PY_VERSION, False)
else:
    raise OSError('The platform {0} should not be used for '
                  'building the package.'.format(PLATFORM_NAME))


# Fetch the long description.
with open('README_PYPI.md', 'r') as fh:
    LONG_DESCRIPTION = fh.read()


setup(
    name='mpegCoder',
    version=VERSION,
    description='A FFmpeg module which could provide a class for encoding, '
                'decoding, or streaming a video in any format.',
    author='Yuchen Jin',
    author_email='cainmagi@gmail.com',
    url='https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python',
    project_urls={
        'Tracker': 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues',
    },
    long_description=LONG_DESCRIPTION,
    long_description_content_type='text/markdown',
    classifiers=[
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.5',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
        'Operating System :: POSIX :: Linux',
        'Operating System :: Microsoft :: Windows',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Multimedia :: Video',
        'Topic :: Multimedia :: Video :: Conversion',
        'Topic :: Multimedia :: Video :: Display',
        'Topic :: Scientific/Engineering'
    ],
    keywords=[
        'python', 'h264', 'video', 'rtsp', 'ffmpeg', 'rtmp', 'encoder',
        'numpy', 'python3', 'python3-library', 'ffmpeg-wrapper',
        'video-stream', 'python-c-api', 'rtsp-push', 'rtmp-push',
        'rtsp-player', 'rtmp-player', 'ffmpeg-encoder'
    ],
    python_requires='=={0}'.format(PY_VERSION),
    license='GPLv3',
    install_requires=INSTALL_REQUIRES_FILE,
    distclass=BinaryDistribution,
    platforms=[sysconfig.get_platform()],
    packages=list(find_packages()),
    include_package_data=True,
    package_data={'mpegCoder': PACKAGE_DATA},
)

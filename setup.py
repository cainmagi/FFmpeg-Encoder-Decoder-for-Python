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
import sys
import site
import pip
import sysconfig
import shutil
import atexit

# Add a small trick for fixing the requirement issue.
pip.main(['install', 'urllib3', 'setuptools'])

import webtools  # noqa: E402

try:
    from setuptools import setup, find_packages
    from setuptools.dist import Distribution
    from setuptools.command.install import install
except ImportError:
    from distutils.core import setup, Distribution
    from distutils.command.install import install
    from pkgutil import walk_packages

    def find_packages(path=('.', ), prefix=''):
        '''Alternative for setuptools.find_packages
        '''
        for _, name, ispkg in walk_packages(path, prefix):
            if ispkg:
                yield name


VERSION = '3.2.0'
PUBLISH_VERSION = ''
# PUBLISH_VERSION Should begin from '', each failed attmpt, it need to be
# changed as '-b', '-c', ...

INSTALL_REQUIRES_FILE = [
    'numpy >= 1.16.0; python_version < "3.7.0"',
    'numpy >= 1.20.0; python_version >= "3.7.0" and python_version < "3.8.0"',
    'numpy >= 1.22.0; python_version >= "3.8.0"',
    'urllib3>=1.26.0'
]

# Fetch the platform information and dependencies
PLATFORM_NAME = sysconfig.get_platform()
PY_VERSION = sysconfig.get_python_version()
if 'linux' in PLATFORM_NAME:
    IS_LINUX = True
elif 'win' in PLATFORM_NAME:
    IS_LINUX = False
else:
    raise OSError('The platform {0} should not be used for '
                  'building the package.'.format(PLATFORM_NAME))


def get_release_name(mpegcoder_ver='3.x', python_ver='3.6', is_linux=False):
    '''Get the name of the mpegCoder released module.'''
    python_ver = python_ver.replace('.', '')
    mpegcoder_ver = mpegcoder_ver.replace('.', '_')
    return 'mpegCoder_{mp_ver}_{platform}_py{py_ver}.tar.xz'.format(
        mp_ver=mpegcoder_ver,
        py_ver=python_ver,
        platform='Linux' if is_linux else 'Win'
    )


def fetch_scripts(is_linux=False, source_path='.'):
    '''Fetch dependencies, will return a list of the dependency file names.'''
    package_path = os.path.join(source_path, 'mpegCoder')
    init_file_name = os.path.join(package_path, '__init__.py')
    os.makedirs(package_path, exist_ok=True)
    if is_linux:
        if not os.path.isfile(init_file_name):
            shutil.copyfile(
                os.path.join('.', 'scripts', 'init_linux.py'),
                os.path.join('.', 'mpegCoder', '__init__.py'),
                follow_symlinks=True
            )
    else:
        if not os.path.isfile(init_file_name):
            shutil.copyfile(
                os.path.join('.', 'scripts', 'init_win.py'),
                os.path.join('.', 'mpegCoder', '__init__.py'),
                follow_symlinks=True
            )
    if not os.path.isfile(os.path.join(package_path, 'webtools.py')):
        shutil.copyfile(
            os.path.join('.', 'webtools.py'),
            os.path.join('.', 'mpegCoder', 'webtools.py'),
            follow_symlinks=True
        )


def fetch_dependencies(python_ver='3.6', is_linux=False, target_path='.'):
    '''Fetch dependencies, will return a list of the dependency file names.'''
    os.makedirs(target_path, exist_ok=True)
    if is_linux:
        if not os.path.isfile(os.path.join(target_path, 'mpegCoder.so')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                '{0}-linux'.format(VERSION),
                get_release_name(VERSION, python_ver, is_linux),
                path=target_path, mode='auto', verbose=True, token=''
            )
        if not os.path.isdir(os.path.join(target_path, 'lib')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                'deps-3.2.0', 'so-linux-ffmpeg_5_0.tar.xz',
                path=target_path, mode='auto', verbose=True, token=''
            )
    else:
        if not os.path.isfile(os.path.join(target_path, 'mpegCoder.pyd')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                VERSION, get_release_name(VERSION, python_ver, is_linux),
                path=target_path, mode='auto', verbose=True, token=''
            )
        if not os.path.isfile(os.path.join(target_path, 'avcodec-59.dll')):
            webtools.download_tarball(
                'cainmagi', 'FFmpeg-Encoder-Decoder-for-Python',
                'deps-3.2.0', 'dll-win-ffmpeg_5_0.tar.xz',
                path=target_path, mode='auto', verbose=True, token=''
            )


class BinaryDistribution(Distribution):
    '''Distribution which always forces a binary package with platform name.
    This class is used for forcing the binary to be platform specific.
    '''
    def is_pure(self):
        return False

    def has_ext_modules(foo):
        return True


class PostInstallCommand(install):
    '''Post-installation for installation mode.
    This technique is learned from
    https://stackoverflow.com/questions/20288711/post-install-script-with-python-setuptools
    The following script will be run after the installation.
    '''
    def run(self):
        def _post_install():
            def find_module_path(module_name):
                if '--user' in sys.argv:
                    paths = (site.getusersitepackages(), )
                else:
                    paths = (
                        sysconfig.get_paths()["purelib"],
                        *site.getsitepackages()
                    )
                for path in paths:
                    package_path = os.path.join(path, module_name)
                    if os.path.exists(package_path):
                        return package_path
                print('No installation path found, mpegCoder may not get fully installed.', file=sys.stderr)
                return None

            install_path = find_module_path('mpegCoder')
            fetch_dependencies(python_ver=PY_VERSION, is_linux=IS_LINUX, target_path=install_path)

        atexit.register(_post_install)
        install.run(self)


# Get into the current dir
os.chdir(os.path.dirname(os.path.abspath(__file__)))

if IS_LINUX:
    fetch_scripts(True)
else:
    fetch_scripts(False)


# Fetch the long description.
with open('README_PYPI.md', 'r') as fh:
    LONG_DESCRIPTION = fh.read()


s_obj = setup(
    name='mpegCoder',
    version=VERSION + PUBLISH_VERSION,
    description='A FFmpeg module which could provide a class for encoding, '
                'decoding, or streaming a video in any format.',
    author='Yuchen Jin',
    author_email='cainmagi@gmail.com',
    url='https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python',
    project_urls={
        'Tracker': 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues',
        'Documentation': 'https://cainmagi.github.io/FFmpeg-Encoder-Decoder-for-Python/',
    },
    long_description=LONG_DESCRIPTION,
    long_description_content_type='text/markdown',
    classifiers=[
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3 :: Only',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.6',
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
    cmdclass={
        'install': PostInstallCommand,
    },
    python_requires='>=3.6,<3.11',
    license='GPLv3',
    install_requires=INSTALL_REQUIRES_FILE,
    distclass=BinaryDistribution,
    platforms=[sysconfig.get_platform()],
    packages=list(find_packages()),
    include_package_data=False,
    # package_data={'mpegCoder': PACKAGE_DATA},
)

from distutils.core import setup, Extension
import numpy as np

BASE_SRC_DIR = 'MpegCoder'
PYTHON_INC_DIR = '/usr/include/python3.5'
NUMPY_DIR = '/usr/local/lib/python3.5/dist-packages/numpy/core'
FFMPEG_DIR = '/home/yjin4/ffmpeg_sources/ffmpeg/host'
PYTHON_LIB_DIR='/usr/lib/python3.5/config-3.5m-x86_64-linux-gnu'
TARGET='mpegCoder'

module1 = Extension(name = TARGET,
                    language = 'c++',
                    define_macros = [('MAJOR_VERSION', '1'),
                                     ('MINOR_VERSION', '0')],
                    extra_compile_args = ['-std=c++11','-pthread'],
                    include_dirs = [PYTHON_INC_DIR, np.get_include(), '{0}/include'.format(FFMPEG_DIR), BASE_SRC_DIR],
                    #libraries = ['python3.5', 'avcodec', 'avdevice', 'avfilter', 'avformat', 'avutil', 'postproc', 'swresample', 'swscale', 'npymath'],
                    libraries = ['python3.5', 'avcodec', 'avformat', 'avutil', 'swscale', 'npymath'],
                    library_dirs = [PYTHON_LIB_DIR, '{0}/lib'.format(NUMPY_DIR), '{0}/lib'.format(FFMPEG_DIR)],
                    sources = ['{0}/MpegCoder.cpp'.format(BASE_SRC_DIR), '{0}/dllmain.cpp'.format(BASE_SRC_DIR)])

setup (name = 'mpegCoder',
       version = '2.0',
       description = 'encoder, decoder & client.',
       author = 'Yuchen Jin',
       author_email = 'cainmagi@gmail.com',
       url = 'mailto:cainmagi@gmail.com',
       long_description = '''
A FFmpeg module which could provide a class for encode/decode a video in any format.
''',
       ext_modules = [module1])

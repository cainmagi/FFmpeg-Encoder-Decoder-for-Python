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

from . import mpegCoder as mpegCoder_

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

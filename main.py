#!/usr/python
# -*- coding: UTF8-*- #
'''
####################################################
# Video Stream Demuxing Checking Program 
# Author: Yuchen Jin
# Version: 1.0 @ 2018/2/28
# Comments:
#   Create the test program for demuxing an real-time
#   stream. This example would show how the API is 
#   running normally.
####################################################
'''
import os, sys
import time
import mpegCoder
os.chdir(sys.path[0])
mpegCoder.setGlobal(dumpLevel=2) # show full log

if __name__ == '__main__':
    d = mpegCoder.MpegClient() # create the handle
    d.setParameter(widthDst=480, heightDst=360, dstFrameRate=(5,1), readSize=5, cacheSize=12) # do basic settings
    success = d.FFmpegSetup(b'rtsp://localhost:8554/video') # connect with the server
    print(d)

    if not success: # exit the program if the server is not available. You could delete this checking and see what will happen.
        exit()

    d.start() # start the sub-thread for demuxing the stream.

    time.sleep(5) # wait for getting some frames
    print('Get slept')
    p = d.ExtractFrame() # extract some frames from current cache.
    print(p.shape) # show information of extracted frames

    for i in range(10): # wait for 50 seconds
        time.sleep(5)
        
    d.terminate() # shut down the current thread. You could call start() and let it restart.
    d.clear() # but here we would like to clear the handle and exit
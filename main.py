#!/usr/python
# -*- coding: UTF8-*- #
'''
####################################################
# Video Stream Player based on real-time demuxer
# Author: Yuchen Jin
# Requirements: (Pay attention to version)
#   python 3.5
#   numpy 1.3
#   PyQt 5
#   mpegCoder 2.0
# Version: 1.0 @ 2018/2/28
# Comments:
#   This is a tiny example of playing the real-time
#   stream based on a dual-thread scheme. You would
#   learn how to implement some other processing 
#   APIs in the demuxing process by learning the 
#   structure of this example. 
####################################################
'''

import os, sys
import time
import mpegCoder
from PyQt5.QtCore import Qt, QPoint, pyqtSignal, pyqtSlot, QThread, QTimer
from PyQt5.QtWidgets import QApplication, QWidget, QHBoxLayout, QVBoxLayout, QLabel, QMessageBox, QPushButton, QLineEdit, QSizePolicy, QLCDNumber
from PyQt5.Qt import Qt, QColor, QPen, QFont, QPolygon
from PyQt5.QtGui import QPixmap, QImage, QPainter, QIntValidator
os.chdir(sys.path[0])
mpegCoder.setGlobal(dumpLevel=0) # disable all logs of ffmpeg lib.

__version__ = '1.1'

IMG_SIZE = (720,486)

class Setup_Thread(QThread):
    
    sig_complete = pyqtSignal(bool)
    
    def __init__(self, parent=None):
        super(Setup_Thread, self).__init__(parent)
        self.clear()
    
    def clear(self):
        self.func = None
        self.param = None
        
    def setFunc(self, func = None, param = None):
        '''
        Register the function
            func: [function] the process.
            param: [Object] the single param of the func
        '''
        self.func = func
        self.param = param
        
    def __del__(self):
        self.clear()
        
    def run(self):
        res = self.func(self.param)
        self.sig_complete.emit(res)

class VSPlayer_Palette(QWidget):
    def __init__(self):
        super(VSPlayer_Palette, self).__init__()
        self.__image = None
    
    def setImage(self, QImg):
        self.__image = QImg
        self.update()
        
    def paintEvent(self, event):
        if self.__image is not None:
            painter = QPainter()
            painter.begin(self)
            painter.setRenderHint(QPainter.Antialiasing)
            painter.setPen(Qt.NoPen)
            painter.drawImage(QPoint(0,0), self.__image)
            painter.end()

class VSPlayer_GUI(QWidget):
    def __init__(self):
        super(VSPlayer_GUI, self).__init__()
        self.__h = mpegCoder.MpegClient()
        self.initSuccess = self.initUI()
        
    def initUI(self):
        self.countTime = 0
        self.timer = QTimer()
        self.timer.setInterval(200)
        self.timer.timeout.connect(self.onTimerOut)
        
        self.val_widthDst = 0
        self.val_heightDst = 0
        self.val_cacheSize = 0
            
        hbox = QVBoxLayout()
        vbox_1 = QHBoxLayout()
        vbox_2 = QHBoxLayout()
        vbox_1p2_v = QVBoxLayout()
        vbox_1p2_h = QHBoxLayout()
        vbox_3 = QHBoxLayout()
        
        self.Pic_H = VSPlayer_Palette()
        self.Pic_H.setFixedWidth(IMG_SIZE[0])
        self.Pic_H.setFixedHeight(IMG_SIZE[1])
        
        self.address = QLineEdit(self)
        self.address.setText('rtsp://localhost:8554/video')
        self.address_t = QLabel(self.tr('Server &Address:'))
        self.address_t.setBuddy(self.address)
        self.address_t.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)
        
        vbox_1.addWidget(self.address_t)
        vbox_1.addWidget(self.address)
        
        self.widthDst = QLineEdit(self)
        self.widthDst.setText('0')
        self.widthDst.setValidator(QIntValidator(0,1080,self))
        self.widthDst_t = QLabel(self.tr('&Width (Dst):'))
        self.widthDst_t.setBuddy(self.widthDst)
        self.widthDst_t.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)
        
        self.heightDst = QLineEdit(self)
        self.heightDst.setText('0')
        self.heightDst.setValidator(QIntValidator(0,720,self))
        self.heightDst_t = QLabel(self.tr('&Height (Dst):'))
        self.heightDst_t.setBuddy(self.heightDst)
        self.heightDst_t.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)
        
        self.cacheSize = QLineEdit(self)
        self.cacheSize.setText('12')
        self.cacheSize.setValidator(QIntValidator(2,50,self))
        self.cacheSize_t = QLabel(self.tr('B&uffer Size:'))
        self.cacheSize_t.setBuddy(self.cacheSize)
        self.cacheSize_t.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)
        
        vbox_2.addWidget(self.widthDst_t)
        vbox_2.addWidget(self.widthDst)
        vbox_2.addWidget(self.heightDst_t)
        vbox_2.addWidget(self.heightDst)
        vbox_2.addWidget(self.cacheSize_t)
        vbox_2.addWidget(self.cacheSize)
        
        self.lcd = QLCDNumber()
        self.lcd.setDigitCount(8)
        self.lcd.setMode(QLCDNumber.Dec)
        self.lcd.setSegmentStyle(QLCDNumber.Flat)
        self.lcd.display(time.strftime("%H:%M:%S",time.gmtime(0)))
        self.lcd.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)
        
        vbox_1p2_v.addLayout(vbox_1)
        vbox_1p2_v.addLayout(vbox_2)
        vbox_1p2_h.addLayout(vbox_1p2_v)
        vbox_1p2_h.addWidget(self.lcd)
        
        self.button_connect_td = Setup_Thread(self)
        self.button_connect_td.sig_complete.connect(self.ffmpeg_connect_rec)
        self.button_connect = QPushButton(self.tr('Co&nnect'))
        self.button_start = QPushButton(self.tr('&Start'))
        self.button_terminate = QPushButton(self.tr('&Terminate'))
        self.button_clear = QPushButton(self.tr('&Clear'))
        self.button_exit = QPushButton(self.tr('&Exit'))
        
        vbox_3.addWidget(self.button_connect)
        vbox_3.addWidget(self.button_start)
        vbox_3.addWidget(self.button_terminate)
        vbox_3.addWidget(self.button_clear)
        vbox_3.addWidget(self.button_exit)
        
        hbox.addWidget(self.Pic_H, 0, Qt.AlignHCenter)
        hbox.addLayout(vbox_1p2_h)
        hbox.addLayout(vbox_3)
        
        self.button_connect.clicked.connect(self.ffmpeg_connect)
        self.button_start.clicked.connect(self.ffmpeg_start)
        self.button_terminate.clicked.connect(self.ffmpeg_terminate)
        self.button_clear.clicked.connect(self.ffmpeg_clear)
        self.button_exit.clicked.connect(self.ffmpeg_exit)
        
        self.button_start.setEnabled(False)
        self.button_terminate.setEnabled(False)
            
        self.setLayout(hbox)
        #self.move(300, 300)
        self.setWindowTitle(self.tr('Video Stream Player'))
        self.show()
        return True
        
    @pyqtSlot()	
    def ffmpeg_connect(self):
        try:
            self.val_widthDst = int(self.widthDst.text())
            self.val_heightDst = int(self.heightDst.text())
            self.val_cacheSize = int(self.cacheSize.text())
        except Exception as e:
            QMessageBox.critical(self, self.tr('Error'), ''.join((self.tr('Type wrong parameters'), '!\n', str(e))), QMessageBox.Ok, QMessageBox.Ok)
        self.timer.stop()
        self.button_start.setEnabled(False)
        self.button_terminate.setEnabled(False)
        self.button_clear.setEnabled(False)
        self.__h.setParameter(widthDst=self.val_widthDst, heightDst=self.val_heightDst, dstFrameRate=(5,1), readSize=1, cacheSize=self.val_cacheSize)
        self.button_connect_td.setFunc(self.__h.FFmpegSetup, self.address.text())
        self.button_connect_td.start()
        #success = self.__h.FFmpegSetup(self.address.text().encode('gbk'))
        
    @pyqtSlot(bool)	
    def ffmpeg_connect_rec(self, success):
        self.button_clear.setEnabled(True)
        if success:
            if self.val_widthDst <= 0:
                self.val_widthDst = self.__h.getParameter(b'width')
            if self.val_heightDst <= 0:
                self.val_heightDst = self.__h.getParameter(b'height')
            self.Pic_H.setFixedWidth(self.val_widthDst)
            self.Pic_H.setFixedHeight(self.val_heightDst)
            self.button_start.setEnabled(True)
            self.button_terminate.setEnabled(True)
            QMessageBox.information(self, self.tr('Information'), ''.join((self.tr('Success to connect with the server'), '!')), QMessageBox.Ok, QMessageBox.Ok)
        else:
            self.button_start.setEnabled(False)
            self.button_terminate.setEnabled(False)
            QMessageBox.warning(self, self.tr('Error'), ''.join((self.tr('Fail to connect with the server'), '!')), QMessageBox.Ok, QMessageBox.Ok)
            
    @pyqtSlot()	
    def ffmpeg_start(self):
        try:
            self.__h.start()
            self.countTime = time.perf_counter()
            self.lcd.display(time.strftime("%H:%M:%S",time.gmtime(0)))
            self.timer.start()
        except Exception as e:
            QMessageBox.critical(self, self.tr('Error'), ''.join((self.tr('Unable to start the demuxing thread'), '!\n', str(e))), QMessageBox.Ok, QMessageBox.Ok)
            
    @pyqtSlot()	
    def ffmpeg_terminate(self):
        self.__h.terminate()
        self.timer.stop()
    
    def onTimerOut(self):
        p = self.__h.ExtractFrame()
        self.lcd.display(time.strftime("%H:%M:%S", time.gmtime(time.perf_counter() - self.countTime)))
        if p is None:
            print('Fail to receive frame.')
            self.__h.terminate()
            self.timer.stop()
        else:
            qimg = QImage(p[0].data, self.val_widthDst, self.val_heightDst, 3*self.val_widthDst, QImage.Format_RGB888)
            self.Pic_H.setImage(qimg)
    
    @pyqtSlot()	
    def ffmpeg_clear(self):
        self.button_start.setEnabled(False)
        self.button_terminate.setEnabled(False)
        self.timer.stop()
        self.__h.clear()
        QMessageBox.information(self, self.tr('Information'), ''.join((self.tr('Success to clear parameters'), '!')), QMessageBox.Ok, QMessageBox.Ok)
            
    @pyqtSlot()	
    def ffmpeg_exit(self):
        self.close()
        
if __name__ == '__main__':
    import os
    from PyQt5.QtCore import QTranslator, QLocale, QLibraryInfo
    app = QApplication(sys.argv)
    
    languagelist = {
        25: {
            44: 'zh_CN', #China (Main land)
            97: 'zh_TW', #HongKong
            126: 'zh_TW', #Macau
            208: 'zh_TW', #Taiwan
            0: 'zh_TW'
        }
    }
    
    translator = QTranslator(app)
    locale = QLocale.system()
    path = QLibraryInfo.location(QLibraryInfo.TranslationsPath)
    #translator.load('qt_{0}'.format(locale), path)
    
    getlang = languagelist.get(locale.language(), None)
    if getlang is not None:
        getlang = getlang.get(locale.country(), getlang[0])
        translator.load('qtbase_{0}.qm'.format(getlang), '.')
        translator.load('VPl_{0}'.format(getlang))
    app.installTranslator(translator)

    get_gui = VSPlayer_GUI()
    if get_gui.initSuccess:
        sys.exit(app.exec_())
    else:
        sys.exit(1)
(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[563],{852:function(e,t){"use strict";t.Z={body:'<g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.431 3.323l-8.47 10l-.79-.036l-3.35-4.77l.818-.574l2.978 4.24l8.051-9.506l.764.646z"/></g>',width:16,height:16}},5935:function(e,t){"use strict";t.Z={body:'<g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 8.707l3.646 3.647l.708-.707L8.707 8l3.647-3.646l-.707-.708L8 7.293L4.354 3.646l-.707.708L7.293 8l-3.646 3.646l.707.708L8 8.707z"/></g>',width:16,height:16}},5514:function(e,t,n){"use strict";var r=n(7294),a=n(7248);t.Z=function(e){return r.createElement(a.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.4rem"}})}},242:function(e,t,n){"use strict";n.r(t),n.d(t,{contentTitle:function(){return h},default:function(){return f},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return g}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i=n(8617),s=n(5514),d=n(852),l=n(5935),p=n.p+"assets/images/server-dd63ab08f996ce882cf07555a28f9091.png",m=["components"],c={id:"server",title:"Pushing a video stream",sidebar_label:"Server",slug:"/examples/server",description:"Example codes for pushing a stream on the server side."},h=void 0,u={unversionedId:"guides/examples/server",id:"guides/examples/server",isDocsHomePage:!1,title:"Pushing a video stream",description:"Example codes for pushing a stream on the server side.",source:"@site/docs/guides/examples/server.mdx",sourceDirName:"guides/examples",slug:"/examples/server",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/examples/server",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/docs/guides/examples/server.mdx",version:"current",frontMatter:{id:"server",title:"Pushing a video stream",sidebar_label:"Server",slug:"/examples/server",description:"Example codes for pushing a stream on the server side."},sidebar:"docs",previous:{title:"Client",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/examples/client"},next:{title:"Installation",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/troubleshooting/installation"}},g=[{value:"Preparation",id:"preparation",children:[]},{value:"Non-blocking example",id:"non-blocking-example",children:[]},{value:"Dual-process example",id:"dual-process-example",children:[]}],v={toc:g};function f(e){var t=e.components,n=(0,a.Z)(e,m);return(0,o.kt)("wrapper",(0,r.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"preparation"},"Preparation"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"ffserver")," has been removed after FFMpeg ",(0,o.kt)("inlineCode",{parentName:"p"},"3.4")," (see the docs ",(0,o.kt)("a",{parentName:"p",href:"https://trac.ffmpeg.org/wiki/ffserver",title:"ffserver"},"here",(0,o.kt)(i.Z,{mdxType:"IconExternalLink"})),"). In other words, FFMpeg could not work without a server program. The same case exists in our ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder"),". Users need to start a server program first. The server program will keeps listening and waiting for any pushed streams. After that, ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder")," would push the stream to the server by ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegServer"),"."),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"It is also supported if you push a stream with ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegServer")," and receive the same stream with ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegClient")," in the same time. But we recommend users to run ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegClient")," on different devices, because the encoder implemented in ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer")," may occupy a lot of system resources."))),(0,o.kt)("p",null,"We recommend the following video server projects. User could choose one from them according to their requirements."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"Project"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Windows"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Linux"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/aler9/rtsp-simple-server",title:"RTSP Simple Server"},"RTSP Simple Server",(0,o.kt)(i.Z,{mdxType:"IconExternalLink"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)(s.Z,{icon:d.Z,mdxType:"InlineIcon"})),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)(s.Z,{icon:d.Z,mdxType:"InlineIcon"}))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/klaxa/mkvserver_mk2/blob/master/Makefile",title:"Matroska Server Mk2"},"Matroska Server Mk2",(0,o.kt)(i.Z,{mdxType:"IconExternalLink"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)(s.Z,{icon:l.Z,mdxType:"InlineIcon"})),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)(s.Z,{icon:d.Z,mdxType:"InlineIcon"}))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://ossrs.net/releases",title:"Simple Realtime Server"},"Simple Realtime Server",(0,o.kt)(i.Z,{mdxType:"IconExternalLink"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)(s.Z,{icon:l.Z,mdxType:"InlineIcon"})),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)(s.Z,{icon:d.Z,mdxType:"InlineIcon"}))))),(0,o.kt)("p",null,"Take ",(0,o.kt)("em",{parentName:"p"},"RTSP Simple Server")," on Windows as an example. We only need to launch the server program by one command:"),(0,o.kt)("img",{style:{maxWidth:"800px",width:"100%"},src:p,alt:"Launch the RTSP Simple Server"}),(0,o.kt)("p",null,"When the server is listening, we could use the following addresses for the testings"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"rtsp://localhost:8554/\nrtmp://localhost:1935/\n")),(0,o.kt)("h2",{id:"non-blocking-example"},"Non-blocking example"),(0,o.kt)("p",null,"This example is based on the non-blocking API ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrame()"),". Synchronization is an important problem when pushing a stream. If we keeps using ",(0,o.kt)("inlineCode",{parentName:"p"},"ServeFrame()"),", the frames would be sent as many as possible. The newly income frames would override the previous pushed frames. In some cases, the server would be broken, because the server could not accept so many frames."),(0,o.kt)("p",null,"To make the server works properly, we need to push the frames according to the video timestamp. When ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.FFmpegSetup()")," is called, we mark this time point as a starting time. ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer")," will maintain a timer. Everytime users call ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.getParemeter('waitRef')"),", the method would returns a waiting period, indicating how long the pushed video stream is ahead of the playing time. The waiting period is half of the aforementioned time lag (the unit of the returned value is ",(0,o.kt)("em",{parentName:"p"},"second"),"). If we have pushed too much frames, we need to let the server wait for a while."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python",metastring:'{16,19-20} title="server-non-blocking.py"',"{16,19-20}":!0,title:'"server-non-blocking.py"'},"import time\nimport mpegCoder\n\nd = mpegCoder.MpegDecoder()\nopened = d.FFmpegSetup('test-video.mp4')\ne = mpegCoder.MpegServer()\ne.setParameter(configDict=d.getParameter(), codecName='libx264', videoAddress='rtsp://localhost:8554/video')  # inherit most of parameters from the decoder.\nopened = opened and e.FFmpegSetup()  # Load the encoder.\nif opened:  # If encoder is not loaded successfully, do not continue.\n    gop = True\n    s = 0\n    while gop is not None:\n        gop = d.ExtractGOP()  # Extract current GOP.\n        if gop is not None:\n            for i in gop:  # Select every frame.\n                e.ServeFrame(i)  # Serve current frame.\n                s += 1\n                if s == 10:  # Wait for synchronization for each 10 frames.\n                    wait = e.getParameter('waitRef')\n                    time.sleep(wait)\n                    s = 0\n    e.FFmpegClose()  # End encoding and pushing, and flush all frames in cache.\nelse:\n    print(e)\ne.clear()  # Close the encoder.\nd.clear()  # Close the decoder.\n")),(0,o.kt)("h2",{id:"dual-process-example"},"Dual-process example"),(0,o.kt)("p",null,"The above example is not an elegant implementation, because ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegDecoder")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer")," occupy the same main thread. When decoder takes a lot of time, there would be an obvious latency. Therefore, we suggest users to split ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegDecoder")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer")," to two different sub-processes. The following codes are implemented by this way. The decoder and the streamer are synchronized by a shared queue. Instead of using ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrame()"),", we use ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrameBlock()")," here. Each time this method is called, ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer")," will check the current playing time first, and ensure that the timestamp of the newly incoming frame is not ahead of the playing time too much. If the time lag between the new frame and the playing time is too long, the method will wait until the time lag becomes small enough."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python",metastring:'{14,21,23,37,43,45} title="server-dual-procs.py"',"{14,21,23,37,43,45}":!0,title:'"server-dual-procs.py"'},"import mpegCoder\nimport multiprocessing\n\n\nclass Decoder(multiprocessing.Process):\n    def __init__(self, video_name='test-video.mp4', q_o=None, name=None, daemon=None):\n        super().__init__(name=name, daemon=daemon)\n        self.video_name = video_name\n        self.q_o = q_o\n\n    def run(self):\n        d = mpegCoder.MpegDecoder()\n        opened = d.FFmpegSetup(self.video_name)\n        self.q_o.put(d.getParameter())\n        if opened:\n            gop = True\n            while gop is not None:\n                gop = d.ExtractGOP()  # Extract current GOP.\n                if gop is not None:\n                    for i in gop:  # Select every frame.\n                        self.q_o.put(i)\n                else:\n                    self.q_o.put(None)\n        else:\n            print(d)\n        d.clear()\n\n\nclass Encoder(multiprocessing.Process):\n    def __init__(self, video_addr='rtsp://localhost:8554/video', q_i=None, name=None, daemon=None):\n        super().__init__(name=name, daemon=daemon)\n        self.video_addr = video_addr\n        self.q_i = q_i\n\n    def run(self):\n        e = mpegCoder.MpegServer()\n        config_dict = self.q_i.get()  # Get decoder configurations.\n        e.setParameter(configDict=config_dict, codecName='libx264', maxBframe=16, videoAddress=self.video_addr)\n        opened = e.FFmpegSetup()\n        if opened:  # If encoder is not loaded successfully, do not continue.\n            frame = True\n            while frame is not None:\n                frame = self.q_i.get()  # Get one frame.\n                if frame is not None:\n                    e.ServeFrameBlock(frame)  # Encode current frame.\n            e.FFmpegClose()  # End encoding, and flush all frames in cache.\n        else:\n            print(e)\n        e.clear()\n\n\nif __name__ == '__main__':\n    queue_data = multiprocessing.Queue(maxsize=20)\n    proc_dec = Decoder(video_name='test-video.mp4', q_o=queue_data, daemon=True)\n    proc_enc = Encoder(video_addr='rtsp://localhost:8554/video', q_i=queue_data, daemon=True)\n    proc_dec.start()\n    proc_enc.start()\n    proc_enc.join()\n    proc_dec.join()\n")),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"In the above examples, we use ",(0,o.kt)("inlineCode",{parentName:"p"},"configDict")," for ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.setParameter()"),". The input value is a python dict returned by ",(0,o.kt)("inlineCode",{parentName:"p"},"MpegDecoder.getParameter()"),". This API is equivalent to using ",(0,o.kt)("inlineCode",{parentName:"p"},"e.setParameter(decoder=d)"),". However, we have to use the equivalent API here, because all classes of ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder")," could not be pickled."))))}f.isMDXComponent=!0}}]);
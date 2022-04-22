"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[7455],{9170:function(e,n,t){t.r(n),t.d(n,{assets:function(){return v},contentTitle:function(){return g},default:function(){return f},frontMatter:function(){return c},metadata:function(){return k},toc:function(){return u}});var r=t(3117),a=t(102),i=(t(7294),t(3905)),o=t(541),p=t(5514),l=t(2895),d=t(5099),m=t(1533),s=["components"],c={id:"server",title:"\u63a8\u9001\u8fdc\u7aef\u89c6\u9891\u6d41",sidebar_label:"\u670d\u52a1\u7aef",slug:"/examples/server",description:"\u5b9e\u73b0\u4e00\u4e2a\u6df7\u6d41\u3001\u63a8\u8fdc\u7aef\u89c6\u9891\u6d41\u7684\u670d\u52a1\u7aef\u7684\u8303\u4f8b\u3002"},g=void 0,k={unversionedId:"guides/examples/server",id:"version-3.2.0/guides/examples/server",title:"\u63a8\u9001\u8fdc\u7aef\u89c6\u9891\u6d41",description:"\u5b9e\u73b0\u4e00\u4e2a\u6df7\u6d41\u3001\u63a8\u8fdc\u7aef\u89c6\u9891\u6d41\u7684\u670d\u52a1\u7aef\u7684\u8303\u4f8b\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-3.2.0/guides/examples/server.mdx",sourceDirName:"guides/examples",slug:"/examples/server",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/examples/server",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.2.0/guides/examples/server.mdx",tags:[],version:"3.2.0",frontMatter:{id:"server",title:"\u63a8\u9001\u8fdc\u7aef\u89c6\u9891\u6d41",sidebar_label:"\u670d\u52a1\u7aef",slug:"/examples/server",description:"\u5b9e\u73b0\u4e00\u4e2a\u6df7\u6d41\u3001\u63a8\u8fdc\u7aef\u89c6\u9891\u6d41\u7684\u670d\u52a1\u7aef\u7684\u8303\u4f8b\u3002"},sidebar:"docs",previous:{title:"\u5ba2\u6237\u7aef",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/examples/client"},next:{title:"Troubleshooting",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/category/troubleshooting"}},v={},u=[{value:"\u51c6\u5907",id:"preparation",level:2},{value:"\u8303\u4f8b\uff1a\u975e\u963b\u585e\u5f0f\u63a8\u6d41",id:"non-blocking-example",level:2},{value:"\u8303\u4f8b\uff1a\u53cc\u8fdb\u7a0b\u6a21\u5f0f",id:"dual-process-example",level:2}],N={toc:u};function f(e){var n=e.components,t=(0,a.Z)(e,s);return(0,i.kt)("wrapper",(0,r.Z)({},N,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"preparation"},"\u51c6\u5907"),(0,i.kt)("p",null,"\u9274\u4e8e",(0,i.kt)("inlineCode",{parentName:"p"},"ffserver"),"\u5728FFMpeg ",(0,i.kt)("inlineCode",{parentName:"p"},"3.4"),"\u7248\u672c\u540e\u5c31\u5df2\u7ecf\u88ab\u79fb\u9664\uff08\u53c2\u89c1",(0,i.kt)("a",{parentName:"p",href:"https://trac.ffmpeg.org/wiki/ffserver",title:"ffserver"},"\u8fd9\u91cc",(0,i.kt)(o.Z,{mdxType:"IconExternalLink"})),"\uff09\uff0cFFMpeg\u65e0\u6cd5\u5728\u6ca1\u6709\u4e00\u4e2a\u670d\u52a1\u5668\u7a0b\u5e8f\u534f\u540c\u7684\u60c5\u51b5\u4e0b\u5355\u72ec\u5b8c\u6210\u63a8\u6d41\u5de5\u4f5c\u3002\u540c\u6837\u7684\u95ee\u9898\u4e5f\u5b58\u5728\u4e8e",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u4e2d\u3002\u7528\u6237\u9700\u8981\u5148\u542f\u52a8\u4e00\u4e2a\u670d\u52a1\u5668\u7a0b\u5e8f\uff0c\u8be5\u7a0b\u5e8f\u4f1a\u6301\u7eed\u4fa6\u542c\u3001\u7b49\u5f85\u63a8\u9001\u7684\u89c6\u9891\u6d41\u3002\u5728\u6b64\u4e4b\u540e",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u5c31\u53ef\u4ee5\u901a\u8fc7",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegServer"),"\u63a8\u9001\u89c6\u9891\u4e86\u3002"),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u5b9e\u9645\u4e0a\uff0c\u4f60\u4e5f\u53ef\u4ee5\u5728\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u63a8\u9001\u89c6\u9891\u7684\u540c\u65f6\uff0c\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegClient"),"\u63a5\u6536\u8fd9\u4e2a\u89c6\u9891\u6d41\u3002\u4f46\u662f\u6211\u4eec\u8fd8\u662f\u5efa\u8bae\u7528\u6237\u5c3d\u53ef\u80fd\u5728\u4e24\u53f0\u4e0d\u540c\u7684\u673a\u5668\u4e0a\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"MpegClient"),"\u3002\u56e0\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u81ea\u5e26\u7684\u7f16\u7801\u5668\u4f1a\u5360\u7528\u5f88\u591a\u7cfb\u7edf\u8d44\u6e90\u3002"))),(0,i.kt)("p",null,"\u5efa\u8bae\u4f7f\u7528\u4ee5\u4e0b\u89c6\u9891\u670d\u52a1\u5668\u9879\u76ee\u3002\u7528\u6237\u6309\u81ea\u5df1\u7684\u9700\u6c42\uff0c\u4ece\u4e2d\u9009\u62e9\u4e00\u4e2a\u3002"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"\u9879\u76ee"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Windows"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Linux"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/aler9/rtsp-simple-server",title:"RTSP Simple Server"},"\u7b80\u5355RTSP\u670d\u52a1\u5668\uff08RTSP Simple Server\uff09",(0,i.kt)(o.Z,{mdxType:"IconExternalLink"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)(p.Z,{icon:l.Z,mdxType:"InlineIcon"})),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)(p.Z,{icon:l.Z,mdxType:"InlineIcon"}))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/klaxa/mkvserver_mk2/blob/master/Makefile",title:"Matroska Server Mk2"},"\u9a6c\u7279\u7f57\u65af\u5361\u670d\u52a1Mk2\uff08Matroska Server Mk2\uff09",(0,i.kt)(o.Z,{mdxType:"IconExternalLink"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)(p.Z,{icon:d.Z,mdxType:"InlineIcon"})),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)(p.Z,{icon:l.Z,mdxType:"InlineIcon"}))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://ossrs.net/releases",title:"Simple Realtime Server"},"\u7b80\u5355\u5b9e\u65f6\u670d\u52a1\u5668\uff08Simple Realtime Server\uff09",(0,i.kt)(o.Z,{mdxType:"IconExternalLink"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)(p.Z,{icon:d.Z,mdxType:"InlineIcon"})),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)(p.Z,{icon:l.Z,mdxType:"InlineIcon"}))))),(0,i.kt)("p",null,"\u4ee5Windows\u5e73\u53f0\u548c",(0,i.kt)("em",{parentName:"p"},"\u7b80\u5355RTSP\u670d\u52a1\u5668\uff08RTSP Simple Server\uff09"),"\u4e3a\u4f8b\uff0c\u6211\u4eec\u53ea\u9700\u8981\u901a\u8fc7\u4e00\u884c\u547d\u4ee4\u542f\u52a8\u8fd9\u4e2a\u670d\u52a1\u5668\u7a0b\u5e8f\u5373\u53ef\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{style:{maxWidth:"800px",width:"100%"},src:m.Z,alt:"\u542f\u52a8\u7b80\u5355RTSP\u670d\u52a1\u5668"})),(0,i.kt)("p",null,"\u5f53\u670d\u52a1\u5668\u5904\u4e8e\u4fa6\u542c\u72b6\u6001\u65f6\uff0c\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528\u4ee5\u4e0b\u5730\u5740\u6765\u8fdb\u884c\u63a8\u6d41\u6d4b\u8bd5\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"rtsp://localhost:8554/\nrtmp://localhost:1935/\n")),(0,i.kt)("h2",{id:"non-blocking-example"},"\u8303\u4f8b\uff1a\u975e\u963b\u585e\u5f0f\u63a8\u6d41"),(0,i.kt)("p",null,"\u6b64\u4f8b\u57fa\u4e8e\u975e\u963b\u585e\u5f0fAPI ",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrame()"),"\u3002\u5728\u63a8\u6d41\u7684\u8fc7\u7a0b\u4e2d\uff0c\u786e\u4fdd\u6570\u636e\u540c\u6b65\u662f\u4e00\u4e2a\u5f88\u91cd\u8981\u7684\u95ee\u9898\u3002\u5982\u679c\u6211\u4eec\u4e00\u76f4\u4e0d\u65ad\u5730\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"ServeFrame()"),"\uff0c\u90a3\u4e48\u6211\u4eec\u5c31\u4f1a\u5c3d\u53ef\u80fd\u5730\u80fd\u63a8\u9001\u591a\u5c11\u5e27\u3001\u5c31\u63a8\u9001\u591a\u5c11\u5e27\u3002\u8fd9\u4e9b\u65b0\u63a8\u9001\u7684\u5e27\u5c31\u4f1a\u8986\u76d6\u6389\u4e4b\u524d\u63a8\u9001\u7684\u5e27\u3002\u5728\u4e00\u4e9b\u60c5\u51b5\u4e0b\uff0c\u670d\u52a1\u5668\u751a\u81f3\u4f1a\u5d29\u6e83\uff0c\u56e0\u4e3a\u670d\u52a1\u5668\u65e0\u6cd5\u63a5\u6536\u5982\u6b64\u591a\u7684\u5e27\u3002"),(0,i.kt)("p",null,"\u4e3a\u4e86\u4fdd\u8bc1\u670d\u52a1\u5668\u80fd\u6b63\u5e38\u8fd0\u8f6c\uff0c\u6211\u4eec\u9700\u8981\u6309\u7167\u89c6\u9891\u7684\u65f6\u95f4\u6233\u6765\u63a8\u9001\u5e27\u3002\u5f53",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer.FFmpegSetup()"),"\u6210\u529f\u8c03\u7528\u65f6\uff0c\u5c06\u4f1a\u8bbe\u7f6e\u4e00\u4e2a\u5f00\u59cb\u65f6\u95f4\u6233\u3002",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u4f1a\u7ef4\u62a4\u4e00\u4e2a\u8ba1\u65f6\u5668\uff0c\u6bcf\u5f53\u7528\u6237\u8c03\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer.getParemeter('waitRef')"),"\u65f6\uff0c\u8be5\u65b9\u6cd5\u5c31\u4f1a\u8fd4\u56de\u4e00\u4e2a\u63a8\u8350\u7b49\u5f85\u65f6\u957f\uff0c\u7528\u6765\u8868\u793a\u63a8\u9001\u51fa\u53bb\u7684\u89c6\u9891\u5e27\u5df2\u7ecf\u6bd4\u5b9e\u9645\u89c6\u9891\u5e27\u591a\u51fa\u4e86\u591a\u4e45\u3002\u8fd9\u4e2a\u63a8\u8350\u7b49\u5f85\u65f6\u957f\u5c31\u662f\u4e0a\u8ff0\u7684\u8fd9\u4e2a\u65f6\u95f4\u95f4\u9694\u7684\u4e00\u534a\uff08\u5355\u4f4d\u4e3a\u79d2\uff09\u3002\u5982\u679c\u6211\u4eec\u63a8\u9001\u4e86\u8fc7\u591a\u5e27\uff0c\u5c31\u53ef\u4ee5\u5229\u7528\u8fd9\u4e2a\u53c2\u6570\u8ba9\u670d\u52a1\u7b49\u5f85\u4e00\u4f1a\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:'{16,19-20} title="server-non-blocking.py"',"{16,19-20}":!0,title:'"server-non-blocking.py"'},"import time\nimport mpegCoder\n\nd = mpegCoder.MpegDecoder()\nopened = d.FFmpegSetup('test-video.mp4')\ne = mpegCoder.MpegServer()\ne.setParameter(configDict=d.getParameter(), codecName='libx264', videoAddress='rtsp://localhost:8554/video')  # \u4ece\u89e3\u7801\u5668\u7ee7\u627f\u7edd\u5927\u591a\u6570\u8bbe\u7f6e\u3002\nopened = opened and e.FFmpegSetup()  # \u52a0\u8f7d\u63a8\u6d41\u5668\u3002\nif opened:  # \u5982\u679c\u63a8\u6d41\u5668\u3001\u89e3\u7801\u5668\u6ca1\u6709\u6b63\u5e38\u8f7d\u5165\uff0c\u505c\u6b62\u540e\u7eed\u6b65\u9aa4\u3002\n    gop = True\n    s = 0\n    while gop is not None:\n        gop = d.ExtractGOP()  # \u63d0\u53d6\u5f53\u524d\u7684\u753b\u9762\u7ec4\u3002\n        if gop is not None:\n            for i in gop:  # \u904d\u5386\u6bcf\u4e00\u5e27\u3002\n                e.ServeFrame(i)  # \u7f16\u7801\u5e76\u63a8\u9001\u5f53\u524d\u5e27\u3002\n                s += 1\n                if s == 10:  # \u6bcf\u8fc710\u5e27\uff0c\u68c0\u67e5\u3001\u5e76\u7b49\u5f85\u64ad\u653e\u540c\u6b65\u3002\n                    wait = e.getParameter('waitRef')\n                    time.sleep(wait)\n                    s = 0\n    e.FFmpegClose()  # \u7ed3\u675f\u7f16\u7801\u548c\u63a8\u6d41\uff0c\u5e76\u5c06\u7f13\u5b58\u5185\u7684\u6240\u6709\u5e27\u5237\u5165\u89c6\u9891\u6d41\u5185\u3002\nelse:\n    print(e)\ne.clear()  # \u6e05\u9664\u63a8\u6d41\u5668\u8bbe\u7f6e\u3002\nd.clear()  # \u5173\u95ed\u89e3\u7801\u5668\u3001\u5e76\u6e05\u9664\u8bbe\u7f6e\u3002\n")),(0,i.kt)("h2",{id:"dual-process-example"},"\u8303\u4f8b\uff1a\u53cc\u8fdb\u7a0b\u6a21\u5f0f"),(0,i.kt)("p",null,"\u4ee5\u4e0a\u7684\u4f8b\u5b50\u5e76\u4e0d\u662f\u4e00\u4e2a\u4f18\u96c5\u7684\u5b9e\u73b0\uff0c\u56e0\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"MpegDecoder"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u540c\u65f6\u62a2\u5360\u4e86\u4e3b\u7ebf\u7a0b\u3002\u5982\u679c\u89e3\u7801\u5668\u9700\u8981\u82b1\u8d39\u76f8\u5f53\u7684\u65f6\u95f4\uff0c\u90a3\u4e48\u63a8\u6d41\u5c31\u4f1a\u51fa\u73b0\u660e\u663e\u5ef6\u8fdf\u3002\u56e0\u6b64\uff0c\u5efa\u8bae\u5c06",(0,i.kt)("inlineCode",{parentName:"p"},"MpegDecoder"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u5206\u79bb\u5230\u4e24\u4e2a\u4e0d\u540c\u7684\u5b50\u8fdb\u7a0b\u91cc\u3002\u4e0b\u9762\u7684\u4ee3\u7801\u5c31\u662f\u901a\u8fc7\u8fd9\u79cd\u65b9\u5f0f\u5b9e\u73b0\u7684\u3002\u89e3\u7801\u5668\u548c\u63a8\u6d41\u5668\u901a\u8fc7\u4e00\u4e2a\u5171\u4eab\u7684\u6570\u636e\u961f\u5217\u5b9e\u73b0\u540c\u6b65\u3002\u5728\u6b64\u6211\u4eec\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrameBlock()"),"\u53d6\u4ee3",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrame()"),"\u3002\u6bcf\u5f53\u8c03\u7528\u8fd9\u4e2a\u65b9\u6cd5\u7684\u65f6\u5019\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u5c31\u4f1a\u68c0\u67e5\u5f53\u524d\u7684\u64ad\u653e\u65f6\u957f\uff0c\u5e76\u81ea\u52a8\u786e\u4fdd\u65b0\u63a8\u9001\u5e27\u7684\u65f6\u95f4\u6233\u4e0d\u8d85\u8fc7\u64ad\u653e\u65f6\u957f\u8fc7\u591a\u3002\u5982\u679c\u65b0\u5e27\u7684\u65f6\u95f4\u6233\u548c\u64ad\u653e\u65f6\u957f\u7684\u5dee\u8ddd\u8fc7\u5927\uff0c\u8be5\u65b9\u6cd5\u5c31\u4f1a\u963b\u585e\u6240\u5728\u7684\u7ebf\u7a0b\uff0c\u76f4\u5230\u8fd9\u4e2a\u5dee\u8ddd\u5c0f\u5230\u53ef\u4ee5\u63a5\u53d7\u4e3a\u6b62\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:'{14,21,23,37,43,45} title="server-dual-procs.py"',"{14,21,23,37,43,45}":!0,title:'"server-dual-procs.py"'},"import mpegCoder\nimport multiprocessing\n\n\nclass Decoder(multiprocessing.Process):\n    def __init__(self, video_name='test-video.mp4', q_o=None, name=None, daemon=None):\n        super().__init__(name=name, daemon=daemon)\n        self.video_name = video_name\n        self.q_o = q_o\n\n    def run(self):\n        d = mpegCoder.MpegDecoder()\n        opened = d.FFmpegSetup(self.video_name)\n        self.q_o.put(d.getParameter())\n        if opened:\n            gop = True\n            while gop is not None:\n                gop = d.ExtractGOP()  # \u63d0\u53d6\u5f53\u524d\u7684\u753b\u9762\u7ec4\u3002\n                if gop is not None:\n                    for i in gop:  # \u904d\u5386\u6bcf\u4e00\u5e27\u3002\n                        self.q_o.put(i)\n                else:\n                    self.q_o.put(None)\n        else:\n            print(d)\n        d.clear()\n\n\nclass Encoder(multiprocessing.Process):\n    def __init__(self, video_addr='rtsp://localhost:8554/video', q_i=None, name=None, daemon=None):\n        super().__init__(name=name, daemon=daemon)\n        self.video_addr = video_addr\n        self.q_i = q_i\n\n    def run(self):\n        e = mpegCoder.MpegServer()\n        config_dict = self.q_i.get()  # \u83b7\u53d6\u89e3\u7801\u5668\u7684\u53c2\u6570\u3002\n        e.setParameter(configDict=config_dict, codecName='libx264', maxBframe=16, videoAddress=self.video_addr)\n        opened = e.FFmpegSetup()\n        if opened:  # \u5982\u679c\u63a8\u6d41\u5668\u6ca1\u6709\u6b63\u5e38\u52a0\u8f7d\uff0c\u5c31\u505c\u6b62\u4ee5\u4e0b\u6b65\u9aa4\u3002\n            frame = True\n            while frame is not None:\n                frame = self.q_i.get()  # \u83b7\u53d6\u4e00\u5e27\u3002\n                if frame is not None:\n                    e.ServeFrameBlock(frame)  # \u7f16\u7801\u5e76\u63a8\u9001\u5f53\u524d\u5e27\u3002\n            e.FFmpegClose()  # \u7ed3\u675f\u7f16\u7801\u548c\u63a8\u6d41\uff0c\u5e76\u5c06\u7f13\u5b58\u5185\u7684\u6240\u6709\u5e27\u5237\u5165\u89c6\u9891\u6d41\u5185\u3002\n        else:\n            print(e)\n        e.clear()\n\n\nif __name__ == '__main__':\n    queue_data = multiprocessing.Queue(maxsize=20)\n    proc_dec = Decoder(video_name='test-video.mp4', q_o=queue_data, daemon=True)\n    proc_enc = Encoder(video_addr='rtsp://localhost:8554/video', q_i=queue_data, daemon=True)\n    proc_dec.start()\n    proc_enc.start()\n    proc_enc.join()\n    proc_dec.join()\n")),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u5728\u4e0a\u4f8b\u91cc\uff0c\u8c03\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer.setParameter()"),"\u65f6\u4f7f\u7528\u4e86",(0,i.kt)("inlineCode",{parentName:"p"},"configDict"),"\u3002\u8fd9\u4e2a\u8f93\u5165\u503c\u662f",(0,i.kt)("inlineCode",{parentName:"p"},"MpegDecoder.getParameter()"),"\u8fd4\u56de\u7684\u4e00\u4e2apython\u5b57\u5178\u3002\u8be5\u7528\u6cd5\u7b49\u4ef7\u4e0e\u4f7f\u7528",(0,i.kt)("inlineCode",{parentName:"p"},"e.setParameter(decoder=d)"),"\u3002\u7136\u800c\uff0c\u6b64\u4f8b\u4e2d\u6211\u4eec\u5fc5\u987b\u4f7f\u7528\u8fd9\u4e2a\u7b49\u4ef7\u7528\u6cd5\uff0c\u56e0\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u6240\u6709\u7684\u5b9e\u4f8b\u90fd\u65e0\u6cd5\u88abpickled\u3002"))))}f.isMDXComponent=!0},1533:function(e,n,t){n.Z=t.p+"assets/images/server-dd63ab08f996ce882cf07555a28f9091.png"},2895:function(e,n){n.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="m14.431 3.323l-8.47 10l-.79-.036l-3.35-4.77l.818-.574l2.978 4.24l8.051-9.506l.764.646z" clip-rule="evenodd"/>'}},5099:function(e,n){n.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="m8 8.707l3.646 3.647l.708-.707L8.707 8l3.647-3.646l-.707-.708L8 7.293L4.354 3.646l-.707.708L7.293 8l-3.646 3.646l.707.708L8 8.707z" clip-rule="evenodd"/>'}}}]);
"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[1130],{3172:function(e,n,t){t.r(n),t.d(n,{assets:function(){return s},contentTitle:function(){return p},default:function(){return u},frontMatter:function(){return r},metadata:function(){return l},toc:function(){return m}});var a=t(3117),i=t(102),o=(t(7294),t(3905)),d=(t(541),["components"]),r={id:"transcoding",title:"\u8f6c\u7801\u89c6\u9891\u6587\u4ef6",sidebar_label:"\u8f6c\u7801",slug:"/examples/transcoding",description:"\u7f16\u7801\u3001\u6216\u8f6c\u7801\u4e00\u4e2a\u89c6\u9891\u6587\u4ef6\u7684\u8303\u4f8b\u3002"},p=void 0,l={unversionedId:"guides/examples/transcoding",id:"guides/examples/transcoding",title:"\u8f6c\u7801\u89c6\u9891\u6587\u4ef6",description:"\u7f16\u7801\u3001\u6216\u8f6c\u7801\u4e00\u4e2a\u89c6\u9891\u6587\u4ef6\u7684\u8303\u4f8b\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/current/guides/examples/transcoding.mdx",sourceDirName:"guides/examples",slug:"/examples/transcoding",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/examples/transcoding",draft:!1,editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/docs/guides/examples/transcoding.mdx",tags:[],version:"current",frontMatter:{id:"transcoding",title:"\u8f6c\u7801\u89c6\u9891\u6587\u4ef6",sidebar_label:"\u8f6c\u7801",slug:"/examples/transcoding",description:"\u7f16\u7801\u3001\u6216\u8f6c\u7801\u4e00\u4e2a\u89c6\u9891\u6587\u4ef6\u7684\u8303\u4f8b\u3002"},sidebar:"docs",previous:{title:"\u89e3\u7801",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/examples/decoding"},next:{title:"\u5ba2\u6237\u7aef",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/examples/client"}},s={},m=[{value:"\u4f18\u5316\u89c6\u9891\u7f16\u7801",id:"optimize-the-output-video",level:2},{value:"\u7f29\u653e\u3001\u5e76\u91cd\u91c7\u6837\u89c6\u9891",id:"rescaling-and-resampling",level:2}],c={toc:m};function u(e){var n=e.components,t=(0,i.Z)(e,d);return(0,o.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u4ee5\u4e0b\u4ee3\u7801\u5c55\u793a\u4e86\u5982\u4f55\u7f16\u7801\u3001\u6df7\u6d41\u4e00\u4e2a\u65b0\u89c6\u9891\u6587\u4ef6\u3002\u867d\u7136\u5728\u4e0b\u4f8b\u91cc\uff0c\u6211\u4eec\u5b9e\u9645\u662f\u8f6c\u7801\u4e86\u4e00\u4e2a\u89c6\u9891\uff0c\u4f46\u7f16\u7801\u5668\u7684\u8f93\u5165\u5176\u5b9e\u53ef\u4ee5\u662f\u4efb\u4f55\u6570\u636e\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python",metastring:'{12,14-15} title="transcoding.py" showLineNumbers',"{12,14-15}":!0,title:'"transcoding.py"',showLineNumbers:!0},"import mpegCoder\n\nd = mpegCoder.MpegDecoder()\nd.setParameter(nthread=4)\nopened = d.FFmpegSetup('test-video.mp4')  # \u52a0\u8f7d\u89e3\u7801\u5668\u3002\ne = mpegCoder.MpegEncoder()\ne.setParameter(decoder=d, codecName='libx265', videoPath='test-video-x265.mp4', nthread=8)  # \u4ece\u89e3\u7801\u5668\u7ee7\u627f\u5927\u591a\u6570\u7684\u89c6\u9891\u53c2\u6570\u3002\nopened = opened and e.FFmpegSetup()  # \u8bbe\u7f6e\u7f16\u7801\u5668\u3002\nif opened:  # \u5982\u679c\u7f16\u7801\u5668\u3001\u89e3\u7801\u5668\u6ca1\u6709\u6b63\u5e38\u8f7d\u5165\uff0c\u505c\u6b62\u540e\u7eed\u6b65\u9aa4\u3002\n    p = True\n    while p is not None:\n        p = d.ExtractGOP()  # \u63d0\u53d6\u5f53\u524d\u7684\u753b\u9762\u7ec4\u3002\n        if p is not None:\n            for i in p:  # \u904d\u5386\u6bcf\u4e00\u5e27\u3002\n                e.EncodeFrame(i)  # \u7f16\u7801\u5f53\u524d\u5e27\u3002\n    e.FFmpegClose() # \u7ed3\u675f\u7f16\u7801\uff0c\u5e76\u5c06\u7f13\u5b58\u5185\u7684\u6240\u6709\u5e27\u5237\u5165\u6587\u4ef6\u3002\ne.clear()  # \u6e05\u9664\u7f16\u7801\u5668\u8bbe\u7f6e\u3002\nd.clear()  # \u5173\u95ed\u89e3\u7801\u5668\u3001\u5e76\u6e05\u9664\u8bbe\u7f6e\u3002\n")),(0,o.kt)("p",null,"\u5728\u8be5\u4f8b\u91cc\uff0c\u6211\u4eec\u89e3\u7801\u4e86\u4e00\u4e2a\u5df2\u7ecf\u5b58\u5728\u7684\u89c6\u9891\u6587\u4ef6\uff0c\u5e76\u5c06\u5176\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"x265"),"\u7f16\u7801\u5668\uff08codec\uff09\u7f16\u7801\u6210\u4e00\u4e2a\u65b0\u89c6\u9891\u3002\u6700\u5e38\u7528\u7684\u7f16\u7801\u5668\u6709",(0,o.kt)("inlineCode",{parentName:"p"},"libxvid"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"libx264"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"libx265"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"libvp9"),"\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"libsvtav1"),"\u3002\u6b64\u4f8b\u4e2d\uff0c\u7f16\u7801\u5668\u7684\u5927\u591a\u6570\u8bbe\u7f6e\u90fd\u662f\u4ece\u89e3\u7801\u5668\u91cc\u62f7\u8d1d\u6765\u7684\uff0c\u6240\u4ee5\u8f93\u51fa\u7684\u89c6\u9891\u5c06\u4f1a\u548c\u8f93\u5165\u89c6\u9891\u6709\u76f8\u540c\u7684\u753b\u9762\u7ec4\u5927\u5c0f\u3001\u8fde\u7eedB\u5e27\u6570\u3001\u89c6\u9891\u5c3a\u5bf8\u3001\u6bd4\u7279\u7387\u4ee5\u53ca\u5e27\u7387\u3002\u4e0e\u6b64\u540c\u65f6\uff0c\u6211\u4eec\u5c06\u7f16\u7801\u4f7f\u7528\u7684\u7ebf\u7a0b\u6570\u76ee\u8bbe\u7f6e\u4e3a",(0,o.kt)("inlineCode",{parentName:"p"},"8"),"\u3002"),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"\u90e8\u5206\u7f16\u7801\u5668\uff08codec\uff09\u53ef\u80fd\u4e0d\u652f\u6301\u591a\u7ebf\u7a0b\u6a21\u5f0f\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u65e0\u8bba\u6211\u4eec\u4e4b\u524d\u5982\u4f55\u8bbe\u7f6e\u7f16\u7801\u5668\uff0c\u5728\u8c03\u7528\u4e86",(0,o.kt)("inlineCode",{parentName:"p"},"FFmpegSetup()"),"\u4e4b\u540e\uff0c\u6709\u5173\u7ebf\u7a0b\u6570\u7684\u53c2\u6570\u90fd\u4f1a\u88ab\u81ea\u52a8\u6821\u6b63\u4e3a",(0,o.kt)("inlineCode",{parentName:"p"},"1"),"\u3002"))),(0,o.kt)("p",null,"\u5728\u6bcf\u4e2a\u5faa\u73af\u91cc\uff0c\u6211\u4eec\u8bfb\u53d6\u3001\u904d\u5386\u4e00\u4e2a\u753b\u9762\u7ec4\uff0c\u5e76\u5c06\u5176\u4e2d\u7684\u6570\u636e\u6309\u5e27\u7f16\u7801\u5230\u65b0\u89c6\u9891\u91cc\u3002\u5728\u6240\u6709\u7684\u5e27\u90fd\u7f16\u7801\u5b8c\u6bd5\u4e4b\u540e\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"mp4"),"\u6587\u4ef6\u683c\u5f0f\u7684\u6587\u4ef6\u5c3e\u4f1a\u88ab\u5199\u5165\u5230\u8f93\u51fa\u89c6\u9891\u91cc\u3002"),(0,o.kt)("p",null,"\u5982\u679c\u7528\u6237\u5728\u7f16\u7801\u7684\u8fc7\u7a0b\u4e2d\u89e6\u53d1\u4e86",(0,o.kt)("kbd",null,"Ctrl"),"+",(0,o.kt)("kbd",null,"C"),"\uff0c\u89c6\u9891\u4ecd\u7136\u53ef\u4ee5\u88ab\u5b89\u5168\u4fdd\u5b58\u3002\u4f46\u662f\uff0c\u5982\u679c\u7528\u6237\u8fde\u7eed\u89e6\u53d1",(0,o.kt)("kbd",null,"Ctrl"),"+",(0,o.kt)("kbd",null,"C"),"\u4e24\u6b21\uff0c\u90a3\u4e48\u8f93\u51fa\u89c6\u9891\u5c06\u4f1a\u635f\u574f\uff0c\u56e0\u4e3a\u89c6\u9891\u6587\u4ef6\u5c3e\u6ca1\u80fd\u6b63\u5e38\u5199\u5165\u5230\u6587\u4ef6\u91cc\u3002"),(0,o.kt)("h2",{id:"optimize-the-output-video"},"\u4f18\u5316\u89c6\u9891\u7f16\u7801"),(0,o.kt)("p",null,"\u5728\u4e0a\u4f8b\u91cc\uff0c\u8f93\u51fa\u7684\u89c6\u9891\u7684\u53c2\u6570\u8bbe\u7f6e\u53ef\u80fd\u6ca1\u6709\u8fbe\u5230\u6700\u4f18\u5316\u3002x265\u7f16\u7801\u5668\u53ef\u4ee5\u652f\u6301\u7684\u6700\u5927\u8fde\u7eedB\u5e27\u6570\u4e0d\u8d85\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"16"),"\u3002\u540c\u65f6\uff0c\u4e5f\u53ef\u4ee5\u624b\u52a8\u8bbe\u7f6e\u6bd4\u7279\u7387\u3002\u56e0\u6b64\uff0c\u5982\u679c\u6211\u4eec\u6309\u7167\u4ee5\u4e0b\u65b9\u5f0f\u4fee\u6539\u53c2\u6570\uff0c\u8f93\u51fa\u89c6\u9891\u7684\u6587\u4ef6\u5927\u5c0f\u5c06\u4f1a\u663e\u8457\u964d\u4f4e\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python",metastring:"{3}","{3}":!0},"...\ne = mpegCoder.MpegEncoder()\ne.setParameter(decoder=d, codecName='libx265', videoPath='test-video-x265.mp4', GOPSize=24, maxBframe=16, bitRate=48.0, nthread=8)\nopened = opened and e.FFmpegSetup()\n...\n")),(0,o.kt)("h2",{id:"rescaling-and-resampling"},"\u7f29\u653e\u3001\u5e76\u91cd\u91c7\u6837\u89c6\u9891"),(0,o.kt)("p",null,"\u5728\u67d0\u4e9b\u573a\u5408\u4e0b\uff0c\u6211\u4eec\u9700\u8981\u5c06\u8f93\u51fa\u89c6\u9891\u7f29\u653e\u5230\u5408\u9002\u5c3a\u5bf8\uff0c\u5e76\u4e14\u91cd\u8bbe\u89c6\u9891\u7684\u5e27\u7387\uff0c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python",metastring:"{3}","{3}":!0},"...\ne = mpegCoder.MpegEncoder()\ne.setParameter(decoder=d, codecName='libx265', videoPath='test-video-x265.mp4', width=720, height=486, frameRate=(5, 1), nthread=8)\nopened = opened and e.FFmpegSetup()\n...\n")),(0,o.kt)("p",null,"\u8be5\u8bbe\u7f6e\u5c06\u4f1a\u4f7f\u5f97\u8f93\u51fa\u89c6\u9891\u7684\u5c3a\u5bf8\u7f29\u653e\u4e3a720x486\u3002\u5e76\u4e14\u8f93\u51fa\u89c6\u9891\u7684\u5e27\u7387\u91cd\u91c7\u6837\u4e3a5 FPS\u3002\u5728\u6b64\u60c5\u51b5\u4e0b\uff0c\u5f53\u6211\u4eec\u8c03\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"e.EncodeFrame(i)"),"\u65f6\uff0c\u5e27",(0,o.kt)("inlineCode",{parentName:"p"},"i"),"\u4e0d\u4e00\u5b9a\u9700\u8981\u662f720x486\u7684\u6570\u636e\uff0c\u56e0\u4e3a",(0,o.kt)("inlineCode",{parentName:"p"},"MpegEncoder"),"\u53ef\u4ee5\u81ea\u884c\u7f29\u653e\u5b83\u3002"))}u.isMDXComponent=!0}}]);
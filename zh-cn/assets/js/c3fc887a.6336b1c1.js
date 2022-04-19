"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[5210],{8793:function(e,t,n){var a=n(7294),r=n(9960),o=n(1954),i=n(9575);t.Z=function(e){var t=(0,a.useState)(!1),n=t[0],l=t[1];(0,a.useEffect)((function(){l(!0)}),[]);var p,u,d,m=(p=(0,i.If)(),u=p.colorMode,p.setColorMode,"dark"===u?"button--secondary button--outline":"button--secondary");return d=e.index?"button "+m+" button--lg button--index":"button "+m+" button--lg",a.createElement(r.Z,{key:String(n),className:d,to:e.to},e.icon&&a.createElement(o.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},9373:function(e,t,n){n.r(t),n.d(t,{assets:function(){return k},contentTitle:function(){return m},default:function(){return N},frontMatter:function(){return d},metadata:function(){return s},toc:function(){return c}});var a=n(3117),r=n(102),o=(n(7294),n(3905)),i=n(8793),l=n(541),p=n(3807),u=["components"],d={id:"running",title:"\u4e0e\u8fd0\u884c\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c",sidebar_label:"\u4e0e\u8fd0\u884c\u76f8\u5173",slug:"/troubleshooting/running",description:"\u4e0e\u8fd0\u884c\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c\u3002"},m=void 0,s={unversionedId:"troubleshooting/running",id:"version-3.1.0/troubleshooting/running",title:"\u4e0e\u8fd0\u884c\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c",description:"\u4e0e\u8fd0\u884c\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-3.1.0/troubleshooting/running.mdx",sourceDirName:"troubleshooting",slug:"/troubleshooting/running",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/troubleshooting/running",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.1.0/troubleshooting/running.mdx",tags:[],version:"3.1.0",frontMatter:{id:"running",title:"\u4e0e\u8fd0\u884c\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c",sidebar_label:"\u4e0e\u8fd0\u884c\u76f8\u5173",slug:"/troubleshooting/running",description:"\u4e0e\u8fd0\u884c\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c\u3002"},sidebar:"version-3.1.0/docs",previous:{title:"\u4e0e\u5b89\u88c5\u76f8\u5173",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/troubleshooting/installation"},next:{title:"\u95ee\u4e0e\u7b54",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/troubleshooting/qna"}},k={},c=[{value:"\u7b80\u4ecb",id:"introduction",level:2},{value:"\u95ee\u4e0e\u7b54",id:"questions-and-answers",level:2},{value:"\u65e0\u6cd5\u89e3\u7801\u7b2c\u4e00\u5e27",id:"fail-to-decode-first-frame",level:3},{value:"\u65e0\u6cd5\u7f16\u7801\u5e27",id:"fail-to-encode-frames",level:3},{value:"\u8f93\u51fa\u89c6\u9891\u635f\u574f",id:"bad-output-video",level:3},{value:"\u63a8\u6d41\u3001\u89e3\u6d41\u5668\u5361\u4f4f\u4e0d\u52a8",id:"stuck-of-the-streamer",level:3},{value:"\u65e0\u6cd5\u63a8\u6d41",id:"fail-to-push-the-stream",level:3},{value:"\u8bbe\u7f6e\u65e5\u5fd7\u7ea7\u522b",id:"set-log-level",level:3},{value:"\u590d\u7528\u5b9e\u4f8b",id:"reuse-the-instances",level:3}],g={toc:c};function N(e){var t=e.components,n=(0,r.Z)(e,u);return(0,o.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"introduction"},"\u7b80\u4ecb"),(0,o.kt)("p",null,"\u5982\u679c\u4f60\u65e0\u6cd5\u901a\u8fc7\u672c\u9875\u89e3\u51b3\u4f60\u7684\u95ee\u9898\uff0c\u8bf7\u901a\u8fc7\u4ee5\u4e0b\u6309\u94ae\u63d0\u51fa\u95ee\u9898\uff1a"),(0,o.kt)("p",null,(0,o.kt)(i.Z,{to:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues/new/choose",icon:p.Z,mdxType:"DarkButton"},"\u63d0\u51fa\u95ee\u9898")),(0,o.kt)("h2",{id:"questions-and-answers"},"\u95ee\u4e0e\u7b54"),(0,o.kt)("h3",{id:"fail-to-decode-first-frame"},"\u65e0\u6cd5\u89e3\u7801\u7b2c\u4e00\u5e27"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u95ee"),": \u4e3a\u4ec0\u4e48\u6211\u65e0\u6cd5\u6b63\u786e\u89e3\u7801\u7b2c\u4e00\u5e27\uff1f\u6211\u5f97\u5230\u7684\u5e27\u662f\u5168\u9ed1\u7684\u3002")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u7b54"),": \u8fd9\u4e00\u95ee\u9898\u4e00\u822c\u5728\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"MpegClient"),"\u65f6\u51fa\u73b0\uff0c\u7279\u522b\u662f\u89e3\u90a3\u4e9bRTSP\u6d41\u7684\u65f6\u5019\u3002\u5728\u4e00\u4e9b\u7f16\u7801\u7b97\u6cd5\u91cc\uff0c\u5b58\u5728I\uff0cP\uff0cB\u8fd9\u4e09\u79cd\u5e27\u3002\u5728\u89e3\u7801\u5176\u4ed6\u4e24\u79cd\u5e27\u7684\u65f6\u5019\uff0c\u5fc5\u987b\u5148\u5f97\u5230\u5176\u5bf9\u5e94\u7684\u5df2\u7ecf\u89e3\u7801\u8fc7\u7684I\u5e27\u3002\u5982\u679c\u4f60\u63a5\u6536\u5230\u7684\u7b2c\u4e00\u5e27\u4e0d\u662f\u4e00\u4e2aI\u5e27\uff0c\u90a3\u4e48\u4f60\u5c31\u6ca1\u529e\u6cd5\u6b63\u786e\u89e3\u7801\u5b83\u4e86\u3002\u5982\u679c\u4f60\u4fdd\u6301\u7ee7\u7eed\u89e3\u7801\u51e0\u5e27\u540c\u4e00\u4e2a\u89c6\u9891\uff0c\u8fd9\u4e2a\u95ee\u9898\u5e94\u8be5\u4f1a\u81ea\u7136\u89e3\u51b3\u3002"))),(0,o.kt)("h3",{id:"fail-to-encode-frames"},"\u65e0\u6cd5\u7f16\u7801\u5e27"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u95ee"),": \u4e3a\u4ec0\u4e48",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u5728\u7f16\u7801\u89c6\u9891\u5e27\u7684\u65f6\u5019\u5d29\u6e83\u4e86\uff1f")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u7b54"),": \u4f60\u53ef\u80fd\u5bf9",(0,o.kt)("inlineCode",{parentName:"p"},"MpegEncoder.EncodeFrame()"),"\u4f20\u5165\u4e86\u4e0d\u6b63\u786e\u7684\u6570\u636e\u3002\u8f93\u5165\u6570\u636e\u5fc5\u987b\u662f\u4e00\u4e2a\u4e09\u7ef4\u77e9\u9635",(0,o.kt)("a",{parentName:"p",href:"https://numpy.org/doc/stable/reference/generated/numpy.ndarray.html",title:"np.ndarray"},(0,o.kt)("inlineCode",{parentName:"a"},"np.ndarray"),(0,o.kt)(l.Z,{mdxType:"IconExternalLink"})),"\uff0c\u4e14\u5176\u5927\u5c0f\u9700\u8981\u4e0e\u7f16\u7801\u5668\u7684\u7528\u6237\u8bbe\u7f6e\u4e00\u81f4\u3002"))),(0,o.kt)("h3",{id:"bad-output-video"},"\u8f93\u51fa\u89c6\u9891\u635f\u574f"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u95ee"),": \u4e3a\u4ec0\u4e48\u6211\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"MpegEncoder"),"\u8f93\u51fa\u7684\u89c6\u9891\u635f\u574f\u4e86\uff1f")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u7b54"),": \u4e00\u822c\u6765\u8bf4\uff0c\u89c6\u9891\u635f\u574f\u662f\u7531\u4ee5\u4e0b\u4e24\u79cd\u539f\u56e0\u5bfc\u81f4\u7684\u3002\u8bf7\u68c0\u67e5\u4f60\u7684\u60c5\u51b5\u662f\u5426\u548c\u5b83\u4eec\u76f8\u7b26\uff1a"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"\u89c6\u9891\u6587\u4ef6\u5c3e\u6ca1\u6709\u6b63\u786e\u5199\u5165\u3002\u8fd9\u4e00\u95ee\u9898\u4e00\u822c\u662f\u7531\u4e8e\u5f3a\u5236\u4e2d\u65ad\u6b63\u5728\u8fd0\u884c\u7684\u7f16\u7801\u5668\u7a0b\u5e8f\u5f15\u8d77\u7684\u3002"),(0,o.kt)("li",{parentName:"ul"},"\u67d0\u4e9b\u8f93\u5165\u5e27\u6ca1\u6709\u88ab\u6b63\u786e\u5730\u5199\u5165\u3002")))),(0,o.kt)("h3",{id:"stuck-of-the-streamer"},"\u63a8\u6d41\u3001\u89e3\u6d41\u5668\u5361\u4f4f\u4e0d\u52a8"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u95ee"),": \u4e3a\u4ec0\u4e48\u6211\u5728\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"MpegClient"),"\u6216",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u7684\u65f6\u5019\uff0c\u7a0b\u5e8f\u5361\u4f4f\u4e0d\u52a8\u4e86\uff1f")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u7b54"),": \u8fd9\u4e00\u95ee\u9898\u5f80\u5f80\u662f\u7531",(0,o.kt)("inlineCode",{parentName:"p"},"streamer.FFmpegSetup()"),"\u5f15\u8d77\u7684\uff0c\u7279\u522b\u662f\u5728\u8fdc\u7aef\u7684\u670d\u52a1\u5668\u7a0b\u5e8f\u6ca1\u6709\u542f\u52a8\u7684\u60c5\u51b5\u4e0b\uff0c\u6216\u8005\u6240\u7528\u7684\u534f\u8bae\u88ab\u8fdc\u7aef\u670d\u52a1\u5668\u62d2\u7edd\u7684\u60c5\u51b5\u4e0b\u3002\u6211\u4e0d\u5f97\u4e0d\u627f\u8ba4\u7684\u662f\uff0c\u73b0\u5728\u5173\u4e8e\u8fd9\u4e2a\u95ee\u9898\u7684\u5904\u7406\u8fd8\u4e0d\u591f\u597d\uff0c\u5728\u672a\u6765\u7684\u7248\u672c\u91cc\uff0c\u6211\u4f1a\u8bd5\u56fe\u6dfb\u52a0\u4e00\u4e2a\u8d85\u65f6\uff08timeout\uff09\u9009\u9879\u3002"))),(0,o.kt)("h3",{id:"fail-to-push-the-stream"},"\u65e0\u6cd5\u63a8\u6d41"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u95ee"),": \u6211\u53ef\u4ee5\u901a\u8fc7",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.FFmpegSetup()"),"\u8fde\u63a5\u5230\u8fdc\u7aef\u670d\u52a1\u5668\u3002\u4e3a\u4ec0\u4e48\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u6211\u6ca1\u6709\u529e\u6cd5\u5229\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrame()"),"\u63a8\u9001\u7b2c\u4e00\u5e27\u5462\uff1f")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u7b54"),": \u8fd9\u79cd\u95ee\u9898\u4e00\u822c\u662f\u7531\u4e8e\u4f7f\u7528\u4e86\u4e0d\u5408\u9002\u7684\u7f16\u7801\u5668\uff08codec\uff09\u5f15\u8d77\u7684\u3002\u5e76\u4e0d\u662f\u6240\u6709\u7684\u7f16\u7801\u90fd\u652f\u6301\u5728\u7ebf\u6d41\u670d\u52a1\u7684\u3002\u5efa\u8bae\u7528\u6237\u4f7f\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"libx264"),"\u3002"))),(0,o.kt)("h3",{id:"set-log-level"},"\u8bbe\u7f6e\u65e5\u5fd7\u7ea7\u522b"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u95ee"),": \u6211\u4e0d\u60f3\u5728\u63a7\u5236\u53f0\u770b\u5230\u4e00\u5927\u5806\u72b6\u6001\u4fe1\u606f\uff0c\u600e\u4e48\u628a\u5b83\u4eec\u53bb\u6389\uff1f")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u7b54"),": \u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u8fdb\u884c\u5168\u5c40\u8bbe\u7f6e"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-python"},"mpegCoder.setGlobal(dumpLevel=0)\n")),(0,o.kt)("p",{parentName:"li"},"\u8be5\u503c\u53ef\u4ee5\u662f",(0,o.kt)("inlineCode",{parentName:"p"},"0"),"\uff08\u53ea\u663e\u793a\u9519\u8bef\uff09\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"1"),"\uff08\u663e\u793a\u57fa\u672c\u7684\u65e5\u5fd7\uff09\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"2"),"\uff08\u663e\u793a\u8be6\u7ec6\u7684\u65e5\u5fd7\uff09\u3002"))),(0,o.kt)("h3",{id:"reuse-the-instances"},"\u590d\u7528\u5b9e\u4f8b"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u95ee"),": \u6211\u80fd\u590d\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u7684\u5b9e\u4f8b\u5417\uff1f\u4f8b\u5982\uff0c\u590d\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegDecoder"),"?")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},(0,o.kt)("strong",{parentName:"p"},"\u7b54"),": \u662f\u7684\u3002\u4f46\u8bf7\u8bb0\u4f4f\u5728\u590d\u7528\u540c\u4e00\u4e2a\u5b9e\u4f8b\u524d\uff0c\u8981\u5148\u8c03\u7528",(0,o.kt)("inlineCode",{parentName:"p"},"clear()"),"\u3002"))))}N.isMDXComponent=!0},3807:function(e,t){t.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75zM8 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2z"/>'}}}]);
"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[7006],{8793:function(e,t,n){var o=n(7294),i=n(9960),r=n(1954),a=n(2949);t.Z=function(e){var t=(0,o.useState)(!1),n=t[0],l=t[1];(0,o.useEffect)((function(){l(!0)}),[]);var p,u,c,d=(p=(0,a.I)(),u=p.colorMode,p.setColorMode,"dark"===u?"button--secondary button--outline":"button--secondary");return c=e.index?"button "+d+" button--lg button--index":"button "+d+" button--lg",o.createElement(i.Z,{key:String(n),className:c,to:e.to},e.icon&&o.createElement(r.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},5899:function(e,t,n){n.r(t),n.d(t,{assets:function(){return k},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return m},metadata:function(){return g},toc:function(){return b}});var o=n(3117),i=n(102),r=(n(7294),n(3905)),a=n(8793),l=n(5514),p=n(541),u=n(3751),c=n(3119),d=["components"],m={id:"qna",title:"\u95ee\u4e0e\u7b54",sidebar_label:"\u95ee\u4e0e\u7b54",slug:"/troubleshooting/qna",description:"\u5173\u4e8empegCoder\u73b0\u72b6\u7684\u4e00\u4e9b\u95ee\u7b54\u3002"},s=void 0,g={unversionedId:"troubleshooting/qna",id:"troubleshooting/qna",title:"\u95ee\u4e0e\u7b54",description:"\u5173\u4e8empegCoder\u73b0\u72b6\u7684\u4e00\u4e9b\u95ee\u7b54\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/current/troubleshooting/qna.mdx",sourceDirName:"troubleshooting",slug:"/troubleshooting/qna",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/troubleshooting/qna",draft:!1,editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/docs/troubleshooting/qna.mdx",tags:[],version:"current",frontMatter:{id:"qna",title:"\u95ee\u4e0e\u7b54",sidebar_label:"\u95ee\u4e0e\u7b54",slug:"/troubleshooting/qna",description:"\u5173\u4e8empegCoder\u73b0\u72b6\u7684\u4e00\u4e9b\u95ee\u7b54\u3002"},sidebar:"docs",previous:{title:"\u4e0e\u8fd0\u884c\u76f8\u5173",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/troubleshooting/running"},next:{title:"\u66f4\u65b0\u624b\u8bb0",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/changelog"}},k={},b=[{value:"\u7b80\u4ecb",id:"introduction",level:2},{value:"\u5728\u8106\u5f31\u6027\uff08vulnerability\uff09\u4e0e\u517c\u5bb9\u6027\uff08compatibility\uff09\u4e4b\u95f4\u7684\u53d6\u820d",id:"the-balance-between-vulnerability-and-compatibility",level:3},{value:"\u5173\u4e8e\u97f3\u9891\u5904\u7406\u7684\u8ba1\u5212",id:"plan-for-audio-processing",level:3},{value:"\u5173\u4e8e\u514d\u7f16\u7801\u63a8\u6d41\u7684\u8ba1\u5212",id:"plan-for-no-encoding-streaming",level:3},{value:"\u5173\u4e8e\u5546\u4e1a\u5316\u7684\u8ba1\u5212",id:"commercial-plan",level:3}],h={toc:b};function f(e){var t=e.components,n=(0,i.Z)(e,d);return(0,r.kt)("wrapper",(0,o.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"introduction"},"\u7b80\u4ecb"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u8fd8\u60f3\u95ee\u66f4\u591a\u7684\u95ee\u9898\uff0c\u8bf7\u901a\u8fc7\u4ee5\u4e0b\u6309\u94ae\u8054\u7cfb\u4f5c\u8005\uff1a"),(0,r.kt)("p",null,(0,r.kt)(a.Z,{to:"mailto:cainmagi@gmail.com",icon:u.Z,mdxType:"DarkButton"},"\u8054\u7cfb\u4f5c\u8005")),(0,r.kt)("h3",{id:"the-balance-between-vulnerability-and-compatibility"},"\u5728\u8106\u5f31\u6027\uff08vulnerability\uff09\u4e0e\u517c\u5bb9\u6027\uff08compatibility\uff09\u4e4b\u95f4\u7684\u53d6\u820d"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u95ee"),": \u62a5\u544a\u4e00\u4e2a\u5173\u4e8e\u5b89\u5168\u8106\u5f31\u6027\uff08security vulnerability\uff09\u7684\u95ee\u9898\u53ef\u4ee5\u5417\uff1f")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u7b54"),": \u5f53\u7136\uff0c\u56e0\u4e3a\u5bf9\u4e8eLinux\u53d1\u884c\u7248\u800c\u8a00\uff0c\u6240\u7528\u7684FFMpeg\u662f\u6211\u81ea\u5df1\u7f16\u8bd1\u7684\u3002\u5173\u4e8e\u8fd9\u7c7bissue\uff0c\u8fd9\u91cc\u6709\u4e00\u4e2a\u597d\u7684",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues/4"},(0,r.kt)(l.Z,{icon:c.Z,mdxType:"InlineIcon"})," \u4f8b\u5b50 #4"),". \u7136\u800c\uff0c\u6709\u4e00\u79cd\u60c5\u51b5\u662f\u8bba\u5916\u7684\u3002\u5bf9\u5927\u591a\u6570\u4f9d\u8d56\u9879\u800c\u8a00\uff0c\u6211\u53ef\u4ee5\u628a\u5b83\u4eec\u548c",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u6253\u5305\u5728\u4e00\u8d77\u3002\u4f46\u662f\u5bf9\u4e00\u4e9b\u975e\u5e38\u57fa\u8981\u7684\u5e93\uff0c\u4f8b\u5982",(0,r.kt)("inlineCode",{parentName:"p"},"GLibC"),"\uff0c\u65e0\u6cd5\u901a\u8fc7\u5c40\u90e8\u52a0\u8f7d\u7684\u65b9\u5f0f\u8c03\u7528\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u517c\u5bb9\u6027\u5c31\u662f\u4e00\u4e2a\u6bd4\u8106\u5f31\u6027\u66f4\u91cd\u8981\u7684\u8bae\u9898\u4e86\u3002\u4f8b\u5982\uff0c\u5982\u679c\u4e00\u4e2a\u65b0\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"GlibC"),"\u7248\u672c\u89e3\u51b3\u4e86\u4e00\u4e2a\u8106\u5f31\u6027\u95ee\u9898\uff0c\u5374\u53ea\u5728Debian / Ubuntu\u7684devel\u53d1\u884c\u7248\u4e2d\u63d0\u4f9b\uff0c\u90a3\u6211\u5b81\u613f\u4fdd\u7559\u5f53\u524d\u7684\u4f4e\u7248\u672c\u3002\u56e0\u4e3a\uff0c\u5982\u679c\u6211\u8bd5\u56fe\u63d0\u5347\u5230\u4e00\u4e2a\u66f4\u65b0\u7684\u7248\u672c\uff0c\u5bf9\u90a3\u4e9b\u4f7f\u7528\u7a33\u5b9a\u7248Debian / Ubuntu\u7684\u7528\u6237\u800c\u8a00\uff0c\u5c31\u514d\u4e0d\u4e86\u8981\u5728\u4f7f\u7528",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u4e4b\u524d\u3001\u81ea\u884c\u7f16\u8bd1",(0,r.kt)("inlineCode",{parentName:"p"},"GlibC"),"\u4e86\u3002"))),(0,r.kt)("h3",{id:"plan-for-audio-processing"},"\u5173\u4e8e\u97f3\u9891\u5904\u7406\u7684\u8ba1\u5212"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u524d\u7248\u672c",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder 3.x"),"\u4e0d\u652f\u6301\u97f3\u9891\u5904\u7406\u3002\u4ee5\u540e\u5c06\u4f1a\u5b9e\u73b0\u8fd9\u4e2a\u7279\u6027\u5417\uff1f")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u7b54"),": \u662f\u7684\u3002\u4ece\u672a\u6765\u7684",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder 4.x"),"\u5f00\u59cb\uff0c\u5c06\u4f1a\u652f\u6301\u97f3\u9891\u5904\u7406\u3002\u4f46\u662f\u6211\u73b0\u5728\u6ca1\u6709\u5f88\u591a\u7a7a\u4f59\u65f6\u95f4\u7528\u5728\u8fd9\u4e2a\u9879\u76ee\u4e0a\uff0c\u6240\u4ee5\u5b9e\u73b0\u8fd9\u4e2a\u7279\u6027\u53ef\u80fd\u9700\u8981\u82b1\u5f88\u957f\u65f6\u95f4\u3002\u6211\u5f88\u4e50\u610f\u6709\u4eba\u80fd\u53d1\u8d77\u4e00\u4e2apull request (PR)\u5e2e\u6211\u3002"))),(0,r.kt)("h3",{id:"plan-for-no-encoding-streaming"},"\u5173\u4e8e\u514d\u7f16\u7801\u63a8\u6d41\u7684\u8ba1\u5212"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u524d\u7248\u672c",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder 3.x"),"\u4e2d\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"MpegServer"),"\u53ea\u652f\u6301\u4ee5\u7f16\u7801\u89c6\u9891\u5e27\u7684\u65b9\u5f0f\u63a8\u6d41\u3002\u4ee5\u540e\u5c06\u4f1a\u6709\u4e00\u4e2a\u7c7b\uff0c\u7528\u6765\u5728\u8bfb\u53d6\u4e00\u4e2a\u89c6\u9891\u6587\u4ef6\u7684\u540c\u65f6\u76f4\u63a5\u5c06\u5b83\u63a8\u6d41\u51fa\u53bb\u5417\uff1f")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u7b54"),": \u4e0d\u3002\u6211\u8ba4\u4e3a\u8fd9\u79cd\u60c5\u51b5\u4e0b\u5b98\u65b9\u53d1\u884c\u7684FFMpeg\u672c\u8eab\u5c31\u5df2\u7ecf\u591f\u7528\u4e86\u3002\u5efa\u8bae\u6709\u8fd9\u65b9\u9762\u9700\u6c42\u7684\u7528\u6237\u8054\u5408\u4f7f\u7528\u4e00\u4e2a\u670d\u52a1\u5668\u7a0b\u5e8f\u548c",(0,r.kt)("a",{parentName:"p",href:"https://trac.ffmpeg.org/wiki/StreamingGuide",title:"FFMpeg used for streaming"},"FFMpeg",(0,r.kt)(p.Z,{mdxType:"IconExternalLink"})),"\u672c\u8eab\u63d0\u4f9b\u7684\u63a8\u6d41\u529f\u80fd\u3002"))),(0,r.kt)("h3",{id:"commercial-plan"},"\u5173\u4e8e\u5546\u4e1a\u5316\u7684\u8ba1\u5212"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u95ee"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u4ee5\u540e\u4f1a\u6709\u4ed8\u8d39\u670d\u52a1\u5417\uff1f")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"\u7b54"),": \u4e0d\u3002",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u548cFFMpeg\u4f7f\u7528\u7684\u662f\u5b8c\u5168\u76f8\u540c\u7684\u534f\u8bae\uff08GPL v3\uff09\u3002\u5728\u6b64\u524d\u63d0\u4e0b\uff0c\u8be5\u9879\u76ee\u662f\u5b8c\u5168\u5f00\u6e90\u7684\u3002\u5c3d\u7ba1GPLv3\u5141\u8bb8\u7528\u6237\u5f00\u653e\u5546\u4e1a\u8ba1\u5212\uff0c\u5728\u8fd9\u6837\u7684\u534f\u8bae\u4e0b\u7ef4\u62a4\u5546\u4e1a\u8ba1\u5212\u5bf9\u6211\u5c06\u4f1a\u662f\u4e00\u4e2a\u6c89\u91cd\u7684\u8d1f\u62c5\u3002\u6211\u4e0d\u4f1a\u8003\u8651\u4efb\u4f55\u8ddf\u6b64\u9879\u76ee\u6709\u5173\u7684\u5546\u4e1a\u6d3b\u52a8\uff08\u54ea\u6015\u662f\u6350\u6b3e\uff09\u3002"))))}f.isMDXComponent=!0},3751:function(e,t){t.Z={body:'<path fill="currentColor" d="M19.07 13.88L13 19.94V22h2.06l6.06-6.07m1.58-2.35l-1.28-1.28a.517.517 0 0 0-.38-.17c-.15.01-.29.06-.39.17l-1 1l2.05 2l1-1c.19-.2.19-.52 0-.72M11 18H4V8l8 5l8-5v2h2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2m9-12l-8 5l-8-5h16Z"/>',width:24,height:24}},3119:function(e,t){t.Z={body:'<path fill="currentColor" d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69L5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5z"/><path fill="currentColor" fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1.5 0a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0z"/>'}}}]);
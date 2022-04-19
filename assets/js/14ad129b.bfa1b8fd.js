"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[9],{8793:function(e,n,t){var o=t(7294),r=t(9960),i=t(1954),a=t(9575);n.Z=function(e){var n=(0,o.useState)(!1),t=n[0],l=n[1];(0,o.useEffect)((function(){l(!0)}),[]);var s,u,p,d=(s=(0,a.If)(),u=s.colorMode,s.setColorMode,"dark"===u?"button--secondary button--outline":"button--secondary");return p=e.index?"button "+d+" button--lg button--index":"button "+d+" button--lg",o.createElement(r.Z,{key:String(t),className:p,to:e.to},e.icon&&o.createElement(i.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},4186:function(e,n,t){t.r(n),t.d(n,{assets:function(){return m},contentTitle:function(){return d},default:function(){return f},frontMatter:function(){return p},metadata:function(){return c},toc:function(){return g}});var o=t(3117),r=t(102),i=(t(7294),t(3905)),a=t(8793),l=t(541),s=t(3751),u=["components"],p={id:"qna",title:"Questions and answers",sidebar_label:"Q&A",slug:"/troubleshooting/qna",description:"The questions and answers for mpegCoder."},d=void 0,c={unversionedId:"troubleshooting/qna",id:"version-3.1.0/troubleshooting/qna",title:"Questions and answers",description:"The questions and answers for mpegCoder.",source:"@site/versioned_docs/version-3.1.0/troubleshooting/qna.mdx",sourceDirName:"troubleshooting",slug:"/troubleshooting/qna",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/3.1.0/troubleshooting/qna",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.1.0/troubleshooting/qna.mdx",tags:[],version:"3.1.0",frontMatter:{id:"qna",title:"Questions and answers",sidebar_label:"Q&A",slug:"/troubleshooting/qna",description:"The questions and answers for mpegCoder."},sidebar:"version-3.1.0/docs",previous:{title:"Running",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/3.1.0/troubleshooting/running"},next:{title:"Changelog",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/3.1.0/changelog"}},m={},g=[{value:"Introduction",id:"introduction",level:2},{value:"Plan for audio processing",id:"plan-for-audio-processing",level:3},{value:"Plan for no-encoding streaming",id:"plan-for-no-encoding-streaming",level:3},{value:"Commercial plan",id:"commercial-plan",level:3}],h={toc:g};function f(e){var n=e.components,t=(0,r.Z)(e,u);return(0,i.kt)("wrapper",(0,o.Z)({},h,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"If you feel like asking more questions, please contact me by the email:"),(0,i.kt)("p",null,(0,i.kt)(a.Z,{to:"mailto:cainmagi@gmail.com",icon:s.Z,mdxType:"DarkButton"},"Contact me")),(0,i.kt)("h3",{id:"plan-for-audio-processing"},"Plan for audio processing"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Question"),": The audio processing is not supported by ",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder 3.x"),". Will it be implemented future?")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Answer"),": Sure. The audio processing would be supported since ",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder 4.x"),". But I do not have enough time on this project, so it may take a long time to implement. I am very glad if there is anyone willing to send me a pull request (PR) about this."))),(0,i.kt)("h3",{id:"plan-for-no-encoding-streaming"},"Plan for no-encoding streaming"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Question"),": In ",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder 3.x"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"MpegServer")," only support streaming while encoding. Will there be a class for reading a video while pushing it as a stream?")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Answer"),": No. I believe that using the official FFMpeg is a good enough solution. We recommend users to use a server program together with the official ",(0,i.kt)("a",{parentName:"p",href:"https://trac.ffmpeg.org/wiki/StreamingGuide",title:"FFMpeg used for streaming"},"FFMpeg",(0,i.kt)(l.Z,{mdxType:"IconExternalLink"}))," streaming features."))),(0,i.kt)("h3",{id:"commercial-plan"},"Commercial plan"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Question"),": Will there be a commercial plan for ",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"?")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Answer"),": No. ",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder")," shares exactly the same license (GPL v3) of FFMpeg. This project is totally open-sourced. Although GPLv3 enables coders to add a commercial plan, such a plan would be a burden for me. I will not concern anything about the commercial plan for this project, even sponsorship."))))}f.isMDXComponent=!0},3751:function(e,n){n.Z={body:'<path fill="currentColor" d="M19.07 13.88L13 19.94V22h2.06l6.06-6.07m1.58-2.35l-1.28-1.28a.517.517 0 0 0-.38-.17c-.15.01-.29.06-.39.17l-1 1l2.05 2l1-1c.19-.2.19-.52 0-.72M11 18H4V8l8 5l8-5v2h2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2m9-12l-8 5l-8-5h16Z"/>',width:24,height:24}}}]);
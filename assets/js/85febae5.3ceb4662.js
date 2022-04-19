"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[4371],{8793:function(e,t,n){var o=n(7294),r=n(9960),a=n(1954),i=n(9575);t.Z=function(e){var t=(0,o.useState)(!1),n=t[0],l=t[1];(0,o.useEffect)((function(){l(!0)}),[]);var s,u,p,d=(s=(0,i.If)(),u=s.colorMode,s.setColorMode,"dark"===u?"button--secondary button--outline":"button--secondary");return p=e.index?"button "+d+" button--lg button--index":"button "+d+" button--lg",o.createElement(r.Z,{key:String(n),className:p,to:e.to},e.icon&&o.createElement(a.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},1692:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return d},default:function(){return k},frontMatter:function(){return p},metadata:function(){return m},toc:function(){return h}});var o=n(3117),r=n(102),a=(n(7294),n(3905)),i=n(8793),l=n(541),s=n(3807),u=["components"],p={id:"running",title:"Troubleshooting for running",sidebar_label:"Running",slug:"/troubleshooting/running",description:"The troubleshooting for running mpegCoder."},d=void 0,m={unversionedId:"troubleshooting/running",id:"troubleshooting/running",title:"Troubleshooting for running",description:"The troubleshooting for running mpegCoder.",source:"@site/docs/troubleshooting/running.mdx",sourceDirName:"troubleshooting",slug:"/troubleshooting/running",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/next/troubleshooting/running",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/docs/troubleshooting/running.mdx",tags:[],version:"current",frontMatter:{id:"running",title:"Troubleshooting for running",sidebar_label:"Running",slug:"/troubleshooting/running",description:"The troubleshooting for running mpegCoder."},sidebar:"docs",previous:{title:"Installation",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/next/troubleshooting/installation"},next:{title:"Q&A",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/next/troubleshooting/qna"}},c={},h=[{value:"Introduction",id:"introduction",level:2},{value:"Questions and answers",id:"questions-and-answers",level:2},{value:"Fail to decode first frame",id:"fail-to-decode-first-frame",level:3},{value:"Fail to encode frames",id:"fail-to-encode-frames",level:3},{value:"Bad output video",id:"bad-output-video",level:3},{value:"Stuck of the streamer",id:"stuck-of-the-streamer",level:3},{value:"Fail to push the stream",id:"fail-to-push-the-stream",level:3},{value:"Set log level",id:"set-log-level",level:3},{value:"Reuse the instances",id:"reuse-the-instances",level:3}],g={toc:h};function k(e){var t=e.components,n=(0,r.Z)(e,u);return(0,a.kt)("wrapper",(0,o.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"If you could not find your problem in this page, please fire an issue:"),(0,a.kt)("p",null,(0,a.kt)(i.Z,{to:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues/new/choose",icon:s.Z,mdxType:"DarkButton"},"Fire an issue")),(0,a.kt)("h2",{id:"questions-and-answers"},"Questions and answers"),(0,a.kt)("h3",{id:"fail-to-decode-first-frame"},"Fail to decode first frame"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Question"),": Why is the first frame not able to be decoded correctly? The returned frame is totally black.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Answer"),": This problem often occurs when using ",(0,a.kt)("inlineCode",{parentName:"p"},"MpegClient"),", especially when demuxing the RTSP stream. In some video codec formats, there are I, P, and B frames. The I frame is required for decoding other frames. If the first received frame from the remote stream is not an I frame, you could not decode the frame correctly. This problem should be fixed if you let your client running for a while."))),(0,a.kt)("h3",{id:"fail-to-encode-frames"},"Fail to encode frames"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Question"),": When encoding frames, why does ",(0,a.kt)("inlineCode",{parentName:"p"},"mpegCoder")," collapse?")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Answer"),": You may send incorrect data to ",(0,a.kt)("inlineCode",{parentName:"p"},"MpegEncoder.EncodeFrame()"),". The input value should be a 3D ",(0,a.kt)("a",{parentName:"p",href:"https://numpy.org/doc/stable/reference/generated/numpy.ndarray.html",title:"np.ndarray"},(0,a.kt)("inlineCode",{parentName:"a"},"np.ndarray"),(0,a.kt)(l.Z,{mdxType:"IconExternalLink"})),". The size of this array requires to be consistent with the configuration of the encoder."))),(0,a.kt)("h3",{id:"bad-output-video"},"Bad output video"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Question"),": I am working with ",(0,a.kt)("inlineCode",{parentName:"p"},"MpegEncoder"),". Why is the output video broken?")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Answer"),": There are two typical cases for the bad output video. Please check whether you meet such cases:"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"The video tail is not written correctly. This problem is often caused by a sudden termination of the program."),(0,a.kt)("li",{parentName:"ul"},"Some of the input frames are not correctly written.")))),(0,a.kt)("h3",{id:"stuck-of-the-streamer"},"Stuck of the streamer"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Question"),": When using ",(0,a.kt)("inlineCode",{parentName:"p"},"MpegClient")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"MpegServer"),", why is the program stucked?")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Answer"),": This problem is often caused by ",(0,a.kt)("inlineCode",{parentName:"p"},"streamer.FFmpegSetup()"),", especially when the remote server program is not launched, or the stream protocol is not accepted by the server. I have to admit that I should add a timeout option in the future."))),(0,a.kt)("h3",{id:"fail-to-push-the-stream"},"Fail to push the stream"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Question"),": I could connect the server by ",(0,a.kt)("inlineCode",{parentName:"p"},"MpegServer.FFmpegSetup()")," successfully. Why am I not able to serve the first frame by ",(0,a.kt)("inlineCode",{parentName:"p"},"MpegServer.ServeFrame()"),"?")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Answer"),": This problem is often caused by using a wrong codec. Not all codecs are supported for the online streaming. We recommend users to use ",(0,a.kt)("inlineCode",{parentName:"p"},"libx264"),"."))),(0,a.kt)("h3",{id:"set-log-level"},"Set log level"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Question"),": I do not want the logs shown in the prompt, how to disable them?")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Answer"),": We provide a global configuration method to do that:"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-python"},"mpegCoder.setGlobal(dumpLevel=0)\n")),(0,a.kt)("p",{parentName:"li"},"This value could be ",(0,a.kt)("inlineCode",{parentName:"p"},"0")," (only show errors), ",(0,a.kt)("inlineCode",{parentName:"p"},"1")," (show basic logs), ",(0,a.kt)("inlineCode",{parentName:"p"},"2")," (show detailed logs)."))),(0,a.kt)("h3",{id:"reuse-the-instances"},"Reuse the instances"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Question"),": Can I reuse the same instance of ",(0,a.kt)("inlineCode",{parentName:"p"},"mpegCoder"),", for example, the ",(0,a.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegDecoder"),"?")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"Answer"),": Of course. Remember to call ",(0,a.kt)("inlineCode",{parentName:"p"},"clear()")," before reusing the instance."))))}k.isMDXComponent=!0},3807:function(e,t){t.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75zM8 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2z"/>'}}}]);
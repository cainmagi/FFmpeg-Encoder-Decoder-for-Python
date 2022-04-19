"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[8740],{6310:function(e,t,a){a.r(t),a.d(t,{assets:function(){return u},contentTitle:function(){return m},default:function(){return k},frontMatter:function(){return d},metadata:function(){return s},toc:function(){return h}});var n=a(3117),o=a(102),r=(a(7294),a(3905)),i=a(5514),p=a(3119),l=["components"],d={id:"changelog",title:"\u66f4\u65b0\u624b\u8bb0",description:"\u672c\u9879\u76ee\u7684\u66f4\u65b0\u8bb0\u5f55\u3002",slug:"/changelog"},m=void 0,s={unversionedId:"changelog",id:"version-3.2.0/changelog",title:"\u66f4\u65b0\u624b\u8bb0",description:"\u672c\u9879\u76ee\u7684\u66f4\u65b0\u8bb0\u5f55\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-3.2.0/changelog.mdx",sourceDirName:".",slug:"/changelog",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/changelog",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.2.0/changelog.mdx",tags:[],version:"3.2.0",frontMatter:{id:"changelog",title:"\u66f4\u65b0\u624b\u8bb0",description:"\u672c\u9879\u76ee\u7684\u66f4\u65b0\u8bb0\u5f55\u3002",slug:"/changelog"},sidebar:"docs",previous:{title:"\u95ee\u4e0e\u7b54",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/troubleshooting/qna"}},u={},h=[{value:"Update Report of <code>mpegCoder</code>",id:"update-report-of-mpegcoder",level:2},{value:"V3.2.0 @ 4/8/2022:",id:"v320--482022",level:3},{value:"V3.1.0 @ 7/23/2021:",id:"v310--7232021",level:3},{value:"V3.0.0 update report:",id:"v300-update-report",level:3},{value:"V2.05 update report:",id:"v205-update-report",level:3},{value:"V2.01 update report:",id:"v201-update-report",level:3},{value:"V2.0 update report:",id:"v20-update-report",level:3},{value:"V1.8 update report:",id:"v18-update-report",level:3},{value:"V1.7-linux update report:",id:"v17-linux-update-report",level:3},{value:"V1.7 update report:",id:"v17-update-report",level:3},{value:"V1.5 update report:",id:"v15-update-report",level:3},{value:"V1.4 update report:",id:"v14-update-report",level:3},{value:"V1.2 update report:",id:"v12-update-report",level:3},{value:"V1.0 update report:",id:"v10-update-report",level:3}],c={toc:h};function k(e){var t=e.components,a=(0,o.Z)(e,l);return(0,r.kt)("wrapper",(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u672c\u9875\u7684\u5185\u5bb9\u4e0d\u9700\u8981\u3001\u4e5f\u5c06\u4e0d\u4f1a\u88ab\u7ffb\u8bd1\u6210\u5176\u4ed6\u8bed\u8a00\u3002"))),(0,r.kt)("h2",{id:"update-report-of-mpegcoder"},"Update Report of ",(0,r.kt)("inlineCode",{parentName:"h2"},"mpegCoder")),(0,r.kt)("h3",{id:"v320--482022"},"V3.2.0 @ 4/8/2022:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Upgrade to ",(0,r.kt)("inlineCode",{parentName:"p"},"FFMpeg 5.0")," version.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix the const assignment bug caused by the codec configuration method.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"(Only for Linux) Upgrade the dependencies of FFMpeg to the newest versions (",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues/4"},(0,r.kt)(i.Z,{icon:p.Z,mdxType:"InlineIcon"})," issue #4"),").")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"(About PyPI) Change the behavior of the PYPI ",(0,r.kt)("inlineCode",{parentName:"p"},".whl")," release. Now the dependencies will not be packed into ",(0,r.kt)("inlineCode",{parentName:"p"},".whl")," directly. When users ",(0,r.kt)("inlineCode",{parentName:"p"},"import mpegCoder")," for the first time, the dependency will be automatically downloaded. Please ensure that you have the authority to modify the ",(0,r.kt)("inlineCode",{parentName:"p"},"site-packages")," folder when you import ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," for the first time."))),(0,r.kt)("h3",{id:"v310--7232021"},"V3.1.0 @ 7/23/2021:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Support ",(0,r.kt)("inlineCode",{parentName:"p"},"str()")," type for all string arguments.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Support ",(0,r.kt)("inlineCode",{parentName:"p"},"http"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ftp"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"sftp")," streams for ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegServer"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Support ",(0,r.kt)("inlineCode",{parentName:"p"},"nthread")," option for ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegDecoder"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegEncoder"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegClient")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegServer"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix a bug caused by the constructor ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegServer()"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Clean up all ",(0,r.kt)("inlineCode",{parentName:"p"},"gcc")," warnings of the source codes.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix typos in docstrings."))),(0,r.kt)("h3",{id:"v300-update-report"},"V3.0.0 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix a severe memory leaking bugs when using ",(0,r.kt)("inlineCode",{parentName:"p"},"AVPacket"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix a bug caused by using ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegClient.terminate()")," when a video is closed by the server.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Support the ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegServer"),". This class is used for serving the online video streams.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Refactor the implementation of the loggings.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"getParameter()")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"setParameter(configDict)")," APIs to ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegEncoder")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegServer"),".")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Move ",(0,r.kt)("inlineCode",{parentName:"p"},"FFMpeg")," depedencies and the ",(0,r.kt)("inlineCode",{parentName:"p"},"OutputStream")," class to the ",(0,r.kt)("inlineCode",{parentName:"p"},"cmpc")," space.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix dependency issues and cpp standard issues.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Upgrade to ",(0,r.kt)("inlineCode",{parentName:"p"},"FFMpeg 4.4")," Version.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add a quick script for fetching the ",(0,r.kt)("inlineCode",{parentName:"p"},"FFMpeg")," dependencies."))),(0,r.kt)("h3",{id:"v205-update-report"},"V2.05 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix a severe bug that causes the memory leak when using ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegClient"),".This bug also exists in ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegDecoder"),", but it seems that the bug would not cause memory leak in that case. (Although we have also fixed it now.)")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Upgrade to ",(0,r.kt)("inlineCode",{parentName:"p"},"FFMpeg 4.0")," Version."))),(0,r.kt)("h3",{id:"v201-update-report"},"V2.01 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix a bug that occurs when the first received frame may has a PTS larger than zero.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Enable the project produce the newest ",(0,r.kt)("inlineCode",{parentName:"p"},"FFMpeg 3.4.2")," version and use ",(0,r.kt)("inlineCode",{parentName:"p"},"Python 3.6.4"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"numpy 1.14"),". "))),(0,r.kt)("h3",{id:"v20-update-report"},"V2.0 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Revise the bug of the encoder which may cause the stream duration is shorter than the real duration of the video in some not advanced media players.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Improve the structure of the code and remove some unnecessary codes.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Provide a complete version of client, which could demux the video stream from a server in any network protocol."))),(0,r.kt)("h3",{id:"v18-update-report"},"V1.8 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Provide options ",(0,r.kt)("inlineCode",{parentName:"p"},"(widthDst, heightDst)")," to let ",(0,r.kt)("inlineCode",{parentName:"p"},"MpegDecoder")," could control the output size manually. To ensure the option is valid, we must use the method ",(0,r.kt)("inlineCode",{parentName:"p"},"setParameter")," before ",(0,r.kt)("inlineCode",{parentName:"p"},"FFmpegSetup"),". Now you could use this options to get a rescaled output directly:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"  d = mpegCoder.MpegDecoder() # initialize\n  d.setParameter(widthDst=400, heightDst=300) # noted that these options must be set before 'FFmpegSetup'! \n  d.FFmpegSetup(b'i.avi') # the original video size would not influence the output\n  print(d) # examine the parameters. You could also get the original video size by 'getParameter'\n  d.ExtractFrame(0, 100) # get 100 frames with 400x300\n")),(0,r.kt)("p",{parentName:"li"},"In another example, the set optional parameters could be inherited by encoder, too:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"  d.setParameter(widthDst=400, heightDst=300) # set optional parameters\n  ...\n  e.setParameter(decoder=d) # the width/height would inherit from widthDst/heightDst rather than original width/height of the decoder.\n")),(0,r.kt)("p",{parentName:"li"},"Noted that we do not provide ",(0,r.kt)("inlineCode",{parentName:"p"},"widthDst"),"/",(0,r.kt)("inlineCode",{parentName:"p"},"heightDst")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"getParameter"),", because these 2 options are all set by users. There is no need to get them from the video metadata. ")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Optimize some realization of Decoder so that its efficiency could be improved."))),(0,r.kt)("h3",{id:"v17-linux-update-report"},"V1.7-linux update report:"),(0,r.kt)("p",null,"Thanks to God, we succeed in this work!"),(0,r.kt)("p",null,"A new version is avaliable for Linux. To implement this tool, you need to install some libraries firstly:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"python3.5")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"numpy 1.13"))),(0,r.kt)("p",null,"If you want, you could install ",(0,r.kt)("inlineCode",{parentName:"p"},"ffmpeg")," on Linux: Here are some instructions"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Check every pack which ffmpeg needs here: ",(0,r.kt)("a",{parentName:"p",href:"https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu",title:"Dependency of FFmpeg"},"Dependency of FFmpeg"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Use these steps to install ffmpeg instead of provided commands on the above site."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-Bash"}," $ git clone https://git.ffmpeg.org/ffmpeg.git\n $ cd ffmpeg\n $ ./configure --prefix=host --enable-gpl --enable-libx264 --enable-libx265 --enable-shared --disable-static --disable-doc\n $ make\n $ make install\n")),(0,r.kt)("h3",{id:"v17-update-report"},"V1.7 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Realize the encoder totally.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Provide a global option ",(0,r.kt)("inlineCode",{parentName:"p"},"dumpLevel")," to control the log shown in the screen.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Fix bugs in initialize functions."))),(0,r.kt)("h3",{id:"v15-update-report"},"V1.5 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Provide an incomplete version of encoder, which could encode frames as a video stream that could not be played by player.")),(0,r.kt)("h3",{id:"v14-update-report"},"V1.4 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Fix a severe bug of the decoder, which causes the memory collapsed if decoding a lot of frames.")),(0,r.kt)("h3",{id:"v12-update-report"},"V1.2 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Use numpy array to replace the native pyList, which improves the speed  significantly.")),(0,r.kt)("h3",{id:"v10-update-report"},"V1.0 update report:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Provide the decoder which could decode videos in arbitrary formats and arbitrary coding.")))}k.isMDXComponent=!0},3119:function(e,t){t.Z={body:'<path fill="currentColor" d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69L5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5z"/><path fill="currentColor" fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1.5 0a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0z"/>'}}}]);
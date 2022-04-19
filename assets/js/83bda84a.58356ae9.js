"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[9937],{5090:function(e,n,o){o.r(n),o.d(n,{assets:function(){return l},contentTitle:function(){return p},default:function(){return u},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return m}});var t=o(3117),d=o(102),i=(o(7294),o(3905)),r=o(541),a=["components"],c={id:"decoding",title:"Decoding a video",sidebar_label:"Decoding",slug:"/examples/decoding",description:"Example codes for decoding a video."},p=void 0,s={unversionedId:"guides/examples/decoding",id:"version-3.2.0/guides/examples/decoding",title:"Decoding a video",description:"Example codes for decoding a video.",source:"@site/versioned_docs/version-3.2.0/guides/examples/decoding.mdx",sourceDirName:"guides/examples",slug:"/examples/decoding",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/examples/decoding",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.2.0/guides/examples/decoding.mdx",tags:[],version:"3.2.0",frontMatter:{id:"decoding",title:"Decoding a video",sidebar_label:"Decoding",slug:"/examples/decoding",description:"Example codes for decoding a video."},sidebar:"docs",previous:{title:"Legacy",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/installation/legacy"},next:{title:"Transcoding",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/examples/transcoding"}},l={},m=[{value:"Decoder rescaling",id:"decoder-rescaling",level:2}],g={toc:m};function u(e){var n=e.components,o=(0,d.Z)(e,a);return(0,i.kt)("wrapper",(0,t.Z)({},g,o,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The following codes will demux, decode and iterate a video file. The video could be in any valid format. The ",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder.MpegDecoder")," could recognize the video codec automatically."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:'{7,8} title="decoding.py"',"{7,8}":!0,title:'"decoding.py"'},"import mpegCoder\n\nd = mpegCoder.MpegDecoder()\nopened = d.FFmpegSetup('test-video.mp4')\nif opened:  # If encoder is not loaded successfully, do not continue.\n    gop = True\n    while gop is not None:\n        gop = d.ExtractGOP()  # Extract current GOP.\nd.clear()  # Close the input video.\n")),(0,i.kt)("p",null,"In each while loop, a ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Group_of_pictures",title:"Group of pictures | Wikipedia"},"Group of pictures (GOP)",(0,i.kt)(r.Z,{mdxType:"IconExternalLink"}))," would be extracted. The GOP is a collection of video frames, and also the minimal data unit of the video compression algorithm. In ",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),", the GOP is arranged as a 4D ",(0,i.kt)("a",{parentName:"p",href:"https://numpy.org/doc/stable/reference/generated/numpy.ndarray.html",title:"np.ndarray"},(0,i.kt)("inlineCode",{parentName:"a"},"np.ndarray"),(0,i.kt)(r.Z,{mdxType:"IconExternalLink"})),". The shape ",(0,i.kt)("inlineCode",{parentName:"p"},"(N, H, W, C)")," means frame number, height, width, and channel number respectively. Each frame has been converted to RGB (",(0,i.kt)("inlineCode",{parentName:"p"},"uint8"),") space. If the video reaches its end, the returned ",(0,i.kt)("inlineCode",{parentName:"p"},"gop")," would be ",(0,i.kt)("inlineCode",{parentName:"p"},"None"),"."),(0,i.kt)("h2",{id:"decoder-rescaling"},"Decoder rescaling"),(0,i.kt)("p",null,"Users could configure ",(0,i.kt)("inlineCode",{parentName:"p"},"MpegDecoder")," and scale the video frames. For example, the following codes would scale the frame to 720x486, no matter which picture size the video file is."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:"{3}","{3}":!0},"...\nd = mpegCoder.MpegDecoder()\nd.setParameter(widthDst=720, heightDst=486)\nopened = d.FFmpegSetup('test-video.mp4')\n...\n")))}u.isMDXComponent=!0}}]);
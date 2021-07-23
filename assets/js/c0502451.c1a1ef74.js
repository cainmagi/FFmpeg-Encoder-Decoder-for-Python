(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[423],{5176:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return r},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return m}});var o=t(2122),a=t(9756),i=(t(7294),t(3905)),d=(t(8617),["components"]),r={id:"transcoding",title:"Transcoding a video",sidebar_label:"Transcoding",slug:"/examples/transcoding",description:"Example codes for encoding or transcoding a video."},l=void 0,c={unversionedId:"guides/examples/transcoding",id:"guides/examples/transcoding",isDocsHomePage:!1,title:"Transcoding a video",description:"Example codes for encoding or transcoding a video.",source:"@site/docs/guides/examples/transcoding.mdx",sourceDirName:"guides/examples",slug:"/examples/transcoding",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/examples/transcoding",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/docs/guides/examples/transcoding.mdx",version:"current",frontMatter:{id:"transcoding",title:"Transcoding a video",sidebar_label:"Transcoding",slug:"/examples/transcoding",description:"Example codes for encoding or transcoding a video."},sidebar:"docs",previous:{title:"Decoding",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/examples/decoding"},next:{title:"Client",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/examples/client"}},p=[],s={toc:p};function m(e){var n=e.components,t=(0,a.Z)(e,d);return(0,i.kt)("wrapper",(0,o.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"The following codes show an example of encoding a new video file. Although we are transcoding a video, the input of the encoder could be any data."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:'{12,14-15} title="transcoding.py"',"{12,14-15}":!0,title:'"transcoding.py"'},"import mpegCoder\n\nd = mpegCoder.MpegDecoder()\nd.setParameter(nthread=4)\nopened = d.FFmpegSetup('test-video.mp4')  # Setup the decoder\ne = mpegCoder.MpegEncoder()\ne.setParameter(decoder=d, codecName='libx265', videoPath='test-video-x265.mp4', nthread=8)  # inherit most of parameters from the decoder.\nopened = opened and e.FFmpegSetup()  # Setup the encoder.\nif opened:  # If encoder is not loaded successfully, do not continue.\n    p = True\n    while p is not None:\n        p = d.ExtractGOP()  # Extract current GOP.\n        if p is not None:\n            for i in p:  # Iterate every frame.\n                e.EncodeFrame(i)  # Encode current frame.\n    e.FFmpegClose() # End encoding, and flush all frames in cache.\ne.clear()  # Clean configs of the encoder.\nd.clear()  # Close configs of the decoder.\n")),(0,i.kt)("p",null,"In this example, we decode an existing video file, and encode a new video by ",(0,i.kt)("inlineCode",{parentName:"p"},"x265")," codec. The most widely used video codecs are ",(0,i.kt)("inlineCode",{parentName:"p"},"libxvid"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"libx264"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"libx265"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"libvp9"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"libsvtav1"),". Most of the encoder configurations are copied from the opened decoder. So the output video would share the same GOP number, B frame number, video size, bit rate and frame rate of the input video. We also reconfigure the thread number of the encoder by ",(0,i.kt)("inlineCode",{parentName:"p"},"8"),"."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Some codec may not work with multi-threading. In this case, after we call ",(0,i.kt)("inlineCode",{parentName:"p"},"FFmpegSetup()"),", the configuration of the threading number would be corrected as ",(0,i.kt)("inlineCode",{parentName:"p"},"1")," automatically."))),(0,i.kt)("p",null,"In each while loop, we read a GOP, iterate the GOP, and encode the data frame-by-frame. After all frames are encoded, the ",(0,i.kt)("inlineCode",{parentName:"p"},"mp4")," file tail would be dumped into the output video."),(0,i.kt)("p",null,"If user trigger ",(0,i.kt)("kbd",null,"Ctrl"),"+",(0,i.kt)("kbd",null,"C")," during the while loop, the video could be still completed safely. However, if users hit ",(0,i.kt)("kbd",null,"Ctrl"),"+",(0,i.kt)("kbd",null,"C")," by twice, the output video would be broken, because the video tail has not been written correctly."),(0,i.kt)("p",null,"In the above example, the output video may not be encoded by an optimized configuration. The x265 could accept a maximal consecutive B frame number of ",(0,i.kt)("inlineCode",{parentName:"p"},"<=16"),". We could also configure the output bit rate manually. Therefore, if we change the configuraitons like the following example, the output video size would be reduced significantly."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:"{3}","{3}":!0},"...\ne = mpegCoder.MpegEncoder()\ne.setParameter(decoder=d, codecName='libx265', videoPath='test-video-x265.mp4', GOPSize=24, maxBframe=16, bitRate=48.0, nthread=8)\nopened = opened and e.FFmpegSetup()\n...\n")),(0,i.kt)("p",null,"In some cases, we may want to rescale the output video size, and resample the output frames,"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python",metastring:"{3}","{3}":!0},"...\ne = mpegCoder.MpegEncoder()\ne.setParameter(decoder=d, codecName='libx265', videoPath='test-video-x265.mp4', width=720, height=486, frameRate=(5, 1), nthread=8)\nopened = opened and e.FFmpegSetup()\n...\n")),(0,i.kt)("p",null,"This example would rescale the output frame to ",(0,i.kt)("inlineCode",{parentName:"p"},"720x486"),", and resample the output frame rate as 5 FPS. In this case, when we call ",(0,i.kt)("inlineCode",{parentName:"p"},"e.EncodeFrame(i)"),", the frame ",(0,i.kt)("inlineCode",{parentName:"p"},"i")," may be not in the size of ",(0,i.kt)("inlineCode",{parentName:"p"},"720x486"),", but ",(0,i.kt)("inlineCode",{parentName:"p"},"MpegEncoder()")," could scale it automatically."))}m.isMDXComponent=!0}}]);
"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[5363],{5549:function(e,t,a){a.d(t,{A:function(){return d},q:function(){return o}});var n=a(7294),r=a(9960),i="https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/e5d48b9c65152a303eddccbe65dad8059d0556ae/MpegCoder",l="https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/1553da11d08463ca7b007bcdd68685503da45a5f/MpegCoder";function d(e){var t;if(void 0!==e.ver)switch(e.ver){case"3.2.0":default:t=l+"/"+e.url;break;case"3.1.0":t=i+"/"+e.url}else t=l+"/"+e.url;return n.createElement(r.Z,{to:t,className:"noline"},e.children)}function o(e){return n.createElement("span",{style:{padding:"0 "+e.padx}},"\xb7")}o.defaultProps={padx:"1ex"}},7351:function(e,t,a){a.r(t),a.d(t,{assets:function(){return u},contentTitle:function(){return h},default:function(){return f},frontMatter:function(){return c},metadata:function(){return k},toc:function(){return N}});var n=a(3117),r=a(102),i=(a(7294),a(3905)),l=(a(541),a(5514)),d=a(6577),o=a(2895),m=a(7508),p=a(5549),s=["components"],c={id:"MpegClient",title:"MpegClient",sidebar_label:"MpegClient",slug:"/apis/MpegClient",description:"This class has wrapped the C-API of FFMpeg demuxer so that users could call its methods to demux the network stream in python quickly."},h=void 0,k={unversionedId:"apis/MpegClient",id:"version-3.2.x/apis/MpegClient",title:"MpegClient",description:"This class has wrapped the C-API of FFMpeg demuxer so that users could call its methods to demux the network stream in python quickly.",source:"@site/versioned_docs/version-3.2.x/apis/MpegClient.mdx",sourceDirName:"apis",slug:"/apis/MpegClient",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/apis/MpegClient",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.2.x/apis/MpegClient.mdx",tags:[],version:"3.2.x",frontMatter:{id:"MpegClient",title:"MpegClient",sidebar_label:"MpegClient",slug:"/apis/MpegClient",description:"This class has wrapped the C-API of FFMpeg demuxer so that users could call its methods to demux the network stream in python quickly."},sidebar:"apis",previous:{title:"MpegEncoder",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/apis/MpegEncoder"},next:{title:"MpegServer",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/apis/MpegServer"}},u={},N=[{value:"Arguments",id:"arguments",level:2},{value:"Methods",id:"methods",level:2},{value:"<code>clear</code>",id:"clear",level:3},{value:"<code>resetPath</code>",id:"resetpath",level:3},{value:"Requires",id:"requires",level:4},{value:"<code>getParameter</code>",id:"getparameter",level:3},{value:"Requires",id:"requires",level:4},{value:"Returns",id:"returns",level:4},{value:"<code>setParameter</code>",id:"setparameter",level:3},{value:"Requires",id:"requires",level:4},{value:"<code>FFmpegSetup</code>",id:"ffmpegsetup",level:3},{value:"Requires",id:"requires",level:4},{value:"<code>dumpFile</code>",id:"dumpfile",level:3},{value:"<code>start</code>",id:"start",level:3},{value:"<code>terminate</code>",id:"terminate",level:3},{value:"<code>ExtractFrame</code>",id:"extractframe",level:3},{value:"Requires",id:"requires",level:4},{value:"Returns",id:"returns",level:4},{value:"Operators",id:"operators",level:2},{value:"<code>__str__</code>",id:"__str__",level:3},{value:"Returns",id:"returns",level:4},{value:"Examples",id:"examples",level:2},{value:"Scale the decoded frame",id:"scale-the-decoded-frame",level:3},{value:"Configure the cache size",id:"configure-the-cache-size",level:3},{value:"Use multi-thread decoding",id:"use-multi-thread-decoding",level:3}],g={toc:N};function f(e){var t=e.components,a=(0,r.Z)(e,s);return(0,i.kt)("wrapper",(0,n.Z)({},g,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)(l.Z,{icon:d.Z,mdxType:"InlineIcon"})," Class",(0,i.kt)(p.q,{mdxType:"Splitter"}),(0,i.kt)(p.A,{ver:"3.2.0",url:"MpegStreamer.h#L49",mdxType:"SourceURL"},(0,i.kt)(l.Z,{icon:m.Z,mdxType:"InlineIcon"})," Source")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln = mpegCoder.MpegClient()\n")),(0,i.kt)("p",null,"The frame-level video stream client used for demuxing an online video stream."),(0,i.kt)("p",null,"This client instance is integrated with the features of ",(0,i.kt)("a",{parentName:"p",href:"./MpegDecoder"},(0,i.kt)("inlineCode",{parentName:"a"},"MpegDecoder")),". The connection to the video server is established by ",(0,i.kt)("a",{parentName:"p",href:"#ffmpegsetup"},(0,i.kt)("inlineCode",{parentName:"a"},"FFmpegSetup()")),". When the client is working, it will manage a background sub-thread for fetching the remote frames consecutively. The fetched frames are saved in a circular buffer. The method ",(0,i.kt)("a",{parentName:"p",href:"#extractframe"},(0,i.kt)("inlineCode",{parentName:"a"},"ExtractFrame()"))," always return the latest received frames. To learn more details, please review the ",(0,i.kt)("a",{parentName:"p",href:"../examples/client#introduction"},"description of the theory"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"MpegClient")," requires users to initialize the decoding before reading frames, and close the video after finishing all works. If the video is not closed manually, an automatical closing would be performed when the client is destructed. ",(0,i.kt)("inlineCode",{parentName:"p"},"MpegClient")," also supports threading control. When the client is connected to the server, users could use ",(0,i.kt)("a",{parentName:"p",href:"#start"},(0,i.kt)("inlineCode",{parentName:"a"},"start()"))," to keep the buffer synchronized with the video stream. Calling ",(0,i.kt)("a",{parentName:"p",href:"#terminate"},(0,i.kt)("inlineCode",{parentName:"a"},"terminate()"))," will force the buffer updating to stop. In this case, the method ",(0,i.kt)("a",{parentName:"p",href:"#extractframe"},(0,i.kt)("inlineCode",{parentName:"a"},"ExtractFrame()"))," will always return the same results."),(0,i.kt)("h2",{id:"arguments"},"Arguments"),(0,i.kt)("p",null,"This class does not has initialization arguments."),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"clear"},(0,i.kt)("inlineCode",{parentName:"h3"},"clear")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln.clear()\n")),(0,i.kt)("p",null,"Clear all configurations ",(0,i.kt)("strong",{parentName:"p"},"except")," the default video address. If a video stream is alredy opened, ",(0,i.kt)("inlineCode",{parentName:"p"},"clear()")," will release the connection automatically."),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"We suggest that users should call ",(0,i.kt)("inlineCode",{parentName:"p"},"clear()")," manually, like using other file readers. No matter when ",(0,i.kt)("a",{parentName:"p",href:"#start"},(0,i.kt)("inlineCode",{parentName:"a"},"start()"))," is called, this method could be used safely without calling ",(0,i.kt)("a",{parentName:"p",href:"#terminate"},(0,i.kt)("inlineCode",{parentName:"a"},"terminate()")),"."))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"resetpath"},(0,i.kt)("inlineCode",{parentName:"h3"},"resetPath")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln.resetPath(videoAddress)\n")),(0,i.kt)("p",null,"Reset the default video address to a specific value. Configuring this value will not cause the video stream to be opened. This method is merely used as a configuration."),(0,i.kt)("h4",{id:"requires"},"Requires"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"videoAddress")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"str")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"bytes")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)(l.Z,{icon:o.Z,mdxType:"InlineIcon"})),(0,i.kt)("td",{parentName:"tr",align:"left"},"The address of the video to be read.")))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"getparameter"},(0,i.kt)("inlineCode",{parentName:"h3"},"getParameter")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"param = cln.getParameter(paramName=None)\n")),(0,i.kt)("p",null,"Get the video parameter or configuration value. Each time ",(0,i.kt)("inlineCode",{parentName:"p"},"paramName")," only accepts one parameter name."),(0,i.kt)("h4",{id:"requires"},"Requires"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"paramName")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"str")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"bytes")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the parameter to be checked. If not give, all important parameters, including some private parameters will be returned as a ",(0,i.kt)("inlineCode",{parentName:"td"},"dict"),".")))),(0,i.kt)("p",null,"Here is a list of checkable ",(0,i.kt)("inlineCode",{parentName:"p"},"paramName"),":"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Parameter"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"videoAddress")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"str")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"bytes")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The current address of the read video. If the video stream is not opened, will return the default video address.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"width")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The width of the read video. This value is determined by the video stream.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"height")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The height of the read video. This value is determined by the video stream.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"frameCount")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The number of returned frames in the last frame extraction method.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"coderName")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"str")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The name of the codec used for decoding the video.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"nthread")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The number of decoder threads.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"duration")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"float")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The total seconds of this video.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"estFrameNum")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The estimated total frame number (may be not accurate).")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"srcFrameRate")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"float")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The average frame rate of the source video stream. The unit is FPS. The actual frame rate may be changed on client side.")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"param")),(0,i.kt)("td",{parentName:"tr",align:"center"},"Determined by ",(0,i.kt)("inlineCode",{parentName:"td"},"paramName")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The returned value of the parameter. If no ",(0,i.kt)("inlineCode",{parentName:"td"},"paramName")," is given, will return all important parameters. These parameters could serve as ",(0,i.kt)("inlineCode",{parentName:"td"},"configDict")," for ",(0,i.kt)("inlineCode",{parentName:"td"},"MpegEncoder")," and ",(0,i.kt)("inlineCode",{parentName:"td"},"MpegServer"),".")))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"setparameter"},(0,i.kt)("inlineCode",{parentName:"h3"},"setParameter")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln.setParameter(widthDst=None, heightDst=None, cacheSize=None, readSize=None, dstFrameRate=None, nthread=None)\n")),(0,i.kt)("p",null,"Set the configurations of the client. To make the configurations take effects, these parameters need to be configured before ",(0,i.kt)("a",{parentName:"p",href:"#ffmpegsetup"},(0,i.kt)("inlineCode",{parentName:"a"},"FFmpegSetup()")),"."),(0,i.kt)("h4",{id:"requires"},"Requires"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"widthDst")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The width of extracted frames. Configuring both ",(0,i.kt)("inlineCode",{parentName:"td"},"widthDst")," and ",(0,i.kt)("inlineCode",{parentName:"td"},"heightDst")," will cause the frames to be scaled. If a value ",(0,i.kt)("inlineCode",{parentName:"td"},"<=0")," is given, this value would take no effect.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"heightDst")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The height of extracted frames. Configuring both ",(0,i.kt)("inlineCode",{parentName:"td"},"widthDst")," and ",(0,i.kt)("inlineCode",{parentName:"td"},"heightDst")," will cause the frames to be scaled. If a value ",(0,i.kt)("inlineCode",{parentName:"td"},"<=0")," is given, this value would take no effect.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"cacheSize")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The number of allocated avaliable frames in the cache. We recommend to configure this value as ",(0,i.kt)("inlineCode",{parentName:"td"},"2*readSize"),".")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"dstFrameRate")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"tuple")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The destination FPS of the stream. This value should be formatted as a factor defined as ",(0,i.kt)("inlineCode",{parentName:"td"},"(numerator, denominator)"),". Configuing this value will cause the received frames to be resampled.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"nthread")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The number of decoder threads.")))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"ffmpegsetup"},(0,i.kt)("inlineCode",{parentName:"h3"},"FFmpegSetup")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln.FFmpegSetup(videoAddress=None)\n")),(0,i.kt)("p",null,"Open the online video stream, and initialize the decoder. After the client initialized, the video parameters will be loaded, the video format will be parsed and the video codec will be detected automatically. If an video stream connection is established by the client now, this connection will be released first, then the new video stream will be opened."),(0,i.kt)("h4",{id:"requires"},"Requires"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"videoAddress")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"str")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"bytes")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The address of the video stream to be read. If not given, will use the default path configured by ",(0,i.kt)("a",{parentName:"td",href:"#resetpath"},(0,i.kt)("inlineCode",{parentName:"a"},"resetPath()")),". Setting this argument will also cause the default video path to change.")))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"dumpfile"},(0,i.kt)("inlineCode",{parentName:"h3"},"dumpFile")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln.dumpFile()\n")),(0,i.kt)("p",null,"Print out a brief preview of the video meta-data to the standard output."),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This method is based on C stdout. Therefore, these results could not be redirected or catched by python."))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"start"},(0,i.kt)("inlineCode",{parentName:"h3"},"start")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln.start()\n")),(0,i.kt)("p",null,"Start the demuxing thread. The started sub-thread will keep receiving remote frames to ensure the client buffer is synchronized with the online video stream."),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This method must be called after ",(0,i.kt)("a",{parentName:"p",href:"#ffmpegsetup"},(0,i.kt)("inlineCode",{parentName:"a"},"FFmpegSetup()")),". Once this method is called, users are not allowed to call it again until ",(0,i.kt)("a",{parentName:"p",href:"#terminate"},(0,i.kt)("inlineCode",{parentName:"a"},"terminate()"))," is called or the client is restarted by ",(0,i.kt)("a",{parentName:"p",href:"#ffmpegsetup"},(0,i.kt)("inlineCode",{parentName:"a"},"FFmpegSetup()")),"."))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"terminate"},(0,i.kt)("inlineCode",{parentName:"h3"},"terminate")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"cln.terminate()\n")),(0,i.kt)("p",null,"Terminate the current demuxing thread. This method is required to be called after ",(0,i.kt)("a",{parentName:"p",href:"#start"},(0,i.kt)("inlineCode",{parentName:"a"},"start()")),'. It will stop the frame receiving, and make the played video to be "paused". In this case, the frame receiving could be started again by ',(0,i.kt)("a",{parentName:"p",href:"#start"},(0,i.kt)("inlineCode",{parentName:"a"},"start()")),"."),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"This method must be called after ",(0,i.kt)("a",{parentName:"p",href:"#ffmpegsetup"},(0,i.kt)("inlineCode",{parentName:"a"},"FFmpegSetup()")),". Calling this method will not cause the current connection aborted. Only ",(0,i.kt)("a",{parentName:"p",href:"#clear"},(0,i.kt)("inlineCode",{parentName:"a"},"clear()"))," could release the connection explicitly."))),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"extractframe"},(0,i.kt)("inlineCode",{parentName:"h3"},"ExtractFrame")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"frames = cln.ExtractFrame(readSize=0)\n")),(0,i.kt)("p",null,"Read the latest several frames from the circular buffer."),(0,i.kt)("p",null,"This method is merely a reading method, and not decode frames. Instead, the decoding is managed by the sub-thread. ",(0,i.kt)("inlineCode",{parentName:"p"},"ExtractFrame()")," always fetch the several frames that are latestly decoded. Even ",(0,i.kt)("a",{parentName:"p",href:"#terminate"},(0,i.kt)("inlineCode",{parentName:"a"},"terminate()"))," is called, this method could be still used safely."),(0,i.kt)("h4",{id:"requires"},"Requires"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"readSize")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"int")),(0,i.kt)("td",{parentName:"tr",align:"center"}),(0,i.kt)("td",{parentName:"tr",align:"left"},"The number of the frames to be read. If configured as ",(0,i.kt)("inlineCode",{parentName:"td"},"<=0"),", will use the default ",(0,i.kt)("inlineCode",{parentName:"td"},"readSize")," configured by ",(0,i.kt)("a",{parentName:"td",href:"#setparameter"},(0,i.kt)("inlineCode",{parentName:"a"},"setParameter()")),".")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"frames")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"np.ndarray")),(0,i.kt)("td",{parentName:"tr",align:"left"},"An array with a shape of ",(0,i.kt)("inlineCode",{parentName:"td"},"(N, H, W, C)"),", where ",(0,i.kt)("inlineCode",{parentName:"td"},"N")," is given by ",(0,i.kt)("inlineCode",{parentName:"td"},"readSize")," (no matter whether the video reaches its end), ",(0,i.kt)("inlineCode",{parentName:"td"},"(H, W)")," are the height and width of the returned frames respectively. ",(0,i.kt)("inlineCode",{parentName:"td"},"C")," means the 3 RGB channel. If no valid frames are received, this method would return several frames that are totally black.")))),(0,i.kt)("h2",{id:"operators"},"Operators"),(0,i.kt)("h3",{id:"__str__"},(0,i.kt)("inlineCode",{parentName:"h3"},"__str__")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"info = str(cln)\n")),(0,i.kt)("p",null,"Return a brief report of the current client status."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},(0,i.kt)("div",{className:"center"},"Description")))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"info")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"str")),(0,i.kt)("td",{parentName:"tr",align:"left"},"A brief report of the client status, the configurations and parameters will be listed as formatted texts.")))),(0,i.kt)("h2",{id:"examples"},"Examples"),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"../examples/client"},(0,i.kt)("em",{parentName:"a"},(0,i.kt)("inlineCode",{parentName:"em"},"Client")))," in the tutorial. Here we also show some specific configurations:"),(0,i.kt)("h3",{id:"scale-the-decoded-frame"},"Scale the decoded frame"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"...\ncln = mpegCoder.MpegClient()\ncln.setParameter(widthDst=720, heightDst=486)\n...\n")),(0,i.kt)("h3",{id:"configure-the-cache-size"},"Configure the cache size"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"...\ncln = mpegCoder.MpegClient()\n# Assume that the source frame rate is 29.997\ncln.setParameter(readSize=30, cacheSize=60)\n...\n")),(0,i.kt)("h3",{id:"use-multi-thread-decoding"},"Use multi-thread decoding"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"...\ncln = mpegCoder.MpegClient()\ncln.setParameter(nthread=8)\n...\n")))}f.isMDXComponent=!0},2895:function(e,t){t.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="m14.431 3.323l-8.47 10l-.79-.036l-3.35-4.77l.818-.574l2.978 4.24l8.051-9.506l.764.646z" clip-rule="evenodd"/>'}},6577:function(e,t){t.Z={body:'<path fill="currentColor" d="M11.34 9.71h.71l2.67-2.67v-.71L13.38 5h-.7l-1.82 1.81h-5V5.56l1.86-1.85V3l-2-2H5L1 5v.71l2 2h.71l1.14-1.15v5.79l.5.5H10v.52l1.33 1.34h.71l2.67-2.67v-.71L13.37 10h-.7l-1.86 1.85h-5v-4H10v.48l1.34 1.38zm1.69-3.65l.63.63l-2 2l-.63-.63l2-2zm0 5l.63.63l-2 2l-.63-.63l2-2zM3.35 6.65l-1.29-1.3l3.29-3.29l1.3 1.29l-3.3 3.3z"/>'}},7508:function(e,t){t.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="M4 1.75C4 .784 4.784 0 5.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0 1 14.25 15h-9a.75.75 0 0 1 0-1.5h9a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 10 4.25V1.5H5.75a.25.25 0 0 0-.25.25v2.5a.75.75 0 0 1-1.5 0v-2.5zm7.5-.188V4.25c0 .138.112.25.25.25h2.688a.252.252 0 0 0-.011-.013l-2.914-2.914a.272.272 0 0 0-.013-.011zM5.72 6.72a.75.75 0 0 0 0 1.06l1.47 1.47l-1.47 1.47a.75.75 0 1 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-1.06 0zM3.28 7.78a.75.75 0 0 0-1.06-1.06l-2 2a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06L1.81 9.25l1.47-1.47z"/>'}}}]);
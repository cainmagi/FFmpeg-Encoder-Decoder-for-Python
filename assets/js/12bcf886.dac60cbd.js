"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[7350],{5549:function(e,t,l){l.d(t,{A:function(){return i},q:function(){return d}});var n=l(7294),a=l(9960),r="https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/e5d48b9c65152a303eddccbe65dad8059d0556ae/MpegCoder",o="https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/1553da11d08463ca7b007bcdd68685503da45a5f/MpegCoder";function i(e){var t;if(void 0!==e.ver)switch(e.ver){case"3.2.0":default:t=o+"/"+e.url;break;case"3.1.0":t=r+"/"+e.url}else t=o+"/"+e.url;return n.createElement(a.Z,{to:t,className:"noline"},e.children)}function d(e){return n.createElement("span",{style:{padding:"0 "+e.padx}},"\xb7")}d.defaultProps={padx:"1ex"}},5913:function(e,t,l){l.r(t),l.d(t,{assets:function(){return g},contentTitle:function(){return u},default:function(){return h},frontMatter:function(){return p},metadata:function(){return m},toc:function(){return b}});var n=l(3117),a=l(102),r=(l(7294),l(3905)),o=l(5514),i=l(7795),d=l(7508),s=l(5549),c=["components"],p={id:"setGlobal",title:"setGlobal",sidebar_label:"setGlobal",slug:"/apis/setGlobal",description:"Set global configurations."},u=void 0,m={unversionedId:"apis/setGlobal",id:"version-3.2.x/apis/setGlobal",title:"setGlobal",description:"Set global configurations.",source:"@site/versioned_docs/version-3.2.x/apis/setGlobal.mdx",sourceDirName:"apis",slug:"/apis/setGlobal",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/apis/setGlobal",draft:!1,editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.2.x/apis/setGlobal.mdx",tags:[],version:"3.2.x",frontMatter:{id:"setGlobal",title:"setGlobal",sidebar_label:"setGlobal",slug:"/apis/setGlobal",description:"Set global configurations."},sidebar:"apis",previous:{title:"readme",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/apis/readme"},next:{title:"MpegDecoder",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/apis/MpegDecoder"}},g={},b=[{value:"Arguments",id:"arguments",level:2},{value:"Requires",id:"requires",level:3},{value:"Example",id:"example",level:2},{value:"Disable all logs except errors",id:"disable-all-logs-except-errors",level:3}],f={toc:b};function h(e){var t=e.components,l=(0,a.Z)(e,c);return(0,r.kt)("wrapper",(0,n.Z)({},f,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)(o.Z,{icon:i.Z,mdxType:"InlineIcon"})," Function",(0,r.kt)(s.q,{mdxType:"Splitter"}),(0,r.kt)(s.A,{ver:"3.2.0",url:"MpegPyd.h#L131",mdxType:"SourceURL"},(0,r.kt)(o.Z,{icon:d.Z,mdxType:"InlineIcon"})," Source")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"mpegCoder.setGlobal(dumpLevel=None)\n")),(0,r.kt)("p",null,"A function used for setting global configurations. If a configuration is not specified, that item will not be changed."),(0,r.kt)("h2",{id:"arguments"},"Arguments"),(0,r.kt)("h3",{id:"requires"},"Requires"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"center"},"Argument"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Required"),(0,r.kt)("th",{parentName:"tr",align:"left"},(0,r.kt)("div",{className:"center"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"dumpLevel")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"int")),(0,r.kt)("td",{parentName:"tr",align:"center"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"The level of dumped log. This level will only influence ",(0,r.kt)("inlineCode",{parentName:"td"},"mpegCoder")," logs, FFMpeg logs and some codec logs. A few codec, like ",(0,r.kt)("inlineCode",{parentName:"td"},"libx265")," is not influenced by this configuration. Avaliable values: ",(0,r.kt)("inlineCode",{parentName:"td"},"0"),": Silent executing; ",(0,r.kt)("inlineCode",{parentName:"td"},"1"),": (default) Dump basic informations; ",(0,r.kt)("inlineCode",{parentName:"td"},"2"),": Dump all informations.")))),(0,r.kt)("h2",{id:"example"},"Example"),(0,r.kt)("h3",{id:"disable-all-logs-except-errors"},"Disable all logs except errors"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"mpegCoder.setGlobal(dumpLevel=0)\n")))}h.isMDXComponent=!0},7795:function(e,t){t.Z={body:'<path fill="currentColor" d="M12.42 5.29c-1.1-.1-2.07.71-2.17 1.82L10 10h2.82v2h-3l-.44 5.07A4.001 4.001 0 0 1 2 18.83l1.5-1.5c.33 1.05 1.46 1.64 2.5 1.3c.78-.24 1.33-.93 1.4-1.74L7.82 12h-3v-2H8l.27-3.07a4.01 4.01 0 0 1 4.33-3.65c1.26.11 2.4.81 3.06 1.89l-1.5 1.5c-.25-.77-.93-1.31-1.74-1.38M22 13.65l-1.41-1.41l-2.83 2.83l-2.83-2.83l-1.43 1.41l2.85 2.85l-2.85 2.81l1.43 1.41l2.83-2.83l2.83 2.83L22 19.31l-2.83-2.81L22 13.65Z"/>',width:24,height:24}},7508:function(e,t){t.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="M4 1.75C4 .784 4.784 0 5.75 0h5.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v8.586A1.75 1.75 0 0 1 14.25 15h-9a.75.75 0 0 1 0-1.5h9a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 10 4.25V1.5H5.75a.25.25 0 0 0-.25.25v2.5a.75.75 0 0 1-1.5 0v-2.5zm7.5-.188V4.25c0 .138.112.25.25.25h2.688a.252.252 0 0 0-.011-.013l-2.914-2.914a.272.272 0 0 0-.013-.011zM5.72 6.72a.75.75 0 0 0 0 1.06l1.47 1.47l-1.47 1.47a.75.75 0 1 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-1.06 0zM3.28 7.78a.75.75 0 0 0-1.06-1.06l-2 2a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06L1.81 9.25l1.47-1.47z"/>'}}}]);
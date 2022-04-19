"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[9654],{8793:function(e,t,n){var a=n(7294),r=n(9960),i=n(1954),d=n(9575);t.Z=function(e){var t=(0,a.useState)(!1),n=t[0],o=t[1];(0,a.useEffect)((function(){o(!0)}),[]);var l,m,p,c=(l=(0,d.If)(),m=l.colorMode,l.setColorMode,"dark"===m?"button--secondary button--outline":"button--secondary");return p=e.index?"button "+c+" button--lg button--index":"button "+c+" button--lg",a.createElement(r.Z,{key:String(n),className:p,to:e.to},e.icon&&a.createElement(i.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},3:function(e,t,n){n.r(t),n.d(t,{assets:function(){return g},contentTitle:function(){return p},default:function(){return N},frontMatter:function(){return m},metadata:function(){return c},toc:function(){return k}});var a=n(3117),r=n(102),i=(n(7294),n(3905)),d=(n(8793),n(5514)),o=n(7225),l=["components"],m={id:"legacy",title:"\u5b89\u88c5\uff08\u5386\u53f2\u7248\u672c\uff09",sidebar_label:"\u5386\u53f2\u7248\u672c",slug:"/installation/legacy",description:"\u5bf9\u4e00\u4e9b\u5386\u53f2\u3001\u5f03\u7528\u7684\u9884\u7f16\u8bd1mpegCoder\u7248\u672c\u7684\u5b58\u6863\u3002"},p=void 0,c={unversionedId:"guides/install/legacy",id:"version-3.1.0/guides/install/legacy",title:"\u5b89\u88c5\uff08\u5386\u53f2\u7248\u672c\uff09",description:"\u5bf9\u4e00\u4e9b\u5386\u53f2\u3001\u5f03\u7528\u7684\u9884\u7f16\u8bd1mpegCoder\u7248\u672c\u7684\u5b58\u6863\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-3.1.0/guides/install/legacy.mdx",sourceDirName:"guides/install",slug:"/installation/legacy",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/installation/legacy",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.1.0/guides/install/legacy.mdx",tags:[],version:"3.1.0",frontMatter:{id:"legacy",title:"\u5b89\u88c5\uff08\u5386\u53f2\u7248\u672c\uff09",sidebar_label:"\u5386\u53f2\u7248\u672c",slug:"/installation/legacy",description:"\u5bf9\u4e00\u4e9b\u5386\u53f2\u3001\u5f03\u7528\u7684\u9884\u7f16\u8bd1mpegCoder\u7248\u672c\u7684\u5b58\u6863\u3002"},sidebar:"version-3.1.0/docs",previous:{title:"Linux",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/installation/linux"},next:{title:"\u89e3\u7801",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/examples/decoding"}},g={},k=[],s={toc:k};function N(e){var t=e.components,n=(0,r.Z)(e,l);return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4ee5\u4e0b\u7684\u8fd9\u4e9b\u6784\u5efa\u7248\u672c\u90fd\u662f\u5386\u53f2\u3001\u4e14\u5df2\u7ecf\u88ab",(0,i.kt)("strong",{parentName:"p"},"\u5f03\u7528"),"\u7684\u3002\u4ee5\u540e\u5bf9\u5b83\u4eec\u5c06\u4e0d\u518d\u6709\u4efb\u4f55\u6280\u672f\u652f\u6301\u3002\u653e\u5728\u8fd9\u91cc\u662f\u56e0\u4e3a\u5b83\u4eec\u652f\u6301\u66f4\u65e9\u671f\u7684FFMpeg\u7248\u672c\u3002\u8bf7\u7279\u522b\u6ce8\u610f\uff0c\u5728\u8fd9\u4e9b\u7248\u672c\u91cc\uff0c\u6709\u4e9b\u7279\u6027\u662f\u6ca1\u6709\u88ab\u5b9e\u73b0\u7684\u3002\u800c\u4e14\u5b83\u4eec\u4e5f\u53ef\u80fd\u542b\u6709\u4e00\u4e9b\u4e25\u91cd\u7684bug\u3002"))),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"mpegCoder"),(0,i.kt)("th",{parentName:"tr",align:"center"},"\u64cd\u4f5c\u7cfb\u7edf"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Python"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Numpy"),(0,i.kt)("th",{parentName:"tr",align:"center"},"FFmpeg"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.05/mpegCoder_2_0_5_Win_py36.7z",title:"Windows 2.05, Python 3.6"},(0,i.kt)("inlineCode",{parentName:"a"},"2.05"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Windows"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.6")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.14")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"4.0"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.05/mpegCoder_2_0_5_Win_py35.7z",title:"Windows 2.05, Python 3.5"},(0,i.kt)("inlineCode",{parentName:"a"},"2.05"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Windows"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"4.0"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.01/mpegCoder_2_0_1_Win.7z",title:"Windows 2.01"},(0,i.kt)("inlineCode",{parentName:"a"},"2.01"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Windows"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.6")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.14")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.4.2"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.0/mpegCoder_2_0_Linux.7z",title:"Linux, 2.0"},(0,i.kt)("inlineCode",{parentName:"a"},"2.0"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Linux"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.3"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/2.0/mpegCoder_2_0_Win.7z",title:"Windows, 2.0"},(0,i.kt)("inlineCode",{parentName:"a"},"2.0"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Windows"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.3"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.8/mpegCoder_1_8_Linux.7z",title:"Linux, 1.8"},(0,i.kt)("inlineCode",{parentName:"a"},"1.8"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Linux"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.3"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.8/mpegCoder_1_8_Win.7z",title:"Windows, 1.8"},(0,i.kt)("inlineCode",{parentName:"a"},"1.8"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Windows"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.3"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.7/mpegCoder_1_7_Linux.7z",title:"Linux, 1.7"},(0,i.kt)("inlineCode",{parentName:"a"},"1.7"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Linux"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.3"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/1.7/mpegCoder_1_7_Win.7z",title:"Windows, 1.7"},(0,i.kt)("inlineCode",{parentName:"a"},"1.7"),(0,i.kt)(d.Z,{icon:o.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},"Windows"),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.3"))))))}N.isMDXComponent=!0},7225:function(e,t){t.Z={body:'<path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m3 14h8v-2H8v2m8-7h-2.5V7h-3v3H8l4 4l4-4Z"/>',width:24,height:24}}}]);
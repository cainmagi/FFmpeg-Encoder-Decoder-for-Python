"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[7444],{8793:function(e,t,n){var a=n(7294),r=n(9960),i=n(1954),d=n(2949);t.Z=function(e){var t=(0,a.useState)(!1),n=t[0],o=t[1];(0,a.useEffect)((function(){o(!0)}),[]);var l,p,m,c=(l=(0,d.I)(),p=l.colorMode,l.setColorMode,"dark"===p?"button--secondary button--outline":"button--secondary");return m=e.index?"button "+c+" button--lg button--index":"button "+c+" button--lg",a.createElement(r.Z,{key:String(n),className:m,to:e.to},e.icon&&a.createElement(i.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},1618:function(e,t,n){n.r(t),n.d(t,{assets:function(){return g},contentTitle:function(){return s},default:function(){return C},frontMatter:function(){return k},metadata:function(){return N},toc:function(){return u}});var a=n(3117),r=n(102),i=(n(7294),n(3905)),d=n(8793),o=n(541),l=n(5514),p=n(7225),m=n(866),c=["components"],k={id:"windows",title:"\u5728Windows\u4e0a\u624b\u52a8\u5b89\u88c5",sidebar_label:"Windows",slug:"/installation/windows",description:"\u5728Windows\u4e0a\u624b\u52a8\u5b89\u88c5\u6216\u7f16\u8bd1\u672c\u6a21\u5757\u7684\u6559\u7a0b\u3002"},s=void 0,N={unversionedId:"guides/install/windows",id:"version-3.1.0/guides/install/windows",title:"\u5728Windows\u4e0a\u624b\u52a8\u5b89\u88c5",description:"\u5728Windows\u4e0a\u624b\u52a8\u5b89\u88c5\u6216\u7f16\u8bd1\u672c\u6a21\u5757\u7684\u6559\u7a0b\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/version-3.1.0/guides/install/windows.mdx",sourceDirName:"guides/install",slug:"/installation/windows",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/installation/windows",draft:!1,editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.1.0/guides/install/windows.mdx",tags:[],version:"3.1.0",frontMatter:{id:"windows",title:"\u5728Windows\u4e0a\u624b\u52a8\u5b89\u88c5",sidebar_label:"Windows",slug:"/installation/windows",description:"\u5728Windows\u4e0a\u624b\u52a8\u5b89\u88c5\u6216\u7f16\u8bd1\u672c\u6a21\u5757\u7684\u6559\u7a0b\u3002"},sidebar:"version-3.1.0/docs",previous:{title:"PyPI",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/installation/pypi"},next:{title:"Linux",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/3.1.0/installation/linux"}},g={},u=[{value:"\u5b89\u88c5\u9884\u7f16\u8bd1\u7684\u6a21\u5757",id:"install-the-pre-compiled-module",level:2},{value:"\u4e0b\u8f7d<code>mpegCoder</code>",id:"download-mpegcoder",level:3},{value:"\u5b89\u88c5Numpy",id:"install-numpy",level:3},{value:"\u4e0b\u8f7d\u4f9d\u8d56\u9879",id:"download-dependencies",level:3},{value:"\u5bfc\u5165",id:"import",level:3},{value:"\u7f16\u8bd1\u6a21\u5757",id:"compile-the-module",level:2}],h={toc:u};function C(e){var t=e.components,n=(0,r.Z)(e,c);return(0,i.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u672c\u6559\u7a0b\u5305\u542b\u5b89\u88c5\u6216\u7f16\u8bd1",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u7684\u6b65\u9aa4\u3002\u5efa\u8bae\u9700\u8981\u5728\u9879\u76ee\u91cc\u5c40\u90e8\u90e8\u7f72\u672c\u6a21\u5757\u7684\u7528\u6237\u4f7f\u7528\u8fd9\u79cd\u65b9\u5f0f\u5b89\u88c5\u3002"),(0,i.kt)("h2",{id:"install-the-pre-compiled-module"},"\u5b89\u88c5\u9884\u7f16\u8bd1\u7684\u6a21\u5757"),(0,i.kt)("h3",{id:"download-mpegcoder"},"\u4e0b\u8f7d",(0,i.kt)("inlineCode",{parentName:"h3"},"mpegCoder")),(0,i.kt)("p",null,"\u9996\u5148\uff0c\u7528\u6237\u9700\u8981\u4e0b\u8f7d\u672c\u9879\u76ee\u7684\u5355\u6a21\u5757\u6587\u4ef6\u3002\u4e0b\u8868\u63d0\u4f9b\u4e86\u4e0b\u8f7d\u94fe\u63a5\u3002\u8bf7\u6839\u636e\u4f60\u7684\u73af\u5883\u9009\u62e9\u5bf9\u5e94\u7684\u7248\u672c\u3002"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"mpegCoder"),(0,i.kt)("th",{parentName:"tr",align:"center"},"FFMpeg"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Numpy"),(0,i.kt)("th",{parentName:"tr",align:"center"},"Python"),(0,i.kt)("th",{parentName:"tr",align:"center"},"VS"),(0,i.kt)("th",{parentName:"tr",align:"center"},"\u64cd\u4f5c\u7cfb\u7edf"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py39.tar.xz"},(0,i.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,i.kt)(l.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"4.4")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.21.1")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.9.6")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py38.tar.xz"},(0,i.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,i.kt)(l.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"4.4")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.21.1")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.8.10")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py37.tar.xz"},(0,i.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,i.kt)(l.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"4.4")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.21.1")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.7.10")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py36.tar.xz"},(0,i.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,i.kt)(l.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"4.4")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.19.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.6.13")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py35.tar.xz"},(0,i.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,i.kt)(l.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"4.4")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"1.15.2")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"3.5.5")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))))),(0,i.kt)("p",null,"\u89e3\u538b\u6240\u4e0b\u8f7d\u7684taball\u540e\uff0c\u5c31\u53ef\u4ee5\u5f97\u5230",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder.pyd"),"\u6587\u4ef6\u3002"),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4e0a\u9762\u63d0\u5230\u7684\u8fd9\u4e9b\u76f8\u5173\u9879\u76ee\u7684\u7248\u672c\uff0c\u53ea\u662f\u7528\u6765\u8868\u660e\u9884\u7f16\u8bd1",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u65f6\u6240\u7528\u7684\u73af\u5883\u3002\u8fd9\u5e76\u4e0d\u4ee3\u8868\u8fd0\u884c\u8fd9\u4e9b\u9884\u7f16\u8bd1\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u5fc5\u987b\u8981\u4f9d\u8d56\u8fd9\u4e9b\u7248\u672c\u3002\u4f8b\u5982\uff0c\u7528\u6237\u4e5f\u53ef\u4ee5\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"python 3.9.5"),"\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"numpy 1.19.5"),"\u7684\u73af\u5883\u4e0b\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u3002"))),(0,i.kt)("h3",{id:"install-numpy"},"\u5b89\u88c5Numpy"),(0,i.kt)("p",null,"\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u4e4b\u524d\uff0c\u5fc5\u987b\u5148\u5b89\u88c5\u5408\u9002\u7248\u672c\u7684",(0,i.kt)("a",{parentName:"p",href:"https://numpy.org",title:"Numpy"},"Numpy",(0,i.kt)(o.Z,{mdxType:"IconExternalLink"})),"\u3002\u6bcf\u4e2a",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u53d1\u884c\u7248\u7684\u6700\u4f73Numpy\u7248\u672c\u5df2\u7ecf\u5217\u5728\u4e0a\u8868\u4e4b\u4e2d\u3002\u5982\u679c\u4f60\u5b89\u88c5\u7684Numpy\u7248\u672c\u4e0e\u6240\u9700\u7684\u6700\u4f73\u7248\u672c\u5dee\u8ddd\u8fc7\u5927\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u53ef\u80fd\u65e0\u6cd5\u6b63\u5e38\u8fd0\u884c\u3002\u4ee5\u4e0b\u662f\u5b89\u88c5\u547d\u4ee4\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"python -m pip install numpy==<version>\n")),(0,i.kt)("h3",{id:"download-dependencies"},"\u4e0b\u8f7d\u4f9d\u8d56\u9879"),(0,i.kt)("p",null,"\u5728\u53d1\u884c\u9875\u4e0a\uff0c\u6211\u4eec\u63d0\u4f9b\u4e86\u9884\u7f16\u8bd1\u597d\u7684\u4f9d\u8d56\u9879\u3002\u8fd9\u4e9b\u4f9d\u8d56\u9879\u5305\u542b\u51e0\u4e2a",(0,i.kt)("inlineCode",{parentName:"p"},".dll"),"\u6587\u4ef6\u3002\u7528\u6237\u9700\u8981\u6839\u636e",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u6240\u9700\u7684FFMpeg\u7248\u672c\uff0c\u6765\u9009\u62e9\u5408\u9002\u7684tarball\uff0c\u6765\u4e0b\u8f7d\u3001\u5e76\u89e3\u538b\u6587\u4ef6\u3002"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"center"},"FFMpeg"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"center"},(0,i.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/dll-win-ffmpeg_4_4.tar.xz"},(0,i.kt)("inlineCode",{parentName:"a"},"4.4"),(0,i.kt)(l.Z,{icon:p.Z,mdxType:"InlineIcon"})))))),(0,i.kt)("p",null,"\u4ee5\u4e0a\u8fd9\u4e9b\u6587\u4ef6\u662f\u76f4\u63a5\u4eceFFMpeg\u7684\u5b98\u65b9\u53d1\u884c\u9875\u6458\u51fa\u7684\u3002\u7528\u6237\u4e5f\u53ef\u4ee5\u5728",(0,i.kt)("a",{parentName:"p",href:"https://www.gyan.dev/ffmpeg/builds/#release-section",title:"FFMpeg release"},"\u8fd9\u91cc",(0,i.kt)(o.Z,{mdxType:"IconExternalLink"})),"\u627e\u5230\u5b83\u4eec\u3002"),(0,i.kt)("h3",{id:"import"},"\u5bfc\u5165"),(0,i.kt)("p",null,"\u8981\u5bfc\u5165\u6a21\u5757\uff0c\u7528\u6237\u9700\u8981\u5c06",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder.pyd"),"\u548c\u6240\u4e0b\u8f7d\u7684\u4f9d\u8d56\u9879\u6587\u4ef6\u653e\u5728\u540c\u4e00\u4e2a\u6587\u4ef6\u5939\u91cc\uff0c\u4f8b\u5982\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},".\n|---mpegCoder.pyd\n|---avcodec-58.dll\n|---avformat-58.dll\n|---avutil-56.dll\n|---swresample-3.dll\n`---swscale-5.dll\n")),(0,i.kt)("p",null,"\u6b64\u540e\uff0c\u8fdb\u5165\u8fd9\u4e2a\u6587\u4ef6\u5939\uff0c\u5c31\u53ef\u4ee5\u76f4\u63a5\u901a\u8fc7\u4ee5\u4e0b\u4ee3\u7801\u5bfc\u5165\u672c\u6a21\u5757\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"import mpegCoder\n")),(0,i.kt)("h2",{id:"compile-the-module"},"\u7f16\u8bd1\u6a21\u5757"),(0,i.kt)("p",null,"\u5982\u679c\u7528\u6237\u9700\u8981\u81ea\u884c\u7f16\u8bd1\u6a21\u5757\uff0c\u5219\u53ef\u4ee5\u6309\u7167\u4ee5\u4e0b\u53d1\u5e03\u5728Github\u4e0a\u7684\u6307\u5bfc\u5b8c\u6210\uff1a"),(0,i.kt)("p",null,(0,i.kt)(d.Z,{to:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/3.1.0/README.md",icon:m.Z,mdxType:"DarkButton"},"\u4f7f\u7528VS2019\u7f16\u8bd1")))}C.isMDXComponent=!0},866:function(e,t){t.Z={body:'<path fill="currentColor" d="m10.94 13.5l-1.32 1.32a3.73 3.73 0 0 0-7.24 0L1.06 13.5L0 14.56l1.72 1.72l-.22.22V18H0v1.5h1.5v.08c.077.489.214.966.41 1.42L0 22.94L1.06 24l1.65-1.65A4.308 4.308 0 0 0 6 24a4.31 4.31 0 0 0 3.29-1.65L10.94 24L12 22.94L10.09 21c.198-.464.336-.951.41-1.45v-.1H12V18h-1.5v-1.5l-.22-.22L12 14.56l-1.06-1.06zM6 13.5a2.25 2.25 0 0 1 2.25 2.25h-4.5A2.25 2.25 0 0 1 6 13.5zm3 6a3.33 3.33 0 0 1-3 3a3.33 3.33 0 0 1-3-3v-2.25h6v2.25zm14.76-9.9v1.26L13.5 17.37V15.6l8.5-5.37L9 2v9.46a5.07 5.07 0 0 0-1.5-.72V.63L8.64 0l15.12 9.6z"/>',width:24,height:24}},7225:function(e,t){t.Z={body:'<path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m3 14h8v-2H8v2m8-7h-2.5V7h-3v3H8l4 4l4-4Z"/>',width:24,height:24}}}]);
"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[7660],{8793:function(e,t,n){var a=n(7294),r=n(9960),o=n(1954),i=n(2949);t.Z=function(e){var t=(0,a.useState)(!1),n=t[0],l=t[1];(0,a.useEffect)((function(){l(!0)}),[]);var d,p,m,s=(d=(0,i.I)(),p=d.colorMode,d.setColorMode,"dark"===p?"button--secondary button--outline":"button--secondary");return m=e.index?"button "+s+" button--lg button--index":"button "+s+" button--lg",a.createElement(r.Z,{key:String(n),className:m,to:e.to},e.icon&&a.createElement(o.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},4616:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return k},default:function(){return f},frontMatter:function(){return c},metadata:function(){return h},toc:function(){return g}});var a=n(3117),r=n(102),o=(n(7294),n(3905)),i=n(8793),l=n(541),d=n(5514),p=n(7225),m=n(866),s=["components"],c={id:"windows",title:"Installation for Windows",sidebar_label:"Windows",slug:"/installation/windows",description:"A tutorial about the installation or compilation of the package for Windows."},k=void 0,h={unversionedId:"guides/install/windows",id:"version-3.1.0/guides/install/windows",title:"Installation for Windows",description:"A tutorial about the installation or compilation of the package for Windows.",source:"@site/versioned_docs/version-3.1.0/guides/install/windows.mdx",sourceDirName:"guides/install",slug:"/installation/windows",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/3.1.0/installation/windows",draft:!1,editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/versioned_docs/version-3.1.0/guides/install/windows.mdx",tags:[],version:"3.1.0",frontMatter:{id:"windows",title:"Installation for Windows",sidebar_label:"Windows",slug:"/installation/windows",description:"A tutorial about the installation or compilation of the package for Windows."},sidebar:"version-3.1.0/docs",previous:{title:"PyPI",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/3.1.0/installation/pypi"},next:{title:"Linux",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/3.1.0/installation/linux"}},u={},g=[{value:"Install the pre-compiled module",id:"install-the-pre-compiled-module",level:2},{value:"Download <code>mpegCoder</code>",id:"download-mpegcoder",level:3},{value:"Install Numpy",id:"install-numpy",level:3},{value:"Download dependencies",id:"download-dependencies",level:3},{value:"Import",id:"import",level:3},{value:"Compile the module",id:"compile-the-module",level:2}],N={toc:g};function f(e){var t=e.components,n=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},N,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"This guide contains steps for installing or compiling the ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder")," module manually. We recommend users who need to use ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder")," in a project locally to install the package by this way."),(0,o.kt)("h2",{id:"install-the-pre-compiled-module"},"Install the pre-compiled module"),(0,o.kt)("h3",{id:"download-mpegcoder"},"Download ",(0,o.kt)("inlineCode",{parentName:"h3"},"mpegCoder")),(0,o.kt)("p",null,"First, users need to download the single module. We provide the downloading links in the following table. Please check the correct version according to your environment."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"mpegCoder"),(0,o.kt)("th",{parentName:"tr",align:"center"},"FFMpeg"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Numpy"),(0,o.kt)("th",{parentName:"tr",align:"center"},"Python"),(0,o.kt)("th",{parentName:"tr",align:"center"},"VS"),(0,o.kt)("th",{parentName:"tr",align:"center"},"OS"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py39.tar.xz"},(0,o.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,o.kt)(d.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"4.4")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"1.21.1")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"3.9.6")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py38.tar.xz"},(0,o.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,o.kt)(d.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"4.4")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"1.21.1")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"3.8.10")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py37.tar.xz"},(0,o.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,o.kt)(d.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"4.4")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"1.21.1")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"3.7.10")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py36.tar.xz"},(0,o.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,o.kt)(d.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"4.4")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"1.19.5")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"3.6.13")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/3.1.0/mpegCoder_3_1_0_Win_py35.tar.xz"},(0,o.kt)("inlineCode",{parentName:"a"},"3.1.0"),(0,o.kt)(d.Z,{icon:p.Z,mdxType:"InlineIcon"}))),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"4.4")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"1.15.2")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"3.5.5")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"2019 (v142)")),(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("inlineCode",{parentName:"td"},"Windows 10 21H1"))))),(0,o.kt)("p",null,"After extracting the tarball, we could get ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder.pyd"),"."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Note that the above versions only show the environment when building ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder"),". It does not mean that they are the dependencies of running ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder"),". For example, users could use ",(0,o.kt)("inlineCode",{parentName:"p"},"python 3.9.5")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"numpy 1.19.5")," to run ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"."))),(0,o.kt)("h3",{id:"install-numpy"},"Install Numpy"),(0,o.kt)("p",null,"To run ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder"),", you are required to install ",(0,o.kt)("a",{parentName:"p",href:"https://numpy.org",title:"Numpy"},"Numpy",(0,o.kt)(l.Z,{mdxType:"IconExternalLink"}))," with the correct version first. The best version for each ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder")," release has been listed before. If your Numpy version is differnt from the best version too much, ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder")," may not work. Here is the command for installation."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"python -m pip install numpy==<version>\n")),(0,o.kt)("h3",{id:"download-dependencies"},"Download dependencies"),(0,o.kt)("p",null,"The pre-compiled dependencies are available on our release page. The dependencies contain several ",(0,o.kt)("inlineCode",{parentName:"p"},".dll")," files. Users also need to download the tarball with the correct FFMpeg version, and extract the files."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:"center"},"FFMpeg"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:"center"},(0,o.kt)("a",{parentName:"td",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.0.0/dll-win-ffmpeg_4_4.tar.xz"},(0,o.kt)("inlineCode",{parentName:"a"},"4.4"),(0,o.kt)(d.Z,{icon:p.Z,mdxType:"InlineIcon"})))))),(0,o.kt)("p",null,"The above files are collected from the officially released FFMpeg shared libraries. Users could also find them ",(0,o.kt)("a",{parentName:"p",href:"https://www.gyan.dev/ffmpeg/builds/#release-section",title:"FFMpeg release"},"here",(0,o.kt)(l.Z,{mdxType:"IconExternalLink"})),"."),(0,o.kt)("h3",{id:"import"},"Import"),(0,o.kt)("p",null,"To import the module, users need to place the ",(0,o.kt)("inlineCode",{parentName:"p"},"mpegCoder.pyd")," and the dependencies in the same folder. For example,"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},".\n|---mpegCoder.pyd\n|---avcodec-58.dll\n|---avformat-58.dll\n|---avutil-56.dll\n|---swresample-3.dll\n`---swscale-5.dll\n")),(0,o.kt)("p",null,"After that, users could enter the same folder, and import the module by"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import mpegCoder\n")),(0,o.kt)("h2",{id:"compile-the-module"},"Compile the module"),(0,o.kt)("p",null,"If users need to compile the module by themselves, please follow the instructions on Github:"),(0,o.kt)("p",null,(0,o.kt)(i.Z,{to:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/blob/3.1.0/README.md",icon:m.Z,mdxType:"DarkButton"},"Compile with VS2019")))}f.isMDXComponent=!0},866:function(e,t){t.Z={body:'<path fill="currentColor" d="m10.94 13.5l-1.32 1.32a3.73 3.73 0 0 0-7.24 0L1.06 13.5L0 14.56l1.72 1.72l-.22.22V18H0v1.5h1.5v.08c.077.489.214.966.41 1.42L0 22.94L1.06 24l1.65-1.65A4.308 4.308 0 0 0 6 24a4.31 4.31 0 0 0 3.29-1.65L10.94 24L12 22.94L10.09 21c.198-.464.336-.951.41-1.45v-.1H12V18h-1.5v-1.5l-.22-.22L12 14.56l-1.06-1.06zM6 13.5a2.25 2.25 0 0 1 2.25 2.25h-4.5A2.25 2.25 0 0 1 6 13.5zm3 6a3.33 3.33 0 0 1-3 3a3.33 3.33 0 0 1-3-3v-2.25h6v2.25zm14.76-9.9v1.26L13.5 17.37V15.6l8.5-5.37L9 2v9.46a5.07 5.07 0 0 0-1.5-.72V.63L8.64 0l15.12 9.6z"/>',width:24,height:24}},7225:function(e,t){t.Z={body:'<path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m3 14h8v-2H8v2m8-7h-2.5V7h-3v3H8l4 4l4-4Z"/>',width:24,height:24}}}]);
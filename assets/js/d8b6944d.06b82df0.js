"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[9156],{8793:function(e,t,n){var o=n(7294),i=n(9960),r=n(1954),a=n(9575);t.Z=function(e){var t=(0,o.useState)(!1),n=t[0],l=t[1];(0,o.useEffect)((function(){l(!0)}),[]);var p,s,d,m=(p=(0,a.If)(),s=p.colorMode,p.setColorMode,"dark"===s?"button--secondary button--outline":"button--secondary");return d=e.index?"button "+m+" button--lg button--index":"button "+m+" button--lg",o.createElement(i.Z,{key:String(n),className:d,to:e.to},e.icon&&o.createElement(r.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},7881:function(e,t,n){n.r(t),n.d(t,{assets:function(){return k},contentTitle:function(){return h},default:function(){return N},frontMatter:function(){return u},metadata:function(){return c},toc:function(){return g}});var o=n(3117),i=n(102),r=(n(7294),n(3905)),a=n(8793),l=n(541),p=n(5514),s=n(3807),d=n(7225),m=["components"],u={id:"installation",title:"Troubleshooting for installation",sidebar_label:"Installation",slug:"/troubleshooting/installation",description:"The troubleshooting for installation."},h=void 0,c={unversionedId:"troubleshooting/installation",id:"troubleshooting/installation",title:"Troubleshooting for installation",description:"The troubleshooting for installation.",source:"@site/docs/troubleshooting/installation.mdx",sourceDirName:"troubleshooting",slug:"/troubleshooting/installation",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/next/troubleshooting/installation",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/docs/troubleshooting/installation.mdx",tags:[],version:"current",frontMatter:{id:"installation",title:"Troubleshooting for installation",sidebar_label:"Installation",slug:"/troubleshooting/installation",description:"The troubleshooting for installation."},sidebar:"docs",previous:{title:"Troubleshooting",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/next/category/troubleshooting"},next:{title:"Running",permalink:"/FFmpeg-Encoder-Decoder-for-Python/docs/next/troubleshooting/running"}},k={},g=[{value:"Introduction",id:"introduction",level:2},{value:"Questions and answers",id:"questions-and-answers",level:2},{value:"Meet permission denied and import failure during the first run",id:"meet-permission-denied-and-import-failure-during-the-first-run",level:3},{value:"DLL not found",id:"dll-not-found",level:3},{value:"<code>.so</code> not found",id:"so-not-found",level:3},{value:"<code>numpy.core.multiarray</code> not found",id:"numpycoremultiarray-not-found",level:3},{value:"GLibC not found",id:"glibc-not-found",level:3},{value:"Incorrect dependencies",id:"incorrect-dependencies",level:3}],f={toc:g};function N(e){var t=e.components,n=(0,i.Z)(e,m);return(0,r.kt)("wrapper",(0,o.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"If you could not find your problem in this page, please fire an issue:"),(0,r.kt)("p",null,(0,r.kt)(a.Z,{to:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues/new/choose",icon:s.Z,mdxType:"DarkButton"},"Fire an issue")),(0,r.kt)("h2",{id:"questions-and-answers"},"Questions and answers"),(0,r.kt)("h3",{id:"meet-permission-denied-and-import-failure-during-the-first-run"},"Meet permission denied and import failure during the first run"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Question"),": When I import ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," for the first time, why it fails to download something into the ",(0,r.kt)("inlineCode",{parentName:"p"},"site-pacakges")," folder?")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Answer"),": To reduce the size of the ",(0,r.kt)("inlineCode",{parentName:"p"},".whl")," package, in the newer release, I decide to not pack the ",(0,r.kt)("inlineCode",{parentName:"p"},".dll")," / ",(0,r.kt)("inlineCode",{parentName:"p"},".so")," dependencies with ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder"),". Instead, when importing ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," for the first time, it will automatically download the dependencies into the package folder. To ensure that you have the permission to fetch the dependencies, I recommend the following to solutions:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"The first solution is to install ",(0,r.kt)("inlineCode",{parentName:"li"},"mpegCoder")," in a virtual environment where you own the permission."),(0,r.kt)("li",{parentName:"ul"},"The second solution is to run ",(0,r.kt)("inlineCode",{parentName:"li"},'python -c "import mpegCoder"')," in Administrator mode or ",(0,r.kt)("inlineCode",{parentName:"li"},"sudo")," mode. This command will let ",(0,r.kt)("inlineCode",{parentName:"li"},"mpegCoder")," start to download the dependencies.")))),(0,r.kt)("h3",{id:"dll-not-found"},"DLL not found"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Question"),": When importing the module, why meeting the following error?"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"ImportError: DLL load failed while importing mpegCoder: The specified module could not be found.\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Answer"),": It seems that this error will only occurs when both the following conditions are satisfied:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"You are using Windows."),(0,r.kt)("li",{parentName:"ul"},"You are using the maunally installed ",(0,r.kt)("inlineCode",{parentName:"li"},"mpegCoder"),", not the pip version.")),(0,r.kt)("p",{parentName:"li"},"This error is caused by the absent of required dependencies. It is typically caused when:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Your python version does not match the ",(0,r.kt)("inlineCode",{parentName:"li"},"mpegCoder")," module."),(0,r.kt)("li",{parentName:"ul"},"The required DLL files are neither in the same folder of ",(0,r.kt)("inlineCode",{parentName:"li"},"mpegCoder.pyd"),", nor in the path (environment variable ",(0,r.kt)("inlineCode",{parentName:"li"},"PATH"),")."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Fix"),": Download the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.2.0/dll-win-ffmpeg_5_0.tar.xz"},"dependencies",(0,r.kt)(p.Z,{icon:d.Z,mdxType:"InlineIcon"}))," and extract the DLLs in the same folder of ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder.pyd"),"."))),(0,r.kt)("h3",{id:"so-not-found"},(0,r.kt)("inlineCode",{parentName:"h3"},".so")," not found"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Question"),": When importing the module, why meeting the following error?"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"ImportError: lib*****.so.**: cannot open shared object file: No such file or directory\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Answer"),": It seems that this error will only occurs when both the following conditions are satisfied:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"You are using Linux."),(0,r.kt)("li",{parentName:"ul"},"You are using the maunally installed ",(0,r.kt)("inlineCode",{parentName:"li"},"mpegCoder"),", not the pip version.")),(0,r.kt)("p",{parentName:"li"},"This error is caused by the absent of required dependencies. It is typically caused when:"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Your python version does not match the ",(0,r.kt)("inlineCode",{parentName:"li"},"mpegCoder")," module, in this case, the library name should be ",(0,r.kt)("inlineCode",{parentName:"li"},"libpython3.*.so.**"),"."),(0,r.kt)("li",{parentName:"ul"},"The required dependencies files are not in your environment variable ",(0,r.kt)("inlineCode",{parentName:"li"},"$LD_LIBRARY_PATH"),"."))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Fix"),": Download the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.2.0/so-linux-ffmpeg_5_0.tar.xz"},"dependencies",(0,r.kt)(p.Z,{icon:d.Z,mdxType:"InlineIcon"}))," and extract the missing ",(0,r.kt)("inlineCode",{parentName:"p"},".so")," to a folder in ",(0,r.kt)("inlineCode",{parentName:"p"},"$LD_LIBRARY_PATH"),"."))),(0,r.kt)("h3",{id:"numpycoremultiarray-not-found"},(0,r.kt)("inlineCode",{parentName:"h3"},"numpy.core.multiarray")," not found"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Question"),": When importing the module, why meeting the following error?"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"ImportError: numpy.core.multiarray failed to import\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Answer"),": You may not install ",(0,r.kt)("a",{parentName:"p",href:"https://numpy.org",title:"Numpy"},"Numpy",(0,r.kt)(l.Z,{mdxType:"IconExternalLink"})),", or your Numpy version is not match the pre-compiled ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder"),". In most cases, a little bit mismatch of the Numpy would not cause this error. Maybe your Numpy version is different from the requirement too much. See ",(0,r.kt)("a",{parentName:"p",href:"../installation/windows#download-mpegcoder"},"Compilation list (Win)")," or ",(0,r.kt)("a",{parentName:"p",href:"../installation/linux#download-mpegcoder"},"Compilation list (Linux)")," to find the best Numpy version.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Fix"),": Reinstall Numpy, or compile ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," by yourself."))),(0,r.kt)("h3",{id:"glibc-not-found"},"GLibC not found"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Question"),": When importing the module, why meeting the following error?"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"OSError: /lib/x86_64-linux-gnu/libm.so.6: version `GLIBC_2.29' not found (required by ******/mpegCoder/lib/libsrt.so.1.4)\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Answer"),": Your GLibC version is not ",(0,r.kt)("inlineCode",{parentName:"p"},">=2.29"),". To verify that, you could run"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"ldd --version\n")),(0,r.kt)("p",{parentName:"li"},"This problem often occurs when you are using an older Linux OS. The supported OS list could be found ",(0,r.kt)("a",{parentName:"p",href:"../installation/linux#import"},"here"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Fix"),": We recommend to compile and install GLibC ",(0,r.kt)("inlineCode",{parentName:"p"},">=2.29"),". However, if users want a faster hotfix. Please follow the follwing instructions."),(0,r.kt)("p",{parentName:"li"},"If you are using ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," from pip. You could find a folder named ",(0,r.kt)("inlineCode",{parentName:"p"},"lib-fix")," in where ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," is installed, then run the following command:"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"ln -sf <path-of-mpegCoder>/lib-fix/libm-2.31.so /lib/x86_64-linux-gnu/libm.so.6\n")),(0,r.kt)("p",{parentName:"li"},"The same file (",(0,r.kt)("inlineCode",{parentName:"p"},"libm-2.31.so"),") could be also found in the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.2.0/so-linux-ffmpeg_5_0.tar.xz"},"Linux dependencies",(0,r.kt)(p.Z,{icon:d.Z,mdxType:"InlineIcon"})),"."))),(0,r.kt)("h3",{id:"incorrect-dependencies"},"Incorrect dependencies"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Question"),": I have not installed any dependencies, and I am not using the PyPI version. Why could I import ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," successfully?")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Answer"),": You may have installed FFMpeg before. The FFMpeg libraries are already in your environment. It is danger to work with an incorrect FFMpeg version, because the FFMpeg APIs are keeping changing. Please ensure that your ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," version and your FFMpeg version are consistent.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Fix"),": Install ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," from PyPI, or download our dependencies, or compile ",(0,r.kt)("inlineCode",{parentName:"p"},"mpegCoder")," by yourself."))))}N.isMDXComponent=!0},7225:function(e,t){t.Z={body:'<path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m3 14h8v-2H8v2m8-7h-2.5V7h-3v3H8l4 4l4-4Z"/>',width:24,height:24}},3807:function(e,t){t.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75zM8 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2z"/>'}}}]);
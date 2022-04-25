"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[5207],{8793:function(e,t,n){var a=n(7294),r=n(9960),i=n(1954),o=n(9575);t.Z=function(e){var t=(0,a.useState)(!1),n=t[0],p=t[1];(0,a.useEffect)((function(){p(!0)}),[]);var l,m,d,u=(l=(0,o.If)(),m=l.colorMode,l.setColorMode,"dark"===m?"button--secondary button--outline":"button--secondary");return d=e.index?"button "+u+" button--lg button--index":"button "+u+" button--lg",a.createElement(r.Z,{key:String(n),className:d,to:e.to},e.icon&&a.createElement(i.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.3rem",marginRight:"1ex"}}),e.children)}},8090:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return C},frontMatter:function(){return k},metadata:function(){return N},toc:function(){return g}});var a=n(3117),r=n(102),i=(n(7294),n(3905)),o=n(8793),p=n(541),l=n(5514),m=n(3807),d=n(7225),u=["components"],k={id:"installation",title:"\u4e0e\u5b89\u88c5\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c",sidebar_label:"\u4e0e\u5b89\u88c5\u76f8\u5173",slug:"/troubleshooting/installation",description:"\u4e0e\u5b89\u88c5\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c\u3002"},s=void 0,N={unversionedId:"troubleshooting/installation",id:"troubleshooting/installation",title:"\u4e0e\u5b89\u88c5\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c",description:"\u4e0e\u5b89\u88c5\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c\u3002",source:"@site/i18n/zh-cn/docusaurus-plugin-content-docs/current/troubleshooting/installation.mdx",sourceDirName:"troubleshooting",slug:"/troubleshooting/installation",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/troubleshooting/installation",editUrl:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/docs/troubleshooting/installation.mdx",tags:[],version:"current",frontMatter:{id:"installation",title:"\u4e0e\u5b89\u88c5\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c",sidebar_label:"\u4e0e\u5b89\u88c5\u76f8\u5173",slug:"/troubleshooting/installation",description:"\u4e0e\u5b89\u88c5\u76f8\u5173\u7684\u5e38\u89c1\u6545\u969c\u3002"},sidebar:"docs",previous:{title:"Troubleshooting",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/category/troubleshooting"},next:{title:"\u4e0e\u8fd0\u884c\u76f8\u5173",permalink:"/FFmpeg-Encoder-Decoder-for-Python/zh-cn/docs/next/troubleshooting/running"}},c={},g=[{value:"\u7b80\u4ecb",id:"introduction",level:2},{value:"\u95ee\u4e0e\u7b54",id:"questions-and-answers",level:2},{value:"\u5728\u7b2c\u4e00\u6b21\u5bfc\u5165\u7684\u65f6\u5019\u3001\u9047\u5230\u6743\u9650\u95ee\u9898",id:"meet-permission-denied-and-import-failure-during-the-first-run",level:3},{value:"\u627e\u4e0d\u5230DLL",id:"dll-not-found",level:3},{value:"\u627e\u4e0d\u5230<code>.so</code>",id:"so-not-found",level:3},{value:"\u627e\u4e0d\u5230<code>numpy.core.multiarray</code>",id:"numpycoremultiarray-not-found",level:3},{value:"\u627e\u4e0d\u5230GLibC",id:"glibc-not-found",level:3},{value:"\u4e0d\u6b63\u786e\u7684\u4f9d\u8d56\u9879",id:"incorrect-dependencies",level:3},{value:"<code>tqdm</code>\u7f3a\u5c11\u5c5e\u6027<code>wrapattr</code>",id:"tqdm-has-no-attribute-wrapattr",level:3}],h={toc:g};function C(e){var t=e.components,n=(0,r.Z)(e,u);return(0,i.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"introduction"},"\u7b80\u4ecb"),(0,i.kt)("p",null,"\u5982\u679c\u4f60\u65e0\u6cd5\u901a\u8fc7\u672c\u9875\u89e3\u51b3\u4f60\u7684\u95ee\u9898\uff0c\u8bf7\u901a\u8fc7\u4ee5\u4e0b\u6309\u94ae\u63d0\u51fa\u95ee\u9898\uff1a"),(0,i.kt)("p",null,(0,i.kt)(o.Z,{to:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/issues/new/choose",icon:m.Z,mdxType:"DarkButton"},"\u63d0\u51fa\u95ee\u9898")),(0,i.kt)("h2",{id:"questions-and-answers"},"\u95ee\u4e0e\u7b54"),(0,i.kt)("h3",{id:"meet-permission-denied-and-import-failure-during-the-first-run"},"\u5728\u7b2c\u4e00\u6b21\u5bfc\u5165\u7684\u65f6\u5019\u3001\u9047\u5230\u6743\u9650\u95ee\u9898"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u6211\u8bd5\u7740\u7b2c\u4e00\u6b21\u5bfc\u5165",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u7684\u65f6\u5019\uff0c\u4e3a\u4f55\u4f1a\u9047\u5230\u65e0\u6cd5\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"site-pacakges"),"\u76ee\u5f55\u4e0b\u5199\u5165\u67d0\u4e9b\u5185\u5bb9\u7684\u95ee\u9898\uff1f")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u7b54"),": \u4e3a\u4e86\u51cf\u5c0f",(0,i.kt)("inlineCode",{parentName:"p"},".whl"),"\u5305\u7684\u4f53\u79ef\uff0c\u5728\u65b0\u7684\u53d1\u884c\u7248\u91cc\uff0c\u6211\u51b3\u5b9a\u4e0d\u518d\u628a\u90a3\u4e9b",(0,i.kt)("inlineCode",{parentName:"p"},".dll")," / ",(0,i.kt)("inlineCode",{parentName:"p"},".so"),"\u683c\u5f0f\u7684\u4f9d\u8d56\u5e93\u548c",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u6253\u5305\u5728\u4e00\u8d77\u3002\u53d6\u800c\u4ee3\u4e4b\u7684\u662f\uff0c\u5f53\u7528\u6237\u7b2c\u4e00\u6b21\u8fd0\u884c",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u65f6\uff0c\u4f9d\u8d56\u9879\u4f1a\u88ab\u81ea\u52a8\u4e0b\u8f7d\u5230\u5e93\u7684\u76ee\u5f55\u91cc\u3002\u4e3a\u4e86\u786e\u4fdd\u7528\u6237\u6709\u6743\u9650\u83b7\u53d6\u90a3\u4e9b\u4f9d\u8d56\u9879\uff0c\u8fd9\u91cc\u5efa\u8bae\u4e24\u79cd\u65b9\u6848\u62e9\u4e00\uff1a"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"\u7b2c\u4e00\u79cd\u65b9\u6848\u662f\u5c06",(0,i.kt)("inlineCode",{parentName:"li"},"mpegCoder"),"\u5b89\u88c5\u5728\u7528\u6237\u6709\u6743\u9650\u7684\u865a\u73af\u5883\u91cc\u3002"),(0,i.kt)("li",{parentName:"ul"},"\u7b2c\u4e8c\u79cd\u65b9\u6848\u662f\uff0c\u5728\u7ba1\u7406\u5458\u6a21\u5f0f\u6216",(0,i.kt)("inlineCode",{parentName:"li"},"sudo"),"\u6a21\u5f0f\u4e0b\u3001\u8fd0\u884c\u4e00\u884c\u547d\u4ee4\uff1a",(0,i.kt)("inlineCode",{parentName:"li"},'python -c "import mpegCoder"'),"\u3002\u8be5\u547d\u4ee4\u4f1a\u89e6\u53d1",(0,i.kt)("inlineCode",{parentName:"li"},"mpegCoder"),"\u4e0b\u8f7d\u4f9d\u8d56\u9879\u7684\u884c\u4e3a\u3002")))),(0,i.kt)("h3",{id:"dll-not-found"},"\u627e\u4e0d\u5230DLL"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u6211\u5bfc\u5165\uff08import\uff09\u6a21\u5757\u7684\u65f6\u5019\uff0c\u4e3a\u4ec0\u4e48\u4f1a\u9047\u5230\u4ee5\u4e0b\u9519\u8bef\uff1f"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"ImportError: DLL load failed while importing mpegCoder: The specified module could not be found.\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u7b54"),": \u8fd9\u4e2a\u95ee\u9898\u4f3c\u4e4e\u53ea\u4f1a\u5728\u4ee5\u4e0b\u6761\u4ef6\u7686\u6ee1\u8db3\u7684\u65f6\u5019\u51fa\u73b0\uff1a"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"\u4f60\u6b63\u5728\u4f7f\u7528Windows\uff1b"),(0,i.kt)("li",{parentName:"ul"},"\u4f60\u6b63\u5728\u4f7f\u7528\u624b\u52a8\u5b89\u88c5\u7684",(0,i.kt)("inlineCode",{parentName:"li"},"mpegCoder"),"\uff0c\u800c\u975epip\u5b89\u88c5\u7684\u7248\u672c\u3002")),(0,i.kt)("p",{parentName:"li"},"\u8be5\u9519\u8bef\u662f\u7531\u4e8e\u7f3a\u5c11\u5fc5\u8981\u7684\u4f9d\u8d56\u9879\u5bfc\u81f4\u7684\u3002\u4e3b\u8981\u51fa\u73b0\u5728\u4ee5\u4e0b\u51e0\u79cd\u60c5\u51b5\u4e4b\u4e00\uff1a"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"\u4f60\u7684Python\u7248\u672c\u548c\u9884\u7f16\u8bd1\u7684",(0,i.kt)("inlineCode",{parentName:"li"},"mpegCoder"),"\u6a21\u5757\u4e0d\u5339\u914d\uff1b"),(0,i.kt)("li",{parentName:"ul"},"\u6240\u4f9d\u8d56\u7684DLL\u6587\u4ef6\u65e2\u6ca1\u6709\u548c",(0,i.kt)("inlineCode",{parentName:"li"},"mpegCoder.pyd"),"\u653e\u5728\u540c\u4e00\u6587\u4ef6\u5939\uff0c\u4e5f\u6ca1\u6709\u51fa\u73b0\u5728\u73af\u5883\u8def\u5f84\u91cc\uff08\u5373\u540d\u4e3a",(0,i.kt)("inlineCode",{parentName:"li"},"PATH"),"\u7684\u73af\u5883\u53d8\u91cf\uff09\u3002"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u4fee\u590d"),": \u4e0b\u8f7d",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.2.0/dll-win-ffmpeg_5_0.tar.xz"},"\u4f9d\u8d56\u9879",(0,i.kt)(l.Z,{icon:d.Z,mdxType:"InlineIcon"})),"\u5e76\u5c06\u5176\u4e2d\u5305\u542b\u7684DLL\u6587\u4ef6\u89e3\u538b\u5230",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder.pyd"),"\u6240\u5728\u7684\u76ee\u5f55\u4e0b\u3002"))),(0,i.kt)("h3",{id:"so-not-found"},"\u627e\u4e0d\u5230",(0,i.kt)("inlineCode",{parentName:"h3"},".so")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u6211\u5bfc\u5165\u6a21\u5757\u7684\u65f6\u5019\uff0c\u4e3a\u4ec0\u4e48\u4f1a\u9047\u5230\u4ee5\u4e0b\u9519\u8bef\uff1f"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"ImportError: lib*****.so.**: cannot open shared object file: No such file or directory\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u7b54"),": \u8fd9\u4e2a\u95ee\u9898\u4f3c\u4e4e\u53ea\u4f1a\u5728\u4ee5\u4e0b\u6761\u4ef6\u7686\u6ee1\u8db3\u7684\u65f6\u5019\u51fa\u73b0\uff1a"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"\u4f60\u6b63\u5728\u4f7f\u7528Linux\uff1b"),(0,i.kt)("li",{parentName:"ul"},"\u4f60\u6b63\u5728\u4f7f\u7528\u624b\u52a8\u5b89\u88c5\u7684",(0,i.kt)("inlineCode",{parentName:"li"},"mpegCoder"),"\uff0c\u800c\u975epip\u5b89\u88c5\u7684\u7248\u672c\u3002")),(0,i.kt)("p",{parentName:"li"},"\u8be5\u9519\u8bef\u662f\u7531\u4e8e\u7f3a\u5c11\u5fc5\u8981\u7684\u4f9d\u8d56\u9879\u5bfc\u81f4\u7684\u3002\u4e3b\u8981\u51fa\u73b0\u5728\u4ee5\u4e0b\u51e0\u79cd\u60c5\u51b5\u4e4b\u4e00\uff1a"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"\u4f60\u7684Python\u7248\u672c\u548c\u9884\u7f16\u8bd1\u7684",(0,i.kt)("inlineCode",{parentName:"li"},"mpegCoder"),"\u6a21\u5757\u4e0d\u5339\u914d\uff0c\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u663e\u793a\u6240\u7f3a\u5c11\u7684\u5e93\u540d\u5b57\u5c06\u4f1a\u5f62\u5982",(0,i.kt)("inlineCode",{parentName:"li"},"libpython3.*.so.**"),"\uff1b"),(0,i.kt)("li",{parentName:"ul"},"\u6240\u4f9d\u8d56\u7684\u52a8\u6001\u5e93\u6587\u4ef6\u6ca1\u6709\u88ab\u6dfb\u52a0\u5230\u4f60\u7684\u73af\u5883\u53d8\u91cf",(0,i.kt)("inlineCode",{parentName:"li"},"$LD_LIBRARY_PATH"),"\u91cc\u3002"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u4fee\u590d"),": \u4e0b\u8f7d",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.2.0/so-linux-ffmpeg_5_0.tar.xz"},"\u4f9d\u8d56\u9879",(0,i.kt)(l.Z,{icon:d.Z,mdxType:"InlineIcon"})),"\u5e76\u5c06\u5176\u4e2d\u5305\u542b\u7684\u3001\u6240\u7f3a\u5c11\u7684",(0,i.kt)("inlineCode",{parentName:"p"},".so"),"\u6587\u4ef6\u89e3\u538b\u5230\u4e00\u4e2a\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"$LD_LIBRARY_PATH"),"\u91cc\u7684\u6587\u4ef6\u5939\u5185\u3002"))),(0,i.kt)("h3",{id:"numpycoremultiarray-not-found"},"\u627e\u4e0d\u5230",(0,i.kt)("inlineCode",{parentName:"h3"},"numpy.core.multiarray")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u6211\u5bfc\u5165\u6a21\u5757\u7684\u65f6\u5019\uff0c\u4e3a\u4ec0\u4e48\u4f1a\u9047\u5230\u4ee5\u4e0b\u9519\u8bef\uff1f"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"ImportError: numpy.core.multiarray failed to import\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u7b54"),": \u4f60\u53ef\u80fd\u6ca1\u6709\u5b89\u88c5",(0,i.kt)("a",{parentName:"p",href:"https://numpy.org",title:"Numpy"},"Numpy",(0,i.kt)(p.Z,{mdxType:"IconExternalLink"})),"\uff0c\u6216\u8005\u4f60\u5b89\u88c5\u7684Numpy\u7248\u672c\u548c\u9884\u7f16\u8bd1\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u4e0d\u5339\u914d\u3002\u5982\u679c\u662f\u7531\u7248\u672c\u4e0d\u4e00\u81f4\u5f15\u8d77\u7684\u95ee\u9898\uff0c\u4e00\u822c\u6765\u8bf4\u8f83\u5c0f\u7684\u7248\u672c\u5dee\u4e0d\u4f1a\u9020\u6210\u9519\u8bef\u3002\u53ef\u80fd\u4f60\u4f7f\u7528\u7684Numpy\u4e0e\u4f5c\u8005\u9884\u7f16\u8bd1\u65f6\u7684Numpy\u7248\u672c\u5dee\u522b\u592a\u5927\u4e86\u3002\u53ef\u4ee5\u53c2\u89c1",(0,i.kt)("a",{parentName:"p",href:"../installation/windows#download-mpegcoder"},"\u9884\u7f16\u8bd1\u5217\u8868\uff08Win\uff09"),"\u6216",(0,i.kt)("a",{parentName:"p",href:"../installation/linux#download-mpegcoder"},"\u9884\u7f16\u8bd1\u5217\u8868\uff08Linux\uff09"),"\u6765\u627e\u5230\u5bf9\u5e94\u6700\u4f73\u7684Numpy\u7248\u672c\u3002")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u4fee\u590d"),": \u91cd\u88c5Numpy\uff0c\u6216\u8005\u81ea\u884c\u7f16\u8bd1",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u3002"))),(0,i.kt)("h3",{id:"glibc-not-found"},"\u627e\u4e0d\u5230GLibC"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u6211\u5bfc\u5165\u6a21\u5757\u7684\u65f6\u5019\uff0c\u4e3a\u4ec0\u4e48\u4f1a\u9047\u5230\u4ee5\u4e0b\u9519\u8bef\uff1f"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"OSError: /lib/x86_64-linux-gnu/libm.so.6: version `GLIBC_2.29' not found (required by ******/mpegCoder/lib/libsrt.so.1.4)\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u7b54"),": \u4f60\u7684GLibC\u7248\u672c\u6ca1\u6709\u8fbe\u5230\u8981\u6c42\uff08",(0,i.kt)("inlineCode",{parentName:"p"},">=2.29"),"\uff09\u3002\u8981\u60f3\u786e\u8ba4\u662f\u8fd9\u4e2a\u539f\u56e0\uff0c\u53ef\u4ee5\u8fd0\u884c"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"ldd --version\n")),(0,i.kt)("p",{parentName:"li"},"\u8be5\u95ee\u9898\u5f80\u5f80\u5728\u4f7f\u7528\u8f83\u65e9\u7248\u672c\u7684Linux\u53d1\u884c\u7248\u7cfb\u7edf\u65f6\u51fa\u73b0\u3002\u76ee\u524d\u6240\u652f\u6301\u7684\u64cd\u4f5c\u7cfb\u7edf\u5217\u8868\u53ef\u4ee5\u53c2\u89c1",(0,i.kt)("a",{parentName:"p",href:"../installation/linux#import"},"\u8fd9\u91cc"),"\u3002")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u4fee\u590d"),": \u63a8\u8350\u7f16\u8bd1\u5e76\u5b89\u88c5GLibC ",(0,i.kt)("inlineCode",{parentName:"p"},">=2.29"),"\u3002\u4f46\u662f\uff0c\u5982\u679c\u7528\u6237\u4e0d\u60f3\u8fd9\u6837\u505a\uff0c\u800c\u662f\u60f3\u8981\u4e00\u4e2a\u5feb\u901f\u4fee\u590d\u7684\u8865\u4e01\uff0c\u90a3\u4e48\u53ef\u4ee5\u6309\u4ee5\u4e0b\u6b65\u9aa4\u7167\u505a\u3002"),(0,i.kt)("p",{parentName:"li"},"\u5982\u679c\u4f60\u4f7f\u7528\u7684\u662fpip\u5b89\u88c5\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u3002\u4f60\u9700\u8981\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u7684\u5b89\u88c5\u76ee\u5f55\u4e0b\uff0c\u627e\u5230\u4e00\u4e2a\u540d\u4e3a",(0,i.kt)("inlineCode",{parentName:"p"},"lib-fix"),"\u7684\u6587\u4ef6\u5939\uff0c\u7136\u540e\u8fd0\u884c\u4ee5\u4e0b\u547d\u4ee4"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"ln -sf <path-of-mpegCoder>/lib-fix/libm-2.31.so /lib/x86_64-linux-gnu/libm.so.6\n")),(0,i.kt)("p",{parentName:"li"},"\u8fd9\u4e2a\u6587\u4ef6\uff08",(0,i.kt)("inlineCode",{parentName:"p"},"libm-2.31.so"),"\uff09\u4e5f\u53ef\u4ee5\u5728",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/releases/download/deps-3.2.0/so-linux-ffmpeg_5_0.tar.xz"},"Linux\u4f9d\u8d56\u9879",(0,i.kt)(l.Z,{icon:d.Z,mdxType:"InlineIcon"})),"\u91cc\u627e\u5230\u3002"))),(0,i.kt)("h3",{id:"incorrect-dependencies"},"\u4e0d\u6b63\u786e\u7684\u4f9d\u8d56\u9879"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u95ee"),": \u6211\u6ca1\u6709\u5b89\u88c5\u4efb\u4f55\u4f9d\u8d56\u9879\uff0c\u6211\u4e5f\u6ca1\u6709\u4f7f\u7528\u4ecePyPI\u5b89\u88c5\u7684\u7248\u672c\u3002\u4e3a\u4ec0\u4e48\u6211\u53ef\u4ee5\u6210\u529f\u5bfc\u5165",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\uff1f")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u7b54"),": \u4f60\u5f88\u53ef\u80fd\u4e4b\u524d\u5b89\u88c5\u8fc7FFMpeg\u3002\u6362\u8a00\u4e4b\uff0cFFMpeg\u5e93\u5df2\u7ecf\u5728\u4f60\u7684\u73af\u5883\u91cc\u4e86\u3002\u8003\u8651\u5230FFMpeg\u7684API\u968f\u7740\u7248\u672c\u5728\u4e0d\u505c\u53d8\u5316\uff0c\u5c06\u672c\u9879\u76ee\u548c\u4e00\u4e2a\u4e0d\u5339\u914d\u7684FFMpeg\u8fde\u7528\u662f\u5371\u9669\u7684\u3002\u8bf7\u786e\u4fdd\u4f60\u4f7f\u7528\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u7248\u672c\u548c\u4f60\u7684FFMpeg\u7248\u672c\u4e00\u81f4\u3002")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u4fee\u590d"),": \u4ecePyPI\u5b89\u88c5",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\uff0c\u6216\u8005\u4e0b\u8f7d\u6b63\u786e\u7684\u4f9d\u8d56\u9879\uff0c\u6216\u8005\u81ea\u884c\u7f16\u8bd1",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u3002"))),(0,i.kt)("h3",{id:"tqdm-has-no-attribute-wrapattr"},(0,i.kt)("inlineCode",{parentName:"h3"},"tqdm"),"\u7f3a\u5c11\u5c5e\u6027",(0,i.kt)("inlineCode",{parentName:"h3"},"wrapattr")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u95ee"),": \u5f53\u6211\u5bfc\u5165\u6a21\u5757\u7684\u65f6\u5019\uff0c\u4e3a\u4ec0\u4e48\u4f1a\u9047\u5230\u4ee5\u4e0b\u9519\u8bef\uff1f"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"AttributeError: type object 'tqdm' has no attribute 'wrapattr'\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u7b54"),": \u8fd9\u4e2a\u95ee\u9898\u53ea\u51fa\u73b0\u5728\u4ece",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder==3.1.0b0"),"\u5230",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder==3.2.3"),"\u8fd9\u51e0\u4e2a\u7248\u672c\u3002\u5176\u4e2d\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"tqdm"),"\u4f5c\u4e3a\u4e00\u4e2a\u53ef\u9009\u7684\u5305\uff0c\u5176\u5b9e\u6ca1\u6709\u88ab\u5217\u5728\u4f9d\u8d56\u9879\u5217\u8868\u91cc\u3002 \u7136\u5219\uff0c\u8fd9\u4e2a\u53ef\u9009\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"tqdm"),"\u9700\u8981\u63d0\u4f9b\u4e00\u4e2a\u6700\u65e9\u5b9e\u73b0\u5728",(0,i.kt)("inlineCode",{parentName:"p"},"tqdm==4.40.0"),"\u4e2d\u7684\u63a5\u53e3",(0,i.kt)("a",{parentName:"p",href:"https://tqdm.github.io/docs/tqdm/#wrapattr",title:"tqdm.tqdm.wrapattr"},(0,i.kt)("inlineCode",{parentName:"a"},"tqdm.tqdm.wrapattr"),(0,i.kt)(p.Z,{mdxType:"IconExternalLink"})),"\u3002\u6362\u8a00\u4e4b\uff0c\u5982\u679c\u7528\u6237\u6b64\u5148\u5b89\u88c5\u4e86",(0,i.kt)("inlineCode",{parentName:"p"},"tqdm<4.40.0"),"\uff0c\u5219\u8fd9\u4f1a\u89e6\u53d1\u8fd9\u4e00\u6545\u969c\u3002\u53e6\u4e00\u65b9\u9762\u6765\u8bf4\uff0c\u5982\u679c\u6ca1\u6709\u5b89\u88c5\u8fc7",(0,i.kt)("inlineCode",{parentName:"p"},"tqdm"),"\u3001\u6291\u6216\u662f\u5b89\u88c5\u4e86",(0,i.kt)("inlineCode",{parentName:"p"},"tqdm>=4.40.0"),"\uff0c\u4e5f\u4e0d\u4f1a\u9047\u5230\u8fd9\u4e00\u95ee\u9898\u3002")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"\u4fee\u590d"),": \u8981\u89e3\u51b3\u8fd9\u4e00\u95ee\u9898\uff0c\u8bf7\u5347\u7ea7\u5230",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder>=3.2.4"),"\u3002\u6216\u8005\uff0c\u4e5f\u53ef\u4ee5\u4fdd\u7559",(0,i.kt)("inlineCode",{parentName:"p"},"mpegCoder"),"\u7248\u672c\uff0c\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5347\u7ea7",(0,i.kt)("inlineCode",{parentName:"p"},"tqdm"),"\uff1a"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'python -m pip install "tqdm>=4.40.0"\n')))))}C.isMDXComponent=!0},7225:function(e,t){t.Z={body:'<path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2m3 14h8v-2H8v2m8-7h-2.5V7h-3v3H8l4 4l4-4Z"/>',width:24,height:24}},3807:function(e,t){t.Z={body:'<path fill="currentColor" fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm6.5-.25A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75zM8 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2z"/>'}}}]);
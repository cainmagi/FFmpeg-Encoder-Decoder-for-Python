"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[1545],{9649:function(e,t,n){n.d(t,{Z:function(){return y}});var a=n(3117),r=n(102),o=n(7294),l=n(6010),i=n(5999),c=n(9575),s="anchorWithStickyNavbar_mojV",u="anchorWithHideOnScrollNavbar_R0VQ",m=["as","id"],d=["as"];function p(e){var t=e.as,n=e.id,d=(0,r.Z)(e,m),p=(0,c.LU)().navbar.hideOnScroll;return n?o.createElement(t,(0,a.Z)({},d,{className:(0,l.Z)("anchor",p?u:s),id:n}),d.children,o.createElement("a",{className:"hash-link",href:"#"+n,title:(0,i.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):o.createElement(t,d)}function y(e){var t=e.as,n=(0,r.Z)(e,d);return"h1"===t?o.createElement("h1",(0,a.Z)({},n,{id:void 0}),n.children):o.createElement(p,(0,a.Z)({as:t},n))}},7459:function(e,t,n){n.d(t,{Z:function(){return F}});var a=n(7294),r=n(3905),o=n(3117),l=n(102),i=n(5742),c=["mdxType","originalType"];var s=n(6010),u={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},m={Prism:n(7410).default,theme:u};function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(){return p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},p.apply(this,arguments)}var y=/\r\n|\r|\n/,v=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},h=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},f=function(e,t){var n=e.plain,a=Object.create(null),r=e.styles.reduce((function(e,n){var a=n.languages,r=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=p({},e[t],r);e[t]=n})),e}),a);return r.root=n,r.plain=p({},n,{backgroundColor:null}),r};function g(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}var k=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),d(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?f(e.theme,e.language):void 0;return t.themeDict=n})),d(this,"getLineProps",(function(e){var n=e.key,a=e.className,r=e.style,o=p({},g(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(o.style=l.plain),void 0!==r&&(o.style=void 0!==o.style?p({},o.style,r):r),void 0!==n&&(o.key=n),a&&(o.className+=" "+a),o})),d(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,r=n.length,o=t.getThemeDict(t.props);if(void 0!==o){if(1===r&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===r&&!a)return o[n[0]];var l=a?{display:"inline-block"}:{},i=n.map((function(e){return o[e]}));return Object.assign.apply(Object,[l].concat(i))}})),d(this,"getTokenProps",(function(e){var n=e.key,a=e.className,r=e.style,o=e.token,l=p({},g(e,["key","className","style","token"]),{className:"token "+o.types.join(" "),children:o.content,style:t.getStyleForToken(o),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?p({},l.style,r):r),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),d(this,"tokenize",(function(e,t,n,a){var r={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",r);var o=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,r=e.children,o=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],a=[0],r=[e.length],o=0,l=0,i=[],c=[i];l>-1;){for(;(o=a[l]++)<r[l];){var s=void 0,u=t[l],m=n[l][o];if("string"==typeof m?(u=l>0?u:["plain"],s=m):(u=h(u,m.type),m.alias&&(u=h(u,m.alias)),s=m.content),"string"==typeof s){var d=s.split(y),p=d.length;i.push({types:u,content:d[0]});for(var f=1;f<p;f++)v(i),c.push(i=[]),i.push({types:u,content:d[f]})}else l++,t.push(u),n.push(s),a.push(0),r.push(s.length)}l--,t.pop(),n.pop(),a.pop(),r.pop()}return v(i),c}(void 0!==l?this.tokenize(t,a,l,n):[a]),className:"prism-code language-"+n,style:void 0!==o?o.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(a.Component),b=k,E=n(9575);var N=n(5999),Z="copyButton_eDfN",C="copyButtonCopied_ljy5",_="copyButtonIcons_W9eQ",L="copyButtonIcon_XEyF",T="copyButtonSuccessIcon_i9w9";function x(e){var t=e.code,n=(0,a.useState)(!1),r=n[0],o=n[1],l=(0,a.useRef)(void 0),i=(0,a.useCallback)((function(){!function(e,t){var n=(void 0===t?{}:t).target,a=void 0===n?document.body:n,r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";var l=document.getSelection(),i=!1;l.rangeCount>0&&(i=l.getRangeAt(0)),a.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;var c=!1;try{c=document.execCommand("copy")}catch(s){}r.remove(),i&&(l.removeAllRanges(),l.addRange(i)),o&&o.focus()}(t),o(!0),l.current=window.setTimeout((function(){o(!1)}),1e3)}),[t]);return(0,a.useEffect)((function(){return function(){return window.clearTimeout(l.current)}}),[]),a.createElement("button",{type:"button","aria-label":r?(0,N.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,N.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,N.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,s.Z)(Z,"clean-btn",r&&C),onClick:i},a.createElement("span",{className:_,"aria-hidden":"true"},a.createElement("svg",{className:L,viewBox:"0 0 24 24"},a.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),a.createElement("svg",{className:T,viewBox:"0 0 24 24"},a.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}var A="codeBlockContainer_I0IT",B="codeBlockContent_wNvx",H="codeBlockTitle_BvAR",O="codeBlock_jd64",S="codeBlockStandalone_csWH",j="codeBlockLines_mRuA";function w(e){var t,n=e.children,r=e.className,l=void 0===r?"":r,i=e.metastring,c=e.title,u=e.language,d=(0,E.LU)().prism,p=(0,a.useState)(!1),y=p[0],v=p[1];(0,a.useEffect)((function(){v(!0)}),[]);var h=(0,E.bc)(i)||c,f=(0,E.pJ)();if(a.Children.toArray(n).some((function(e){return(0,a.isValidElement)(e)})))return a.createElement(b,(0,o.Z)({},m,{key:String(y),theme:f,code:"",language:"text"}),(function(e){var t=e.className,r=e.style;return a.createElement("pre",{tabIndex:0,className:(0,s.Z)(t,S,"thin-scrollbar",A,l,E.kM.common.codeBlock),style:r},a.createElement("code",{className:j},n))}));var g=Array.isArray(n)?n.join(""):n,k=null!=(t=null!=u?u:(0,E.Vo)(l))?t:d.defaultLanguage,N=(0,E.nZ)(g,i,k),Z=N.highlightLines,C=N.code;return a.createElement(b,(0,o.Z)({},m,{key:String(y),theme:f,code:C,language:null!=k?k:"text"}),(function(e){var t,n=e.className,r=e.style,i=e.tokens,c=e.getLineProps,u=e.getTokenProps;return a.createElement("div",{className:(0,s.Z)(A,l,(t={},t["language-"+k]=k&&!l.includes("language-"+k),t),E.kM.common.codeBlock)},h&&a.createElement("div",{style:r,className:H},h),a.createElement("div",{className:B,style:r},a.createElement("pre",{tabIndex:0,className:(0,s.Z)(n,O,"thin-scrollbar")},a.createElement("code",{className:j},i.map((function(e,t){1===e.length&&"\n"===e[0].content&&(e[0].content="");var n=c({line:e,key:t});return Z.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),a.createElement("span",(0,o.Z)({key:t},n),e.map((function(e,t){return a.createElement("span",(0,o.Z)({key:t},u({token:e,key:t})))})),a.createElement("br",null))})))),a.createElement(x,{code:C})))}))}var P=n(9960);var I="details_BAp3";function V(e){var t=Object.assign({},e);return a.createElement(E.PO,(0,o.Z)({},t,{className:(0,s.Z)("alert alert--info",I,t.className)}))}var D=n(9649);function M(e){return a.createElement(D.Z,e)}var R="img_E7b_";var z={head:function(e){var t=a.Children.map(e.children,(function(e){return function(e){var t,n;if(null!=e&&null!=(t=e.props)&&t.mdxType&&null!=e&&null!=(n=e.props)&&n.originalType){var r=e.props,o=(r.mdxType,r.originalType,(0,l.Z)(r,c));return a.createElement(e.props.originalType,o)}return e}(e)}));return a.createElement(i.Z,e,t)},code:function(e){var t=["a","b","big","i","span","em","strong","sup","sub","small"];return a.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")||(0,a.isValidElement)(e)&&t.includes(e.props.mdxType)}))?a.createElement("code",e):a.createElement(w,e)},a:function(e){return a.createElement(P.Z,e)},pre:function(e){var t;return a.createElement(w,(0,a.isValidElement)(e.children)&&"code"===e.children.props.originalType?null==(t=e.children)?void 0:t.props:Object.assign({},e))},details:function(e){var t=a.Children.toArray(e.children),n=t.find((function(e){var t;return"summary"===(null==e||null==(t=e.props)?void 0:t.mdxType)})),r=a.createElement(a.Fragment,null,t.filter((function(e){return e!==n})));return a.createElement(V,(0,o.Z)({},e,{summary:n}),r)},ul:function(e){return a.createElement("ul",(0,o.Z)({},e,{className:(t=e.className,(0,s.Z)(t,(null==t?void 0:t.includes("contains-task-list"))&&"contains-task-list_tsSF"))}));var t},img:function(e){return a.createElement("img",(0,o.Z)({loading:"lazy"},e,{className:(t=e.className,(0,s.Z)(t,R))}));var t},h1:function(e){return a.createElement(M,(0,o.Z)({as:"h1"},e))},h2:function(e){return a.createElement(M,(0,o.Z)({as:"h2"},e))},h3:function(e){return a.createElement(M,(0,o.Z)({as:"h3"},e))},h4:function(e){return a.createElement(M,(0,o.Z)({as:"h4"},e))},h5:function(e){return a.createElement(M,(0,o.Z)({as:"h5"},e))},h6:function(e){return a.createElement(M,(0,o.Z)({as:"h6"},e))}};function F(e){var t=e.children;return a.createElement(r.Zo,{components:z},t)}},1575:function(e,t,n){n.d(t,{Z:function(){return u}});var a=n(3117),r=n(102),o=n(7294),l=n(6010),i=n(5002),c="tableOfContents_cNA8",s=["className"];function u(e){var t=e.className,n=(0,r.Z)(e,s);return o.createElement("div",{className:(0,l.Z)(c,"thin-scrollbar",t)},o.createElement(i.Z,(0,a.Z)({},n,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},5002:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(3117),r=n(102),o=n(7294),l=n(9575),i=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function c(e){var t=e.toc,n=e.className,a=e.linkClassName,r=e.isChild;return t.length?o.createElement("ul",{className:r?void 0:n},t.map((function(e){return o.createElement("li",{key:e.id},o.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),o.createElement(c,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function s(e){var t=e.toc,n=e.className,s=void 0===n?"table-of-contents table-of-contents__left-border":n,u=e.linkClassName,m=void 0===u?"table-of-contents__link":u,d=e.linkActiveClassName,p=void 0===d?void 0:d,y=e.minHeadingLevel,v=e.maxHeadingLevel,h=(0,r.Z)(e,i),f=(0,l.LU)(),g=null!=y?y:f.tableOfContents.minHeadingLevel,k=null!=v?v:f.tableOfContents.maxHeadingLevel,b=(0,l.b9)({toc:t,minHeadingLevel:g,maxHeadingLevel:k}),E=(0,o.useMemo)((function(){if(m&&p)return{linkClassName:m,linkActiveClassName:p,minHeadingLevel:g,maxHeadingLevel:k}}),[m,p,g,k]);return(0,l.Si)(E),o.createElement(c,(0,a.Z)({toc:b,className:s,linkClassName:m},h))}}}]);
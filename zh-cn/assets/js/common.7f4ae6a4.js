(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[592],{7248:function(e,t,n){"use strict";t.Wb=void 0;var r,i=(r=n(7294))&&r.__esModule?r:{default:r};function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=0,c=/(-?[0-9.]*[0-9]+[0-9.]*)/g,u=/^-?[0-9.]*[0-9]+[0-9.]*$/g,s=["width","height","inline","hFlip","vFlip","flip","rotate","align","color","box"],f={left:0,top:0,width:16,height:16,rotate:0,hFlip:!1,vFlip:!1};var h=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._item=t}var t,n,r;return t=e,r=[{key:"splitAttributes",value:function(e){var t={icon:Object.create(null),node:Object.create(null)};return Object.keys(e).forEach((function(n){t[-1===s.indexOf(n)?"node":"icon"][n]=e[n]})),t}},{key:"calculateDimension",value:function(e,t,n){if(1===t)return e;if(n=void 0===n?100:n,"number"==typeof e)return Math.ceil(e*t*n)/n;var r=e.split(c);if(null===r||!r.length)return null;for(var i,o=[],a=r.shift(),l=u.test(a);;){if(l?(i=parseFloat(a),isNaN(i)?o.push(a):o.push(Math.ceil(i*t*n)/n)):o.push(a),void 0===(a=r.shift()))return o.join("");l=!l}}},{key:"replaceIDs",value:function(e){var t,n,r=/\sid="(\S+)"/g,i=[];function o(e,t,n){for(var r=0;-1!==(r=n.indexOf(e,r));)n=n.slice(0,r)+t+n.slice(r+e.length),r+=t.length;return n}for(;t=r.exec(e);)i.push(t[1]);return i.length?(n="IconifyId-"+Date.now().toString(16)+"-"+(16777216*Math.random()|0).toString(16)+"-",i.forEach((function(t){var r=n+l;l++,e=o('="'+t+'"','="'+r+'"',e),e=o('="#'+t+'"','="#'+r+'"',e),e=o("(#"+t+")","(#"+r+")",e)})),e):e}}],(n=[{key:"getAttributes",value:function(t){var n=this._item;"object"!==o(t)&&(t=Object.create(null));var r={horizontal:"center",vertical:"middle",slice:!1},i={rotate:n.rotate,hFlip:n.hFlip,vFlip:n.vFlip},a=Object.create(null),l=Object.create(null),c=!0===t.inline||"true"===t.inline||"1"===t.inline,u={left:n.left,top:c?n.inlineTop:n.top,width:n.width,height:c?n.inlineHeight:n.height};if(["hFlip","vFlip"].forEach((function(e){void 0===t[e]||!0!==t[e]&&"true"!==t[e]&&"1"!==t[e]||(i[e]=!i[e])})),void 0!==t.flip&&t.flip.toLowerCase().split(/[\s,]+/).forEach((function(e){switch(e){case"horizontal":i.hFlip=!i.hFlip;break;case"vertical":i.vFlip=!i.vFlip}})),void 0!==t.rotate){var s=t.rotate;if("number"==typeof s)i.rotate+=s;else if("string"==typeof s){var f=s.replace(/^-?[0-9.]*/,"");if(""===f)s=parseInt(s),isNaN(s)||(i.rotate+=s);else if(f!==s){var h=!1;switch(f){case"%":h=25;break;case"deg":h=90}h&&(s=parseInt(s.slice(0,s.length-f.length)),isNaN(s)||(i.rotate+=Math.round(s/h)))}}}var p,v=[];switch(i.hFlip?i.vFlip?i.rotate+=2:(v.push("translate("+(u.width+u.left)+" "+(0-u.top)+")"),v.push("scale(-1 1)"),u.top=u.left=0):i.vFlip&&(v.push("translate("+(0-u.left)+" "+(u.height+u.top)+")"),v.push("scale(1 -1)"),u.top=u.left=0),i.rotate%4){case 1:p=u.height/2+u.top,v.unshift("rotate(90 "+p+" "+p+")"),0===u.left&&0===u.top||(p=u.left,u.left=u.top,u.top=p),u.width!==u.height&&(p=u.width,u.width=u.height,u.height=p);break;case 2:v.unshift("rotate(180 "+(u.width/2+u.left)+" "+(u.height/2+u.top)+")");break;case 3:p=u.width/2+u.left,v.unshift("rotate(-90 "+p+" "+p+")"),0===u.left&&0===u.top||(p=u.left,u.left=u.top,u.top=p),u.width!==u.height&&(p=u.width,u.width=u.height,u.height=p)}var d,g,b=t.width?t.width:null,y=t.height?t.height:null;null===b&&null===y&&(y="1em"),null!==b&&null!==y?(d=b,g=y):null!==b?(d=b,g=e.calculateDimension(d,u.height/u.width)):(g=y,d=e.calculateDimension(g,u.width/u.height)),!1!==d&&(l.width="auto"===d?u.width:d),!1!==g&&(l.height="auto"===g?u.height:g),c&&0!==n.verticalAlign&&(a["vertical-align"]=n.verticalAlign+"em"),void 0!==t.align&&t.align.toLowerCase().split(/[\s,]+/).forEach((function(e){switch(e){case"left":case"right":case"center":r.horizontal=e;break;case"top":case"bottom":case"middle":r.vertical=e;break;case"crop":r.slice=!0;break;case"meet":r.slice=!1}})),l.preserveAspectRatio=function(e){var t;switch(e.horizontal){case"left":t="xMin";break;case"right":t="xMax";break;default:t="xMid"}switch(e.vertical){case"top":t+="YMin";break;case"bottom":t+="YMax";break;default:t+="YMid"}return t+(e.slice?" slice":" meet")}(r),l.viewBox=u.left+" "+u.top+" "+u.width+" "+u.height;var m=e.replaceIDs(n.body);return void 0!==t.color&&(m=m.replace(/currentColor/g,t.color)),v.length&&(m='<g transform="'+v.join(" ")+'">'+m+"</g>"),!0!==t.box&&"true"!==t.box&&"1"!==t.box||(m+='<rect x="'+u.left+'" y="'+u.top+'" width="'+u.width+'" height="'+u.height+'" fill="rgba(0, 0, 0, 0)" />'),{attributes:l,body:m,style:a}}},{key:"getSVG",value:function(t,n){var r=e.splitAttributes(t),i=this.getAttributes(r.icon),o='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';return n&&Object.keys(r.node).forEach((function(e){o+=" "+e+'="'+r.node[e]+'"'})),Object.keys(i.attributes).forEach((function(e){o+=" "+e+'="'+i.attributes[e]+'"'})),o+=' style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);',Object.keys(i.style).forEach((function(e){o+=" "+e+": "+i.style[e]+";"})),t&&void 0!==t.style&&(o+=t.style),o+='">',o+=i.body+"</svg>"}}])&&a(t.prototype,n),r&&a(t,r),e}();function p(e,t){if("object"!==o(e.icon))return null;var n=h.splitAttributes(e),r=n.icon,a=n.node;delete a.icon,void 0===r.inline&&(r.inline=t);var l=new h(function(e){var t,n=Object.create(null);for(t in f)n[t]=f[t];for(t in e)n[t]=e[t];return void 0===n.inlineTop&&(n.inlineTop=n.top),void 0===n.inlineHeight&&(n.inlineHeight=n.height),void 0===n.verticalAlign&&(n.verticalAlign=n.height%7==0&&n.height%8!=0?-.143:-.125),n}(e.icon)).getAttributes(r),c={transform:"rotate(360deg)"};if(void 0!==l.style["vertical-align"]&&(c.verticalAlign=l.style["vertical-align"]),void 0!==e.style)for(var u in e.style)c[u]=e.style[u];var s,p={xmlns:"http://www.w3.org/2000/svg",focusable:!1,style:c};for(s in a)p[s]=a[s];for(s in l.attributes)p[s]=l.attributes[s];return p.dangerouslySetInnerHTML={__html:l.body},i.default.createElement("svg",p,null)}var v=function(e){return p(e,!1)};t.Wb=function(e){return p(e,!0)}},3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return p}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),h=u(n),p=i,v=h["".concat(c,".").concat(p)]||h[p]||f[p]||o;return n?r.createElement(v,a(a({ref:t},s),{},{components:n})):r.createElement(v,a({ref:t},s))}));function p(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=h;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},6742:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var r=n(9756),i=n(7294),o=n(3727),a=n(2263),l=n(3919),c=n(412),u=(0,i.createContext)({collectLink:function(){}}),s=n(4996),f=n(8780),h=["isNavLink","to","href","activeClassName","isActive","data-noBrokenLinkCheck","autoAddBaseUrl"];var p=function(e){var t,n,p=e.isNavLink,v=e.to,d=e.href,g=e.activeClassName,b=e.isActive,y=e["data-noBrokenLinkCheck"],m=e.autoAddBaseUrl,w=void 0===m||m,O=(0,r.Z)(e,h),k=(0,a.Z)().siteConfig,j=k.trailingSlash,x=k.baseUrl,E=(0,s.C)().withBaseUrl,C=(0,i.useContext)(u),P=v||d,S=(0,l.Z)(P),A=null==P?void 0:P.replace("pathname://",""),_=void 0!==A?(n=A,w&&function(e){return e.startsWith("/")}(n)?E(n):n):void 0;_&&S&&(_=(0,f.applyTrailingSlash)(_,{trailingSlash:j,baseUrl:x}));var F,M=(0,i.useRef)(!1),T=p?o.OL:o.rU,N=c.Z.canUseIntersectionObserver;(0,i.useEffect)((function(){return!N&&S&&null!=_&&window.docusaurus.prefetch(_),function(){N&&F&&F.disconnect()}}),[_,N,S]);var Z=null!==(t=null==_?void 0:_.startsWith("#"))&&void 0!==t&&t,D=!_||!S||Z;return _&&S&&!Z&&!y&&C.collectLink(_),D?i.createElement("a",Object.assign({href:_},P&&!S&&{target:"_blank",rel:"noopener noreferrer"},O)):i.createElement(T,Object.assign({},O,{onMouseEnter:function(){M.current||null==_||(window.docusaurus.preload(_),M.current=!0)},innerRef:function(e){var t,n;N&&e&&S&&(t=e,n=function(){null!=_&&window.docusaurus.prefetch(_)},(F=new window.IntersectionObserver((function(e){e.forEach((function(e){t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(F.unobserve(t),F.disconnect(),n())}))}))).observe(t))},to:_||""},p&&{isActive:b,activeClassName:g}))}},3919:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function i(e){return void 0!==e&&!r(e)}n.d(t,{b:function(){return r},Z:function(){return i}})},4996:function(e,t,n){"use strict";n.d(t,{C:function(){return o},Z:function(){return a}});var r=n(2263),i=n(3919);function o(){var e=(0,r.Z)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,o=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var o=void 0===r?{}:r,a=o.forcePrependBaseUrl,l=void 0!==a&&a,c=o.absolute,u=void 0!==c&&c;if(!n)return n;if(n.startsWith("#"))return n;if((0,i.b)(n))return n;if(l)return t+n;var s=n.startsWith(t)?n:t+n.replace(/^\//,"");return u?e+s:s}(o,n,e,t)}}}function a(e,t){return void 0===t&&(t={}),(0,o().withBaseUrl)(e,t)}},8617:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(7294),i="iconExternalLink_3J9K",o=function(e){var t=e.width,n=void 0===t?13.5:t,o=e.height,a=void 0===o?13.5:o;return r.createElement("svg",{width:n,height:a,"aria-hidden":"true",viewBox:"0 0 24 24",className:i},r.createElement("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"}))}},2924:function(e,t,n){"use strict";var r=n(7294).createContext(void 0);t.Z=r},5350:function(e,t,n){"use strict";var r=n(7294),i=n(2924);t.Z=function(){var e=(0,r.useContext)(i.Z);if(null==e)throw new Error('"useThemeContext" is used outside of "Layout" component. Please see https://docusaurus.io/docs/api/themes/configuration#usethemecontext.');return e}},8802:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=t.trailingSlash,r=t.baseUrl;if(e.startsWith("#"))return e;if(void 0===n)return e;var i,o=e.split(/[#?]/)[0],a="/"===o||o===r?o:(i=o,n?function(e){return e.endsWith("/")?e:e+"/"}(i):function(e){return e.endsWith("/")?e.slice(0,-1):e}(i));return e.replace(o,a)}},8780:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.uniq=t.applyTrailingSlash=void 0;var i=n(8802);Object.defineProperty(t,"applyTrailingSlash",{enumerable:!0,get:function(){return r(i).default}});var o=n(9964);Object.defineProperty(t,"uniq",{enumerable:!0,get:function(){return r(o).default}})},9964:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return Array.from(new Set(e))}},5514:function(e,t,n){"use strict";var r=n(7294),i=n(7248);t.Z=function(e){return r.createElement(i.Wb,{icon:e.icon,width:"1.35rem",style:{verticalAlign:"-0.4rem"}})}}}]);
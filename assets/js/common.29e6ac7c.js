"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[8592],{3905:function(t,e,n){n.d(e,{Zo:function(){return f},kt:function(){return d}});var o=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,o,r=function(t,e){if(null==t)return{};var n,o,r={},i=Object.keys(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(o=0;o<i.length;o++)n=i[o],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var a=o.createContext({}),l=function(t){var e=o.useContext(a),n=e;return t&&(n="function"==typeof t?t(e):c(c({},e),t)),n},f=function(t){var e=l(t.components);return o.createElement(a.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return o.createElement(o.Fragment,{},e)}},p=o.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,a=t.parentName,f=s(t,["components","mdxType","originalType","parentName"]),p=l(n),d=r,h=p["".concat(a,".").concat(d)]||p[d]||u[d]||i;return n?o.createElement(h,c(c({ref:e},f),{},{components:n})):o.createElement(h,c({ref:e},f))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,c=new Array(i);c[0]=p;var s={};for(var a in e)hasOwnProperty.call(e,a)&&(s[a]=e[a]);s.originalType=t,s.mdxType="string"==typeof t?t:r,c[1]=s;for(var l=2;l<i;l++)c[l]=n[l];return o.createElement.apply(null,c)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5514:function(t,e,n){var o=n(7294),r=n(1954);e.Z=function(t){return o.createElement(r.Wb,{icon:t.icon,width:"1.35rem",style:{verticalAlign:"-0.4rem"}})}},1954:function(t,e,n){n.d(e,{Wb:function(){return Ft}});var o=n(7294);const r=/^[a-z0-9]+(-[a-z0-9]+)*$/,i=Object.freeze({left:0,top:0,width:16,height:16,rotate:0,vFlip:!1,hFlip:!1});function c(t){return{...i,...t}}const s=(t,e,n,o="")=>{const r=t.split(":");if("@"===t.slice(0,1)){if(r.length<2||r.length>3)return null;o=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const t=r.pop(),n=r.pop(),i={provider:r.length>0?r[0]:o,prefix:n,name:t};return e&&!a(i)?null:i}const i=r[0],c=i.split("-");if(c.length>1){const t={provider:o,prefix:c.shift(),name:c.join("-")};return e&&!a(t)?null:t}if(n&&""===o){const t={provider:o,prefix:"",name:i};return e&&!a(t,n)?null:t}return null},a=(t,e)=>!!t&&!(""!==t.provider&&!t.provider.match(r)||!(e&&""===t.prefix||t.prefix.match(r))||!t.name.match(r));function l(t,e,n=!1){const o=function e(n,o){if(void 0!==t.icons[n])return Object.assign({},t.icons[n]);if(o>5)return null;const r=t.aliases;if(r&&void 0!==r[n]){const t=r[n],c=e(t.parent,o+1);return c?function(t,e){const n={...t};for(const o in i){const t=o;if(void 0!==e[t]){const o=e[t];if(void 0===n[t]){n[t]=o;continue}switch(t){case"rotate":n[t]=(n[t]+o)%4;break;case"hFlip":case"vFlip":n[t]=o!==n[t];break;default:n[t]=o}}}return n}(c,t):c}const c=t.chars;return!o&&c&&void 0!==c[n]?e(c[n],o+1):null}(e,0);if(o)for(const r in i)void 0===o[r]&&void 0!==t[r]&&(o[r]=t[r]);return o&&n?c(o):o}function f(t,e,n){n=n||{};const o=[];if("object"!=typeof t||"object"!=typeof t.icons)return o;t.not_found instanceof Array&&t.not_found.forEach((t=>{e(t,null),o.push(t)}));const r=t.icons;Object.keys(r).forEach((n=>{const r=l(t,n,!0);r&&(e(n,r),o.push(n))}));const c=n.aliases||"all";if("none"!==c&&"object"==typeof t.aliases){const n=t.aliases;Object.keys(n).forEach((r=>{if("variations"===c&&function(t){for(const e in i)if(void 0!==t[e])return!0;return!1}(n[r]))return;const s=l(t,r,!0);s&&(e(r,s),o.push(r))}))}return o}const u={provider:"string",aliases:"object",not_found:"object"};for(const Rt in i)u[Rt]=typeof i[Rt];function p(t){if("object"!=typeof t||null===t)return null;const e=t;if("string"!=typeof e.prefix||!t.icons||"object"!=typeof t.icons)return null;for(const r in u)if(void 0!==t[r]&&typeof t[r]!==u[r])return null;const n=e.icons;for(const c in n){const t=n[c];if(!c.match(r)||"string"!=typeof t.body)return null;for(const e in i)if(void 0!==t[e]&&typeof t[e]!=typeof i[e])return null}const o=e.aliases;if(o)for(const c in o){const t=o[c],e=t.parent;if(!c.match(r)||"string"!=typeof e||!n[e]&&!o[e])return null;for(const n in i)if(void 0!==t[n]&&typeof t[n]!=typeof i[n])return null}return e}let d=Object.create(null);try{const t=window||self;t&&1===t._iconifyStorage.version&&(d=t._iconifyStorage.storage)}catch(Lt){}function h(t,e){void 0===d[t]&&(d[t]=Object.create(null));const n=d[t];return void 0===n[e]&&(n[e]=function(t,e){return{provider:t,prefix:e,icons:Object.create(null),missing:Object.create(null)}}(t,e)),n[e]}function g(t,e){if(!p(e))return[];const n=Date.now();return f(e,((e,o)=>{o?t.icons[e]=o:t.missing[e]=n}))}function y(t,e){const n=t.icons[e];return void 0===n?null:n}let b=!1;function v(t){return"boolean"==typeof t&&(b=t),b}function m(t){const e="string"==typeof t?s(t,!0,b):t;return e?y(h(e.provider,e.prefix),e.name):null}function x(t,e){const n=s(t,!0,b);if(!n)return!1;return function(t,e,n){try{if("string"==typeof n.body)return t.icons[e]=Object.freeze(c(n)),!0}catch(Lt){}return!1}(h(n.provider,n.prefix),n.name,e)}const w=Object.freeze({inline:!1,width:null,height:null,hAlign:"center",vAlign:"middle",slice:!1,hFlip:!1,vFlip:!1,rotate:0});function j(t,e){const n={};for(const o in t){const r=o;if(n[r]=t[r],void 0===e[r])continue;const i=e[r];switch(r){case"inline":case"slice":"boolean"==typeof i&&(n[r]=i);break;case"hFlip":case"vFlip":!0===i&&(n[r]=!n[r]);break;case"hAlign":case"vAlign":"string"==typeof i&&""!==i&&(n[r]=i);break;case"width":case"height":("string"==typeof i&&""!==i||"number"==typeof i&&i||null===i)&&(n[r]=i);break;case"rotate":"number"==typeof i&&(n[r]+=i)}}return n}const O=/(-?[0-9.]*[0-9]+[0-9.]*)/g,k=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function _(t,e,n){if(1===e)return t;if(n=void 0===n?100:n,"number"==typeof t)return Math.ceil(t*e*n)/n;if("string"!=typeof t)return t;const o=t.split(O);if(null===o||!o.length)return t;const r=[];let i=o.shift(),c=k.test(i);for(;;){if(c){const t=parseFloat(i);isNaN(t)?r.push(i):r.push(Math.ceil(t*e*n)/n)}else r.push(i);if(i=o.shift(),void 0===i)return r.join("");c=!c}}function E(t){let e="";switch(t.hAlign){case"left":e+="xMin";break;case"right":e+="xMax";break;default:e+="xMid"}switch(t.vAlign){case"top":e+="YMin";break;case"bottom":e+="YMax";break;default:e+="YMid"}return e+=t.slice?" slice":" meet",e}function S(t,e){const n={left:t.left,top:t.top,width:t.width,height:t.height};let o,r,i=t.body;[t,e].forEach((t=>{const e=[],o=t.hFlip,r=t.vFlip;let c,s=t.rotate;switch(o?r?s+=2:(e.push("translate("+(n.width+n.left).toString()+" "+(0-n.top).toString()+")"),e.push("scale(-1 1)"),n.top=n.left=0):r&&(e.push("translate("+(0-n.left).toString()+" "+(n.height+n.top).toString()+")"),e.push("scale(1 -1)"),n.top=n.left=0),s<0&&(s-=4*Math.floor(s/4)),s%=4,s){case 1:c=n.height/2+n.top,e.unshift("rotate(90 "+c.toString()+" "+c.toString()+")");break;case 2:e.unshift("rotate(180 "+(n.width/2+n.left).toString()+" "+(n.height/2+n.top).toString()+")");break;case 3:c=n.width/2+n.left,e.unshift("rotate(-90 "+c.toString()+" "+c.toString()+")")}s%2==1&&(0===n.left&&0===n.top||(c=n.left,n.left=n.top,n.top=c),n.width!==n.height&&(c=n.width,n.width=n.height,n.height=c)),e.length&&(i='<g transform="'+e.join(" ")+'">'+i+"</g>")})),null===e.width&&null===e.height?(r="1em",o=_(r,n.width/n.height)):null!==e.width&&null!==e.height?(o=e.width,r=e.height):null!==e.height?(r=e.height,o=_(r,n.width/n.height)):(o=e.width,r=_(o,n.height/n.width)),"auto"===o&&(o=n.width),"auto"===r&&(r=n.height),o="string"==typeof o?o:o.toString()+"",r="string"==typeof r?r:r.toString()+"";const c={attributes:{width:o,height:r,preserveAspectRatio:E(e),viewBox:n.left.toString()+" "+n.top.toString()+" "+n.width.toString()+" "+n.height.toString()},body:i};return e.inline&&(c.inline=!0),c}const I=/\sid="(\S+)"/g,T="IconifyId"+Date.now().toString(16)+(16777216*Math.random()|0).toString(16);let A=0;function M(t,e=T){const n=[];let o;for(;o=I.exec(t);)n.push(o[1]);return n.length?(n.forEach((n=>{const o="function"==typeof e?e(n):e+(A++).toString(),r=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");t=t.replace(new RegExp('([#;"])('+r+')([")]|\\.[a-z])',"g"),"$1"+o+"$3")})),t):t}const D=Object.create(null);function P(t,e){D[t]=e}function F(t){return D[t]||D[""]}function L(t){let e;if("string"==typeof t.resources)e=[t.resources];else if(e=t.resources,!(e instanceof Array&&e.length))return null;return{resources:e,path:void 0===t.path?"/":t.path,maxURL:t.maxURL?t.maxURL:500,rotate:t.rotate?t.rotate:750,timeout:t.timeout?t.timeout:5e3,random:!0===t.random,index:t.index?t.index:0,dataAfterTimeout:!1!==t.dataAfterTimeout}}const N=Object.create(null),R=["https://api.simplesvg.com","https://api.unisvg.com"],C=[];for(;R.length>0;)1===R.length||Math.random()>.5?C.push(R.shift()):C.push(R.pop());function U(t,e){const n=L(e);return null!==n&&(N[t]=n,!0)}function z(t){return N[t]}N[""]=L({resources:["https://api.iconify.design"].concat(C)});const $=(t,e)=>{let n=t,o=-1!==n.indexOf("?");return Object.keys(e).forEach((t=>{let r;try{r=function(t){switch(typeof t){case"boolean":return t?"true":"false";case"number":case"string":return encodeURIComponent(t);default:throw new Error("Invalid parameter")}}(e[t])}catch(Lt){return}n+=(o?"&":"?")+encodeURIComponent(t)+"="+r,o=!0})),n},q={},W={};let Y=(()=>{let t;try{if(t=fetch,"function"==typeof t)return t}catch(Lt){}return null})();const H={prepare:(t,e,n)=>{const o=[];let r=q[e];void 0===r&&(r=function(t,e){const n=z(t);if(!n)return 0;let o;if(n.maxURL){let t=0;n.resources.forEach((e=>{const n=e;t=Math.max(t,n.length)}));const r=$(e+".json",{icons:""});o=n.maxURL-t-n.path.length-r.length}else o=0;const r=t+":"+e;return W[t]=n.path,q[r]=o,o}(t,e));const i="icons";let c={type:i,provider:t,prefix:e,icons:[]},s=0;return n.forEach(((n,a)=>{s+=n.length+1,s>=r&&a>0&&(o.push(c),c={type:i,provider:t,prefix:e,icons:[]},s=n.length),c.icons.push(n)})),o.push(c),o},send:(t,e,n)=>{if(!Y)return void n("abort",424);let o=function(t){if("string"==typeof t){if(void 0===W[t]){const e=z(t);if(!e)return"/";W[t]=e.path}return W[t]}return"/"}(e.provider);switch(e.type){case"icons":{const t=e.prefix,n=e.icons.join(",");o+=$(t+".json",{icons:n});break}case"custom":{const t=e.uri;o+="/"===t.slice(0,1)?t.slice(1):t;break}default:return void n("abort",400)}let r=503;Y(t+o).then((t=>{const e=t.status;if(200===e)return r=501,t.json();setTimeout((()=>{n(function(t){return 404===t}(e)?"abort":"next",e)}))})).then((t=>{"object"==typeof t&&null!==t?setTimeout((()=>{n("success",t)})):setTimeout((()=>{n("next",r)}))})).catch((()=>{n("next",r)}))}};const J=Object.create(null),X=Object.create(null);function Z(t,e){t.forEach((t=>{const n=t.provider;if(void 0===J[n])return;const o=J[n],r=t.prefix,i=o[r];i&&(o[r]=i.filter((t=>t.id!==e)))}))}let B=0;var G={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function K(t,e,n,o){const r=t.resources.length,i=t.random?Math.floor(Math.random()*r):t.index;let c;if(t.random){let e=t.resources.slice(0);for(c=[];e.length>1;){const t=Math.floor(Math.random()*e.length);c.push(e[t]),e=e.slice(0,t).concat(e.slice(t+1))}c=c.concat(e)}else c=t.resources.slice(i).concat(t.resources.slice(0,i));const s=Date.now();let a,l="pending",f=0,u=null,p=[],d=[];function h(){u&&(clearTimeout(u),u=null)}function g(){"pending"===l&&(l="aborted"),h(),p.forEach((t=>{"pending"===t.status&&(t.status="aborted")})),p=[]}function y(t,e){e&&(d=[]),"function"==typeof t&&d.push(t)}function b(){l="failed",d.forEach((t=>{t(void 0,a)}))}function v(){p.forEach((t=>{"pending"===t.status&&(t.status="aborted")})),p=[]}function m(){if("pending"!==l)return;h();const o=c.shift();if(void 0===o)return p.length?void(u=setTimeout((()=>{h(),"pending"===l&&(v(),b())}),t.timeout)):void b();const r={status:"pending",resource:o,callback:(e,n)=>{!function(e,n,o){const r="success"!==n;switch(p=p.filter((t=>t!==e)),l){case"pending":break;case"failed":if(r||!t.dataAfterTimeout)return;break;default:return}if("abort"===n)return a=o,void b();if(r)return a=o,void(p.length||(c.length?m():b()));if(h(),v(),!t.random){const n=t.resources.indexOf(e.resource);-1!==n&&n!==t.index&&(t.index=n)}l="completed",d.forEach((t=>{t(o)}))}(r,e,n)}};p.push(r),f++,u=setTimeout(m,t.rotate),n(o,e,r.callback)}return"function"==typeof o&&d.push(o),setTimeout(m),function(){return{startTime:s,payload:e,status:l,queriesSent:f,queriesPending:p.length,subscribe:y,abort:g}}}function Q(t){const e=function(t){if(!("object"==typeof t&&"object"==typeof t.resources&&t.resources instanceof Array&&t.resources.length))throw new Error("Invalid Reduncancy configuration");const e=Object.create(null);let n;for(n in G)void 0!==t[n]?e[n]=t[n]:e[n]=G[n];return e}(t);let n=[];function o(){n=n.filter((t=>"pending"===t().status))}return{query:function(t,r,i){const c=K(e,t,r,((t,e)=>{o(),i&&i(t,e)}));return n.push(c),c},find:function(t){const e=n.find((e=>t(e)));return void 0!==e?e:null},setIndex:t=>{e.index=t},getIndex:()=>e.index,cleanup:o}}function V(){}const tt=Object.create(null);function et(t,e,n){let o,r;if("string"==typeof t){const e=F(t);if(!e)return n(void 0,424),V;r=e.send;const i=function(t){if(void 0===tt[t]){const e=z(t);if(!e)return;const n={config:e,redundancy:Q(e)};tt[t]=n}return tt[t]}(t);i&&(o=i.redundancy)}else{const e=L(t);if(e){o=Q(e);const n=F(t.resources?t.resources[0]:"");n&&(r=n.send)}}return o&&r?o.query(e,r,n)().abort:(n(void 0,424),V)}const nt={};function ot(){}const rt=Object.create(null),it=Object.create(null),ct=Object.create(null),st=Object.create(null);function at(t,e){void 0===ct[t]&&(ct[t]=Object.create(null));const n=ct[t];n[e]||(n[e]=!0,setTimeout((()=>{n[e]=!1,function(t,e){void 0===X[t]&&(X[t]=Object.create(null));const n=X[t];n[e]||(n[e]=!0,setTimeout((()=>{if(n[e]=!1,void 0===J[t]||void 0===J[t][e])return;const o=J[t][e].slice(0);if(!o.length)return;const r=h(t,e);let i=!1;o.forEach((n=>{const o=n.icons,c=o.pending.length;o.pending=o.pending.filter((n=>{if(n.prefix!==e)return!0;const c=n.name;if(void 0!==r.icons[c])o.loaded.push({provider:t,prefix:e,name:c});else{if(void 0===r.missing[c])return i=!0,!0;o.missing.push({provider:t,prefix:e,name:c})}return!1})),o.pending.length!==c&&(i||Z([{provider:t,prefix:e}],n.id),n.callback(o.loaded.slice(0),o.missing.slice(0),o.pending.slice(0),n.abort))}))})))}(t,e)})))}const lt=Object.create(null);function ft(t,e,n){void 0===it[t]&&(it[t]=Object.create(null));const o=it[t];void 0===st[t]&&(st[t]=Object.create(null));const r=st[t];void 0===rt[t]&&(rt[t]=Object.create(null));const i=rt[t];void 0===o[e]?o[e]=n:o[e]=o[e].concat(n).sort(),r[e]||(r[e]=!0,setTimeout((()=>{r[e]=!1;const n=o[e];delete o[e];const c=F(t);if(!c)return void function(){const n=(""===t?"":"@"+t+":")+e,o=Math.floor(Date.now()/6e4);lt[n]<o&&(lt[n]=o,console.error('Unable to retrieve icons for "'+n+'" because API is not configured properly.'))}();c.prepare(t,e,n).forEach((n=>{et(t,n,((o,r)=>{const c=h(t,e);if("object"!=typeof o){if(404!==r)return;const t=Date.now();n.icons.forEach((e=>{c.missing[e]=t}))}else try{const n=g(c,o);if(!n.length)return;const r=i[e];n.forEach((t=>{delete r[t]})),nt.store&&nt.store(t,o)}catch(s){console.error(s)}at(t,e)}))}))})))}const ut=(t,e)=>{const n=function(t,e=!0,n=!1){const o=[];return t.forEach((t=>{const r="string"==typeof t?s(t,!1,n):t;e&&!a(r,n)||o.push({provider:r.provider,prefix:r.prefix,name:r.name})})),o}(t,!0,v()),o=function(t){const e={loaded:[],missing:[],pending:[]},n=Object.create(null);t.sort(((t,e)=>t.provider!==e.provider?t.provider.localeCompare(e.provider):t.prefix!==e.prefix?t.prefix.localeCompare(e.prefix):t.name.localeCompare(e.name)));let o={provider:"",prefix:"",name:""};return t.forEach((t=>{if(o.name===t.name&&o.prefix===t.prefix&&o.provider===t.provider)return;o=t;const r=t.provider,i=t.prefix,c=t.name;void 0===n[r]&&(n[r]=Object.create(null));const s=n[r];void 0===s[i]&&(s[i]=h(r,i));const a=s[i];let l;l=void 0!==a.icons[c]?e.loaded:""===i||void 0!==a.missing[c]?e.missing:e.pending;const f={provider:r,prefix:i,name:c};l.push(f)})),e}(n);if(!o.pending.length){let t=!0;return e&&setTimeout((()=>{t&&e(o.loaded,o.missing,o.pending,ot)})),()=>{t=!1}}const r=Object.create(null),i=[];let c,l;o.pending.forEach((t=>{const e=t.provider,n=t.prefix;if(n===l&&e===c)return;c=e,l=n,i.push({provider:e,prefix:n}),void 0===rt[e]&&(rt[e]=Object.create(null));const o=rt[e];void 0===o[n]&&(o[n]=Object.create(null)),void 0===r[e]&&(r[e]=Object.create(null));const s=r[e];void 0===s[n]&&(s[n]=[])}));const f=Date.now();return o.pending.forEach((t=>{const e=t.provider,n=t.prefix,o=t.name,i=rt[e][n];void 0===i[o]&&(i[o]=f,r[e][n].push(o))})),i.forEach((t=>{const e=t.provider,n=t.prefix;r[e][n].length&&ft(e,n,r[e][n])})),e?function(t,e,n){const o=B++,r=Z.bind(null,n,o);if(!e.pending.length)return r;const i={id:o,icons:e,callback:t,abort:r};return n.forEach((t=>{const e=t.provider,n=t.prefix;void 0===J[e]&&(J[e]=Object.create(null));const o=J[e];void 0===o[n]&&(o[n]=[]),o[n].push(i)})),r}(e,o,i):ot},pt="iconify2",dt="iconify",ht="iconify-count",gt="iconify-version",yt=36e5,bt={local:!0,session:!0};let vt=!1;const mt={local:0,session:0},xt={local:[],session:[]};let wt="undefined"==typeof window?{}:window;function jt(t){const e=t+"Storage";try{if(wt&&wt[e]&&"number"==typeof wt[e].length)return wt[e]}catch(Lt){}return bt[t]=!1,null}function Ot(t,e,n){try{return t.setItem(ht,n.toString()),mt[e]=n,!0}catch(Lt){return!1}}function kt(t){const e=t.getItem(ht);if(e){const t=parseInt(e);return t||0}return 0}const _t=()=>{if(vt)return;vt=!0;const t=Math.floor(Date.now()/yt)-168;function e(e){const n=jt(e);if(!n)return;const o=e=>{const o=dt+e.toString(),r=n.getItem(o);if("string"!=typeof r)return!1;let i=!0;try{const e=JSON.parse(r);if("object"!=typeof e||"number"!=typeof e.cached||e.cached<t||"string"!=typeof e.provider||"object"!=typeof e.data||"string"!=typeof e.data.prefix)i=!1;else{const t=e.provider,n=e.data.prefix;i=g(h(t,n),e.data).length>0}}catch(Lt){i=!1}return i||n.removeItem(o),i};try{const t=n.getItem(gt);if(t!==pt)return t&&function(t){try{const e=kt(t);for(let n=0;n<e;n++)t.removeItem(dt+n.toString())}catch(Lt){}}(n),void function(t,e){try{t.setItem(gt,pt)}catch(Lt){}Ot(t,e,0)}(n,e);let r=kt(n);for(let n=r-1;n>=0;n--)o(n)||(n===r-1?r--:xt[e].push(n));Ot(n,e,r)}catch(Lt){}}for(const n in bt)e(n)},Et=(t,e)=>{function n(n){if(!bt[n])return!1;const o=jt(n);if(!o)return!1;let r=xt[n].shift();if(void 0===r&&(r=mt[n],!Ot(o,n,r+1)))return!1;try{const n={cached:Math.floor(Date.now()/yt),provider:t,data:e};o.setItem(dt+r.toString(),JSON.stringify(n))}catch(Lt){return!1}return!0}vt||_t(),Object.keys(e.icons).length&&(e.not_found&&delete(e=Object.assign({},e)).not_found,n("local")||n("session"))};const St=/[\s,]+/;function It(t,e){e.split(St).forEach((e=>{switch(e.trim()){case"horizontal":t.hFlip=!0;break;case"vertical":t.vFlip=!0}}))}function Tt(t,e){e.split(St).forEach((e=>{const n=e.trim();switch(n){case"left":case"center":case"right":t.hAlign=n;break;case"top":case"middle":case"bottom":t.vAlign=n;break;case"slice":case"crop":t.slice=!0;break;case"meet":t.slice=!1}}))}function At(t,e=0){const n=t.replace(/^-?[0-9.]*/,"");function o(t){for(;t<0;)t+=4;return t%4}if(""===n){const e=parseInt(t);return isNaN(e)?0:o(e)}if(n!==t){let e=0;switch(n){case"%":e=25;break;case"deg":e=90}if(e){let r=parseFloat(t.slice(0,t.length-n.length));return isNaN(r)?0:(r/=e,r%1==0?o(r):0)}}return e}const Mt={xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img",style:{}},Dt={...w,inline:!0};if(v(!0),P("",H),"undefined"!=typeof document&&"undefined"!=typeof window){nt.store=Et,_t();const t=window;if(void 0!==t.IconifyPreload){const e=t.IconifyPreload,n="Invalid IconifyPreload syntax.";"object"==typeof e&&null!==e&&(e instanceof Array?e:[e]).forEach((t=>{try{("object"!=typeof t||null===t||t instanceof Array||"object"!=typeof t.icons||"string"!=typeof t.prefix||!function(t,e){if("object"!=typeof t)return!1;if("string"!=typeof e&&(e="string"==typeof t.provider?t.provider:""),b&&""===e&&("string"!=typeof t.prefix||""===t.prefix)){let e=!1;return p(t)&&(t.prefix="",f(t,((t,n)=>{n&&x(t,n)&&(e=!0)}))),e}return!("string"!=typeof t.prefix||!a({provider:e,prefix:t.prefix,name:"a"}))&&!!g(h(e,t.prefix),t)}(t))&&console.error(n)}catch(e){console.error(n)}}))}if(void 0!==t.IconifyProviders){const e=t.IconifyProviders;if("object"==typeof e&&null!==e)for(let t in e){const n="IconifyProviders["+t+"] is invalid.";try{const o=e[t];if("object"!=typeof o||!o||void 0===o.resources)continue;U(t,o)||console.error(n)}catch(Nt){console.error(n)}}}}class Pt extends o.Component{constructor(t){super(t),this.state={icon:null}}_abortLoading(){this._loading&&(this._loading.abort(),this._loading=null)}_setData(t){this.state.icon!==t&&this.setState({icon:t})}_checkIcon(t){const e=this.state,n=this.props.icon;if("object"==typeof n&&null!==n&&"string"==typeof n.body)return this._icon="",this._abortLoading(),void((t||null===e.icon)&&this._setData({data:c(n)}));let o;if("string"!=typeof n||null===(o=s(n,!1,!0)))return this._abortLoading(),void this._setData(null);const r=m(o);if(null!==r){if(this._icon!==n||null===e.icon){this._abortLoading(),this._icon=n;const t=["iconify"];""!==o.prefix&&t.push("iconify--"+o.prefix),""!==o.provider&&t.push("iconify--"+o.provider),this._setData({data:r,classes:t}),this.props.onLoad&&this.props.onLoad(n)}}else this._loading&&this._loading.name===n||(this._abortLoading(),this._icon="",this._setData(null),this._loading={name:n,abort:ut([o],this._checkIcon.bind(this,!1))})}componentDidMount(){this._checkIcon(!1)}componentDidUpdate(t){t.icon!==this.props.icon&&this._checkIcon(!0)}componentWillUnmount(){this._abortLoading()}render(){const t=this.props,e=this.state.icon;if(null===e)return t.children?t.children:o.createElement("span",{});let n=t;return e.classes&&(n={...t,className:("string"==typeof t.className?t.className+" ":"")+e.classes.join(" ")}),((t,e,n,r)=>{const i=n?Dt:w,c=j(i,e),s="object"==typeof e.style&&null!==e.style?e.style:{},a={...Mt,ref:r,style:s};for(let o in e){const t=e[o];if(void 0!==t)switch(o){case"icon":case"style":case"children":case"onLoad":case"_ref":case"_inline":break;case"inline":case"hFlip":case"vFlip":c[o]=!0===t||"true"===t||1===t;break;case"flip":"string"==typeof t&&It(c,t);break;case"align":"string"==typeof t&&Tt(c,t);break;case"color":s.color=t;break;case"rotate":"string"==typeof t?c[o]=At(t):"number"==typeof t&&(c[o]=t);break;case"ariaHidden":case"aria-hidden":!0!==t&&"true"!==t&&delete a["aria-hidden"];break;default:void 0===i[o]&&(a[o]=t)}}const l=S(t,c);let f=0,u=e.id;"string"==typeof u&&(u=u.replace(/-/g,"_")),a.dangerouslySetInnerHTML={__html:M(l.body,u?()=>u+"ID"+f++:"iconifyReact")};for(let o in l.attributes)a[o]=l.attributes[o];return l.inline&&void 0===s.verticalAlign&&(s.verticalAlign="-0.125em"),o.createElement("svg",a)})(e.data,n,t._inline,t._ref)}}o.forwardRef((function(t,e){const n={...t,_ref:e,_inline:!1};return o.createElement(Pt,n)}));const Ft=o.forwardRef((function(t,e){const n={...t,_ref:e,_inline:!0};return o.createElement(Pt,n)}))}}]);
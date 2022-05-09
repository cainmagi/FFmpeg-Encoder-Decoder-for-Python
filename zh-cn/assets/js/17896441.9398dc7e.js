"use strict";(self.webpackChunkmpeg_coder=self.webpackChunkmpeg_coder||[]).push([[7918],{6487:function(e,t,a){a.d(t,{Z:function(){return h}});var n=a(3117),l=a(7294),r=a(3651),s=a(8596),i=a(5281),c={breadcrumbsContainer:"breadcrumbsContainer_Xlws",breadcrumbHomeIcon:"breadcrumbHomeIcon_kU5B"},o=a(6010),d=a(9960),m=a(4996),u=a(5999);function v(e){return l.createElement("svg",(0,n.Z)({viewBox:"0 0 24 24"},e),l.createElement("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"}))}function b(e){var t=e.children,a=e.href,n="breadcrumbs__link";return e.isLast?l.createElement("span",{className:n,itemProp:"name"},t):a?l.createElement(d.Z,{className:n,href:a,itemProp:"item"},l.createElement("span",{itemProp:"name"},t)):l.createElement("span",{className:n},t)}function p(e){var t=e.children,a=e.active,r=e.index,s=e.addMicrodata;return l.createElement("li",(0,n.Z)({},s&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,o.Z)("breadcrumbs__item",{"breadcrumbs__item--active":a})}),t,l.createElement("meta",{itemProp:"position",content:String(r+1)}))}function E(){var e=(0,m.Z)("/");return l.createElement("li",{className:"breadcrumbs__item"},l.createElement(d.Z,{"aria-label":(0,u.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:(0,o.Z)("breadcrumbs__link",c.breadcrumbsItemLink),href:e},l.createElement(v,{className:c.breadcrumbHomeIcon})))}function h(){var e=(0,r.s1)(),t=(0,s.Ns)();return e?l.createElement("nav",{className:(0,o.Z)(i.k.docs.docBreadcrumbs,c.breadcrumbsContainer),"aria-label":(0,u.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"})},l.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&l.createElement(E,null),e.map((function(t,a){var n=a===e.length-1;return l.createElement(p,{key:a,active:n,index:a,addMicrodata:!!t.href},l.createElement(b,{href:t.href,isLast:n},t.label))})))):null}},8614:function(e,t,a){a.r(t),a.d(t,{default:function(){return Y}});var n=a(7294),l=a(6010),r=a(5214),s=a(4474),i=a(7597),c=a(5999),o=a(5281);function d(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt;return n.createElement(c.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:n.createElement("b",null,n.createElement("time",{dateTime:new Date(1e3*t).toISOString()},a))}}," on {date}")}function m(e){var t=e.lastUpdatedBy;return n.createElement(c.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:n.createElement("b",null,t)}}," by {user}")}function u(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt,l=e.lastUpdatedBy;return n.createElement("span",{className:o.k.common.lastUpdated},n.createElement(c.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&a?n.createElement(d,{lastUpdatedAt:t,formattedLastUpdatedAt:a}):"",byUser:l?n.createElement(m,{lastUpdatedBy:l}):""}},"Last updated{atDate}{byUser}"),!1)}var v=a(3117),b=a(102),p="iconEdit_dcUD",E=["className"];function h(e){var t=e.className,a=(0,b.Z)(e,E);return n.createElement("svg",(0,v.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(p,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function g(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:o.k.common.editThisPage},n.createElement(h,null),n.createElement(c.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var f=a(9960),Z="tag_hD8n",N="tagRegular_D6E_",_="tagWithCount_i0QQ";function L(e){var t=e.permalink,a=e.label,r=e.count;return n.createElement(f.Z,{href:t,className:(0,l.Z)(Z,r?_:N)},a,r&&n.createElement("span",null,r))}var k="tags_XVD_",T="tag_JSN8";function U(e){var t=e.tags;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(c.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,l.Z)(k,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return n.createElement("li",{key:a,className:T},n.createElement(L,{label:t,permalink:a}))}))))}var w="lastUpdated_foO9";function y(e){return n.createElement("div",{className:(0,l.Z)(o.k.docs.docFooterTagsRow,"row margin-bottom--sm")},n.createElement("div",{className:"col"},n.createElement(U,e)))}function C(e){var t=e.editUrl,a=e.lastUpdatedAt,r=e.lastUpdatedBy,s=e.formattedLastUpdatedAt;return n.createElement("div",{className:(0,l.Z)(o.k.docs.docFooterEditMetaRow,"row")},n.createElement("div",{className:"col"},t&&n.createElement(g,{editUrl:t})),n.createElement("div",{className:(0,l.Z)("col",w)},(a||r)&&n.createElement(u,{lastUpdatedAt:a,formattedLastUpdatedAt:s,lastUpdatedBy:r})))}function A(e){var t=e.content.metadata,a=t.editUrl,r=t.lastUpdatedAt,s=t.formattedLastUpdatedAt,i=t.lastUpdatedBy,c=t.tags,d=c.length>0,m=!!(a||r||i);return d||m?n.createElement("footer",{className:(0,l.Z)(o.k.docs.docFooter,"docusaurus-mt-lg")},d&&n.createElement(y,{tags:c}),m&&n.createElement(C,{editUrl:a,lastUpdatedAt:r,lastUpdatedBy:i,formattedLastUpdatedAt:s})):null}var B=a(1575),x=a(6043),I="tocCollapsible_bZGK",M="tocCollapsibleContent_NNA8",D="tocCollapsibleExpanded_IqtF",H=a(721),V="tocCollapsibleButton_l22C",S="tocCollapsibleButtonExpanded_KeTX",P=["collapsed"];function F(e){var t=e.collapsed,a=(0,b.Z)(e,P);return n.createElement("button",(0,v.Z)({type:"button"},a,{className:(0,l.Z)("clean-btn",V,!t&&S,a.className)}),n.createElement(c.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page"))}function R(e){var t=e.toc,a=e.className,r=e.minHeadingLevel,s=e.maxHeadingLevel,i=(0,x.u)({initialState:!0}),c=i.collapsed,o=i.toggleCollapsed;return n.createElement("div",{className:(0,l.Z)(I,!c&&D,a)},n.createElement(F,{collapsed:c,onClick:o}),n.createElement(x.z,{lazy:!0,className:M,collapsed:c},n.createElement(H.Z,{toc:t,minHeadingLevel:r,maxHeadingLevel:s})))}var z=a(9649),O="docItemContainer_vinB",X="docItemCol_DM6M",q="tocMobile_TmEX",J=a(833),G=a(7524),K=a(6487),Q=a(5290);function W(e){var t,a=e.content,l=a.metadata,r=a.frontMatter,s=a.assets,i=r.keywords,c=l.description,o=l.title,d=null!=(t=s.image)?t:r.image;return n.createElement(J.d,{title:o,description:c,keywords:i,image:d})}function j(e){var t=e.content,a=t.metadata,c=t.frontMatter,d=c.hide_title,m=c.hide_table_of_contents,u=c.toc_min_heading_level,v=c.toc_max_heading_level,b=a.title,p=!d&&void 0===t.contentTitle,E=(0,G.i)(),h=!m&&t.toc&&t.toc.length>0,g=h&&("desktop"===E||"ssr"===E);return n.createElement("div",{className:"row"},n.createElement("div",{className:(0,l.Z)("col",!m&&X)},n.createElement(s.Z,null),n.createElement("div",{className:O},n.createElement("article",null,n.createElement(K.Z,null),n.createElement(i.Z,null),h&&n.createElement(R,{toc:t.toc,minHeadingLevel:u,maxHeadingLevel:v,className:(0,l.Z)(o.k.docs.docTocMobile,q)}),n.createElement("div",{className:(0,l.Z)(o.k.docs.docMarkdown,"markdown")},p&&n.createElement("header",null,n.createElement(z.Z,{as:"h1"},b)),n.createElement(Q.Z,null,n.createElement(t,null))),n.createElement(A,e)),n.createElement(r.Z,{previous:a.previous,next:a.next}))),g&&n.createElement("div",{className:"col col--3"},n.createElement(B.Z,{toc:t.toc,minHeadingLevel:u,maxHeadingLevel:v,className:o.k.docs.docTocDesktop})))}function Y(e){var t="docs-doc-id-"+e.content.metadata.unversionedId;return n.createElement(J.FG,{className:t},n.createElement(W,e),n.createElement(j,e))}},5214:function(e,t,a){a.d(t,{Z:function(){return o}});var n=a(3117),l=a(7294),r=a(5999),s=a(6010),i=a(9960);function c(e){var t=e.permalink,a=e.title,n=e.subLabel,r=e.isNext;return l.createElement(i.Z,{className:(0,s.Z)("pagination-nav__link",r?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},n&&l.createElement("div",{className:"pagination-nav__sublabel"},n),l.createElement("div",{className:"pagination-nav__label"},a))}function o(e){var t=e.previous,a=e.next;return l.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,r.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},t&&l.createElement(c,(0,n.Z)({},t,{subLabel:l.createElement(r.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")})),a&&l.createElement(c,(0,n.Z)({},a,{subLabel:l.createElement(r.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next"),isNext:!0})))}},7597:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(7294),l=a(5999),r=a(4477),s=a(5281),i=a(6010);function c(e){var t=e.className,a=(0,r.E)();return a.badge?n.createElement("span",{className:(0,i.Z)(t,s.k.docs.docVersionBadge,"badge badge--secondary")},n.createElement(l.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:a.label}},"Version: {versionLabel}")):null}},4474:function(e,t,a){a.d(t,{Z:function(){return E}});var n=a(7294),l=a(2263),r=a(9960),s=a(5999),i=a(5551),c=a(373),o=a(5281),d=a(4477),m=a(6010);var u={unreleased:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(s.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(s.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function v(e){var t=u[e.versionMetadata.banner];return n.createElement(t,e)}function b(e){var t=e.versionLabel,a=e.to,l=e.onClick;return n.createElement(s.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(r.Z,{to:a,onClick:l},n.createElement(s.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function p(e){var t,a=e.className,r=e.versionMetadata,s=(0,l.Z)().siteConfig.title,d=(0,i.gA)({failfast:!0}).pluginId,u=(0,c.J)(d).savePreferredVersionName,p=(0,i.Jo)(d),E=p.latestDocSuggestion,h=p.latestVersionSuggestion,g=null!=E?E:(t=h).docs.find((function(e){return e.id===t.mainDocId}));return n.createElement("div",{className:(0,m.Z)(a,o.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(v,{siteTitle:s,versionMetadata:r})),n.createElement("div",{className:"margin-top--md"},n.createElement(b,{versionLabel:h.label,to:g.path,onClick:function(){return u(h.name)}})))}function E(e){var t=e.className,a=(0,d.E)();return a.banner?n.createElement(p,{className:t,versionMetadata:a}):null}}}]);
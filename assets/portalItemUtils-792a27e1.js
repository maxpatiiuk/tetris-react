import{bb as l,bc as f,bd as d,be as E}from"./index-080e108a.js";async function p(t){const n=t.spatialReference;if(n.isWGS84)return t.clone();if(n.isWebMercator)return l(t);const e=f.WGS84;return await d(n,e),E(t,e)}function A(t,n){if(!u(t,n)){const e=t.typeKeywords;e?e.push(n):t.typeKeywords=[n]}}function u(t,n){var e;return!!((e=t.typeKeywords)!=null&&e.includes(n))}function I(t){return u(t,S.HOSTED_SERVICE)}function m(t,n){const e=t.typeKeywords;if(e){const r=e.indexOf(n);r>-1&&e.splice(r,1)}}async function R(t){const n=t.clone().normalize();let e;if(n.length>1)for(const r of n)e?r.width>e.width&&(e=r):e=r;else e=n[0];return p(e)}const S={DEVELOPER_BASEMAP:"DeveloperBasemap",JSAPI:"ArcGIS API for JavaScript",METADATA:"Metadata",MULTI_LAYER:"Multilayer",SINGLE_LAYER:"Singlelayer",TABLE:"Table",HOSTED_SERVICE:"Hosted Service"};function b(t){var a;const{portal:n,isOrgItem:e,itemControl:r}=t,s=(a=n.user)==null?void 0:a.privileges;let i=!s||s.includes("features:user:edit"),c=!!e&&!!(s!=null&&s.includes("features:user:fullEdit"));const o=r==="update"||r==="admin";return o?c=i=!0:c&&(i=!0),{features:{edit:i,fullEdit:c},content:{updateItem:o}}}export{R as a,I as c,b as f,A as i,S as l,u as s,m as u};

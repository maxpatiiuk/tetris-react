import{E as c,S}from"./TileInfoView-346e56d0.js";import{f as h,_ as V,A as b}from"./SymbolProcessor-f81deaae.js";import"./index-080e108a.js";import"./cimAnalyzer-01879161.js";import"./TileClipper-ae6eca9e.js";import"./definitions-0bc08d4c.js";import"./number-e491b09e.js";import"./BidiEngine-9a40f2f4.js";import"./diffUtils-590c9088.js";import"./Pipeline-98b9d349.js";import"./QueryEngine-19eda5ff.js";import"./normalizeUtils-cf8b8053.js";import"./normalizeUtilsCommon-500064b3.js";import"./WhereClause-c86b9974.js";import"./executionError-c92d3b85.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-42e44ded.js";import"./utils-2fe9d339.js";import"./generateRendererUtils-1e52a587.js";import"./FieldsIndex-f79a8f26.js";import"./StreamFeatureManager-4b8ac3ac.js";import"./quickselect-e80674f5.js";import"./arcadeTimeUtils-e1438cc8.js";import"./centroid-8e8cfa47.js";import"./ogcFeatureUtils-1ccf1f8d.js";import"./geojson-077f67ec.js";import"./clientSideDefaults-ab04bd90.js";import"./defaultsJSON-59981e75.js";import"./query-93c6e211.js";import"./pbfQueryUtils-26a87215.js";import"./pbf-d9aa3914.js";import"./queryZScale-8f9616ff.js";import"./Query-1c961d4c.js";import"./createConnection-4b117798.js";import"./geohashUtils-77d8429b.js";import"./tileUtils-48cbbab9.js";import"./TurboLine-aac2edf4.js";import"./Rect-98da58d6.js";import"./GeometryUtils-0258f920.js";function u(e){var r;return e.type==="line-marker"?{type:"line-marker",color:(r=e.color)==null?void 0:r.toJSON(),placement:e.placement,style:e.style}:e.constructor.fromJSON(e.toJSON()).toJSON()}function y(e){return b(e)}function ne(e,r,t=!1){if(!e)return null;switch(e.type){case"simple-fill":case"picture-fill":return x(e,r,t);case"simple-marker":case"picture-marker":return g(e,r,t);case"simple-line":return K(e,r,t);case"text":return z(e,r,t);case"label":return d(e,r,t);case"cim":return{type:"cim",rendererKey:r.vvFlags,data:e.data,maxVVSize:r.maxVVSize};case"CIMSymbolReference":return{type:"cim",rendererKey:r.vvFlags,data:e,maxVVSize:r.maxVVSize};case"web-style":return{...u(e),type:"web-style",hash:e.hash(),rendererKey:r.vvFlags,maxVVSize:r.maxVVSize};default:throw new Error(`symbol not supported ${e.type}`)}}function d(e,r,t){const o=e.toJSON(),i=h(c.LABEL,{...r,placement:o.labelPlacement});return{materialKey:t?y(i):i,hash:e.hash(),...o,labelPlacement:o.labelPlacement}}function x(e,r,t){const o=h(c.FILL,r),i=t?y(o):o,m=e.clone(),a=m.outline,s=V(r.symbologyType);s||(m.outline=null);const p={materialKey:i,hash:m.hash(),...u(m)};if(s)return p;const l=[];if(l.push(p),a){const n=h(c.LINE,{...r,isOutline:!0}),f={materialKey:t?y(n):n,hash:a.hash(),...u(a)};l.push(f)}return{type:"composite-symbol",layers:l,hash:l.reduce((n,f)=>f.hash+n,"")}}function K(e,r,t){const o=V(r.symbologyType)?S.DEFAULT:r.symbologyType,i=h(c.LINE,{...r,symbologyType:o}),m=t?y(i):i,a=e.clone(),s=a.marker;a.marker=null;const p=[];if(p.push({materialKey:m,hash:a.hash(),...u(a)}),s){const l=h(c.MARKER,r),n=t?y(l):l;s.color=s.color??a.color,p.push({materialKey:n,hash:s.hash(),lineWidth:a.width,...u(s)})}return{type:"composite-symbol",layers:p,hash:p.reduce((l,n)=>n.hash+l,"")}}function g(e,r,t){const o=h(c.MARKER,r),i=t?y(o):o,m=u(e);return{materialKey:i,hash:e.hash(),...m,angle:e.angle,maxVVSize:r.maxVVSize}}function z(e,r,t){const o=h(c.TEXT,r),i=t?y(o):o,m=u(e);return{materialKey:i,hash:e.hash(),...m,angle:e.angle,maxVVSize:r.maxVVSize}}export{ne as createSymbolSchema};

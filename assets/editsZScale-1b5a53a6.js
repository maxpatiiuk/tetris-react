import{cL as l,cM as c}from"./index-080e108a.js";function t(n,o,s){if(n.hasM==null||n.hasZ)for(const f of o)for(const e of f)e.length>2&&(e[2]*=s)}function i(n,o,s){if(!n&&!o||!s)return;const f=l(s);r(n,s,f),r(o,s,f)}function r(n,o,s){if(n)for(const f of n)a(f.geometry,o,s)}function a(n,o,s){if(n==null||!n.spatialReference||c(n.spatialReference,o))return;const f=l(n.spatialReference)/s;if(f!==1){if("x"in n)n.z!=null&&(n.z*=f);else if("rings"in n)t(n,n.rings,f);else if("paths"in n)t(n,n.paths,f);else if("points"in n&&(n.hasM==null||n.hasZ))for(const e of n.points)e.length>2&&(e[2]*=f)}}export{i};

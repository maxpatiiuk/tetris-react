import{eQ as _,eS as S,cX as b,eR as T,as as w,bc as v,bf as O,at as u,av as $,eX as R,ar as h,bW as W,cB as j,ba as U,f3 as L,ai as a,aj as o,ay as P,bY as A,f4 as B,al as M,aA as N}from"./index-080e108a.js";import{O as k}from"./MultiOriginJSONSupport-e4912ffd.js";import{i as C}from"./APIKeyMixin-878a7aa7.js";import{p as I}from"./ArcGISCachedService-344b6262.js";import{E as D,f as J,Y as q}from"./SublayersOwner-ee341b5e.js";import{l as G}from"./ArcGISService-83287338.js";import{o as E}from"./CustomParametersMixin-231c4be8.js";import{c as V}from"./OperationalLayer-0e8f8b28.js";import{j as x}from"./PortalLayer-310c2800.js";import{f as K}from"./commonProperties-30089b06.js";import{o as y}from"./imageBitmapUtils-391f7b8f.js";import"./TileInfoTilemapCache-b3f5dda7.js";import"./TilemapCache-67ada3c3.js";import"./portalItemUtils-792a27e1.js";import"./UniqueValueRenderer-fef4204d.js";import"./diffUtils-590c9088.js";import"./jsonUtils-f73b3833.js";import"./DictionaryLoader-c0729336.js";import"./FieldsIndex-f79a8f26.js";import"./heatmapUtils-327ef4c5.js";import"./sql-734ecbc5.js";import"./QueryTask-6f808a9e.js";import"./Query-1c961d4c.js";import"./executeForIds-5eaf002d.js";import"./query-93c6e211.js";import"./normalizeUtils-cf8b8053.js";import"./normalizeUtilsCommon-500064b3.js";import"./pbfQueryUtils-26a87215.js";import"./pbf-d9aa3914.js";import"./queryZScale-8f9616ff.js";import"./executeQueryJSON-7c41ada5.js";import"./FeatureSet-111cb247.js";import"./executeQueryPBF-0f188593.js";import"./FeatureType-db96032c.js";import"./FeatureTemplate-2a7e96c1.js";import"./LabelClass-2d53c485.js";import"./defaults-34554cbf.js";import"./defaultsJSON-59981e75.js";import"./labelingInfo-144f3d9f.js";import"./serviceCapabilitiesUtils-959e798a.js";import"./AttachmentQuery-972bbd60.js";import"./popupUtils-82ea8abb.js";import"./sublayerUtils-1269bca6.js";var m;const f=["Canvas/World_Dark_Gray_Base","Canvas/World_Dark_Gray_Reference","Canvas/World_Light_Gray_Base","Canvas/World_Light_Gray_Reference","Elevation/World_Hillshade","Elevation/World_Hillshade_Dark","Ocean/World_Ocean_Base","Ocean/World_Ocean_Reference","Ocean_Basemap","Reference/World_Boundaries_and_Places","Reference/World_Boundaries_and_Places_Alternate","Reference/World_Transportation","World_Imagery","World_Street_Map","World_Topo_Map"];let i=m=class extends _(S(D(I(J(V(x(G(k(b(T(C(E(N))))))))))))){constructor(...e){super(...e),this.listMode="show",this.isReference=null,this.operationalLayerType="ArcGISTiledMapServiceLayer",this.resampling=!0,this.sourceJSON=null,this.spatialReference=null,this.path=null,this.sublayers=null,this.type="tile",this.url=null}normalizeCtorArgs(e,r){return typeof e=="string"?{url:e,...r}:e}load(e){const r=e!=null?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(w).then(()=>this._fetchService(r))),Promise.resolve(this)}get attributionDataUrl(){var r;const e=(r=this.parsedUrl)==null?void 0:r.path.toLowerCase();return e?this._getDefaultAttribution(this._getMapName(e)):null}readSpatialReference(e,r){return(e=e||r.tileInfo&&r.tileInfo.spatialReference)&&v.fromJSON(e)}writeSublayers(e,r,t,s){if(!this.loaded||!e)return;const p=e.slice().reverse().flatten(({sublayers:l})=>l&&l.toArray().reverse()).toArray(),n=[],c={writeSublayerStructure:!1,...s};p.forEach(l=>{const d=l.write({},c);n.push(d)}),n.some(l=>Object.keys(l).length>1)&&(r.layers=n)}get tileServers(){var e;return this._getDefaultTileServers((e=this.parsedUrl)==null?void 0:e.path)}castTileServers(e){return Array.isArray(e)?e.map(r=>O(r).path):null}fetchTile(e,r,t,s={}){const{signal:p}=s,n=this.getTileUrl(e,r,t),c={responseType:"image",signal:p,query:{...this.refreshParameters}};return u(n,c).then(l=>l.data)}async fetchImageBitmapTile(e,r,t,s={}){const{signal:p}=s;if(this.fetchTile!==m.prototype.fetchTile){const d=await this.fetchTile(e,r,t,s);return y(d,e,r,t,p)}const n=this.getTileUrl(e,r,t),c={responseType:"blob",signal:p,query:{...this.refreshParameters}},{data:l}=await u(n,c);return y(l,e,r,t,p)}getTileUrl(e,r,t){var c,l;const s=!this.capabilities.operations.supportsTileMap&&this.supportsBlankTile,p=$({...(c=this.parsedUrl)==null?void 0:c.query,blankTile:!s&&null,...this.customParameters,token:this.apiKey}),n=this.tileServers;return`${n&&n.length?n[r%n.length]:(l=this.parsedUrl)==null?void 0:l.path}/tile/${e}/${r}/${t}${p?"?"+p:""}`}loadAll(){return R(this,e=>{e(this.allSublayers)})}_fetchService(e){return new Promise((r,t)=>{if(this.sourceJSON){if(this.sourceJSON.bandCount!=null&&this.sourceJSON.pixelSizeX!=null)throw new h("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");return void r({data:this.sourceJSON})}if(!this.parsedUrl)throw new h("tile-layer:undefined-url","layer's url is not defined");const s=W(this.parsedUrl.path);if(s!=null&&s.serverType==="ImageServer")throw new h("tile-layer:unsupported-url","use ImageryTileLayer to open a tiled image service");u(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},responseType:"json",signal:e}).then(r,t)}).then(r=>{let t=this.url;if(r.ssl&&(t=this.url=t.replace(/^http:/i,"https:")),this.sourceJSON=r.data,this.read(r.data,{origin:"service",url:this.parsedUrl}),this.version===10.1&&!j(t))return this._fetchServerVersion(t,e).then(s=>{this.read({currentVersion:s})}).catch(()=>{})})}_fetchServerVersion(e,r){if(!U(e))return Promise.reject();const t=e.replace(/(.*\/rest)\/.*/i,"$1")+"/info";return u(t,{query:{f:"json",...this.customParameters,token:this.apiKey},responseType:"json",signal:r}).then(s=>{if(s.data&&s.data.currentVersion)return s.data.currentVersion;throw new h("tile-layer:version-not-available")})}_getMapName(e){const r=e.match(/^(?:https?:)?\/\/(server\.arcgisonline\.com|services\.arcgisonline\.com|ibasemaps-api\.arcgis\.com)\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/mapserver/i);return r?r[2]:void 0}_getDefaultAttribution(e){if(e==null)return null;let r;e=e.toLowerCase();for(let t=0,s=f.length;t<s;t++)if(r=f[t],r.toLowerCase().includes(e))return L("//static.arcgis.com/attribution/"+r);return null}_getDefaultTileServers(e){if(e==null)return[];const r=e.search(/^(?:https?:)?\/\/server\.arcgisonline\.com/i)!==-1,t=e.search(/^(?:https?:)?\/\/services\.arcgisonline\.com/i)!==-1;return r||t?[e,e.replace(r?/server\.arcgisonline/i:/services\.arcgisonline/i,r?"services.arcgisonline":"server.arcgisonline")]:[]}get hasOverriddenFetchTile(){return!this.fetchTile[g]}};a([o({readOnly:!0})],i.prototype,"attributionDataUrl",null),a([o({type:["show","hide","hide-children"]})],i.prototype,"listMode",void 0),a([o({json:{read:!0,write:!0}})],i.prototype,"blendMode",void 0),a([o({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],i.prototype,"isReference",void 0),a([o({readOnly:!0,type:["ArcGISTiledMapServiceLayer"]})],i.prototype,"operationalLayerType",void 0),a([o({type:Boolean})],i.prototype,"resampling",void 0),a([o()],i.prototype,"sourceJSON",void 0),a([o({type:v})],i.prototype,"spatialReference",void 0),a([P("spatialReference",["spatialReference","tileInfo"])],i.prototype,"readSpatialReference",null),a([o({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],i.prototype,"path",void 0),a([o({readOnly:!0})],i.prototype,"sublayers",void 0),a([A("sublayers",{layers:{type:[q]}})],i.prototype,"writeSublayers",null),a([o({json:{read:!1,write:!1}})],i.prototype,"popupEnabled",void 0),a([o()],i.prototype,"tileServers",null),a([B("tileServers")],i.prototype,"castTileServers",null),a([o({readOnly:!0,json:{read:!1}})],i.prototype,"type",void 0),a([o(K)],i.prototype,"url",void 0),i=m=a([M("esri.layers.TileLayer")],i);const g=Symbol("default-fetch-tile");i.prototype.fetchTile[g]=!0;const ke=i;export{ke as default};

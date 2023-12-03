import{am as g,ai as t,aj as r,ay as y,eZ as v,al as h,bz as b,gC as L,cY as w,at as F,dL as I,ar as p,aK as S,ca as O,bc as j,fR as x,cC as T,d2 as $,cp as q}from"./index-080e108a.js";import"./UniqueValueRenderer-fef4204d.js";import{n as E}from"./jsonUtils-f73b3833.js";import m from"./FeatureLayer-5c6d2c3b.js";import{S as Q}from"./MultiOriginJSONSupport-e4912ffd.js";import{y as u,p as P}from"./commonProperties-30089b06.js";import{t as A}from"./capabilities-5d185925.js";import{s as D}from"./fieldProperties-62c55499.js";import{r as R}from"./FieldsIndex-f79a8f26.js";import{r as N}from"./I3SIndexInfo-445e6968.js";import{s as U,l as _,u as C,m as B}from"./I3SLayerDefinitions-ffdb3821.js";import{b as K}from"./Query-1c961d4c.js";import{p as M}from"./popupUtils-82ea8abb.js";import{l as Z}from"./I3SUtil-2c288808.js";import{n as k,p as V}from"./popupUtils-f04ec9a9.js";let n=class extends g(Q){constructor(e){super(e),this.title="",this.id=-1,this.modelName=null,this.isEmpty=null,this.legendEnabled=!0,this.visible=!0,this.opacity=1}readTitle(e,a){return typeof a.alias=="string"?a.alias:typeof a.name=="string"?a.name:""}readIdOnlyOnce(e){return this.id!==-1?this.id:typeof e=="number"?e:-1}};t([r({type:String,json:{origins:{"web-scene":{write:!0},"portal-item":{write:!0}}}})],n.prototype,"title",void 0),t([y("service","title",["alias","name"])],n.prototype,"readTitle",null),t([r()],n.prototype,"layer",void 0),t([r({type:v,readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0}}})],n.prototype,"id",void 0),t([y("service","id")],n.prototype,"readIdOnlyOnce",null),t([r(u(String))],n.prototype,"modelName",void 0),t([r(u(Boolean))],n.prototype,"isEmpty",void 0),t([r({type:Boolean,nonNullable:!0})],n.prototype,"legendEnabled",void 0),t([r({type:Boolean,json:{name:"visibility",write:!0}})],n.prototype,"visible",void 0),t([r({type:Number,json:{write:!0}})],n.prototype,"opacity",void 0),n=t([h("esri.layers.buildingSublayers.BuildingSublayer")],n);const z=n,f="esri.layers.buildingSublayers.BuildingComponentSublayer",G=b.getLogger(f),c=D();let i=class extends L.LoadableMixin(w(z)){constructor(e){super(e),this.type="building-component",this.nodePages=null,this.materialDefinitions=[],this.textureSetDefinitions=[],this.geometryDefinitions=[],this.indexInfo=null,this.serviceUpdateTimeStamp=null,this.store=null,this.attributeStorageInfo=[],this.fields=[],this.associatedLayer=null,this.outFields=null,this.listMode="show",this.renderer=null,this.definitionExpression=null,this.popupEnabled=!0,this.popupTemplate=null,this.layerType="3d-object"}get parsedUrl(){var e,a;return this.layer?{path:`${(e=this.layer.parsedUrl)==null?void 0:e.path}/sublayers/${this.id}`,query:(a=this.layer.parsedUrl)==null?void 0:a.query}:{path:""}}get fieldsIndex(){return new R(this.fields)}readAssociatedLayer(e,a){const s=this.layer.associatedFeatureServiceItem,o=a.associatedLayerID;return s!=null&&typeof o=="number"?new m({portalItem:s,layerId:o}):null}get objectIdField(){if(this.fields!=null){for(const e of this.fields)if(e.type==="oid")return e.name}return null}get displayField(){return this.associatedLayer!=null?this.associatedLayer.displayField:void 0}get apiKey(){return this.layer.apiKey}get fullExtent(){return this.layer.fullExtent}get spatialReference(){return this.layer.spatialReference}get version(){return this.layer.version}get elevationInfo(){return this.layer.elevationInfo}get minScale(){return this.layer.minScale}get maxScale(){return this.layer.maxScale}get effectiveScaleRange(){return this.layer.effectiveScaleRange}get defaultPopupTemplate(){return this.createPopupTemplate()}load(e){const a=e!=null?e.signal:null,s=this._fetchService(a).then(()=>{this.indexInfo=N(this.parsedUrl.path,this.rootNode,this.nodePages,this.apiKey,G,a)});return this.addResolvingPromise(s),Promise.resolve(this)}createPopupTemplate(e){return M(this,e)}async _fetchService(e){const a=(await F(this.parsedUrl.path,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(a,{origin:"service",url:this.parsedUrl})}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,a){var o,l,d;const s=(l=(o=this.getFeatureType(a==null?void 0:a.feature))==null?void 0:o.domains)==null?void 0:l[e];return s&&s.type!=="inherited"?s:((d=this.getField(e))==null?void 0:d.domain)??null}getFeatureType(e){return e&&this.associatedLayer!=null?this.associatedLayer.getFeatureType(e):null}get types(){return this.associatedLayer!=null?this.associatedLayer.types??[]:[]}get typeIdField(){return this.associatedLayer!=null?this.associatedLayer.typeIdField:null}get geometryType(){return this.layerType==="3d-object"?"mesh":"point"}get profile(){return this.layerType==="3d-object"?"mesh-pyramids":"points"}get capabilities(){const e=this.associatedLayer!=null&&this.associatedLayer.capabilities?this.associatedLayer.capabilities:A,{query:a,data:{supportsZ:s,supportsM:o,isVersioned:l}}=e;return{query:a,data:{supportsZ:s,supportsM:o,isVersioned:l}}}createQuery(){const e=new K;return this.geometryType!=="mesh"&&(e.returnGeometry=!0,e.returnZ=!0),e.where=this.definitionExpression||"1=1",e.sqlFormat="standard",e}queryExtent(e,a){return this._getAssociatedLayerForQuery().then(s=>s.queryExtent(e||this.createQuery(),a))}queryFeatureCount(e,a){return this._getAssociatedLayerForQuery().then(s=>s.queryFeatureCount(e||this.createQuery(),a))}queryFeatures(e,a){return this._getAssociatedLayerForQuery().then(s=>s.queryFeatures(e||this.createQuery(),a)).then(s=>{if(s!=null&&s.features)for(const o of s.features)o.layer=this.layer,o.sourceLayer=this;return s})}queryObjectIds(e,a){return this._getAssociatedLayerForQuery().then(s=>s.queryObjectIds(e||this.createQuery(),a))}async queryCachedAttributes(e,a){const s=I(this.fieldsIndex,await k(this,V(this)));return Z(this.parsedUrl.path,this.attributeStorageInfo,e,a,s)}async queryCachedFeature(e,a){const s=await this.queryCachedAttributes(e,[a]);if(!s||s.length===0)throw new p("scenelayer:feature-not-in-cached-data","Feature not found in cached data");const o=new S;return o.attributes=s[0],o.layer=this,o.sourceLayer=this,o}getFieldUsageInfo(e){return this.fieldsIndex.has(e)?{supportsLabelingInfo:!1,supportsRenderer:!1,supportsPopupTemplate:!1,supportsLayerQuery:!1}:{supportsLabelingInfo:!1,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:this.associatedLayer!=null}}_getAssociatedLayerForQuery(){const e=this.associatedLayer;return e!=null&&e.loaded?Promise.resolve(e):this._loadAssociatedLayerForQuery()}async _loadAssociatedLayerForQuery(){if(await this.load(),this.associatedLayer==null)throw new p("buildingscenelayer:query-not-available","BuildingSceneLayer component layer queries are not available without an associated feature layer",{layer:this});try{await this.associatedLayer.load()}catch(e){throw new p("buildingscenelayer:query-not-available","BuildingSceneLayer associated feature layer could not be loaded",{layer:this,error:e})}return this.associatedLayer}};t([r({readOnly:!0})],i.prototype,"parsedUrl",null),t([r({type:U,readOnly:!0})],i.prototype,"nodePages",void 0),t([r({type:[_],readOnly:!0})],i.prototype,"materialDefinitions",void 0),t([r({type:[C],readOnly:!0})],i.prototype,"textureSetDefinitions",void 0),t([r({type:[B],readOnly:!0})],i.prototype,"geometryDefinitions",void 0),t([r({readOnly:!0})],i.prototype,"serviceUpdateTimeStamp",void 0),t([r({readOnly:!0})],i.prototype,"store",void 0),t([r({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],i.prototype,"rootNode",void 0),t([r({readOnly:!0})],i.prototype,"attributeStorageInfo",void 0),t([r(c.fields)],i.prototype,"fields",void 0),t([r({readOnly:!0})],i.prototype,"fieldsIndex",null),t([r({readOnly:!0,type:m})],i.prototype,"associatedLayer",void 0),t([y("service","associatedLayer",["associatedLayerID"])],i.prototype,"readAssociatedLayer",null),t([r(c.outFields)],i.prototype,"outFields",void 0),t([r({type:String,readOnly:!0})],i.prototype,"objectIdField",null),t([r({readOnly:!0,type:String,json:{read:!1}})],i.prototype,"displayField",null),t([r({readOnly:!0,type:String})],i.prototype,"apiKey",null),t([r({readOnly:!0,type:O})],i.prototype,"fullExtent",null),t([r({readOnly:!0,type:j})],i.prototype,"spatialReference",null),t([r({readOnly:!0})],i.prototype,"version",null),t([r({readOnly:!0,type:x})],i.prototype,"elevationInfo",null),t([r({readOnly:!0,type:Number})],i.prototype,"minScale",null),t([r({readOnly:!0,type:Number})],i.prototype,"maxScale",null),t([r({readOnly:!0,type:Number})],i.prototype,"effectiveScaleRange",null),t([r({type:["hide","show"],json:{write:!0}})],i.prototype,"listMode",void 0),t([r({types:E,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:!0},value:null})],i.prototype,"renderer",void 0),t([r({type:String,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],i.prototype,"definitionExpression",void 0),t([r(P)],i.prototype,"popupEnabled",void 0),t([r({type:T,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],i.prototype,"popupTemplate",void 0),t([r({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],i.prototype,"normalReferenceFrame",void 0),t([r({readOnly:!0,json:{read:!1}})],i.prototype,"defaultPopupTemplate",null),t([r()],i.prototype,"types",null),t([r()],i.prototype,"typeIdField",null),t([r({json:{write:!1}}),$(new q({"3DObject":"3d-object",Point:"point"}))],i.prototype,"layerType",void 0),t([r()],i.prototype,"geometryType",null),t([r()],i.prototype,"profile",null),t([r({readOnly:!0,json:{read:!1}})],i.prototype,"capabilities",null),i=t([h(f)],i);const ye=i;export{ye as C,z as n};

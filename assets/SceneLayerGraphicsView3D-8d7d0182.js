import{iR as $,cu as j,iS as q,ah as y,ag as N,aG as H,aw as U,g8 as O,aD as T,cN as z,bq as Q,bz as w,eG as D,iT as k,gq as B,dO as W,g5 as F,iU as Z,dS as K,iV as Y,iW as X,aK as G,gD as J,iX as ee,i3 as te,iY as re,gk as ie,dW as se,ai as p,aj as g,aL as oe,al as ae,dT as ne,a$ as de}from"./index-080e108a.js";import{D as S,e as le}from"./I3SOverrides-96f73e2b.js";import{d as he}from"./FeatureFilter-00f4be05.js";import{b as A}from"./Query-1c961d4c.js";import{n as ue}from"./LayerView3D-ffd35809.js";import{_ as ce,c as pe}from"./FeatureLikeLayerView3D-2e3185ce.js";import{p as ge,r as me,l as _e,i as fe,j as ye}from"./SceneLayerView-b7d3fe23.js";import{y as be,g as ve,Z as xe,n as Ee,f as V}from"./I3SUtil-2c288808.js";import{t as Ie}from"./DefinitionExpressionSceneLayerView-66b62d34.js";import{i as we}from"./PopupSceneLayerView-c49dd096.js";import{t as Ne}from"./popupUtils-f04ec9a9.js";import"./I3SNode-2025159f.js";import"./I3SBinaryReader-2b8e30f7.js";import"./meshFeatureSet-8442b8e6.js";import"./FeatureSet-111cb247.js";import"./FeatureLayerView3D-7e7e2653.js";import"./FeatureLayerViewBase3D-8474587e.js";import"./query-93c6e211.js";import"./normalizeUtils-cf8b8053.js";import"./normalizeUtilsCommon-500064b3.js";import"./pbfQueryUtils-26a87215.js";import"./pbf-d9aa3914.js";import"./queryZScale-8f9616ff.js";import"./EventedSet-d13fada5.js";import"./commonProperties-30089b06.js";import"./FeatureEffect-86735d98.js";import"./floorFilterUtils-080a7cd2.js";import"./LayerView-448bc5ea.js";import"./RefreshableLayerView-915e7f53.js";import"./dehydratedFeatureComparison-a3375a3e.js";import"./queryForSymbologySnapping-0264f2b5.js";import"./elevationInfoUtils-4fd79d95.js";import"./hash-6f442295.js";import"./diffUtils-590c9088.js";import"./Graphics3DObjectStates-bb2a6162.js";import"./UniqueValueRenderer-fef4204d.js";import"./jsonUtils-f73b3833.js";import"./DictionaryLoader-c0729336.js";import"./FieldsIndex-f79a8f26.js";import"./heatmapUtils-327ef4c5.js";import"./defaults-34554cbf.js";import"./defaultsJSON-59981e75.js";import"./optimizedFeatureQueryEngineAdapter-58185a60.js";import"./centroid-8e8cfa47.js";import"./PooledRBush-3cae7682.js";import"./quickselect-e80674f5.js";import"./QueryEngine-19eda5ff.js";import"./WhereClause-c86b9974.js";import"./executionError-c92d3b85.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-42e44ded.js";import"./utils-2fe9d339.js";import"./generateRendererUtils-1e52a587.js";import"./FeatureStore-f0e312fc.js";import"./BoundsStore-b6bd3c14.js";import"./projectExtentUtils-efa4cddd.js";class M extends ${constructor(t){super("SceneLayerWorker","dracoDecompressPointCloudData",{dracoDecompressPointCloudData:i=>[i.geometryBuffer]},t,{hasInitialize:!0})}}class Oe extends j{constructor(t,i){super(),this._updateAndCompare=t,this._notifyUpdated=i,this._nodes=new Map,this._graphics=new Map,this._duplicates=new Map}clear(){if(this._graphics.size>0){const t=this.toArray();this._graphics.clear(),this.emit("change",{added:[],removed:t})}this._nodes.clear()}get length(){return this._graphics.size}get(t){return this._graphics.get(t)}getNode(t){return this._nodes.get(t)}hasNode(t){return this._nodes.has(t)}nodes(){return this._nodes.values()}addNode(t,i){this._nodes.set(t,i);const r=i.graphics;if(r.length===0)return;const s=new Set;for(let a=0;a<r.length;a++){const n=r[a],d=n.objectId,h=this._graphics.get(d);if(h){s.add(d),n!==h&&(r[a]=h);const u=this._duplicates.get(d);u?u.push(t):this._duplicates.set(d,[h.nodeIndex,t])}else n.nodeIndex=t,this._graphics.set(d,n)}s.size&&this._updateForeignGraphics(i);const o=s.size>0?r.filter(a=>!s.has(a.objectId)):r;o.length>0&&this.emit("change",{added:o,removed:[]})}removeNode(t){const i=this._nodes.get(t);if(!i)return void console.error("Removing unknown node");this._nodes.delete(t);const r=new Set,s=[];for(const o of i.graphics){const a=o.objectId,n=this._graphics.get(a);if(!n)continue;const d=this._duplicates.get(a);if(d){const h=d.indexOf(t);if(h===-1){console.error("error: removing graphic from node that should not reference it.");continue}if(d.splice(h,1),n.nodeIndex===t){let u=this.getNode(d[0]);for(let l=1;l<d.length;l++){const m=this.getNode(d[l]);(u==null||m!=null&&m.node.level>u.node.level)&&(u=m)}u!=null&&r.add(u)}d.length===1&&this._duplicates.delete(a)}else this._graphics.delete(a),s.push(o)}s.length>0&&this.emit("change",{added:[],removed:s}),r.forEach(o=>this._updateForeignGraphics(o))}_updateForeignGraphics(t){const i=[],r=t.node.index,s=t.node.level;let o=0;for(;o<t.graphics.length;){const a=t.graphics[o].nodeIndex;if(a===r){o++;continue}let n=1;for(;o+n<t.graphics.length&&t.graphics[o+n].nodeIndex===a;)n++;const d=this.getNode(a);if(d!=null&&d.node.level>s)o+=n;else{for(let h=o;h<o+n;h++){const u=t.graphics[h];u.nodeIndex=r,this._updateAndCompare(u,t,h)&&i.push(u)}o+=n}}this._notifyUpdated(i)}toArray(){return Array.from(this._graphics.values())}find(t){let i;return q(this._graphics,r=>!!t(r)&&(i=r,!0)),i}forEach(t){this._graphics.forEach(i=>t(i))}forEachNode(t){this._nodes.forEach((i,r)=>t(i,r))}get nodeCount(){return this._nodes.size}_checkInvariants(){const t=new Map;this._nodes.forEach((r,s)=>{s!==r.node.index&&console.error("Mismatched node index"),r.graphics.forEach(o=>{t.set(o.objectId,1+(t.get(o.objectId)??0));const a=this._duplicates.get(o.objectId);a&&!a.includes(s)&&console.error("Node not listed in duplicate list"),a||o.nodeIndex===s||console.error("Unique graphic does not reference owning node index")})}),this._graphics.size!==t.size&&console.error("Mismatch between actual and expected number of graphics");let i=0;t.forEach((r,s)=>{i+=r>1?1:0;const o=this._graphics.get(s);if(!o)return void console.error("Missing graphic entry");const a=this._nodes.get(o.nodeIndex);if(!a)return void console.error("Graphic references unkown node");const n=this._duplicates.get(s);n?(n.length!==r&&console.error("Wrong number of entries in duplicate list"),n.forEach(d=>{const h=this._nodes.get(d);h?h.node.level>a.node.level&&console.error("Duplicated graphic does not reference highest level node"):console.error("Unknown node in duplicate list")})):r>1&&console.error("Missing duplicates entry")}),this._duplicates.size!==i&&console.error("Mismatch between expected and actual number of duplicate entries")}}const P=fe();class Ce{constructor(t,i,r,s){this.graphics=t,this.featureIds=i,this.attributeInfo=r,this.node=s}}let c=class extends Ie(we(ue(ye))){constructor(){super(...arguments),this.type="scene-layer-graphics-3d",this._queryEngine=null,this._memCache=null,this._interactiveEditingSessions=new Map,this.loadedGraphics=new Oe((e,t,i)=>Fe(e,t,i),e=>this.processor.graphicsCore.recreateGraphics(e)),this.holeFilling="always",this.progressiveLoadFactor=1,this.supportsHeightUnitConversion=!0,this._coordinatesOutsideExtentErrors=0,this._maxCoordinatesOutsideExtentErrors=20}tryRecycleWith(e,t){return e.url===this.layer.url&&this._i3sOverrides.isEmpty?e.load(t).then(()=>{var r;be(this.layer,e,this._i3sOverrides),this.layer=e,this._i3sOverrides.destroy();const i=(r=this.view.resourceController)==null?void 0:r.memoryController;this._i3sOverrides=new S({view:this.view,layer:e,memoryController:i}),y(this._queryEngine),this._setupQueryEngine(),this.processor.resetObjectStates()}):null}initialize(){var t,i;this.addResolvingPromise(this.layer.indexInfo);const e=(t=this.view.resourceController)==null?void 0:t.memoryController;this._i3sOverrides=new S({view:this.view,layer:this.layer,memoryController:e}),ve(this.layer,this.view.spatialReference,this.view.viewingMode),this._fieldsHelper=new ge({layerView:this}),this.updatingHandles.add(()=>this.layer.rangeInfos,r=>this._rangeInfosChanged(r),N),this.updatingHandles.add(()=>this.layer.renderer,(r,s)=>this._rendererChange(r,s)),this.updatingHandles.add(()=>[this.parsedDefinitionExpression,this._excludeObjectIdsSorted],()=>this._filterChange()),this.handles.add(H(()=>O.I3S_TREE_SHOW_TILES,r=>{if(r&&!this._treeDebugger){const s=this._controller.crsIndex;U(()=>import("./I3STreeDebugger-794166fd.js"),["assets/I3STreeDebugger-794166fd.js","assets/index-080e108a.js","assets/index-a8e73b5e.css","assets/TileTreeDebugger-142b9f39.js"]).then(({I3STreeDebugger:o})=>{!this._treeDebugger&&O.I3S_TREE_SHOW_TILES&&(this._treeDebugger=new o({lv:this,view:this.view,nodeSR:s}))})}else r||!this._treeDebugger||O.I3S_TREE_SHOW_TILES||(this._treeDebugger.destroy(),this._treeDebugger=null)},N)),this._set("processor",new ce({owner:this,preferredUpdatePolicy:T.ASYNC,scaleVisibilityEnabled:!0,filterVisibilityEnabled:!0,timeExtentEnabled:!1,frustumVisibilityEnabled:!1,elevationAlignmentEnabled:!0,elevationFeatureExpressionEnabled:!1,setUidToIdOnAdd:!1,dataExtent:this.layer.fullExtent,updateClippingExtent:r=>this._updateClippingExtent(r)})),(i=this.processor.elevationAlignment)==null||i.events.on("invalidate-elevation",r=>this._controller.updateElevationChanged(r.extent,r.spatialReference)),this.supportsHeightUnitConversion&&(this._verticalScale=z("point",this.layer.spatialReference,this.view.spatialReference)),this.addResolvingPromise(this.processor.initializePromise),this._memCache=this.view.resourceController.memoryController.newCache(`psl-${this.uid}`),this._controller=new le({layerView:this,scaleVisibilityEnabled:!1}),xe(this.layer.geometryDefinitions)&&(this._worker=new M(r=>this.view.resourceController.immediate.schedule(r))),this.handles.add(this.layer.on("apply-edits",r=>this.updatingHandles.addPromise(r.result))),this.handles.add(this.layer.on("edits",r=>this._handleEdits(r))),this.when(()=>{this._setupQueryEngine(),this.updatingHandles.add(()=>this.maximumNumberOfFeatures,r=>this._controller.featureTarget=r,N),this.updatingHandles.add(()=>this.suspended,r=>{r&&this._removeAllNodeData()})})}destroy(){this._treeDebugger=y(this._treeDebugger),this._i3sOverrides=y(this._i3sOverrides),this._set("processor",y(this.processor)),this._controller=y(this._controller),this._queryEngine=y(this._queryEngine),this._worker=y(this._worker),this._memCache=y(this._memCache),this.loadedGraphics.clear(),this._fieldsHelper=y(this._fieldsHelper)}get i3slayer(){return this.layer}get updatingProgressValue(){var e;return((e=this._controller)==null?void 0:e.updatingProgress)??1}get requiredFields(){var e;return((e=this._fieldsHelper)==null?void 0:e.requiredFields)??[]}get maximumNumberOfFeatures(){var t,i;const e=(i=(t=this.processor)==null?void 0:t.graphicsCore)==null?void 0:i.displayFeatureLimit;return(e==null?void 0:e.maximumNumberOfFeatures)??0}set maximumNumberOfFeatures(e){e!=null?(this._override("maximumNumberOfFeatures",e),this._controller.fixedFeatureTarget=!0):(this._clearOverride("maximumNumberOfFeatures"),this._controller.fixedFeatureTarget=!1)}get maximumNumberOfFeaturesExceeded(){var e;return!this.suspended&&!!((e=this._controller)!=null&&e.useMaximumNumberOfFeatures)&&!this._controller.leavesReached}get _excludeObjectIdsSorted(){const e=this.layer.excludeObjectIds;return e.length?e.toArray().sort((t,i)=>t-i):null}get lodFactor(){return this.layer.semantic==="Labels"?1:this.view.qualitySettings.sceneService.point.lodFactor}get hasM(){return!1}get hasZ(){return!0}get contentVisible(){var e;return!this.suspended&&!!((e=this._controller)!=null&&e.rootNodeVisible)}get legendEnabled(){var e;return this.contentVisible&&((e=this.i3slayer)==null?void 0:e.legendEnabled)===!0}async whenGraphicAttributes(e,t){return Ee(this.layer,e,this._getObjectIdField(),t,()=>[...this.loadedGraphics.nodes()])}getHit(e){if(!this.loadedGraphics)return null;const t=Q(this.loadedGraphics.find(r=>r.uid===e),this.layer),i=this._getObjectIdField();return t&&t.attributes&&t.attributes[i]?(t.layer=this.layer,t.sourceLayer=this.layer,{type:"graphic",graphic:t,layer:t.layer}):null}whenGraphicBounds(e,t){return this.processor.whenGraphicBounds(e,t)}computeAttachmentOrigin(e,t){return this.processor.computeAttachmentOrigin(e,t)}isUpdating(){var e,t,i;return!!((e=this._controller)!=null&&e.updating||(t=this.processor)!=null&&t.updating||(i=this._fieldsHelper)!=null&&i.updating||this.layerFilterUpdating)}highlight(e){return this.processor.highlight(e,this.layer.objectIdField)}get updatePolicy(){return this.processor.graphicsCore.effectiveUpdatePolicy}createInteractiveEditSession(e){return me(this._attributeEditingContext,e)}async _decompressBinaryPointData(e,t){const i={geometryBuffer:e.geometryBuffer};this._worker==null&&(this._worker=new M(s=>this.view.resourceController.immediate.schedule(s)));const r=await this._worker.invoke(i,t);if(r==null)throw new Error("Failed to decompress Draco point data");return{positionData:r.positions,featureIds:r.featureIds}}async addNode(e,t,i){var f;if(!C(t)&&!De(t))throw new Error;if(this.loadedGraphics.hasNode(e.index))return void w.getLogger(this).error("I3S node "+e.id+" already added");const r=this.layer.fullExtent!=null?Ge(this.layer.fullExtent.clone(),.5):null,s=[],{featureIds:o,pointPositions:a}=C(t)?await this._extractBinaryPointPositions(e,t,i):this._extractLegacyPointPositions(t);this._validatePositions(e,o,a,r,s);const n=this._controller.crsVertex,d=this.view.spatialReference;D(a,n,0,a,d,0,o.length);const h=C(t)?e.level:0,u=this._createGraphics(o,a,e.index,h),l=new Ce(u,o,t.attributeDataInfo,e);if(await this._i3sOverrides.applyAttributeOverrides(l.featureIds,t.attributeDataInfo,i),e.numFeatures=l.graphics.length,this._updateNodeMemory(e),L(l),s.length>0&&(this._computeObb(e,s,n),this._controller.updateVisibility(e.index)),!this._controller.isGeometryVisible(e))return void this._cacheNodeData(l);if(this._verticalScale!=null)for(const b of l.graphics)this._verticalScale(b.geometry);const m=this.view._stage.renderView.objectAndLayerIdRenderHelper;if(m!=null){const b=k(this.view.map,this.layer.uid);for(let x=0;x<l.featureIds.length;x++){const I=l.featureIds[x];m.setUidToObjectAndLayerId(I,l.graphics[x].uid,this.layer.id,this.layer.uid,this.layer.popupEnabled&&!b&&Ne(this.layer,(f=this.view.popup)==null?void 0:f.defaultPopupTemplateEnabled),l.node.resources.attributes,x)}}this.loadedGraphics.addNode(e.index,l),this._controller.updateLoadStatus(e.index,!0),this._filterNode(l),this._treeDebugger&&this._treeDebugger.update()}_computeObb(e,t,i){const r=this._controller.crsIndex,s=r.isGeographic?this.view.renderSpatialReference:r;D(t,i,0,t,s,0,t.length/3),e.serviceObb=B(new de(t,3)),r.isGeographic&&W(e.serviceObb.center,s,e.serviceObb.center,r)}isNodeLoaded(e){return this.loadedGraphics.hasNode(e)}isNodeReloading(){return!1}updateNodeState(){}async _extractBinaryPointPositions(e,t,i){const r=await this._decompressBinaryPointData(t,i),s=r.positionData,o=3,a=s.length/o,n=F(3*a),d=e.serviceObb!=null?e.serviceObb.center:[0,0,0],h=Math.abs(d[2])*2**-20;for(let u=0;u<a;u++){const l=u*o;n[l]=s[l]+d[0],n[l+1]=s[l+1]+d[1],n[l+2]=s[l+2]+d[2],Math.abs(n[l+2])<h&&(n[l+2]=0)}return{featureIds:r.featureIds?Z(r.featureIds):[],pointPositions:n}}_extractLegacyPointPositions(e){var s,o;const t=e.pointData.length,i=F(3*t),r=new Array;for(let a=0;a<t;a++){const n=e.pointData[a],d=n.featureDataPosition,h=d.length,u=((s=n.geometries)==null?void 0:s[0])??Se[h],l=n.featureIds[0];if(u.type!=="Embedded"||u.params.type!=="points"||h<2||h>3)continue;const m=((o=u.params.vertexAttributes)==null?void 0:o.position)??[0,0,0],f=3*r.length;i[f]=d[0]+m[0],i[f+1]=d[1]+m[1],i[f+2]=h===3?d[2]+m[2]:NaN,r.push(l)}return{featureIds:r,pointPositions:i}}_validatePositions(e,t,i,r,s){if(r==null&&e.serviceObb)return;const o=t.length,a=3;for(let n=0;n<o;n++){const d=n*a;K(E,i[d],i[d+1],i[d+2]);const h=!Number.isNaN(i[2]);r==null||(h?Y(r,E):X(r,E))||(this._coordinatesOutsideExtentErrors<this._maxCoordinatesOutsideExtentErrors&&w.getLogger(this).error("Service Error: Coordinates outside of layer extent"),this._coordinatesOutsideExtentErrors+1===this._maxCoordinatesOutsideExtentErrors&&w.getLogger(this).error("Maximum number of errors reached. Further errors are ignored."),this._coordinatesOutsideExtentErrors++),e.serviceObb||s.push(E[0],E[1],E[2])}}_createGraphics(e,t,i,r){const s=e.length,o=3,a=this._getObjectIdField(),n=this.processor.graphicsCore,d=new Array,h=this.view.spatialReference;for(let u=0;u<s;u++){const l=e[u],m={};l!=null&&(m[a]=l);const f=l??G.generateUID(),b=u*o,x=isNaN(t[b+2])?void 0:t[b+2],I=J(t[b],t[b+1],x,h),v=this.loadedGraphics.get(f);if(v!=null)(v.level==null||v.level<r)&&(_.property="geometry",_.graphic=v,_.oldValue=v.geometry,_.newValue=I,v.geometry=I,v.level=r,n.graphicUpdateHandler(_)),d.push(v);else{const R=G.generateUID();d.push({objectId:f,uid:R,geometry:I,attributes:m,visible:!0,nodeIndex:i,level:r})}}return d}_updateNodeMemory(e){e.memory=4096+(e.numFeatures!=null?e.numFeatures*this.processor.graphicsCore.usedMemoryPerGraphic:0)}_cacheNodeData(e){const t=e.graphics.reduce((i,r)=>ee(r)+i,te(e.featureIds)+1024);this._memCache.put(this._getMemCacheKey(e.node),e,t)}_getMemCacheKey(e){return`${e.index}`}_removeAllNodeData(){this.loadedGraphics.forEachNode((e,t)=>{if(e){const i=e.node;this._updateNodeMemory(i),this._cacheNodeData(e)}this._controller.updateLoadStatus(t,!1)}),this._treeDebugger&&this._treeDebugger.update(),this.loadedGraphics.clear()}removeNode(e){const t=this._removeNodeStageData(e);t&&(this._updateNodeMemory(t.node),this._cacheNodeData(t))}_removeNodeStageData(e){const t=this.loadedGraphics.getNode(e);return t==null?null:(this._controller.updateLoadStatus(e,!1),this.loadedGraphics.removeNode(e),this._treeDebugger&&this._treeDebugger.update(),t)}async loadCachedNodeData(e){var t;return(t=this._memCache)==null?void 0:t.pop(this._getMemCacheKey(e))}async addCachedNodeData(e,t,i,r){this.loadedGraphics.hasNode(e.index)?w.getLogger(this).error("I3S node "+e.id+" already added"):(await this._i3sOverrides.applyAttributeOverrides(t.featureIds,i,r),this.loadedGraphics.addNode(e.index,t),this._controller.updateLoadStatus(e.index,!0),this._updateNodeMemory(e),t.attributeInfo=i,this._attributeValuesChanged(t),this._filterNode(t),this._treeDebugger&&this._treeDebugger.update())}getLoadedNodeIds(){const e=[];return this.loadedGraphics.forEachNode(t=>e.push(t.node.id)),e.sort()}getVisibleNodes(){const e=new Array;return this.loadedGraphics.forEachNode(t=>e.push(t.node)),e}getLoadedNodeIndices(e){this.loadedGraphics.forEachNode((t,i)=>e.push(i))}getLoadedAttributes(e){const t=this.loadedGraphics.getNode(e);if(t!=null&&t.attributeInfo!=null)return t.attributeInfo.loadedAttributes}getAttributeData(e){const t=this.loadedGraphics.getNode(e);if(t!=null&&t.attributeInfo!=null)return t.attributeInfo.attributeData}_setAttributeData(e,t){const i=this.loadedGraphics.getNode(e);i!=null&&i.attributeInfo!=null&&(i.attributeInfo.attributeData=t,this._attributeValuesChanged(i))}async updateAttributes(e,t,i){const r=this.loadedGraphics.getNode(e);r!=null&&(await this._i3sOverrides.applyAttributeOverrides(r.featureIds,t,i),r.attributeInfo=t,this._attributeValuesChanged(r))}_attributeValuesChanged(e){if(L(e),this._filterNode(e),this.processor.graphicsCore.labelsEnabled){const t=e.graphics.map(i=>i.uid);this.processor.graphicsCore.updateLabelingInfo(t)}}_updateClippingExtent(e){return this._controller&&this._controller.updateClippingArea(e),!1}_getObjectIdField(){return this.layer.objectIdField||re}_getGlobalIdField(){var e;return(e=this.layer.associatedLayer)==null?void 0:e.globalIdField}async _rendererChange(e,t){const{layer:{fieldsIndex:i}}=this,r=new Set;let s,o;e?(await e.collectRequiredFields(r,i),s=Array.from(r).sort()):s=[],r.clear(),t?(await t.collectRequiredFields(r,i),o=Array.from(r).sort()):o=[],s.length===o.length&&s.every((a,n)=>s[n]===o[n])||this._reloadAllNodes()}_rangeInfosChanged(e){e!=null&&e.length>0&&w.getLogger(this).warn("Unsupported property: rangeInfos are currently only serialized to and from web scenes but do not affect rendering.")}_filterChange(){this.loadedGraphics.forEachNode(e=>this._filterNode(e))}_reloadAllNodes(){this._removeAllNodeData(),this._controller&&this._controller.restartNodeLoading()}_filterNode(e){const t=this.parsedDefinitionExpression,i=this._excludeObjectIdsSorted,r=this._getObjectIdField();for(const s of e.graphics){const o=s.visible,a=!t||this._evaluateClause(t,s),n=i==null||ie(i,s.attributes[r])<0;s.visible=a&&n,o!==s.visible&&(_.graphic=s,_.property="visible",_.oldValue=o,_.newValue=s.visible,this.processor.graphicsCore.graphicUpdateHandler(_))}}createQuery(){const e={outFields:["*"],returnGeometry:!0,outSpatialReference:this.view.spatialReference};return this.filter!=null?this.filter.createQuery(e):new A(e)}queryFeatures(e,t){return this._queryEngine.executeQuery(this._ensureQuery(e),t==null?void 0:t.signal)}queryObjectIds(e,t){return this._queryEngine.executeQueryForIds(this._ensureQuery(e),t==null?void 0:t.signal)}queryFeatureCount(e,t){return this._queryEngine.executeQueryForCount(this._ensureQuery(e),t==null?void 0:t.signal)}queryExtent(e,t){return this._queryEngine.executeQueryForExtent(this._ensureQuery(e),t==null?void 0:t.signal)}_ensureQuery(e){return this._addDefinitionExpressionToQuery(e==null?this.createQuery():A.from(e))}_setupQueryEngine(){const e=()=>this.processor.featureStore;this._queryEngine=new pe({context:{spatialReference:this.view.spatialReference,layer:this.layer,scheduler:this.view.resourceController.scheduler,get featureStore(){return e()},hasZ:this.hasZ,hasM:this.hasM},priority:se.FEATURE_QUERY_ENGINE})}get usedMemory(){var e,t;return((t=(e=this.processor)==null?void 0:e.graphicsCore)==null?void 0:t.usedMemory)??0}get unloadedMemory(){var e,t,i;return .8*((((e=this._controller)==null?void 0:e.unloadedMemoryEstimate)??0)+(((i=(t=this.processor)==null?void 0:t.graphicsCore)==null?void 0:i.unprocessedMemoryEstimate)??0))}get ignoresMemoryFactor(){return this._controller&&this._controller.fixedFeatureTarget}_handleEdits(e){_e(this._attributeEditingContext,e)}get _attributeEditingContext(){const e=this._getObjectIdField(),t=this._getGlobalIdField();return{sessions:this._interactiveEditingSessions,fieldsIndex:this.layer.fieldsIndex,objectIdField:e,globalIdField:t,forEachNode:i=>this.loadedGraphics.forEachNode(r=>i(r.node,r.featureIds)),attributeStorageInfo:this.i3slayer.attributeStorageInfo??[],i3sOverrides:this._i3sOverrides,getAttributeData:i=>this.getAttributeData(i),setAttributeData:(i,r,s)=>{this._setAttributeData(i,r);const o=this.loadedGraphics.getNode(i);if(s!=null){const a=this.loadedGraphics.get(s.attributes[e]);a!=null&&this.processor.graphicsCore.recreateGraphics([a])}else o!=null&&this.processor.graphicsCore.recreateGraphics(o.graphics)},clearMemCache:()=>{}}}get performanceInfo(){const e={displayedNumberOfFeatures:this.loadedGraphics.length,maximumNumberOfFeatures:this.maximumNumberOfFeatures,totalNumberOfFeatures:-1,nodes:this.loadedGraphics.nodeCount,core:this.processor.graphicsCore.performanceInfo};return this._controller&&this._controller.updateStats(e),e}get test(){return{controller:this._controller,numNodes:this.loadedGraphics.nodeCount,loadedGraphics:this.loadedGraphics}}};p([g()],c.prototype,"processor",void 0),p([g({type:he})],c.prototype,"filter",void 0),p([g()],c.prototype,"loadedGraphics",void 0),p([g()],c.prototype,"i3slayer",null),p([g()],c.prototype,"_controller",void 0),p([g()],c.prototype,"updating",void 0),p([g()],c.prototype,"suspended",void 0),p([g()],c.prototype,"holeFilling",void 0),p([g(oe)],c.prototype,"updatingProgress",void 0),p([g()],c.prototype,"updatingProgressValue",null),p([g(P.requiredFields)],c.prototype,"requiredFields",null),p([g(P.availableFields)],c.prototype,"availableFields",void 0),p([g()],c.prototype,"_fieldsHelper",void 0),p([g({type:Number})],c.prototype,"maximumNumberOfFeatures",null),p([g({readOnly:!0})],c.prototype,"maximumNumberOfFeaturesExceeded",null),p([g()],c.prototype,"_excludeObjectIdsSorted",null),p([g({readOnly:!0})],c.prototype,"lodFactor",null),p([g({readOnly:!0})],c.prototype,"hasM",null),p([g({readOnly:!0})],c.prototype,"hasZ",null),p([g()],c.prototype,"contentVisible",null),p([g({readOnly:!0})],c.prototype,"legendEnabled",null),c=p([ae("esri.views.3d.layers.SceneLayerGraphicsView3D")],c);const Pt=c;function De(e){return"pointData"in e}function C(e){return"geometryBuffer"in e&&e.geometryBuffer!==null}function Fe(e,t,i){const r=t.attributeInfo;if(r==null||r.loadedAttributes==null||r.attributeData==null)return!1;let s=!1;for(const{name:o}of r.loadedAttributes)if(r.attributeData[o]){const a=V(r.attributeData[o],i);a!==e.attributes[o]&&(e.attributes[o]=a,s=!0)}return s}function L(e){const t=e.attributeInfo,i=e.node.index;if(t!=null&&t.loadedAttributes!=null&&t.attributeData!=null)for(let r=0;r<e.graphics.length;r++){const s=e.graphics[r];if(s.nodeIndex===i){s.attributes||(s.attributes={});for(const{name:o}of t.loadedAttributes)t.attributeData[o]&&(s.attributes[o]=V(t.attributeData[o],r))}}}function Ge(e,t){return e.xmin-=t,e.ymin-=t,e.xmax+=t,e.ymax+=t,e.zmin!=null&&e.zmax!=null&&(e.zmin-=t,e.zmax+=t),e.mmin!=null&&e.mmax!=null&&(e.mmin-=t,e.mmax+=t),e}const Se={2:{type:"Embedded",params:{type:"points",vertexAttributes:{position:[0,0]}}},3:{type:"Embedded",params:{type:"points",vertexAttributes:{position:[0,0,0]}}}},E=ne(),_={graphic:null,property:null,oldValue:null,newValue:null};export{Pt as default};

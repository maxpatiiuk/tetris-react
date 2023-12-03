import{aw as M,hf as q,bz as O,hH as $,hI as N,hJ as D,aG as E,hK as H,hL as z,hM as V,hN as T,at as j,bn as G,hO as v,hP as w,hQ as X,hR as K,hS as Y,hT as Q,cn as P,hU as J,hV as C,h1 as Z,hW as ee,hX as te,aK as ie,dT as se,hY as re}from"./index-080e108a.js";var B,F,S,A,y,R;(function(s){s[s.Binary=0]="Binary",s[s.JSON=1]="JSON"})(B||(B={})),function(s){s[s.TreeIndex=0]="TreeIndex",s[s.TreeStats=1]="TreeStats",s[s.TreeData=2]="TreeData",s[s.BrickBundles=3]="BrickBundles",s[s.Section=4]="Section",s[s.VariableStats=5]="VariableStats"}(F||(F={})),function(s){s[s.None=1]="None",s[s.Front=2]="Front",s[s.Back=3]="Back"}(S||(S={})),function(s){s[s.Low=0]="Low",s[s.Medium=1]="Medium",s[s.High=2]="High"}(A||(A={})),function(s){s[s.None=0]="None",s[s.StaticSections=1]="StaticSections",s[s.Slices=2]="Slices",s[s.DynamicSections=4]="DynamicSections",s[s.GhostShell=8]="GhostShell",s[s.Isosurface=16]="Isosurface",s[s.Quality=32]="Quality",s[s.SunLocation=64]="SunLocation",s[s.StaticSectionSelection=128]="StaticSectionSelection",s[s.ExaggerationAndOffset=256]="ExaggerationAndOffset",s[s.CurrentTime=512]="CurrentTime",s[s.CurrentVariable=1024]="CurrentVariable",s[s.DeleteIsosurface=2048]="DeleteIsosurface",s[s.ContainerVisibility=4096]="ContainerVisibility",s[s.RenderMode=8192]="RenderMode",s[s.Optimization=16384]="Optimization",s[s.VariableStyles=32768]="VariableStyles",s[s.VolumeStyles=65536]="VolumeStyles",s[s.AnalysisSlice=131072]="AnalysisSlice"}(y||(y={})),function(s){s[s.Isosurfaces=0]="Isosurfaces",s[s.DynamicSections=1]="DynamicSections",s[s.StaticSections=2]="StaticSections"}(R||(R={}));function ae(s){return new Promise(e=>M(()=>import("./vxlLayer-78040c8d.js"),["assets/vxlLayer-78040c8d.js","assets/index-080e108a.js","assets/index-a8e73b5e.css"]).then(t=>t.v).then(({default:t})=>{const i=t({locateFile:ne,preinitializedWebGLContext:s,onRuntimeInitialized:()=>e(i)})})).catch(e=>{throw e})}function ne(s){return q(`esri/libs/vxl/${s}`)}const b=O.getLogger("esri.layers.VoxelWasmPerSceneView");var o;(function(s){s[s.Lifetime=1]="Lifetime",s[s.RequestResponse=2]="RequestResponse",s[s.Rendering=3]="Rendering",s[s.Error=4]="Error"})(o||(o={}));class oe{constructor(e){this._halfIntTexturesAvailable=!1,this._textureFloatLinearAvailable=!1,this._havePreparedWithAllLayers=!1,this._readyWatchHandle=null,this._qualityWatchHandle=null,this._stationaryWatchHandle=null,this._timeExtentWatchHandle=null,this._renderPluginContext=null,this._vxlPromise=null,this._vxl=null,this._pluginIsActive=!1,this._moreToLoad=!1,this._viewportWidth=-1,this._viewportHeight=-1,this._newLayers=[],this._layers=new Map,this._shaderOutput=$.Color,this._renderSlot=N.VOXEL,this._rctx=null,this._renderTargetToRestore=null,this._lastFrameWasStationary=!1,this._wasmMemBlockSizes=[512,1024,2048,4096,8192,16384,32768,65536],this._wasmMemBlocks=new Map,this._dbgFlags=new Set,this._captureFrustum=!1,this._frustum=null,this._frustumRenderableId=-1,this._renderCoordsHelper=null,this.type=D.VOXEL,this.slicePlaneEnabled=!0,this.isGround=!1,this.layerUid=[],this._view=e,this._initialize()}get canRender(){return!!this._vxl&&this._view.viewingMode==="local"}_dbg(e,t){this._dbgFlags.has(e)&&(e===o.Error?b.error(t):b.warn(t))}_removeRenderPlugin(){this._pluginIsActive&&this._view._stage&&(this._dbg(o.Lifetime,"--removeRenderPlugin--"),this._view._stage.removeRenderPlugin(this)),this._pluginIsActive=!1}_initialize(){this._dbg(o.Lifetime,"--initialize--");for(const e of this._wasmMemBlockSizes)this._wasmMemBlocks.set(e,0);this._readyWatchHandle=E(()=>this._view.ready,e=>{e&&this._view.viewingMode==="local"?(this._dbg(o.Lifetime,"view ready status changed to ready on a local view, calling addRenderPlugin"),this._view._stage.addRenderPlugin([this._renderSlot],this),this._pluginIsActive=!0):(this._dbg(o.Lifetime,"view ready status changed, not ready or not a local view!"),this._removeRenderPlugin())},{initial:!0}),this._qualityWatchHandle=E(()=>{var e;return(e=this._view)==null?void 0:e.qualityProfile},e=>{this._dbg(o.Rendering,"qualityProfile changed to "+e),this._vxl&&this._vxl.set_quality(this._toWasmQuality(e))},{initial:!0}),this._timeExtentWatchHandle=E(()=>{var e;return(e=this._view)==null?void 0:e.timeExtent},()=>{var e;if(this._vxl){const t=this._getTimeArgs((e=this._view)==null?void 0:e.timeExtent);this._dbg(o.Rendering,"sceneView timeExtent changed to useTime="+t.useTime+" st="+t.startTime+" et="+t.endTime),this._vxl.set_scene_time_extent(t.startTime,t.endTime,t.useTime),this._renderPluginContext.requestRender()}},{initial:!0}),this._stationaryWatchHandle=E(()=>{var e;return(e=this._view)==null?void 0:e.stationary},e=>{this._vxl&&e&&!this._lastFrameWasStationary&&this._renderPluginContext.requestRender()})}initializeRenderContext(e){this._dbg(o.Lifetime,"--initializeRenderContext--");const t=e.renderContext.rctx;t.type===H.WEBGL2?(this._renderPluginContext=e,this._rctx=e.renderContext.rctx,this._halfIntTexturesAvailable=!!this._rctx.capabilities.textureNorm16,this._textureFloatLinearAvailable=this._rctx.capabilities.textureFloatLinear,this._initializeWasm(t.gl)):this._dbg(o.Error,"WebGL 1 context only!")}uninitializeRenderContext(){this._renderPluginContext=null,this._rctx=null,this._dbg(o.Lifetime,"--uninitializeRenderContext--")}_restoreFramebuffer(){if(!this._renderTargetToRestore)return;const e=this._renderTargetToRestore.fbo;if(!this._rctx)return void this._dbg(o.Error,"no context in restoreFramebuffer!");this._rctx.bindFramebuffer(e,!0);const t=this._renderTargetToRestore.viewport;this._rctx.setViewport(t.x,t.y,t.width,t.height)}_bindPreviousDepthToSlot(e,t){const i=!!this._rctx,r=!!this._renderTargetToRestore;if(!i||!r)return 0;const n=this._renderTargetToRestore.fbo.depthStencilTexture;return n?(t===0?this._rctx.bindTexture(null,e,!0):this._rctx.bindTexture(n,e,!0),1):(this._dbg(o.Error,"no depth/stencil texture exists!"),0)}_modifyResourceCount(e,t,i){if(!this._rctx)return void this._dbg(o.Error,"modifyAllocation callback has no rendering context!");const r=e;i===1?this._rctx.instanceCounter.increment(r,t):this._rctx.instanceCounter.decrement(r,t)}_setBlendState(e,t,i,r){this._rctx?(this._rctx.setBlendingEnabled(e===1),this._rctx.setBlendFunction(t,i),this._rctx.setBlendEquation(r)):this._dbg(o.Error,"setBlendState callback has no rendering context!")}_setFrontFace(e){this._rctx?this._rctx.setFrontFace(e):this._dbg(o.Error,"setFrontFace callback has no rendering context!")}_setDepthStencilStateFunction(e,t,i){this._rctx?(this._rctx.setDepthFunction(i),this._rctx.setDepthTestEnabled(e===1),this._rctx.setDepthWriteEnabled(t===1),this._rctx.setStencilTestEnabled(!1),this._rctx.setStencilFunction(z.ALWAYS,0,255),this._rctx.setStencilOpSeparate(V.FRONT,T.KEEP,T.INCR,T.KEEP),this._rctx.setStencilOpSeparate(V.BACK,T.KEEP,T.DECR,T.KEEP)):this._dbg(o.Error,"setDepthStencilStateFunction callback has no rendering context!")}_setRasterizerState(e){if(this._rctx)switch(e){case S.None:this._rctx.setFaceCullingEnabled(!1);break;case S.Back:this._rctx.setCullFace(V.BACK),this._rctx.setFaceCullingEnabled(!0);break;case S.Front:this._rctx.setCullFace(V.FRONT),this._rctx.setFaceCullingEnabled(!0)}else this._dbg(o.Error,"setRasterizerState callback has no rendering context!")}_setViewport(e,t,i,r){this._rctx?this._rctx.setViewport(e,t,i,r):this._dbg(o.Error,"setViewport callback has no rendering context!")}_updateMemoryUsage(){this._layers.forEach((e,t)=>{if(e.needMemoryUsageUpdate){const i=this._vxl.estimate_memory_usage(t);i>=0&&(e.needMemoryUsageUpdate=!1,e.layerView.setUsedMemory(i))}})}_syncRequestsResponses(){this._layers.forEach((e,t)=>{const i=[];e.responses.forEach((a,u)=>{i.push(u),this._dbg(o.RequestResponse,"responding for requestID:"+u+" size:"+a.size),this._vxl.respond(t,u,a),a.requestType!==F.TreeIndex&&a.requestType!==F.Section||(e.needMemoryUsageUpdate=!0)});const r=e.responses;for(const a of i)r.delete(a);const n=this._vxl.get_new_requests(t),l=e.abortController.signal;for(const a in n){e.outstandingRequestCount+=1,e.outstandingRequestCount===1&&e.layerView.updatingFlagChanged();const u=n[a],f={responseType:"array-buffer",signal:l};this._dbg(o.RequestResponse,"making requestID:"+a+" url:"+u.url),j(u.url,f).then(d=>{e.outstandingRequestCount-=1,e.outstandingRequestCount===0&&e.layerView.updatingFlagChanged(),this._dbg(o.RequestResponse,"have response for requestID:"+a);let c=0;if(d.data.byteLength>0){c=this._vxl._malloc(d.data.byteLength);const _=new Uint8Array(this._vxl.HEAPU8.buffer,c,d.data.byteLength),g=new Uint8Array(d.data);for(let x=0;x<d.data.byteLength;++x)_[x]=g[x]}r.set(+a,{responseType:u.responseType,ptr:c,size:d.data.byteLength,success:!0,requestType:u.requestType})}).catch(d=>{e.outstandingRequestCount-=1,e.outstandingRequestCount===0&&e.layerView.updatingFlagChanged(),G(d)||(this._dbg(o.Error,`requestID:${a} failed, error=${d.toString()}`),r.set(+a,{responseType:u.responseType,ptr:0,size:0,success:!1,requestType:u.requestType}))})}})}updateWasmCamera(e){this._vxl.set_projection_matrix.apply(this._vxl,e.projectionMatrix),this._vxl.set_view_matrix.apply(this._vxl,e.viewMatrix),this._vxl.set_near_far(e.near,e.far)}isUpdating(e){if(!this._vxl&&this._vxlPromise)return!0;const t=this._layers.get(e);return!!t&&t.outstandingRequestCount>0}getLayerTimes(e){const t=[];return this._layers.forEach((i,r)=>{if(i.layerView.wasmLayerId===e.wasmLayerId){const n=this._vxl.get_layer_epoch_times(r,e.layer.currentVariableId);for(let l=0;l<n.length;++l)t.push(n[l])}}),t}getCurrentLayerTimeIndex(e){let t=0;return this._layers.forEach((i,r)=>{i.layerView.wasmLayerId===e.wasmLayerId&&(t=this._vxl.get_layer_current_time_id(r))}),t}setEnabled(e,t){this._layers.forEach((i,r)=>{i.layerView.wasmLayerId===e.wasmLayerId&&(this._vxl.set_enabled(r,t),i.needMemoryUsageUpdate=!0,this._renderPluginContext.requestRender())})}setStaticSections(e,t){const i={mask:y.StaticSections,staticSections:t};return this._doMaskedUIUpdate(e,i,!0)}setCurrentVariable(e,t){const i={mask:y.CurrentVariable,currentVariable:t};return this._doMaskedUIUpdate(e,i,!0)}setRenderMode(e,t){const i={mask:y.RenderMode,renderMode:t};return this._doMaskedUIUpdate(e,i,!0)}setVerticalExaggerationAndOffset(e,t,i,r){const n={mask:y.ExaggerationAndOffset,volStyleDesc:{volumeId:t,verticalExaggeration:i,verticalOffset:r}};return this._doMaskedUIUpdate(e,n,!0)}setVariableStyles(e,t){const i={mask:y.VariableStyles,variableStyles:t};return this._doMaskedUIUpdate(e,i,!0)}setVolumeStyles(e,t){const i={mask:y.VolumeStyles,volumeStyles:t};return this._doMaskedUIUpdate(e,i,!0)}setEnableDynamicSections(e,t){const i={mask:y.ContainerVisibility,containerIsVisible:t,container:R.DynamicSections};return this._doMaskedUIUpdate(e,i,!0)}setEnableIsosurfaces(e,t){const i={mask:y.ContainerVisibility,containerIsVisible:t,container:R.Isosurfaces};return this._doMaskedUIUpdate(e,i,!0)}setEnableSections(e,t){const i={mask:y.ContainerVisibility,containerIsVisible:t,container:R.StaticSections};return this._doMaskedUIUpdate(e,i,!0)}setAnalysisSlice(e,t,i,r){const n={mask:y.AnalysisSlice,analysisSlice:{point:i,normal:r,enabled:t}};return this._doMaskedUIUpdate(e,n,!0)}_doMaskedUIUpdate(e,t,i){if(!this._vxl)return!1;let r=!1;return this._layers.forEach((n,l)=>{if(n.layerView.wasmLayerId===e.wasmLayerId){const a={str:JSON.stringify(t),byteCount:0,ptr:0,isReusable:!1};this._allocateBlock(a)&&(r=this._vxl.handle_masked_ui_update(l,a.ptr,a.byteCount)===1,a.isReusable||this._vxl._free(a.ptr))}}),r&&i&&this._renderPluginContext.requestRender(),r}_addTriangleToWasmBuffer(e,t,i,r,n){return e[3*t]=i[0],e[3*t+1]=i[1],e[3*t+2]=i[2],e[3*(t+=1)]=r[0],e[3*t+1]=r[1],e[3*t+2]=r[2],e[3*(t+=1)]=n[0],e[3*t+1]=n[1],e[3*t+2]=n[2],t+=1}_addNormalToWasmBuffer(e,t,i){return e[3*t]=i[0],e[3*t+1]=i[1],e[3*t+2]=i[2],t+=1}_doCaptureFrustum(){if(!this._vxl)return;const e=36,t=e/3,i=this._vxl._malloc(3*e*Float32Array.BYTES_PER_ELEMENT),r=new Float32Array(this._vxl.HEAPF32.buffer,i,3*e),n=this._vxl._malloc(3*t*Float32Array.BYTES_PER_ELEMENT),l=new Float32Array(this._vxl.HEAPF32.buffer,n,e),a=this._frustum.points[v.NEAR_BOTTOM_LEFT],u=this._frustum.points[v.NEAR_BOTTOM_RIGHT],f=this._frustum.points[v.NEAR_TOP_RIGHT],d=this._frustum.points[v.NEAR_TOP_LEFT],c=this._frustum.points[v.FAR_BOTTOM_LEFT],_=this._frustum.points[v.FAR_BOTTOM_RIGHT],g=this._frustum.points[v.FAR_TOP_RIGHT],x=this._frustum.points[v.FAR_TOP_LEFT];let h=0,m=0;const p=this._frustum.planes[w.NEAR];h=this._addTriangleToWasmBuffer(r,h,f,u,a),m=this._addNormalToWasmBuffer(l,m,p),h=this._addTriangleToWasmBuffer(r,h,a,d,f),m=this._addNormalToWasmBuffer(l,m,p);const L=this._frustum.planes[w.FAR];h=this._addTriangleToWasmBuffer(r,h,c,_,g),m=this._addNormalToWasmBuffer(l,m,L),h=this._addTriangleToWasmBuffer(r,h,g,x,c),m=this._addNormalToWasmBuffer(l,m,L);const I=this._frustum.planes[w.TOP];h=this._addTriangleToWasmBuffer(r,h,g,f,d),m=this._addNormalToWasmBuffer(l,m,I),h=this._addTriangleToWasmBuffer(r,h,d,x,g),m=this._addNormalToWasmBuffer(l,m,I);const W=this._frustum.planes[w.BOTTOM];h=this._addTriangleToWasmBuffer(r,h,a,u,_),m=this._addNormalToWasmBuffer(l,m,W),h=this._addTriangleToWasmBuffer(r,h,_,c,a),m=this._addNormalToWasmBuffer(l,m,W);const U=this._frustum.planes[w.LEFT];h=this._addTriangleToWasmBuffer(r,h,d,a,c),m=this._addNormalToWasmBuffer(l,m,U),h=this._addTriangleToWasmBuffer(r,h,c,x,d),m=this._addNormalToWasmBuffer(l,m,U);const k=this._frustum.planes[w.RIGHT];h=this._addTriangleToWasmBuffer(r,h,f,g,_),m=this._addNormalToWasmBuffer(l,m,k),h=this._addTriangleToWasmBuffer(r,h,_,u,f),m=this._addNormalToWasmBuffer(l,m,k),this._frustumRenderableId!==-1&&this._vxl.remove_generic_mesh(this._frustumRenderableId),this._frustumRenderableId=this._vxl.add_generic_mesh(i,3*e,n,e,255,0,0,64),this._vxl._free(i),this._vxl._free(n),this._captureFrustum=!1,this._renderPluginContext.requestRender()}captureFrustum(){this._renderCoordsHelper===null&&(this._renderCoordsHelper=X.create(K.Local,Y(!1,this._view.spatialReference))),this._frustum===null&&(this._frustum=new Q(this._renderCoordsHelper)),this._captureFrustum=!0,this._renderPluginContext!==null&&this._renderPluginContext.requestRender()}toggleFullVolumeExtentDraw(e){this._vxl&&this._layers.forEach((t,i)=>{t.layerView.wasmLayerId===e.wasmLayerId&&(this._vxl.toggle_full_volume_extent_draw(i),this._renderPluginContext.requestRender())})}addVoxelLayer(e){if(!this._vxl){const i={layerView:e,resolveCallback:null,rejectCallback:null},r=new Promise((n,l)=>{i.resolveCallback=n,i.rejectCallback=l});return this._newLayers.push(i),r}const t=this._addVoxelLayer(e);return t<0?Promise.reject(-1):Promise.resolve(t)}removeVoxelLayer(e){if(!this._vxl){const r=this._newLayers.findIndex(l=>e.uid===l.layerView.uid);r>=0&&(this._newLayers[r].resolveCallback(-1),this._newLayers.splice(r,1));const n=this._newLayers.length;return n===0&&(this._dbg(o.Lifetime," no voxel layers left after removing a layer, removing RenderPlugin and destroying"),this.destroy()),n}let t=-1;this._layers.forEach((r,n)=>{if(r.layerView.wasmLayerId===e.wasmLayerId){t=n,r.abortController.abort(),this._vxl.remove_layer(t);const l=this.layerUid.indexOf(e.layer.uid);l!==-1&&this.layerUid.splice(l,1)}}),t>=0&&this._layers.delete(t);const i=this._layers.size;return i===0&&(this._dbg(o.Lifetime," no voxel layers left after removing a layer, removing RenderPlugin and destroying"),this.destroy()),i}_getBlockSize(e){for(const t of this._wasmMemBlockSizes)if(e<t)return t;return-1}_allocateBlock(e){e.byteCount=this._vxl.lengthBytesUTF8(e.str)+1;const t=this._getBlockSize(e.byteCount);return t<0?(e.isReusable=!1,e.ptr=this._vxl._malloc(e.byteCount)):(e.isReusable=!0,e.ptr=this._wasmMemBlocks.get(t),e.ptr===0&&(e.ptr=this._vxl._malloc(t),this._wasmMemBlocks.set(t,e.ptr))),e.ptr!==0&&(this._vxl.stringToUTF8(e.str,e.ptr,e.byteCount),!0)}_getTimeArgs(e){let t=-Number.MAX_VALUE,i=Number.MAX_VALUE,r=!1;return e!=null&&(e.isAllTime?r=!0:(e.start!=null&&(r=!0,t=e.start.getTime()/1e3),e.end!=null&&(r=!0,i=e.end.getTime()/1e3))),{startTime:t,endTime:i,useTime:r}}_addVoxelLayer(e){var u,f;const t=e.layer;let i=-1;const r=t.getConfiguration();if(r.length<1)return-1;const n={str:r,byteCount:0,ptr:0,isReusable:!1};if(!this._allocateBlock(n))return-1;const l=this._getTimeArgs((u=this._view)==null?void 0:u.timeExtent),a=this._view.spatialReference.isWGS84&&t.spatialReference.isWGS84?111319.49079327357:1;if(i=this._vxl.add_layer(t.serviceRoot,n.ptr,n.byteCount,a,a,l.startTime,l.endTime,l.useTime,this._toWasmQuality(this._view.qualityProfile)),n.isReusable||this._vxl._free(n.ptr),i>=0){(f=t.test)!=null&&f.constantUpscaling&&(this._setUpscalingLimits(0,.25,.25),this._setUpscalingLimits(1,.5,.5),this._setUpscalingLimits(2,.75,.75));const d=new AbortController;if(this._layers.set(i,{layerView:e,responses:new Map,outstandingRequestCount:0,abortController:d,needMemoryUsageUpdate:!1}),this.layerUid.push(e.layer.uid),!this._halfIntTexturesAvailable||P("mac")){const c=[];let _="";for(const g of e.layer.variables)g.renderingFormat.type!=="Int16"&&g.renderingFormat.type!=="UInt16"||(c.push(g.name),g.id===e.layer.currentVariableId&&(_=g.name));_!==""&&b.error("#addVoxelLayer_error()",e.layer,`The voxel layer '${e.layer.title}' cannot render the current variable '${_}' in this browser`),c.length>0&&b.warn("#addVoxelLayer_warning()",e.layer,`The voxel layer '${e.layer.title}' cannot render the variables '${c.toString()}' in this browser`)}if(!this._textureFloatLinearAvailable){const c=[];let _="";for(const g of e.layer.variables)g.renderingFormat.type==="Float32"&&(c.push(g.name),g.id===e.layer.currentVariableId&&(_=g.name));_!==""&&b.error("#addVoxelLayer_error()",e.layer,`The voxel layer '${e.layer.title}' cannot render the current variable '${_}' in this browser`),c.length>0&&b.warn("#addVoxelLayer_warning()",e.layer,`The voxel layer '${e.layer.title}' cannot render the variables '${c.toString()}' in this browser`)}return P("esri-mobile")&&b.warnOnce("Mobile support differs across devices. Voxel layer might not display as expected."),i}return-1}prepareRender(e){if(!this._vxl)return;const t=e.bindParameters.camera.viewForward,i=e.bindParameters.camera.eye;this._vxl.update_camera_pos_and_direction(i[0],i[1],i[2],t[0],t[1],t[2]);const r=this._vxl.cull();this._dbg(o.RequestResponse,"missingResourceCount="+r),this._moreToLoad=r>0,this._havePreparedWithAllLayers=this._newLayers.length===0,this._updateMemoryUsage()}render(e){if(!this._vxl||e.output!==this._shaderOutput||e.bindParameters.slot!==this._renderSlot)return;for(const i of this._newLayers){const r=this._addVoxelLayer(i.layerView);r===-1?i.rejectCallback(-1):i.resolveCallback(r)}if(this._newLayers=[],this._layers.size===0)return void this._dbg(o.Error,"No voxel layers but RenderPlugin instance is being asked to render!");this._lastFrameWasStationary=this._view.stationary,this._syncRequestsResponses(),this._beforeDraw(),this._vxl.begin_color_frame(!this._view._stage.renderer.isFeatureEnabled(J.HighResolutionVoxel),e.bindParameters.lighting.mainLight.direction[0],e.bindParameters.lighting.mainLight.direction[1],e.bindParameters.lighting.mainLight.direction[2]);const t=this._renderTargetToRestore.viewport;t.width===this._viewportWidth&&t.height===this._viewportHeight||(this._viewportWidth=t.width,this._viewportHeight=t.height,this._vxl.set_viewport(t.width,t.height),this._layers.forEach(i=>{i.needMemoryUsageUpdate=!0})),t.x===0&&t.y===0||this._dbg(o.Error,"Unsupported viewport parameters detected!"),this.updateWasmCamera(e.bindParameters.camera),this._captureFrustum&&(this._frustum.update(e.bindParameters.camera),this._doCaptureFrustum()),this._vxl.draw(),this._afterDraw(),(this._moreToLoad||!this._havePreparedWithAllLayers&&this._layers.size>0)&&this._renderPluginContext.requestRender()}destroy(){this._dbg(o.Lifetime,"--destroy--"),this._removeRenderPlugin(),this._readyWatchHandle=C(this._readyWatchHandle),this._qualityWatchHandle=C(this._qualityWatchHandle),this._timeExtentWatchHandle=C(this._timeExtentWatchHandle),this._stationaryWatchHandle=C(this._stationaryWatchHandle),this._vxl&&(this._layers.forEach(e=>{e.abortController.abort()}),this._wasmMemBlocks.forEach(e=>{e!==0&&this._vxl._free(e)}),this._vxl.uninitialize_voxel_wasm(),this._vxl=null)}_initializeWasm(e){return this._vxl?Promise.resolve():(this._vxlPromise||(this._vxlPromise=ae(e).then(t=>{var x;if(this._vxl=t,this._vxlPromise=null,this._newLayers.length<=0)return this._dbg(o.Lifetime," no voxel layers left after WASM downloaded, removing RenderPlugin and destroying"),void this.destroy();const i=this._getTimeArgs((x=this._view)==null?void 0:x.timeExtent),r=this._vxl.addFunction(this._restoreFramebuffer.bind(this),"v"),n=this._vxl.addFunction(this._setBlendState.bind(this),"viiii"),l=this._vxl.addFunction(this._setFrontFace.bind(this),"vi"),a=this._vxl.addFunction(this._setRasterizerState.bind(this),"vi"),u=this._vxl.addFunction(this._setDepthStencilStateFunction.bind(this),"viii"),f=this._vxl.addFunction(this._setViewport.bind(this),"viiii"),d=this._vxl.addFunction(this._bindPreviousDepthToSlot.bind(this),"iii"),c=this._vxl.addFunction(this._modifyResourceCount.bind(this),"viii"),_=this._halfIntTexturesAvailable&&!P("mac"),g=this._textureFloatLinearAvailable;this._vxl.initialize_voxel_wasm(r,n,l,a,u,f,d,c,i.startTime,i.endTime,i.useTime,_,g),this._renderPluginContext&&this._renderPluginContext.requestRender()}).catch(()=>{for(const t of this._newLayers)t.rejectCallback(-2);this._dbg(o.Error," WASM failed to download, removing RenderPlugin and destroying"),this.destroy()})),this._vxlPromise)}pickDepth(e,t,i){if(!this._vxl||!this._rctx||this._layers.size===0)return null;const r=i.viewport[3]-t;if(e<0||e>i.viewport[2]||t<0||t>i.viewport[3])return this._dbg(o.Error,`[js] pickDepth: outOfRange, screenXY=[${e.toFixed(0)}, ${r.toFixed(0)}]]`),null;this._beforeDraw();const n=i.viewForward,l=i.eye;this._vxl.update_camera_pos_and_direction(l[0],l[1],l[2],n[0],n[1],n[2]),this.updateWasmCamera(i),this._vxl.begin_frame();const a=this._vxl.pick_depth(e,r);return this._afterDraw(),a.success?a.distanceToCamera:null}pickObject(e,t,i,r){if(!this._vxl||!this._rctx||this._layers.size===0)return null;const n=Math.round(e),l=Math.round(t);if(n<0||n>i.viewport[2]||l<0||l>i.viewport[3])return this._dbg(o.Error,`[js] pickObject: outOfRange, screenXY=[${n}, ${l}], vp=[${i.viewport.toString()}]`),null;this._beforeDraw();const a=i.viewForward,u=i.eye;this._vxl.update_camera_pos_and_direction(u[0],u[1],u[2],a[0],a[1],a[2]),this.updateWasmCamera(i),this._vxl.begin_frame();let f=null;if(r.length===0)f=this._vxl.pick_object(n,l,0,0);else{const d={str:JSON.stringify({layerIds:r}),byteCount:0,ptr:0,isReusable:!1};this._allocateBlock(d)&&(f=this._vxl.pick_object(n,l,d.ptr,d.byteCount),d.isReusable||this._vxl._free(d.ptr))}return this._afterDraw(),f}_beforeDraw(){this._renderTargetToRestore={fbo:this._rctx.getBoundFramebufferObject(),viewport:this._rctx.getViewport()},this._rctx.setPolygonOffsetFillEnabled(!1),this._rctx.setScissorTestEnabled(!1),this._rctx.setColorMask(!0,!0,!0,!0)}_afterDraw(){this._renderTargetToRestore.fbo=null,this._rctx.externalTextureUnitUpdate(this._vxl.get_texture_units_bound_in_frame(),this._vxl.get_active_texture_unit()),this._rctx.externalVertexArrayObjectUpdate(),this._rctx.externalVertexBufferUpdate(),this._rctx.externalProgramUpdate()}intersect(e,t,i,r,n){if(!this._vxl||!this._rctx||this._layers.size===0||!e.options.selectionMode||e.options.isFiltered)return;if(n[0]<0||n[0]>e.camera.viewport[2]||n[1]<0||n[1]>e.camera.viewport[3])return this._dbg(o.Error,`[js] VoxelWasmPerScene.intersect: outOfRange, screenXY=[${n[0].toFixed(0)}, ${n[1].toFixed(0)}]`),null;const l=[];this._layers.forEach(f=>{e.options.filteredLayerUids.includes(f.layerView.layer.uid)&&l.push(f.layerView.wasmLayerId)});const a=this.pickObject(n[0],n[1],e.camera,l);if(a==null||a.layerId===-1)return;const u=this._layers.get(a.layerId);if(u){const f=u.layerView.layer.uid,d=a.distanceToCamera/Z(i,r),c=se();c[0]=a.worldX,c[1]=a.worldY,c[2]=a.worldZ;const _={};if(a.continuousValue!=null&&a.continuousValueUnits!=null?_["Voxel.ServiceValue"]=`${a.continuousValue.toLocaleString()} ${a.continuousValueUnits}`:a.uniqueValueLabel!=null&&a.uniqueValue!=null?_["Voxel.ServiceValue"]=`${a.uniqueValueLabel} (${a.uniqueValue})`:a.uniqueValue!=null&&(_["Voxel.ServiceValue"]=`${a.uniqueValue}`),_["Voxel.ServiceVariableLabel"]=a.variableLabel,_["Voxel.Position"]=a.voxelSpacePosition,a.epochTime!=null&&a.nativeTime!=null&&a.nativeTimeUnits!=null){const p=new Date(a.epochTime);_["Voxel.ServiceLocalTime"]=p.toString(),_["Voxel.ServiceNativeTime"]=`${a.nativeTime.toLocaleString()} ${a.nativeTimeUnits}`}a.depth!=null&&a.depthUnits!=null&&(_["Voxel.ServiceDepth"]=`${a.depth.toLocaleString()} ${a.depthUnits}`);const g=a.faceNormal;_["Voxel.WorldPosition"]=`[${c[0]}, ${c[1]}, ${c[2]}]`;const x=p=>{const L=new re(c,f,()=>this._createVoxelGraphic(u.layerView.layer,_));p.set(this.type,L,d,g)},h=e.results,m=e.options.store===ee.ALL;if((h.min.dist==null||d<h.min.dist)&&x(h.min),(h.max.dist==null||d>h.max.dist)&&x(h.max),m){const p=te(e.ray);x(p),e.results.all.push(p)}}}_createVoxelGraphic(e,t){return new ie({layer:e,sourceLayer:e,attributes:t})}_toWasmQuality(e){switch(e){case"low":return 0;case"medium":return 1;case"high":return 2}}_setUpscalingLimits(e,t,i){this._vxl&&this._vxl.set_upscaling_limits(e,t,i)}}export{oe as default};

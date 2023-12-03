import{am as i,ah as p,ai as e,aj as s,an as a,al as c,ao as h}from"./index-080e108a.js";import{x as n}from"./GraphicsProcessor-750d4e2b.js";import"./diffUtils-590c9088.js";import"./Query-1c961d4c.js";import"./Graphics3DObjectStates-bb2a6162.js";import"./UniqueValueRenderer-fef4204d.js";import"./jsonUtils-f73b3833.js";import"./DictionaryLoader-c0729336.js";import"./FieldsIndex-f79a8f26.js";import"./heatmapUtils-327ef4c5.js";import"./defaults-34554cbf.js";import"./defaultsJSON-59981e75.js";import"./optimizedFeatureQueryEngineAdapter-58185a60.js";import"./centroid-8e8cfa47.js";import"./PooledRBush-3cae7682.js";import"./quickselect-e80674f5.js";import"./popupUtils-f04ec9a9.js";let t=class extends i(h){constructor(r){super(r),this.processor=null,this.slicePlaneEnabled=!1,this.layer=new l}initialize(){this._set("processor",new n({owner:this}))}destroy(){this._set("processor",p(this.processor))}get graphics(){var r;return(r=this.view)==null?void 0:r.graphics}get loadedGraphics(){return this.graphics}get updating(){var r;return!!((r=this.processor)!=null&&r.updating)}get symbolUpdateType(){return this.processor.graphicsCore.symbolUpdateType}getHit(r){return this.processor.getHit(r)}whenGraphicBounds(r,o){return this.processor.whenGraphicBounds(r,o)}graphicChanged(r){this.processor.graphicsCore.graphicUpdateHandler(r)}get updatePolicy(){return this.processor.graphicsCore.effectiveUpdatePolicy}async queryGraphics(){return this.loadedGraphics}async fetchPopupFeatures(r,o){return(o==null?void 0:o.clientGraphics)??[]}highlight(r){return this.processor.highlight(r)}maskOccludee(r){return this.processor.maskOccludee(r)}};e([s({readOnly:!0})],t.prototype,"graphics",null),e([s()],t.prototype,"loadedGraphics",null),e([s({readOnly:!0})],t.prototype,"updating",null),e([s({constructOnly:!0})],t.prototype,"view",void 0),e([s()],t.prototype,"processor",void 0),e([s({type:Boolean})],t.prototype,"slicePlaneEnabled",void 0),e([s()],t.prototype,"layer",void 0),t=e([c("esri.views.3d.layers.GraphicsView3D")],t);class l extends a{constructor(){super(),this.type="graphics-view-3d-dummy",this.id=this.uid}}const $=t;export{$ as default};

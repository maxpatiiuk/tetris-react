import{cX as n,am as l,cY as d,cu as o,ao as p,bz as u,ai as i,aj as r,al as y}from"./index-080e108a.js";let t=class extends n(l(d(o.EventedMixin(p)))){constructor(e){super(e),this.layer=null,this.parent=null}initialize(){this.when().catch(e=>{if(e.name!=="layerview:create-error"){const s=this.layer&&this.layer.id||"no id",a=this.layer&&this.layer.title||"no title";u.getLogger(this).error("#resolve()",`Failed to resolve layer view (layer title: '${a}', id: '${s}')`,e)}})}get fullOpacity(){var e,s;return(((e=this.layer)==null?void 0:e.opacity)??1)*(((s=this.parent)==null?void 0:s.fullOpacity)??1)}get suspended(){return!this.canResume()}get suspendInfo(){return this.getSuspendInfo()}get legendEnabled(){var e;return!this.suspended&&((e=this.layer)==null?void 0:e.legendEnabled)===!0}get updating(){var e;return!(!((e=this.updatingHandles)!=null&&e.updating)&&!this.isUpdating())}get updatingProgress(){return this.updating?0:1}get visible(){var e;return((e=this.layer)==null?void 0:e.visible)===!0}set visible(e){this._overrideIfSome("visible",e)}canResume(){var e,s,a;return this.visible&&((e=this.layer)==null?void 0:e.loaded)&&!((s=this.parent)!=null&&s.suspended)&&((a=this.view)==null?void 0:a.ready)||!1}getSuspendInfo(){const e=this.parent&&this.parent.suspended?this.parent.suspendInfo:{},s=this;return s.view&&s.view.ready||(e.viewNotReady=!0),this.layer&&this.layer.loaded||(e.layerNotLoaded=!0),this.visible||(e.layerInvisible=!0),e}isUpdating(){return!1}};i([r()],t.prototype,"fullOpacity",null),i([r()],t.prototype,"layer",void 0),i([r()],t.prototype,"parent",void 0),i([r({readOnly:!0})],t.prototype,"suspended",null),i([r({readOnly:!0})],t.prototype,"suspendInfo",null),i([r({readOnly:!0})],t.prototype,"legendEnabled",null),i([r({type:Boolean,readOnly:!0})],t.prototype,"updating",null),i([r({readOnly:!0})],t.prototype,"updatingProgress",null),i([r()],t.prototype,"visible",null),i([r()],t.prototype,"view",void 0),t=i([y("esri.views.layers.LayerView")],t);const g=t;export{g as d};

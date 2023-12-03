import{gS as c,cN as d,bc as p,cq as f,gT as y,er as _,gU as m,gV as g,gW as P}from"./index-080e108a.js";import{t as C}from"./pbfQueryUtils-26a87215.js";import"./pbf-d9aa3914.js";function b(o,e){return e}function l(o,e,t,r){switch(t){case 0:return h(o,e+r,0);case 1:return o.originPosition==="lowerLeft"?h(o,e+r,1):M(o,e+r,1)}}function u(o,e,t,r){return t===2?h(o,e,2):l(o,e,t,r)}function G(o,e,t,r){return t===2?h(o,e,3):l(o,e,t,r)}function v(o,e,t,r){return t===3?h(o,e,3):u(o,e,t,r)}function h({translate:o,scale:e},t,r){return o[r]+t*e[r]}function M({translate:o,scale:e},t,r){return o[r]-t*e[r]}class T{constructor(e){this._options=e,this.geometryTypes=["point","multipoint","polyline","polygon"],this._previousCoordinate=[0,0],this._transform=null,this._applyTransform=b,this._lengths=[],this._currentLengthIndex=0,this._toAddInCurrentPath=0,this._vertexDimension=0,this._coordinateBuffer=null,this._coordinateBufferPtr=0,this._attributesConstructor=class{}}createFeatureResult(){return new c}finishFeatureResult(e){if(this._options.applyTransform&&(e.transform=null),this._attributesConstructor=class{},this._coordinateBuffer=null,this._lengths.length=0,!e.hasZ)return;const t=d(e.geometryType,this._options.sourceSpatialReference,e.spatialReference);if(t!=null)for(const r of e.features)t(r.geometry)}createSpatialReference(){return new p}addField(e,t){e.fields.push(f.fromJSON(t));const r=e.fields.map(s=>s.name);this._attributesConstructor=function(){for(const s of r)this[s]=null}}addFeature(e,t){const r=this._options.maxStringAttributeLength??0;if(r>0)for(const s in t.attributes){const i=t.attributes[s];typeof i=="string"&&i.length>r&&(t.attributes[s]="")}e.features.push(t)}addQueryGeometry(e,t){const{queryGeometry:r,queryGeometryType:s}=t,i=y(r.clone(),r,!1,!1,this._transform),a=_(i,s,!1,!1);let n=null;switch(s){case"esriGeometryPoint":n="point";break;case"esriGeometryPolygon":n="polygon";break;case"esriGeometryPolyline":n="polyline";break;case"esriGeometryMultipoint":n="multipoint"}a.type=n,e.queryGeometryType=s,e.queryGeometry=a}prepareFeatures(e){switch(this._transform=e.transform??null,this._options.applyTransform&&e.transform&&(this._applyTransform=this._deriveApplyTransform(e)),this._vertexDimension=2,e.hasZ&&this._vertexDimension++,e.hasM&&this._vertexDimension++,e.geometryType){case"point":this.addCoordinate=(t,r,s)=>this.addCoordinatePoint(t,r,s),this.createGeometry=t=>this.createPointGeometry(t);break;case"polygon":this.addCoordinate=(t,r,s)=>this._addCoordinatePolygon(t,r,s),this.createGeometry=t=>this._createPolygonGeometry(t);break;case"polyline":this.addCoordinate=(t,r,s)=>this._addCoordinatePolyline(t,r,s),this.createGeometry=t=>this._createPolylineGeometry(t);break;case"multipoint":this.addCoordinate=(t,r,s)=>this._addCoordinateMultipoint(t,r,s),this.createGeometry=t=>this._createMultipointGeometry(t);break;case"mesh":case"extent":break;default:m(e.geometryType)}}createFeature(){return this._lengths.length=0,this._currentLengthIndex=0,this._previousCoordinate[0]=0,this._previousCoordinate[1]=0,new g(P(),null,new this._attributesConstructor)}allocateCoordinates(){const e=this._lengths.reduce((t,r)=>t+r,0);this._coordinateBuffer=new Float64Array(e*this._vertexDimension),this._coordinateBufferPtr=0}addLength(e,t){this._lengths.length===0&&(this._toAddInCurrentPath=t),this._lengths.push(t)}createPointGeometry(e){const t={type:"point",x:0,y:0,spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM};return t.hasZ&&(t.z=0),t.hasM&&(t.m=0),t}addCoordinatePoint(e,t,r){const s=this._transform?this._applyTransform(this._transform,t,r,0):t;if(s!=null)switch(r){case 0:e.x=s;break;case 1:e.y=s;break;case 2:e.hasZ?e.z=s:e.m=s;break;case 3:e.m=s}}_transformPathLikeValue(e,t){let r=0;return t<=1&&(r=this._previousCoordinate[t],this._previousCoordinate[t]+=e),this._transform?this._applyTransform(this._transform,e,t,r):e}_addCoordinatePolyline(e,t,r){this._dehydratedAddPointsCoordinate(e.paths,t,r)}_addCoordinatePolygon(e,t,r){this._dehydratedAddPointsCoordinate(e.rings,t,r)}_addCoordinateMultipoint(e,t,r){r===0&&e.points.push([]);const s=this._transformPathLikeValue(t,r);e.points[e.points.length-1].push(s)}_createPolygonGeometry(e){return{type:"polygon",rings:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_createPolylineGeometry(e){return{type:"polyline",paths:[[]],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_createMultipointGeometry(e){return{type:"multipoint",points:[],spatialReference:e.spatialReference,hasZ:!!e.hasZ,hasM:!!e.hasM}}_dehydratedAddPointsCoordinate(e,t,r){r===0&&this._toAddInCurrentPath--==0&&(e.push([]),this._toAddInCurrentPath=this._lengths[++this._currentLengthIndex]-1,this._previousCoordinate[0]=0,this._previousCoordinate[1]=0);const s=this._transformPathLikeValue(t,r),i=e[e.length-1],a=this._coordinateBuffer;if(a){if(r===0){const n=this._coordinateBufferPtr*Float64Array.BYTES_PER_ELEMENT;i.push(new Float64Array(a.buffer,n,this._vertexDimension))}a[this._coordinateBufferPtr++]=s}}_deriveApplyTransform(e){const{hasZ:t,hasM:r}=e;return t&&r?v:t?u:r?G:l}}class R{_parseFeatureQuery(e){var s;const t=C(e.buffer,new T(e.options)),r={...t,spatialReference:(s=t.spatialReference)==null?void 0:s.toJSON(),fields:t.fields?t.fields.map(i=>i.toJSON()):void 0};return Promise.resolve(r)}}function A(){return new R}export{A as default};

import{ar as I,ep as v,bS as S,es as b,et as R,eu as M,ev as Q,eo as w,dF as D}from"./index-080e108a.js";import{t as Z,n as A}from"./objectIdUtils-789e911a.js";import{m as k}from"./FeatureStore-f0e312fc.js";import{e as C,f as _,g as E}from"./QueryEngine-19eda5ff.js";import{i as P,o as G,a as $}from"./clientSideDefaults-ab04bd90.js";import{y as z,u as g,d as x,c as T,h as q}from"./sourceUtils-e3b344c8.js";import{r as B}from"./FieldsIndex-f79a8f26.js";import"./BoundsStore-b6bd3c14.js";import"./PooledRBush-3cae7682.js";import"./quickselect-e80674f5.js";import"./optimizedFeatureQueryEngineAdapter-58185a60.js";import"./centroid-8e8cfa47.js";import"./normalizeUtils-cf8b8053.js";import"./normalizeUtilsCommon-500064b3.js";import"./WhereClause-c86b9974.js";import"./executionError-c92d3b85.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-42e44ded.js";import"./utils-2fe9d339.js";import"./generateRendererUtils-1e52a587.js";import"./defaultsJSON-59981e75.js";const L=w,W={xmin:-180,ymin:-90,xmax:180,ymax:90,spatialReference:w},U={hasAttachments:!1,capabilities:"query, editing, create, delete, update",useStandardizedQueries:!0,supportsCoordinatesQuantization:!0,supportsReturningQueryGeometry:!0,advancedQueryCapabilities:{supportsQueryAttachments:!1,supportsStatistics:!0,supportsPercentileStatistics:!0,supportsReturningGeometryCentroid:!0,supportsQueryWithDistance:!0,supportsDistinct:!0,supportsReturningQueryExtent:!0,supportsReturningGeometryProperties:!1,supportsHavingClause:!0,supportsOrderBy:!0,supportsPagination:!0,supportsQueryWithResultType:!1,supportsSqlExpression:!0,supportsDisjointSpatialRel:!0}};function H(m){return D(m)?m.z!=null:!!m.hasZ}function V(m){return D(m)?m.m!=null:!!m.hasM}class he{constructor(){this._queryEngine=null,this._nextObjectId=null}destroy(){this._queryEngine&&this._queryEngine&&this._queryEngine.destroy(),this._queryEngine=this._fieldsIndex=this._createDefaultAttributes=null}async load(e){const t=[],{features:a}=e,i=this._inferLayerProperties(a,e.fields),d=e.fields||[],p=e.hasM!=null?e.hasM:!!i.hasM,c=e.hasZ!=null?e.hasZ:!!i.hasZ,f=!e.spatialReference&&!i.spatialReference,u=f?L:e.spatialReference||i.spatialReference,y=f?W:null,r=e.geometryType||i.geometryType,l=!r;let o=e.objectIdField||i.objectIdField,s=e.timeInfo;if(!l&&(f&&t.push({name:"feature-layer:spatial-reference-not-found",message:"Spatial reference not provided or found in features. Defaults to WGS84"}),!r))throw new I("feature-layer:missing-property","geometryType not set and couldn't be inferred from the provided features");if(!o)throw new I("feature-layer:missing-property","objectIdField not set and couldn't be found in the provided fields");if(i.objectIdField&&o!==i.objectIdField&&(t.push({name:"feature-layer:duplicated-oid-field",message:`Provided objectIdField "${o}" doesn't match the field name "${i.objectIdField}", found in the provided fields`}),o=i.objectIdField),o&&!i.objectIdField){let n=null;d.some(h=>h.name===o&&(n=h,!0))?(n.type="esriFieldTypeOID",n.editable=!1,n.nullable=!1):d.unshift({alias:o,name:o,type:"esriFieldTypeOID",editable:!1,nullable:!1})}for(const n of d){if(n.name==null&&(n.name=n.alias),n.alias==null&&(n.alias=n.name),!n.name)throw new I("feature-layer:invalid-field-name","field name is missing",{field:n});if(n.name===o&&(n.type="esriFieldTypeOID"),!v.jsonValues.includes(n.type))throw new I("feature-layer:invalid-field-type",`invalid type for field "${n.name}"`,{field:n})}const F={};for(const n of d)if(n.type!=="esriFieldTypeOID"&&n.type!=="esriFieldTypeGlobalID"){const h=S(n);h!==void 0&&(F[n.name]=h)}if(this._fieldsIndex=new B(d),this._createDefaultAttributes=P(F,o),s){if(s.startTimeField){const n=this._fieldsIndex.get(s.startTimeField);n?(s.startTimeField=n.name,n.type="esriFieldTypeDate"):s.startTimeField=null}if(s.endTimeField){const n=this._fieldsIndex.get(s.endTimeField);n?(s.endTimeField=n.name,n.type="esriFieldTypeDate"):s.endTimeField=null}if(s.trackIdField){const n=this._fieldsIndex.get(s.trackIdField);n?s.trackIdField=n.name:(s.trackIdField=null,t.push({name:"feature-layer:invalid-timeInfo-trackIdField",message:"trackIdField is missing",details:{timeInfo:s}}))}s.startTimeField||s.endTimeField||(t.push({name:"feature-layer:invalid-timeInfo",message:"startTimeField and endTimeField are missing or invalid",details:{timeInfo:s}}),s=null)}const j={warnings:t,featureErrors:[],layerDefinition:{...U,drawingInfo:G(r),templates:$(F),extent:y,geometryType:r,objectIdField:o,fields:d,hasZ:c,hasM:p,timeInfo:s},assignedObjectIds:{}};if(this._queryEngine=new C({fields:d,geometryType:r,hasM:p,hasZ:c,objectIdField:o,spatialReference:u,featureStore:new k({geometryType:r,hasM:p,hasZ:c}),timeInfo:s,cacheSpatialQueries:!0}),!a||!a.length)return this._nextObjectId=Z,j;const O=A(o,a);return this._nextObjectId=O+1,await _(a,u),this._loadInitialFeatures(j,a)}async applyEdits(e){const{spatialReference:t,geometryType:a}=this._queryEngine;return await Promise.all([z(t,a),_(e.adds,t),_(e.updates,t)]),this._applyEdits(e)}queryFeatures(e,t={}){return this._queryEngine.executeQuery(e,t.signal)}queryFeatureCount(e,t={}){return this._queryEngine.executeQueryForCount(e,t.signal)}queryObjectIds(e,t={}){return this._queryEngine.executeQueryForIds(e,t.signal)}queryExtent(e,t={}){return this._queryEngine.executeQueryForExtent(e,t.signal)}querySnapping(e,t={}){return this._queryEngine.executeQueryForSnapping(e,t.signal)}_inferLayerProperties(e,t){let a,i,d=null,p=null,c=null;for(const f of e){const u=f.geometry;if(u!=null&&(d||(d=b(u)),p||(p=u.spatialReference),a==null&&(a=H(u)),i==null&&(i=V(u)),d&&p&&a!=null&&i!=null))break}if(t&&t.length){let f=null;t.some(u=>{const y=u.type==="esriFieldTypeOID",r=!u.type&&u.name&&u.name.toLowerCase()==="objectid";return f=u,y||r})&&(c=f.name)}return{geometryType:d,spatialReference:p,objectIdField:c,hasM:i,hasZ:a}}async _loadInitialFeatures(e,t){const{geometryType:a,hasM:i,hasZ:d,objectIdField:p,spatialReference:c,featureStore:f}=this._queryEngine,u=[];for(const l of t){if(l.uid!=null&&(e.assignedObjectIds[l.uid]=-1),l.geometry&&a!==b(l.geometry)){e.featureErrors.push(g("Incorrect geometry type."));continue}const o=this._createDefaultAttributes(),s=x(this._fieldsIndex,o,l.attributes,!0,e.warnings);s?e.featureErrors.push(s):(this._assignObjectId(o,l.attributes,!0),l.attributes=o,l.uid!=null&&(e.assignedObjectIds[l.uid]=l.attributes[p]),l.geometry!=null&&(l.geometry=E(l.geometry,l.geometry.spatialReference,c)),u.push(l))}f.addMany(R([],u,a,d,i,p));const{fullExtent:y,timeExtent:r}=await this._queryEngine.fetchRecomputedExtents();if(e.layerDefinition.extent=y,r){const{start:l,end:o}=r;e.layerDefinition.timeInfo.timeExtent=[l,o]}return e}async _applyEdits(e){const{adds:t,updates:a,deletes:i}=e,d={addResults:[],deleteResults:[],updateResults:[],uidToObjectId:{}};if(t&&t.length&&this._applyAddEdits(d,t),a&&a.length&&this._applyUpdateEdits(d,a),i&&i.length){for(const f of i)d.deleteResults.push(T(f));this._queryEngine.featureStore.removeManyById(i)}const{fullExtent:p,timeExtent:c}=await this._queryEngine.fetchRecomputedExtents();return{extent:p,timeExtent:c,featureEditResults:d}}_applyAddEdits(e,t){const{addResults:a}=e,{geometryType:i,hasM:d,hasZ:p,objectIdField:c,spatialReference:f,featureStore:u}=this._queryEngine,y=[];for(const r of t){if(r.geometry&&i!==b(r.geometry)){a.push(g("Incorrect geometry type."));continue}const l=this._createDefaultAttributes(),o=x(this._fieldsIndex,l,r.attributes);if(o)a.push(o);else{if(this._assignObjectId(l,r.attributes),r.attributes=l,r.uid!=null){const s=r.attributes[c];e.uidToObjectId[r.uid]=s}if(r.geometry!=null){const s=r.geometry.spatialReference??f;r.geometry=E(q(r.geometry,s),s,f)}y.push(r),a.push(T(r.attributes[c]))}}u.addMany(R([],y,i,p,d,c))}_applyUpdateEdits({updateResults:e},t){const{geometryType:a,hasM:i,hasZ:d,objectIdField:p,spatialReference:c,featureStore:f}=this._queryEngine;for(const u of t){const{attributes:y,geometry:r}=u,l=y&&y[p];if(l==null){e.push(g(`Identifier field ${p} missing`));continue}if(!f.has(l)){e.push(g(`Feature with object id ${l} missing`));continue}const o=M(f.getFeature(l),a,d,i);if(r!=null){if(a!==b(r)){e.push(g("Incorrect geometry type."));continue}const s=r.spatialReference??c;o.geometry=E(q(r,s),s,c)}if(y){const s=x(this._fieldsIndex,o.attributes,y);if(s){e.push(s);continue}}f.add(Q(o,a,d,i,p)),e.push(T(l))}}_assignObjectId(e,t,a=!1){const i=this._queryEngine.objectIdField;a&&t&&isFinite(t[i])?e[i]=t[i]:e[i]=this._nextObjectId++}}export{he as default};

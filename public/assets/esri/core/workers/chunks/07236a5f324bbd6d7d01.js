"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[5546],{84552:(e,t,i)=>{i.d(t,{Z:()=>c});var r=i(43697),n=i(2368),s=i(96674),l=i(35463),o=i(5600),a=(i(75215),i(67676),i(36030)),u=i(52011),p=i(78981);let d=class extends((0,n.J)(s.wq)){constructor(e){super(e),this.unit="milliseconds",this.value=0}toMilliseconds(){return(0,l.rJ)(this.value,this.unit,"milliseconds")}};(0,r._)([(0,a.J)(p.v,{nonNullable:!0})],d.prototype,"unit",void 0),(0,r._)([(0,o.Cb)({type:Number,json:{write:!0},nonNullable:!0})],d.prototype,"value",void 0),d=(0,r._)([(0,u.j)("esri.TimeInterval")],d);const c=d},44543:(e,t,i)=>{i.d(t,{F:()=>d,M:()=>r});const r={Base64:0,Hex:1,String:2,Raw:3};function n(e,t){const i=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(i>>16)<<16|65535&i}function s(e,t,i,r,s,l){return n(function(e,t){return e<<t|e>>>32-t}(n(n(t,e),n(r,l)),s),i)}function l(e,t,i,r,n,l,o){return s(t&i|~t&r,e,t,n,l,o)}function o(e,t,i,r,n,l,o){return s(t&r|i&~r,e,t,n,l,o)}function a(e,t,i,r,n,l,o){return s(t^i^r,e,t,n,l,o)}function u(e,t,i,r,n,l,o){return s(i^(t|~r),e,t,n,l,o)}function p(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;let i=1732584193,r=-271733879,s=-1732584194,p=271733878;for(let t=0;t<e.length;t+=16){const d=i,c=r,f=s,y=p;i=l(i,r,s,p,e[t+0],7,-680876936),p=l(p,i,r,s,e[t+1],12,-389564586),s=l(s,p,i,r,e[t+2],17,606105819),r=l(r,s,p,i,e[t+3],22,-1044525330),i=l(i,r,s,p,e[t+4],7,-176418897),p=l(p,i,r,s,e[t+5],12,1200080426),s=l(s,p,i,r,e[t+6],17,-1473231341),r=l(r,s,p,i,e[t+7],22,-45705983),i=l(i,r,s,p,e[t+8],7,1770035416),p=l(p,i,r,s,e[t+9],12,-1958414417),s=l(s,p,i,r,e[t+10],17,-42063),r=l(r,s,p,i,e[t+11],22,-1990404162),i=l(i,r,s,p,e[t+12],7,1804603682),p=l(p,i,r,s,e[t+13],12,-40341101),s=l(s,p,i,r,e[t+14],17,-1502002290),r=l(r,s,p,i,e[t+15],22,1236535329),i=o(i,r,s,p,e[t+1],5,-165796510),p=o(p,i,r,s,e[t+6],9,-1069501632),s=o(s,p,i,r,e[t+11],14,643717713),r=o(r,s,p,i,e[t+0],20,-373897302),i=o(i,r,s,p,e[t+5],5,-701558691),p=o(p,i,r,s,e[t+10],9,38016083),s=o(s,p,i,r,e[t+15],14,-660478335),r=o(r,s,p,i,e[t+4],20,-405537848),i=o(i,r,s,p,e[t+9],5,568446438),p=o(p,i,r,s,e[t+14],9,-1019803690),s=o(s,p,i,r,e[t+3],14,-187363961),r=o(r,s,p,i,e[t+8],20,1163531501),i=o(i,r,s,p,e[t+13],5,-1444681467),p=o(p,i,r,s,e[t+2],9,-51403784),s=o(s,p,i,r,e[t+7],14,1735328473),r=o(r,s,p,i,e[t+12],20,-1926607734),i=a(i,r,s,p,e[t+5],4,-378558),p=a(p,i,r,s,e[t+8],11,-2022574463),s=a(s,p,i,r,e[t+11],16,1839030562),r=a(r,s,p,i,e[t+14],23,-35309556),i=a(i,r,s,p,e[t+1],4,-1530992060),p=a(p,i,r,s,e[t+4],11,1272893353),s=a(s,p,i,r,e[t+7],16,-155497632),r=a(r,s,p,i,e[t+10],23,-1094730640),i=a(i,r,s,p,e[t+13],4,681279174),p=a(p,i,r,s,e[t+0],11,-358537222),s=a(s,p,i,r,e[t+3],16,-722521979),r=a(r,s,p,i,e[t+6],23,76029189),i=a(i,r,s,p,e[t+9],4,-640364487),p=a(p,i,r,s,e[t+12],11,-421815835),s=a(s,p,i,r,e[t+15],16,530742520),r=a(r,s,p,i,e[t+2],23,-995338651),i=u(i,r,s,p,e[t+0],6,-198630844),p=u(p,i,r,s,e[t+7],10,1126891415),s=u(s,p,i,r,e[t+14],15,-1416354905),r=u(r,s,p,i,e[t+5],21,-57434055),i=u(i,r,s,p,e[t+12],6,1700485571),p=u(p,i,r,s,e[t+3],10,-1894986606),s=u(s,p,i,r,e[t+10],15,-1051523),r=u(r,s,p,i,e[t+1],21,-2054922799),i=u(i,r,s,p,e[t+8],6,1873313359),p=u(p,i,r,s,e[t+15],10,-30611744),s=u(s,p,i,r,e[t+6],15,-1560198380),r=u(r,s,p,i,e[t+13],21,1309151649),i=u(i,r,s,p,e[t+4],6,-145523070),p=u(p,i,r,s,e[t+11],10,-1120210379),s=u(s,p,i,r,e[t+2],15,718787259),r=u(r,s,p,i,e[t+9],21,-343485551),i=n(i,d),r=n(r,c),s=n(s,f),p=n(p,y)}return[i,r,s,p]}function d(e,t=r.Hex){const i=t||r.Base64,n=p(function(e){const t=[];for(let i=0,r=8*e.length;i<r;i+=8)t[i>>5]|=(255&e.charCodeAt(i/8))<<i%32;return t}(e),8*e.length);switch(i){case r.Raw:return n;case r.Hex:return function(e){const t="0123456789abcdef",i=[];for(let r=0,n=4*e.length;r<n;r++)i.push(t.charAt(e[r>>2]>>r%4*8+4&15)+t.charAt(e[r>>2]>>r%4*8&15));return i.join("")}(n);case r.String:return function(e){const t=[];for(let i=0,r=32*e.length;i<r;i+=8)t.push(String.fromCharCode(e[i>>5]>>>i%32&255));return t.join("")}(n);case r.Base64:return function(e){const t=[];for(let i=0,r=4*e.length;i<r;i+=3){const r=(e[i>>2]>>i%4*8&255)<<16|(e[i+1>>2]>>(i+1)%4*8&255)<<8|e[i+2>>2]>>(i+2)%4*8&255;for(let n=0;n<4;n++)8*i+6*n>32*e.length?t.push("="):t.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(r>>6*(3-n)&63))}return t.join("")}(n)}}},69637:(e,t,i)=>{i.d(t,{b:()=>R});var r,n=i(43697),s=i(5600),l=(i(75215),i(67676),i(52011)),o=i(20102),a=i(96674),u=i(70586),p=i(78286),d=i(57520),c=i(66577),f=i(92835),y=i(35454),m=i(22974),h=i(14165);const b=new y.X({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"}),v=new y.X({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"});let w=r=class extends a.wq{constructor(e){super(e),this.where=null,this.geometry=null,this.spatialRelationship="intersects",this.distance=void 0,this.objectIds=null,this.units=null,this.timeExtent=null}createQuery(e={}){const{where:t,geometry:i,spatialRelationship:r,timeExtent:n,objectIds:s,units:l,distance:o}=this;return new h.Z({geometry:(0,m.d9)(i),objectIds:(0,m.d9)(s),spatialRelationship:r,timeExtent:(0,m.d9)(n),where:t,units:l,distance:o,...e})}clone(){const{where:e,geometry:t,spatialRelationship:i,timeExtent:n,objectIds:s,units:l,distance:o}=this;return new r({geometry:(0,m.d9)(t),objectIds:(0,m.d9)(s),spatialRelationship:i,timeExtent:(0,m.d9)(n),where:e,units:l,distance:o})}};(0,n._)([(0,s.Cb)({type:String,json:{write:!0}})],w.prototype,"where",void 0),(0,n._)([(0,s.Cb)({types:c.qM,json:{write:!0}})],w.prototype,"geometry",void 0),(0,n._)([(0,s.Cb)({type:b.apiValues,json:{name:"spatialRel",read:{reader:b.read},write:{allowNull:!1,writer:b.write,overridePolicy(){return{enabled:(0,u.pC)(this.geometry)}}}}})],w.prototype,"spatialRelationship",void 0),(0,n._)([(0,s.Cb)({type:Number,json:{write:{overridePolicy(e){return{enabled:null!=e&&null!=this.geometry}}}}})],w.prototype,"distance",void 0),(0,n._)([(0,s.Cb)({type:[Number],json:{write:!0}})],w.prototype,"objectIds",void 0),(0,n._)([(0,s.Cb)({type:v.apiValues,json:{read:v.read,write:{writer:v.write,overridePolicy(e){return{enabled:null!=e&&null!=this.geometry}}}}})],w.prototype,"units",void 0),(0,n._)([(0,s.Cb)({type:f.Z,json:{write:!0}})],w.prototype,"timeExtent",void 0),w=r=(0,n._)([(0,l.j)("esri.layers.support.FeatureFilter")],w);const g=w;var _;const x={read:{reader:d.ij},write:{writer:d.cW,overridePolicy(){return{allowNull:null!=this.excludedEffect,isRequired:null==this.excludedEffect}}}},S={read:{reader:d.ij},write:{writer:d.cW,overridePolicy(){return{allowNull:null!=this.includedEffect,isRequired:null==this.includedEffect}}}},E={name:"showExcludedLabels",default:!0};let I=_=class extends a.wq{constructor(e){super(e),this.filter=null,this.includedEffect=null,this.excludedEffect=null,this.excludedLabelsVisible=!1}write(e,t){const i=super.write(e,t);if(t?.origin){if(i.filter){const e=Object.keys(i.filter);if(e.length>1||"where"!==e[0])return t.messages?.push(new o.Z("web-document-write:unsupported-feature-effect","Invalid feature effect 'filter'. A filter can only contain a 'where' property",{layer:t.layer,effect:this})),null}if("showExcludedLabels"in i)return t.messages?.push(new o.Z("web-document-write:unsupported-feature-effect","Invalid value for property 'excludedLabelsVisible' which should always be 'true'",{layer:t.layer,effect:this})),null}return i}clone(){return new _({filter:(0,u.pC)(this.filter)?this.filter.clone():null,includedEffect:this.includedEffect,excludedEffect:this.excludedEffect,excludedLabelsVisible:this.excludedLabelsVisible})}};(0,n._)([(0,s.Cb)({type:g,json:{write:{allowNull:!0,writer(e,t,i,r){const n=e?.write({},r);n&&0!==Object.keys(n).length?(0,p.RB)(i,n,t):(0,p.RB)(i,null,t)}}}})],I.prototype,"filter",void 0),(0,n._)([(0,s.Cb)({json:{write:!0,origins:{"web-map":x,"portal-item":x}}})],I.prototype,"includedEffect",void 0),(0,n._)([(0,s.Cb)({json:{write:!0,origins:{"web-map":S,"portal-item":S}}})],I.prototype,"excludedEffect",void 0),(0,n._)([(0,s.Cb)({type:Boolean,json:{write:!0,name:"showExcludedLabels",origins:{"web-map":E,"portal-item":E}}})],I.prototype,"excludedLabelsVisible",void 0),I=_=(0,n._)([(0,l.j)("esri.layers.support.FeatureEffect")],I);const C=I,j={write:{allowNull:!0}},R=e=>{let t=class extends e{constructor(){super(...arguments),this.featureEffect=null}};return(0,n._)([(0,s.Cb)({type:C,json:{origins:{"web-map":j,"portal-item":j}}})],t.prototype,"featureEffect",void 0),t=(0,n._)([(0,l.j)("esri.layers.mixins.FeatureEffectLayer")],t),t}},6404:(e,t,i)=>{i.d(t,{M:()=>te});var r=i(43697),n=i(5600),s=(i(75215),i(67676),i(52011)),l=i(96674),o=i(22974),a=i(2368);let u=class extends((0,a.J)(l.wq)){constructor(e){super(e),this.expression=null,this.title=null,this.returnType=null}};(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],u.prototype,"expression",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],u.prototype,"title",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],u.prototype,"returnType",void 0),u=(0,r._)([(0,s.j)("esri.layers.support.ExpressionInfo")],u);const p=u;var d;let c=d=class extends l.wq{constructor(e){super(e),this.isAutoGenerated=!1,this.name=null,this.alias=null,this.onStatisticField=null,this.onStatisticExpression=null,this.statisticType=null}clone(){return new d({name:this.name,alias:this.alias,isAutoGenerated:this.isAutoGenerated,onStatisticExpression:(0,o.d9)(this.onStatisticExpression),onStatisticField:this.onStatisticField,statisticType:this.statisticType})}};(0,r._)([(0,n.Cb)({type:Boolean,json:{write:!0}})],c.prototype,"isAutoGenerated",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],c.prototype,"name",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],c.prototype,"alias",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],c.prototype,"onStatisticField",void 0),(0,r._)([(0,n.Cb)({type:p,json:{write:!0}})],c.prototype,"onStatisticExpression",void 0),(0,r._)([(0,n.Cb)({type:String,json:{write:!0}})],c.prototype,"statisticType",void 0),c=d=(0,r._)([(0,s.j)("esri.layers.support.AggregateField")],c);const f=c;var y,m=i(61960),h=i(51773),b=(i(16050),i(12501),i(28756),i(92271),i(72529),i(5499),i(84382)),v=i(81571),w=i(91423),g=i(32400),_=i(9790),x=i(78286),S=i(36030),E=i(71715),I=i(30556),C=i(63213),j=i(21506),R=i(54306);const T=(0,C.d)({types:_.QT});let F=y=class extends m.B{constructor(e){super(e),this.type="binning",this.binType="geohash",this.fixedBinLevel=3,this.labelingInfo=null,this.labelsVisible=!0,this.maxScale=0,this.popupEnabled=!0,this.popupTemplate=null,this.fields=[],this.renderer=null}writeFields(e,t,i){const r=e.filter((e=>"avg_angle"!==e.statisticType)).map((e=>e.toJSON()));(0,x.RB)(i,r,t)}readRenderer(e,t,i){const r=t.drawingInfo?.renderer;return r?(0,w.a)(r,t,i)??void 0:t.defaultSymbol?t.types&&t.types.length?new v.Z({defaultSymbol:T(t.defaultSymbol,t,i),field:t.typeIdField,uniqueValueInfos:t.types.map((e=>({id:e.id,symbol:T(e.symbol,e,i)})))}):new b.Z({symbol:T(t.defaultSymbol,t,i)}):null}clone(){return new y({fields:(0,o.d9)(this.fields),fixedBinLevel:this.fixedBinLevel,labelingInfo:(0,o.d9)(this.labelingInfo),labelsVisible:this.labelsVisible,maxScale:this.maxScale,popupEnabled:this.popupEnabled,popupTemplate:(0,o.d9)(this.popupTemplate),renderer:(0,o.d9)(this.renderer)})}};(0,r._)([(0,S.J)({binning:"binning"})],F.prototype,"type",void 0),(0,r._)([(0,S.J)({geohash:"geohash"})],F.prototype,"binType",void 0),(0,r._)([(0,n.Cb)({type:Number,range:{min:1,max:9},json:{write:!0}})],F.prototype,"fixedBinLevel",void 0),(0,r._)([(0,n.Cb)({type:[R.Z],json:{read:{source:"drawingInfo.labelingInfo"},write:{target:"drawingInfo.labelingInfo"}}})],F.prototype,"labelingInfo",void 0),(0,r._)([(0,n.Cb)(j.iR)],F.prototype,"labelsVisible",void 0),(0,r._)([(0,n.Cb)({type:Number,json:{default:0,name:"visibilityInfo.maxScale"}})],F.prototype,"maxScale",void 0),(0,r._)([(0,n.Cb)(j.C_)],F.prototype,"popupEnabled",void 0),(0,r._)([(0,n.Cb)({type:h.Z,json:{name:"popupInfo",write:!0}})],F.prototype,"popupTemplate",void 0),(0,r._)([(0,n.Cb)({type:[f],json:{write:!0}})],F.prototype,"fields",void 0),(0,r._)([(0,I.c)("fields")],F.prototype,"writeFields",null),(0,r._)([(0,n.Cb)({types:g.A,json:{write:{target:"drawingInfo.renderer"}}})],F.prototype,"renderer",void 0),(0,r._)([(0,E.r)("renderer",["drawingInfo.renderer"])],F.prototype,"readRenderer",null),F=y=(0,r._)([(0,s.j)("esri.layers.support.FeatureReductionBinning")],F);const Z=F;var V,U=i(62357);const z=(0,C.d)({types:_.QT});function N(e){return"simple"===e.type&&!e.visualVariables?.length}let O=V=class extends l.wq{constructor(e){super(e),this.type="cluster",this.clusterRadius=(0,U.t_)("80px"),this.clusterMinSize=(0,U.t_)("12px"),this.clusterMaxSize=(0,U.t_)("50px"),this.maxScale=0,this.popupEnabled=!0,this.popupTemplate=null,this.renderer=null,this.symbol=null,this.labelingInfo=null,this.labelsVisible=!0,this.fields=null}readRenderer(e,t,i){const r=t.drawingInfo?.renderer;return r?.authoringInfo?.isAutoGenerated?null:r?N(r)?null:(0,w.a)(r,t,i)??void 0:t.defaultSymbol?t.types&&t.types.length?new v.Z({defaultSymbol:z(t.defaultSymbol,t,i),field:t.typeIdField,uniqueValueInfos:t.types.map((e=>({id:e.id,symbol:z(e.symbol,e,i)})))}):new b.Z({symbol:z(t.defaultSymbol,t,i)}):null}readSymbol(e,t,i){const r=t.drawingInfo?.renderer;return r?.authoringInfo?.isAutoGenerated?null:r&&N(r)?(0,w.a)(r,t,i)?.symbol:null}writeSymbol(e,t,i,r){const n=this.renderer?.authoringInfo?.isAutoGenerated;if(!this.renderer||n){const i=new b.Z({symbol:e});t.drawingInfo={renderer:i.write({},r)}}}writeFields(e,t,i){const r=e.filter((e=>"avg_angle"!==e.statisticType)).map((e=>e.toJSON()));(0,x.RB)(i,r,t)}readFields(e,t,i){return e.filter((e=>!e.isAutoGenerated)).map((e=>f.fromJSON(e)))}clone(){return new V({clusterRadius:this.clusterRadius,clusterMinSize:this.clusterMinSize,clusterMaxSize:this.clusterMaxSize,labelingInfo:(0,o.d9)(this.labelingInfo),labelsVisible:this.labelsVisible,fields:(0,o.d9)(this.fields),maxScale:this.maxScale,renderer:(0,o.d9)(this.renderer),symbol:(0,o.d9)(this.symbol),popupEnabled:this.popupEnabled,popupTemplate:(0,o.d9)(this.popupTemplate)})}};(0,r._)([(0,n.Cb)({type:["cluster"],readOnly:!0,json:{write:!0}})],O.prototype,"type",void 0),(0,r._)([(0,n.Cb)({type:Number,cast:e=>"auto"===e?e:(0,U.t_)(e),json:{write:!0}})],O.prototype,"clusterRadius",void 0),(0,r._)([(0,n.Cb)({type:Number,cast:U.t_,json:{write:!0}})],O.prototype,"clusterMinSize",void 0),(0,r._)([(0,n.Cb)({type:Number,cast:U.t_,json:{write:!0}})],O.prototype,"clusterMaxSize",void 0),(0,r._)([(0,n.Cb)({type:Number,json:{default:0,name:"visibilityInfo.maxScale"}})],O.prototype,"maxScale",void 0),(0,r._)([(0,n.Cb)(j.C_)],O.prototype,"popupEnabled",void 0),(0,r._)([(0,n.Cb)({type:h.Z,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],O.prototype,"popupTemplate",void 0),(0,r._)([(0,n.Cb)({types:g.A,json:{write:{target:"drawingInfo.renderer"}}})],O.prototype,"renderer",void 0),(0,r._)([(0,E.r)("renderer",["drawingInfo.renderer"])],O.prototype,"readRenderer",null),(0,r._)([(0,n.Cb)({types:_.AH})],O.prototype,"symbol",void 0),(0,r._)([(0,E.r)("symbol",["drawingInfo.renderer"])],O.prototype,"readSymbol",null),(0,r._)([(0,I.c)("symbol")],O.prototype,"writeSymbol",null),(0,r._)([(0,n.Cb)({type:[R.Z],json:{read:{source:"drawingInfo.labelingInfo"},write:{target:"drawingInfo.labelingInfo"}}})],O.prototype,"labelingInfo",void 0),(0,r._)([(0,n.Cb)(j.iR)],O.prototype,"labelsVisible",void 0),(0,r._)([(0,n.Cb)({type:[f],json:{write:!0}})],O.prototype,"fields",void 0),(0,r._)([(0,I.c)("fields")],O.prototype,"writeFields",null),(0,r._)([(0,E.r)("fields")],O.prototype,"readFields",null),O=V=(0,r._)([(0,s.j)("esri.layers.support.FeatureReductionCluster")],O);const A=O;var B=i(85857);const L={key:"type",base:m.B,typeMap:{cluster:A,binning:Z}},k={types:{key:"type",base:m.B,typeMap:{selection:B.Z,cluster:A,binning:Z}},json:{name:"layerDefinition.featureReduction",write:{allowNull:!0},origins:{"web-map":{types:L},"portal-item":{types:L},"web-scene":{types:{key:"type",base:m.B,typeMap:{selection:B.Z}}}}}};var M,q=i(20102),G=i(80442),D=i(92604),J=i(70586),$=i(44543),P=i(69237),H=i(23847),W=(i(30856),i(51706));let Q=M=class extends H.Z{writeLevels(e,t,i){for(const i in e){const e=this.levels[i];return void(t.stops=e)}}clone(){return new M({axis:this.axis,field:this.field,valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,maxDataValue:this.maxDataValue,maxSize:(0,W.iY)(this.maxSize)?this.maxSize.clone():this.maxSize,minDataValue:this.minDataValue,minSize:(0,W.iY)(this.minSize)?this.minSize.clone():this.minSize,normalizationField:this.normalizationField,stops:this.stops&&this.stops.map((e=>e.clone())),target:this.target,useSymbolValue:this.useSymbolValue,valueRepresentation:this.valueRepresentation,valueUnit:this.valueUnit,legendOptions:this.legendOptions&&this.legendOptions.clone(),levels:(0,o.d9)(this.levels)})}};(0,r._)([(0,n.Cb)()],Q.prototype,"levels",void 0),(0,r._)([(0,I.c)("levels")],Q.prototype,"writeLevels",null),Q=M=(0,r._)([(0,s.j)("esri.views.2d.engine.LevelDependentSizeVariable")],Q);const Y=D.Z.getLogger("esri.views.2d.layers.support.clusterUtils");G.Z.add("esri-cluster-arcade-enabled",!0);const X=(0,G.Z)("esri-cluster-arcade-enabled");function K(e,t,i,r){const n=(0,$.F)(t),s="mode"===i?`cluster_type_${n}`:"sum"===i?`cluster_sum_${n}`:`cluster_avg_${n}`;return e.some((e=>e.name===s))||e.push(new f({name:s,isAutoGenerated:!0,onStatisticExpression:new p({expression:t,returnType:r}),statisticType:i})),s}function ee(e,t,i,r,n){if("cluster_count"===t||e.some((e=>e.name===t)))return t;const s=function(e,t,i){switch(e){case"sum":return`cluster_sum_${t}`;case"avg":case"avg_angle":return`cluster_avg_${t}`;case"mode":return`cluster_type_${t}`;case"avg_norm":{const e=i,r="field",n=t.toLowerCase()+",norm:"+r+","+e.toLowerCase();return"cluster_avg_"+(0,$.F)(n)}}}(i,t,n);return e.some((e=>e.name===s))||("avg_norm"===i?e.push(new f({name:s,isAutoGenerated:!0,onStatisticExpression:new p({expression:`$feature.${t} / $feature.${n}`,returnType:r}),statisticType:"avg"})):e.push(new f({name:s,isAutoGenerated:!0,onStatisticField:t,statisticType:i}))),s}const te=e=>{let t=class extends e{constructor(...e){super(...e),this.own(this.watch("renderer",(()=>{if(this.featureReduction){const e=this._normalizeFeatureReduction(this.featureReduction);this._set("featureReduction",e)}}),!0))}set featureReduction(e){const t=this._normalizeFeatureReduction(e);this._set("featureReduction",t)}set renderer(e){}_normalizeFeatureReduction(e){if("cluster"!==e?.type)return e;const t=e.clone(),i=[new f({name:"cluster_count",isAutoGenerated:!0,statisticType:"count"})],r=(t.fields??[]).filter((e=>!e.isAutoGenerated));if(e.renderer&&!e.renderer.authoringInfo?.isAutoGenerated)return t.fields=[...i,...r],t;if(e.symbol)return t.fields=[...i,...r],t.renderer=null,t;if(!this.renderer)return e;const n=((e,t,i,r,n)=>{const s=t.clone();if(!(e=>{const t=t=>Y.error(new q.Z("Unsupported-renderer",t,{renderer:e}));switch(e.type){case"unique-value":if(e.field2||e.field3)return t("FeatureReductionCluster does not support multi-field UniqueValueRenderers"),!1;break;case"class-breaks":if(e.normalizationField){const i=e.normalizationType;if("field"!==i)return t(`FeatureReductionCluster does not support a normalizationType of ${i}`),!1}break;case"simple":case"pie-chart":break;default:return t(`FeatureReductionCluster does not support renderers of type ${e.type}`),!1}if(!X){if("valueExpression"in e&&e.valueExpression)return t("FeatureReductionCluster does not currently support renderer.valueExpression. Support will be added in a future release"),!1;if(("visualVariables"in e&&e.visualVariables||[]).some((e=>!(!("valueExpression"in e)||!e.valueExpression))))return t("FeatureReductionCluster does not currently support visualVariables with a valueExpression. Support will be added in a future release"),!1}return!0})(s))return s;if(s.authoringInfo||(s.authoringInfo=new P.Z),s.authoringInfo.isAutoGenerated=!0,"visualVariables"in s){const t=(s.visualVariables||[]).filter((e=>"$view.scale"!==e.valueExpression)),i=(e=>{for(const t of e)if("size"===t.type)return t;return null})(t);t.forEach((t=>{"rotation"===t.type?t.field?t.field=ee(e,t.field,"avg_angle","number"):t.valueExpression&&(t.field=K(e,t.valueExpression,"avg_angle","number"),t.valueExpression=null):t.normalizationField?(t.field=ee(e,t.field,"avg_norm","number",t.normalizationField),t.normalizationField=null):t.field?t.field=ee(e,t.field,"avg","number"):t.valueExpression&&(t.field=K(e,t.valueExpression,"avg","number"),t.valueExpression=null)})),(0,J.Wi)(i)&&(e=>{for(const t of e)if("cluster_count"===t.field)return!0})(t),s.visualVariables=t}switch(s.type){case"simple":break;case"pie-chart":for(const t of s.attributes)t.field?t.field=ee(e,t.field,"sum","number"):t.valueExpression&&(t.field=K(e,t.valueExpression,"sum","number"),t.valueExpression=null);break;case"unique-value":s.field?s.field=ee(e,s.field,"mode","string"):s.valueExpression&&(s.field=K(e,s.valueExpression,"mode","string"),s.valueExpression=null);break;case"class-breaks":s.normalizationField?(s.field=ee(e,s.field,"avg_norm","number",s.normalizationField),s.normalizationField=null):s.field?s.field=ee(e,s.field,"avg","number"):s.valueExpression&&(s.field=K(e,s.valueExpression,"avg","number"),s.valueExpression=null)}return s})(i,this.renderer);return t.fields=[...i,...r],t.renderer=n,t}};return(0,r._)([(0,n.Cb)(k)],t.prototype,"featureReduction",null),t=(0,r._)([(0,s.j)("esri.layers.mixins.FeatureReductionLayer")],t),t}},28294:(e,t,i)=>{i.d(t,{n:()=>c});var r=i(43697),n=i(92835),s=i(84552),l=i(5600),o=(i(75215),i(67676),i(71715)),a=i(52011),u=i(35671),p=i(76259),d=i(78981);const c=e=>{let t=class extends e{constructor(){super(...arguments),this.timeExtent=null,this.timeOffset=null,this.useViewTime=!0}readOffset(e,t){const i=t.timeInfo.exportOptions;if(!i)return null;const r=i.timeOffset,n=d.v.fromJSON(i.timeOffsetUnits);return r&&n?new s.Z({value:r,unit:n}):null}set timeInfo(e){(0,u.UF)(e,this.fieldsIndex),this._set("timeInfo",e)}};return(0,r._)([(0,l.Cb)({type:n.Z,json:{write:!1}})],t.prototype,"timeExtent",void 0),(0,r._)([(0,l.Cb)({type:s.Z})],t.prototype,"timeOffset",void 0),(0,r._)([(0,o.r)("service","timeOffset",["timeInfo.exportOptions"])],t.prototype,"readOffset",null),(0,r._)([(0,l.Cb)({value:null,type:p.Z,json:{write:!0,origins:{"web-document":{read:!1,write:!1},"portal-item":{read:!1,write:!1}}}})],t.prototype,"timeInfo",null),(0,r._)([(0,l.Cb)({type:Boolean,json:{read:{source:"timeAnimation"},write:{target:"timeAnimation"},origins:{"web-scene":{read:!1,write:!1}}}})],t.prototype,"useViewTime",void 0),t=(0,r._)([(0,a.j)("esri.layers.mixins.TemporalLayer")],t),t}},61960:(e,t,i)=>{i.d(t,{B:()=>o});var r=i(43697),n=i(96674),s=i(5600),l=(i(75215),i(67676),i(52011));let o=class extends n.wq{constructor(){super(...arguments),this.type=null}};(0,r._)([(0,s.Cb)({type:["selection","cluster","binning"],readOnly:!0,json:{read:!1,write:!0}})],o.prototype,"type",void 0),o=(0,r._)([(0,l.j)("esri.layers.support.FeatureReduction")],o)},85857:(e,t,i)=>{i.d(t,{Z:()=>u});var r,n=i(43697),s=i(5600),l=(i(75215),i(67676),i(52011)),o=i(61960);let a=r=class extends o.B{constructor(e){super(e),this.type="selection"}clone(){return new r}};(0,n._)([(0,s.Cb)({type:["selection"]})],a.prototype,"type",void 0),a=r=(0,n._)([(0,l.j)("esri.layers.support.FeatureReductionSelection")],a);const u=a},76259:(e,t,i)=>{i.d(t,{Z:()=>h});var r=i(43697),n=i(92835),s=i(84552),l=i(2368),o=i(96674),a=i(70586),u=i(5600),p=(i(75215),i(67676),i(71715)),d=i(52011),c=i(30556),f=i(80216);function y(e,t){return s.Z.fromJSON({value:e,unit:t})}let m=class extends((0,l.J)(o.wq)){constructor(e){super(e),this.cumulative=!1,this.endField=null,this.fullTimeExtent=null,this.hasLiveData=!1,this.interval=null,this.startField=null,this.timeReference=null,this.trackIdField=null,this.useTime=!0}readFullTimeExtent(e,t){if(!t.timeExtent||!Array.isArray(t.timeExtent)||2!==t.timeExtent.length)return null;const i=new Date(t.timeExtent[0]),r=new Date(t.timeExtent[1]);return new n.Z({start:i,end:r})}writeFullTimeExtent(e,t){e&&(0,a.pC)(e.start)&&(0,a.pC)(e.end)?t.timeExtent=[e.start.getTime(),e.end.getTime()]:t.timeExtent=null}readInterval(e,t){return t.timeInterval&&t.timeIntervalUnits?y(t.timeInterval,t.timeIntervalUnits):t.defaultTimeInterval&&t.defaultTimeIntervalUnits?y(t.defaultTimeInterval,t.defaultTimeIntervalUnits):null}writeInterval(e,t){t.timeInterval=e?.toJSON().value??null,t.timeIntervalUnits=e?.toJSON().unit??null}};(0,r._)([(0,u.Cb)({type:Boolean,json:{name:"exportOptions.timeDataCumulative",write:!0}})],m.prototype,"cumulative",void 0),(0,r._)([(0,u.Cb)({type:String,json:{name:"endTimeField",write:{enabled:!0,allowNull:!0}}})],m.prototype,"endField",void 0),(0,r._)([(0,u.Cb)({type:n.Z,json:{write:{enabled:!0,allowNull:!0}}})],m.prototype,"fullTimeExtent",void 0),(0,r._)([(0,p.r)("fullTimeExtent",["timeExtent"])],m.prototype,"readFullTimeExtent",null),(0,r._)([(0,c.c)("fullTimeExtent")],m.prototype,"writeFullTimeExtent",null),(0,r._)([(0,u.Cb)({type:Boolean,json:{write:!0}})],m.prototype,"hasLiveData",void 0),(0,r._)([(0,u.Cb)({type:s.Z,json:{write:{enabled:!0,allowNull:!0}}})],m.prototype,"interval",void 0),(0,r._)([(0,p.r)("interval",["timeInterval","timeIntervalUnits","defaultTimeInterval","defaultTimeIntervalUnits"])],m.prototype,"readInterval",null),(0,r._)([(0,c.c)("interval")],m.prototype,"writeInterval",null),(0,r._)([(0,u.Cb)({type:String,json:{name:"startTimeField",write:{enabled:!0,allowNull:!0}}})],m.prototype,"startField",void 0),(0,r._)([(0,u.Cb)({type:f.Z,json:{write:{enabled:!0,allowNull:!0}}})],m.prototype,"timeReference",void 0),(0,r._)([(0,u.Cb)({type:String,json:{write:{enabled:!0,allowNull:!0}}})],m.prototype,"trackIdField",void 0),(0,r._)([(0,u.Cb)({type:Boolean,json:{name:"exportOptions.useTime",write:!0}})],m.prototype,"useTime",void 0),m=(0,r._)([(0,d.j)("esri.layers.support.TimeInfo")],m);const h=m},53518:(e,t,i)=>{i.d(t,{v:()=>o});var r=i(92604),n=i(1231),s=i(99514),l=i(35671);function o(){return{fields:{type:[n.Z],value:null},fieldsIndex:{readOnly:!0,get(){return new s.Z(this.fields||[])}},outFields:{type:[String],json:{read:!1},set:function(e){this._userOutFields=e,this.notifyChange("outFields")},get:function(){const e=this._userOutFields;if(!e||!e.length)return null;if(e.includes("*"))return["*"];if(!this.fields)return e;for(const t of e){const i=this.fieldsIndex?.has(t);i||r.Z.getLogger("esri.layers.support.fieldProperties").error("field-attributes-layer:invalid-field",`Invalid field ${t} found in outFields`,{layer:this,outFields:e})}return(0,l.Q0)(this.fieldsIndex,e)}}}}},78981:(e,t,i)=>{i.d(t,{v:()=>r});const r=(0,i(35454).w)()({esriTimeUnitsMilliseconds:"milliseconds",esriTimeUnitsSeconds:"seconds",esriTimeUnitsMinutes:"minutes",esriTimeUnitsHours:"hours",esriTimeUnitsDays:"days",esriTimeUnitsWeeks:"weeks",esriTimeUnitsMonths:"months",esriTimeUnitsYears:"years",esriTimeUnitsDecades:"decades",esriTimeUnitsCenturies:"centuries",esriTimeUnitsUnknown:void 0})}}]);
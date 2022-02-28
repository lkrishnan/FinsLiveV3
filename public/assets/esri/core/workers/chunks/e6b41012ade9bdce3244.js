"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[1765],{92835:(e,t,n)=>{n.d(t,{Z:()=>p});var r,s=n(43697),i=n(10736),a=n(70586),o=n(35463),u=n(5600),l=(n(67676),n(80442),n(75215),n(71715)),c=n(52011),h=n(30556);let d=r=class extends i.wq{constructor(e){super(e),this.end=null,this.start=null}static get allTime(){return f}static get empty(){return m}readEnd(e,t){return null!=t.end?new Date(t.end):null}writeEnd(e,t){t.end=e?e.getTime():null}get isAllTime(){return this.equals(r.allTime)}get isEmpty(){return this.equals(r.empty)}readStart(e,t){return null!=t.start?new Date(t.start):null}writeStart(e,t){t.start=e?e.getTime():null}clone(){return new r({end:this.end,start:this.start})}equals(e){if(!e)return!1;const t=(0,a.pC)(this.start)?this.start.getTime():this.start,n=(0,a.pC)(this.end)?this.end.getTime():this.end,r=(0,a.pC)(e.start)?e.start.getTime():e.start,s=(0,a.pC)(e.end)?e.end.getTime():e.end;return t===r&&n===s}expandTo(e){if(this.isEmpty||this.isAllTime)return this.clone();const t=(0,a.Po)(this.start,(t=>(0,o.JE)(t,e))),n=(0,a.Po)(this.end,(t=>(0,o.Nm)((0,o.JE)(t,e),1,e)));return new r({start:t,end:n})}intersection(e){if(!e)return this.clone();if(this.isEmpty||e.isEmpty)return r.empty;if(this.isAllTime)return e.clone();if(e.isAllTime)return this.clone();const t=(0,a.R2)(this.start,-1/0,(e=>e.getTime())),n=(0,a.R2)(this.end,1/0,(e=>e.getTime())),s=(0,a.R2)(e.start,-1/0,(e=>e.getTime())),i=(0,a.R2)(e.end,1/0,(e=>e.getTime()));let o,u;if(s>=t&&s<=n?o=s:t>=s&&t<=i&&(o=t),n>=s&&n<=i?u=n:i>=t&&i<=n&&(u=i),!isNaN(o)&&!isNaN(u)){const e=new r;return e.start=o===-1/0?null:new Date(o),e.end=u===1/0?null:new Date(u),e}return r.empty}offset(e,t){if(this.isEmpty||this.isAllTime)return this.clone();const n=new r,{start:s,end:i}=this;return(0,a.pC)(s)&&(n.start=(0,o.Nm)(s,e,t)),(0,a.pC)(i)&&(n.end=(0,o.Nm)(i,e,t)),n}union(e){if(!e||e.isEmpty)return this.clone();if(this.isEmpty)return e.clone();if(this.isAllTime||e.isAllTime)return f.clone();const t=(0,a.pC)(this.start)&&(0,a.pC)(e.start)?new Date(Math.min(this.start.getTime(),e.start.getTime())):null,n=(0,a.pC)(this.end)&&(0,a.pC)(e.end)?new Date(Math.max(this.end.getTime(),e.end.getTime())):null;return new r({start:t,end:n})}};(0,s._)([(0,u.Cb)({type:Date,json:{write:{allowNull:!0}}})],d.prototype,"end",void 0),(0,s._)([(0,l.r)("end")],d.prototype,"readEnd",null),(0,s._)([(0,h.c)("end")],d.prototype,"writeEnd",null),(0,s._)([(0,u.Cb)({readOnly:!0,json:{read:!1}})],d.prototype,"isAllTime",null),(0,s._)([(0,u.Cb)({readOnly:!0,json:{read:!1}})],d.prototype,"isEmpty",null),(0,s._)([(0,u.Cb)({type:Date,json:{write:{allowNull:!0}}})],d.prototype,"start",void 0),(0,s._)([(0,l.r)("start")],d.prototype,"readStart",null),(0,s._)([(0,h.c)("start")],d.prototype,"writeStart",null),d=r=(0,s._)([(0,c.j)("esri.TimeExtent")],d);const f=new d,m=new d({start:void 0,end:void 0}),p=d},99880:(e,t,n)=>{n.d(t,{V:()=>u});var r=n(68773),s=(n(3172),n(20102)),i=n(92604),a=n(17452);const o=i.Z.getLogger("esri.assets");function u(e){if(!r.Z.assetsPath)throw o.errorOnce("The API assets location needs to be set using config.assetsPath. More information: https://arcg.is/1OzLe50"),new s.Z("assets:path-not-set","config.assetsPath is not set");return(0,a.v_)(r.Z.assetsPath,e)}},46851:(e,t,n)=>{n.d(t,{E:()=>r,R:()=>s});const r=1e-6,s=Math.random,i=Math.PI/180,a=180/Math.PI;Object.freeze({__proto__:null,EPSILON:r,RANDOM:s,toRadian:function(e){return e*i},toDegree:function(e){return e*a},equals:function(e,t){return Math.abs(e-t)<=r*Math.max(1,Math.abs(e),Math.abs(t))}})},25929:(e,t,n)=>{n.d(t,{f:()=>i,i:()=>h,p:()=>f,r:()=>o,t:()=>a,w:()=>u});var r=n(70586),s=n(17452);function i(e,t){const n=t&&t.url&&t.url.path;if(e&&n&&(e=(0,s.hF)(e,n,{preserveProtocolRelative:!0}),t.portalItem&&t.readResourcePaths)){const n=(0,s.PF)(e,t.portalItem.itemUrl);c.test(n)&&t.readResourcePaths.push(t.portalItem.resourceFromPath(n).path)}return d(e,t&&t.portal)}function a(e,t,n=0){if(!e)return e;!(0,s.YP)(e)&&t&&t.blockedRelativeUrls&&t.blockedRelativeUrls.push(e);let r=(0,s.hF)(e);if(t){const n=t.verifyItemRelativeUrls&&t.verifyItemRelativeUrls.rootPath||t.url&&t.url.path;if(n){const i=d(n,t.portal);r=(0,s.PF)(d(r,t.portal),i,i),r!==e&&t.verifyItemRelativeUrls&&t.verifyItemRelativeUrls.writtenUrls.push(r)}}return r=function(e,t){return t&&!t.isPortal&&t.urlKey&&t.customBaseUrl?(0,s.Ie)(e,`${t.urlKey}.${t.customBaseUrl}`,t.portalHostname):e}(r,t&&t.portal),(0,s.YP)(r)&&(r=(0,s.Fv)(r)),null!=t&&t.resources&&null!=t&&t.portalItem&&!(0,s.YP)(r)&&!(0,s.HK)(r)&&0===n&&t.resources.toKeep.push({resource:t.portalItem.resourceFromPath(r)}),r}function o(e,t,n){return i(e,n)}function u(e,t,n,r){const s=a(e,r);void 0!==s&&(t[n]=s)}const l=/\/items\/([^\/]+)\/resources\//,c=/^\.\/resources\//;function h(e){const t=(0,r.pC)(e)?e.match(l):null;return(0,r.pC)(t)?t[1]:null}function d(e,t){if(!t||t.isPortal||!t.urlKey||!t.customBaseUrl)return e;const n=`${t.urlKey}.${t.customBaseUrl}`;return(0,s.D6)(s.Gd,`${s.Gd.scheme}://${n}`)?(0,s.Ie)(e,t.portalHostname,n):(0,s.Ie)(e,n,t.portalHostname)}const f=Object.freeze({__proto__:null,fromJSON:i,toJSON:a,read:o,write:u,itemIdFromResourceUrl:h})},17896:(e,t,n)=>{n.d(t,{E:()=>h,a:()=>d,b:()=>u,c:()=>y,d:()=>M,e:()=>v,f:()=>l,g:()=>a,h:()=>m,i:()=>f,k:()=>I,l:()=>i,m:()=>w,n:()=>g,p:()=>p,q:()=>b,r:()=>S,s:()=>o,t:()=>_,u:()=>E});var r=n(65617),s=n(46851);function i(e){const t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)}function a(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function o(e,t,n,r){return e[0]=t,e[1]=n,e[2]=r,e}function u(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e}function l(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e}function c(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e}function h(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e}function d(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function f(e,t){const n=t[0]-e[0],r=t[1]-e[1],s=t[2]-e[2];return Math.sqrt(n*n+r*r+s*s)}function m(e,t){const n=t[0]-e[0],r=t[1]-e[1],s=t[2]-e[2];return n*n+r*r+s*s}function p(e){const t=e[0],n=e[1],r=e[2];return t*t+n*n+r*r}function g(e,t){const n=t[0],r=t[1],s=t[2];let i=n*n+r*r+s*s;return i>0&&(i=1/Math.sqrt(i),e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i),e}function M(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function y(e,t,n){const r=t[0],s=t[1],i=t[2],a=n[0],o=n[1],u=n[2];return e[0]=s*u-i*o,e[1]=i*a-r*u,e[2]=r*o-s*a,e}function v(e,t,n,r){const s=t[0],i=t[1],a=t[2];return e[0]=s+r*(n[0]-s),e[1]=i+r*(n[1]-i),e[2]=a+r*(n[2]-a),e}function w(e,t,n){const r=t[0],s=t[1],i=t[2];return e[0]=n[0]*r+n[4]*s+n[8]*i+n[12],e[1]=n[1]*r+n[5]*s+n[9]*i+n[13],e[2]=n[2]*r+n[6]*s+n[10]*i+n[14],e}function _(e,t,n){const r=t[0],s=t[1],i=t[2];return e[0]=r*n[0]+s*n[3]+i*n[6],e[1]=r*n[1]+s*n[4]+i*n[7],e[2]=r*n[2]+s*n[5]+i*n[8],e}function b(e,t,n){const r=n[0],s=n[1],i=n[2],a=n[3],o=t[0],u=t[1],l=t[2];let c=s*l-i*u,h=i*o-r*l,d=r*u-s*o,f=s*d-i*h,m=i*c-r*d,p=r*h-s*c;const g=2*a;return c*=g,h*=g,d*=g,f*=2,m*=2,p*=2,e[0]=o+c+f,e[1]=u+h+m,e[2]=l+d+p,e}const U=(0,r.c)(),P=(0,r.c)();function I(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function S(e,t,n){const r=n[0]-t[0],s=n[1]-t[1],i=n[2]-t[2];let a=r*r+s*s+i*i;return a>0?(a=1/Math.sqrt(a),e[0]=r*a,e[1]=s*a,e[2]=i*a,e):(e[0]=0,e[1]=0,e[2]=0,e)}const x=l,T=c,q=h,C=f,O=m,E=i,A=p;Object.freeze({__proto__:null,length:i,copy:a,set:o,add:u,subtract:l,multiply:c,divide:h,ceil:function(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e},floor:function(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e},min:function(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e},max:function(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e},round:function(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e},scale:d,scaleAndAdd:function(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e},distance:f,squaredDistance:m,squaredLength:p,negate:function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e},inverse:function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e},normalize:g,dot:M,cross:y,lerp:v,hermite:function(e,t,n,r,s,i){const a=i*i,o=a*(2*i-3)+1,u=a*(i-2)+i,l=a*(i-1),c=a*(3-2*i);return e[0]=t[0]*o+n[0]*u+r[0]*l+s[0]*c,e[1]=t[1]*o+n[1]*u+r[1]*l+s[1]*c,e[2]=t[2]*o+n[2]*u+r[2]*l+s[2]*c,e},bezier:function(e,t,n,r,s,i){const a=1-i,o=a*a,u=i*i,l=o*a,c=3*i*o,h=3*u*a,d=u*i;return e[0]=t[0]*l+n[0]*c+r[0]*h+s[0]*d,e[1]=t[1]*l+n[1]*c+r[1]*h+s[1]*d,e[2]=t[2]*l+n[2]*c+r[2]*h+s[2]*d,e},random:function(e,t){t=t||1;const n=2*(0,s.R)()*Math.PI,r=2*(0,s.R)()-1,i=Math.sqrt(1-r*r)*t;return e[0]=Math.cos(n)*i,e[1]=Math.sin(n)*i,e[2]=r*t,e},transformMat4:w,transformMat3:_,transformQuat:b,rotateX:function(e,t,n,r){const s=[],i=[];return s[0]=t[0]-n[0],s[1]=t[1]-n[1],s[2]=t[2]-n[2],i[0]=s[0],i[1]=s[1]*Math.cos(r)-s[2]*Math.sin(r),i[2]=s[1]*Math.sin(r)+s[2]*Math.cos(r),e[0]=i[0]+n[0],e[1]=i[1]+n[1],e[2]=i[2]+n[2],e},rotateY:function(e,t,n,r){const s=[],i=[];return s[0]=t[0]-n[0],s[1]=t[1]-n[1],s[2]=t[2]-n[2],i[0]=s[2]*Math.sin(r)+s[0]*Math.cos(r),i[1]=s[1],i[2]=s[2]*Math.cos(r)-s[0]*Math.sin(r),e[0]=i[0]+n[0],e[1]=i[1]+n[1],e[2]=i[2]+n[2],e},rotateZ:function(e,t,n,r){const s=[],i=[];return s[0]=t[0]-n[0],s[1]=t[1]-n[1],s[2]=t[2]-n[2],i[0]=s[0]*Math.cos(r)-s[1]*Math.sin(r),i[1]=s[0]*Math.sin(r)+s[1]*Math.cos(r),i[2]=s[2],e[0]=i[0]+n[0],e[1]=i[1]+n[1],e[2]=i[2]+n[2],e},angle:function(e,t){a(U,e),a(P,t),g(U,U),g(P,P);const n=M(U,P);return n>1?0:n<-1?Math.PI:Math.acos(n)},str:function(e){return"vec3("+e[0]+", "+e[1]+", "+e[2]+")"},exactEquals:I,equals:function(e,t){if(e===t)return!0;const n=e[0],r=e[1],i=e[2],a=t[0],o=t[1],u=t[2];return Math.abs(n-a)<=s.E*Math.max(1,Math.abs(n),Math.abs(a))&&Math.abs(r-o)<=s.E*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(i-u)<=s.E*Math.max(1,Math.abs(i),Math.abs(u))},direction:S,sub:x,mul:T,div:q,dist:C,sqrDist:O,len:E,sqrLen:A})},65617:(e,t,n)=>{function r(){return[0,0,0]}function s(e){return[e[0],e[1],e[2]]}function i(e,t,n){return[e,t,n]}function a(e){const t=[0,0,0],n=Math.min(3,e.length);for(let r=0;r<n;++r)t[r]=e[r];return t}function o(e,t){return new Float64Array(e,t,3)}function u(){return i(1,1,1)}function l(){return i(1,0,0)}function c(){return i(0,1,0)}function h(){return i(0,0,1)}n.d(t,{O:()=>f,Z:()=>d,a:()=>s,b:()=>o,c:()=>r,d:()=>a,f:()=>i});const d=[0,0,0],f=u(),m=l(),p=c(),g=h();Object.freeze({__proto__:null,create:r,clone:s,fromValues:i,fromArray:a,createView:o,zeros:function(){return[0,0,0]},ones:u,unitX:l,unitY:c,unitZ:h,ZEROS:d,ONES:f,UNIT_X:m,UNIT_Y:p,UNIT_Z:g})},98766:(e,t,n)=>{n.d(t,{a:()=>a,b:()=>c,c:()=>s,d:()=>g,e:()=>f,f:()=>m,g:()=>y,h:()=>v,l:()=>M,n:()=>p,s:()=>i});var r=n(46851);function s(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e}function i(e,t,n,r,s){return e[0]=t,e[1]=n,e[2]=r,e[3]=s,e}function a(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e}function o(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e}function u(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e[3]=t[3]*n[3],e}function l(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e[3]=t[3]/n[3],e}function c(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e}function h(e,t){const n=t[0]-e[0],r=t[1]-e[1],s=t[2]-e[2],i=t[3]-e[3];return Math.sqrt(n*n+r*r+s*s+i*i)}function d(e,t){const n=t[0]-e[0],r=t[1]-e[1],s=t[2]-e[2],i=t[3]-e[3];return n*n+r*r+s*s+i*i}function f(e){const t=e[0],n=e[1],r=e[2],s=e[3];return Math.sqrt(t*t+n*n+r*r+s*s)}function m(e){const t=e[0],n=e[1],r=e[2],s=e[3];return t*t+n*n+r*r+s*s}function p(e,t){const n=t[0],r=t[1],s=t[2],i=t[3];let a=n*n+r*r+s*s+i*i;return a>0&&(a=1/Math.sqrt(a),e[0]=n*a,e[1]=r*a,e[2]=s*a,e[3]=i*a),e}function g(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]}function M(e,t,n,r){const s=t[0],i=t[1],a=t[2],o=t[3];return e[0]=s+r*(n[0]-s),e[1]=i+r*(n[1]-i),e[2]=a+r*(n[2]-a),e[3]=o+r*(n[3]-o),e}function y(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]}function v(e,t){const n=e[0],s=e[1],i=e[2],a=e[3],o=t[0],u=t[1],l=t[2],c=t[3];return Math.abs(n-o)<=r.E*Math.max(1,Math.abs(n),Math.abs(o))&&Math.abs(s-u)<=r.E*Math.max(1,Math.abs(s),Math.abs(u))&&Math.abs(i-l)<=r.E*Math.max(1,Math.abs(i),Math.abs(l))&&Math.abs(a-c)<=r.E*Math.max(1,Math.abs(a),Math.abs(c))}const w=o,_=u,b=l,U=h,P=d,I=f,S=m;Object.freeze({__proto__:null,copy:s,set:i,add:a,subtract:o,multiply:u,divide:l,ceil:function(e,t){return e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e[3]=Math.ceil(t[3]),e},floor:function(e,t){return e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e[3]=Math.floor(t[3]),e},min:function(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e[3]=Math.min(t[3],n[3]),e},max:function(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e[3]=Math.max(t[3],n[3]),e},round:function(e,t){return e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e[3]=Math.round(t[3]),e},scale:c,scaleAndAdd:function(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e},distance:h,squaredDistance:d,length:f,squaredLength:m,negate:function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e},inverse:function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e[3]=1/t[3],e},normalize:p,dot:g,lerp:M,random:function(e,t){let n,s,i,a,o,u;t=t||1;do{n=2*(0,r.R)()-1,s=2*(0,r.R)()-1,o=n*n+s*s}while(o>=1);do{i=2*(0,r.R)()-1,a=2*(0,r.R)()-1,u=i*i+a*a}while(u>=1);const l=Math.sqrt((1-o)/u);return e[0]=t*n,e[1]=t*s,e[2]=t*i*l,e[3]=t*a*l,e},transformMat4:function(e,t,n){const r=t[0],s=t[1],i=t[2],a=t[3];return e[0]=n[0]*r+n[4]*s+n[8]*i+n[12]*a,e[1]=n[1]*r+n[5]*s+n[9]*i+n[13]*a,e[2]=n[2]*r+n[6]*s+n[10]*i+n[14]*a,e[3]=n[3]*r+n[7]*s+n[11]*i+n[15]*a,e},transformQuat:function(e,t,n){const r=t[0],s=t[1],i=t[2],a=n[0],o=n[1],u=n[2],l=n[3],c=l*r+o*i-u*s,h=l*s+u*r-a*i,d=l*i+a*s-o*r,f=-a*r-o*s-u*i;return e[0]=c*l+f*-a+h*-u-d*-o,e[1]=h*l+f*-o+d*-a-c*-u,e[2]=d*l+f*-u+c*-o-h*-a,e[3]=t[3],e},str:function(e){return"vec4("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},exactEquals:y,equals:v,sub:w,mul:_,div:b,dist:U,sqrDist:P,len:I,sqrLen:S})},3920:(e,t,n)=>{n.d(t,{r:()=>c,p:()=>l});var r=n(43697),s=n(15923),i=n(61247),a=n(5600),o=n(52011),u=n(89749);const l=e=>{let t=class extends e{destroy(){var e,t;this.destroyed||(null==(e=this._get("handles"))||e.destroy(),null==(t=this._get("updatingHandles"))||t.destroy())}get handles(){return this._get("handles")||new i.Z}get updatingHandles(){return this._get("updatingHandles")||new u.t}};return(0,r._)([(0,a.Cb)({readOnly:!0})],t.prototype,"handles",null),(0,r._)([(0,a.Cb)({readOnly:!0})],t.prototype,"updatingHandles",null),t=(0,r._)([(0,o.j)("esri.core.HandleOwner")],t),t};let c=class extends(l(s.Z)){};c=(0,r._)([(0,o.j)("esri.core.HandleOwner")],c)},22021:(e,t,n)=>{n.d(t,{ZF:()=>d,Kt:()=>f,jE:()=>g,uZ:()=>a,oK:()=>m,Vl:()=>c,wt:()=>o,t7:()=>l,Sf:()=>i,fp:()=>u,BV:()=>h});var r=n(17896);n(98766);const s=new Float32Array(1);function i(e){--e;for(let t=1;t<32;t<<=1)e|=e>>t;return e+1}function a(e,t,n){return Math.min(Math.max(e,t),n)}function o(e){return 0==(e&e-1)}function u(e){return e--,e|=e>>1,e|=e>>2,e|=e>>4,e|=e>>8,e|=e>>16,++e}function l(e,t,n){return e+(t-e)*n}function c(e){return e*Math.PI/180}function h(e){return 180*e/Math.PI}function d(e){return Math.acos(a(e,-1,1))}function f(e){return Math.asin(a(e,-1,1))}function m(e){return p(Math.max(-M,Math.min(e,M)))}function p(e){return s[0]=e,s[0]}function g(e,t){const n=(0,r.l)(e),s=f(e[2]/n),i=Math.atan2(e[1]/n,e[0]/n);return(0,r.s)(t,n,s,i),t}const M=p(34028234663852886e22)},35463:(e,t,n)=>{n.d(t,{rJ:()=>o,Nm:()=>i,JE:()=>a}),n(80442);const r={milliseconds:1,seconds:1e3,minutes:6e4,hours:36e5,days:864e5,weeks:6048e5,months:26784e5,years:31536e6,decades:31536e7,centuries:31536e8},s={milliseconds:{getter:"getMilliseconds",setter:"setMilliseconds",multiplier:1},seconds:{getter:"getSeconds",setter:"setSeconds",multiplier:1},minutes:{getter:"getMinutes",setter:"setMinutes",multiplier:1},hours:{getter:"getHours",setter:"setHours",multiplier:1},days:{getter:"getDate",setter:"setDate",multiplier:1},weeks:{getter:"getDate",setter:"setDate",multiplier:7},months:{getter:"getMonth",setter:"setMonth",multiplier:1},years:{getter:"getFullYear",setter:"setFullYear",multiplier:1},decades:{getter:"getFullYear",setter:"setFullYear",multiplier:10},centuries:{getter:"getFullYear",setter:"setFullYear",multiplier:100}};function i(e,t,n){const r=new Date(e.getTime());if(t&&n){const e=s[n],{getter:i,setter:a,multiplier:o}=e;r[a](r[i]()+t*o)}return r}function a(e,t){switch(t){case"milliseconds":return new Date(e.getTime());case"seconds":return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds());case"minutes":return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes());case"hours":return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours());case"days":return new Date(e.getFullYear(),e.getMonth(),e.getDate());case"weeks":return new Date(e.getFullYear(),e.getMonth(),e.getDate()-e.getDay());case"months":return new Date(e.getFullYear(),e.getMonth(),1);case"years":return new Date(e.getFullYear(),0,1);case"decades":return new Date(e.getFullYear()-e.getFullYear()%10,0,1);case"centuries":return new Date(e.getFullYear()-e.getFullYear()%100,0,1);default:return new Date}}function o(e,t,n){return 0===e?0:e*r[t]/r[n]}},67900:(e,t,n)=>{n.d(t,{gV:()=>B,En:()=>U,Z7:()=>q,c9:()=>T,_R:()=>S,qE:()=>E,cM:()=>x,hd:()=>c,ty:()=>P,Jo:()=>Y,$C:()=>I}),n(80442);var r=n(35454),s=n(70586),i=n(24678),a=n(82971),o=n(68441),u=n(8744),l=n(58116);const c=39.37,h=o.sv.radius*Math.PI/200,d=/UNIT\[([^\]]+)\]\]$/i,f=l.Z,m=/UNIT\[([^\]]+)\]/i,p=new Set([4261,4305,4807,4810,4811,4812,4816,4819,4821,4901,4902,37225,104139,104140]),g=(0,r.wY)()({meter:"meters",foot:"feet",foot_us:"us-feet",foot_clarke:"clarke-feet",yard_clarke:"clarke-yards",link_clarke:"clarke-links",yard_sears:"sears-yards",foot_sears:"sears-feet",chain_sears:"sears-chains",chain_benoit_1895_b:"benoit-1895-b-chains",yard_indian:"indian-yards",yard_indian_1937:"indian-1937-yards",foot_gold_coast:"gold-coast-feet",chain_sears_1922_truncated:"sears-1922-truncated-chains","50_kilometers":"50-kilometers","150_kilometers":"150-kilometers"}),M=e=>e*e,y=e=>e*e*e,v={length:{baseUnit:"meters",units:{millimeters:{inBaseUnits:.001},centimeters:{inBaseUnits:.01},decimeters:{inBaseUnits:.1},meters:{inBaseUnits:1},kilometers:{inBaseUnits:1e3},inches:{inBaseUnits:.0254},feet:{inBaseUnits:.3048},yards:{inBaseUnits:.9144},miles:{inBaseUnits:1609.344},"nautical-miles":{inBaseUnits:1852},"us-feet":{inBaseUnits:1200/3937}}},area:{baseUnit:"square-meters",units:{"square-millimeters":{inBaseUnits:M(.001)},"square-centimeters":{inBaseUnits:M(.01)},"square-decimeters":{inBaseUnits:M(.1)},"square-meters":{inBaseUnits:1},"square-kilometers":{inBaseUnits:M(1e3)},"square-inches":{inBaseUnits:M(.0254)},"square-feet":{inBaseUnits:M(.3048)},"square-yards":{inBaseUnits:M(.9144)},"square-miles":{inBaseUnits:M(1609.344)},"square-us-feet":{inBaseUnits:M(1200/3937)},acres:{inBaseUnits:.0015625*M(1609.344)},ares:{inBaseUnits:100},hectares:{inBaseUnits:1e4}}},volume:{baseUnit:"liters",units:{liters:{inBaseUnits:1},"cubic-millimeters":{inBaseUnits:1e3*y(.001)},"cubic-centimeters":{inBaseUnits:1e3*y(.01)},"cubic-decimeters":{inBaseUnits:1e3*y(.1)},"cubic-meters":{inBaseUnits:1e3},"cubic-kilometers":{inBaseUnits:1e3*y(1e3)},"cubic-inches":{inBaseUnits:1e3*y(.0254)},"cubic-feet":{inBaseUnits:1e3*y(.3048)},"cubic-yards":{inBaseUnits:1e3*y(.9144)},"cubic-miles":{inBaseUnits:1e3*y(1609.344)}}},angle:{baseUnit:"radians",units:{radians:{inBaseUnits:1},degrees:{inBaseUnits:Math.PI/180}}}},w=function(){const e={};for(const t in v)for(const n in v[t].units)e[n]=t;return e}();function _(e){const t=w[e];if(t)return t;throw new Error("unknown measure")}function b(e,t=null){return t=t||_(e),v[t].baseUnit===e}function U(e,t,n){if(t===n)return e;const r=_(t);if(r!==_(n))throw new Error("incompatible units");const s=b(t,r)?e:function(e,t,n){return e*v[n].units[t].inBaseUnits}(e,t,r);return b(n,r)?s:function(e,t,n){return e/v[n].units[t].inBaseUnits}(s,n,r)}function P(e,t,n){return U(e,t,"meters")/(n*Math.PI/180)}function I(e){return g.fromJSON(e.toLowerCase())||null}function S(e){if(e&&"object"==typeof e&&!(0,u.N$)(e))return 1;const t=T(e);return t>1e5?1:t}function x(e){return T(e)>=(e instanceof a.Z?(0,i.Iu)(e).metersPerDegree:1e5)?"meters":E(e)}function T(e,t=o.sv.metersPerDegree){return q(e,!0)||t}function q(e,t=!1){let n,r,s=null;if(null!=e&&("object"==typeof e?(n=e.wkid,r=e.wkt):"number"==typeof e?n=e:"string"==typeof e&&(r=e)),n){if((0,u.o$)(n))return o.yr.metersPerDegree;if((0,u.ME)(n))return o.Z1.metersPerDegree;s=f.values[f[n]],!s&&t&&p.has(n)&&(s=h)}else r&&(D(r)?s=C(d.exec(r),s):A(r)&&(s=C(m.exec(r),s)));return s}function C(e,t){return e&&e[1]?O(e[1]):t}function O(e){return parseFloat(e.split(",")[1])}function E(e){let t,n,r=null;if(null!=e&&("object"==typeof e?(t=e.wkid,n=e.wkt):"number"==typeof e?t=e:"string"==typeof e&&(n=e)),t)r=f.units[f[t]];else if(n){const e=D(n)?d:A(n)?m:null;if(e){const t=e.exec(n);t&&t[1]&&(r=function(e){const t=/[\\"\\']{1}([^\\"\\']+)/.exec(e);let n=t&&t[1];if(!n||-1===f.units.indexOf(n)){const t=O(e);n=null;const r=f.values;for(let e=0;e<r.length;++e)if(Math.abs(t-r[e])<1e-7){n=f.units[e];break}}return n}(t[1]))}}return(0,s.pC)(r)?I(r):null}function A(e){return/^GEOCCS/i.test(e)}function D(e){return/^PROJCS/i.test(e)}const R={esriAcres:"acres",esriAres:"ares",esriHectares:"hectares",esriSquareCentimeters:"square-centimeters",esriSquareDecimeters:"square-decimeters",esriSquareFeet:"square-feet",esriSquareInches:"square-inches",esriSquareKilometers:"square-kilometers",esriSquareMeters:"square-meters",esriSquareMiles:"square-miles",esriSquareMillimeters:"square-millimeters",esriSquareUsFeet:"square-us-feet",esriSquareYards:"square-yards"},k={esriCentimeters:"centimeters",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriYards:"yards"},B=(0,r.wY)()(R),Y=(0,r.wY)()(k);(0,r.wY)()({...R,...k})},43050:(e,t,n)=>{n.d(t,{S1:()=>a,on:()=>h,OY:()=>c,cm:()=>u,N1:()=>o,LR:()=>l,tH:()=>d});var r=n(91460),s=(n(22974),n(95330));const i=/\?(\.|$)/g;function a(e,t,n,r){const s=Array.isArray(t)?t:t.indexOf(",")>-1?t.split(","):[t],a=function(e,t,n,r){return e.watch(t,n,r)}(e,t,n,r);for(const t of s){const r=t.trim().replace(i,"$1"),s=e.get(r);n.call(e,s,s,r,e)}return a}function o(e,t,n,r){return d(e,t,f,n,r)}function u(e,t,n,r){return d(e,t,m,n,r)}function l(e,t,n,r){return d(e,t,p,n,r)}function c(e,t,n,r){return d(e,t,g,n,r)}function h(e,t,n,s,i,o,u){const l={};function c(t){const r=l[t];r&&(o&&o(r.target,t,e,n),r.handle.remove(),delete l[t])}const h=a(e,t,((t,a,o)=>{c(o),(0,r.vT)(t)&&(l[o]={handle:(0,r.on)(t,n,s),target:t},i&&i(t,o,e,n))}),u);return{remove(){h.remove();for(const e in l)c(e)}}}function d(e,t,n,r,i){const a="function"==typeof r?r:null,o="object"==typeof r?r:null;"boolean"==typeof r&&(i=r);let u,l=!1;function c(){u&&(u.remove(),u=null)}const h=(0,s.dD)();(0,s.fu)(o,(()=>{c(),h.reject((0,s.zE)())}));const d={then:h.promise.then.bind(h.promise),catch:h.promise.catch.bind(h.promise),remove:c};return Object.freeze(d),u=function(e,t,n,r,s){const i=e.watch(t,((t,s,i,a)=>{n&&!n(t)||null==r||r.call(e,t,s,i,a)}),s);if(Array.isArray(t))for(const s of t){const i=e.get(s);n&&n(i)&&(null==r||r.call(e,i,i,t,e))}else{const s=e.get(t);n&&n(s)&&(null==r||r.call(e,s,s,t,e))}return i}(e,t,n,((t,n,r,s)=>{l=!0,c(),a&&a.call(e,t,n,r,s),h.resolve({value:t,oldValue:n,propertyName:r,target:s})}),i),l&&c(),d}function f(e){return!!e}function m(e){return!e}function p(e){return!0===e}function g(e){return!1===e}},80903:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(50758),s=n(92604),i=n(95330),a=n(25045);const o=s.Z.getLogger("esri.core.workers.Connection");class u{constructor(){this._clients=new Array,this._clientPromises=new Array,this._clientIdx=0}destroy(){this.close()}get closed(){return!this._clients||!this._clients.length}open(e,t){return new Promise(((n,r)=>{let s=!0;const o=e=>{(0,i.k_)(t.signal),s&&(s=!1,e())};this._clients.length=e.length,this._clientPromises.length=e.length;for(let s=0;s<e.length;++s){const u=e[s];(0,i.y8)(u)?this._clientPromises[s]=u.then((e=>(this._clients[s]=new a.default(e,t),o(n),this._clients[s])),(()=>(o(r),null))):(this._clients[s]=new a.default(u,t),this._clientPromises[s]=Promise.resolve(this._clients[s]),o(n))}}))}broadcast(e,t,n){const r=new Array(this._clientPromises.length);for(let s=0;s<this._clientPromises.length;++s){const i=this._clientPromises[s];r[s]=i.then((r=>r.invoke(e,t,n)))}return r}close(){for(const e of this._clientPromises)e.then((e=>e.close()));this._clients.length=0,this._clientPromises.length=0}getAvailableClient(){let e;for(let t=0;t<this._clients.length;++t){const n=this._clients[t];if(n){if(!n.isBusy())return Promise.resolve(n)}else e=e||[],e.push(this._clientPromises[t])}return e?Promise.race(e):(this._clientIdx=(this._clientIdx+1)%this._clients.length,Promise.resolve(this._clients[this._clientIdx]))}invoke(e,t,n){let r=null;return Array.isArray(n)?(o.warn("invoke()","The transferList parameter is deprecated, use the options object instead"),r={transferList:n}):r=n,this.closed?Promise.reject(new Error("Connection closed")):this.getAvailableClient().then((n=>n.invoke(e,t,r)))}on(e,t){return Promise.all(this._clientPromises).then((()=>(0,r.AL)(this._clients.map((n=>n.on(e,t))))))}openPorts(){return new Promise((e=>{const t=new Array(this._clientPromises.length);let n=t.length;for(let r=0;r<this._clientPromises.length;++r)this._clientPromises[r].then((s=>{t[r]=s.openPort(),0==--n&&e(t)}))}))}get test(){return{numClients:this._clients.length}}}},24678:(e,t,n)=>{n.d(t,{GG:()=>o,HQ:()=>u,VY:()=>l,wY:()=>c,Iu:()=>f,e8:()=>m,rS:()=>d,N_:()=>h});var r=n(82971),s=n(68441),i=n(8744);function a(e){return new r.Z({wkt:`GEOCCS["Spherical geocentric",\n    DATUM["Not specified",\n      SPHEROID["Sphere",${e.radius},0]],\n    PRIMEM["Greenwich",0.0,\n      AUTHORITY["EPSG","8901"]],\n    UNIT["m",1.0],\n    AXIS["Geocentric X",OTHER],\n    AXIS["Geocentric Y",EAST],\n    AXIS["Geocentric Z",NORTH]\n  ]`})}const o=a(s.sv),u=a(s.yr),l=a(s.Z1),c=new r.Z({wkt:`GEOCCS["WGS 84",\n  DATUM["WGS_1984",\n    SPHEROID["WGS 84",${s.sv.radius},298.257223563,\n      AUTHORITY["EPSG","7030"]],\n    AUTHORITY["EPSG","6326"]],\n  PRIMEM["Greenwich",0,\n    AUTHORITY["EPSG","8901"]],\n  UNIT["m",1.0,\n    AUTHORITY["EPSG","9001"]],\n  AXIS["Geocentric X",OTHER],\n  AXIS["Geocentric Y",OTHER],\n  AXIS["Geocentric Z",NORTH],\n  AUTHORITY["EPSG","4978"]\n]`});function h(e){return e&&e===s.yr?u:e&&e===s.Z1?l:o}function d(e){return e&&((0,i.BZ)(e)||e===u)?u:e&&((0,i.V2)(e)||e===l)?l:o}function f(e){return e&&((0,i.BZ)(e)||e===u)?s.yr:e&&((0,i.V2)(e)||e===l)?s.Z1:s.sv}function m(e){return(0,i.o$)(e)?s.yr:(0,i.ME)(e)?s.Z1:s.sv}},24470:(e,t,n)=>{n.d(t,{Gv:()=>d,SO:()=>l,r3:()=>h,Ue:()=>i,oJ:()=>o,al:()=>a,kK:()=>c,HH:()=>u}),n(80442),n(22021);var r=n(70586),s=n(6570);function i(e=f){return[e[0],e[1],e[2],e[3]]}function a(e,t,n,r,s=i()){return s[0]=e,s[1]=t,s[2]=n,s[3]=r,s}function o(e,t=i()){return t[0]=e.xmin,t[1]=e.ymin,t[2]=e.xmax,t[3]=e.ymax,t}function u(e,t){return new s.Z({xmin:e[0],ymin:e[1],xmax:e[2],ymax:e[3],spatialReference:t})}function l(e){return function(e){return(0,r.Wi)(e)||e[0]>=e[2]?0:e[2]-e[0]}(e)*function(e){return e[1]>=e[3]?0:e[3]-e[1]}(e)}function c(e,t){return Math.max(t[0],e[0])<=Math.min(t[2],e[2])&&Math.max(t[1],e[1])<=Math.min(t[3],e[3])}function h(e,t){return t[0]>=e[0]&&t[2]<=e[2]&&t[1]>=e[1]&&t[3]<=e[3]}const d=[1/0,1/0,-1/0,-1/0],f=[0,0,0,0]},66677:(e,t,n)=>{n.d(t,{ld:()=>m,B5:()=>h,M8:()=>g,G:()=>w,Qc:()=>d,DR:()=>f,Nm:()=>M,XG:()=>y,a7:()=>p,wH:()=>v});var r=n(70586),s=n(17452),i=n(25929);const a={mapserver:"MapServer",imageserver:"ImageServer",featureserver:"FeatureServer",sceneserver:"SceneServer",streamserver:"StreamServer",vectortileserver:"VectorTileServer"},o=Object.values(a),u=new RegExp(`^((?:https?:)?\\/\\/\\S+?\\/rest\\/services\\/(.+?)\\/(${o.join("|")}))(?:\\/(?:layers\\/)?(\\d+))?`,"i"),l=new RegExp(`^((?:https?:)?\\/\\/\\S+?\\/([^\\/\\n]+)\\/(${o.join("|")}))(?:\\/(?:layers\\/)?(\\d+))?`,"i"),c=/(.*?)\/(?:layers\/)?(\d+)\/?$/i;function h(e){return!!u.test(e)}function d(e){const t=(0,s.mN)(e),n=t.path.match(u)||t.path.match(l);if(!n)return null;const[,r,i,o,c]=n,h=i.indexOf("/");return{title:m(-1!==h?i.slice(h+1):i),serverType:a[o.toLowerCase()],sublayer:null!=c&&""!==c?parseInt(c,10):null,url:{path:r}}}function f(e){const t=(0,s.mN)(e).path.match(c);return t?{serviceUrl:t[1],sublayerId:Number(t[2])}:null}function m(e){return(e=e.replace(/\s*[/_]+\s*/g," "))[0].toUpperCase()+e.slice(1)}function p(e,t){const n=[];if(e){const t=d(e);(0,r.pC)(t)&&t.title&&n.push(t.title)}if(t){const e=m(t);n.push(e)}if(2===n.length){if(-1!==n[0].toLowerCase().indexOf(n[1].toLowerCase()))return n[0];if(-1!==n[1].toLowerCase().indexOf(n[0].toLowerCase()))return n[1]}return n.join(" - ")}function g(e){if(!e)return!1;const t=-1!==(e=e.toLowerCase()).indexOf(".arcgis.com/"),n=-1!==e.indexOf("//services")||-1!==e.indexOf("//tiles")||-1!==e.indexOf("//features");return t&&n}function M(e,t){return e?(0,s.Qj)((0,s.Hu)(e,t)):e}function y(e){let{url:t}=e;if(!t)return{url:t};t=(0,s.Hu)(t,e.logger);const n=(0,s.mN)(t),i=d(n.path);let a;if((0,r.pC)(i))null!=i.sublayer&&null==e.layer.layerId&&(a=i.sublayer),t=i.url.path;else if(e.nonStandardUrlAllowed){const e=f(n.path);(0,r.pC)(e)&&(t=e.serviceUrl,a=e.sublayerId)}return{url:(0,s.Qj)(t),layerId:a}}function v(e,t,n,r,a){(0,i.w)(t,r,"url",a),r.url&&null!=e.layerId&&(r.url=(0,s.v_)(r.url,n,e.layerId.toString()))}function w(e){if(!e)return!1;const t=e.toLowerCase(),n=-1!==t.indexOf("/services/"),r=-1!==t.indexOf("/mapserver/wmsserver"),s=-1!==t.indexOf("/imageserver/wmsserver"),i=-1!==t.indexOf("/wmsserver");return n&&(r||s||i)}},89749:(e,t,n)=>{n.d(t,{t:()=>f});var r=n(43697),s=n(15923),i=n(61247),a=n(70586),o=n(17445),u=n(1654),l=n(43050),c=n(67723),h=n(5600),d=n(52011);let f=class extends s.Z{constructor(){super(...arguments),this.updating=!1,this.handleId=0,this.handles=new i.Z,this.scheduleHandleId=0,this.pendingPromises=new Set}destroy(){this.removeAll(),this.handles.destroy()}add(e,t,n,r=0){const s=0!=(1&r),i=++this.handleId;s||this.installSyncUpdatingWatch(e,t,i);const a=0!=(2&r)?(0,l.S1)(e,t,n,s):e.watch(t,n,s);return this.handles.add(a,i),{remove:()=>this.handles.remove(i)}}addOnCollectionPropertyChange(e,t,n,r=0){const s=0!=(2&r),i=++this.handleId;return this.handles.add([(0,l.on)(e,t,"after-changes",this.createSyncUpdatingCallback()),(0,l.on)(e,t,"change",n,s?e=>{n({added:e.items,removed:[],moved:[],target:e})}:void 0)],i),{remove:()=>{this.handles.remove(i)}}}addOnCollectionChange(e,t,n=0){const r=0!=(2&n),s=++this.handleId;return this.handles.add([e.on("after-changes",this.createSyncUpdatingCallback()),e.on("change",t)],s),r&&t({added:e.items,removed:[],moved:[],target:e}),{remove:()=>{this.handles.remove(s)}}}addPromise(e){if((0,a.Wi)(e))return e;const t=++this.handleId;this.handles.add({remove:()=>{this.pendingPromises.delete(e)&&(0!==this.pendingPromises.size||this.handles.has(m)||this._set("updating",!1))}},t),this.pendingPromises.add(e),this._set("updating",!0);const n=()=>this.handles.remove(t);return e.then(n,n),e}removeAll(){this.pendingPromises.clear(),this.handles.removeAll(),this._set("updating",!1)}installSyncUpdatingWatch(e,t,n){const r=this.createSyncUpdatingCallback(),s=(0,o.Ym)((()=>(0,c.$z)(e,t)),r,{sync:!0,equals:()=>!1});return this.handles.add(s,n),s}createSyncUpdatingCallback(){return()=>{this.handles.remove(m),++this.scheduleHandleId;const e=this.scheduleHandleId;this._get("updating")||this._set("updating",!0),this.handles.add((0,u.Os)((()=>{e===this.scheduleHandleId&&(this._set("updating",this.pendingPromises.size>0),this.handles.remove(m))})),m)}}};(0,r._)([(0,h.Cb)({readOnly:!0})],f.prototype,"updating",void 0),f=(0,r._)([(0,d.j)("esri.views.support.WatchUpdatingTracking")],f);const m=-42}}]);
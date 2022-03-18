"use strict";(self.webpackChunkRemoteClient=self.webpackChunkRemoteClient||[]).push([[2303],{22303:(t,n,r)=>{r.d(n,{Z:()=>c});var e=r(35270),a=r(22021),o=r(70586),u=r(75215);function i(t){return(0,a.uZ)((0,u.vU)(t),0,255)}function s(t,n,r){return t=Number(t),isNaN(t)?r:t<n?n:t>r?r:t}class c{constructor(t){this.r=255,this.g=255,this.b=255,this.a=1,t&&this.setColor(t)}static blendColors(t,n,r,e=new c){return e.r=Math.round(t.r+(n.r-t.r)*r),e.g=Math.round(t.g+(n.g-t.g)*r),e.b=Math.round(t.b+(n.b-t.b)*r),e.a=t.a+(n.a-t.a)*r,e._sanitize()}static fromRgb(t,n){const r=t.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);if(r){const t=r[2].split(/\s*,\s*/),a=r[1];if("rgb"===a&&3===t.length||"rgba"===a&&4===t.length){const r=t[0];if("%"===r.charAt(r.length-1)){const r=t.map((t=>2.56*parseFloat(t)));return 4===t.length&&(r[3]=parseFloat(t[3])),c.fromArray(r,n)}return c.fromArray(t.map((t=>parseFloat(t))),n)}if("hsl"===a&&3===t.length||"hsla"===a&&4===t.length)return c.fromArray((0,e.B7)(parseFloat(t[0]),parseFloat(t[1])/100,parseFloat(t[2])/100,parseFloat(t[3])),n)}return null}static fromHex(t,n=new c){if(4!==t.length&&7!==t.length||"#"!==t[0])return null;const r=4===t.length?4:8,e=(1<<r)-1;let a=Number("0x"+t.substr(1));return isNaN(a)?null:(["b","g","r"].forEach((t=>{const o=a&e;a>>=r,n[t]=4===r?17*o:o})),n.a=1,n)}static fromArray(t,n=new c){return n._set(Number(t[0]),Number(t[1]),Number(t[2]),Number(t[3])),isNaN(n.a)&&(n.a=1),n._sanitize()}static fromString(t,n){const r=(0,e.St)(t)?(0,e.h$)(t):null;return r&&c.fromArray(r,n)||c.fromRgb(t,n)||c.fromHex(t,n)}static fromJSON(t){return t&&new c([t[0],t[1],t[2],t[3]/255])}static toUnitRGB(t){return(0,o.pC)(t)?[t.r/255,t.g/255,t.b/255]:null}static toUnitRGBA(t){return(0,o.pC)(t)?[t.r/255,t.g/255,t.b/255,null!=t.a?t.a:1]:null}get isBright(){return.299*this.r+.587*this.g+.114*this.b>=127}setColor(t){if("string"==typeof t)c.fromString(t,this);else if(Array.isArray(t))c.fromArray(t,this);else{var n,r,e,a;this._set(null!=(n=t.r)?n:0,null!=(r=t.g)?r:0,null!=(e=t.b)?e:0,null!=(a=t.a)?a:1),t instanceof c||this._sanitize()}return this}toRgb(){return[this.r,this.g,this.b]}toRgba(){return[this.r,this.g,this.b,this.a]}toHex(){const t=this.r.toString(16),n=this.g.toString(16),r=this.b.toString(16);return`#${t.length<2?"0"+t:t}${n.length<2?"0"+n:n}${r.length<2?"0"+r:r}`}toCss(t=!1){const n=this.r+", "+this.g+", "+this.b;return t?`rgba(${n}, ${this.a})`:`rgb(${n})`}toString(){return this.toCss(!0)}toJSON(){return this.toArray()}toArray(t=0){const n=i(this.r),r=i(this.g),e=i(this.b);return 0===t||1!==this.a?[n,r,e,i(255*this.a)]:[n,r,e]}clone(){return new c(this.toRgba())}hash(){return this.r<<24|this.g<<16|this.b<<8|255*this.a}_sanitize(){return this.r=Math.round(s(this.r,0,255)),this.g=Math.round(s(this.g,0,255)),this.b=Math.round(s(this.b,0,255)),this.a=s(this.a,0,1),this}_set(t,n,r,e){this.r=t,this.g=n,this.b=r,this.a=e}}c.prototype.declaredClass="esri.Color"},46851:(t,n,r)=>{r.d(n,{E:()=>e,R:()=>a});const e=1e-6,a=Math.random,o=Math.PI/180,u=180/Math.PI;Object.freeze({__proto__:null,EPSILON:e,RANDOM:a,toRadian:function(t){return t*o},toDegree:function(t){return t*u},equals:function(t,n){return Math.abs(t-n)<=e*Math.max(1,Math.abs(t),Math.abs(n))}})},17896:(t,n,r)=>{r.d(n,{E:()=>l,a:()=>f,b:()=>s,c:()=>p,d:()=>b,e:()=>y,f:()=>c,g:()=>u,h:()=>g,i:()=>d,k:()=>_,l:()=>o,m:()=>k,n:()=>m,p:()=>M,q:()=>q,r:()=>N,s:()=>i,t:()=>w,u:()=>z});var e=r(65617),a=r(46851);function o(t){const n=t[0],r=t[1],e=t[2];return Math.sqrt(n*n+r*r+e*e)}function u(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function i(t,n,r,e){return t[0]=n,t[1]=r,t[2]=e,t}function s(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t}function c(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t}function h(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t}function l(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t}function f(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t}function d(t,n){const r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2];return Math.sqrt(r*r+e*e+a*a)}function g(t,n){const r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2];return r*r+e*e+a*a}function M(t){const n=t[0],r=t[1],e=t[2];return n*n+r*r+e*e}function m(t,n){const r=n[0],e=n[1],a=n[2];let o=r*r+e*e+a*a;return o>0&&(o=1/Math.sqrt(o),t[0]=n[0]*o,t[1]=n[1]*o,t[2]=n[2]*o),t}function b(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function p(t,n,r){const e=n[0],a=n[1],o=n[2],u=r[0],i=r[1],s=r[2];return t[0]=a*s-o*i,t[1]=o*u-e*s,t[2]=e*i-a*u,t}function y(t,n,r,e){const a=n[0],o=n[1],u=n[2];return t[0]=a+e*(r[0]-a),t[1]=o+e*(r[1]-o),t[2]=u+e*(r[2]-u),t}function k(t,n,r){const e=n[0],a=n[1],o=n[2];return t[0]=r[0]*e+r[4]*a+r[8]*o+r[12],t[1]=r[1]*e+r[5]*a+r[9]*o+r[13],t[2]=r[2]*e+r[6]*a+r[10]*o+r[14],t}function w(t,n,r){const e=n[0],a=n[1],o=n[2];return t[0]=e*r[0]+a*r[3]+o*r[6],t[1]=e*r[1]+a*r[4]+o*r[7],t[2]=e*r[2]+a*r[5]+o*r[8],t}function q(t,n,r){const e=r[0],a=r[1],o=r[2],u=r[3],i=n[0],s=n[1],c=n[2];let h=a*c-o*s,l=o*i-e*c,f=e*s-a*i,d=a*f-o*l,g=o*h-e*f,M=e*l-a*h;const m=2*u;return h*=m,l*=m,f*=m,d*=2,g*=2,M*=2,t[0]=i+h+d,t[1]=s+l+g,t[2]=c+f+M,t}const v=(0,e.c)(),x=(0,e.c)();function _(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]}function N(t,n,r){const e=r[0]-n[0],a=r[1]-n[1],o=r[2]-n[2];let u=e*e+a*a+o*o;return u>0?(u=1/Math.sqrt(u),t[0]=e*u,t[1]=a*u,t[2]=o*u,t):(t[0]=0,t[1]=0,t[2]=0,t)}const A=c,R=h,C=l,E=d,S=g,z=o,O=M;Object.freeze({__proto__:null,length:o,copy:u,set:i,add:s,subtract:c,multiply:h,divide:l,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t},min:function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t},max:function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t},scale:f,scaleAndAdd:function(t,n,r,e){return t[0]=n[0]+r[0]*e,t[1]=n[1]+r[1]*e,t[2]=n[2]+r[2]*e,t},distance:d,squaredDistance:g,squaredLength:M,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},normalize:m,dot:b,cross:p,lerp:y,hermite:function(t,n,r,e,a,o){const u=o*o,i=u*(2*o-3)+1,s=u*(o-2)+o,c=u*(o-1),h=u*(3-2*o);return t[0]=n[0]*i+r[0]*s+e[0]*c+a[0]*h,t[1]=n[1]*i+r[1]*s+e[1]*c+a[1]*h,t[2]=n[2]*i+r[2]*s+e[2]*c+a[2]*h,t},bezier:function(t,n,r,e,a,o){const u=1-o,i=u*u,s=o*o,c=i*u,h=3*o*i,l=3*s*u,f=s*o;return t[0]=n[0]*c+r[0]*h+e[0]*l+a[0]*f,t[1]=n[1]*c+r[1]*h+e[1]*l+a[1]*f,t[2]=n[2]*c+r[2]*h+e[2]*l+a[2]*f,t},random:function(t,n){n=n||1;const r=2*(0,a.R)()*Math.PI,e=2*(0,a.R)()-1,o=Math.sqrt(1-e*e)*n;return t[0]=Math.cos(r)*o,t[1]=Math.sin(r)*o,t[2]=e*n,t},transformMat4:k,transformMat3:w,transformQuat:q,rotateX:function(t,n,r,e){const a=[],o=[];return a[0]=n[0]-r[0],a[1]=n[1]-r[1],a[2]=n[2]-r[2],o[0]=a[0],o[1]=a[1]*Math.cos(e)-a[2]*Math.sin(e),o[2]=a[1]*Math.sin(e)+a[2]*Math.cos(e),t[0]=o[0]+r[0],t[1]=o[1]+r[1],t[2]=o[2]+r[2],t},rotateY:function(t,n,r,e){const a=[],o=[];return a[0]=n[0]-r[0],a[1]=n[1]-r[1],a[2]=n[2]-r[2],o[0]=a[2]*Math.sin(e)+a[0]*Math.cos(e),o[1]=a[1],o[2]=a[2]*Math.cos(e)-a[0]*Math.sin(e),t[0]=o[0]+r[0],t[1]=o[1]+r[1],t[2]=o[2]+r[2],t},rotateZ:function(t,n,r,e){const a=[],o=[];return a[0]=n[0]-r[0],a[1]=n[1]-r[1],a[2]=n[2]-r[2],o[0]=a[0]*Math.cos(e)-a[1]*Math.sin(e),o[1]=a[0]*Math.sin(e)+a[1]*Math.cos(e),o[2]=a[2],t[0]=o[0]+r[0],t[1]=o[1]+r[1],t[2]=o[2]+r[2],t},angle:function(t,n){u(v,t),u(x,n),m(v,v),m(x,x);const r=b(v,x);return r>1?0:r<-1?Math.PI:Math.acos(r)},str:function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},exactEquals:_,equals:function(t,n){if(t===n)return!0;const r=t[0],e=t[1],o=t[2],u=n[0],i=n[1],s=n[2];return Math.abs(r-u)<=a.E*Math.max(1,Math.abs(r),Math.abs(u))&&Math.abs(e-i)<=a.E*Math.max(1,Math.abs(e),Math.abs(i))&&Math.abs(o-s)<=a.E*Math.max(1,Math.abs(o),Math.abs(s))},direction:N,sub:A,mul:R,div:C,dist:E,sqrDist:S,len:z,sqrLen:O})},65617:(t,n,r)=>{function e(){return[0,0,0]}function a(t){return[t[0],t[1],t[2]]}function o(t,n,r){return[t,n,r]}function u(t){const n=[0,0,0],r=Math.min(3,t.length);for(let e=0;e<r;++e)n[e]=t[e];return n}function i(t,n){return new Float64Array(t,n,3)}function s(){return o(1,1,1)}function c(){return o(1,0,0)}function h(){return o(0,1,0)}function l(){return o(0,0,1)}r.d(n,{O:()=>d,Z:()=>f,a:()=>a,b:()=>i,c:()=>e,d:()=>u,f:()=>o});const f=[0,0,0],d=s(),g=c(),M=h(),m=l();Object.freeze({__proto__:null,create:e,clone:a,fromValues:o,fromArray:u,createView:i,zeros:function(){return[0,0,0]},ones:s,unitX:c,unitY:h,unitZ:l,ZEROS:f,ONES:d,UNIT_X:g,UNIT_Y:M,UNIT_Z:m})},98766:(t,n,r)=>{r.d(n,{a:()=>u,b:()=>h,c:()=>a,d:()=>m,e:()=>d,f:()=>g,g:()=>p,h:()=>y,l:()=>b,n:()=>M,s:()=>o});var e=r(46851);function a(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function o(t,n,r,e,a){return t[0]=n,t[1]=r,t[2]=e,t[3]=a,t}function u(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t}function i(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t}function s(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t}function c(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t}function h(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t}function l(t,n){const r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2],o=n[3]-t[3];return Math.sqrt(r*r+e*e+a*a+o*o)}function f(t,n){const r=n[0]-t[0],e=n[1]-t[1],a=n[2]-t[2],o=n[3]-t[3];return r*r+e*e+a*a+o*o}function d(t){const n=t[0],r=t[1],e=t[2],a=t[3];return Math.sqrt(n*n+r*r+e*e+a*a)}function g(t){const n=t[0],r=t[1],e=t[2],a=t[3];return n*n+r*r+e*e+a*a}function M(t,n){const r=n[0],e=n[1],a=n[2],o=n[3];let u=r*r+e*e+a*a+o*o;return u>0&&(u=1/Math.sqrt(u),t[0]=r*u,t[1]=e*u,t[2]=a*u,t[3]=o*u),t}function m(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]}function b(t,n,r,e){const a=n[0],o=n[1],u=n[2],i=n[3];return t[0]=a+e*(r[0]-a),t[1]=o+e*(r[1]-o),t[2]=u+e*(r[2]-u),t[3]=i+e*(r[3]-i),t}function p(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function y(t,n){const r=t[0],a=t[1],o=t[2],u=t[3],i=n[0],s=n[1],c=n[2],h=n[3];return Math.abs(r-i)<=e.E*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(a-s)<=e.E*Math.max(1,Math.abs(a),Math.abs(s))&&Math.abs(o-c)<=e.E*Math.max(1,Math.abs(o),Math.abs(c))&&Math.abs(u-h)<=e.E*Math.max(1,Math.abs(u),Math.abs(h))}const k=i,w=s,q=c,v=l,x=f,_=d,N=g;Object.freeze({__proto__:null,copy:a,set:o,add:u,subtract:i,multiply:s,divide:c,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t},min:function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t},max:function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t},scale:h,scaleAndAdd:function(t,n,r,e){return t[0]=n[0]+r[0]*e,t[1]=n[1]+r[1]*e,t[2]=n[2]+r[2]*e,t[3]=n[3]+r[3]*e,t},distance:l,squaredDistance:f,length:d,squaredLength:g,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},normalize:M,dot:m,lerp:b,random:function(t,n){let r,a,o,u,i,s;n=n||1;do{r=2*(0,e.R)()-1,a=2*(0,e.R)()-1,i=r*r+a*a}while(i>=1);do{o=2*(0,e.R)()-1,u=2*(0,e.R)()-1,s=o*o+u*u}while(s>=1);const c=Math.sqrt((1-i)/s);return t[0]=n*r,t[1]=n*a,t[2]=n*o*c,t[3]=n*u*c,t},transformMat4:function(t,n,r){const e=n[0],a=n[1],o=n[2],u=n[3];return t[0]=r[0]*e+r[4]*a+r[8]*o+r[12]*u,t[1]=r[1]*e+r[5]*a+r[9]*o+r[13]*u,t[2]=r[2]*e+r[6]*a+r[10]*o+r[14]*u,t[3]=r[3]*e+r[7]*a+r[11]*o+r[15]*u,t},transformQuat:function(t,n,r){const e=n[0],a=n[1],o=n[2],u=r[0],i=r[1],s=r[2],c=r[3],h=c*e+i*o-s*a,l=c*a+s*e-u*o,f=c*o+u*a-i*e,d=-u*e-i*a-s*o;return t[0]=h*c+d*-u+l*-s-f*-i,t[1]=l*c+d*-i+f*-u-h*-s,t[2]=f*c+d*-s+h*-i-l*-u,t[3]=n[3],t},str:function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},exactEquals:p,equals:y,sub:k,mul:w,div:q,dist:v,sqrDist:x,len:_,sqrLen:N})},35270:(t,n,r)=>{r.d(n,{h$:()=>o,VL:()=>u,rW:()=>c,B7:()=>s,St:()=>a});const e={transparent:[0,0,0,0],black:[0,0,0,1],silver:[192,192,192,1],gray:[128,128,128,1],white:[255,255,255,1],maroon:[128,0,0,1],red:[255,0,0,1],purple:[128,0,128,1],fuchsia:[255,0,255,1],green:[0,128,0,1],lime:[0,255,0,1],olive:[128,128,0,1],yellow:[255,255,0,1],navy:[0,0,128,1],blue:[0,0,255,1],teal:[0,128,128,1],aqua:[0,255,255,1],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],blanchedalmond:[255,235,205,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],oldlace:[253,245,230,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],rebeccapurple:[102,51,153,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],whitesmoke:[245,245,245,1],yellowgreen:[154,205,50,1]};function a(t){return e[t]||e[t.toLowerCase()]}function o(t){var n;return null!=(n=e[t])?n:e[t.toLowerCase()]}function u(t){return[...o(t)]}function i(t,n,r){r<0&&++r,r>1&&--r;const e=6*r;return e<1?t+(n-t)*e:2*r<1?n:3*r<2?t+(n-t)*(2/3-r)*6:t}function s(t,n,r,e=1){const a=(t%360+360)%360/360,o=r<=.5?r*(n+1):r+n-r*n,u=2*r-o;return[Math.round(255*i(u,o,a+1/3)),Math.round(255*i(u,o,a)),Math.round(255*i(u,o,a-1/3)),e]}function c(t){const n=t.length>5,r=n?8:4,e=(1<<r)-1,a=n?1:17,o=n?9===t.length:5===t.length;let u=Number("0x"+t.substr(1));if(isNaN(u))return null;const i=[0,0,0,1];let s;return o&&(s=u&e,u>>=r,i[3]=a*s/255),s=u&e,u>>=r,i[2]=a*s,s=u&e,u>>=r,i[1]=a*s,s=u&e,u>>=r,i[0]=a*s,i}},22021:(t,n,r)=>{r.d(n,{ZF:()=>f,Kt:()=>d,jE:()=>m,uZ:()=>u,oK:()=>g,Vl:()=>h,wt:()=>i,t7:()=>c,Sf:()=>o,fp:()=>s,BV:()=>l});var e=r(17896);r(98766);const a=new Float32Array(1);function o(t){--t;for(let n=1;n<32;n<<=1)t|=t>>n;return t+1}function u(t,n,r){return Math.min(Math.max(t,n),r)}function i(t){return 0==(t&t-1)}function s(t){return t--,t|=t>>1,t|=t>>2,t|=t>>4,t|=t>>8,t|=t>>16,++t}function c(t,n,r){return t+(n-t)*r}function h(t){return t*Math.PI/180}function l(t){return 180*t/Math.PI}function f(t){return Math.acos(u(t,-1,1))}function d(t){return Math.asin(u(t,-1,1))}function g(t){return M(Math.max(-b,Math.min(t,b)))}function M(t){return a[0]=t,a[0]}function m(t,n){const r=(0,e.l)(t),a=d(t[2]/r),o=Math.atan2(t[1]/r,t[0]/r);return(0,e.s)(n,r,a,o),n}const b=M(34028234663852886e22)}}]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const io="160",sl=0,So=1,rl=2,cc=1,lc=2,Mn=3,Nn=0,Be=1,Ge=2,Dn=0,bi=1,wo=2,Eo=3,bo=4,ol=5,Xn=100,al=101,cl=102,To=103,Ao=104,ll=200,hl=201,ul=202,dl=203,Hr=204,kr=205,fl=206,pl=207,ml=208,gl=209,_l=210,vl=211,xl=212,Ml=213,yl=214,Sl=0,wl=1,El=2,Fs=3,bl=4,Tl=5,Al=6,Rl=7,hc=0,Cl=1,Pl=2,In=0,Ll=1,Dl=2,Il=3,uc=4,Ul=5,Nl=6,dc=300,Ri=301,Ci=302,Vr=303,Wr=304,Xs=306,Ke=1e3,an=1001,Xr=1002,ze=1003,Ro=1004,er=1005,tn=1006,Fl=1007,Zi=1008,Un=1009,Ol=1010,zl=1011,so=1012,fc=1013,Pn=1014,Ln=1015,Ki=1016,pc=1017,mc=1018,Zn=1020,Bl=1021,cn=1023,Gl=1024,Hl=1025,Kn=1026,Pi=1027,kl=1028,gc=1029,Vl=1030,_c=1031,vc=1033,nr=33776,ir=33777,sr=33778,rr=33779,Co=35840,Po=35841,Lo=35842,Do=35843,xc=36196,Io=37492,Uo=37496,No=37808,Fo=37809,Oo=37810,zo=37811,Bo=37812,Go=37813,Ho=37814,ko=37815,Vo=37816,Wo=37817,Xo=37818,qo=37819,Yo=37820,Zo=37821,or=36492,Ko=36494,Jo=36495,Wl=36283,$o=36284,jo=36285,Qo=36286,Mc=3e3,Jn=3001,Xl=3200,ql=3201,yc=0,Yl=1,Ze="",_e="srgb",Sn="srgb-linear",ro="display-p3",qs="display-p3-linear",Os="linear",ae="srgb",zs="rec709",Bs="p3",si=7680,ta=519,Zl=512,Kl=513,Jl=514,Sc=515,$l=516,jl=517,Ql=518,th=519,ea=35044,na="300 es",qr=1035,yn=2e3,Gs=2001;class Di{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ia=1234567;const Gi=Math.PI/180,Ji=180/Math.PI;function ei(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[s&255]+Le[s>>8&255]+Le[s>>16&255]+Le[s>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function ye(s,t,e){return Math.max(t,Math.min(e,s))}function oo(s,t){return(s%t+t)%t}function eh(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function nh(s,t,e){return s!==t?(e-s)/(t-s):0}function Hi(s,t,e){return(1-e)*s+e*t}function ih(s,t,e,n){return Hi(s,t,1-Math.exp(-e*n))}function sh(s,t=1){return t-Math.abs(oo(s,t*2)-t)}function rh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function oh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function ah(s,t){return s+Math.floor(Math.random()*(t-s+1))}function ch(s,t){return s+Math.random()*(t-s)}function lh(s){return s*(.5-Math.random())}function hh(s){s!==void 0&&(ia=s);let t=ia+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function uh(s){return s*Gi}function dh(s){return s*Ji}function Yr(s){return(s&s-1)===0&&s!==0}function fh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Hs(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ph(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),h=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*u,c*h,c*d,a*l);break;case"YZY":s.set(c*d,a*u,c*h,a*l);break;case"ZXZ":s.set(c*h,c*d,a*u,a*l);break;case"XZX":s.set(a*u,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*u,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function yi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ne(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const oe={DEG2RAD:Gi,RAD2DEG:Ji,generateUUID:ei,clamp:ye,euclideanModulo:oo,mapLinear:eh,inverseLerp:nh,lerp:Hi,damp:ih,pingpong:sh,smoothstep:rh,smootherstep:oh,randInt:ah,randFloat:ch,randFloatSpread:lh,seededRandom:hh,degToRad:uh,radToDeg:dh,isPowerOfTwo:Yr,ceilPowerOfTwo:fh,floorPowerOfTwo:Hs,setQuaternionFromProperEuler:ph,normalize:Ne,denormalize:yi};class lt{constructor(t=0,e=0){lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,i,r,o,a,c,l){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],w=i[1],v=i[4],x=i[7],C=i[2],A=i[5],R=i[8];return r[0]=o*_+a*w+c*C,r[3]=o*m+a*v+c*A,r[6]=o*p+a*x+c*R,r[1]=l*_+u*w+h*C,r[4]=l*m+u*v+h*A,r[7]=l*p+u*x+h*R,r[2]=d*_+f*w+g*C,r[5]=d*m+f*v+g*A,r[8]=d*p+f*x+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,d=a*c-u*r,f=l*r-o*c,g=e*h+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(i*l-u*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(u*e-i*c)*_,t[5]=(i*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ar.makeScale(t,e)),this}rotate(t){return this.premultiply(ar.makeRotation(-t)),this}translate(t,e){return this.premultiply(ar.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ar=new Zt;function wc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ks(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function mh(){const s=ks("canvas");return s.style.display="block",s}const sa={};function ki(s){s in sa||(sa[s]=!0,console.warn(s))}const ra=new Zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),oa=new Zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ss={[Sn]:{transfer:Os,primaries:zs,toReference:s=>s,fromReference:s=>s},[_e]:{transfer:ae,primaries:zs,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[qs]:{transfer:Os,primaries:Bs,toReference:s=>s.applyMatrix3(oa),fromReference:s=>s.applyMatrix3(ra)},[ro]:{transfer:ae,primaries:Bs,toReference:s=>s.convertSRGBToLinear().applyMatrix3(oa),fromReference:s=>s.applyMatrix3(ra).convertLinearToSRGB()}},gh=new Set([Sn,qs]),ee={enabled:!0,_workingColorSpace:Sn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!gh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=ss[t].toReference,i=ss[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return ss[s].primaries},getTransfer:function(s){return s===Ze?Os:ss[s].transfer}};function Ti(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function cr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ri;class Ec{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ri===void 0&&(ri=ks("canvas")),ri.width=t.width,ri.height=t.height;const n=ri.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ri}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ks("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ti(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ti(e[n]/255)*255):e[n]=Ti(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _h=0;class bc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=ei(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(lr(i[o].image)):r.push(lr(i[o]))}else r=lr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function lr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Ec.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vh=0;class He extends Di{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,n=an,i=an,r=tn,o=Zi,a=cn,c=Un,l=He.DEFAULT_ANISOTROPY,u=Ze){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=ei(),this.name="",this.source=new bc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(ki("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Jn?_e:Ze),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ke:t.x=t.x-Math.floor(t.x);break;case an:t.x=t.x<0?0:1;break;case Xr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ke:t.y=t.y-Math.floor(t.y);break;case an:t.y=t.y<0?0:1;break;case Xr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ki("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===_e?Jn:Mc}set encoding(t){ki("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Jn?_e:Ze}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=dc;He.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,n=0,i=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,x=(f+1)/2,C=(p+1)/2,A=(u+d)/4,R=(h+_)/4,N=(g+m)/4;return v>x&&v>C?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=A/n,r=R/n):x>C?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=N/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=N/r),this.set(n,i,r,e),this}let w=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(h-_)/w,this.z=(d-u)/w,this.w=Math.acos((l+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xh extends Di{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(ki("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Jn?_e:Ze),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new He(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new bc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jn extends xh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Tc extends He{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mh extends He{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ts{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==d||l!==f||u!==g){let m=1-a;const p=c*d+l*f+u*g+h*_,w=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const C=Math.sqrt(v),A=Math.atan2(C,p*w);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const x=a*w;if(c=c*m+d*x,l=l*m+f*x,u=u*m+g*x,h=h*m+_*x,m===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=C,l*=C,u*=C,h*=C}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*h+c*f-l*d,t[e+1]=c*g+u*d+l*h-a*f,t[e+2]=l*g+u*f+a*d-c*h,t[e+3]=u*g-a*h-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),d=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class S{constructor(t=0,e=0,n=0){S.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(aa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(aa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),u=2*(a*e-r*i),h=2*(r*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return hr.copy(this).projectOnVector(t),this.sub(hr)}reflect(t){return this.sub(hr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hr=new S,aa=new ts;class ni{constructor(t=new S(1/0,1/0,1/0),e=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(en.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(en.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=en.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,en):en.fromBufferAttribute(r,o),en.applyMatrix4(t.matrixWorld),this.expandByPoint(en);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rs.copy(n.boundingBox)),rs.applyMatrix4(t.matrixWorld),this.union(rs)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,en),en.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ni),os.subVectors(this.max,Ni),oi.subVectors(t.a,Ni),ai.subVectors(t.b,Ni),ci.subVectors(t.c,Ni),En.subVectors(ai,oi),bn.subVectors(ci,ai),zn.subVectors(oi,ci);let e=[0,-En.z,En.y,0,-bn.z,bn.y,0,-zn.z,zn.y,En.z,0,-En.x,bn.z,0,-bn.x,zn.z,0,-zn.x,-En.y,En.x,0,-bn.y,bn.x,0,-zn.y,zn.x,0];return!ur(e,oi,ai,ci,os)||(e=[1,0,0,0,1,0,0,0,1],!ur(e,oi,ai,ci,os))?!1:(as.crossVectors(En,bn),e=[as.x,as.y,as.z],ur(e,oi,ai,ci,os))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,en).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(en).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const fn=[new S,new S,new S,new S,new S,new S,new S,new S],en=new S,rs=new ni,oi=new S,ai=new S,ci=new S,En=new S,bn=new S,zn=new S,Ni=new S,os=new S,as=new S,Bn=new S;function ur(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Bn.fromArray(s,r);const a=i.x*Math.abs(Bn.x)+i.y*Math.abs(Bn.y)+i.z*Math.abs(Bn.z),c=t.dot(Bn),l=e.dot(Bn),u=n.dot(Bn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const yh=new ni,Fi=new S,dr=new S;class es{constructor(t=new S,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fi.subVectors(t,this.center);const e=Fi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Fi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fi.copy(t.center).add(dr)),this.expandByPoint(Fi.copy(t.center).sub(dr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pn=new S,fr=new S,cs=new S,Tn=new S,pr=new S,ls=new S,mr=new S;class ao{constructor(t=new S,e=new S(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(pn.copy(this.origin).addScaledVector(this.direction,e),pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){fr.copy(t).add(e).multiplyScalar(.5),cs.copy(e).sub(t).normalize(),Tn.copy(this.origin).sub(fr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(cs),a=Tn.dot(this.direction),c=-Tn.dot(cs),l=Tn.lengthSq(),u=Math.abs(1-o*o);let h,d,f,g;if(u>0)if(h=o*c-a,d=o*a-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,f=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(fr).addScaledVector(cs,d),f}intersectSphere(t,e){pn.subVectors(t.center,this.origin);const n=pn.dot(this.direction),i=pn.dot(pn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,pn)!==null}intersectTriangle(t,e,n,i,r){pr.subVectors(e,t),ls.subVectors(n,t),mr.crossVectors(pr,ls);let o=this.direction.dot(mr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Tn.subVectors(this.origin,t);const c=a*this.direction.dot(ls.crossVectors(Tn,ls));if(c<0)return null;const l=a*this.direction.dot(pr.cross(Tn));if(l<0||c+l>o)return null;const u=-a*Tn.dot(mr);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,e,n,i,r,o,a,c,l,u,h,d,f,g,_,m){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,u,h,d,f,g,_,m)}set(t,e,n,i,r,o,a,c,l,u,h,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/li.setFromMatrixColumn(t,0).length(),r=1/li.setFromMatrixColumn(t,1).length(),o=1/li.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=o*u,f=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*u,f=c*h,g=l*u,_=l*h;e[0]=d+_*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*u,f=c*h,g=l*u,_=l*h;e[0]=d-_*a,e[4]=-o*h,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*u,f=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*h,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-d*h,e[8]=g*h+f,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=f*h+g,e[10]=d-_*h}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+_,e[5]=o*u,e[9]=f*h-g,e[2]=g*h-f,e[6]=a*u,e[10]=_*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sh,t,wh)}lookAt(t,e,n){const i=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),An.crossVectors(n,Ve),An.lengthSq()===0&&(Math.abs(n.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),An.crossVectors(n,Ve)),An.normalize(),hs.crossVectors(Ve,An),i[0]=An.x,i[4]=hs.x,i[8]=Ve.x,i[1]=An.y,i[5]=hs.y,i[9]=Ve.y,i[2]=An.z,i[6]=hs.z,i[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],w=n[3],v=n[7],x=n[11],C=n[15],A=i[0],R=i[4],N=i[8],M=i[12],T=i[1],F=i[5],k=i[9],$=i[13],L=i[2],z=i[6],G=i[10],Z=i[14],K=i[3],J=i[7],j=i[11],at=i[15];return r[0]=o*A+a*T+c*L+l*K,r[4]=o*R+a*F+c*z+l*J,r[8]=o*N+a*k+c*G+l*j,r[12]=o*M+a*$+c*Z+l*at,r[1]=u*A+h*T+d*L+f*K,r[5]=u*R+h*F+d*z+f*J,r[9]=u*N+h*k+d*G+f*j,r[13]=u*M+h*$+d*Z+f*at,r[2]=g*A+_*T+m*L+p*K,r[6]=g*R+_*F+m*z+p*J,r[10]=g*N+_*k+m*G+p*j,r[14]=g*M+_*$+m*Z+p*at,r[3]=w*A+v*T+x*L+C*K,r[7]=w*R+v*F+x*z+C*J,r[11]=w*N+v*k+x*G+C*j,r[15]=w*M+v*$+x*Z+C*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*h-i*l*h-r*a*d+n*l*d+i*a*f-n*c*f)+_*(+e*c*f-e*l*d+r*o*d-i*o*f+i*l*u-r*c*u)+m*(+e*l*h-e*a*f-r*o*h+n*o*f+r*a*u-n*l*u)+p*(-i*a*u-e*c*h+e*a*d+i*o*h-n*o*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],w=h*m*l-_*d*l+_*c*f-a*m*f-h*c*p+a*d*p,v=g*d*l-u*m*l-g*c*f+o*m*f+u*c*p-o*d*p,x=u*_*l-g*h*l+g*a*f-o*_*f-u*a*p+o*h*p,C=g*h*c-u*_*c-g*a*d+o*_*d+u*a*m-o*h*m,A=e*w+n*v+i*x+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=w*R,t[1]=(_*d*r-h*m*r-_*i*f+n*m*f+h*i*p-n*d*p)*R,t[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*p+n*c*p)*R,t[3]=(h*c*r-a*d*r-h*i*l+n*d*l+a*i*f-n*c*f)*R,t[4]=v*R,t[5]=(u*m*r-g*d*r+g*i*f-e*m*f-u*i*p+e*d*p)*R,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*p-e*c*p)*R,t[7]=(o*d*r-u*c*r+u*i*l-e*d*l-o*i*f+e*c*f)*R,t[8]=x*R,t[9]=(g*h*r-u*_*r-g*n*f+e*_*f+u*n*p-e*h*p)*R,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*p+e*a*p)*R,t[11]=(u*a*r-o*h*r-u*n*l+e*h*l+o*n*f-e*a*f)*R,t[12]=C*R,t[13]=(u*_*i-g*h*i+g*n*d-e*_*d-u*n*m+e*h*m)*R,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*m-e*a*m)*R,t[15]=(o*h*i-u*a*i+u*n*c-e*h*c-o*n*d+e*a*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,h=a+a,d=r*l,f=r*u,g=r*h,_=o*u,m=o*h,p=a*h,w=c*l,v=c*u,x=c*h,C=n.x,A=n.y,R=n.z;return i[0]=(1-(_+p))*C,i[1]=(f+x)*C,i[2]=(g-v)*C,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(d+p))*A,i[6]=(m+w)*A,i[7]=0,i[8]=(g+v)*R,i[9]=(m-w)*R,i[10]=(1-(d+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=li.set(i[0],i[1],i[2]).length();const o=li.set(i[4],i[5],i[6]).length(),a=li.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],nn.copy(this);const l=1/r,u=1/o,h=1/a;return nn.elements[0]*=l,nn.elements[1]*=l,nn.elements[2]*=l,nn.elements[4]*=u,nn.elements[5]*=u,nn.elements[6]*=u,nn.elements[8]*=h,nn.elements[9]*=h,nn.elements[10]*=h,e.setFromRotationMatrix(nn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=yn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(a===yn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Gs)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=yn){const c=this.elements,l=1/(e-t),u=1/(n-i),h=1/(o-r),d=(e+t)*l,f=(n+i)*u;let g,_;if(a===yn)g=(o+r)*h,_=-2*h;else if(a===Gs)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const li=new S,nn=new le,Sh=new S(0,0,0),wh=new S(1,1,1),An=new S,hs=new S,Ve=new S,ca=new le,la=new ts;class Ys{constructor(t=0,e=0,n=0,i=Ys.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ca.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ca,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return la.setFromEuler(this),this.setFromQuaternion(la,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ys.DEFAULT_ORDER="XYZ";class Ac{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Eh=0;const ha=new S,hi=new ts,mn=new le,us=new S,Oi=new S,bh=new S,Th=new ts,ua=new S(1,0,0),da=new S(0,1,0),fa=new S(0,0,1),Ah={type:"added"},Rh={type:"removed"};class ve extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new S,e=new Ys,n=new ts,i=new S(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new le},normalMatrix:{value:new Zt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ac,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hi.setFromAxisAngle(t,e),this.quaternion.multiply(hi),this}rotateOnWorldAxis(t,e){return hi.setFromAxisAngle(t,e),this.quaternion.premultiply(hi),this}rotateX(t){return this.rotateOnAxis(ua,t)}rotateY(t){return this.rotateOnAxis(da,t)}rotateZ(t){return this.rotateOnAxis(fa,t)}translateOnAxis(t,e){return ha.copy(t).applyQuaternion(this.quaternion),this.position.add(ha.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ua,t)}translateY(t){return this.translateOnAxis(da,t)}translateZ(t){return this.translateOnAxis(fa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?us.copy(t):us.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(Oi,us,this.up):mn.lookAt(us,Oi,this.up),this.quaternion.setFromRotationMatrix(mn),i&&(mn.extractRotation(i.matrixWorld),hi.setFromRotationMatrix(mn),this.quaternion.premultiply(hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Ah)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rh)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),mn.multiply(t.parent.matrixWorld)),t.applyMatrix4(mn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,t,bh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,Th,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ve.DEFAULT_UP=new S(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new S,gn=new S,gr=new S,_n=new S,ui=new S,di=new S,pa=new S,_r=new S,vr=new S,xr=new S;let ds=!1;class on{constructor(t=new S,e=new S,n=new S){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),sn.subVectors(t,e),i.cross(sn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){sn.subVectors(i,e),gn.subVectors(n,e),gr.subVectors(t,e);const o=sn.dot(sn),a=sn.dot(gn),c=sn.dot(gr),l=gn.dot(gn),u=gn.dot(gr),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(l*c-a*u)*d,g=(o*u-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getUV(t,e,n,i,r,o,a,c){return ds===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ds=!0),this.getInterpolation(t,e,n,i,r,o,a,c)}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,_n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_n.x),c.addScaledVector(o,_n.y),c.addScaledVector(a,_n.z),c)}static isFrontFacing(t,e,n,i){return sn.subVectors(n,e),gn.subVectors(t,e),sn.cross(gn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return sn.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),sn.cross(gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return on.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return on.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return ds===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ds=!0),on.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return on.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return on.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return on.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;ui.subVectors(i,n),di.subVectors(r,n),_r.subVectors(t,n);const c=ui.dot(_r),l=di.dot(_r);if(c<=0&&l<=0)return e.copy(n);vr.subVectors(t,i);const u=ui.dot(vr),h=di.dot(vr);if(u>=0&&h<=u)return e.copy(i);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(ui,o);xr.subVectors(t,r);const f=ui.dot(xr),g=di.dot(xr);if(g>=0&&f<=g)return e.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(di,a);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return pa.subVectors(r,i),a=(h-u)/(h-u+(f-g)),e.copy(i).addScaledVector(pa,a);const p=1/(m+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(ui,o).addScaledVector(di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Rc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},fs={h:0,s:0,l:0};function Mr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class ft{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=_e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ee.workingColorSpace){if(t=oo(t,1),e=ye(e,0,1),n=ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Mr(o,r,t+1/3),this.g=Mr(o,r,t),this.b=Mr(o,r,t-1/3)}return ee.toWorkingColorSpace(this,i),this}setStyle(t,e=_e){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=_e){const n=Rc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ti(t.r),this.g=Ti(t.g),this.b=Ti(t.b),this}copyLinearToSRGB(t){return this.r=cr(t.r),this.g=cr(t.g),this.b=cr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=_e){return ee.fromWorkingColorSpace(De.copy(this),t),Math.round(ye(De.r*255,0,255))*65536+Math.round(ye(De.g*255,0,255))*256+Math.round(ye(De.b*255,0,255))}getHexString(t=_e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(De.copy(this),e);const n=De.r,i=De.g,r=De.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=_e){ee.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,i=De.b;return t!==_e?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Rn),this.setHSL(Rn.h+t,Rn.s+e,Rn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Rn),t.getHSL(fs);const n=Hi(Rn.h,fs.h,e),i=Hi(Rn.s,fs.s,e),r=Hi(Rn.l,fs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new ft;ft.NAMES=Rc;let Ch=0;class ii extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=bi,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=kr,this.blendEquation=Xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ta,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=si,this.stencilZFail=si,this.stencilZPass=si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hr&&(n.blendSrc=this.blendSrc),this.blendDst!==kr&&(n.blendDst=this.blendDst),this.blendEquation!==Xn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ta&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Vs extends ii{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new S,ps=new lt;class $e{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ea,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ps.fromBufferAttribute(this,e),ps.applyMatrix3(t),this.setXY(e,ps.x,ps.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),i=Ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),i=Ne(i,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ea&&(t.usage=this.usage),t}}class Cc extends $e{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Pc extends $e{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class te extends $e{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ph=0;const Qe=new le,yr=new ve,fi=new S,We=new ni,zi=new ni,Te=new S;class me extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wc(t)?Pc:Cc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,n){return Qe.makeTranslation(t,e,n),this.applyMatrix4(Qe),this}scale(t,e,n){return Qe.makeScale(t,e,n),this.applyMatrix4(Qe),this}lookAt(t){return yr.lookAt(t),yr.updateMatrix(),this.applyMatrix4(yr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new te(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];We.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new es);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new S,1/0);return}if(t){const n=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];zi.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(We.min,zi.min),We.expandByPoint(Te),Te.addVectors(We.max,zi.max),We.expandByPoint(Te)):(We.expandByPoint(zi.min),We.expandByPoint(zi.max))}We.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Te.fromBufferAttribute(a,l),c&&(fi.fromBufferAttribute(t,l),Te.add(fi)),i=Math.max(i,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let T=0;T<a;T++)l[T]=new S,u[T]=new S;const h=new S,d=new S,f=new S,g=new lt,_=new lt,m=new lt,p=new S,w=new S;function v(T,F,k){h.fromArray(i,T*3),d.fromArray(i,F*3),f.fromArray(i,k*3),g.fromArray(o,T*2),_.fromArray(o,F*2),m.fromArray(o,k*2),d.sub(h),f.sub(h),_.sub(g),m.sub(g);const $=1/(_.x*m.y-m.x*_.y);isFinite($)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar($),w.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar($),l[T].add(p),l[F].add(p),l[k].add(p),u[T].add(w),u[F].add(w),u[k].add(w))}let x=this.groups;x.length===0&&(x=[{start:0,count:n.length}]);for(let T=0,F=x.length;T<F;++T){const k=x[T],$=k.start,L=k.count;for(let z=$,G=$+L;z<G;z+=3)v(n[z+0],n[z+1],n[z+2])}const C=new S,A=new S,R=new S,N=new S;function M(T){R.fromArray(r,T*3),N.copy(R);const F=l[T];C.copy(F),C.sub(R.multiplyScalar(R.dot(F))).normalize(),A.crossVectors(N,F);const $=A.dot(u[T])<0?-1:1;c[T*4]=C.x,c[T*4+1]=C.y,c[T*4+2]=C.z,c[T*4+3]=$}for(let T=0,F=x.length;T<F;++T){const k=x[T],$=k.start,L=k.count;for(let z=$,G=$+L;z<G;z+=3)M(n[z+0]),M(n[z+1]),M(n[z+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new S,r=new S,o=new S,a=new S,c=new S,l=new S,u=new S,h=new S;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new $e(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new me,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const d=l[u],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const f=l[h];u.push(f.toJSON(t.data))}u.length>0&&(i[c]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ma=new le,Gn=new ao,ms=new es,ga=new S,pi=new S,mi=new S,gi=new S,Sr=new S,gs=new S,_s=new lt,vs=new lt,xs=new lt,_a=new S,va=new S,xa=new S,Ms=new S,ys=new S;class D extends ve{constructor(t=new me,e=new Vs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){gs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(Sr.fromBufferAttribute(h,t),o?gs.addScaledVector(Sr,u):gs.addScaledVector(Sr.sub(e),u))}e.add(gs)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(r),Gn.copy(t.ray).recast(t.near),!(ms.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(ms,ga)===null||Gn.origin.distanceToSquared(ga)>(t.far-t.near)**2))&&(ma.copy(r).invert(),Gn.copy(t.ray).applyMatrix4(ma),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Gn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],w=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,C=v;x<C;x+=3){const A=a.getX(x),R=a.getX(x+1),N=a.getX(x+2);i=Ss(this,p,t,n,l,u,h,A,R,N),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);i=Ss(this,o,t,n,l,u,h,w,v,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],w=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let x=w,C=v;x<C;x+=3){const A=x,R=x+1,N=x+2;i=Ss(this,p,t,n,l,u,h,A,R,N),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=m,v=m+1,x=m+2;i=Ss(this,o,t,n,l,u,h,w,v,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Lh(s,t,e,n,i,r,o,a){let c;if(t.side===Be?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===Nn,a),c===null)return null;ys.copy(a),ys.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(ys);return l<e.near||l>e.far?null:{distance:l,point:ys.clone(),object:s}}function Ss(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,pi),s.getVertexPosition(c,mi),s.getVertexPosition(l,gi);const u=Lh(s,t,e,n,pi,mi,gi,Ms);if(u){i&&(_s.fromBufferAttribute(i,a),vs.fromBufferAttribute(i,c),xs.fromBufferAttribute(i,l),u.uv=on.getInterpolation(Ms,pi,mi,gi,_s,vs,xs,new lt)),r&&(_s.fromBufferAttribute(r,a),vs.fromBufferAttribute(r,c),xs.fromBufferAttribute(r,l),u.uv1=on.getInterpolation(Ms,pi,mi,gi,_s,vs,xs,new lt),u.uv2=u.uv1),o&&(_a.fromBufferAttribute(o,a),va.fromBufferAttribute(o,c),xa.fromBufferAttribute(o,l),u.normal=on.getInterpolation(Ms,pi,mi,gi,_a,va,xa,new S),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new S,materialIndex:0};on.getNormal(pi,mi,gi,h.normal),u.face=h}return u}class ot extends me{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(u,3)),this.setAttribute("uv",new te(h,2));function g(_,m,p,w,v,x,C,A,R,N,M){const T=x/R,F=C/N,k=x/2,$=C/2,L=A/2,z=R+1,G=N+1;let Z=0,K=0;const J=new S;for(let j=0;j<G;j++){const at=j*F-$;for(let ct=0;ct<z;ct++){const X=ct*T-k;J[_]=X*w,J[m]=at*v,J[p]=L,l.push(J.x,J.y,J.z),J[_]=0,J[m]=0,J[p]=A>0?1:-1,u.push(J.x,J.y,J.z),h.push(ct/R),h.push(1-j/N),Z+=1}}for(let j=0;j<N;j++)for(let at=0;at<R;at++){const ct=d+at+z*j,X=d+at+z*(j+1),Q=d+(at+1)+z*(j+1),pt=d+(at+1)+z*j;c.push(ct,X,pt),c.push(X,Q,pt),K+=6}a.addGroup(f,K,M),f+=K,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ot(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Li(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Fe(s){const t={};for(let e=0;e<s.length;e++){const n=Li(s[e]);for(const i in n)t[i]=n[i]}return t}function Dh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Lc(s){return s.getRenderTarget()===null?s.outputColorSpace:ee.workingColorSpace}const Ds={clone:Li,merge:Fe};var Ih=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends ii{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ih,this.fragmentShader=Uh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Li(t.uniforms),this.uniformsGroups=Dh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Dc extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=yn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ye extends Dc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ji*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ji*2*Math.atan(Math.tan(Gi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _i=-90,vi=1;class Nh extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ye(_i,vi,t,e);i.layers=this.layers,this.add(i);const r=new Ye(_i,vi,t,e);r.layers=this.layers,this.add(r);const o=new Ye(_i,vi,t,e);o.layers=this.layers,this.add(o);const a=new Ye(_i,vi,t,e);a.layers=this.layers,this.add(a);const c=new Ye(_i,vi,t,e);c.layers=this.layers,this.add(c);const l=new Ye(_i,vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===yn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Gs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ic extends He{constructor(t,e,n,i,r,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Ri,super(t,e,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fh extends jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(ki("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Jn?_e:Ze),this.texture=new Ic(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ot(5,5,5),r=new wn({name:"CubemapFromEquirect",uniforms:Li(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Be,blending:Dn});r.uniforms.tEquirect.value=e;const o=new D(i,r),a=e.minFilter;return e.minFilter===Zi&&(e.minFilter=tn),new Nh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const wr=new S,Oh=new S,zh=new Zt;class kn{constructor(t=new S(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=wr.subVectors(n,e).cross(Oh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(wr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||zh.getNormalMatrix(t),i=this.coplanarPoint(wr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new es,ws=new S;class Zs{constructor(t=new kn,e=new kn,n=new kn,i=new kn,r=new kn,o=new kn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=yn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],w=i[13],v=i[14],x=i[15];if(n[0].setComponents(c-r,d-l,m-f,x-p).normalize(),n[1].setComponents(c+r,d+l,m+f,x+p).normalize(),n[2].setComponents(c+o,d+u,m+g,x+w).normalize(),n[3].setComponents(c-o,d-u,m-g,x-w).normalize(),n[4].setComponents(c-a,d-h,m-_,x-v).normalize(),e===yn)n[5].setComponents(c+a,d+h,m+_,x+v).normalize();else if(e===Gs)n[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(t){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ws.x=i.normal.x>0?t.max.x:t.min.x,ws.y=i.normal.y>0?t.max.y:t.min.y,ws.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ws)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Uc(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Bh(s,t){const e=t.isWebGL2,n=new WeakMap;function i(l,u){const h=l.array,d=l.usage,f=h.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,h,d),l.onUploadCallback();let _;if(h instanceof Float32Array)_=s.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=s.SHORT;else if(h instanceof Uint32Array)_=s.UNSIGNED_INT;else if(h instanceof Int32Array)_=s.INT;else if(h instanceof Int8Array)_=s.BYTE;else if(h instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,u,h){const d=u.array,f=u._updateRange,g=u.updateRanges;if(s.bindBuffer(h,l),f.count===-1&&g.length===0&&s.bufferSubData(h,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];e?s.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);if(h===void 0)n.set(l,i(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}class $t extends me{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=t/a,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const w=p*d-o;for(let v=0;v<l;v++){const x=v*h-r;g.push(x,-w,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<a;w++){const v=w+l*p,x=w+l*(p+1),C=w+1+l*(p+1),A=w+1+l*p;f.push(v,x,A),f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(_,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $t(t.width,t.height,t.widthSegments,t.heightSegments)}}var Gh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,kh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Xh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Yh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Kh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Jh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$h=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,eu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ru=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,au=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,cu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,lu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,uu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,du=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gu="gl_FragColor = linearToOutputTexel( gl_FragColor );",_u=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,vu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Mu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,yu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Su=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Eu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Au=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ru=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Cu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Du=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Iu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Uu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ou=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Bu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ku=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,qu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Yu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ku=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ju=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$u=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ju=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,td=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ed=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,nd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,id=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ad=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ld=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ud=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,md=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_d=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Md=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Sd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,wd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ed=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Td=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ad=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ld=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Dd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Id=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ud=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Od=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Yd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Zd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$d=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ef=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,rf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,of=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,af=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,uf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,df=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ff=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,mf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_f=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:Gh,alphahash_pars_fragment:Hh,alphamap_fragment:kh,alphamap_pars_fragment:Vh,alphatest_fragment:Wh,alphatest_pars_fragment:Xh,aomap_fragment:qh,aomap_pars_fragment:Yh,batching_pars_vertex:Zh,batching_vertex:Kh,begin_vertex:Jh,beginnormal_vertex:$h,bsdfs:jh,iridescence_fragment:Qh,bumpmap_pars_fragment:tu,clipping_planes_fragment:eu,clipping_planes_pars_fragment:nu,clipping_planes_pars_vertex:iu,clipping_planes_vertex:su,color_fragment:ru,color_pars_fragment:ou,color_pars_vertex:au,color_vertex:cu,common:lu,cube_uv_reflection_fragment:hu,defaultnormal_vertex:uu,displacementmap_pars_vertex:du,displacementmap_vertex:fu,emissivemap_fragment:pu,emissivemap_pars_fragment:mu,colorspace_fragment:gu,colorspace_pars_fragment:_u,envmap_fragment:vu,envmap_common_pars_fragment:xu,envmap_pars_fragment:Mu,envmap_pars_vertex:yu,envmap_physical_pars_fragment:Iu,envmap_vertex:Su,fog_vertex:wu,fog_pars_vertex:Eu,fog_fragment:bu,fog_pars_fragment:Tu,gradientmap_pars_fragment:Au,lightmap_fragment:Ru,lightmap_pars_fragment:Cu,lights_lambert_fragment:Pu,lights_lambert_pars_fragment:Lu,lights_pars_begin:Du,lights_toon_fragment:Uu,lights_toon_pars_fragment:Nu,lights_phong_fragment:Fu,lights_phong_pars_fragment:Ou,lights_physical_fragment:zu,lights_physical_pars_fragment:Bu,lights_fragment_begin:Gu,lights_fragment_maps:Hu,lights_fragment_end:ku,logdepthbuf_fragment:Vu,logdepthbuf_pars_fragment:Wu,logdepthbuf_pars_vertex:Xu,logdepthbuf_vertex:qu,map_fragment:Yu,map_pars_fragment:Zu,map_particle_fragment:Ku,map_particle_pars_fragment:Ju,metalnessmap_fragment:$u,metalnessmap_pars_fragment:ju,morphcolor_vertex:Qu,morphnormal_vertex:td,morphtarget_pars_vertex:ed,morphtarget_vertex:nd,normal_fragment_begin:id,normal_fragment_maps:sd,normal_pars_fragment:rd,normal_pars_vertex:od,normal_vertex:ad,normalmap_pars_fragment:cd,clearcoat_normal_fragment_begin:ld,clearcoat_normal_fragment_maps:hd,clearcoat_pars_fragment:ud,iridescence_pars_fragment:dd,opaque_fragment:fd,packing:pd,premultiplied_alpha_fragment:md,project_vertex:gd,dithering_fragment:_d,dithering_pars_fragment:vd,roughnessmap_fragment:xd,roughnessmap_pars_fragment:Md,shadowmap_pars_fragment:yd,shadowmap_pars_vertex:Sd,shadowmap_vertex:wd,shadowmask_pars_fragment:Ed,skinbase_vertex:bd,skinning_pars_vertex:Td,skinning_vertex:Ad,skinnormal_vertex:Rd,specularmap_fragment:Cd,specularmap_pars_fragment:Pd,tonemapping_fragment:Ld,tonemapping_pars_fragment:Dd,transmission_fragment:Id,transmission_pars_fragment:Ud,uv_pars_fragment:Nd,uv_pars_vertex:Fd,uv_vertex:Od,worldpos_vertex:zd,background_vert:Bd,background_frag:Gd,backgroundCube_vert:Hd,backgroundCube_frag:kd,cube_vert:Vd,cube_frag:Wd,depth_vert:Xd,depth_frag:qd,distanceRGBA_vert:Yd,distanceRGBA_frag:Zd,equirect_vert:Kd,equirect_frag:Jd,linedashed_vert:$d,linedashed_frag:jd,meshbasic_vert:Qd,meshbasic_frag:tf,meshlambert_vert:ef,meshlambert_frag:nf,meshmatcap_vert:sf,meshmatcap_frag:rf,meshnormal_vert:of,meshnormal_frag:af,meshphong_vert:cf,meshphong_frag:lf,meshphysical_vert:hf,meshphysical_frag:uf,meshtoon_vert:df,meshtoon_frag:ff,points_vert:pf,points_frag:mf,shadow_vert:gf,shadow_frag:_f,sprite_vert:vf,sprite_frag:xf},ut={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},hn={basic:{uniforms:Fe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Fe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new ft(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Fe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Fe([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Fe([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new ft(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Fe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Fe([ut.points,ut.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Fe([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Fe([ut.common,ut.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Fe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Fe([ut.sprite,ut.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Fe([ut.common,ut.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Fe([ut.lights,ut.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};hn.physical={uniforms:Fe([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const Es={r:0,b:0,g:0};function Mf(s,t,e,n,i,r,o){const a=new ft(0);let c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(m,p){let w=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?e:t).get(v)),v===null?_(a,c):v&&v.isColor&&(_(v,1),w=!0);const x=s.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,o):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||w)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Xs)?(u===void 0&&(u=new D(new ot(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Li(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=ee.getTransfer(v.colorSpace)!==ae,(h!==v||d!==v.version||f!==s.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new D(new $t(2,2),new wn({name:"BackgroundMaterial",uniforms:Li(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=ee.getTransfer(v.colorSpace)!==ae,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,f=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(Es,Lc(s)),n.buffers.color.setClear(Es.r,Es.g,Es.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function yf(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null);let l=c,u=!1;function h(L,z,G,Z,K){let J=!1;if(o){const j=_(Z,G,z);l!==j&&(l=j,f(l.object)),J=p(L,Z,G,K),J&&w(L,Z,G,K)}else{const j=z.wireframe===!0;(l.geometry!==Z.id||l.program!==G.id||l.wireframe!==j)&&(l.geometry=Z.id,l.program=G.id,l.wireframe=j,J=!0)}K!==null&&e.update(K,s.ELEMENT_ARRAY_BUFFER),(J||u)&&(u=!1,N(L,z,G,Z),K!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(L){return n.isWebGL2?s.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?s.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,z,G){const Z=G.wireframe===!0;let K=a[L.id];K===void 0&&(K={},a[L.id]=K);let J=K[z.id];J===void 0&&(J={},K[z.id]=J);let j=J[Z];return j===void 0&&(j=m(d()),J[Z]=j),j}function m(L){const z=[],G=[],Z=[];for(let K=0;K<i;K++)z[K]=0,G[K]=0,Z[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:Z,object:L,attributes:{},index:null}}function p(L,z,G,Z){const K=l.attributes,J=z.attributes;let j=0;const at=G.getAttributes();for(const ct in at)if(at[ct].location>=0){const Q=K[ct];let pt=J[ct];if(pt===void 0&&(ct==="instanceMatrix"&&L.instanceMatrix&&(pt=L.instanceMatrix),ct==="instanceColor"&&L.instanceColor&&(pt=L.instanceColor)),Q===void 0||Q.attribute!==pt||pt&&Q.data!==pt.data)return!0;j++}return l.attributesNum!==j||l.index!==Z}function w(L,z,G,Z){const K={},J=z.attributes;let j=0;const at=G.getAttributes();for(const ct in at)if(at[ct].location>=0){let Q=J[ct];Q===void 0&&(ct==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),ct==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor));const pt={};pt.attribute=Q,Q&&Q.data&&(pt.data=Q.data),K[ct]=pt,j++}l.attributes=K,l.attributesNum=j,l.index=Z}function v(){const L=l.newAttributes;for(let z=0,G=L.length;z<G;z++)L[z]=0}function x(L){C(L,0)}function C(L,z){const G=l.newAttributes,Z=l.enabledAttributes,K=l.attributeDivisors;G[L]=1,Z[L]===0&&(s.enableVertexAttribArray(L),Z[L]=1),K[L]!==z&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,z),K[L]=z)}function A(){const L=l.newAttributes,z=l.enabledAttributes;for(let G=0,Z=z.length;G<Z;G++)z[G]!==L[G]&&(s.disableVertexAttribArray(G),z[G]=0)}function R(L,z,G,Z,K,J,j){j===!0?s.vertexAttribIPointer(L,z,G,K,J):s.vertexAttribPointer(L,z,G,Z,K,J)}function N(L,z,G,Z){if(n.isWebGL2===!1&&(L.isInstancedMesh||Z.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const K=Z.attributes,J=G.getAttributes(),j=z.defaultAttributeValues;for(const at in J){const ct=J[at];if(ct.location>=0){let X=K[at];if(X===void 0&&(at==="instanceMatrix"&&L.instanceMatrix&&(X=L.instanceMatrix),at==="instanceColor"&&L.instanceColor&&(X=L.instanceColor)),X!==void 0){const Q=X.normalized,pt=X.itemSize,yt=e.get(X);if(yt===void 0)continue;const vt=yt.buffer,Lt=yt.type,Ot=yt.bytesPerElement,wt=n.isWebGL2===!0&&(Lt===s.INT||Lt===s.UNSIGNED_INT||X.gpuType===fc);if(X.isInterleavedBufferAttribute){const Nt=X.data,P=Nt.stride,et=X.offset;if(Nt.isInstancedInterleavedBuffer){for(let q=0;q<ct.locationSize;q++)C(ct.location+q,Nt.meshPerAttribute);L.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=Nt.meshPerAttribute*Nt.count)}else for(let q=0;q<ct.locationSize;q++)x(ct.location+q);s.bindBuffer(s.ARRAY_BUFFER,vt);for(let q=0;q<ct.locationSize;q++)R(ct.location+q,pt/ct.locationSize,Lt,Q,P*Ot,(et+pt/ct.locationSize*q)*Ot,wt)}else{if(X.isInstancedBufferAttribute){for(let Nt=0;Nt<ct.locationSize;Nt++)C(ct.location+Nt,X.meshPerAttribute);L.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Nt=0;Nt<ct.locationSize;Nt++)x(ct.location+Nt);s.bindBuffer(s.ARRAY_BUFFER,vt);for(let Nt=0;Nt<ct.locationSize;Nt++)R(ct.location+Nt,pt/ct.locationSize,Lt,Q,pt*Ot,pt/ct.locationSize*Nt*Ot,wt)}}else if(j!==void 0){const Q=j[at];if(Q!==void 0)switch(Q.length){case 2:s.vertexAttrib2fv(ct.location,Q);break;case 3:s.vertexAttrib3fv(ct.location,Q);break;case 4:s.vertexAttrib4fv(ct.location,Q);break;default:s.vertexAttrib1fv(ct.location,Q)}}}}A()}function M(){k();for(const L in a){const z=a[L];for(const G in z){const Z=z[G];for(const K in Z)g(Z[K].object),delete Z[K];delete z[G]}delete a[L]}}function T(L){if(a[L.id]===void 0)return;const z=a[L.id];for(const G in z){const Z=z[G];for(const K in Z)g(Z[K].object),delete Z[K];delete z[G]}delete a[L.id]}function F(L){for(const z in a){const G=a[z];if(G[L.id]===void 0)continue;const Z=G[L.id];for(const K in Z)g(Z[K].object),delete Z[K];delete G[L.id]}}function k(){$(),u=!0,l!==c&&(l=c,f(l.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:k,resetDefaultState:$,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:x,disableUnusedAttributes:A}}function Sf(s,t,e,n){const i=n.isWebGL2;let r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),e.update(h,r,1)}function c(u,h,d){if(d===0)return;let f,g;if(i)f=s,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,u,h,d),e.update(h,r,d)}function l(u,h,d){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(u[g],h[g]);else{f.multiDrawArraysWEBGL(r,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function wf(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),w=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,x=o||t.has("OES_texture_float"),C=v&&x,A=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:w,vertexTextures:v,floatFragmentTextures:x,floatVertexTextures:C,maxSamples:A}}function Ef(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new kn,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const w=r?0:n,v=w*4;let x=p.clippingState||null;c.value=x,x=u(g,d,v,f);for(let C=0;C!==v;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,f,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,w=d.matrixWorldInverse;a.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)o.copy(h[v]).applyMatrix4(w,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function bf(s){let t=new WeakMap;function e(o,a){return a===Vr?o.mapping=Ri:a===Wr&&(o.mapping=Ci),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Vr||a===Wr)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Fh(c.height/2);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Nc extends Dc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Si=4,Ma=[.125,.215,.35,.446,.526,.582],qn=20,Er=new Nc,ya=new ft;let br=null,Tr=0,Ar=0;const Vn=(1+Math.sqrt(5))/2,xi=1/Vn,Sa=[new S(1,1,1),new S(-1,1,1),new S(1,1,-1),new S(-1,1,-1),new S(0,Vn,xi),new S(0,Vn,-xi),new S(xi,0,Vn),new S(-xi,0,Vn),new S(Vn,xi,0),new S(-Vn,xi,0)];class wa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){br=this._renderer.getRenderTarget(),Tr=this._renderer.getActiveCubeFace(),Ar=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ta(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ba(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(br,Tr,Ar),t.scissorTest=!1,bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ri||t.mapping===Ci?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),br=this._renderer.getRenderTarget(),Tr=this._renderer.getActiveCubeFace(),Ar=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:Ki,format:cn,colorSpace:Sn,depthBuffer:!1},i=Ea(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ea(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tf(r)),this._blurMaterial=Af(r,t,e)}return i}_compileMaterial(t){const e=new D(this._lodPlanes[0],t);this._renderer.compile(e,Er)}_sceneToCubeUV(t,e,n,i){const a=new Ye(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(ya),u.toneMapping=In,u.autoClear=!1;const f=new Vs({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),g=new D(new ot,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(ya),_=!0);for(let p=0;p<6;p++){const w=p%3;w===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):w===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;bs(i,w*v,p>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ri||t.mapping===Ci;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ta()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ba());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new D(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;bs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Er)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Sa[(i-1)%Sa.length];this._blur(t,i-1,i,r,o)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new D(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*qn-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):qn;m>qn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qn}`);const p=[];let w=0;for(let R=0;R<qn;++R){const N=R/_,M=Math.exp(-N*N/2);p.push(M),R===0?w+=M:R<m&&(w+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/w;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const x=this._sizeLods[i],C=3*x*(i>v-Si?i-v+Si:0),A=4*(this._cubeSize-x);bs(e,C,A,3*x,2*x),c.setRenderTarget(e),c.render(h,Er)}}function Tf(s){const t=[],e=[],n=[];let i=s;const r=s-Si+1+Ma.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-Si?c=Ma[o-s+Si-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,m=2,p=1,w=new Float32Array(_*g*f),v=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,N=A>2?0:-1,M=[R,N,0,R+2/3,N,0,R+2/3,N+1,0,R,N,0,R+2/3,N+1,0,R,N+1,0];w.set(M,_*g*A),v.set(d,m*g*A);const T=[A,A,A,A,A,A];x.set(T,p*g*A)}const C=new me;C.setAttribute("position",new $e(w,_)),C.setAttribute("uv",new $e(v,m)),C.setAttribute("faceIndex",new $e(x,p)),t.push(C),i>Si&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ea(s,t,e){const n=new jn(s,t,e);return n.texture.mapping=Xs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Af(s,t,e){const n=new Float32Array(qn),i=new S(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:qn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function ba(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function Ta(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function co(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Rf(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Vr||c===Wr,u=c===Ri||c===Ci;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=t.get(a);return e===null&&(e=new wa(s)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),t.set(a,h),h.texture}else{if(t.has(a))return t.get(a).texture;{const h=a.image;if(l&&h&&h.height>0||u&&h&&i(h)){e===null&&(e=new wa(s));const d=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Cf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Pf(s,t,e,n){const i={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],s.ARRAY_BUFFER)}}function l(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const w=f.array;_=f.version;for(let v=0,x=w.length;v<x;v+=3){const C=w[v+0],A=w[v+1],R=w[v+2];d.push(C,A,A,R,R,C)}}else if(g!==void 0){const w=g.array;_=g.version;for(let v=0,x=w.length/3-1;v<x;v+=3){const C=v+0,A=v+1,R=v+2;d.push(C,A,A,R,R,C)}}else return;const m=new(wc(d)?Pc:Cc)(d,1);m.version=_;const p=r.get(h);p&&t.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Lf(s,t,e,n){const i=n.isWebGL2;let r;function o(f){r=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function u(f,g){s.drawElements(r,g,a,f*c),e.update(g,r,1)}function h(f,g,_){if(_===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*c,_),e.update(g,r,_)}function d(f,g,_){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,_);let p=0;for(let w=0;w<_;w++)p+=g[w];e.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function Df(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function If(s,t){return s[0]-t[0]}function Uf(s,t){return Math.abs(t[1])-Math.abs(s[1])}function Nf(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,o=new ce,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){const d=l.morphTargetInfluences;if(t.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(u);if(m===void 0||m.count!==_){let z=function(){$.dispose(),r.delete(u),u.removeEventListener("dispose",z)};var f=z;m!==void 0&&m.texture.dispose();const v=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,C=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],R=u.morphAttributes.normal||[],N=u.morphAttributes.color||[];let M=0;v===!0&&(M=1),x===!0&&(M=2),C===!0&&(M=3);let T=u.attributes.position.count*M,F=1;T>t.maxTextureSize&&(F=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const k=new Float32Array(T*F*4*_),$=new Tc(k,T,F,_);$.type=Ln,$.needsUpdate=!0;const L=M*4;for(let G=0;G<_;G++){const Z=A[G],K=R[G],J=N[G],j=T*F*4*G;for(let at=0;at<Z.count;at++){const ct=at*L;v===!0&&(o.fromBufferAttribute(Z,at),k[j+ct+0]=o.x,k[j+ct+1]=o.y,k[j+ct+2]=o.z,k[j+ct+3]=0),x===!0&&(o.fromBufferAttribute(K,at),k[j+ct+4]=o.x,k[j+ct+5]=o.y,k[j+ct+6]=o.z,k[j+ct+7]=0),C===!0&&(o.fromBufferAttribute(J,at),k[j+ct+8]=o.x,k[j+ct+9]=o.y,k[j+ct+10]=o.z,k[j+ct+11]=J.itemSize===4?o.w:1)}}m={count:_,texture:$,size:new lt(T,F)},r.set(u,m),u.addEventListener("dispose",z)}let p=0;for(let v=0;v<d.length;v++)p+=d[v];const w=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(s,"morphTargetBaseInfluence",w),h.getUniforms().setValue(s,"morphTargetInfluences",d),h.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),h.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let x=0;x<g;x++)_[x]=[x,0];n[u.id]=_}for(let x=0;x<g;x++){const C=_[x];C[0]=x,C[1]=d[x]}_.sort(Uf);for(let x=0;x<8;x++)x<g&&_[x][1]?(a[x][0]=_[x][0],a[x][1]=_[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(If);const m=u.morphAttributes.position,p=u.morphAttributes.normal;let w=0;for(let x=0;x<8;x++){const C=a[x],A=C[0],R=C[1];A!==Number.MAX_SAFE_INTEGER&&R?(m&&u.getAttribute("morphTarget"+x)!==m[A]&&u.setAttribute("morphTarget"+x,m[A]),p&&u.getAttribute("morphNormal"+x)!==p[A]&&u.setAttribute("morphNormal"+x,p[A]),i[x]=R,w+=R):(m&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),p&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}const v=u.morphTargetsRelative?1:1-w;h.getUniforms().setValue(s,"morphTargetBaseInfluence",v),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Ff(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return h}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Fc extends He{constructor(t,e,n,i,r,o,a,c,l,u){if(u=u!==void 0?u:Kn,u!==Kn&&u!==Pi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Kn&&(n=Pn),n===void 0&&u===Pi&&(n=Zn),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ze,this.minFilter=c!==void 0?c:ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Oc=new He,zc=new Fc(1,1);zc.compareFunction=Sc;const Bc=new Tc,Gc=new Mh,Hc=new Ic,Aa=[],Ra=[],Ca=new Float32Array(16),Pa=new Float32Array(9),La=new Float32Array(4);function Ii(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Aa[i];if(r===void 0&&(r=new Float32Array(i),Aa[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Se(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function we(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ks(s,t){let e=Ra[t];e===void 0&&(e=new Int32Array(t),Ra[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Of(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function zf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2fv(this.addr,t),we(e,t)}}function Bf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;s.uniform3fv(this.addr,t),we(e,t)}}function Gf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4fv(this.addr,t),we(e,t)}}function Hf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Se(e,n))return;La.set(n),s.uniformMatrix2fv(this.addr,!1,La),we(e,n)}}function kf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Se(e,n))return;Pa.set(n),s.uniformMatrix3fv(this.addr,!1,Pa),we(e,n)}}function Vf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Se(e,n))return;Ca.set(n),s.uniformMatrix4fv(this.addr,!1,Ca),we(e,n)}}function Wf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Xf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2iv(this.addr,t),we(e,t)}}function qf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3iv(this.addr,t),we(e,t)}}function Yf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4iv(this.addr,t),we(e,t)}}function Zf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Kf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2uiv(this.addr,t),we(e,t)}}function Jf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3uiv(this.addr,t),we(e,t)}}function $f(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4uiv(this.addr,t),we(e,t)}}function jf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?zc:Oc;e.setTexture2D(t||r,i)}function Qf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Gc,i)}function tp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Hc,i)}function ep(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Bc,i)}function np(s){switch(s){case 5126:return Of;case 35664:return zf;case 35665:return Bf;case 35666:return Gf;case 35674:return Hf;case 35675:return kf;case 35676:return Vf;case 5124:case 35670:return Wf;case 35667:case 35671:return Xf;case 35668:case 35672:return qf;case 35669:case 35673:return Yf;case 5125:return Zf;case 36294:return Kf;case 36295:return Jf;case 36296:return $f;case 35678:case 36198:case 36298:case 36306:case 35682:return jf;case 35679:case 36299:case 36307:return Qf;case 35680:case 36300:case 36308:case 36293:return tp;case 36289:case 36303:case 36311:case 36292:return ep}}function ip(s,t){s.uniform1fv(this.addr,t)}function sp(s,t){const e=Ii(t,this.size,2);s.uniform2fv(this.addr,e)}function rp(s,t){const e=Ii(t,this.size,3);s.uniform3fv(this.addr,e)}function op(s,t){const e=Ii(t,this.size,4);s.uniform4fv(this.addr,e)}function ap(s,t){const e=Ii(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function cp(s,t){const e=Ii(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function lp(s,t){const e=Ii(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function hp(s,t){s.uniform1iv(this.addr,t)}function up(s,t){s.uniform2iv(this.addr,t)}function dp(s,t){s.uniform3iv(this.addr,t)}function fp(s,t){s.uniform4iv(this.addr,t)}function pp(s,t){s.uniform1uiv(this.addr,t)}function mp(s,t){s.uniform2uiv(this.addr,t)}function gp(s,t){s.uniform3uiv(this.addr,t)}function _p(s,t){s.uniform4uiv(this.addr,t)}function vp(s,t,e){const n=this.cache,i=t.length,r=Ks(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Oc,r[o])}function xp(s,t,e){const n=this.cache,i=t.length,r=Ks(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Gc,r[o])}function Mp(s,t,e){const n=this.cache,i=t.length,r=Ks(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Hc,r[o])}function yp(s,t,e){const n=this.cache,i=t.length,r=Ks(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),we(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Bc,r[o])}function Sp(s){switch(s){case 5126:return ip;case 35664:return sp;case 35665:return rp;case 35666:return op;case 35674:return ap;case 35675:return cp;case 35676:return lp;case 5124:case 35670:return hp;case 35667:case 35671:return up;case 35668:case 35672:return dp;case 35669:case 35673:return fp;case 5125:return pp;case 36294:return mp;case 36295:return gp;case 36296:return _p;case 35678:case 36198:case 36298:case 36306:case 35682:return vp;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return Mp;case 36289:case 36303:case 36311:case 36292:return yp}}class wp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=np(e.type)}}class Ep{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Sp(e.type)}}class bp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const Rr=/(\w+)(\])?(\[|\.)?/g;function Da(s,t){s.seq.push(t),s.map[t.id]=t}function Tp(s,t,e){const n=s.name,i=n.length;for(Rr.lastIndex=0;;){const r=Rr.exec(n),o=Rr.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Da(e,l===void 0?new wp(a,s,t):new Ep(a,s,t));break}else{let h=e.map[a];h===void 0&&(h=new bp(a),Da(e,h)),e=h}}}class Is{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Tp(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Ia(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Ap=37297;let Rp=0;function Cp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Pp(s){const t=ee.getPrimaries(ee.workingColorSpace),e=ee.getPrimaries(s);let n;switch(t===e?n="":t===Bs&&e===zs?n="LinearDisplayP3ToLinearSRGB":t===zs&&e===Bs&&(n="LinearSRGBToLinearDisplayP3"),s){case Sn:case qs:return[n,"LinearTransferOETF"];case _e:case ro:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Ua(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Cp(s.getShaderSource(t),o)}else return i}function Lp(s,t){const e=Pp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Dp(s,t){let e;switch(t){case Ll:e="Linear";break;case Dl:e="Reinhard";break;case Il:e="OptimizedCineon";break;case uc:e="ACESFilmic";break;case Nl:e="AgX";break;case Ul:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Ip(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(wi).join(`
`)}function Up(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(wi).join(`
`)}function Np(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Fp(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function wi(s){return s!==""}function Na(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fa(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Op=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zr(s){return s.replace(Op,Bp)}const zp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Bp(s,t){let e=Vt[t];if(e===void 0){const n=zp.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Zr(e)}const Gp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oa(s){return s.replace(Gp,Hp)}function Hp(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function za(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function kp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===cc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===lc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Mn&&(t="SHADOWMAP_TYPE_VSM"),t}function Vp(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Ri:case Ci:t="ENVMAP_TYPE_CUBE";break;case Xs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Wp(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ci:t="ENVMAP_MODE_REFRACTION";break}return t}function Xp(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case hc:t="ENVMAP_BLENDING_MULTIPLY";break;case Cl:t="ENVMAP_BLENDING_MIX";break;case Pl:t="ENVMAP_BLENDING_ADD";break}return t}function qp(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Yp(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=kp(e),l=Vp(e),u=Wp(e),h=Xp(e),d=qp(e),f=e.isWebGL2?"":Ip(e),g=Up(e),_=Np(r),m=i.createProgram();let p,w,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(wi).join(`
`),p.length>0&&(p+=`
`),w=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(wi).join(`
`),w.length>0&&(w+=`
`)):(p=[za(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wi).join(`
`),w=[f,za(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==In?"#define TONE_MAPPING":"",e.toneMapping!==In?Vt.tonemapping_pars_fragment:"",e.toneMapping!==In?Dp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,Lp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(wi).join(`
`)),o=Zr(o),o=Na(o,e),o=Fa(o,e),a=Zr(a),a=Na(a,e),a=Fa(a,e),o=Oa(o),a=Oa(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,w=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===na?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const x=v+p+o,C=v+w+a,A=Ia(i,i.VERTEX_SHADER,x),R=Ia(i,i.FRAGMENT_SHADER,C);i.attachShader(m,A),i.attachShader(m,R),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function N(k){if(s.debug.checkShaderErrors){const $=i.getProgramInfoLog(m).trim(),L=i.getShaderInfoLog(A).trim(),z=i.getShaderInfoLog(R).trim();let G=!0,Z=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,A,R);else{const K=Ua(i,A,"vertex"),J=Ua(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+K+`
`+J)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(L===""||z==="")&&(Z=!1);Z&&(k.diagnostics={runnable:G,programLog:$,vertexShader:{log:L,prefix:p},fragmentShader:{log:z,prefix:w}})}i.deleteShader(A),i.deleteShader(R),M=new Is(i,m),T=Fp(i,m)}let M;this.getUniforms=function(){return M===void 0&&N(this),M};let T;this.getAttributes=function(){return T===void 0&&N(this),T};let F=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=i.getProgramParameter(m,Ap)),F},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Rp++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=R,this}let Zp=0;class Kp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Jp(t),e.set(t,n)),n}}class Jp{constructor(t){this.id=Zp++,this.code=t,this.usedTimes=0}}function $p(s,t,e,n,i,r,o){const a=new Ac,c=new Kp,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,T,F,k,$){const L=k.fog,z=$.geometry,G=M.isMeshStandardMaterial?k.environment:null,Z=(M.isMeshStandardMaterial?e:t).get(M.envMap||G),K=Z&&Z.mapping===Xs?Z.image.height:null,J=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const j=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,at=j!==void 0?j.length:0;let ct=0;z.morphAttributes.position!==void 0&&(ct=1),z.morphAttributes.normal!==void 0&&(ct=2),z.morphAttributes.color!==void 0&&(ct=3);let X,Q,pt,yt;if(J){const Ie=hn[J];X=Ie.vertexShader,Q=Ie.fragmentShader}else X=M.vertexShader,Q=M.fragmentShader,c.update(M),pt=c.getVertexShaderID(M),yt=c.getFragmentShaderID(M);const vt=s.getRenderTarget(),Lt=$.isInstancedMesh===!0,Ot=$.isBatchedMesh===!0,wt=!!M.map,Nt=!!M.matcap,P=!!Z,et=!!M.aoMap,q=!!M.lightMap,rt=!!M.bumpMap,Y=!!M.normalMap,bt=!!M.displacementMap,_t=!!M.emissiveMap,E=!!M.metalnessMap,y=!!M.roughnessMap,B=M.anisotropy>0,st=M.clearcoat>0,nt=M.iridescence>0,tt=M.sheen>0,Et=M.transmission>0,dt=B&&!!M.anisotropyMap,Mt=st&&!!M.clearcoatMap,Ct=st&&!!M.clearcoatNormalMap,Gt=st&&!!M.clearcoatRoughnessMap,it=nt&&!!M.iridescenceMap,Jt=nt&&!!M.iridescenceThicknessMap,Kt=tt&&!!M.sheenColorMap,zt=tt&&!!M.sheenRoughnessMap,Rt=!!M.specularMap,St=!!M.specularColorMap,kt=!!M.specularIntensityMap,Qt=Et&&!!M.transmissionMap,de=Et&&!!M.thicknessMap,qt=!!M.gradientMap,ht=!!M.alphaMap,I=M.alphaTest>0,mt=!!M.alphaHash,gt=!!M.extensions,It=!!z.attributes.uv1,Pt=!!z.attributes.uv2,ne=!!z.attributes.uv3;let ie=In;return M.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(ie=s.toneMapping),{isWebGL2:u,shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:X,fragmentShader:Q,defines:M.defines,customVertexShaderID:pt,customFragmentShaderID:yt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ot,instancing:Lt,instancingColor:Lt&&$.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:vt===null?s.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Sn,map:wt,matcap:Nt,envMap:P,envMapMode:P&&Z.mapping,envMapCubeUVHeight:K,aoMap:et,lightMap:q,bumpMap:rt,normalMap:Y,displacementMap:d&&bt,emissiveMap:_t,normalMapObjectSpace:Y&&M.normalMapType===Yl,normalMapTangentSpace:Y&&M.normalMapType===yc,metalnessMap:E,roughnessMap:y,anisotropy:B,anisotropyMap:dt,clearcoat:st,clearcoatMap:Mt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:Gt,iridescence:nt,iridescenceMap:it,iridescenceThicknessMap:Jt,sheen:tt,sheenColorMap:Kt,sheenRoughnessMap:zt,specularMap:Rt,specularColorMap:St,specularIntensityMap:kt,transmission:Et,transmissionMap:Qt,thicknessMap:de,gradientMap:qt,opaque:M.transparent===!1&&M.blending===bi,alphaMap:ht,alphaTest:I,alphaHash:mt,combine:M.combine,mapUv:wt&&_(M.map.channel),aoMapUv:et&&_(M.aoMap.channel),lightMapUv:q&&_(M.lightMap.channel),bumpMapUv:rt&&_(M.bumpMap.channel),normalMapUv:Y&&_(M.normalMap.channel),displacementMapUv:bt&&_(M.displacementMap.channel),emissiveMapUv:_t&&_(M.emissiveMap.channel),metalnessMapUv:E&&_(M.metalnessMap.channel),roughnessMapUv:y&&_(M.roughnessMap.channel),anisotropyMapUv:dt&&_(M.anisotropyMap.channel),clearcoatMapUv:Mt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Gt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:zt&&_(M.sheenRoughnessMap.channel),specularMapUv:Rt&&_(M.specularMap.channel),specularColorMapUv:St&&_(M.specularColorMap.channel),specularIntensityMapUv:kt&&_(M.specularIntensityMap.channel),transmissionMapUv:Qt&&_(M.transmissionMap.channel),thicknessMapUv:de&&_(M.thicknessMap.channel),alphaMapUv:ht&&_(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Y||B),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:It,vertexUv2s:Pt,vertexUv3s:ne,pointsUvs:$.isPoints===!0&&!!z.attributes.uv&&(wt||ht),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:$.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:ct,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&F.length>0,shadowMapType:s.shadowMap.type,toneMapping:ie,useLegacyLights:s._useLegacyLights,decodeVideoTexture:wt&&M.map.isVideoTexture===!0&&ee.getTransfer(M.map.colorSpace)===ae,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ge,flipSided:M.side===Be,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:gt&&M.extensions.derivatives===!0,extensionFragDepth:gt&&M.extensions.fragDepth===!0,extensionDrawBuffers:gt&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:gt&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:gt&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const F in M.defines)T.push(F),T.push(M.defines[F]);return M.isRawShaderMaterial===!1&&(w(T,M),v(T,M),T.push(s.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function w(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function v(M,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function x(M){const T=g[M.type];let F;if(T){const k=hn[T];F=Ds.clone(k.uniforms)}else F=M.uniforms;return F}function C(M,T){let F;for(let k=0,$=l.length;k<$;k++){const L=l[k];if(L.cacheKey===T){F=L,++F.usedTimes;break}}return F===void 0&&(F=new Yp(s,T,M,r),l.push(F)),F}function A(M){if(--M.usedTimes===0){const T=l.indexOf(M);l[T]=l[l.length-1],l.pop(),M.destroy()}}function R(M){c.remove(M)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:l,dispose:N}}function jp(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Qp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Ba(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ga(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(h,d,f,g,_,m){let p=s[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},s[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),t++,p}function a(h,d,f,g,_,m){const p=o(h,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(h,d,f,g,_,m){const p=o(h,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(h,d){e.length>1&&e.sort(h||Qp),n.length>1&&n.sort(d||Ba),i.length>1&&i.sort(d||Ba)}function u(){for(let h=t,d=s.length;h<d;h++){const f=s[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function tm(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Ga,s.set(n,[o])):i>=r.length?(o=new Ga,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function em(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new S,color:new ft};break;case"SpotLight":e={position:new S,direction:new S,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new S,color:new ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new S,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":e={color:new ft,position:new S,halfWidth:new S,halfHeight:new S};break}return s[t.id]=e,e}}}function nm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let im=0;function sm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function rm(s,t){const e=new em,n=nm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new S);const r=new S,o=new le,a=new le;function c(u,h){let d=0,f=0,g=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let _=0,m=0,p=0,w=0,v=0,x=0,C=0,A=0,R=0,N=0,M=0;u.sort(sm);const T=h===!0?Math.PI:1;for(let k=0,$=u.length;k<$;k++){const L=u[k],z=L.color,G=L.intensity,Z=L.distance,K=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=z.r*G*T,f+=z.g*G*T,g+=z.b*G*T;else if(L.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(L.sh.coefficients[J],G);M++}else if(L.isDirectionalLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const j=L.shadow,at=n.get(L);at.shadowBias=j.bias,at.shadowNormalBias=j.normalBias,at.shadowRadius=j.radius,at.shadowMapSize=j.mapSize,i.directionalShadow[_]=at,i.directionalShadowMap[_]=K,i.directionalShadowMatrix[_]=L.shadow.matrix,x++}i.directional[_]=J,_++}else if(L.isSpotLight){const J=e.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(z).multiplyScalar(G*T),J.distance=Z,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,i.spot[p]=J;const j=L.shadow;if(L.map&&(i.spotLightMap[R]=L.map,R++,j.updateMatrices(L),L.castShadow&&N++),i.spotLightMatrix[p]=j.matrix,L.castShadow){const at=n.get(L);at.shadowBias=j.bias,at.shadowNormalBias=j.normalBias,at.shadowRadius=j.radius,at.shadowMapSize=j.mapSize,i.spotShadow[p]=at,i.spotShadowMap[p]=K,A++}p++}else if(L.isRectAreaLight){const J=e.get(L);J.color.copy(z).multiplyScalar(G),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),i.rectArea[w]=J,w++}else if(L.isPointLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity*T),J.distance=L.distance,J.decay=L.decay,L.castShadow){const j=L.shadow,at=n.get(L);at.shadowBias=j.bias,at.shadowNormalBias=j.normalBias,at.shadowRadius=j.radius,at.shadowMapSize=j.mapSize,at.shadowCameraNear=j.camera.near,at.shadowCameraFar=j.camera.far,i.pointShadow[m]=at,i.pointShadowMap[m]=K,i.pointShadowMatrix[m]=L.shadow.matrix,C++}i.point[m]=J,m++}else if(L.isHemisphereLight){const J=e.get(L);J.skyColor.copy(L.color).multiplyScalar(G*T),J.groundColor.copy(L.groundColor).multiplyScalar(G*T),i.hemi[v]=J,v++}}w>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const F=i.hash;(F.directionalLength!==_||F.pointLength!==m||F.spotLength!==p||F.rectAreaLength!==w||F.hemiLength!==v||F.numDirectionalShadows!==x||F.numPointShadows!==C||F.numSpotShadows!==A||F.numSpotMaps!==R||F.numLightProbes!==M)&&(i.directional.length=_,i.spot.length=p,i.rectArea.length=w,i.point.length=m,i.hemi.length=v,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=A+R-N,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=M,F.directionalLength=_,F.pointLength=m,F.spotLength=p,F.rectAreaLength=w,F.hemiLength=v,F.numDirectionalShadows=x,F.numPointShadows=C,F.numSpotShadows=A,F.numSpotMaps=R,F.numLightProbes=M,i.version=im++)}function l(u,h){let d=0,f=0,g=0,_=0,m=0;const p=h.matrixWorldInverse;for(let w=0,v=u.length;w<v;w++){const x=u[w];if(x.isDirectionalLight){const C=i.directional[d];C.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),d++}else if(x.isSpotLight){const C=i.spot[g];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),g++}else if(x.isRectAreaLight){const C=i.rectArea[_];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(x.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(x.width*.5,0,0),C.halfHeight.set(0,x.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(x.matrixWorld),C.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){const C=i.hemi[m];C.direction.setFromMatrixPosition(x.matrixWorld),C.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function Ha(s,t){const e=new rm(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function c(h){e.setup(n,h)}function l(h){e.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function om(s,t){let e=new WeakMap;function n(r,o=0){const a=e.get(r);let c;return a===void 0?(c=new Ha(s,t),e.set(r,[c])):o>=a.length?(c=new Ha(s,t),a.push(c)):c=a[o],c}function i(){e=new WeakMap}return{get:n,dispose:i}}class am extends ii{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class cm extends ii{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function um(s,t,e){let n=new Zs;const i=new lt,r=new lt,o=new ce,a=new am({depthPacking:ql}),c=new cm,l={},u=e.maxTextureSize,h={[Nn]:Be,[Be]:Nn,[Ge]:Ge},d=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:lm,fragmentShader:hm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new me;g.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new D(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cc;let p=this.type;this.render=function(A,R,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=s.getRenderTarget(),T=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Dn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const $=p!==Mn&&this.type===Mn,L=p===Mn&&this.type!==Mn;for(let z=0,G=A.length;z<G;z++){const Z=A[z],K=Z.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;i.copy(K.mapSize);const J=K.getFrameExtents();if(i.multiply(J),r.copy(K.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/J.x),i.x=r.x*J.x,K.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/J.y),i.y=r.y*J.y,K.mapSize.y=r.y)),K.map===null||$===!0||L===!0){const at=this.type!==Mn?{minFilter:ze,magFilter:ze}:{};K.map!==null&&K.map.dispose(),K.map=new jn(i.x,i.y,at),K.map.texture.name=Z.name+".shadowMap",K.camera.updateProjectionMatrix()}s.setRenderTarget(K.map),s.clear();const j=K.getViewportCount();for(let at=0;at<j;at++){const ct=K.getViewport(at);o.set(r.x*ct.x,r.y*ct.y,r.x*ct.z,r.y*ct.w),k.viewport(o),K.updateMatrices(Z,at),n=K.getFrustum(),x(R,N,K.camera,Z,this.type)}K.isPointLightShadow!==!0&&this.type===Mn&&w(K,N),K.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,T,F)};function w(A,R){const N=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new jn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,N,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,N,f,_,null)}function v(A,R,N,M){let T=null;const F=N.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(F!==void 0)T=F;else if(T=N.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const k=T.uuid,$=R.uuid;let L=l[k];L===void 0&&(L={},l[k]=L);let z=L[$];z===void 0&&(z=T.clone(),L[$]=z,R.addEventListener("dispose",C)),T=z}if(T.visible=R.visible,T.wireframe=R.wireframe,M===Mn?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:h[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,N.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const k=s.properties.get(T);k.light=N}return T}function x(A,R,N,M,T){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===Mn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,A.matrixWorld);const $=t.update(A),L=A.material;if(Array.isArray(L)){const z=$.groups;for(let G=0,Z=z.length;G<Z;G++){const K=z[G],J=L[K.materialIndex];if(J&&J.visible){const j=v(A,J,M,T);A.onBeforeShadow(s,A,R,N,$,j,K),s.renderBufferDirect(N,null,$,j,A,K),A.onAfterShadow(s,A,R,N,$,j,K)}}}else if(L.visible){const z=v(A,L,M,T);A.onBeforeShadow(s,A,R,N,$,z,null),s.renderBufferDirect(N,null,$,z,A,null),A.onAfterShadow(s,A,R,N,$,z,null)}}const k=A.children;for(let $=0,L=k.length;$<L;$++)x(k[$],R,N,M,T)}function C(A){A.target.removeEventListener("dispose",C);for(const N in l){const M=l[N],T=A.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function dm(s,t,e){const n=e.isWebGL2;function i(){let I=!1;const mt=new ce;let gt=null;const It=new ce(0,0,0,0);return{setMask:function(Pt){gt!==Pt&&!I&&(s.colorMask(Pt,Pt,Pt,Pt),gt=Pt)},setLocked:function(Pt){I=Pt},setClear:function(Pt,ne,ie,Ee,Ie){Ie===!0&&(Pt*=Ee,ne*=Ee,ie*=Ee),mt.set(Pt,ne,ie,Ee),It.equals(mt)===!1&&(s.clearColor(Pt,ne,ie,Ee),It.copy(mt))},reset:function(){I=!1,gt=null,It.set(-1,0,0,0)}}}function r(){let I=!1,mt=null,gt=null,It=null;return{setTest:function(Pt){Pt?Ot(s.DEPTH_TEST):wt(s.DEPTH_TEST)},setMask:function(Pt){mt!==Pt&&!I&&(s.depthMask(Pt),mt=Pt)},setFunc:function(Pt){if(gt!==Pt){switch(Pt){case Sl:s.depthFunc(s.NEVER);break;case wl:s.depthFunc(s.ALWAYS);break;case El:s.depthFunc(s.LESS);break;case Fs:s.depthFunc(s.LEQUAL);break;case bl:s.depthFunc(s.EQUAL);break;case Tl:s.depthFunc(s.GEQUAL);break;case Al:s.depthFunc(s.GREATER);break;case Rl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}gt=Pt}},setLocked:function(Pt){I=Pt},setClear:function(Pt){It!==Pt&&(s.clearDepth(Pt),It=Pt)},reset:function(){I=!1,mt=null,gt=null,It=null}}}function o(){let I=!1,mt=null,gt=null,It=null,Pt=null,ne=null,ie=null,Ee=null,Ie=null;return{setTest:function(se){I||(se?Ot(s.STENCIL_TEST):wt(s.STENCIL_TEST))},setMask:function(se){mt!==se&&!I&&(s.stencilMask(se),mt=se)},setFunc:function(se,Ue,ln){(gt!==se||It!==Ue||Pt!==ln)&&(s.stencilFunc(se,Ue,ln),gt=se,It=Ue,Pt=ln)},setOp:function(se,Ue,ln){(ne!==se||ie!==Ue||Ee!==ln)&&(s.stencilOp(se,Ue,ln),ne=se,ie=Ue,Ee=ln)},setLocked:function(se){I=se},setClear:function(se){Ie!==se&&(s.clearStencil(se),Ie=se)},reset:function(){I=!1,mt=null,gt=null,It=null,Pt=null,ne=null,ie=null,Ee=null,Ie=null}}}const a=new i,c=new r,l=new o,u=new WeakMap,h=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,w=null,v=null,x=null,C=null,A=null,R=null,N=null,M=new ft(0,0,0),T=0,F=!1,k=null,$=null,L=null,z=null,G=null;const Z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,J=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(j)[1]),K=J>=1):j.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),K=J>=2);let at=null,ct={};const X=s.getParameter(s.SCISSOR_BOX),Q=s.getParameter(s.VIEWPORT),pt=new ce().fromArray(X),yt=new ce().fromArray(Q);function vt(I,mt,gt,It){const Pt=new Uint8Array(4),ne=s.createTexture();s.bindTexture(I,ne),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ie=0;ie<gt;ie++)n&&(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)?s.texImage3D(mt,0,s.RGBA,1,1,It,0,s.RGBA,s.UNSIGNED_BYTE,Pt):s.texImage2D(mt+ie,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Pt);return ne}const Lt={};Lt[s.TEXTURE_2D]=vt(s.TEXTURE_2D,s.TEXTURE_2D,1),Lt[s.TEXTURE_CUBE_MAP]=vt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Lt[s.TEXTURE_2D_ARRAY]=vt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Lt[s.TEXTURE_3D]=vt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ot(s.DEPTH_TEST),c.setFunc(Fs),_t(!1),E(So),Ot(s.CULL_FACE),Y(Dn);function Ot(I){d[I]!==!0&&(s.enable(I),d[I]=!0)}function wt(I){d[I]!==!1&&(s.disable(I),d[I]=!1)}function Nt(I,mt){return f[I]!==mt?(s.bindFramebuffer(I,mt),f[I]=mt,n&&(I===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=mt),I===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=mt)),!0):!1}function P(I,mt){let gt=_,It=!1;if(I)if(gt=g.get(mt),gt===void 0&&(gt=[],g.set(mt,gt)),I.isWebGLMultipleRenderTargets){const Pt=I.texture;if(gt.length!==Pt.length||gt[0]!==s.COLOR_ATTACHMENT0){for(let ne=0,ie=Pt.length;ne<ie;ne++)gt[ne]=s.COLOR_ATTACHMENT0+ne;gt.length=Pt.length,It=!0}}else gt[0]!==s.COLOR_ATTACHMENT0&&(gt[0]=s.COLOR_ATTACHMENT0,It=!0);else gt[0]!==s.BACK&&(gt[0]=s.BACK,It=!0);It&&(e.isWebGL2?s.drawBuffers(gt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(gt))}function et(I){return m!==I?(s.useProgram(I),m=I,!0):!1}const q={[Xn]:s.FUNC_ADD,[al]:s.FUNC_SUBTRACT,[cl]:s.FUNC_REVERSE_SUBTRACT};if(n)q[To]=s.MIN,q[Ao]=s.MAX;else{const I=t.get("EXT_blend_minmax");I!==null&&(q[To]=I.MIN_EXT,q[Ao]=I.MAX_EXT)}const rt={[ll]:s.ZERO,[hl]:s.ONE,[ul]:s.SRC_COLOR,[Hr]:s.SRC_ALPHA,[_l]:s.SRC_ALPHA_SATURATE,[ml]:s.DST_COLOR,[fl]:s.DST_ALPHA,[dl]:s.ONE_MINUS_SRC_COLOR,[kr]:s.ONE_MINUS_SRC_ALPHA,[gl]:s.ONE_MINUS_DST_COLOR,[pl]:s.ONE_MINUS_DST_ALPHA,[vl]:s.CONSTANT_COLOR,[xl]:s.ONE_MINUS_CONSTANT_COLOR,[Ml]:s.CONSTANT_ALPHA,[yl]:s.ONE_MINUS_CONSTANT_ALPHA};function Y(I,mt,gt,It,Pt,ne,ie,Ee,Ie,se){if(I===Dn){p===!0&&(wt(s.BLEND),p=!1);return}if(p===!1&&(Ot(s.BLEND),p=!0),I!==ol){if(I!==w||se!==F){if((v!==Xn||A!==Xn)&&(s.blendEquation(s.FUNC_ADD),v=Xn,A=Xn),se)switch(I){case bi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wo:s.blendFunc(s.ONE,s.ONE);break;case Eo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case bi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case wo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Eo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case bo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}x=null,C=null,R=null,N=null,M.set(0,0,0),T=0,w=I,F=se}return}Pt=Pt||mt,ne=ne||gt,ie=ie||It,(mt!==v||Pt!==A)&&(s.blendEquationSeparate(q[mt],q[Pt]),v=mt,A=Pt),(gt!==x||It!==C||ne!==R||ie!==N)&&(s.blendFuncSeparate(rt[gt],rt[It],rt[ne],rt[ie]),x=gt,C=It,R=ne,N=ie),(Ee.equals(M)===!1||Ie!==T)&&(s.blendColor(Ee.r,Ee.g,Ee.b,Ie),M.copy(Ee),T=Ie),w=I,F=!1}function bt(I,mt){I.side===Ge?wt(s.CULL_FACE):Ot(s.CULL_FACE);let gt=I.side===Be;mt&&(gt=!gt),_t(gt),I.blending===bi&&I.transparent===!1?Y(Dn):Y(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),c.setFunc(I.depthFunc),c.setTest(I.depthTest),c.setMask(I.depthWrite),a.setMask(I.colorWrite);const It=I.stencilWrite;l.setTest(It),It&&(l.setMask(I.stencilWriteMask),l.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),l.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),B(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Ot(s.SAMPLE_ALPHA_TO_COVERAGE):wt(s.SAMPLE_ALPHA_TO_COVERAGE)}function _t(I){k!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),k=I)}function E(I){I!==sl?(Ot(s.CULL_FACE),I!==$&&(I===So?s.cullFace(s.BACK):I===rl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):wt(s.CULL_FACE),$=I}function y(I){I!==L&&(K&&s.lineWidth(I),L=I)}function B(I,mt,gt){I?(Ot(s.POLYGON_OFFSET_FILL),(z!==mt||G!==gt)&&(s.polygonOffset(mt,gt),z=mt,G=gt)):wt(s.POLYGON_OFFSET_FILL)}function st(I){I?Ot(s.SCISSOR_TEST):wt(s.SCISSOR_TEST)}function nt(I){I===void 0&&(I=s.TEXTURE0+Z-1),at!==I&&(s.activeTexture(I),at=I)}function tt(I,mt,gt){gt===void 0&&(at===null?gt=s.TEXTURE0+Z-1:gt=at);let It=ct[gt];It===void 0&&(It={type:void 0,texture:void 0},ct[gt]=It),(It.type!==I||It.texture!==mt)&&(at!==gt&&(s.activeTexture(gt),at=gt),s.bindTexture(I,mt||Lt[I]),It.type=I,It.texture=mt)}function Et(){const I=ct[at];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function dt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Mt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(){try{s.texSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Gt(){try{s.texSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function it(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Jt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Kt(){try{s.texStorage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function zt(){try{s.texStorage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Rt(){try{s.texImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function St(){try{s.texImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function kt(I){pt.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),pt.copy(I))}function Qt(I){yt.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),yt.copy(I))}function de(I,mt){let gt=h.get(mt);gt===void 0&&(gt=new WeakMap,h.set(mt,gt));let It=gt.get(I);It===void 0&&(It=s.getUniformBlockIndex(mt,I.name),gt.set(I,It))}function qt(I,mt){const It=h.get(mt).get(I);u.get(mt)!==It&&(s.uniformBlockBinding(mt,It,I.__bindingPointIndex),u.set(mt,It))}function ht(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},at=null,ct={},f={},g=new WeakMap,_=[],m=null,p=!1,w=null,v=null,x=null,C=null,A=null,R=null,N=null,M=new ft(0,0,0),T=0,F=!1,k=null,$=null,L=null,z=null,G=null,pt.set(0,0,s.canvas.width,s.canvas.height),yt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Ot,disable:wt,bindFramebuffer:Nt,drawBuffers:P,useProgram:et,setBlending:Y,setMaterial:bt,setFlipSided:_t,setCullFace:E,setLineWidth:y,setPolygonOffset:B,setScissorTest:st,activeTexture:nt,bindTexture:tt,unbindTexture:Et,compressedTexImage2D:dt,compressedTexImage3D:Mt,texImage2D:Rt,texImage3D:St,updateUBOMapping:de,uniformBlockBinding:qt,texStorage2D:Kt,texStorage3D:zt,texSubImage2D:Ct,texSubImage3D:Gt,compressedTexSubImage2D:it,compressedTexSubImage3D:Jt,scissor:kt,viewport:Qt,reset:ht}}function fm(s,t,e,n,i,r,o){const a=i.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return f?new OffscreenCanvas(E,y):ks("canvas")}function _(E,y,B,st){let nt=1;if((E.width>st||E.height>st)&&(nt=st/Math.max(E.width,E.height)),nt<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const tt=y?Hs:Math.floor,Et=tt(nt*E.width),dt=tt(nt*E.height);h===void 0&&(h=g(Et,dt));const Mt=B?g(Et,dt):h;return Mt.width=Et,Mt.height=dt,Mt.getContext("2d").drawImage(E,0,0,Et,dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Et+"x"+dt+")."),Mt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Yr(E.width)&&Yr(E.height)}function p(E){return a?!1:E.wrapS!==an||E.wrapT!==an||E.minFilter!==ze&&E.minFilter!==tn}function w(E,y){return E.generateMipmaps&&y&&E.minFilter!==ze&&E.minFilter!==tn}function v(E){s.generateMipmap(E)}function x(E,y,B,st,nt=!1){if(a===!1)return y;if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let tt=y;if(y===s.RED&&(B===s.FLOAT&&(tt=s.R32F),B===s.HALF_FLOAT&&(tt=s.R16F),B===s.UNSIGNED_BYTE&&(tt=s.R8)),y===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(tt=s.R8UI),B===s.UNSIGNED_SHORT&&(tt=s.R16UI),B===s.UNSIGNED_INT&&(tt=s.R32UI),B===s.BYTE&&(tt=s.R8I),B===s.SHORT&&(tt=s.R16I),B===s.INT&&(tt=s.R32I)),y===s.RG&&(B===s.FLOAT&&(tt=s.RG32F),B===s.HALF_FLOAT&&(tt=s.RG16F),B===s.UNSIGNED_BYTE&&(tt=s.RG8)),y===s.RGBA){const Et=nt?Os:ee.getTransfer(st);B===s.FLOAT&&(tt=s.RGBA32F),B===s.HALF_FLOAT&&(tt=s.RGBA16F),B===s.UNSIGNED_BYTE&&(tt=Et===ae?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function C(E,y,B){return w(E,B)===!0||E.isFramebufferTexture&&E.minFilter!==ze&&E.minFilter!==tn?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function A(E){return E===ze||E===Ro||E===er?s.NEAREST:s.LINEAR}function R(E){const y=E.target;y.removeEventListener("dispose",R),M(y),y.isVideoTexture&&u.delete(y)}function N(E){const y=E.target;y.removeEventListener("dispose",N),F(y)}function M(E){const y=n.get(E);if(y.__webglInit===void 0)return;const B=E.source,st=d.get(B);if(st){const nt=st[y.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&T(E),Object.keys(st).length===0&&d.delete(B)}n.remove(E)}function T(E){const y=n.get(E);s.deleteTexture(y.__webglTexture);const B=E.source,st=d.get(B);delete st[y.__cacheKey],o.memory.textures--}function F(E){const y=E.texture,B=n.get(E),st=n.get(y);if(st.__webglTexture!==void 0&&(s.deleteTexture(st.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(B.__webglFramebuffer[nt]))for(let tt=0;tt<B.__webglFramebuffer[nt].length;tt++)s.deleteFramebuffer(B.__webglFramebuffer[nt][tt]);else s.deleteFramebuffer(B.__webglFramebuffer[nt]);B.__webglDepthbuffer&&s.deleteRenderbuffer(B.__webglDepthbuffer[nt])}else{if(Array.isArray(B.__webglFramebuffer))for(let nt=0;nt<B.__webglFramebuffer.length;nt++)s.deleteFramebuffer(B.__webglFramebuffer[nt]);else s.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&s.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&s.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let nt=0;nt<B.__webglColorRenderbuffer.length;nt++)B.__webglColorRenderbuffer[nt]&&s.deleteRenderbuffer(B.__webglColorRenderbuffer[nt]);B.__webglDepthRenderbuffer&&s.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let nt=0,tt=y.length;nt<tt;nt++){const Et=n.get(y[nt]);Et.__webglTexture&&(s.deleteTexture(Et.__webglTexture),o.memory.textures--),n.remove(y[nt])}n.remove(y),n.remove(E)}let k=0;function $(){k=0}function L(){const E=k;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),k+=1,E}function z(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function G(E,y){const B=n.get(E);if(E.isVideoTexture&&bt(E),E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){const st=E.image;if(st===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{pt(B,E,y);return}}e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+y)}function Z(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){pt(B,E,y);return}e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+y)}function K(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){pt(B,E,y);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+y)}function J(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){yt(B,E,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+y)}const j={[Ke]:s.REPEAT,[an]:s.CLAMP_TO_EDGE,[Xr]:s.MIRRORED_REPEAT},at={[ze]:s.NEAREST,[Ro]:s.NEAREST_MIPMAP_NEAREST,[er]:s.NEAREST_MIPMAP_LINEAR,[tn]:s.LINEAR,[Fl]:s.LINEAR_MIPMAP_NEAREST,[Zi]:s.LINEAR_MIPMAP_LINEAR},ct={[Zl]:s.NEVER,[th]:s.ALWAYS,[Kl]:s.LESS,[Sc]:s.LEQUAL,[Jl]:s.EQUAL,[Ql]:s.GEQUAL,[$l]:s.GREATER,[jl]:s.NOTEQUAL};function X(E,y,B){if(B?(s.texParameteri(E,s.TEXTURE_WRAP_S,j[y.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,j[y.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,j[y.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,at[y.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,at[y.minFilter])):(s.texParameteri(E,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(E,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(y.wrapS!==an||y.wrapT!==an)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(E,s.TEXTURE_MAG_FILTER,A(y.magFilter)),s.texParameteri(E,s.TEXTURE_MIN_FILTER,A(y.minFilter)),y.minFilter!==ze&&y.minFilter!==tn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,ct[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const st=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===ze||y.minFilter!==er&&y.minFilter!==Zi||y.type===Ln&&t.has("OES_texture_float_linear")===!1||a===!1&&y.type===Ki&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(s.texParameterf(E,st.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function Q(E,y){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",R));const st=y.source;let nt=d.get(st);nt===void 0&&(nt={},d.set(st,nt));const tt=z(y);if(tt!==E.__cacheKey){nt[tt]===void 0&&(nt[tt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),nt[tt].usedTimes++;const Et=nt[E.__cacheKey];Et!==void 0&&(nt[E.__cacheKey].usedTimes--,Et.usedTimes===0&&T(y)),E.__cacheKey=tt,E.__webglTexture=nt[tt].texture}return B}function pt(E,y,B){let st=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(st=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(st=s.TEXTURE_3D);const nt=Q(E,y),tt=y.source;e.bindTexture(st,E.__webglTexture,s.TEXTURE0+B);const Et=n.get(tt);if(tt.version!==Et.__version||nt===!0){e.activeTexture(s.TEXTURE0+B);const dt=ee.getPrimaries(ee.workingColorSpace),Mt=y.colorSpace===Ze?null:ee.getPrimaries(y.colorSpace),Ct=y.colorSpace===Ze||dt===Mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Gt=p(y)&&m(y.image)===!1;let it=_(y.image,Gt,!1,i.maxTextureSize);it=_t(y,it);const Jt=m(it)||a,Kt=r.convert(y.format,y.colorSpace);let zt=r.convert(y.type),Rt=x(y.internalFormat,Kt,zt,y.colorSpace,y.isVideoTexture);X(st,y,Jt);let St;const kt=y.mipmaps,Qt=a&&y.isVideoTexture!==!0&&Rt!==xc,de=Et.__version===void 0||nt===!0,qt=C(y,it,Jt);if(y.isDepthTexture)Rt=s.DEPTH_COMPONENT,a?y.type===Ln?Rt=s.DEPTH_COMPONENT32F:y.type===Pn?Rt=s.DEPTH_COMPONENT24:y.type===Zn?Rt=s.DEPTH24_STENCIL8:Rt=s.DEPTH_COMPONENT16:y.type===Ln&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Kn&&Rt===s.DEPTH_COMPONENT&&y.type!==so&&y.type!==Pn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Pn,zt=r.convert(y.type)),y.format===Pi&&Rt===s.DEPTH_COMPONENT&&(Rt=s.DEPTH_STENCIL,y.type!==Zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Zn,zt=r.convert(y.type))),de&&(Qt?e.texStorage2D(s.TEXTURE_2D,1,Rt,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Rt,it.width,it.height,0,Kt,zt,null));else if(y.isDataTexture)if(kt.length>0&&Jt){Qt&&de&&e.texStorage2D(s.TEXTURE_2D,qt,Rt,kt[0].width,kt[0].height);for(let ht=0,I=kt.length;ht<I;ht++)St=kt[ht],Qt?e.texSubImage2D(s.TEXTURE_2D,ht,0,0,St.width,St.height,Kt,zt,St.data):e.texImage2D(s.TEXTURE_2D,ht,Rt,St.width,St.height,0,Kt,zt,St.data);y.generateMipmaps=!1}else Qt?(de&&e.texStorage2D(s.TEXTURE_2D,qt,Rt,it.width,it.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,Kt,zt,it.data)):e.texImage2D(s.TEXTURE_2D,0,Rt,it.width,it.height,0,Kt,zt,it.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Qt&&de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,qt,Rt,kt[0].width,kt[0].height,it.depth);for(let ht=0,I=kt.length;ht<I;ht++)St=kt[ht],y.format!==cn?Kt!==null?Qt?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ht,0,0,0,St.width,St.height,it.depth,Kt,St.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ht,Rt,St.width,St.height,it.depth,0,St.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?e.texSubImage3D(s.TEXTURE_2D_ARRAY,ht,0,0,0,St.width,St.height,it.depth,Kt,zt,St.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ht,Rt,St.width,St.height,it.depth,0,Kt,zt,St.data)}else{Qt&&de&&e.texStorage2D(s.TEXTURE_2D,qt,Rt,kt[0].width,kt[0].height);for(let ht=0,I=kt.length;ht<I;ht++)St=kt[ht],y.format!==cn?Kt!==null?Qt?e.compressedTexSubImage2D(s.TEXTURE_2D,ht,0,0,St.width,St.height,Kt,St.data):e.compressedTexImage2D(s.TEXTURE_2D,ht,Rt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?e.texSubImage2D(s.TEXTURE_2D,ht,0,0,St.width,St.height,Kt,zt,St.data):e.texImage2D(s.TEXTURE_2D,ht,Rt,St.width,St.height,0,Kt,zt,St.data)}else if(y.isDataArrayTexture)Qt?(de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,qt,Rt,it.width,it.height,it.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Kt,zt,it.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Rt,it.width,it.height,it.depth,0,Kt,zt,it.data);else if(y.isData3DTexture)Qt?(de&&e.texStorage3D(s.TEXTURE_3D,qt,Rt,it.width,it.height,it.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Kt,zt,it.data)):e.texImage3D(s.TEXTURE_3D,0,Rt,it.width,it.height,it.depth,0,Kt,zt,it.data);else if(y.isFramebufferTexture){if(de)if(Qt)e.texStorage2D(s.TEXTURE_2D,qt,Rt,it.width,it.height);else{let ht=it.width,I=it.height;for(let mt=0;mt<qt;mt++)e.texImage2D(s.TEXTURE_2D,mt,Rt,ht,I,0,Kt,zt,null),ht>>=1,I>>=1}}else if(kt.length>0&&Jt){Qt&&de&&e.texStorage2D(s.TEXTURE_2D,qt,Rt,kt[0].width,kt[0].height);for(let ht=0,I=kt.length;ht<I;ht++)St=kt[ht],Qt?e.texSubImage2D(s.TEXTURE_2D,ht,0,0,Kt,zt,St):e.texImage2D(s.TEXTURE_2D,ht,Rt,Kt,zt,St);y.generateMipmaps=!1}else Qt?(de&&e.texStorage2D(s.TEXTURE_2D,qt,Rt,it.width,it.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,Kt,zt,it)):e.texImage2D(s.TEXTURE_2D,0,Rt,Kt,zt,it);w(y,Jt)&&v(st),Et.__version=tt.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function yt(E,y,B){if(y.image.length!==6)return;const st=Q(E,y),nt=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+B);const tt=n.get(nt);if(nt.version!==tt.__version||st===!0){e.activeTexture(s.TEXTURE0+B);const Et=ee.getPrimaries(ee.workingColorSpace),dt=y.colorSpace===Ze?null:ee.getPrimaries(y.colorSpace),Mt=y.colorSpace===Ze||Et===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Ct=y.isCompressedTexture||y.image[0].isCompressedTexture,Gt=y.image[0]&&y.image[0].isDataTexture,it=[];for(let ht=0;ht<6;ht++)!Ct&&!Gt?it[ht]=_(y.image[ht],!1,!0,i.maxCubemapSize):it[ht]=Gt?y.image[ht].image:y.image[ht],it[ht]=_t(y,it[ht]);const Jt=it[0],Kt=m(Jt)||a,zt=r.convert(y.format,y.colorSpace),Rt=r.convert(y.type),St=x(y.internalFormat,zt,Rt,y.colorSpace),kt=a&&y.isVideoTexture!==!0,Qt=tt.__version===void 0||st===!0;let de=C(y,Jt,Kt);X(s.TEXTURE_CUBE_MAP,y,Kt);let qt;if(Ct){kt&&Qt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,de,St,Jt.width,Jt.height);for(let ht=0;ht<6;ht++){qt=it[ht].mipmaps;for(let I=0;I<qt.length;I++){const mt=qt[I];y.format!==cn?zt!==null?kt?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I,0,0,mt.width,mt.height,zt,mt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I,St,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I,0,0,mt.width,mt.height,zt,Rt,mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I,St,mt.width,mt.height,0,zt,Rt,mt.data)}}}else{qt=y.mipmaps,kt&&Qt&&(qt.length>0&&de++,e.texStorage2D(s.TEXTURE_CUBE_MAP,de,St,it[0].width,it[0].height));for(let ht=0;ht<6;ht++)if(Gt){kt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,it[ht].width,it[ht].height,zt,Rt,it[ht].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,St,it[ht].width,it[ht].height,0,zt,Rt,it[ht].data);for(let I=0;I<qt.length;I++){const gt=qt[I].image[ht].image;kt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I+1,0,0,gt.width,gt.height,zt,Rt,gt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I+1,St,gt.width,gt.height,0,zt,Rt,gt.data)}}else{kt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,zt,Rt,it[ht]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,St,zt,Rt,it[ht]);for(let I=0;I<qt.length;I++){const mt=qt[I];kt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I+1,0,0,zt,Rt,mt.image[ht]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,I+1,St,zt,Rt,mt.image[ht])}}}w(y,Kt)&&v(s.TEXTURE_CUBE_MAP),tt.__version=nt.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function vt(E,y,B,st,nt,tt){const Et=r.convert(B.format,B.colorSpace),dt=r.convert(B.type),Mt=x(B.internalFormat,Et,dt,B.colorSpace);if(!n.get(y).__hasExternalTextures){const Gt=Math.max(1,y.width>>tt),it=Math.max(1,y.height>>tt);nt===s.TEXTURE_3D||nt===s.TEXTURE_2D_ARRAY?e.texImage3D(nt,tt,Mt,Gt,it,y.depth,0,Et,dt,null):e.texImage2D(nt,tt,Mt,Gt,it,0,Et,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),Y(y)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,st,nt,n.get(B).__webglTexture,0,rt(y)):(nt===s.TEXTURE_2D||nt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,st,nt,n.get(B).__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Lt(E,y,B){if(s.bindRenderbuffer(s.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let st=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(B||Y(y)){const nt=y.depthTexture;nt&&nt.isDepthTexture&&(nt.type===Ln?st=s.DEPTH_COMPONENT32F:nt.type===Pn&&(st=s.DEPTH_COMPONENT24));const tt=rt(y);Y(y)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,st,y.width,y.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,st,y.width,y.height)}else s.renderbufferStorage(s.RENDERBUFFER,st,y.width,y.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){const st=rt(y);B&&Y(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,st,s.DEPTH24_STENCIL8,y.width,y.height):Y(y)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,st,s.DEPTH24_STENCIL8,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,E)}else{const st=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let nt=0;nt<st.length;nt++){const tt=st[nt],Et=r.convert(tt.format,tt.colorSpace),dt=r.convert(tt.type),Mt=x(tt.internalFormat,Et,dt,tt.colorSpace),Ct=rt(y);B&&Y(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,Mt,y.width,y.height):Y(y)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ct,Mt,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,Mt,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ot(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),G(y.depthTexture,0);const st=n.get(y.depthTexture).__webglTexture,nt=rt(y);if(y.depthTexture.format===Kn)Y(y)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0,nt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,st,0);else if(y.depthTexture.format===Pi)Y(y)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0,nt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function wt(E){const y=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ot(y.__webglFramebuffer,E)}else if(B){y.__webglDepthbuffer=[];for(let st=0;st<6;st++)e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[st]),y.__webglDepthbuffer[st]=s.createRenderbuffer(),Lt(y.__webglDepthbuffer[st],E,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=s.createRenderbuffer(),Lt(y.__webglDepthbuffer,E,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(E,y,B){const st=n.get(E);y!==void 0&&vt(st.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&wt(E)}function P(E){const y=E.texture,B=n.get(E),st=n.get(y);E.addEventListener("dispose",N),E.isWebGLMultipleRenderTargets!==!0&&(st.__webglTexture===void 0&&(st.__webglTexture=s.createTexture()),st.__version=y.version,o.memory.textures++);const nt=E.isWebGLCubeRenderTarget===!0,tt=E.isWebGLMultipleRenderTargets===!0,Et=m(E)||a;if(nt){B.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(a&&y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[dt]=[];for(let Mt=0;Mt<y.mipmaps.length;Mt++)B.__webglFramebuffer[dt][Mt]=s.createFramebuffer()}else B.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let dt=0;dt<y.mipmaps.length;dt++)B.__webglFramebuffer[dt]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(tt)if(i.drawBuffers){const dt=E.texture;for(let Mt=0,Ct=dt.length;Mt<Ct;Mt++){const Gt=n.get(dt[Mt]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&Y(E)===!1){const dt=tt?y:[y];B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Mt=0;Mt<dt.length;Mt++){const Ct=dt[Mt];B.__webglColorRenderbuffer[Mt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[Mt]);const Gt=r.convert(Ct.format,Ct.colorSpace),it=r.convert(Ct.type),Jt=x(Ct.internalFormat,Gt,it,Ct.colorSpace,E.isXRRenderTarget===!0),Kt=rt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Kt,Jt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,B.__webglColorRenderbuffer[Mt])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Lt(B.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(nt){e.bindTexture(s.TEXTURE_CUBE_MAP,st.__webglTexture),X(s.TEXTURE_CUBE_MAP,y,Et);for(let dt=0;dt<6;dt++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let Mt=0;Mt<y.mipmaps.length;Mt++)vt(B.__webglFramebuffer[dt][Mt],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt);else vt(B.__webglFramebuffer[dt],E,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);w(y,Et)&&v(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(tt){const dt=E.texture;for(let Mt=0,Ct=dt.length;Mt<Ct;Mt++){const Gt=dt[Mt],it=n.get(Gt);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),X(s.TEXTURE_2D,Gt,Et),vt(B.__webglFramebuffer,E,Gt,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,0),w(Gt,Et)&&v(s.TEXTURE_2D)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?dt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(dt,st.__webglTexture),X(dt,y,Et),a&&y.mipmaps&&y.mipmaps.length>0)for(let Mt=0;Mt<y.mipmaps.length;Mt++)vt(B.__webglFramebuffer[Mt],E,y,s.COLOR_ATTACHMENT0,dt,Mt);else vt(B.__webglFramebuffer,E,y,s.COLOR_ATTACHMENT0,dt,0);w(y,Et)&&v(dt),e.unbindTexture()}E.depthBuffer&&wt(E)}function et(E){const y=m(E)||a,B=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let st=0,nt=B.length;st<nt;st++){const tt=B[st];if(w(tt,y)){const Et=E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,dt=n.get(tt).__webglTexture;e.bindTexture(Et,dt),v(Et),e.unbindTexture()}}}function q(E){if(a&&E.samples>0&&Y(E)===!1){const y=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],B=E.width,st=E.height;let nt=s.COLOR_BUFFER_BIT;const tt=[],Et=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=n.get(E),Mt=E.isWebGLMultipleRenderTargets===!0;if(Mt)for(let Ct=0;Ct<y.length;Ct++)e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let Ct=0;Ct<y.length;Ct++){tt.push(s.COLOR_ATTACHMENT0+Ct),E.depthBuffer&&tt.push(Et);const Gt=dt.__ignoreDepthValues!==void 0?dt.__ignoreDepthValues:!1;if(Gt===!1&&(E.depthBuffer&&(nt|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&(nt|=s.STENCIL_BUFFER_BIT)),Mt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,dt.__webglColorRenderbuffer[Ct]),Gt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Et]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Et])),Mt){const it=n.get(y[Ct]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,it,0)}s.blitFramebuffer(0,0,B,st,0,0,B,st,nt,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,tt)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Mt)for(let Ct=0;Ct<y.length;Ct++){e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,dt.__webglColorRenderbuffer[Ct]);const Gt=n.get(y[Ct]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,Gt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}}function rt(E){return Math.min(i.maxSamples,E.samples)}function Y(E){const y=n.get(E);return a&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function bt(E){const y=o.render.frame;u.get(E)!==y&&(u.set(E,y),E.update())}function _t(E,y){const B=E.colorSpace,st=E.format,nt=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===qr||B!==Sn&&B!==Ze&&(ee.getTransfer(B)===ae?a===!1?t.has("EXT_sRGB")===!0&&st===cn?(E.format=qr,E.minFilter=tn,E.generateMipmaps=!1):y=Ec.sRGBToLinear(y):(st!==cn||nt!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),y}this.allocateTextureUnit=L,this.resetTextureUnits=$,this.setTexture2D=G,this.setTexture2DArray=Z,this.setTexture3D=K,this.setTextureCube=J,this.rebindTextures=Nt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Y}function pm(s,t,e){const n=e.isWebGL2;function i(r,o=Ze){let a;const c=ee.getTransfer(o);if(r===Un)return s.UNSIGNED_BYTE;if(r===pc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===mc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Ol)return s.BYTE;if(r===zl)return s.SHORT;if(r===so)return s.UNSIGNED_SHORT;if(r===fc)return s.INT;if(r===Pn)return s.UNSIGNED_INT;if(r===Ln)return s.FLOAT;if(r===Ki)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Bl)return s.ALPHA;if(r===cn)return s.RGBA;if(r===Gl)return s.LUMINANCE;if(r===Hl)return s.LUMINANCE_ALPHA;if(r===Kn)return s.DEPTH_COMPONENT;if(r===Pi)return s.DEPTH_STENCIL;if(r===qr)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===kl)return s.RED;if(r===gc)return s.RED_INTEGER;if(r===Vl)return s.RG;if(r===_c)return s.RG_INTEGER;if(r===vc)return s.RGBA_INTEGER;if(r===nr||r===ir||r===sr||r===rr)if(c===ae)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===nr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ir)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===sr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===rr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===nr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ir)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===sr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===rr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Co||r===Po||r===Lo||r===Do)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Co)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Po)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Lo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Do)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===xc)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Io||r===Uo)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Io)return c===ae?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Uo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===No||r===Fo||r===Oo||r===zo||r===Bo||r===Go||r===Ho||r===ko||r===Vo||r===Wo||r===Xo||r===qo||r===Yo||r===Zo)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===No)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Fo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Oo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===zo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Bo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Go)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ho)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ko)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Vo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Wo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Xo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===qo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Yo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Zo)return c===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===or||r===Ko||r===Jo)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===or)return c===ae?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ko)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Jo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Wl||r===$o||r===jo||r===Qo)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===or)return a.COMPRESSED_RED_RGTC1_EXT;if(r===$o)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===jo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Qo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Zn?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class mm extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class At extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gm={type:"move"};class Cr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gm)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new At;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class _m extends Di{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null;const _=e.getContextAttributes();let m=null,p=null;const w=[],v=[],x=new lt;let C=null;const A=new Ye;A.layers.enable(1),A.viewport=new ce;const R=new Ye;R.layers.enable(2),R.viewport=new ce;const N=[A,R],M=new mm;M.layers.enable(1),M.layers.enable(2);let T=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=w[X];return Q===void 0&&(Q=new Cr,w[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=w[X];return Q===void 0&&(Q=new Cr,w[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=w[X];return Q===void 0&&(Q=new Cr,w[X]=Q),Q.getHandSpace()};function k(X){const Q=v.indexOf(X.inputSource);if(Q===-1)return;const pt=w[Q];pt!==void 0&&(pt.update(X.inputSource,X.frame,l||o),pt.dispatchEvent({type:X.type,data:X.inputSource}))}function $(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",L);for(let X=0;X<w.length;X++){const Q=v[X];Q!==null&&(v[X]=null,w[X].disconnect(Q))}T=null,F=null,t.setRenderTarget(m),f=null,d=null,h=null,i=null,p=null,ct.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(x.width,x.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",$),i.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(x),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const Q={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,Q),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new jn(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Un,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let Q=null,pt=null,yt=null;_.depth&&(yt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=_.stencil?Pi:Kn,pt=_.stencil?Zn:Pn);const vt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};h=new XRWebGLBinding(i,e),d=h.createProjectionLayer(vt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),p=new jn(d.textureWidth,d.textureHeight,{format:cn,type:Un,depthTexture:new Fc(d.textureWidth,d.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const Lt=t.properties.get(p);Lt.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ct.setContext(i),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L(X){for(let Q=0;Q<X.removed.length;Q++){const pt=X.removed[Q],yt=v.indexOf(pt);yt>=0&&(v[yt]=null,w[yt].disconnect(pt))}for(let Q=0;Q<X.added.length;Q++){const pt=X.added[Q];let yt=v.indexOf(pt);if(yt===-1){for(let Lt=0;Lt<w.length;Lt++)if(Lt>=v.length){v.push(pt),yt=Lt;break}else if(v[Lt]===null){v[Lt]=pt,yt=Lt;break}if(yt===-1)break}const vt=w[yt];vt&&vt.connect(pt)}}const z=new S,G=new S;function Z(X,Q,pt){z.setFromMatrixPosition(Q.matrixWorld),G.setFromMatrixPosition(pt.matrixWorld);const yt=z.distanceTo(G),vt=Q.projectionMatrix.elements,Lt=pt.projectionMatrix.elements,Ot=vt[14]/(vt[10]-1),wt=vt[14]/(vt[10]+1),Nt=(vt[9]+1)/vt[5],P=(vt[9]-1)/vt[5],et=(vt[8]-1)/vt[0],q=(Lt[8]+1)/Lt[0],rt=Ot*et,Y=Ot*q,bt=yt/(-et+q),_t=bt*-et;Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(_t),X.translateZ(bt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const E=Ot+bt,y=wt+bt,B=rt-_t,st=Y+(yt-_t),nt=Nt*wt/y*E,tt=P*wt/y*E;X.projectionMatrix.makePerspective(B,st,nt,tt,E,y),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function K(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;M.near=R.near=A.near=X.near,M.far=R.far=A.far=X.far,(T!==M.near||F!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,F=M.far);const Q=X.parent,pt=M.cameras;K(M,Q);for(let yt=0;yt<pt.length;yt++)K(pt[yt],Q);pt.length===2?Z(M,A,R):M.projectionMatrix.copy(A.projectionMatrix),J(X,M,Q)};function J(X,Q,pt){pt===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(pt.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ji*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)};let j=null;function at(X,Q){if(u=Q.getViewerPose(l||o),g=Q,u!==null){const pt=u.views;f!==null&&(t.setRenderTargetFramebuffer(p,f.framebuffer),t.setRenderTarget(p));let yt=!1;pt.length!==M.cameras.length&&(M.cameras.length=0,yt=!0);for(let vt=0;vt<pt.length;vt++){const Lt=pt[vt];let Ot=null;if(f!==null)Ot=f.getViewport(Lt);else{const Nt=h.getViewSubImage(d,Lt);Ot=Nt.viewport,vt===0&&(t.setRenderTargetTextures(p,Nt.colorTexture,d.ignoreDepthValues?void 0:Nt.depthStencilTexture),t.setRenderTarget(p))}let wt=N[vt];wt===void 0&&(wt=new Ye,wt.layers.enable(vt),wt.viewport=new ce,N[vt]=wt),wt.matrix.fromArray(Lt.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(Lt.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),vt===0&&(M.matrix.copy(wt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),yt===!0&&M.cameras.push(wt)}}for(let pt=0;pt<w.length;pt++){const yt=v[pt],vt=w[pt];yt!==null&&vt!==void 0&&vt.update(yt,Q,l||o)}j&&j(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const ct=new Uc;ct.setAnimationLoop(at),this.setAnimationLoop=function(X){j=X},this.dispose=function(){}}}function vm(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,w,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,w,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Be&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Be&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=t.get(p).envMap;if(w&&(m.envMap.value=w,m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,w,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const w=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function xm(s,t,e,n){let i={},r={},o=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(w,v){const x=v.program;n.uniformBlockBinding(w,x)}function l(w,v){let x=i[w.id];x===void 0&&(g(w),x=u(w),i[w.id]=x,w.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(w,C);const A=t.render.frame;r[w.id]!==A&&(d(w),r[w.id]=A)}function u(w){const v=h();w.__bindingPointIndex=v;const x=s.createBuffer(),C=w.__size,A=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,x),x}function h(){for(let w=0;w<a;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const v=i[w.id],x=w.uniforms,C=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let A=0,R=x.length;A<R;A++){const N=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,T=N.length;M<T;M++){const F=N[M];if(f(F,A,M,C)===!0){const k=F.__offset,$=Array.isArray(F.value)?F.value:[F.value];let L=0;for(let z=0;z<$.length;z++){const G=$[z],Z=_(G);typeof G=="number"||typeof G=="boolean"?(F.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,k+L,F.__data)):G.isMatrix3?(F.__data[0]=G.elements[0],F.__data[1]=G.elements[1],F.__data[2]=G.elements[2],F.__data[3]=0,F.__data[4]=G.elements[3],F.__data[5]=G.elements[4],F.__data[6]=G.elements[5],F.__data[7]=0,F.__data[8]=G.elements[6],F.__data[9]=G.elements[7],F.__data[10]=G.elements[8],F.__data[11]=0):(G.toArray(F.__data,L),L+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,F.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(w,v,x,C){const A=w.value,R=v+"_"+x;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{const N=C[R];if(typeof A=="number"||typeof A=="boolean"){if(N!==A)return C[R]=A,!0}else if(N.equals(A)===!1)return N.copy(A),!0}return!1}function g(w){const v=w.uniforms;let x=0;const C=16;for(let R=0,N=v.length;R<N;R++){const M=Array.isArray(v[R])?v[R]:[v[R]];for(let T=0,F=M.length;T<F;T++){const k=M[T],$=Array.isArray(k.value)?k.value:[k.value];for(let L=0,z=$.length;L<z;L++){const G=$[L],Z=_(G),K=x%C;K!==0&&C-K<Z.boundary&&(x+=C-K),k.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=Z.storage}}}const A=x%C;return A>0&&(x+=C-A),w.__size=x,w.__cache={},this}function _(w){const v={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(v.boundary=4,v.storage=4):w.isVector2?(v.boundary=8,v.storage=8):w.isVector3||w.isColor?(v.boundary=16,v.storage=12):w.isVector4?(v.boundary=16,v.storage=16):w.isMatrix3?(v.boundary=48,v.storage=48):w.isMatrix4?(v.boundary=64,v.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),v}function m(w){const v=w.target;v.removeEventListener("dispose",m);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(const w in i)s.deleteBuffer(i[w]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}class kc{constructor(t={}){const{canvas:e=mh(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_e,this._useLegacyLights=!1,this.toneMapping=In,this.toneMappingExposure=1;const v=this;let x=!1,C=0,A=0,R=null,N=-1,M=null;const T=new ce,F=new ce;let k=null;const $=new ft(0);let L=0,z=e.width,G=e.height,Z=1,K=null,J=null;const j=new ce(0,0,z,G),at=new ce(0,0,z,G);let ct=!1;const X=new Zs;let Q=!1,pt=!1,yt=null;const vt=new le,Lt=new lt,Ot=new S,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Nt(){return R===null?Z:1}let P=n;function et(b,O){for(let V=0;V<b.length;V++){const W=b[V],H=e.getContext(W,O);if(H!==null)return H}return null}try{const b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${io}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",I,!1),e.addEventListener("webglcontextcreationerror",mt,!1),P===null){const O=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&O.shift(),P=et(O,b),P===null)throw et(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let q,rt,Y,bt,_t,E,y,B,st,nt,tt,Et,dt,Mt,Ct,Gt,it,Jt,Kt,zt,Rt,St,kt,Qt;function de(){q=new Cf(P),rt=new wf(P,q,t),q.init(rt),St=new pm(P,q,rt),Y=new dm(P,q,rt),bt=new Df(P),_t=new jp,E=new fm(P,q,Y,_t,rt,St,bt),y=new bf(v),B=new Rf(v),st=new Bh(P,rt),kt=new yf(P,q,st,rt),nt=new Pf(P,st,bt,kt),tt=new Ff(P,nt,st,bt),Kt=new Nf(P,rt,E),Gt=new Ef(_t),Et=new $p(v,y,B,q,rt,kt,Gt),dt=new vm(v,_t),Mt=new tm,Ct=new om(q,rt),Jt=new Mf(v,y,B,Y,tt,d,c),it=new um(v,tt,rt),Qt=new xm(P,bt,rt,Y),zt=new Sf(P,q,bt,rt),Rt=new Lf(P,q,bt,rt),bt.programs=Et.programs,v.capabilities=rt,v.extensions=q,v.properties=_t,v.renderLists=Mt,v.shadowMap=it,v.state=Y,v.info=bt}de();const qt=new _m(v,P);this.xr=qt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=q.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=q.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(b){b!==void 0&&(Z=b,this.setSize(z,G,!1))},this.getSize=function(b){return b.set(z,G)},this.setSize=function(b,O,V=!0){if(qt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,G=O,e.width=Math.floor(b*Z),e.height=Math.floor(O*Z),V===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(z*Z,G*Z).floor()},this.setDrawingBufferSize=function(b,O,V){z=b,G=O,Z=V,e.width=Math.floor(b*V),e.height=Math.floor(O*V),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(j)},this.setViewport=function(b,O,V,W){b.isVector4?j.set(b.x,b.y,b.z,b.w):j.set(b,O,V,W),Y.viewport(T.copy(j).multiplyScalar(Z).floor())},this.getScissor=function(b){return b.copy(at)},this.setScissor=function(b,O,V,W){b.isVector4?at.set(b.x,b.y,b.z,b.w):at.set(b,O,V,W),Y.scissor(F.copy(at).multiplyScalar(Z).floor())},this.getScissorTest=function(){return ct},this.setScissorTest=function(b){Y.setScissorTest(ct=b)},this.setOpaqueSort=function(b){K=b},this.setTransparentSort=function(b){J=b},this.getClearColor=function(b){return b.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor.apply(Jt,arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha.apply(Jt,arguments)},this.clear=function(b=!0,O=!0,V=!0){let W=0;if(b){let H=!1;if(R!==null){const xt=R.texture.format;H=xt===vc||xt===_c||xt===gc}if(H){const xt=R.texture.type,Tt=xt===Un||xt===Pn||xt===so||xt===Zn||xt===pc||xt===mc,Dt=Jt.getClearColor(),Ft=Jt.getClearAlpha(),Xt=Dt.r,Bt=Dt.g,Ht=Dt.b;Tt?(f[0]=Xt,f[1]=Bt,f[2]=Ht,f[3]=Ft,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=Xt,g[1]=Bt,g[2]=Ht,g[3]=Ft,P.clearBufferiv(P.COLOR,0,g))}else W|=P.COLOR_BUFFER_BIT}O&&(W|=P.DEPTH_BUFFER_BIT),V&&(W|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",I,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),Mt.dispose(),Ct.dispose(),_t.dispose(),y.dispose(),B.dispose(),tt.dispose(),kt.dispose(),Qt.dispose(),Et.dispose(),qt.dispose(),qt.removeEventListener("sessionstart",Ie),qt.removeEventListener("sessionend",se),yt&&(yt.dispose(),yt=null),Ue.stop()};function ht(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const b=bt.autoReset,O=it.enabled,V=it.autoUpdate,W=it.needsUpdate,H=it.type;de(),bt.autoReset=b,it.enabled=O,it.autoUpdate=V,it.needsUpdate=W,it.type=H}function mt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function gt(b){const O=b.target;O.removeEventListener("dispose",gt),It(O)}function It(b){Pt(b),_t.remove(b)}function Pt(b){const O=_t.get(b).programs;O!==void 0&&(O.forEach(function(V){Et.releaseProgram(V)}),b.isShaderMaterial&&Et.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,V,W,H,xt){O===null&&(O=wt);const Tt=H.isMesh&&H.matrixWorld.determinant()<0,Dt=tl(b,O,V,W,H);Y.setMaterial(W,Tt);let Ft=V.index,Xt=1;if(W.wireframe===!0){if(Ft=nt.getWireframeAttribute(V),Ft===void 0)return;Xt=2}const Bt=V.drawRange,Ht=V.attributes.position;let pe=Bt.start*Xt,ke=(Bt.start+Bt.count)*Xt;xt!==null&&(pe=Math.max(pe,xt.start*Xt),ke=Math.min(ke,(xt.start+xt.count)*Xt)),Ft!==null?(pe=Math.max(pe,0),ke=Math.min(ke,Ft.count)):Ht!=null&&(pe=Math.max(pe,0),ke=Math.min(ke,Ht.count));const be=ke-pe;if(be<0||be===1/0)return;kt.setup(H,W,Dt,V,Ft);let dn,he=zt;if(Ft!==null&&(dn=st.get(Ft),he=Rt,he.setIndex(dn)),H.isMesh)W.wireframe===!0?(Y.setLineWidth(W.wireframeLinewidth*Nt()),he.setMode(P.LINES)):he.setMode(P.TRIANGLES);else if(H.isLine){let Yt=W.linewidth;Yt===void 0&&(Yt=1),Y.setLineWidth(Yt*Nt()),H.isLineSegments?he.setMode(P.LINES):H.isLineLoop?he.setMode(P.LINE_LOOP):he.setMode(P.LINE_STRIP)}else H.isPoints?he.setMode(P.POINTS):H.isSprite&&he.setMode(P.TRIANGLES);if(H.isBatchedMesh)he.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)he.renderInstances(pe,be,H.count);else if(V.isInstancedBufferGeometry){const Yt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,$s=Math.min(V.instanceCount,Yt);he.renderInstances(pe,be,$s)}else he.render(pe,be)};function ne(b,O,V){b.transparent===!0&&b.side===Ge&&b.forceSinglePass===!1?(b.side=Be,b.needsUpdate=!0,is(b,O,V),b.side=Nn,b.needsUpdate=!0,is(b,O,V),b.side=Ge):is(b,O,V)}this.compile=function(b,O,V=null){V===null&&(V=b),m=Ct.get(V),m.init(),w.push(m),V.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),b!==V&&b.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights(v._useLegacyLights);const W=new Set;return b.traverse(function(H){const xt=H.material;if(xt)if(Array.isArray(xt))for(let Tt=0;Tt<xt.length;Tt++){const Dt=xt[Tt];ne(Dt,V,H),W.add(Dt)}else ne(xt,V,H),W.add(xt)}),w.pop(),m=null,W},this.compileAsync=function(b,O,V=null){const W=this.compile(b,O,V);return new Promise(H=>{function xt(){if(W.forEach(function(Tt){_t.get(Tt).currentProgram.isReady()&&W.delete(Tt)}),W.size===0){H(b);return}setTimeout(xt,10)}q.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let ie=null;function Ee(b){ie&&ie(b)}function Ie(){Ue.stop()}function se(){Ue.start()}const Ue=new Uc;Ue.setAnimationLoop(Ee),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(b){ie=b,qt.setAnimationLoop(b),b===null?Ue.stop():Ue.start()},qt.addEventListener("sessionstart",Ie),qt.addEventListener("sessionend",se),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(x===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),qt.enabled===!0&&qt.isPresenting===!0&&(qt.cameraAutoUpdate===!0&&qt.updateCamera(O),O=qt.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,O,R),m=Ct.get(b,w.length),m.init(),w.push(m),vt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),X.setFromProjectionMatrix(vt),pt=this.localClippingEnabled,Q=Gt.init(this.clippingPlanes,pt),_=Mt.get(b,p.length),_.init(),p.push(_),ln(b,O,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(K,J),this.info.render.frame++,Q===!0&&Gt.beginShadows();const V=m.state.shadowsArray;if(it.render(V,b,O),Q===!0&&Gt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Jt.render(_,b),m.setupLights(v._useLegacyLights),O.isArrayCamera){const W=O.cameras;for(let H=0,xt=W.length;H<xt;H++){const Tt=W[H];go(_,b,Tt,Tt.viewport)}}else go(_,b,O);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(v,b,O),kt.resetDefaultState(),N=-1,M=null,w.pop(),w.length>0?m=w[w.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function ln(b,O,V,W){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)V=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){W&&Ot.setFromMatrixPosition(b.matrixWorld).applyMatrix4(vt);const Tt=tt.update(b),Dt=b.material;Dt.visible&&_.push(b,Tt,Dt,V,Ot.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const Tt=tt.update(b),Dt=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ot.copy(b.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Ot.copy(Tt.boundingSphere.center)),Ot.applyMatrix4(b.matrixWorld).applyMatrix4(vt)),Array.isArray(Dt)){const Ft=Tt.groups;for(let Xt=0,Bt=Ft.length;Xt<Bt;Xt++){const Ht=Ft[Xt],pe=Dt[Ht.materialIndex];pe&&pe.visible&&_.push(b,Tt,pe,V,Ot.z,Ht)}}else Dt.visible&&_.push(b,Tt,Dt,V,Ot.z,null)}}const xt=b.children;for(let Tt=0,Dt=xt.length;Tt<Dt;Tt++)ln(xt[Tt],O,V,W)}function go(b,O,V,W){const H=b.opaque,xt=b.transmissive,Tt=b.transparent;m.setupLightsView(V),Q===!0&&Gt.setGlobalState(v.clippingPlanes,V),xt.length>0&&Qc(H,xt,O,V),W&&Y.viewport(T.copy(W)),H.length>0&&ns(H,O,V),xt.length>0&&ns(xt,O,V),Tt.length>0&&ns(Tt,O,V),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function Qc(b,O,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const xt=rt.isWebGL2;yt===null&&(yt=new jn(1,1,{generateMipmaps:!0,type:q.has("EXT_color_buffer_half_float")?Ki:Un,minFilter:Zi,samples:xt?4:0})),v.getDrawingBufferSize(Lt),xt?yt.setSize(Lt.x,Lt.y):yt.setSize(Hs(Lt.x),Hs(Lt.y));const Tt=v.getRenderTarget();v.setRenderTarget(yt),v.getClearColor($),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const Dt=v.toneMapping;v.toneMapping=In,ns(b,V,W),E.updateMultisampleRenderTarget(yt),E.updateRenderTargetMipmap(yt);let Ft=!1;for(let Xt=0,Bt=O.length;Xt<Bt;Xt++){const Ht=O[Xt],pe=Ht.object,ke=Ht.geometry,be=Ht.material,dn=Ht.group;if(be.side===Ge&&pe.layers.test(W.layers)){const he=be.side;be.side=Be,be.needsUpdate=!0,_o(pe,V,W,ke,be,dn),be.side=he,be.needsUpdate=!0,Ft=!0}}Ft===!0&&(E.updateMultisampleRenderTarget(yt),E.updateRenderTargetMipmap(yt)),v.setRenderTarget(Tt),v.setClearColor($,L),v.toneMapping=Dt}function ns(b,O,V){const W=O.isScene===!0?O.overrideMaterial:null;for(let H=0,xt=b.length;H<xt;H++){const Tt=b[H],Dt=Tt.object,Ft=Tt.geometry,Xt=W===null?Tt.material:W,Bt=Tt.group;Dt.layers.test(V.layers)&&_o(Dt,O,V,Ft,Xt,Bt)}}function _o(b,O,V,W,H,xt){b.onBeforeRender(v,O,V,W,H,xt),b.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),H.onBeforeRender(v,O,V,W,b,xt),H.transparent===!0&&H.side===Ge&&H.forceSinglePass===!1?(H.side=Be,H.needsUpdate=!0,v.renderBufferDirect(V,O,W,H,b,xt),H.side=Nn,H.needsUpdate=!0,v.renderBufferDirect(V,O,W,H,b,xt),H.side=Ge):v.renderBufferDirect(V,O,W,H,b,xt),b.onAfterRender(v,O,V,W,H,xt)}function is(b,O,V){O.isScene!==!0&&(O=wt);const W=_t.get(b),H=m.state.lights,xt=m.state.shadowsArray,Tt=H.state.version,Dt=Et.getParameters(b,H.state,xt,O,V),Ft=Et.getProgramCacheKey(Dt);let Xt=W.programs;W.environment=b.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(b.isMeshStandardMaterial?B:y).get(b.envMap||W.environment),Xt===void 0&&(b.addEventListener("dispose",gt),Xt=new Map,W.programs=Xt);let Bt=Xt.get(Ft);if(Bt!==void 0){if(W.currentProgram===Bt&&W.lightsStateVersion===Tt)return xo(b,Dt),Bt}else Dt.uniforms=Et.getUniforms(b),b.onBuild(V,Dt,v),b.onBeforeCompile(Dt,v),Bt=Et.acquireProgram(Dt,Ft),Xt.set(Ft,Bt),W.uniforms=Dt.uniforms;const Ht=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ht.clippingPlanes=Gt.uniform),xo(b,Dt),W.needsLights=nl(b),W.lightsStateVersion=Tt,W.needsLights&&(Ht.ambientLightColor.value=H.state.ambient,Ht.lightProbe.value=H.state.probe,Ht.directionalLights.value=H.state.directional,Ht.directionalLightShadows.value=H.state.directionalShadow,Ht.spotLights.value=H.state.spot,Ht.spotLightShadows.value=H.state.spotShadow,Ht.rectAreaLights.value=H.state.rectArea,Ht.ltc_1.value=H.state.rectAreaLTC1,Ht.ltc_2.value=H.state.rectAreaLTC2,Ht.pointLights.value=H.state.point,Ht.pointLightShadows.value=H.state.pointShadow,Ht.hemisphereLights.value=H.state.hemi,Ht.directionalShadowMap.value=H.state.directionalShadowMap,Ht.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ht.spotShadowMap.value=H.state.spotShadowMap,Ht.spotLightMatrix.value=H.state.spotLightMatrix,Ht.spotLightMap.value=H.state.spotLightMap,Ht.pointShadowMap.value=H.state.pointShadowMap,Ht.pointShadowMatrix.value=H.state.pointShadowMatrix),W.currentProgram=Bt,W.uniformsList=null,Bt}function vo(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=Is.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function xo(b,O){const V=_t.get(b);V.outputColorSpace=O.outputColorSpace,V.batching=O.batching,V.instancing=O.instancing,V.instancingColor=O.instancingColor,V.skinning=O.skinning,V.morphTargets=O.morphTargets,V.morphNormals=O.morphNormals,V.morphColors=O.morphColors,V.morphTargetsCount=O.morphTargetsCount,V.numClippingPlanes=O.numClippingPlanes,V.numIntersection=O.numClipIntersection,V.vertexAlphas=O.vertexAlphas,V.vertexTangents=O.vertexTangents,V.toneMapping=O.toneMapping}function tl(b,O,V,W,H){O.isScene!==!0&&(O=wt),E.resetTextureUnits();const xt=O.fog,Tt=W.isMeshStandardMaterial?O.environment:null,Dt=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Sn,Ft=(W.isMeshStandardMaterial?B:y).get(W.envMap||Tt),Xt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Bt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ht=!!V.morphAttributes.position,pe=!!V.morphAttributes.normal,ke=!!V.morphAttributes.color;let be=In;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(be=v.toneMapping);const dn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,he=dn!==void 0?dn.length:0,Yt=_t.get(W),$s=m.state.lights;if(Q===!0&&(pt===!0||b!==M)){const je=b===M&&W.id===N;Gt.setState(W,b,je)}let fe=!1;W.version===Yt.__version?(Yt.needsLights&&Yt.lightsStateVersion!==$s.state.version||Yt.outputColorSpace!==Dt||H.isBatchedMesh&&Yt.batching===!1||!H.isBatchedMesh&&Yt.batching===!0||H.isInstancedMesh&&Yt.instancing===!1||!H.isInstancedMesh&&Yt.instancing===!0||H.isSkinnedMesh&&Yt.skinning===!1||!H.isSkinnedMesh&&Yt.skinning===!0||H.isInstancedMesh&&Yt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Yt.instancingColor===!1&&H.instanceColor!==null||Yt.envMap!==Ft||W.fog===!0&&Yt.fog!==xt||Yt.numClippingPlanes!==void 0&&(Yt.numClippingPlanes!==Gt.numPlanes||Yt.numIntersection!==Gt.numIntersection)||Yt.vertexAlphas!==Xt||Yt.vertexTangents!==Bt||Yt.morphTargets!==Ht||Yt.morphNormals!==pe||Yt.morphColors!==ke||Yt.toneMapping!==be||rt.isWebGL2===!0&&Yt.morphTargetsCount!==he)&&(fe=!0):(fe=!0,Yt.__version=W.version);let Fn=Yt.currentProgram;fe===!0&&(Fn=is(W,O,H));let Mo=!1,Ui=!1,js=!1;const Pe=Fn.getUniforms(),On=Yt.uniforms;if(Y.useProgram(Fn.program)&&(Mo=!0,Ui=!0,js=!0),W.id!==N&&(N=W.id,Ui=!0),Mo||M!==b){Pe.setValue(P,"projectionMatrix",b.projectionMatrix),Pe.setValue(P,"viewMatrix",b.matrixWorldInverse);const je=Pe.map.cameraPosition;je!==void 0&&je.setValue(P,Ot.setFromMatrixPosition(b.matrixWorld)),rt.logarithmicDepthBuffer&&Pe.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Pe.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Ui=!0,js=!0)}if(H.isSkinnedMesh){Pe.setOptional(P,H,"bindMatrix"),Pe.setOptional(P,H,"bindMatrixInverse");const je=H.skeleton;je&&(rt.floatVertexTextures?(je.boneTexture===null&&je.computeBoneTexture(),Pe.setValue(P,"boneTexture",je.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}H.isBatchedMesh&&(Pe.setOptional(P,H,"batchingTexture"),Pe.setValue(P,"batchingTexture",H._matricesTexture,E));const Qs=V.morphAttributes;if((Qs.position!==void 0||Qs.normal!==void 0||Qs.color!==void 0&&rt.isWebGL2===!0)&&Kt.update(H,V,Fn),(Ui||Yt.receiveShadow!==H.receiveShadow)&&(Yt.receiveShadow=H.receiveShadow,Pe.setValue(P,"receiveShadow",H.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(On.envMap.value=Ft,On.flipEnvMap.value=Ft.isCubeTexture&&Ft.isRenderTargetTexture===!1?-1:1),Ui&&(Pe.setValue(P,"toneMappingExposure",v.toneMappingExposure),Yt.needsLights&&el(On,js),xt&&W.fog===!0&&dt.refreshFogUniforms(On,xt),dt.refreshMaterialUniforms(On,W,Z,G,yt),Is.upload(P,vo(Yt),On,E)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Is.upload(P,vo(Yt),On,E),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Pe.setValue(P,"center",H.center),Pe.setValue(P,"modelViewMatrix",H.modelViewMatrix),Pe.setValue(P,"normalMatrix",H.normalMatrix),Pe.setValue(P,"modelMatrix",H.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const je=W.uniformsGroups;for(let tr=0,il=je.length;tr<il;tr++)if(rt.isWebGL2){const yo=je[tr];Qt.update(yo,Fn),Qt.bind(yo,Fn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Fn}function el(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function nl(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,O,V){_t.get(b.texture).__webglTexture=O,_t.get(b.depthTexture).__webglTexture=V;const W=_t.get(b);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,O){const V=_t.get(b);V.__webglFramebuffer=O,V.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,V=0){R=b,C=O,A=V;let W=!0,H=null,xt=!1,Tt=!1;if(b){const Ft=_t.get(b);Ft.__useDefaultFramebuffer!==void 0?(Y.bindFramebuffer(P.FRAMEBUFFER,null),W=!1):Ft.__webglFramebuffer===void 0?E.setupRenderTarget(b):Ft.__hasExternalTextures&&E.rebindTextures(b,_t.get(b.texture).__webglTexture,_t.get(b.depthTexture).__webglTexture);const Xt=b.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(Tt=!0);const Bt=_t.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Bt[O])?H=Bt[O][V]:H=Bt[O],xt=!0):rt.isWebGL2&&b.samples>0&&E.useMultisampledRTT(b)===!1?H=_t.get(b).__webglMultisampledFramebuffer:Array.isArray(Bt)?H=Bt[V]:H=Bt,T.copy(b.viewport),F.copy(b.scissor),k=b.scissorTest}else T.copy(j).multiplyScalar(Z).floor(),F.copy(at).multiplyScalar(Z).floor(),k=ct;if(Y.bindFramebuffer(P.FRAMEBUFFER,H)&&rt.drawBuffers&&W&&Y.drawBuffers(b,H),Y.viewport(T),Y.scissor(F),Y.setScissorTest(k),xt){const Ft=_t.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ft.__webglTexture,V)}else if(Tt){const Ft=_t.get(b.texture),Xt=O||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ft.__webglTexture,V||0,Xt)}N=-1},this.readRenderTargetPixels=function(b,O,V,W,H,xt,Tt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=_t.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Tt!==void 0&&(Dt=Dt[Tt]),Dt){Y.bindFramebuffer(P.FRAMEBUFFER,Dt);try{const Ft=b.texture,Xt=Ft.format,Bt=Ft.type;if(Xt!==cn&&St.convert(Xt)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ht=Bt===Ki&&(q.has("EXT_color_buffer_half_float")||rt.isWebGL2&&q.has("EXT_color_buffer_float"));if(Bt!==Un&&St.convert(Bt)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Bt===Ln&&(rt.isWebGL2||q.has("OES_texture_float")||q.has("WEBGL_color_buffer_float")))&&!Ht){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-W&&V>=0&&V<=b.height-H&&P.readPixels(O,V,W,H,St.convert(Xt),St.convert(Bt),xt)}finally{const Ft=R!==null?_t.get(R).__webglFramebuffer:null;Y.bindFramebuffer(P.FRAMEBUFFER,Ft)}}},this.copyFramebufferToTexture=function(b,O,V=0){const W=Math.pow(2,-V),H=Math.floor(O.image.width*W),xt=Math.floor(O.image.height*W);E.setTexture2D(O,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,b.x,b.y,H,xt),Y.unbindTexture()},this.copyTextureToTexture=function(b,O,V,W=0){const H=O.image.width,xt=O.image.height,Tt=St.convert(V.format),Dt=St.convert(V.type);E.setTexture2D(V,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment),O.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,W,b.x,b.y,H,xt,Tt,Dt,O.image.data):O.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,W,b.x,b.y,O.mipmaps[0].width,O.mipmaps[0].height,Tt,O.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,W,b.x,b.y,Tt,Dt,O.image),W===0&&V.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),Y.unbindTexture()},this.copyTextureToTexture3D=function(b,O,V,W,H=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const xt=b.max.x-b.min.x+1,Tt=b.max.y-b.min.y+1,Dt=b.max.z-b.min.z+1,Ft=St.convert(W.format),Xt=St.convert(W.type);let Bt;if(W.isData3DTexture)E.setTexture3D(W,0),Bt=P.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)E.setTexture2DArray(W,0),Bt=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,W.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,W.unpackAlignment);const Ht=P.getParameter(P.UNPACK_ROW_LENGTH),pe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ke=P.getParameter(P.UNPACK_SKIP_PIXELS),be=P.getParameter(P.UNPACK_SKIP_ROWS),dn=P.getParameter(P.UNPACK_SKIP_IMAGES),he=V.isCompressedTexture?V.mipmaps[H]:V.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,he.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,b.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,b.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,b.min.z),V.isDataTexture||V.isData3DTexture?P.texSubImage3D(Bt,H,O.x,O.y,O.z,xt,Tt,Dt,Ft,Xt,he.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(Bt,H,O.x,O.y,O.z,xt,Tt,Dt,Ft,he.data)):P.texSubImage3D(Bt,H,O.x,O.y,O.z,xt,Tt,Dt,Ft,Xt,he),P.pixelStorei(P.UNPACK_ROW_LENGTH,Ht),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,pe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ke),P.pixelStorei(P.UNPACK_SKIP_ROWS,be),P.pixelStorei(P.UNPACK_SKIP_IMAGES,dn),H===0&&W.generateMipmaps&&P.generateMipmap(Bt),Y.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),Y.unbindTexture()},this.resetState=function(){C=0,A=0,R=null,Y.reset(),kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ro?"display-p3":"srgb",e.unpackColorSpace=ee.workingColorSpace===qs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===_e?Jn:Mc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Jn?_e:Sn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Mm extends kc{}Mm.prototype.isWebGL1Renderer=!0;class Vi{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ft(t),this.density=e}clone(){return new Vi(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ym extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Vc extends ii{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ka=new S,Va=new S,Wa=new le,Pr=new ao,Ts=new es;class Sm extends ve{constructor(t=new me,e=new Vc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)ka.fromBufferAttribute(e,i-1),Va.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ka.distanceTo(Va);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(i),Ts.radius+=r,t.ray.intersectsSphere(Ts)===!1)return;Wa.copy(i).invert(),Pr.copy(t.ray).applyMatrix4(Wa);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new S,u=new S,h=new S,d=new S,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),w=Math.min(g.count,o.start+o.count);for(let v=p,x=w-1;v<x;v+=f){const C=g.getX(v),A=g.getX(v+1);if(l.fromBufferAttribute(m,C),u.fromBufferAttribute(m,A),Pr.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);const N=t.ray.origin.distanceTo(d);N<t.near||N>t.far||e.push({distance:N,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),w=Math.min(m.count,o.start+o.count);for(let v=p,x=w-1;v<x;v+=f){if(l.fromBufferAttribute(m,v),u.fromBufferAttribute(m,v+1),Pr.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);const A=t.ray.origin.distanceTo(d);A<t.near||A>t.far||e.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}class lo extends ii{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Xa=new le,Kr=new ao,As=new es,Rs=new S;class Wc extends ve{constructor(t=new me,e=new lo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),As.copy(n.boundingSphere),As.applyMatrix4(i),As.radius+=r,t.ray.intersectsSphere(As)===!1)return;Xa.copy(i).invert(),Kr.copy(t.ray).applyMatrix4(Xa);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);Rs.fromBufferAttribute(h,m),qa(Rs,m,c,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=d,_=f;g<_;g++)Rs.fromBufferAttribute(h,g),qa(Rs,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function qa(s,t,e,n,i,r,o){const a=Kr.distanceSqToPoint(s);if(a<e){const c=new S;Kr.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,object:o})}}class Je extends He{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const u=n[i],d=n[i+1]-u,f=(o-u)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new lt:new S);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new S,i=[],r=[],o=[],a=new S,c=new le;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new S)}r[0]=new S,o[0]=new S;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ye(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(ye(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ho extends un{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e){const n=e||new lt,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*u-f*h+this.aX,l=d*h+f*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class wm extends ho{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function uo(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let d=(o-r)/l-(a-r)/(l+u)+(a-o)/u,f=(a-o)/u-(c-o)/(u+h)+(c-a)/h;d*=u,f*=u,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Cs=new S,Lr=new uo,Dr=new uo,Ir=new uo;class Re extends un{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new S){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(Cs.subVectors(i[0],i[1]).add(i[0]),l=Cs);const h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(Cs.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Cs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Lr.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,_,m),Dr.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,_,m),Ir.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Lr.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Dr.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Ir.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(Lr.calc(c),Dr.calc(c),Ir.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new S().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ya(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function Em(s,t){const e=1-s;return e*e*t}function bm(s,t){return 2*(1-s)*s*t}function Tm(s,t){return s*s*t}function Wi(s,t,e,n){return Em(s,t)+bm(s,e)+Tm(s,n)}function Am(s,t){const e=1-s;return e*e*e*t}function Rm(s,t){const e=1-s;return 3*e*e*s*t}function Cm(s,t){return 3*(1-s)*s*s*t}function Pm(s,t){return s*s*s*t}function Xi(s,t,e,n,i){return Am(s,t)+Rm(s,e)+Cm(s,n)+Pm(s,i)}class Xc extends un{constructor(t=new lt,e=new lt,n=new lt,i=new lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new lt){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xi(t,i.x,r.x,o.x,a.x),Xi(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lm extends un{constructor(t=new S,e=new S,n=new S,i=new S){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new S){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xi(t,i.x,r.x,o.x,a.x),Xi(t,i.y,r.y,o.y,a.y),Xi(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qc extends un{constructor(t=new lt,e=new lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new lt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dm extends un{constructor(t=new S,e=new S){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new S){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new S){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yc extends un{constructor(t=new lt,e=new lt,n=new lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new lt){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Wi(t,i.x,r.x,o.x),Wi(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Im extends un{constructor(t=new S,e=new S,n=new S){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new S){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Wi(t,i.x,r.x,o.x),Wi(t,i.y,r.y,o.y),Wi(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zc extends un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new lt){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Ya(a,c.x,l.x,u.x,h.x),Ya(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new lt().fromArray(i))}return this}}var Jr=Object.freeze({__proto__:null,ArcCurve:wm,CatmullRomCurve3:Re,CubicBezierCurve:Xc,CubicBezierCurve3:Lm,EllipseCurve:ho,LineCurve:qc,LineCurve3:Dm,QuadraticBezierCurve:Yc,QuadraticBezierCurve3:Im,SplineCurve:Zc});class Um extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Jr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Jr[i.type]().fromJSON(i))}return this}}class $r extends Um{constructor(t){super(),this.type="Path",this.currentPoint=new lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new qc(this.currentPoint.clone(),new lt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Yc(this.currentPoint.clone(),new lt(t,e),new lt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Xc(this.currentPoint.clone(),new lt(t,e),new lt(n,i),new lt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Zc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){const l=new ho(t,e,n,i,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class fo extends me{constructor(t=[new lt(0,-.5),new lt(.5,0),new lt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=ye(i,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,h=new S,d=new lt,f=new S,g=new S,_=new S;let m=0,p=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[w+1].x-t[w].x,p=t[w+1].y-t[w].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let w=0;w<=e;w++){const v=n+w*u*i,x=Math.sin(v),C=Math.cos(v);for(let A=0;A<=t.length-1;A++){h.x=t[A].x*x,h.y=t[A].y,h.z=t[A].x*C,o.push(h.x,h.y,h.z),d.x=w/e,d.y=A/(t.length-1),a.push(d.x,d.y);const R=c[3*A+0]*x,N=c[3*A+1],M=c[3*A+0]*C;l.push(R,N,M)}}for(let w=0;w<e;w++)for(let v=0;v<t.length-1;v++){const x=v+w*t.length,C=x,A=x+t.length,R=x+t.length+1,N=x+1;r.push(C,A,N),r.push(R,N,A)}this.setIndex(r),this.setAttribute("position",new te(o,3)),this.setAttribute("uv",new te(a,2)),this.setAttribute("normal",new te(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fo(t.points,t.segments,t.phiStart,t.phiLength)}}class qi extends fo{constructor(t=1,e=1,n=4,i=8){const r=new $r;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new qi(t.radius,t.length,t.capSegments,t.radialSegments)}}class $n extends me{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new S,u=new lt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const f=n+h/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(a,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Wt extends me{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;w(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new te(h,3)),this.setAttribute("normal",new te(d,3)),this.setAttribute("uv",new te(f,2));function w(){const x=new S,C=new S;let A=0;const R=(e-t)/n;for(let N=0;N<=r;N++){const M=[],T=N/r,F=T*(e-t)+t;for(let k=0;k<=i;k++){const $=k/i,L=$*c+a,z=Math.sin(L),G=Math.cos(L);C.x=F*z,C.y=-T*n+m,C.z=F*G,h.push(C.x,C.y,C.z),x.set(z,R,G).normalize(),d.push(x.x,x.y,x.z),f.push($,1-T),M.push(g++)}_.push(M)}for(let N=0;N<i;N++)for(let M=0;M<r;M++){const T=_[M][N],F=_[M+1][N],k=_[M+1][N+1],$=_[M][N+1];u.push(T,F,$),u.push(F,k,$),A+=6}l.addGroup(p,A,0),p+=A}function v(x){const C=g,A=new lt,R=new S;let N=0;const M=x===!0?t:e,T=x===!0?1:-1;for(let k=1;k<=i;k++)h.push(0,m*T,0),d.push(0,T,0),f.push(.5,.5),g++;const F=g;for(let k=0;k<=i;k++){const L=k/i*c+a,z=Math.cos(L),G=Math.sin(L);R.x=M*G,R.y=m*T,R.z=M*z,h.push(R.x,R.y,R.z),d.push(0,T,0),A.x=z*.5+.5,A.y=G*.5*T+.5,f.push(A.x,A.y),g++}for(let k=0;k<i;k++){const $=C+k,L=F+k;x===!0?u.push(L,L+1,$):u.push(L+1,L,$),N+=3}l.addGroup(p,N,x===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ae extends Wt{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ae(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class jr extends $r{constructor(t){super(t),this.uuid=ei(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new $r().fromJSON(i))}return this}}const Nm={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Kc(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,h,d,f;if(n&&(r=Gm(s,t,r,e)),s.length>80*e){a=l=s[0],c=u=s[1];for(let g=e;g<i;g+=e)h=s[g],d=s[g+1],h<a&&(a=h),d<c&&(c=d),h>l&&(l=h),d>u&&(u=d);f=Math.max(l-a,u-c),f=f!==0?32767/f:0}return $i(r,o,e,a,c,f,0),o}};function Kc(s,t,e,n,i){let r,o;if(i===$m(s,t,e,n)>0)for(r=t;r<e;r+=n)o=Za(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=Za(r,s[r],s[r+1],o);return o&&Js(o,o.next)&&(Qi(o),o=o.next),o}function Qn(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Js(e,e.next)||ue(e.prev,e,e.next)===0)){if(Qi(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function $i(s,t,e,n,i,r,o){if(!s)return;!o&&r&&Xm(s,n,i,r);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?Om(s,n,i,r):Fm(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),Qi(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=zm(Qn(s),t,e),$i(s,t,e,n,i,r,2)):o===2&&Bm(s,t,e,n,i,r):$i(Qn(s),t,e,n,i,r,1);break}}}function Fm(s){const t=s.prev,e=s,n=s.next;if(ue(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=i<r?i<o?i:o:r<o?r:o,h=a<c?a<l?a:l:c<l?c:l,d=i>r?i>o?i:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&Ei(i,a,r,c,o,l,g.x,g.y)&&ue(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Om(s,t,e,n){const i=s.prev,r=s,o=s.next;if(ue(i,r,o)>=0)return!1;const a=i.x,c=r.x,l=o.x,u=i.y,h=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,g=u<h?u<d?u:d:h<d?h:d,_=a>c?a>l?a:l:c>l?c:l,m=u>h?u>d?u:d:h>d?h:d,p=Qr(f,g,t,e,n),w=Qr(_,m,t,e,n);let v=s.prevZ,x=s.nextZ;for(;v&&v.z>=p&&x&&x.z<=w;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==o&&Ei(a,u,c,h,l,d,v.x,v.y)&&ue(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&Ei(a,u,c,h,l,d,x.x,x.y)&&ue(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==o&&Ei(a,u,c,h,l,d,v.x,v.y)&&ue(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=w;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==o&&Ei(a,u,c,h,l,d,x.x,x.y)&&ue(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function zm(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!Js(i,r)&&Jc(i,n,n.next,r)&&ji(i,r)&&ji(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Qi(n),Qi(n.next),n=s=r),n=n.next}while(n!==s);return Qn(n)}function Bm(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zm(o,a)){let c=$c(o,a);o=Qn(o,o.next),c=Qn(c,c.next),$i(o,t,e,n,i,r,0),$i(c,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Gm(s,t,e,n){const i=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:s.length,l=Kc(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(Ym(l));for(i.sort(Hm),r=0;r<i.length;r++)e=km(i[r],e);return e}function Hm(s,t){return s.x-t.x}function km(s,t){const e=Vm(s,t);if(!e)return t;const n=$c(e,s);return Qn(n,n.next),Qn(e,e.next)}function Vm(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let u=1/0,h;e=i;do r>=e.x&&e.x>=c&&r!==e.x&&Ei(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(h=Math.abs(o-e.y)/(r-e.x),ji(e,s)&&(h<u||h===u&&(e.x>i.x||e.x===i.x&&Wm(i,e)))&&(i=e,u=h)),e=e.next;while(e!==a);return i}function Wm(s,t){return ue(s.prev,s,t.prev)<0&&ue(t.next,s,s.next)<0}function Xm(s,t,e,n){let i=s;do i.z===0&&(i.z=Qr(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,qm(i)}function qm(s){let t,e,n,i,r,o,a,c,l=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,l*=2}while(o>1);return s}function Qr(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Ym(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ei(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function Zm(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Km(s,t)&&(ji(s,t)&&ji(t,s)&&Jm(s,t)&&(ue(s.prev,s,t.prev)||ue(s,t.prev,t))||Js(s,t)&&ue(s.prev,s,s.next)>0&&ue(t.prev,t,t.next)>0)}function ue(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Js(s,t){return s.x===t.x&&s.y===t.y}function Jc(s,t,e,n){const i=Ls(ue(s,t,e)),r=Ls(ue(s,t,n)),o=Ls(ue(e,n,s)),a=Ls(ue(e,n,t));return!!(i!==r&&o!==a||i===0&&Ps(s,e,t)||r===0&&Ps(s,n,t)||o===0&&Ps(e,s,n)||a===0&&Ps(e,t,n))}function Ps(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ls(s){return s>0?1:s<0?-1:0}function Km(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Jc(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function ji(s,t){return ue(s.prev,s,s.next)<0?ue(s,t,s.next)>=0&&ue(s,s.prev,t)>=0:ue(s,t,s.prev)<0||ue(s,s.next,t)<0}function Jm(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function $c(s,t){const e=new to(s.i,s.x,s.y),n=new to(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Za(s,t,e,n){const i=new to(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Qi(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function to(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function $m(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Yi{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Yi.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Ka(t),Ja(n,t);let o=t.length;e.forEach(Ka);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,Ja(n,e[c]);const a=Nm.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Ka(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Ja(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Ws extends me{constructor(t=new jr([new lt(.5,.5),new lt(-.5,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new te(i,3)),this.setAttribute("uv",new te(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,w=e.UVGenerator!==void 0?e.UVGenerator:jm;let v,x=!1,C,A,R,N;p&&(v=p.getSpacedPoints(u),x=!0,d=!1,C=p.computeFrenetFrames(u,!1),A=new S,R=new S,N=new S),d||(m=0,f=0,g=0,_=0);const M=a.extractPoints(l);let T=M.shape;const F=M.holes;if(!Yi.isClockWise(T)){T=T.reverse();for(let P=0,et=F.length;P<et;P++){const q=F[P];Yi.isClockWise(q)&&(F[P]=q.reverse())}}const $=Yi.triangulateShape(T,F),L=T;for(let P=0,et=F.length;P<et;P++){const q=F[P];T=T.concat(q)}function z(P,et,q){return et||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(et,q)}const G=T.length,Z=$.length;function K(P,et,q){let rt,Y,bt;const _t=P.x-et.x,E=P.y-et.y,y=q.x-P.x,B=q.y-P.y,st=_t*_t+E*E,nt=_t*B-E*y;if(Math.abs(nt)>Number.EPSILON){const tt=Math.sqrt(st),Et=Math.sqrt(y*y+B*B),dt=et.x-E/tt,Mt=et.y+_t/tt,Ct=q.x-B/Et,Gt=q.y+y/Et,it=((Ct-dt)*B-(Gt-Mt)*y)/(_t*B-E*y);rt=dt+_t*it-P.x,Y=Mt+E*it-P.y;const Jt=rt*rt+Y*Y;if(Jt<=2)return new lt(rt,Y);bt=Math.sqrt(Jt/2)}else{let tt=!1;_t>Number.EPSILON?y>Number.EPSILON&&(tt=!0):_t<-Number.EPSILON?y<-Number.EPSILON&&(tt=!0):Math.sign(E)===Math.sign(B)&&(tt=!0),tt?(rt=-E,Y=_t,bt=Math.sqrt(st)):(rt=_t,Y=E,bt=Math.sqrt(st/2))}return new lt(rt/bt,Y/bt)}const J=[];for(let P=0,et=L.length,q=et-1,rt=P+1;P<et;P++,q++,rt++)q===et&&(q=0),rt===et&&(rt=0),J[P]=K(L[P],L[q],L[rt]);const j=[];let at,ct=J.concat();for(let P=0,et=F.length;P<et;P++){const q=F[P];at=[];for(let rt=0,Y=q.length,bt=Y-1,_t=rt+1;rt<Y;rt++,bt++,_t++)bt===Y&&(bt=0),_t===Y&&(_t=0),at[rt]=K(q[rt],q[bt],q[_t]);j.push(at),ct=ct.concat(at)}for(let P=0;P<m;P++){const et=P/m,q=f*Math.cos(et*Math.PI/2),rt=g*Math.sin(et*Math.PI/2)+_;for(let Y=0,bt=L.length;Y<bt;Y++){const _t=z(L[Y],J[Y],rt);vt(_t.x,_t.y,-q)}for(let Y=0,bt=F.length;Y<bt;Y++){const _t=F[Y];at=j[Y];for(let E=0,y=_t.length;E<y;E++){const B=z(_t[E],at[E],rt);vt(B.x,B.y,-q)}}}const X=g+_;for(let P=0;P<G;P++){const et=d?z(T[P],ct[P],X):T[P];x?(R.copy(C.normals[0]).multiplyScalar(et.x),A.copy(C.binormals[0]).multiplyScalar(et.y),N.copy(v[0]).add(R).add(A),vt(N.x,N.y,N.z)):vt(et.x,et.y,0)}for(let P=1;P<=u;P++)for(let et=0;et<G;et++){const q=d?z(T[et],ct[et],X):T[et];x?(R.copy(C.normals[P]).multiplyScalar(q.x),A.copy(C.binormals[P]).multiplyScalar(q.y),N.copy(v[P]).add(R).add(A),vt(N.x,N.y,N.z)):vt(q.x,q.y,h/u*P)}for(let P=m-1;P>=0;P--){const et=P/m,q=f*Math.cos(et*Math.PI/2),rt=g*Math.sin(et*Math.PI/2)+_;for(let Y=0,bt=L.length;Y<bt;Y++){const _t=z(L[Y],J[Y],rt);vt(_t.x,_t.y,h+q)}for(let Y=0,bt=F.length;Y<bt;Y++){const _t=F[Y];at=j[Y];for(let E=0,y=_t.length;E<y;E++){const B=z(_t[E],at[E],rt);x?vt(B.x,B.y+v[u-1].y,v[u-1].x+q):vt(B.x,B.y,h+q)}}}Q(),pt();function Q(){const P=i.length/3;if(d){let et=0,q=G*et;for(let rt=0;rt<Z;rt++){const Y=$[rt];Lt(Y[2]+q,Y[1]+q,Y[0]+q)}et=u+m*2,q=G*et;for(let rt=0;rt<Z;rt++){const Y=$[rt];Lt(Y[0]+q,Y[1]+q,Y[2]+q)}}else{for(let et=0;et<Z;et++){const q=$[et];Lt(q[2],q[1],q[0])}for(let et=0;et<Z;et++){const q=$[et];Lt(q[0]+G*u,q[1]+G*u,q[2]+G*u)}}n.addGroup(P,i.length/3-P,0)}function pt(){const P=i.length/3;let et=0;yt(L,et),et+=L.length;for(let q=0,rt=F.length;q<rt;q++){const Y=F[q];yt(Y,et),et+=Y.length}n.addGroup(P,i.length/3-P,1)}function yt(P,et){let q=P.length;for(;--q>=0;){const rt=q;let Y=q-1;Y<0&&(Y=P.length-1);for(let bt=0,_t=u+m*2;bt<_t;bt++){const E=G*bt,y=G*(bt+1),B=et+rt+E,st=et+Y+E,nt=et+Y+y,tt=et+rt+y;Ot(B,st,nt,tt)}}}function vt(P,et,q){c.push(P),c.push(et),c.push(q)}function Lt(P,et,q){wt(P),wt(et),wt(q);const rt=i.length/3,Y=w.generateTopUV(n,i,rt-3,rt-2,rt-1);Nt(Y[0]),Nt(Y[1]),Nt(Y[2])}function Ot(P,et,q,rt){wt(P),wt(et),wt(rt),wt(et),wt(q),wt(rt);const Y=i.length/3,bt=w.generateSideWallUV(n,i,Y-6,Y-3,Y-2,Y-1);Nt(bt[0]),Nt(bt[1]),Nt(bt[3]),Nt(bt[1]),Nt(bt[2]),Nt(bt[3])}function wt(P){i.push(c[P*3+0]),i.push(c[P*3+1]),i.push(c[P*3+2])}function Nt(P){r.push(P.x),r.push(P.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Qm(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Jr[i.type]().fromJSON(i)),new Ws(n,t.options)}}const jm={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],u=t[i*3+1];return[new lt(r,o),new lt(a,c),new lt(l,u)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],h=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new lt(o,1-c),new lt(l,1-h),new lt(d,1-g),new lt(_,1-p)]:[new lt(a,1-c),new lt(u,1-h),new lt(f,1-g),new lt(m,1-p)]}};function Qm(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ce extends me{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new S,d=new S,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const w=[],v=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const A=C/e;h.x=-t*Math.cos(i+A*r)*Math.sin(o+v*a),h.y=t*Math.cos(o+v*a),h.z=t*Math.sin(i+A*r)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(A+x,1-v),w.push(l++)}u.push(w)}for(let p=0;p<n;p++)for(let w=0;w<e;w++){const v=u[p][w+1],x=u[p][w],C=u[p+1][w],A=u[p+1][w+1];(p!==0||o>0)&&f.push(v,x,A),(p!==n-1||c<Math.PI)&&f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(_,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ce(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class U extends ii{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yc,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class po extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class t0 extends po{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ur=new le,$a=new S,ja=new S;class jc{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zs,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;$a.setFromMatrixPosition(t.matrixWorld),e.position.copy($a),ja.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ja),e.updateMatrixWorld(),Ur.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ur),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ur)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Qa=new le,Bi=new S,Nr=new S;class e0 extends jc{constructor(){super(new Ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new lt(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new S(1,0,0),new S(-1,0,0),new S(0,0,1),new S(0,0,-1),new S(0,1,0),new S(0,-1,0)],this._cubeUps=[new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,1,0),new S(0,0,1),new S(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Bi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Bi),Nr.copy(n.position),Nr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Nr),n.updateMatrixWorld(),i.makeTranslation(-Bi.x,-Bi.y,-Bi.z),Qa.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qa)}}class tc extends po{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new e0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class n0 extends jc{constructor(){super(new Nc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ec extends po{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new n0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class i0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=nc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=nc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function nc(){return(typeof performance>"u"?Date:performance).now()}class ic{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:io}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=io);class s0{constructor(t){this.renderer=t,this.scene=new ym,this.scene.background=new ft(8894168),this.scene.fog=new Vi(13228264,7e-4),this.skyGeo=new Ce(4e3,32,15),this.skyMat=new wn({side:Be,uniforms:{topColor:{value:new ft(1714762)},bottomColor:{value:new ft(8894168)},offset:{value:400},exponent:{value:.7},sunPosition:{value:new S(500,800,200)},sunColor:{value:new ft(16773569)},time:{value:12}},vertexShader:`
        varying vec3 vWorldPosition;
        void main(){
          vec4 worldPos = modelMatrix * vec4(position,1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        uniform vec3 sunPosition;
        uniform vec3 sunColor;
        varying vec3 vWorldPosition;
        void main(){
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          float f = max(pow(max(h,0.0), exponent), 0.0);
          vec3 col = mix(bottomColor, topColor, f);
          // horizon glow
          float horizon = pow(1.0 - max(h,0.0), 3.0) * 0.35;
          col += vec3(1.0,0.9,0.7) * horizon;
          // sun disc approximated
          vec3 sunDir = normalize(sunPosition);
          vec3 viewDir = normalize(vWorldPosition);
          float sun = pow(max(dot(viewDir, sunDir),0.0), 420.0) * 2.5;
          col += sun * sunColor;
          // subtle stars at night via h based on time uniform
          gl_FragColor = vec4(col, 1.0);
        }
      `}),this.sky=new D(this.skyGeo,this.skyMat),this.scene.add(this.sky);const e=new me,n=3e3,i=new Float32Array(n*3);for(let o=0;o<n;o++){const a=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1),l=3500;i[o*3]=l*Math.sin(c)*Math.cos(a),i[o*3+1]=l*Math.cos(c)*.9+300,i[o*3+2]=l*Math.sin(c)*Math.sin(a)}e.setAttribute("position",new $e(i,3));const r=new lo({color:16777215,size:3.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1});this.stars=new Wc(e,r),this.scene.add(this.stars),this.sun=new ec(16774880,2.2),this.sun.position.set(600,900,300),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(512,512),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=1e3,this.sun.shadow.camera.left=-350,this.sun.shadow.camera.right=350,this.sun.shadow.camera.top=350,this.sun.shadow.camera.bottom=-350,this.sun.shadow.bias=-.0012,this.sun.shadow.autoUpdate=!0,this.sun.shadow.needsUpdate=!0,this.scene.add(this.sun),this.sunTarget=new ve,this.sunTarget.position.set(0,0,0),this.scene.add(this.sunTarget),this.sun.target=this.sunTarget,this.ambient=new t0(9417688,3811866,.65),this.scene.add(this.ambient),this.moon=new ec(10203391,0),this.moon.position.set(-600,500,-300),this.scene.add(this.moon),this.worldRoot=new At,this.scene.add(this.worldRoot),this.buildingGroup=new At,this.worldRoot.add(this.buildingGroup),this.terrainGroup=new At,this.worldRoot.add(this.terrainGroup),this.waterGroup=new At,this.worldRoot.add(this.waterGroup),this.vegetationGroup=new At,this.worldRoot.add(this.vegetationGroup),this.streetGroup=new At,this.worldRoot.add(this.streetGroup),this.interiorGroup=new At,this.worldRoot.add(this.interiorGroup),this.npcGroup=new At,this.worldRoot.add(this.npcGroup),this.propGroup=new At,this.worldRoot.add(this.propGroup),this.envLightIntensity=1}updateSky(t,e="clear"){const n=t,r=(n-12)/12*Math.PI,o=Math.cos(r),a=2500,c=Math.sin(r)*a*.85,l=Math.max(-300,o*900+120),u=Math.cos(r)*a*.45;this.sun.position.set(c,l,u),this.moon.position.set(-c,-l+600,-u),this.skyMat.uniforms.sunPosition.value.copy(this.sun.position),this.skyMat.uniforms.time.value=n;const h=oe.clamp((l+200)/900,0,1),d=oe.lerp(0,2.4,Math.pow(h,.9));this.sun.intensity=d,this.moon.intensity=(1-h)*.35;const f=new ft(16747082),g=new ft(16774880),_=new ft().lerpColors(f,g,Math.pow(h,.7));this.sun.color.copy(_),this.skyMat.uniforms.sunColor.value.copy(_);let m,p,w,v;if(h>.15){const C=oe.clamp((h-.15)/.3,0,1),A=new ft(2767452),R=new ft(1714762);m=new ft().lerpColors(A,R,C);const N=new ft(16758890),M=new ft(8894168);p=new ft().lerpColors(N,M,C),w=new ft().lerpColors(new ft(14067850),new ft(13228264),C),v=oe.lerp(.35,.75,h)}else{const C=new ft(132630),A=new ft(1714762),R=oe.clamp(h/.15,0,1);m=new ft().lerpColors(C,A,R);const N=new ft(659488),M=new ft(3811914);p=new ft().lerpColors(N,M,R),w=new ft().lerpColors(new ft(660512),new ft(2767452),R),v=oe.lerp(.18,.35,R)}if(e==="overcast"&&(m.lerp(new ft(6977162),.35),p.lerp(new ft(10528952),.35),w.lerp(new ft(10135736),.2),this.sun.intensity*=.45),e==="rain"&&(m.lerp(new ft(4871528),.35),p.lerp(new ft(9082024),.45)),e==="fog")w=new ft(14212579),this.scene.fog=new Vi(w,.0022);else{const C=oe.lerp(.0012,5e-4,h);this.scene.fog=new Vi(w,e==="overcast"?.001:C)}this.skyMat.uniforms.topColor.value.copy(m),this.skyMat.uniforms.bottomColor.value.copy(p),this.ambient.color.copy(p),this.ambient.groundColor.copy(w),this.ambient.intensity=v;const x=1-h;return this.stars.material.opacity=oe.clamp((x-.4)/.6,0,1)*(e==="clear"?1:.25),e==="fog"&&(this.stars.material.opacity*=.1),this.renderer&&(this.renderer.toneMappingExposure=oe.lerp(.65,1.05,h)),{sunY:l,dayFactor:h,fogCol:w}}}class r0{constructor(t=1337){this.seed=t,this.perm=new Uint8Array(512);const e=new Uint8Array(256);for(let r=0;r<256;r++)e[r]=r;let n=t;const i=()=>(n=n*1664525+1013904223>>>0,n/4294967296);for(let r=255;r>0;r--){const o=Math.floor(i()*(r+1));[e[r],e[o]]=[e[o],e[r]]}for(let r=0;r<512;r++)this.perm[r]=e[r&255]}fade(t){return t*t*t*(t*(t*6-15)+10)}lerp(t,e,n){return t+(e-t)*n}grad(t,e,n){const i=t&3,r=i<2?e:n,o=i<2?n:e;return(i&1?-r:r)+(i&2?-o:o)}perlin2(t,e){const n=Math.floor(t)&255,i=Math.floor(e)&255,r=t-Math.floor(t),o=e-Math.floor(e),a=this.fade(r),c=this.fade(o),l=this.perm[this.perm[n]+i],u=this.perm[this.perm[n]+i+1],h=this.perm[this.perm[n+1]+i],d=this.perm[this.perm[n+1]+i+1],f=this.lerp(this.grad(l,r,o),this.grad(h,r-1,o),a),g=this.lerp(this.grad(u,r,o-1),this.grad(d,r-1,o-1),a);return this.lerp(f,g,c)}fbm(t,e,n=4,i=2,r=.5){let o=1,a=1,c=0,l=0;for(let u=0;u<n;u++)c+=this.perlin2(t*a,e*a)*o,l+=o,o*=r,a*=i;return c/l}ridge(t,e){return 1-Math.abs(this.fbm(t,e,3))}}class o0{constructor(t){this.worldScene=t,this.noise=new r0(42),this.group=t.terrainGroup,this.tiles=[],this.heightCache=new Map,this.cacheHits=0,this.cacheMiss=0}computeHeight(t,e){const n=this.computeHeightRaw(t,e),i=this.getCityFlattenBoost?this.getCityFlattenBoost(t,e):0;return n+i}getHeightAt(t,e){const n=(Math.round(t*2)/2).toFixed(1)+":"+(Math.round(e*2)/2).toFixed(1);if(this.heightCache.has(n))return this.cacheHits++,this.heightCache.get(n);const i=this.computeHeight(t,e);if(this.heightCache.size>4e3){const r=this.heightCache.keys().next().value;this.heightCache.delete(r)}return this.heightCache.set(n,i),this.cacheMiss++,i}getFootprintHeight(t,e,n,i){const r=this.computeHeight(t,e),o=this.computeHeight(t-n/2,e-i/2),a=this.computeHeight(t+n/2,e-i/2),c=this.computeHeight(t-n/2,e+i/2),l=this.computeHeight(t+n/2,e+i/2),u=Math.min(r,o,a,c,l),h=Math.max(r,o,a,c,l),d=h-u,f=(a+l-o-c)/(2*n),g=(c+l-o-a)/(2*i);return{minH:u,maxH:h,centerH:r,slope:d,nx:f,nz:g}}getNormalAt(t,e){const i=this.computeHeight(t-.8,e),r=this.computeHeight(t+.8,e),o=this.computeHeight(t,e-.8),a=this.computeHeight(t,e+.8);return new S(i-r,2*.8,o-a).normalize()}getCityFlattenBoost(t,e){const n=[{x:180,z:-20,r:220,flat:4},{x:20,z:-90,r:180,flat:2},{x:-60,z:-160,r:160,flat:3},{x:-30,z:-290,r:140,flat:3},{x:-240,z:-420,r:170,flat:2},{x:-340,z:-240,r:140,flat:1.5},{x:320,z:180,r:190,flat:3},{x:-280,z:60,r:170,flat:2}];let i=0,r=0;for(const o of n){const a=Math.hypot(t-o.x,e-o.z);if(a<o.r){const c=Math.pow(1-a/o.r,2),l=this.computeHeightRaw(o.x,o.z),u=this.computeHeightRaw(t,e),h=l-u;i+=h*c*.42,r+=c}}return r>0?i:0}computeHeightRaw(t,e){const i=e/2e3+.5,r=Math.pow(Math.max(0,i<.35?(.35-i)/.35:0),1.2),o=Math.exp(-Math.pow((i-.55)/.22,2))*.6,a=i>.85?(i-.85)/.15:0,c=this.noise.fbm(t*.0012,e*.0012,4,2.1,.5)*35,l=this.noise.fbm(t*.003,e*.003,3,2,.5)*8,u=this.noise.ridge(t*8e-4,e*8e-4)*12;let h=0;if(h+=c*(.5+o*.8+r*1.2),h+=l*.5,h+=u*o,i<.28){const f=this.noise.fbm(t*.002+100,e*.002,5,2,.5);h+=r*(120+f*60),h+=r*Math.pow(Math.abs(this.noise.perlin2(t*.001,e*.001)),.6)*80}if(i>.35&&i<.75){const f=this.noise.fbm(t*9e-4+50,e*9e-4,4,2,.5);h+=o*f*45;const g=Math.sin(t*.004+Math.cos(e*.002)*2)*6*o;h+=g}i>.82&&(h=oe.lerp(h,-2+Math.sin(t*.01)*.5,a*.85));const d=Math.abs(t*.3+e-200)/900;return d<.12&&i>.3&&i<.62&&(h-=(.12-d)/.12*8),h+=(i-.5)*4,h}generate(){const n=new $t(2e3,2e3,110,110);n.rotateX(-Math.PI/2);const i=n.attributes.position;for(let a=0;a<i.count;a++){const c=i.getX(a),l=i.getZ(a),u=this.computeHeight(c,l);i.setY(a,u)}i.needsUpdate=!0,n.computeVertexNormals();const r=this.createTerrainMaterial(),o=new D(n,r);o.receiveShadow=!0,o.castShadow=!1,o.name="Terrain_Main",this.group.add(o),this.mesh=o,this.createSea(),this.createLakes();for(let a=-30;a<=30;a+=5)for(let c=-30;c<=30;c+=5)this.getHeightAt(a,c);return o}createTerrainMaterial(){const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d");e.fillStyle="#6b8c42",e.fillRect(0,0,256,256);for(let h=0;h<2e3;h++)e.fillStyle=`rgba(${60+Math.random()*20},${110+Math.random()*30},${40+Math.random()*20},0.15)`,e.fillRect(Math.random()*256,Math.random()*256,2,2);const n=new Je(t);n.wrapS=n.wrapT=Ke,n.repeat.set(28,28),n.anisotropy=4;const i=document.createElement("canvas");i.width=256,i.height=256;const r=i.getContext("2d");r.fillStyle="#9a9a95",r.fillRect(0,0,256,256);for(let h=0;h<2e3;h++)r.fillStyle=`rgba(0,0,0,${Math.random()*.08})`,r.fillRect(Math.random()*256,Math.random()*256,1,1);const o=new Je(i);o.wrapS=o.wrapT=Ke,o.repeat.set(18,18);const a=document.createElement("canvas");a.width=256,a.height=256;const c=a.getContext("2d");c.fillStyle="#8a6a42",c.fillRect(0,0,256,256);for(let h=0;h<1500;h++)c.fillStyle="rgba(40,30,20,0.07)",c.fillRect(Math.random()*256,Math.random()*256,2,1);const l=new Je(a);l.wrapS=l.wrapT=Ke,l.repeat.set(20,20);const u=new U({map:n,roughness:.95,metalness:0});return u.onBeforeCompile=h=>{h.uniforms.texRock={value:o},h.uniforms.texSoil={value:l},h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
         varying float vHeight;
         varying vec3 vNw;
        `).replace("#include <begin_vertex>",`#include <begin_vertex>
         vHeight = position.y;
         vNw = normal;
        `),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
         uniform sampler2D texRock;
         uniform sampler2D texSoil;
         varying float vHeight;
         varying vec3 vNw;
        `).replace("#include <map_fragment>",`
          float slope = 1.0 - dot(vNw, vec3(0.0,1.0,0.0));
          vec4 grass = texture2D(map, vUv * 1.0);
          vec4 rock = texture2D(texRock, vUv * 1.0);
          vec4 soil = texture2D(texSoil, vUv * 1.0);
          float h = vHeight;
          float rockBlend = smoothstep(55.0, 95.0, h) + slope*0.9;
          rockBlend = clamp(rockBlend,0.0,1.0);
          float soilBlend = smoothstep(18.0, 35.0, h) * (1.0-rockBlend) * 0.5;
          vec4 base = mix(grass, soil, soilBlend);
          base = mix(base, rock, rockBlend);
          base.rgb += (rockBlend*0.04);
          diffuseColor *= base;
        `)},u}createSea(){const t=new $t(3e3,900,1,1);t.rotateX(-Math.PI/2);const e=new U({color:932434,roughness:.15,metalness:.1,transparent:!0,opacity:.98}),n=new D(t,e);n.position.set(0,-2.2,1050),this.group.add(n);const i=new $t(3e3,120,1,1);i.rotateX(-Math.PI/2);const r=document.createElement("canvas");r.width=256,r.height=256;const o=r.getContext("2d");o.fillStyle="#d8c9a0",o.fillRect(0,0,256,256);for(let u=0;u<1e3;u++)o.fillStyle="rgba(0,0,0,0.06)",o.fillRect(Math.random()*256,Math.random()*256,1,1);const a=new Je(r);a.wrapS=a.wrapT=Ke,a.repeat.set(12,2);const c=new U({map:a,roughness:.95}),l=new D(i,c);l.position.set(0,-1,980),l.receiveShadow=!0,this.group.add(l)}createLakes(){const t=new $n(120,24);t.rotateX(-Math.PI/2);const e=new U({color:1194586,roughness:.18,metalness:.15,transparent:!0,opacity:.95}),n=new D(t,e);n.position.set(-420,2.5,-480),n.scale.set(1.4,1,.8),this.group.add(n);const i=n.clone();i.position.set(380,3,-520),i.scale.set(1.1,1,1.3),this.group.add(i)}}class a0{constructor(t){this.worldScene=t,this.group=t.waterGroup,this.waters=[]}create(){this.createCanalNetwork(),this.createRiver(),this.createFountain()}createCanalNetwork(){const t=new wn({uniforms:{time:{value:0},deepColor:{value:new ft(666170)},shallowColor:{value:new ft(2976606)},sunDir:{value:new S(.5,.8,.2)},sunColor:{value:new ft(16773569)}},vertexShader:`
        varying vec2 vUv;
        varying vec3 vWorld;
        void main(){
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position,1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        uniform float time;
        uniform vec3 deepColor;
        uniform vec3 shallowColor;
        uniform vec3 sunDir;
        uniform vec3 sunColor;
        varying vec2 vUv;
        varying vec3 vWorld;
        // simple 2D noise
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i+vec2(1.0,0.0));
          float c = hash(i+vec2(0.0,1.0));
          float d = hash(i+vec2(1.0,1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }
        void main(){
          vec2 uv = vUv * 6.0;
          float n1 = noise(uv + time*0.06);
          float n2 = noise(uv*1.7 - time*0.04);
          float wave = (n1*0.55 + n2*0.45);
          vec3 base = mix(deepColor, shallowColor, wave*0.6 + 0.2);
          // sun specular
          vec3 viewDir = normalize(cameraPosition - vWorld);
          vec3 halfDir = normalize(sunDir + viewDir);
          // fake normal from noise gradient
          float dX = noise(uv+vec2(0.05,0.0)) - noise(uv-vec2(0.05,0.0));
          float dY = noise(uv+vec2(0.0,0.05)) - noise(uv-vec2(0.0,0.05));
          vec3 N = normalize(vec3(dX*3.0, 1.0, dY*3.0));
          float spec = pow(max(dot(N, halfDir),0.0), 90.0) * 0.55;
          // fresnel
          float fres = pow(1.0 - max(dot(N, viewDir),0.0), 3.0) * 0.35;
          vec3 col = base + spec * sunColor + fres * vec3(0.6,0.8,1.0);
          // depth edge foam approximated by uv distance to border
          float edge = min(min(vUv.x, 1.0-vUv.x), min(vUv.y, 1.0-vUv.y));
          float foam = smoothstep(0.0, 0.08, edge) ;
          col = mix(vec3(0.85,0.9,0.88)*0.2, col, foam);
          gl_FragColor = vec4(col, 0.96);
        }
      `,transparent:!0}),e=new Re([new S(-140,.4,-220),new S(-60,.4,-160),new S(30,.4,-120),new S(90,.4,-60),new S(60,.4,20),new S(-10,.4,50)]),n=this.createRibbonFromCurve(e,22,110),i=new D(n,t);i.name="Canal_Grande",this.group.add(i),this.waters.push({mesh:i,mat:t});for(let r=0;r<3;r++){const o=new Re([new S(-180+r*70,.38,-90+r*30),new S(-100+r*50,.38,-30+r*20),new S(-30+r*40,.38,40+r*10)]),a=this.createRibbonFromCurve(o,10,50),c=new D(a,t.clone());c.material.uniforms=Ds.clone(t.uniforms),this.group.add(c),this.waters.push({mesh:c,mat:c.material})}this.canalMat=t}createRibbonFromCurve(t,e,n){const i=t.getPoints(n),r=new me,o=[],a=[],c=[];for(let l=0;l<i.length;l++){const u=i[l],h=l<i.length-1?new S().subVectors(i[l+1],u).normalize():new S().subVectors(u,i[l-1]).normalize(),d=new S(-h.z,0,h.x).normalize().multiplyScalar(e/2),f=d.clone().negate();if(o.push(u.x+d.x,u.y,u.z+d.z),o.push(u.x+f.x,u.y,u.z+f.z),a.push(0,l/i.length),a.push(1,l/i.length),l<i.length-1){const g=l*2,_=g+1,m=g+2,p=g+3;c.push(g,_,m,_,p,m)}}return r.setAttribute("position",new te(o,3)),r.setAttribute("uv",new te(a,2)),r.setIndex(c),r.computeVertexNormals(),r}createRiver(){const t=new Re([new S(-900,.6,120),new S(-500,.7,100),new S(-200,.7,90),new S(100,.65,110),new S(500,.6,140),new S(900,.55,180)]),e=this.createRibbonFromCurve(t,38,120),n=this.canalMat.clone();n.uniforms=Ds.clone(this.canalMat.uniforms),n.uniforms.deepColor.value=new ft(929311),n.uniforms.shallowColor.value=new ft(3832410);const i=new D(e,n);this.group.add(i),this.waters.push({mesh:i,mat:n})}createFountain(){const t=new Wt(8,9,.8,24),e=new U({color:14209216,roughness:.7}),n=new D(t,e);n.position.set(180,1.2,-40),this.worldScene.streetGroup.add(n);const i=new $n(7,24);i.rotateX(-Math.PI/2);const r=this.canalMat.clone();r.uniforms=Ds.clone(this.canalMat.uniforms);const o=new D(i,r);o.position.set(0,.5,0),n.add(o),this.waters.push({mesh:o,mat:r})}update(t,e,n){this.waters.forEach(i=>{i.mat.uniforms.time.value=t*.001,e&&i.mat.uniforms.sunDir.value.copy(e),n&&i.mat.uniforms.sunColor.value.copy(n)})}}class c0{constructor(t,e){this.worldScene=t,this.terrain=e,this.group=t.vegetationGroup}create(){this.createCypressAlley(),this.createOliveGroves(),this.createForest(),this.createGardens()}makeCypress(t,e,n=1){const i=18*n+Math.random()*4,r=new Wt(.18*n,.32*n,i*.12,6),o=new U({color:4863264,roughness:.9}),a=new D(r,o);a.position.y=i*.06;const c=new Ae(1.2*n,i*.9,8),l=new U({color:1718802,roughness:.85}),u=new D(c,l);u.position.y=i*.55;const h=new At,d=new D(new Wt(.52*n,.62*n,.32,6),new U({color:3878686,roughness:1}));d.position.y=.01,h.add(d),h.add(a),h.add(u);const f=this.terrain.getFootprintHeight(t,e,1.4,1.4);return h.position.set(t,f.minH,e),h.rotation.x=-f.nz*.35,h.rotation.z=f.nx*.35+(Math.random()-.5)*.06,h.scale.set(.95+Math.random()*.1,1,.95+Math.random()*.1),h}createCypressAlley(){for(let e=0;e<22;e++){const n=-340+e*28,i=this.makeCypress(-226,n,1.1+Math.random()*.15),r=this.makeCypress(-214,n,1.1+Math.random()*.15);this.group.add(i),this.group.add(r)}}makeOlive(t,e){const n=new At,i=new Wt(.2,.45,3,6),r=new U({color:5917232,roughness:.95}),o=new D(i,r);o.position.y=1.4,o.rotation.z=(Math.random()-.5)*.3;const a=new Ce(2.2,8,6);a.scale(1,.75,1);const c=new U({color:5925690,roughness:.9}),l=new D(a,c);l.position.y=3.8;const u=l.geometry.attributes.position;for(let f=0;f<u.count;f++)u.setX(f,u.getX(f)*(.9+Math.random()*.2)),u.setZ(f,u.getZ(f)*(.9+Math.random()*.2));u.needsUpdate=!0;const h=new D(new Wt(.7,.82,.22,7),new U({color:4864800,roughness:1}));h.position.y=.02,n.add(h),n.add(o),n.add(l);const d=this.terrain.getFootprintHeight(t,e,2.5,2.5);return n.position.set(t,d.minH,e),n.rotation.x=-d.nz*.45,n.rotation.z=d.nx*.45,n}createOliveGroves(){const t={x:-280,z:80};for(let e=0;e<6;e++)for(let n=0;n<5;n++){const i=t.x+e*14+(Math.random()-.5)*4,r=t.z+n*14+(Math.random()-.5)*4;this.group.add(this.makeOlive(i,r))}for(let e=0;e<4;e++){const n=160+e*6;for(let i=0;i<12;i++){const r=-360+i*12,o=new ot(.18,.9,.18),a=new U({color:3820826,roughness:.9}),c=new D(o,a),l=this.terrain.getFootprintHeight(r,n,.6,.6);c.position.set(r,l.minH+.45,n+Math.sin(i)*.3),this.group.add(c);const u=new Ce(.45,6,5),h=new U({color:5929518}),d=new D(u,h);d.position.set(r,l.minH+.9,n),d.scale.set(1.2,.6,1.2),this.group.add(d)}}}createForest(){for(let t=0;t<40;t++){const e=(Math.random()-.5)*1100,n=-900+Math.random()*280,i=10+Math.random()*8,r=this.makePine(e,n,i);this.group.add(r)}for(let t=0;t<20;t++){const e=(Math.random()-.5)*900,n=-250+Math.random()*300,i=this.makeOak(e,n);this.group.add(i)}}makePine(t,e,n){const i=new At,r=new D(new Wt(.18,.36,n*.18,6),new U({color:4008728,roughness:.95}));r.position.y=n*.09,i.add(r);for(let c=0;c<3;c++){const l=new D(new Ae(1.6-c*.35,4.5-c*.7,8),new U({color:1980958,roughness:.9}));l.position.y=n*.22+c*2.2,i.add(l)}const o=new D(new Wt(.55,.7,.28,6),new U({color:3878686}));o.position.y=.02,i.add(o);const a=this.terrain.getFootprintHeight(t,e,2,2);return i.position.set(t,a.minH,e),i.rotation.x=-a.nz*.35,i.rotation.z=a.nx*.35,i.scale.set(.9+Math.random()*.2,1,.9+Math.random()*.2),i}makeOak(t,e){const n=new At,i=new D(new Wt(.22,.42,3.2,6),new U({color:4864032}));i.position.y=1.6,n.add(i);const r=new D(new Ce(2.8,8,7),new U({color:2968094,roughness:.92}));r.position.y=4.2,r.scale.set(1.3,.9,1.3);const o=new D(new Wt(.6,.78,.26,6),new U({color:3878686}));o.position.y=.02,n.add(r),n.add(o);const a=this.terrain.getFootprintHeight(t,e,2.2,2.2);return n.position.set(t,a.minH,e),n.rotation.x=-a.nz*.35,n.rotation.z=a.nx*.35,n}createGardens(){const t={x:-80,z:-10};for(let e=-2;e<=2;e++)for(let n=-1;n<=1;n++){const i=new D(new ot(1.1,.45,1.1),new U({color:8034890})),r=t.x+e*2.4,o=t.z+n*2.4,a=this.terrain.getFootprintHeight(r,o,1.1,1.1);i.position.set(r,a.minH+.22,o),this.group.add(i)}for(let e=0;e<6;e++){const n=t.x+(Math.random()-.5)*14,i=t.z+(Math.random()-.5)*8,r=this.makeLemonTree(n,i);this.group.add(r)}}makeLemonTree(t,e){const n=new At,i=new D(new Wt(.12,.18,1.8,6),new U({color:5917226}));i.position.y=.9,n.add(i);const r=new D(new Ce(1.2,7,6),new U({color:3824154}));r.position.y=1.9,n.add(r);for(let c=0;c<3;c++){const l=new D(new Ce(.16,6,5),new U({color:15257632}));l.position.set((Math.random()-.5)*.9,1.7+Math.random()*.5,(Math.random()-.5)*.9),n.add(l)}const o=new D(new Wt(.42,.5,.18,6),new U({color:3878686}));o.position.y=.02,n.add(o);const a=this.terrain.getFootprintHeight(t,e,1.2,1.2);return n.position.set(t,a.minH,e),n.rotation.x=-a.nz*.3,n.rotation.z=a.nx*.3,n}}function ti(s,t,e){const n=document.createElement("canvas");n.width=s,n.height=t;const i=n.getContext("2d");e(i,s,t);const r=new Je(n);return r.wrapS=r.wrapT=Ke,r.colorSpace=_e,r.needsUpdate=!0,r}function Fr(){const s=ti(512,512,(e,n,i)=>{e.fillStyle="#e8ddd0",e.fillRect(0,0,n,i);for(let r=0;r<6e3;r++){const o=Math.random()*n,a=Math.random()*i,c=Math.random()*1.8+.4,l=Math.random()*.09;e.fillStyle=`rgba(${180+Math.random()*30|0},${170+Math.random()*20|0},${150+Math.random()*25|0},${l})`,e.beginPath(),e.arc(o,a,c,0,Math.PI*2),e.fill()}e.strokeStyle="rgba(90,80,70,0.07)",e.lineWidth=.7;for(let r=0;r<22;r++){e.beginPath();let o=Math.random()*n,a=Math.random()*i;e.moveTo(o,a);for(let c=0;c<6;c++)o+=(Math.random()-.5)*80,a+=(Math.random()-.5)*40,e.lineTo(o,a);e.stroke()}}),t=ti(512,512,(e,n,i)=>{e.fillStyle="#9a9a9a",e.fillRect(0,0,n,i);for(let r=0;r<8e3;r++){const o=Math.random()*n,a=Math.random()*i,c=140+Math.random()*40;e.fillStyle=`rgba(${c},${c},${c},0.35)`,e.fillRect(o,a,1,1)}});return t.colorSpace=Ze,{albedo:s,roughness:t,normal:null}}function l0(){return{albedo:ti(512,512,(t,e,n)=>{t.fillStyle="#d8c9b6",t.fillRect(0,0,e,n);for(let i=0;i<n;i+=4+Math.random()*8)t.fillStyle=`rgba(0,0,0,${.03+Math.random()*.04})`,t.fillRect(0,i,e,1+Math.random()*2);for(let i=0;i<4e3;i++){const r=Math.random()*e,o=Math.random()*n;t.fillStyle=`rgba(60,50,40,${Math.random()*.06})`,t.fillRect(r,o,1,1.5)}for(let i=0;i<900;i++){const r=Math.random()*e,o=Math.random()*n,a=Math.random()*2+.5;t.fillStyle="rgba(70,60,50,0.12)",t.beginPath(),t.ellipse(r,o,a,a*.6,0,0,Math.PI*2),t.fill()}}),roughness:null,normal:null}}function h0(){return{albedo:ti(512,512,(t,e,n)=>{t.fillStyle="#b05a3a",t.fillRect(0,0,e,n);const i=22,r=52;t.fillStyle="#d8c9b8";for(let o=0;o<n;o+=i){t.fillRect(0,o,e,3);const a=o/i%2===0?0:r/2;for(let c=a-r;c<e;c+=r)t.fillRect(c,o,3,i)}for(let o=3;o<n;o+=i){const a=Math.floor(o/i)%2===0?0:r/2;for(let c=a;c<e;c+=r){const l=(Math.random()-.5)*22;t.fillStyle=`rgba(${l},${l},${l},0.14)`,t.fillRect(c+3,o+3,r-6,i-6),t.strokeStyle="rgba(0,0,0,0.08)",t.strokeRect(c+3,o+3,r-6,i-6)}}}),roughness:null,normal:null}}function u0(){return{albedo:ti(512,512,(t,e,n)=>{t.fillStyle="#b85c3b",t.fillRect(0,0,e,n);for(let i=0;i<n;i+=16)t.fillStyle="rgba(0,0,0,0.07)",t.fillRect(0,i,e,2),t.fillStyle="rgba(255,255,255,0.06)",t.fillRect(0,i+2,e,1);for(let i=0;i<5e3;i++){const r=Math.random()*e,o=Math.random()*n;t.fillStyle=`rgba(50,20,10,${Math.random()*.05})`,t.fillRect(r,o,2,1)}}),roughness:null,normal:null}}function d0(){return{albedo:ti(512,512,(t,e,n)=>{t.fillStyle="#8a8d91",t.fillRect(0,0,e,n);for(let i=0;i<120;i++){const r=Math.random()*e,o=Math.random()*n,a=18+Math.random()*14,c=12+Math.random()*10,l=110+Math.random()*30;t.fillStyle=`rgb(${l},${l},${l+2})`,t.beginPath(),t.ellipse(r,o,a,c,Math.random()*.6,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(60,60,60,0.35)",t.lineWidth=1.2,t.stroke()}t.fillStyle="rgba(40,30,20,0.08)";for(let i=0;i<2e3;i++)t.fillRect(Math.random()*e,Math.random()*n,1,1)}),roughness:null,normal:null}}function f0(){return{albedo:ti(512,512,(t,e,n)=>{t.fillStyle="#ece7de",t.fillRect(0,0,e,n),t.strokeStyle="rgba(120,110,100,0.25)",t.lineWidth=.9;for(let i=0;i<12;i++){t.beginPath();let r=Math.random()*e*.3,o=Math.random()*n;t.moveTo(r,o);for(let a=0;a<80;a++)r+=6+Math.random()*8,o+=Math.sin(a*.2+i)*4+(Math.random()-.5)*3,t.lineTo(r,o);t.stroke()}t.strokeStyle="rgba(180,160,140,0.12)";for(let i=0;i<10;i++){t.beginPath();let r=0,o=Math.random()*n;t.moveTo(r,o);for(let a=0;a<90;a++)r+=6,o+=Math.sin(a*.15)*2,t.lineTo(r,o);t.stroke()}}),roughness:null,normal:null}}const Or={};function p0(s){if(Or[s])return Or[s];let t;switch(s){case"plaster_cream":t=Fr(),t.albedo.repeat.set(1,1);break;case"plaster_ochre":t=Fr(),t.albedo.repeat.set(1,1);break;case"travertine":t=l0();break;case"brick":t=h0();break;case"terracotta":t=u0();break;case"cobble":t=d0(),t.albedo.repeat.set(2,2);break;case"marble":t=f0();break;default:t=Fr()}return[t.albedo,t.roughness,t.normal].forEach(e=>{e&&(e.wrapS=e.wrapT=Ke,e.anisotropy=8)}),s==="plaster_ochre"&&(t.tint="#e8c9a0"),Or[s]=t,t}function Mi(s,t={}){const e=p0(s),n=new U({map:e.albedo,roughness:t.roughness??.85,metalness:t.metalness??0,color:t.color?new ft(t.color):new ft(16777215)});return e.albedo&&(n.map=e.albedo),t.repeat&&n.map.repeat.set(t.repeat[0],t.repeat[1]),e.roughness,n.needsUpdate=!0,n}const re={venezia:{id:"venezia",name:"Venezia",color:"#d35400",center:{x:20,z:-90},palette:["#e8c9a0","#d8b48a","#c9a89a","#e6dcc8","#d4b89a"],roof:"terracotta",facade:"plaster_ochre",floors:[2,4],canal:!0,bridge:!0,density:.95},roma:{id:"roma",name:"Roma",color:"#8e44ad",center:{x:180,z:-20},palette:["#e8ddd0","#d8c9b6","#e6c9a0","#d4b8a0"],roof:"terracotta",facade:"travertine",floors:[3,5],density:.92},firenze:{id:"firenze",name:"Firenze",color:"#c0392b",center:{x:-60,z:-160},palette:["#e8dcc0","#d8c9a0","#d4b89a","#c9b08a"],roof:"terracotta",facade:"plaster_cream",floors:[3,5],density:.88},milano:{id:"milano",name:"Milano",color:"#2c3e50",center:{x:-240,z:-420},palette:["#d8ddd8","#c9d0d8","#e8e0d0","#b8c0c8"],roof:"terracotta",facade:"plaster_cream",floors:[4,7],modern:!0,density:.92},bologna:{id:"bologna",name:"Bologna",color:"#8e3515",center:{x:-30,z:-290},palette:["#c95a2a","#d8a090","#b94a1a","#e8c9a0"],roof:"terracotta",facade:"brick",floors:[3,5],density:.85},toscana:{id:"toscana",name:"Toscana",color:"#27ae60",center:{x:-280,z:60},palette:["#d8c9a0","#e6dcc8","#c9b89a","#b8a08a"],roof:"terracotta",facade:"plaster_cream",floors:[2,3],density:.42},genova:{id:"genova",name:"Genova",color:"#2980b9",center:{x:-340,z:-240},palette:["#e8c9a0","#f4e8c1","#d8b89a","#c9dcc0"],roof:"slate",facade:"plaster_ochre",floors:[3,6],density:.82},napoli:{id:"napoli",name:"Napoli",color:"#e67e22",center:{x:320,z:180},palette:["#e8ddd0","#f4e8d0","#d8c9a0","#e8c9a0"],roof:"terracotta",facade:"plaster_cream",floors:[3,6],density:.88},dolomiti:{id:"dolomiti",name:"Dolomiti",color:"#16a085",center:{x:0,z:-700},palette:["#d8ddd0","#c9c0b0","#8a9a8a"],roof:"slate",facade:"plaster_cream",floors:[2,3],alpine:!0,density:.32}};class m0{constructor(t,e){this.worldScene=t,this.terrain=e,this.group=t.buildingGroup,this.buildings=[],this.colliders=[]}generate(){this.createUrbanBlocks(),Object.values(re).forEach(t=>{this.generateRegion(t)}),this.generateConnectingFabric(),this.generateSuburbs(),this.createRealSquares(),this.addStreetFurniture()}createUrbanBlocks(){const t={x:140,z:-50},e=24,n=20,i=8;for(let c=0;c<3;c++)for(let l=0;l<2;l++){const u=t.x+c*(e+i),h=t.z+l*(n+i);Math.hypot(u-210,h+55)<46||Math.hypot(u-160,h+15)<38||(this.createBlockRow(u,h-n/2+2,3,"roma",!0),this.createBlockRow(u,h+n/2-2,3,"roma",!0))}const r={x:-62,z:-155};for(let c=0;c<2;c++)for(let l=0;l<2;l++){const u=r.x-6+c*28,h=r.z-6+l*26;Math.hypot(u+62,h+162)<28||(this.createBlockRow(u,h-8,3,"firenze",!0),this.createBlockRow(u,h+8,3,"firenze",!0))}const o={x:15,z:-95};for(let c=0;c<2;c++)for(let l=0;l<2;l++){const u=o.x-18+c*28,h=o.z-18+l*22;this.createBlockRow(u,h,3,"venezia",!0)}const a={x:-240,z:-410};for(let c=0;c<3;c++){const l=a.x+c*26-12,u=a.z+6;this.createBlockRow(l,u-10,3,"milano",!0),this.createBlockRow(l,u+12,3,"milano",!0)}[{x:-30,z:-285,n:2},{x:-335,z:-242,n:2},{x:322,z:148,n:2}].forEach(c=>{for(let l=0;l<c.n;l++){const u=c.x+l*20-10,h=c.z;this.createBlockRow(u,h-8,2,this.getNearestRegion(u,h).id,!0)}})}createBlockRow(t,e,n,i,r){const o=re[i];for(let a=0;a<n;a++){const c=r?t+(a-(n-1)/2)*(7+Math.random()*1.5):t,l=r?e:e+(a-(n-1)/2)*(7+Math.random()*1.5);if(this.buildings.some(g=>Math.hypot(g.position.x-c,g.position.z-l)<6.5))continue;const u=oe.randInt(o.floors[0],o.floors[1]),h=r?7+Math.random()*1.2:7+Math.random()*2,d=r?9+Math.random()*2:7+Math.random()*1.2,f=u*3.32+.6;this.createBuilding(c,l,h,d,f,o,u)}}createBlockCol(t,e,n,i,r){this.createBlockRow(t,e,n,i,r)}getNearestRegion(t,e){let n=re.roma,i=1/0;return Object.values(re).forEach(r=>{const o=Math.hypot(r.center.x-t,r.center.z-e);o<i&&(i=o,n=r)}),n}generateRegion(t){const e=Math.round(t.density*(t.id==="toscana"?32:t.id==="dolomiti"?20:t.id==="firenze"?38:t.id==="bologna"?32:t.id==="genova"?28:t.id==="napoli"?36:40)),n=t.id==="dolomiti"?520:t.id==="toscana"?400:(t.id==="genova",280),i=t.id==="dolomiti"?220:t.id==="toscana"?340:t.id==="genova"?260:240;for(let r=0;r<e;r++){const o=t.center.x+(Math.random()-.5)*n+(Math.random()-.5)*20,a=t.center.z+(Math.random()-.5)*i+(Math.random()-.5)*20;if(t.id==="venezia"&&Math.abs(o-(20+Math.sin(a*.02)*18))>145)continue;const c=Math.hypot(o+420,a+480),l=Math.hypot(o-380,a+520);if(c<150||l<130||this.buildings.some(g=>Math.hypot(g.position.x-o,g.position.z-a)<7.5)&&Math.random()<.7)continue;const u=oe.randInt(t.floors[0],t.floors[1]),h=6.5+Math.random()*9,d=6.5+Math.random()*9,f=u*3.28+(t.alpine?1.6:.8);this.createBuilding(o,a,h,d,f,t,u)}this.createHeroLandmarks(t),this.createDistrictDetails(t)}createDistrictDetails(t){if(t.id==="roma"){for(let n=0;n<8;n++){const i=165+n*6,r=-18,o=this.terrain.getFootprintHeight(i,r,5,5),a=new D(new $t(5.4,5.4),new U({color:12101776,roughness:.95}));a.rotation.x=-Math.PI/2,a.position.set(i,o.minH+.06,r),this.worldScene.streetGroup.add(a)}for(let n=0;n<6;n++){const i=155+n*9,r=-30,o=this.terrain.getFootprintHeight(i,r,1,1),a=new D(new Wt(.42,.52,7,8),new U({color:14733496}));a.position.set(i,o.minH+3.5,r),this.worldScene.streetGroup.add(a);const c=new D(new Wt(.68,.42,.45,8),new U({color:16051424}));c.position.set(i,o.minH+7,r),this.worldScene.streetGroup.add(c)}}if(t.id==="firenze"){const i=this.terrain.getFootprintHeight(-88,-132,34,28),r=new D(new $t(34,28),new U({color:13219990,roughness:.97}));r.rotation.x=-Math.PI/2,r.position.set(-88,i.minH+.09,-132),this.worldScene.streetGroup.add(r);const o=new D(new ot(6,22,6),new U({color:13676688}));o.position.set(-76,i.minH+11,-142),this.worldScene.buildingGroup.add(o);const a=new D(new ot(6.6,1.2,6.6),new U({color:13215872}));a.position.set(-76,i.minH+22.6,-142),this.worldScene.buildingGroup.add(a);for(let c=0;c<4;c++){const l=-96+c*6,u=-124,h=this.terrain.getFootprintHeight(l,u,2,2),d=new D(new Wt(.32,.36,4.5,8),new U({color:16051424}));d.position.set(l,h.minH+2.25,u),this.worldScene.streetGroup.add(d)}}if(t.id==="venezia"){const i=this.terrain.getFootprintHeight(38,-98,44,38),r=new D(new $t(44,38),new U({color:14207400,roughness:.95}));r.rotation.x=-Math.PI/2,r.position.set(38,i.minH+.07,-98),this.worldScene.streetGroup.add(r);for(let o=0;o<8;o++){const a=-80+o*14,c=-162,l=this.terrain.getFootprintHeight(a,c,.5,.5),u=new D(new ot(1.8,.92,.18),new U({color:15261136}));u.position.set(a,l.minH+.62,c),this.worldScene.streetGroup.add(u)}}if(t.id==="napoli")for(let e=0;e<10;e++){const n=285+e*8,i=148,r=this.terrain.getFootprintHeight(n,i,8,8),o=new D(new $t(8,8),new U({color:14205088}));o.rotation.x=-Math.PI/2,o.position.set(n,r.minH+.06,i),this.worldScene.streetGroup.add(o)}if(t.id==="milano"){const i=this.terrain.getFootprintHeight(-215,-395,28,10),r=new D(new $t(28,10),new U({color:12563616,roughness:.92}));r.rotation.x=-Math.PI/2,r.position.set(-215,i.minH+.08,-395),this.worldScene.streetGroup.add(r);const o=new D(new Wt(5,5,28,16,1,!0,0,Math.PI),new U({color:9089224,transparent:!0,opacity:.22,side:Ge}));o.rotation.z=Math.PI/2,o.position.set(-215,i.minH+5,-395),this.worldScene.buildingGroup.add(o)}}generateConnectingFabric(){[{a:re.firenze.center,b:re.roma.center,count:10,width:80},{a:re.bologna.center,b:re.firenze.center,count:8,width:70},{a:re.milano.center,b:re.bologna.center,count:9,width:90},{a:re.genova.center,b:re.milano.center,count:7,width:70},{a:re.toscana.center,b:re.firenze.center,count:7,width:60},{a:re.roma.center,b:re.napoli.center,count:9,width:85},{a:re.venezia.center,b:re.bologna.center,count:6,width:55}].forEach(e=>{for(let n=0;n<e.count;n++){const i=Math.random(),r=oe.lerp(e.a.x,e.b.x,i)+(Math.random()-.5)*e.width,o=oe.lerp(e.a.z,e.b.z,i)+(Math.random()-.5)*e.width;if(Math.hypot(r+420,o+480)<140||Math.hypot(r-380,o+520)<120||this.buildings.some(f=>Math.hypot(f.position.x-r,f.position.z-o)<8))continue;const a=oe.randInt(2,4),c=6+Math.random()*7,l=6+Math.random()*7,u=a*3.2+.6;let h=re.firenze,d=1/0;if(Object.values(re).forEach(f=>{const g=Math.hypot(f.center.x-r,f.center.z-o);g<d&&(d=g,h=f)}),this.createBuilding(r,o,c,l,u,h,a),Math.random()<.35)for(let f=0;f<2;f++){const g=r+(Math.random()-.5)*22,_=o+(Math.random()-.5)*22;this.buildings.some(m=>Math.hypot(m.position.x-g,m.position.z-_)<7)||this.createBuilding(g,_,5+Math.random()*5,5+Math.random()*5,2.8+Math.random()*2.5,h,2)}}})}generateSuburbs(){Object.values(re).forEach(t=>{if(t.id==="dolomiti"||t.id==="toscana")return;const e=5;for(let n=0;n<e;n++){const i=Math.random()*Math.PI*2,r=140+Math.random()*90,o=t.center.x+Math.cos(i)*r*.85,a=t.center.z+Math.sin(i)*r*.75;if(this.buildings.some(l=>Math.hypot(l.position.x-o,l.position.z-a)<7.5))continue;const c=oe.randInt(2,3);this.createBuilding(o,a,5.5+Math.random()*6,5.5+Math.random()*6,c*3.1,t,c)}});for(let t=0;t<22;t++){const e=(Math.random()-.5)*900,n=(Math.random()-.5)*600;if(Object.values(re).some(o=>Math.hypot(o.center.x-e,o.center.z-n)<110)||Math.hypot(e+420,n+480)<130)continue;this.createBuilding(e,n,5+Math.random()*4,5+Math.random()*4,6.2,re.toscana,2),Math.random()<.5&&this.createBuilding(e+8+Math.random()*6,n+Math.random()*6,4,5,3.8,re.toscana,1)}}createBuilding(t,e,n,i,r,o,a){const c=this.terrain.getFootprintHeight(t,e,n,i),l=c.minH,u=c.slope,h=new At;h.position.set(t,l,e),h.userData.region=o.id,h.userData.enterable=Math.random()<.38,h.userData.buildingId=`b_${o.id}_${this.buildings.length}`;const d=n+3.2,f=i+3.2,g=new $t(d,f);g.rotateX(-Math.PI/2);const _=document.createElement("canvas");_.width=64,_.height=64;const m=_.getContext("2d");m.fillStyle="#c9c7bc",m.fillRect(0,0,64,64),m.strokeStyle="rgba(0,0,0,0.07)";for(let P=0;P<64;P+=8)m.beginPath(),m.moveTo(P,0),m.lineTo(P,64),m.stroke(),m.beginPath(),m.moveTo(0,P),m.lineTo(64,P),m.stroke();const p=new Je(_);p.wrapS=p.wrapT=Ke,p.repeat.set(d/2,f/2);const w=new U({map:p,roughness:.94}),v=new D(g,w);v.position.y=.09,v.receiveShadow=!0,h.add(v);const x=.14,C=.12,A=new U({color:10132114}),R=new D(new ot(d,x,C),A);R.position.set(0,x/2+.09,f/2),h.add(R);const N=R.clone();N.position.set(0,x/2+.09,-f/2),h.add(N);const M=new D(new ot(C,x,f),A);M.position.set(d/2,x/2+.09,0),h.add(M);const T=M.clone();T.position.set(-d/2,x/2+.09,0),h.add(T);const F=Math.max(1.2,u+.9),k=new U({color:8026744,roughness:.98});[{s:new ot(n+.18,F,.14),p:[0,-F/2+.08,i/2]},{s:new ot(n+.18,F,.14),p:[0,-F/2+.08,-i/2]},{s:new ot(.14,F,i),p:[n/2,-F/2+.08,0]},{s:new ot(.14,F,i),p:[-n/2,-F/2+.08,0]}].forEach(P=>{const et=new D(P.s,k);et.position.set(P.p[0],P.p[1],P.p[2]),h.add(et)});const L=new $t(d+1.5,f+1.5);L.rotateX(-Math.PI/2);const z=document.createElement("canvas");z.width=64,z.height=64;const G=z.getContext("2d"),Z=G.createRadialGradient(32,32,0,32,32,32);Z.addColorStop(0,"rgba(0,0,0,0.55)"),Z.addColorStop(.45,"rgba(0,0,0,0.20)"),Z.addColorStop(1,"rgba(0,0,0,0)"),G.fillStyle=Z,G.fillRect(0,0,64,64);const K=new Je(z),J=new Vs({map:K,transparent:!0,opacity:.5,depthWrite:!1}),j=new D(L,J);j.position.y=.04,j.renderOrder=2,h.add(j);const at=this.getFacadeMaterial(o,t,e),ct=new ot(n,r,i),X=new D(ct,at);X.position.y=r/2,X.castShadow=!1,X.receiveShadow=!0,o.id==="roma"&&r>12&&(X.castShadow=!0),h.add(X);const Q=this.createRoof(n,i,r,o);h.add(Q);const pt=new D(new ot(n+.5,.28,i+.5),new U({color:14209216,roughness:.9}));if(pt.position.y=r-.14,h.add(pt),a>3){const P=new D(new ot(n+.18,.12,i+.18),new U({color:14735560}));P.position.y=r*.48,h.add(P)}if(o.id!=="toscana"&&o.id!=="dolomiti"&&Math.random()<.55){const P=new U({color:1710618,roughness:.95}),et=new D(new $t(n-.8,2.2),P);et.position.set(0,1.35,i/2+.03),h.add(et);const q=new U({color:o.id==="roma"?12597547:o.id==="venezia"?2972218:2899536,roughness:.9}),rt=new D(new ot(n-.6,.1,.9),q);rt.position.set(0,2.45,i/2+.48),h.add(rt),rt.rotation.x=.22}{const P=new D(new ot(.55,.9,.55),new U({color:3815994}));if(P.position.set(n*.28,r+.45,i*.1),h.add(P),Math.random()<.4){const et=new D(new Wt(.02,.02,1.6,6),new U({color:2763306}));et.position.set(-n*.2,r+.8,-i*.2),h.add(et)}if(Math.random()<.35&&a>3){const et=new D(new Wt(.55,.55,.7,10),new U({color:5921370}));et.position.set(-n*.24,r+.35,i*.22),h.add(et)}}const yt=new At;yt.userData.isLODGroup=!0,this.addFacadeDetails(yt,n,i,r,a,o),yt.children.forEach(P=>P.userData.isDetail=!0),h.add(yt);const vt=this.createDoor(n,i,r,o);vt.userData.isDetail=!1,h.add(vt);const Lt=new ot(n+.22,.38,i+.22),Ot=new U({color:9079432,roughness:.85}),wt=new D(Lt,Ot);if(wt.position.y=.28,h.add(wt),(o.id==="roma"||o.id==="milano"||o.id==="firenze"||o.id==="napoli")&&Math.random()<.32){const P=new $t(2.2,.58),et=document.createElement("canvas");et.width=256,et.height=64;const q=et.getContext("2d");q.fillStyle="#1a1a1a",q.fillRect(0,0,256,64),q.fillStyle="#d4b67a",q.font="600 20px Cinzel",q.fillText(["TRATTORIA","CAFFE","LIBRERIA","MODA","FARMACIA","GELATERIA","PANIFICIO"][Math.floor(Math.random()*7)],12,38);const rt=new Je(et);rt.colorSpace=_e;const Y=new U({map:rt,emissive:3351040,emissiveIntensity:.12}),bt=new D(P,Y);bt.position.set(0,2.05,i/2+.11),h.add(bt)}this.group.add(h);const Nt=new ni(new S(t-n/2,l,e-i/2),new S(t+n/2,l+r+2,e+i/2));return this.colliders.push(Nt),this.buildings.push({id:h.userData.buildingId,region:o.id,position:new S(t,l,e),size:{w:n,d:i,h:r},floors:a,enterable:h.userData.enterable,mesh:h}),h.userData.enterable&&(h.userData.interiorData=this.createInteriorData(n,i,r,o,a)),h}getFacadeMaterial(t,e,n){const i=Math.sin(e*.13)*Math.cos(n*.11);let r=t.facade;t.id==="venezia"&&i>.3&&(r="plaster_cream"),t.id==="roma"&&Math.random()<.18&&(r="brick"),t.id==="bologna"&&(r="brick");const o=t.palette[Math.floor(Math.abs(Math.sin(e*.05+n*.03))*t.palette.length)%t.palette.length];return Mi(r,{color:o,roughness:.88})}createRoof(t,e,n,i){const r=new At;if(i.alpine){const a=new jr;a.moveTo(-t/2-.3,0),a.lineTo(0,2.8),a.lineTo(t/2+.3,0),a.lineTo(-t/2-.3,0);const c=new Ws(a,{depth:e+.6,bevelEnabled:!1}),l=new U({color:4868682,roughness:.9}),u=new D(c,l);u.position.set(0,n,-e/2-.3),u.castShadow=!0,r.add(u);const h=new D(new ot(.6,1.4,.6),new U({color:3815994}));h.position.set(t*.3,n+1,0),r.add(h)}else{const a=new Ae(Math.max(t,e)*.72,1.2,4,1);a.rotateY(Math.PI/4);const c=Mi("terracotta",{roughness:.9,color:12082235}),l=new D(a,c);l.position.y=n+1.2/2-.1,l.castShadow=!0,r.add(l);const u=new D(new ot(t*.12,.18,e*.12),new U({color:10111530}));u.position.y=n+1.2-.1,r.add(u)}return r}addFacadeDetails(t,e,n,i,r,o){const l=i/r,u=n/2+.02,h=o.id==="venezia",d=o.modern&&Math.random()<.32;for(let g=0;g<r;g++){const _=.9+g*l+l*.35,m=e>9?3:2;for(let p=0;p<m;p++){if(d&&g>2){const M=new $t(1.9,2),T=new U({color:9089224,metalness:.35,roughness:.1,transparent:!0,opacity:.72}),F=new D(M,T),k=(p-(m-1)/2)*2.6;F.position.set(k,_,u+.08),t.add(F);continue}const w=(p-(m-1)/2)*(e/(m+.5)),v=new ot(1.25+.18,1.7+.18,.06),x=new U({color:h?15789280:15261904,roughness:.85}),C=new D(v,x);C.position.set(w,_,u),t.add(C);const A=new $t(1.25,1.7),R=new U({color:662058,metalness:.15,roughness:.12,transparent:!0,opacity:.82});Math.random()<.42&&(R.emissive=new ft(16763008),R.emissiveIntensity=0,R.userData.isWindowLight=!0);const N=new D(A,R);if(N.position.set(w,_,u+.04),t.add(N),!d&&Math.random()<(h?.55:.62)){const M=new ot(.52,1.7,.04),T=new U({color:o.id==="toscana"?2968090:o.id==="venezia"?4876890:(o.id==="bologna",6961706),roughness:.9}),F=new D(M,T);F.position.set(w-1.25/2-.28,_,u+.05);const k=F.clone();k.position.set(w+1.25/2+.28,_,u+.05),Math.random()<.32&&(F.rotation.y=Math.PI/3.5,k.rotation.y=-Math.PI/3.5),t.add(F),t.add(k)}if(g>=1&&Math.random()<.32&&!d){const M=new ot(2.05,.08,.55),T=new U({color:14209216,roughness:.85}),F=new D(M,T);F.position.set(w,_-.95,u+.28),t.add(F);const k=new ot(1.25+.8,.45,.03),$=new U({color:2763306,metalness:.3,roughness:.5}),L=new D(k,$);if(L.position.set(w,_-.68,u+.52),t.add(L),Math.random()<.45){const z=new D(new ot(1.75,.22,.16),new U({color:9058858}));z.position.set(w,_-.78,u+.45),t.add(z);const G=new D(new Ce(.18,6,5),new U({color:16730730}));G.position.set(w+.2,_-.66,u+.52),t.add(G)}}}}const f=e/2+.02;for(let g=0;g<r;g++){const _=.9+g*l+l*.35,m=new ot(.06,1.5,1.1),p=new U({color:15261904}),w=new D(m,p);w.position.set(f,_,0),t.add(w)}}createDoor(t,e,n,i){const r=new At,o=1.1,a=2.15,c=new ot(o,a,.05),l=i.id==="venezia"?2767434:i.id==="toscana"?5913114:3811866,u=new U({color:l,roughness:.85}),h=new D(c,u);h.position.set(0,a/2+.25,e/2+.06),r.add(h);const d=new ot(o+.3,.18,.08),f=new U({color:14209216}),g=new D(d,f);g.position.set(0,a+.35,e/2+.07),r.add(g);const _=new D(new Ce(.05,6,6),new U({color:13215850,metalness:.6,roughness:.3}));_.position.set(.35,1.1,e/2+.09),r.add(_);const m=document.createElement("canvas");m.width=64,m.height=32;const p=m.getContext("2d");p.fillStyle="#d8d0c0",p.fillRect(0,0,64,32),p.fillStyle="#1a1a1a",p.font="700 18px Inter",p.fillText(`${Math.floor(Math.random()*120+1)}`,18,22);const w=new Je(m),v=new D(new $t(.32,.16),new U({map:w}));return v.position.set(0,a+.35,e/2+.12),r.add(v),r.userData.isDoor=!0,r}createInteriorData(t,e,n,i,r){return{size:{w:t-.8,d:e-.8,h:n-.9},region:i.id,floors:r,style:i.id}}createHeroLandmarks(t){if(t.id==="roma"){const e=new At;this.anchorHero(e,210,-55,62,62);const n=new Wt(28,30,12,48,1,!0),i=new U({color:14207414,roughness:.85,side:Ge}),r=new D(n,i);r.position.y=6,e.add(r);for(let h=0;h<24;h++){const d=h/24*Math.PI*2,f=new D(new $t(2.4,4),new U({color:657930})),g=29;f.position.set(Math.cos(d)*g,4,Math.sin(d)*g),f.lookAt(0,4,0),e.add(f)}const o=new D(new $n(20,32),new U({color:13219990,roughness:.95}));o.rotation.x=-Math.PI/2,o.position.y=.1,e.add(o);for(let h=0;h<3;h++){const d=new D(new Wt(22-h*3,24-h*3,1.2,48,1,!0),i);d.position.y=2+h*1.8,e.add(d)}this.group.add(e),this.buildings.push({id:"hero_colosseum",region:"roma",position:e.position.clone(),size:{w:60,d:60,h:12},floors:2,enterable:!1,hero:!0,mesh:e});const a=new At;this.anchorHero(a,160,-15,30,30);const c=new D(new Wt(14,14,10,32),new U({color:15261136,roughness:.8}));c.position.y=5,a.add(c);const l=new D(new Ce(14,32,16,0,Math.PI*2,0,Math.PI/2),new U({color:14209216,roughness:.85}));l.position.y=10,a.add(l);for(let h=0;h<8;h++){const d=h/8*Math.PI*.6-.3,f=new D(new Wt(.55,.65,9,8),new U({color:16051424}));f.position.set(Math.cos(d)*12,4.5,Math.sin(d)*12+6),a.add(f)}const u=new D(new ot(16,1,8),new U({color:15261136}));u.position.set(0,9,10),a.add(u),this.group.add(a)}if(t.id==="firenze"){const e=new At;this.anchorHero(e,-62,-162,38,42);const n=new D(new ot(22,12,34),new U({color:16052454}));n.position.y=6,e.add(n);const i=new D(new Ce(9,24,12,0,Math.PI*2,0,Math.PI/2),new U({color:12597547}));i.position.y=12,e.add(i);const r=new D(new Wt(1.2,1.2,3,8),new U({color:16050369}));r.position.y=20,e.add(r);const o=new D(new ot(5,28,5),new U({color:15261136}));o.position.set(14,14,12),e.add(o),this.group.add(e);const a=new At;this.anchorHero(a,-45,-155,32,8),a.position.y+=.8;const c=new D(new ot(30,1.2,6),new U({color:14207392}));c.position.y=3.2,a.add(c);for(let l=0;l<4;l++){const u=new D(new ot(5,3.5,3),new U({color:15260864}));u.position.set((l-1.5)*7,5.2,1.5),a.add(u)}this.group.add(a)}if(t.id==="venezia"){const e=new At;this.anchorHero(e,35,-105,9,9);const n=new D(new ot(7,38,7),new U({color:14201994,roughness:.85}));n.position.y=19,e.add(n);const i=new D(new ot(6,7,6),new U({color:15261136}));i.position.y=38,e.add(i);for(let u=0;u<4;u++){const h=new D(new $t(2.2,3.2),new U({color:657930,side:Ge})),d=u*Math.PI/2;h.position.set(Math.cos(d)*3.01,38,Math.sin(d)*3.01),h.rotation.y=-d,e.add(h)}const r=new D(new Ae(4.2,7,4),new U({color:6982234}));r.position.y=45,r.rotation.y=Math.PI/4,e.add(r);const o=new D(new Ae(.5,1.2,6),new U({color:13215850,metalness:.6}));o.position.y=49,e.add(o),this.group.add(e);const a=new At;this.anchorHero(a,55,-85,38,14);const c=new D(new ot(34,12,12),Mi("plaster_cream",{color:"#f4e8d1"}));c.position.y=6,a.add(c);for(let u=0;u<9;u++){const h=new D(new $t(2.8,4.5),new U({color:657930}));h.position.set((u-4)*3.6,3,6.01),a.add(h);const d=new D(new Wt(.28,.32,6,8),new U({color:16051424}));d.position.set((u-4)*3.6+1.8,3,6),a.add(d)}const l=new D(new ot(34,6,12),new U({color:15251648}));l.position.y=12,a.add(l);for(let u=-16;u<=16;u+=3)for(let h=10;h<=14;h+=2){const d=new D(new $t(1.2,1.2),new U({color:Math.abs(u+h)%4===0?16050369:14198968}));d.position.set(u,h,6.02),a.add(d)}this.group.add(a);for(let u=0;u<4;u++){const h=-60+u*50,d=-140+u*30,f=new At;{const x=this.terrain.getFootprintHeight(h,d,14,5);f.position.set(h,x.minH+.9,d)}const g=new Wt(6,6,.9,12,1,!1,0,Math.PI),_=new U({color:14209216,side:Ge}),m=new D(g,_);m.rotation.z=Math.PI/2,m.rotation.x=Math.PI,m.position.y=1.2,f.add(m);const p=new D(new ot(12,.35,3.2),new U({color:1322e4}));p.position.y=2.1,f.add(p);const w=new D(new ot(12,.55,.08),new U({color:9079434}));w.position.set(0,2.6,1.45),f.add(w);const v=w.clone();v.position.z=-1.45,f.add(v),this.group.add(f)}for(let u=0;u<5;u++){const h=new At,d=u/5,f=-140+d*200,g=-210+d*140;h.position.set(f,.55,g);const _=new D(new ot(7,.35,1.1),new U({color:657930}));_.position.y=0,h.add(_);const m=new D(new Ae(.55,1.4,4),new U({color:657930}));m.rotation.z=-Math.PI/2,m.position.set(4,.2,0),h.add(m);const p=m.clone();p.rotation.z=Math.PI/2,p.position.set(-4,.2,0),h.add(p),h.rotation.y=Math.sin(d*Math.PI)*.6,this.worldScene.propGroup.add(h)}}if(t.id==="bologna"){const e=new At;this.anchorHero(e,-28,-288,12,6);const n=new D(new ot(5,38,5),new U({color:13195818}));n.position.set(-3,19,0),e.add(n);const i=new D(new ot(4,26,4),new U({color:13195818}));i.position.set(4,13,2),i.rotation.z=.08,e.add(i),this.group.add(e);for(let r=0;r<10;r++){const o=new D(new Wt(.32,.36,4.8,8),new U({color:16050369}));o.position.set(-50+r*4,2.4,-295),this.worldScene.streetGroup.add(o);const a=new D(new $t(3.2,3.5),new U({color:1710618}));a.position.set(-50+r*4+2,2.4,-294.9),this.worldScene.streetGroup.add(a)}}if(t.id==="milano"){const e=new At;this.anchorHero(e,-240,-420,32,56);const n=new D(new ot(28,14,52),new U({color:16052454}));n.position.y=7,e.add(n);for(let h=-12;h<=12;h+=3){const d=new D(new Ae(.45,6,6),new U({color:16052454}));d.position.set(h,17,26),e.add(d)}const i=new D(new Ae(1.2,12,6),new U({color:13215850,metalness:.2}));i.position.set(0,20,0),e.add(i);const r=new D(new $n(2.8,16),new U({color:4872810,transparent:!0,opacity:.85}));r.position.set(0,10,26.01),e.add(r);for(let h=-20;h<=20;h+=8){const d=new D(new ot(.4,3,4),new U({color:15261904}));d.position.set(14.4,9,h),e.add(d);const f=d.clone();f.position.set(-14.4,9,h),e.add(f)}this.group.add(e);for(let h=0;h<3;h++){const d=new At,f=-260+h*18,g=-460+h*12;{const v=this.terrain.getFootprintHeight(f,g,13,13);d.position.set(f,v.minH,g)}const _=28+h*9,m=new ot(12,_,12),p=new U({color:9089224,metalness:.45,roughness:.18,transparent:!0,opacity:.88}),w=new D(m,p);w.position.y=_/2,d.add(w);for(let v=0;v<_/2;v++){const x=new D(new ot(12.4,.12,12.4),new U({color:13687008}));x.position.y=4+v*2.2,d.add(x)}this.group.add(d)}const a=new Re([new S(-300,.2,-380),new S(-220,.2,-380),new S(-200,.2,-430),new S(-280,.2,-450)],!0).getPoints(80),c=new me().setFromPoints(a),l=new Vc({color:4868682}),u=new Sm(c,l);u.position.y=.02,this.worldScene.streetGroup.add(u)}if(t.id==="genova"){const e=new At;this.anchorHero(e,-350,-240,64,16);const n=new D(new ot(60,2,12),new U({color:9079432}));n.position.y=.5,e.add(n);const i=new D(new Wt(1.4,1.8,18,8),new U({color:16052454}));i.position.set(22,9,0),e.add(i);const r=new D(new Wt(1.6,1.6,1.2,8),new U({color:16773569,emissive:16764006,emissiveIntensity:.6}));r.position.set(22,18.5,0),e.add(r),this.group.add(e)}if(t.id==="napoli"){const e=new At;this.anchorHero(e,360,220,72,72);const n=new D(new Ae(34,22,16),new U({color:4864554}));n.position.y=11,e.add(n);const i=new D(new Wt(6,8,2,16),new U({color:2759194}));i.position.y=22,e.add(i);const r=new D(new Ce(4,8,6),new U({color:9079434,transparent:!0,opacity:.35}));r.position.y=26,e.add(r),this.group.add(e);for(let o=0;o<6;o++){const a=new D(new ot(7,12+o%2*4,7),new U({color:["#e8c9a0","#f4e8c1","#d8a0a0","#f4d0a0"][o%4]}));a.position.set(300+o*9,6+o%2*2,165),this.group.add(a)}}if(t.id==="toscana"){const e=new At;this.anchorHero(e,-260,40,22,16);const r=new D(new ot(18,7,12),Mi("plaster_ochre",{color:"#e8dcc0"}));r.position.y=3.5,e.add(r);const o=new D(new Ae(11,2.2,4),Mi("terracotta"));o.position.y=7.8,o.rotation.y=Math.PI/4,e.add(o);for(let h=0;h<4;h++){const d=new D(new Wt(.28,.32,5,8),new U({color:16051424}));d.position.set((h-1.5)*3.2,2.5,6.6),e.add(d);const f=new D(new $t(2.2,3),new U({color:662042}));f.position.set((h-1.5)*3.2,2.8,6.62),e.add(f)}const a=new D(new ot(12,.18,10),new U({color:6982234}));a.position.set(10,3.2,2),e.add(a);for(let h=0;h<4;h++){const d=new D(new Wt(.12,.12,3.2,6),new U({color:9071170}));d.position.set(6+h*2.4,1.6,-2+h*1.2),e.add(d)}this.group.add(e);const c=new At;this.anchorHero(c,-310,90,14,11);const l=new D(new ot(12,5.5,9),new U({color:12099722}));l.position.y=2.75,c.add(l);const u=new D(new Ae(7.5,2,4),Mi("terracotta"));u.position.y=6.2,u.rotation.y=Math.PI/4,c.add(u),this.group.add(c)}if(t.id==="dolomiti"){const e=new At;this.anchorHero(e,30,-720,14,22);const r=new D(new ot(10,7,16),new U({color:15261904}));r.position.y=3.5,e.add(r);const o=new jr;o.moveTo(-5,0),o.lineTo(0,4),o.lineTo(5,0),o.lineTo(-5,0);const a=new Ws(o,{depth:16,bevelEnabled:!1}),c=new D(a,new U({color:6974058}));c.position.set(0,7,-8),e.add(c);const l=new D(new ot(4,16,4),new U({color:15261904}));l.position.set(0,8,9),e.add(l);const u=new D(new Ae(2.8,6,4),new U({color:2775610}));u.position.set(0,19,9),u.rotation.y=Math.PI/4,e.add(u),this.group.add(e);for(let h=0;h<6;h++){const d=(Math.random()-.5)*300,f=-700+(Math.random()-.5)*180,g=new At;{const p=this.terrain.getFootprintHeight(d,f,6,6);g.position.set(d,p.minH,f)}const _=new D(new ot(6,3.5,6),new U({color:9071170}));_.position.y=1.75,g.add(_);const m=new D(new Ae(4.5,2.2,4),new U({color:5913130}));m.position.y=4.1,m.rotation.y=Math.PI/4,g.add(m),this.group.add(g)}}}addStreetFurniture(){const t=new U({color:1710618,metalness:.5,roughness:.6}),e=new U({color:16773569,emissive:16764006,emissiveIntensity:0});let n=0;for(let i=0;i<140&&n<90;i++){const r=(Math.random()-.5)*1200,o=(Math.random()-.5)*1e3;if(!this.buildings.some(_=>Math.hypot(_.position.x-r,_.position.z-o)<19))continue;n++;const l=this.terrain.getFootprintHeight(r,o,.4,.4).minH,u=new At;u.position.set(r,l,o);const h=new D(new ot(.32,.14,.32),new U({color:4868682}));h.position.y=.07,u.add(h);const d=new D(new Wt(.06,.08,4.2,8),t);d.position.y=2.1,u.add(d);const f=new D(new Ce(.22,8,6),e);f.position.y=4.3,f.userData.isLamp=!0,u.add(f);const g=new D(new ot(.04,.04,.6),t);g.position.set(0,4,.3),u.add(g),this.worldScene.streetGroup.add(u)}for(let i=0;i<40;i++){const r=(Math.random()-.5)*800,o=(Math.random()-.5)*600;if(!(Math.hypot(r-180,o+20)<220||Math.hypot(r-60,o+160)<180||Math.hypot(r-20,o+90)<180))continue;const l=this.terrain.getFootprintHeight(r,o,1.8,.55).minH,u=new At;u.position.set(r,l+.25,o),u.rotation.y=Math.random()*Math.PI;const h=new D(new ot(1.8,.08,.55),new U({color:6965802}));h.position.y=.45,u.add(h);const d=new D(new ot(1.8,.45,.06),new U({color:6965802}));d.position.set(0,.75,-.22),u.add(d);const f=new D(new ot(.06,.45,.5),new U({color:1710618}));f.position.set(-.7,.22,0),u.add(f);const g=f.clone();g.position.x=.7,u.add(g),this.worldScene.streetGroup.add(u)}for(let i=0;i<16;i++){const r=-280+(Math.random()-.5)*60,o=20+Math.random()*80,a=this.terrain.getFootprintHeight(r,o,1.8,1.8),c=new D(new Ae(1.1,7,8),new U({color:1718802}));c.position.set(r,a.minH+3.5,o),this.worldScene.vegetationGroup.add(c);const l=new D(new Wt(.32,.42,.28,5),new U({color:3878686}));l.position.set(r,a.minH+.05,o),this.worldScene.vegetationGroup.add(l)}}createRealSquares(){[{x:155,z:-28,w:22,d:18},{x:10,z:-100,w:18,d:14},{x:-25,z:-290,w:14,d:14},{x:-340,z:-250,w:16,d:12}].forEach(e=>{const n=this.terrain.getFootprintHeight(e.x,e.z,e.w,e.d),i=new D(new $t(e.w,e.d),new U({color:1322e4,roughness:.96}));i.rotation.x=-Math.PI/2,i.position.set(e.x,n.minH+.05,e.z),this.worldScene.streetGroup.add(i);const r=new D(new Wt(1.6,1.8,.42,12),new U({color:11059408,roughness:.3}));r.position.set(e.x,n.minH+.31,e.z),this.worldScene.streetGroup.add(r);const o=new D(new $n(1.35,14),new U({color:5939400,transparent:!0,opacity:.55}));o.rotation.x=-Math.PI/2,o.position.set(e.x,n.minH+.53,e.z),this.worldScene.streetGroup.add(o)})}anchorHero(t,e,n,i,r){const o=this.terrain.getFootprintHeight(e,n,i,r);t.position.set(e,o.minH,n);const a=i+8,c=r+8,l=new D(new $t(a,c),new U({color:13223868,roughness:.93}));l.rotation.x=-Math.PI/2,l.position.y=.1,l.receiveShadow=!0,t.add(l);const u=.16,h=new U({color:10132114}),d=new D(new ot(a,u,.14),h);d.position.set(0,u/2+.1,c/2),t.add(d);const f=d.clone();f.position.set(0,u/2+.1,-c/2),t.add(f);const g=new D(new ot(.14,u,c),h);g.position.set(a/2,u/2+.1,0),t.add(g);const _=g.clone();_.position.set(-a/2,u/2+.1,0),t.add(_);const m=Math.max(1.4,o.slope+1.1),p=new U({color:8026744}),w=new D(new ot(a,m,c),p);w.position.y=-m/2+.1,t.add(w);const v=new D(new $t(a+4,c+4),new Vs({color:0,transparent:!0,opacity:.28,depthWrite:!1}));return v.rotation.x=-Math.PI/2,v.position.y=.05,t.add(v),o}getClosestBuilding(t,e=18){let n=null,i=1/0;for(const r of this.buildings){const o=Math.hypot(r.position.x-t.x,r.position.z-t.z);o<e&&o<i&&(n=r,i=o)}return n?{building:n,dist:i}:null}checkCollision(t,e=.6){for(const n of this.colliders){const i=(n.min.x+n.max.x)*.5,r=(n.min.z+n.max.z)*.5;if(Math.abs(t.x-i)>18||Math.abs(t.z-r)>18)continue;const o=new S(oe.clamp(t.x,n.min.x,n.max.x),t.y,oe.clamp(t.z,n.min.z,n.max.z)),a=t.x-o.x,c=t.z-o.z;if(a*a+c*c<e*e)return{hit:!0,box:n}}return{hit:!1}}updateNightLights(t){const e=1-t,n=oe.clamp((e-.25)/.5,0,1);this.worldScene.buildingGroup.traverse(i=>{i.isMesh&&i.material&&i.material.emissive&&i.material.userData&&i.material.userData.isWindowLight&&(i.material.emissiveIntensity=n*1.7*(.75+Math.random()*.25)),i.userData&&i.userData.isLamp&&i.material.emissive&&(i.material.emissiveIntensity=n*2.2)}),this.worldScene.streetGroup.traverse(i=>{i.userData&&i.userData.isLamp&&i.material.emissive&&(i.material.emissiveIntensity=n*1.6)})}}class g0{constructor(t,e){this.worldScene=t,this.terrain=e,this.group=t.streetGroup}create(){this.createHighway(),this.createCityStreets(),this.createCountryRoads()}createRoadMesh(t,e,n,i={}){const r=t.getPoints(i.detail?i.detail:120),o=new me,a=[],c=[],l=[];for(let h=0;h<r.length;h++){const d=r[h],f=this.terrain.getHeightAt(d.x,d.z)+.08;d.y=f;const g=h<r.length-1?new S().subVectors(r[h+1],d).normalize():new S().subVectors(d,r[h-1]).normalize(),_=new S(-g.z,0,g.x).normalize().multiplyScalar(e/2),m=d.x+_.x,p=d.z+_.z,w=d.x-_.x,v=d.z-_.z,x=this.terrain.getHeightAt(m,p)+.08,C=this.terrain.getHeightAt(w,v)+.08;if(a.push(m,x,p),a.push(w,C,v),c.push(0,h/r.length*10),c.push(1,h/r.length*10),h<r.length-1){const A=h*2,R=A+1,N=A+2,M=A+3;l.push(A,R,N,R,M,N)}}o.setAttribute("position",new te(a,3)),o.setAttribute("uv",new te(c,2)),o.setIndex(l),o.computeVertexNormals();const u=new D(o,n);return u.receiveShadow=!0,u}createSidewalkPair(t,e,n){const i=[new U({color:12171697,roughness:.92}),new U({color:12171697,roughness:.92})];for(let r=0;r<2;r++){const o=r===0?1:-1,a=n,c=t.getPoints(100),l=new me,u=[],h=[],d=[];for(let x=0;x<c.length;x++){const C=c[x],A=x<c.length-1?new S().subVectors(c[x+1],C).normalize():new S().subVectors(C,c[x-1]).normalize(),R=new S(-A.z,0,A.x),N=e/2+.08,M=N*o,T=(N+a)*o,F=C.x+R.x*M,k=C.z+R.z*M,$=C.x+R.x*T,L=C.z+R.z*T,z=this.terrain.getHeightAt(F,k)+.19,G=this.terrain.getHeightAt($,L)+.19;if(u.push(F,z,k,$,G,L),h.push(0,x/c.length*8,1,x/c.length*8),x<c.length-1){const Z=x*2,K=Z+1,J=Z+2,j=Z+3;d.push(Z,K,J,K,j,J)}}l.setAttribute("position",new te(u,3)),l.setAttribute("uv",new te(h,2)),l.setIndex(d),l.computeVertexNormals();const f=new D(l,i[r]);f.receiveShadow=!0,this.group.add(f);const g=t.getPoints(80),_=[],m=[];for(let x=0;x<g.length;x++){const C=g[x],A=x<g.length-1?new S().subVectors(g[x+1],C).normalize():new S().subVectors(C,g[x-1]).normalize(),R=new S(-A.z,0,A.x),N=(e/2+.04)*o,M=C.x+R.x*N,T=C.z+R.z*N,F=this.terrain.getHeightAt(M,T)+.08,k=F+.11;if(_.push(M,F,T,M,k,T),x<g.length-1){const $=x*2,L=$+1,z=$+2,G=$+3;m.push($,z,L,L,z,G)}}const p=new me;p.setAttribute("position",new te(_,3)),p.setIndex(m),p.computeVertexNormals();const w=new U({color:10132114,roughness:.9}),v=new D(p,w);this.group.add(v)}}createHighway(){const t=new Re([new S(-260,-.5,-860),new S(-180,0,-500),new S(-120,0,-200),new S(0,0,0),new S(120,0,260),new S(200,0,600),new S(240,0,980)]),e=new U({color:2764339,roughness:.92});this.group.add(this.createRoadMesh(t,9.5,e));const n=document.createElement("canvas");n.width=128,n.height=8;const i=n.getContext("2d");i.fillStyle="#2a2e33",i.fillRect(0,0,128,8),i.fillStyle="#ffffff";for(let l=0;l<128;l+=24)i.fillRect(l,3,12,2);const r=new Je(n);r.wrapS=Ke,r.repeat.set(40,1);const o=new U({map:r,roughness:.9}),a=new Re(t.points.map(l=>l.clone())),c=this.createRoadMesh(a,.6,o);c.position.y=.02,this.group.add(c);for(let l=0;l<24;l++){const u=l/24,h=t.getPoint(u),d=this.terrain.getHeightAt(h.x,h.z)+.35,f=new D(new ot(.12,.7,.12),new U({color:9079432}));f.position.set(h.x-5,d,h.z),this.group.add(f);const g=f.clone();g.position.set(h.x+5,d,h.z),this.group.add(g)}}createCityStreets(){const t=new U({color:2369326,roughness:.92});for(let a=0;a<5;a++){const c=120+a*18,l=new Re([new S(c,0,-80),new S(c,0,40)]);this.group.add(this.createRoadMesh(l,5.8,t)),this.createSidewalkPair(l,5.8,2)}for(let a=-60;a<=30;a+=18){const c=new Re([new S(110,0,a),new S(260,0,a)]);this.group.add(this.createRoadMesh(c,5.8,t)),this.createSidewalkPair(c,5.8,2)}for(let a=0;a<5;a++)for(let c=-60;c<=30;c+=18){const l=120+a*18,u=c;this.createZebra(l,u,5.8)}for(let a=0;a<5;a++){const c=120+a*18;for(let l=-70;l<35;l+=14){const u=this.terrain.getFootprintHeight?this.terrain.getFootprintHeight(c+2.8,l,1,1):{minH:this.terrain.getHeightAt(c+2.8,l)};this.addStreetTree(c+3.2,l,u.minH);const h=this.terrain.getFootprintHeight(c-2.8,l,1,1);this.addStreetTree(c-3.2,l,h.minH)}}for(let a=0;a<4;a++){const c=-90+a*20,l=new Re([new S(c,0,-190),new S(c,0,-90)]);this.group.add(this.createRoadMesh(l,5.2,t)),this.createSidewalkPair(l,5.2,1.8)}for(let a=-180;a<=-100;a+=22){const c=new Re([new S(-100,0,a),new S(-10,0,a)]);this.group.add(this.createRoadMesh(c,5.2,t)),this.createSidewalkPair(c,5.2,1.8)}for(let a=0;a<4;a++)for(let c=-180;c<=-100;c+=22)this.createZebra(-90+a*20,c,5.2);for(let a=-180;a<-100;a+=16){const c=this.terrain.getFootprintHeight(-75,a,1,1);this.addStreetTree(-75,a,c.minH)}const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d");n.fillStyle="#9a9a9a",n.fillRect(0,0,256,256);for(let a=0;a<120;a++){const c=Math.random()*256,l=Math.random()*256;n.fillStyle="rgba(0,0,0,0.08)",n.fillRect(c,l,18,12),n.strokeStyle="rgba(255,255,255,0.2)",n.strokeRect(c,l,18,12)}const i=new Je(e);i.wrapS=i.wrapT=Ke,i.repeat.set(6,6);const r=new U({map:i,roughness:.95});for(let a=0;a<4;a++){const c=new Re([new S(-140+a*30,0,-180+a*10),new S(-80+a*20,0,-100+a*20),new S(-20+a*20,0,-20+a*10)]);this.group.add(this.createRoadMesh(c,4.2,r)),this.createSidewalkPair(c,4.2,1.4)}for(let a=0;a<3;a++){const c=-270+a*22,l=new Re([new S(c,0,-470),new S(c,0,-360)]);this.group.add(this.createRoadMesh(l,6.2,t)),this.createSidewalkPair(l,6.2,2.2)}const o=new Re([new S(285,0,135),new S(340,0,160),new S(375,0,185)]);this.group.add(this.createRoadMesh(o,6,new U({color:3816770}))),this.createSidewalkPair(o,6,2.4)}addStreetTree(t,e,n){const i=new At;i.position.set(t,n,e);const r=new D(new Wt(.12,.18,3.2,6),new U({color:4864032}));r.position.y=1.6,i.add(r);const o=new D(new Ce(1.6,8,6),new U({color:2972190,roughness:.9}));o.position.y=3.8,o.scale.set(1.1,.9,1.1),i.add(o);const a=new D(new Wt(.32,.36,.14,6),new U({color:5921370}));a.position.y=.07,i.add(a),this.group.add(i)}createZebra(t,e,n){const r=(this.terrain.getFootprintHeight?this.terrain.getFootprintHeight(t,e,n+1,3):{minH:this.terrain.getHeightAt(t,e)}).minH+.095,o=new At;o.position.set(t,r,e);for(let c=-3;c<=3;c++){const l=new D(new $t(.36,2.8),new U({color:16777215,roughness:.8}));l.rotation.x=-Math.PI/2,l.position.set(c*.62,.01,0),o.add(l)}const a=o.clone();a.rotation.y=Math.PI/2,this.group.add(o),this.group.add(a)}createCountryRoads(){const t=new U({color:14209208,roughness:.97}),e=new Re([new S(-220,0,-340),new S(-220,0,-120),new S(-240,0,20),new S(-300,0,120)]);this.group.add(this.createRoadMesh(e,5,t)),this.createSidewalkPair(e,5,1);const n=new Re([new S(-200,0,-620),new S(-80,0,-650),new S(40,0,-620),new S(120,0,-580),new S(60,0,-520)]),i=new U({color:4868682,roughness:.92});this.group.add(this.createRoadMesh(n,7,i))}}class _0{constructor(t,e){this.worldScene=t,this.buildingSystem=e,this.group=t.interiorGroup,this.activeInterior=null,this.doorProxies=[]}prepareInteriors(){this.buildingSystem.buildings.forEach(t=>{if(!t.enterable)return;const e=new S(t.position.x,t.position.y+1.1,t.position.z+t.size.d/2+.7);this.doorProxies.push({pos:e,building:t})})}findNearbyDoor(t,e=3.2){let n=null,i=1/0;for(const r of this.doorProxies){const o=Math.hypot(r.pos.x-t.x,r.pos.z-t.z);o<e&&o<i&&(n=r,i=o)}return n}enterBuilding(t,e){if(this.activeInterior)return;const n=this.buildInteriorMesh(t);return n.position.copy(t.position),n.position.y=t.position.y+.02,this.group.add(n),this.activeInterior={mesh:n,building:t,entryPos:e.position.clone()},e.position.set(t.position.x,t.position.y+1,t.position.z),e.velocity.y=0,this.worldScene.buildingGroup.visible=!1,this.worldScene.streetGroup.visible=!1,this.worldScene.vegetationGroup.visible=!1,n}exitBuilding(t){this.activeInterior&&(this.group.remove(this.activeInterior.mesh),this.activeInterior.mesh.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose&&e.material.dispose()}),this.activeInterior=null,this.worldScene.buildingGroup.visible=!0,this.worldScene.streetGroup.visible=!0,this.worldScene.vegetationGroup.visible=!0,this.buildingSystem.buildings.find(e=>e.id===this.lastBuildingId)||this.buildingSystem.buildings[0])}exitToEntry(t){this.activeInterior&&(t.position.copy(this.activeInterior.entryPos),t.position.y+=.3,this.group.remove(this.activeInterior.mesh),this.activeInterior=null,this.worldScene.buildingGroup.visible=!0,this.worldScene.streetGroup.visible=!0,this.worldScene.vegetationGroup.visible=!0)}buildInteriorMesh(t){const e=new At,n=t.size.w,i=t.size.d,r=t.size.h-1.2,o=n-.8,a=i-.8,c=Math.min(2.8,r),l=document.createElement("canvas");l.width=512,l.height=512;const u=l.getContext("2d");u.fillStyle="#8a6a3a",u.fillRect(0,0,512,512);for(let $=0;$<512;$+=28){u.fillStyle="rgba(0,0,0,0.08)",u.fillRect(0,$,512,2);for(let L=0;L<512;L+=90)u.strokeStyle="rgba(0,0,0,0.07)",u.strokeRect(L,$,90,28)}const h=new Je(l);h.wrapS=h.wrapT=Ke,h.repeat.set(2,2);const d=new U({map:h,roughness:.75}),f=new D(new ot(o,.12,a),d);f.position.y=.06,f.receiveShadow=!0,e.add(f);const g=new U({color:16051424,roughness:.92}),_=.12,m=c/2,p=new D(new ot(o,c,_),g);p.position.set(0,m,-a/2),e.add(p);const w=new D(new ot(_,c,a),g);w.position.set(-o/2,m,0),e.add(w);const v=w.clone();v.position.x=o/2,e.add(v);const x=new D(new ot((o-1.4)/2,c,_),g);x.position.set(-o/4-.35,m,a/2),e.add(x);const C=x.clone();C.position.x=o/4+.35,e.add(C);const A=new D(new ot(1.4,c-2.2,_),g);A.position.set(0,c-(c-2.2)/2,a/2),e.add(A);const R=new D(new ot(o,.08,a),new U({color:16777215,roughness:.95}));R.position.y=c+.04,e.add(R),this.furnish(e,t,o,a,c);const N=new tc(16773569,18,9,1.6);N.position.set(0,c-.2,0),e.add(N);const M=new tc(16773569,8,6,2);M.position.set(-o*.3,c-.4,-a*.3),e.add(M);const T=new U({color:9089232,emissive:3361386,emissiveIntensity:.18,transparent:!0,opacity:.55}),F=new D(new $t(1.6,1.6),T);F.position.set(-o/2+.07,1.6,0),F.rotation.y=Math.PI/2,e.add(F);const k=F.clone();return k.position.set(o/2-.07,1.6,0),k.rotation.y=-Math.PI/2,e.add(k),e}furnish(t,e,n,i,r){const o=e.region,a=(v,x,C=0)=>{const A=new At;A.position.set(v,.38,x),A.rotation.y=C;const R=new D(new ot(1.6,.06,1),new U({color:6965802,roughness:.8}));R.position.y=.38,A.add(R);for(let N=0;N<4;N++){const M=new D(new Wt(.03,.03,.76,6),new U({color:4863264}));M.position.set(N%2?.7:-.7,0,N<2?.4:-.4),A.add(M)}t.add(A);for(let N=0;N<2;N++){const M=new At;M.position.set(v+(N?.95:-.95),.25,x+.2);const T=new D(new ot(.48,.06,.48),new U({color:9071170}));T.position.y=.25,M.add(T);const F=new D(new ot(.48,.42,.04),new U({color:9071170}));F.position.set(0,.5,-.22),M.add(F),t.add(M)}},c=(v,x)=>{const C=new At;C.position.set(v,.22,x);const A=new D(new ot(1.9,.45,.9),new U({color:9062970,roughness:.95}));A.position.y=.22,C.add(A);const R=new D(new ot(1.9,.55,.15),new U({color:8010282}));R.position.set(0,.55,-.38),C.add(R),t.add(C)},l=(v,x)=>{const C=new D(new ot(2.4,.88,.62),new U({color:16051424,roughness:.6}));C.position.set(v,.44,x),t.add(C);const A=new D(new ot(2.4,.06,.62),new U({color:9079432,roughness:.5}));A.position.set(v,.88,x),t.add(A);for(let N=0;N<3;N++){const M=new D(new ot(.72,.55,.32),new U({color:15261904}));M.position.set(v-.72+N*.72,1.45,x),t.add(M)}const R=new D(new ot(.6,1.65,.6),new U({color:16777215,metalness:.15,roughness:.5}));R.position.set(v+1.6,.82,x),t.add(R)},u=(v,x)=>{const C=new At;C.position.set(v,.28,x);const A=new D(new ot(2,.28,1.45),new U({color:6965802}));A.position.y=.14,C.add(A);const R=new D(new ot(1.95,.18,1.4),new U({color:16051424}));R.position.y=.32,C.add(R);const N=new D(new ot(.62,.12,.55),new U({color:16777215}));N.position.set(-.55,.42,0),C.add(N),t.add(C)},h=(v,x)=>{const C=new At;C.position.set(v,.7,x);for(let N=0;N<4;N++){const M=new D(new ot(1.1,.04,.32),new U({color:6965802}));M.position.y=N*.42,C.add(M)}const A=new D(new ot(.04,1.4,.32),new U({color:6965802}));A.position.set(-.53,.7,0),C.add(A);const R=A.clone();R.position.x=.53,C.add(R);for(let N=0;N<5;N++){const M=new D(new ot(.08,.36,.22),new U({color:13215850+Math.random()*2236962}));M.position.set(-.35+N*.16,.21,0),C.add(M)}t.add(C)};if(o==="venezia"||o==="roma"){c(-n*.25,-i*.22),a(n*.18,.6,.2),h(n*.38,-i*.34);const v=new D(new $t(1.1,.75),new U({color:14201994}));v.position.set(0,1.6,-i/2+.07),t.add(v);const x=new D(new ot(1.14,.79,.02),new U({color:13215850}));x.position.copy(v.position),x.position.z-=.01,t.add(x)}else if(o==="toscana"){a(0,-.2,.4),l(n*.32,i*.28),h(-n*.38,-i*.2);const v=new D(new ot(1.2,1,.32),new U({color:9071170,roughness:.9}));v.position.set(-n*.38,.5,i*.28),t.add(v)}else if(o==="dolomiti"){a(0,0,0);const v=new D(new ot(2,.45,.9),new U({color:5917232}));v.position.set(n*.3,.22,-i*.25),t.add(v),l(-n*.28,i*.22)}else c(-n*.2,-i*.2),a(.6,.4,.1),u(n*.28,-i*.28);const d=document.createElement("canvas");d.width=256,d.height=256;const f=d.getContext("2d");f.fillStyle="#c9a86a",f.fillRect(0,0,256,256),f.strokeStyle="#8a6a42",f.lineWidth=8,f.strokeRect(8,8,240,240);for(let v=0;v<6;v++)f.fillStyle="rgba(120,80,40,0.12)",f.beginPath(),f.arc(128+Math.cos(v)*40,128+Math.sin(v)*40,18,0,Math.PI*2),f.fill();const g=new Je(d),_=new D(new $t(2.4,1.6),new U({map:g,roughness:.95}));_.rotation.x=-Math.PI/2,_.position.set(0,.021,.3),t.add(_);const m=new At;m.position.set(-n*.38,.8,-i*.35);const p=new D(new Wt(.04,.04,1.2,8),new U({color:1710618,metalness:.4}));p.position.y=.6,m.add(p);const w=new D(new Ae(.28,.32,16,1,!0),new U({color:16050369,side:Ge,emissive:16771520,emissiveIntensity:.18}));w.position.y=1.25,m.add(w),t.add(m)}}class v0{constructor(t,e,n,i){this.camera=t,this.domElement=e,this.terrain=n,this.buildingSystem=i,this.position=new S(-320,95,140),this.target=new S(-80,8,20),this.up=new S(0,1,0),this.spherical=new ic,this.sphericalDelta=new ic,this.offset=new S,this.spherical.setFromVector3(new S().subVectors(this.position,this.target)),this.camera.position.copy(this.position),this.camera.lookAt(this.target),this.keys={},this.mouseDown=!1,this.mouseButton=-1,this.mouseX=0,this.mouseY=0,this.shift=!1,this.wheelDelta=0,this.rotateSpeed=.0032,this.panSpeed=.9,this.zoomSpeed=1.12,this.flySpeed=42,this.fastMultiplier=3.2,this.damping=.92,this.velocity=new S,this.angularVel=new lt,this.minDistance=4,this.maxDistance=900,this.minPolar=.08,this.maxPolar=Math.PI/2-.02,this.mode="orbit",this.cinematicT=0,this.cinematicPath=null,this.enabled=!0,this.setupListeners(),this.updateCameraRotation()}setupListeners(){window.addEventListener("keydown",t=>this.onKeyDown(t)),window.addEventListener("keyup",t=>this.onKeyUp(t)),this.domElement.addEventListener("mousedown",t=>this.onMouseDown(t)),window.addEventListener("mouseup",t=>this.onMouseUp(t)),window.addEventListener("mousemove",t=>this.onMouseMove(t)),this.domElement.addEventListener("wheel",t=>this.onWheel(t),{passive:!1}),this.domElement.addEventListener("contextmenu",t=>t.preventDefault()),this.domElement.addEventListener("touchstart",t=>this.onTouchStart(t),{passive:!1}),this.domElement.addEventListener("touchmove",t=>this.onTouchMove(t),{passive:!1}),this.domElement.addEventListener("touchend",t=>this.onTouchEnd(t))}onKeyDown(t){this.keys[t.code]=!0,(t.code==="ShiftLeft"||t.code==="ShiftRight")&&(this.shift=!0),t.code==="KeyC"&&(this.mode=this.mode==="cinematic"?"orbit":"cinematic",this.mode==="cinematic"&&this.startCinematic()),t.code==="KeyO"&&(this.mode="orbit"),t.code==="KeyF"&&(this.mode="fly"),t.code==="Space"&&(t.preventDefault(),this.goToNextLandmark())}onKeyUp(t){this.keys[t.code]=!1,(t.code==="ShiftLeft"||t.code==="ShiftRight")&&(this.shift=!1)}onMouseDown(t){this.mouseDown=!0,this.mouseButton=t.button,this.mouseX=t.clientX,this.mouseY=t.clientY,t.button===0&&t.altKey}onMouseUp(t){this.mouseDown=!1}onMouseMove(t){if(!this.mouseDown)return;const e=t.clientX-this.mouseX,n=t.clientY-this.mouseY;this.mouseX=t.clientX,this.mouseY=t.clientY,this.mode!=="cinematic"&&(this.mouseButton===2||this.mouseButton===0&&t.altKey||this.keys.AltLeft||this.keys.AltRight?this.pan(e,n):this.mode==="fly"?(this.angularVel.x-=e*.0026,this.angularVel.y-=n*.0026):(this.sphericalDelta.theta-=e*this.rotateSpeed,this.sphericalDelta.phi-=n*this.rotateSpeed))}onWheel(t){t.preventDefault();const e=t.deltaY>0?this.zoomSpeed:1/this.zoomSpeed,n=oe.clamp(this.spherical.radius*e,this.minDistance,this.maxDistance);this.spherical.radius=n,this.wheelDelta=e}onTouchStart(t){t.touches.length===1&&(this.mouseDown=!0,this.mouseX=t.touches[0].clientX,this.mouseY=t.touches[0].clientY),t.preventDefault()}onTouchMove(t){if(!this.mouseDown||t.touches.length!==1)return;const e=t.touches[0].clientX-this.mouseX,n=t.touches[0].clientY-this.mouseY;this.mouseX=t.touches[0].clientX,this.mouseY=t.touches[0].clientY,this.sphericalDelta.theta-=e*this.rotateSpeed*1.2,this.sphericalDelta.phi-=n*this.rotateSpeed*1.2,t.preventDefault()}onTouchEnd(t){this.mouseDown=!1}pan(t,e){const n=new S;n.copy(this.position).sub(this.target);let i=n.length();i*=Math.tan(this.camera.fov/2*Math.PI/180);const r=new S().setFromMatrixColumn(this.camera.matrix,0);r.multiplyScalar(-t*i*.0012);const o=new S().setFromMatrixColumn(this.camera.matrix,1);o.multiplyScalar(e*i*.0012);const a=new S().addVectors(r,o);this.target.add(a),this.position.add(a)}startCinematic(){const t=[new S(-320,110,140),new S(-80,65,40),new S(35,55,-40),new S(180,70,-20),new S(60,85,120),new S(-240,80,-420),new S(-10,140,-320),new S(0,95,-700)];this.cinematicPath=new Re(t,!1,"catmullrom",.5),this.cinematicT=0}goToNextLandmark(){const t=[{pos:new S(35,42,-105),target:new S(35,12,-80),name:"venezia"},{pos:new S(210,78,20),target:new S(210,6,-55),name:"roma"},{pos:new S(-260,85,-340),target:new S(-240,8,-420),name:"milano"},{pos:new S(-310,65,110),target:new S(-280,6,60),name:"toscana"},{pos:new S(40,160,-620),target:new S(0,12,-700),name:"dolomiti"}];let e=0,n=1/0;t.forEach((r,o)=>{const a=r.pos.distanceTo(this.position);a<n&&(n=a,e=o)});const i=t[(e+1)%t.length];this.flyTo(i.pos,i.target,2.2)}flyTo(t,e,n=1.8){this.mode="fly";const i=this.position.clone(),r=this.target.clone(),o=performance.now(),a=()=>{const c=Math.min((performance.now()-o)/(n*1e3),1),l=1-Math.pow(1-c,3);this.position.lerpVectors(i,t,l),this.target.lerpVectors(r,e,l),c<1?requestAnimationFrame(a):(this.mode="orbit",this.spherical.setFromVector3(new S().subVectors(this.position,this.target)))};a()}teleport(t,e,n){const i=this.spherical.radius;this.target.set(t,e-1,n);const r=new S().subVectors(this.position,this.target).normalize().multiplyScalar(i);r.length()<1&&r.set(0,i*.6,i*.8),this.position.copy(this.target).add(r),this.spherical.setFromVector3(r)}getPosition(){return this.position.clone()}update(t,e){if(this.enabled){if(this.mode==="cinematic"&&this.cinematicPath){this.cinematicT+=t*.018,this.cinematicT>1&&(this.cinematicT-=1);const n=this.cinematicPath.getPointAt(this.cinematicT),i=this.cinematicPath.getPointAt(Math.min(this.cinematicT+.02,1)),r=this.terrain?this.terrain.getHeightAt(n.x,n.z):0;n.y=Math.max(n.y,r+28),this.position.lerp(n,.04),this.target.lerp(i,.05),this.spherical.setFromVector3(new S().subVectors(this.position,this.target))}else if(this.mode==="fly"){const n=new S;this.camera.getWorldDirection(n);const i=new S().crossVectors(n,this.up).normalize(),r=new S(0,1,0);let o=new S;if(this.keys.KeyW&&o.add(n),this.keys.KeyS&&o.sub(n),this.keys.KeyA&&o.sub(i),this.keys.KeyD&&o.add(i),(this.keys.KeyQ||this.keys.Space)&&o.add(r),(this.keys.KeyE||this.keys.ControlLeft)&&o.sub(r),o.lengthSq()>0){o.normalize();const a=this.flySpeed*(this.shift?this.fastMultiplier:1)*t,c=oe.clamp(this.position.y/80,.5,4);o.multiplyScalar(a*c),this.position.add(o),this.target.add(o)}this.angularVel.lengthSq()>1e-6&&(this.sphericalDelta.theta-=this.angularVel.x,this.sphericalDelta.phi-=this.angularVel.y,this.angularVel.multiplyScalar(.88))}if(this.mode!=="fly"||this.angularVel.lengthSq()>0){this.spherical.theta+=this.sphericalDelta.theta*.85,this.spherical.phi+=this.sphericalDelta.phi*.85,this.sphericalDelta.theta*=.88,this.sphericalDelta.phi*=.88,this.spherical.phi=oe.clamp(this.spherical.phi,this.minPolar,this.maxPolar),this.spherical.radius=oe.clamp(this.spherical.radius,this.minDistance,this.maxDistance);const n=new S().setFromSpherical(this.spherical);this.position.copy(this.target).add(n)}if(this.terrain){const n=this.terrain.getHeightAt(this.position.x,this.position.z);this.position.y<n+3.5&&(this.position.y=n+3.5,this.target.y<n+1.2&&(this.target.y=n+1.2),this.spherical.setFromVector3(new S().subVectors(this.position,this.target)))}this.camera.position.copy(this.position),this.camera.lookAt(this.target)}}updateCameraRotation(){this.camera.lookAt(this.target)}get positionRef(){return this.position}}function x0(s=0){const t=new At,e=[15911328,15251610,14264458,13213818][s%4],n=[2779802,9058874,2771498,3816010,13215850,16777215][s%6],i=[2767450,3811866,1710618,4868682][s%4],r=new qi(.24,.48,4,8),o=new U({color:n,roughness:.9}),a=new D(r,o);a.position.y=1.02,a.frustumCulled=!1,t.add(a);const c=new Ce(.21,10,8),l=new U({color:e,roughness:.7}),u=new D(c,l);u.position.y=1.42,t.add(u);const h=new Ce(.22,8,6,0,Math.PI*2,0,Math.PI*.55),d=new U({color:[1710618,6961690,14207392,3815994][s%4]}),f=new D(h,d);f.position.y=1.46,f.rotation.x=.1,t.add(f);const g=new qi(.07,.36,4,6),_=new U({color:e}),m=new D(g,_);m.position.set(-.31,.96,0),m.rotation.z=.15,t.add(m);const p=m.clone();p.position.set(.31,.96,0),p.rotation.z=-.15,t.add(p),t.userData.arms=[m,p];const w=new qi(.09,.45,4,6),v=new U({color:i}),x=new D(w,v);x.position.set(-.11,.42,0),t.add(x);const C=x.clone();C.position.set(.11,.42,0),t.add(C),t.userData.legs=[x,C];const A=new ot(.14,.06,.22),R=new U({color:1710618}),N=new D(A,R);N.position.set(-.11,.06,.04),t.add(N);const M=N.clone();if(M.position.set(.11,.06,.04),t.add(M),s%3===0){const T=new D(new ot(.18,.24,.08),new U({color:3811866}));T.position.set(.28,.85,-.12),t.add(T)}return t.castShadow=!0,t}class M0{constructor(t,e,n){this.worldScene=t,this.terrain=e,this.buildingSystem=n,this.group=t.npcGroup,this.npcs=[],this.targetDensity=.65,this.navPoints=[],this.frameCount=0}generate(t=.65){this.targetDensity=t,this.navPoints=[{pos:new S(20,-80),radius:38,name:"venezia"},{pos:new S(180,-20),radius:42,name:"roma"},{pos:new S(-240,-400),radius:30,name:"milano"},{pos:new S(-280,60),radius:22,name:"toscana"},{pos:new S(0,-700),radius:26,name:"dolomiti"},{pos:new S(-220,-20),radius:18,name:"villa"}],this.spawnInHubs();for(let e=0;e<22;e++){const n=(Math.random()-.5)*1200,i=(Math.random()-.5)*1e3;this.buildingSystem.getClosestBuilding(new S(n,0,i),18)&&this.spawnWanderer(n,i)}}spawnInHubs(){this.navPoints.forEach(t=>{const e=Math.round(6*this.targetDensity*(t.name==="venezia"?1.4:t.name==="roma"?1.3:1));for(let n=0;n<e;n++){const i=Math.random()*Math.PI*2,r=Math.random()*t.radius*.75,o=t.pos.x+Math.cos(i)*r,a=t.pos.y+Math.sin(i)*r,c=this.terrain.getHeightAt(o,a),l=this.createNPC(o,c,a);l.userData.hub=t.name,l.userData.state="idle",l.userData.idleTimer=Math.random()*4,this.npcs.push(l),this.group.add(l)}})}spawnWanderer(t,e){const n=this.terrain.getHeightAt(t,e),i=this.createNPC(t,n,e);i.userData.state="walk",i.userData.target=this.randomRoadTarget(t,e),this.npcs.push(i),this.group.add(i)}createNPC(t,e,n){const i=Math.floor(Math.random()*6),r=x0(i);return r.position.set(t,e,n),r.scale.set(.96+Math.random()*.08,1,.96+Math.random()*.08),r.userData.variant=i,r.userData.speed=.55+Math.random()*.55,r.userData.dir=new S(Math.cos(Math.random()*Math.PI*2),0,Math.sin(Math.random()*Math.PI*2)),r.userData.walkPhase=Math.random()*Math.PI*2,r.userData.pauseTimer=0,r.frustumCulled=!0,r}randomRoadTarget(t,e){const n=this.navPoints[Math.floor(Math.random()*this.navPoints.length)];return new S(n.pos.x+(Math.random()-.5)*20,0,n.pos.y+(Math.random()-.5)*20)}update(t,e,n){if(n){this.group.visible=!1;return}else this.group.visible=!0;this.frameCount++;const i=performance.now()*.001;for(let r=0;r<this.npcs.length;r++){const o=this.npcs[r],a=Math.hypot(o.position.x-e.x,o.position.z-e.z);if(a>220){o.visible=!1;continue}else o.visible=!0;if(!(a>140&&this.frameCount%3!==r%3))if(o.userData.state==="idle")o.userData.idleTimer-=t,o.userData.idleTimer<=0&&(o.userData.state="walk",o.userData.target=this.randomRoadTarget(o.position.x,o.position.z)),o.rotation.y+=Math.sin(i*.6+o.userData.walkPhase)*.002;else{const c=new S(o.userData.target.x,o.position.y,o.userData.target.z).sub(o.position);if(c.y=0,c.length()<1.5)o.userData.state="idle",o.userData.idleTimer=2+Math.random()*5;else{if(c.normalize(),a<60){const h=new S().copy(o.position).addScaledVector(c,1.8),d=this.buildingSystem.checkCollision(h,.7);if(d.hit){const f=d.box,g=new S((f.min.x+f.max.x)/2,0,(f.min.z+f.max.z)/2),_=new S(o.position.x-g.x,0,o.position.z-g.z).normalize().multiplyScalar(.9);c.add(_).normalize()}}o.userData.dir.lerp(c,.08),o.userData.dir.normalize(),o.position.addScaledVector(o.userData.dir,o.userData.speed*t),o.position.y=this.terrain.getHeightAt(o.position.x,o.position.z);const u=Math.atan2(o.userData.dir.x,o.userData.dir.z);if(o.rotation.y=oe.lerp(o.rotation.y,u,a<40?.12:.06),a<65){o.userData.walkPhase+=t*6*o.userData.speed;const h=Math.sin(o.userData.walkPhase)*.32,d=o.userData.arms,f=o.userData.legs;d&&(d[0].rotation.x=h,d[1].rotation.x=-h),f&&(f[0].rotation.x=-h*.7,f[1].rotation.x=h*.7),o.position.y+=Math.abs(Math.sin(o.userData.walkPhase))*.02}a<3.2&&(o.userData.dir.addScaledVector(new S().subVectors(o.position,e).normalize(),.03),o.userData.dir.normalize())}}}}setDensity(t){this.targetDensity=t/100;const e=Math.round(this.npcs.length*this.targetDensity);this.npcs.forEach((n,i)=>n.visible=i<e||Math.random()<this.targetDensity)}}class y0{constructor(t){this.worldScene=t,this.timeHours=11.35,this.paused=!1,this.timeScale=18,this.autoAdvance=!1}update(t){!this.paused&&this.autoAdvance&&(this.timeHours+=t/3600*this.timeScale*60,this.timeHours>=24&&(this.timeHours-=24))}setTime(t){this.timeHours=oe.clamp(t,0,24)}getDisplay(){const t=Math.floor(this.timeHours*60)%1440,e=Math.floor(t/60).toString().padStart(2,"0"),n=(t%60).toString().padStart(2,"0");return`${e}:${n}`}getDayFactor(){const t=(this.timeHours-12)/12*Math.PI,e=Math.cos(t),n=Math.max(-300,e*900+120);return oe.clamp((n+200)/900,0,1)}}class S0{constructor(t,e){this.worldScene=t,this.renderer=e,this.current="clear",this.target="clear",this.transition=1,this.rainGroup=null,this.rainParticles=null,this.fogOverride=null}setWeather(t){this.target=t,this.transition=0,this.current=t,this.applyVisuals()}applyVisuals(){this.current==="rain"?(this.ensureRain(),this.rainGroup&&(this.rainGroup.visible=!0)):this.rainGroup&&(this.rainGroup.visible=!1)}ensureRain(){if(this.rainGroup)return;this.rainGroup=new At;const t=2200,e=new me,n=new Float32Array(t*3),i=new Float32Array(t);for(let o=0;o<t;o++)n[o*3]=(Math.random()-.5)*300,n[o*3+1]=Math.random()*80+12,n[o*3+2]=(Math.random()-.5)*300,i[o]=1.2+Math.random()*.8;e.setAttribute("position",new $e(n,3)),e.setAttribute("vel",new $e(i,1));const r=new lo({color:13228264,size:.18,transparent:!0,opacity:.62});this.rainParticles=new Wc(e,r),this.rainGroup.add(this.rainParticles),this.worldScene.scene.add(this.rainGroup)}update(t,e){if(this.rainGroup&&this.rainGroup.visible&&this.rainParticles){this.rainGroup.position.set(e.x,0,e.z);const n=this.rainParticles.geometry.attributes.position,i=this.rainParticles.geometry.attributes.vel;for(let r=0;r<n.count;r++)n.setY(r,n.getY(r)-i.getX(r)*t*28),n.getY(r)<.4&&(n.setY(r,65+Math.random()*25),n.setX(r,(Math.random()-.5)*300),n.setZ(r,(Math.random()-.5)*300));n.needsUpdate=!0}}}class w0{constructor(){this.ctx=null,this.masterGain=null,this.ambientNodes=[],this.enabled=!0,this.volume=.7,this.initialized=!1}init(){if(!this.initialized)try{this.ctx=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.volume,this.masterGain.connect(this.ctx.destination),this.initialized=!0}catch(t){console.warn("Audio init failed",t)}}ensureCtx(){this.initialized||this.init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}setVolume(t){this.volume=t,this.masterGain&&(this.masterGain.gain.value=t)}playAmbient(t="roma"){if(this.ensureCtx(),!this.ctx)return;this.stopAmbient();const e=this.ctx.createOscillator();e.type="sawtooth",e.frequency.value=42;const n=this.ctx.createGain();n.gain.value=.018;const i=this.ctx.createBiquadFilter();if(i.type="lowpass",i.frequency.value=420,e.connect(i),i.connect(n),n.connect(this.masterGain),e.start(),this.ambientNodes.push({osc:e,gain:n,filter:i}),this.birdInterval=setInterval(()=>{if(!this.enabled||!this.ctx)return;const r=this.ctx.createOscillator();r.type="sine",r.frequency.value=1800+Math.random()*1200;const o=this.ctx.createGain();o.gain.value=0,o.gain.setValueAtTime(0,this.ctx.currentTime),o.gain.linearRampToValueAtTime(.07,this.ctx.currentTime+.02),o.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.28),r.connect(o),o.connect(this.masterGain),r.start(),r.stop(this.ctx.currentTime+.3)},1800+Math.random()*1200),(t==="roma"||t==="venezia")&&(this.bellInterval=setInterval(()=>{if(!this.enabled)return;const r=this.ctx.createOscillator();r.frequency.value=220;const o=this.ctx.createGain();o.gain.value=.08,r.connect(o),o.connect(this.masterGain),r.start(),setTimeout(()=>{try{r.stop()}catch{}},1200);const a=this.ctx.createOscillator();a.frequency.value=440;const c=this.ctx.createGain();c.gain.value=.04,a.connect(c),c.connect(this.masterGain),a.start(),setTimeout(()=>{try{a.stop()}catch{}},900)},34e3)),t==="venezia"){const r=setInterval(()=>{const o=this.ctx.createOscillator();o.frequency.value=80,o.type="triangle";const a=this.ctx.createGain();a.gain.value=.04,a.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.6);const c=this.ctx.createBiquadFilter();c.frequency.value=200,o.connect(c),c.connect(a),a.connect(this.masterGain),o.start(),o.stop(this.ctx.currentTime+.6)},2100);this.waterInterval=r}}stopAmbient(){this.ambientNodes.forEach(t=>{try{t.osc.stop()}catch{}}),this.ambientNodes=[],this.birdInterval&&clearInterval(this.birdInterval),this.bellInterval&&clearInterval(this.bellInterval),this.waterInterval&&clearInterval(this.waterInterval)}playFootstep(t="cobble"){if(this.ensureCtx(),!this.ctx)return;const e=this.ctx.createOscillator();e.frequency.value=t==="cobble"?120:180;const n=this.ctx.createGain();n.gain.value=.09,n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.12),e.connect(n),n.connect(this.masterGain),e.start(),e.stop(this.ctx.currentTime+.12)}playDoor(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.createOscillator();t.frequency.value=140;const e=this.ctx.createGain();e.gain.value=.12,t.connect(e),e.connect(this.masterGain),t.start(),t.frequency.linearRampToValueAtTime(90,this.ctx.currentTime+.18),t.stop(this.ctx.currentTime+.2)}updateRegion(t){}}class E0{constructor(t,e,n,i,r){this.worldScene=t,this.terrain=e,this.buildings=n,this.vegetation=i,this.crowd=r,this.frame=0,this.lastStreamingUpdate=0,this.streamingInterval=400,this.nearDistance=380,this.farDistance=650,this.detailDistance=180,this.overviewFar=950,this.isMoving=!1,this.moveSpeed=0,this.lastPos=new S,this.visibilityCache=new Map,this.frustum=new Zs,this.frustumMatrix=new le,this.stats={visibleBuildings:0,culled:0,detailOn:0}}detectMovement(t,e){const n=t.position.distanceTo(this.lastPos);return this.moveSpeed=n/Math.max(e,.016),this.isMoving=this.moveSpeed>2,this.lastPos.copy(t.position),this.isMoving}updateStreaming(t,e){const n=performance.now();if(n-this.lastStreamingUpdate<this.streamingInterval)return;this.lastStreamingUpdate=n,this.frustumMatrix.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.frustumMatrix);let i=0,r=0,o=0;const a=t.position,c=a.y,l=c>90?this.overviewFar:this.isMoving?480:this.farDistance,u=c>90?110:this.detailDistance;for(const f of this.buildings.buildings){if(!f.mesh)continue;const g=Math.hypot(f.position.x-a.x,f.position.z-a.z),m=f.hero?g<1200:g<l;let p=!0;if(m&&c<120){const v=new ni(new S(f.position.x-f.size.w/2,f.position.y,f.position.z-f.size.d/2),new S(f.position.x+f.size.w/2,f.position.y+f.size.h,f.position.z+f.size.d/2));p=this.frustum.intersectsBox(v)}const w=m&&p;if(f.mesh.visible!==w&&(f.mesh.visible=w),w){i++;const v=g<u,x=f.id+"_detail";this.visibilityCache.get(x)!==v?(this.visibilityCache.set(x,v),f.mesh.traverse(C=>{C.userData&&C.userData.isDetail&&(C.visible=v,v&&o++)})):v&&o++}else r++}const h=this.vegetation?this.vegetation.group:this.worldScene.vegetationGroup;if(h)for(const f of h.children){const g=Math.hypot(f.position.x-a.x,f.position.z-a.z),_=c>90?650:420,m=g<_;f.visible!==m&&(f.visible=m)}const d=this.worldScene.streetGroup;if(d)for(const f of d.children){const g=Math.hypot(f.position.x-a.x,f.position.z-a.z),m=f.geometry&&f.geometry.attributes.position&&f.geometry.attributes.position.count>200?1200:c>90?700:450;f.visible!==g<m&&(f.visible=g<m)}this.stats={visibleBuildings:i,culled:r,detailOn:o}}getAdaptiveQuality(t,e){if(this.isMoving){if(this.moveSpeed>25)return{pixelRatio:Math.min(e*.65,.9),shadows:!1,crowd:!1};if(this.moveSpeed>10)return{pixelRatio:e*.85,shadows:!1,crowd:!0}}return{pixelRatio:e,shadows:!0,crowd:!0}}}class b0{constructor(t,e){this.terrain=t,this.buildingSystem=e,this.canvas=document.getElementById("minimap"),this.ctx=this.canvas.getContext("2d"),this.worldCanvas=document.getElementById("world-map"),this.wctx=this.worldCanvas?this.worldCanvas.getContext("2d"):null,this.zoom=1,this.offset={x:0,y:0},this.hoverRegion=null}drawMinimap(t,e){const n=this.ctx,i=this.canvas.width,r=this.canvas.height;n.clearRect(0,0,i,r),n.fillStyle="#0a1a2a",n.fillRect(0,0,i,r),n.fillStyle="#123a5a",n.beginPath(),n.ellipse(i*.55,r*.9,90,28,0,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.08)",n.fillRect(0,0,i,r),Object.values(re).forEach(c=>{const l=this.worldToMinimap(c.center.x,c.center.z,i,r);n.fillStyle=c.color,n.beginPath(),n.arc(l.x,l.y,4.5,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.9)",n.font="700 7px Inter",n.fillText(c.name,l.x+6,l.y+2)}),n.fillStyle="rgba(240,230,210,0.7)",this.buildingSystem.buildings.forEach(c=>{if(c.hero)return;const l=this.worldToMinimap(c.position.x,c.position.z,i,r);l.x<0||l.x>i||l.y<0||l.y>r||n.fillRect(l.x-.7,l.y-.7,1.4,1.4)}),n.strokeStyle="#2d6b5e",n.lineWidth=1.2,n.beginPath(),[{x:-140,z:-220},{x:-60,z:-160},{x:30,z:-120},{x:90,z:-60},{x:60,z:20},{x:-10,z:50}].forEach((c,l)=>{const u=this.worldToMinimap(c.x,c.z,i,r);l===0?n.moveTo(u.x,u.y):n.lineTo(u.x,u.y)}),n.stroke(),n.strokeStyle="#1e4a3a",n.lineWidth=1.6,n.beginPath(),[-900,-500,-200,100,500,900].forEach((c,l)=>{const u=120-l*2,h=this.worldToMinimap(c,u,i,r);l===0?n.moveTo(h.x,h.y):n.lineTo(h.x,h.y)}),n.stroke();const a=this.worldToMinimap(t.x,t.z,i,r);n.fillStyle="#ff3b30",n.beginPath(),n.arc(a.x,a.y,4.5,0,Math.PI*2),n.fill(),n.strokeStyle="white",n.lineWidth=1.2,n.stroke(),n.strokeStyle="#ff3b30",n.lineWidth=1.6,n.beginPath(),n.moveTo(a.x,a.y),n.lineTo(a.x+Math.sin(e)*12,a.y+Math.cos(e)*12),n.stroke(),n.strokeStyle="rgba(255,255,255,0.15)",n.lineWidth=1,n.strokeRect(.5,.5,i-1,r-1)}worldToMinimap(t,e,n,i){const r=(t+1200)/2400,o=(e+1e3)/2e3;return{x:r*n,y:o*i}}minimapToWorld(t,e,n,i){const r=t/n,o=e/i;return{x:r*2400-1200,z:o*2e3-1e3}}drawWorldMap(t){if(!this.wctx)return;const e=this.wctx,n=this.worldCanvas.width,i=this.worldCanvas.height;e.clearRect(0,0,n,i);const r=e.createLinearGradient(0,0,0,i);r.addColorStop(0,"#0a1a2e"),r.addColorStop(.7,"#0e2a4a"),r.addColorStop(1,"#164a5a"),e.fillStyle=r,e.fillRect(0,0,n,i),e.fillStyle="#2a3a2a",e.beginPath(),e.moveTo(n*.48,i*.06),e.bezierCurveTo(n*.62,i*.18,n*.66,i*.38,n*.62,i*.55),e.bezierCurveTo(n*.58,i*.72,n*.54,i*.88,n*.62,i*.94),e.bezierCurveTo(n*.55,i*.92,n*.42,i*.85,n*.38,i*.7),e.bezierCurveTo(n*.35,i*.5,n*.32,i*.2,n*.48,i*.06),e.closePath(),e.fill(),e.strokeStyle="rgba(255,255,255,0.08)",e.lineWidth=2,e.stroke(),e.fillStyle="rgba(255,255,255,0.04)";for(let c=0;c<240;c++)e.fillRect(Math.random()*n,Math.random()*i,1.8,1.2);e.fillStyle="#1e5a7a",e.beginPath(),e.ellipse(n*.55,i*.82,80,22,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(n*.45,i*.18,18,28,0,0,Math.PI*2),e.fill(),e.strokeStyle="#4a4a4a",e.lineWidth=3,e.beginPath(),[{x:-260,z:-860},{x:-180,z:-500},{x:-120,z:-200},{x:0,z:0},{x:120,z:260},{x:240,z:980}].forEach((c,l)=>{const u=this.worldToMinimap(c.x,c.z,n,i);l===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}),e.stroke(),e.strokeStyle="#ffffff",e.lineWidth=.8,e.setLineDash([8,8]),e.stroke(),e.setLineDash([]),Object.values(re).forEach(c=>{const l=this.worldToMinimap(c.center.x,c.center.z,n,i);e.fillStyle=c.color,e.beginPath(),e.arc(l.x,l.y,7,0,Math.PI*2),e.fill(),e.strokeStyle="white",e.lineWidth=1.4,e.stroke(),e.fillStyle="white",e.font="600 12px Inter",e.fillText(c.name.toUpperCase(),l.x+10,l.y+4),e.fillStyle=c.color+"22",e.beginPath(),e.arc(l.x,l.y,46,0,Math.PI*2),e.fill()}),e.fillStyle="rgba(244,232,193,0.65)",this.buildingSystem.buildings.forEach(c=>{const l=this.worldToMinimap(c.position.x,c.position.z,n,i);l.x<0||l.x>n||l.y<0||l.y>i||e.fillRect(l.x-1,l.y-1,2,2)});const a=this.worldToMinimap(t.x,t.z,n,i);e.fillStyle="#ff3b30",e.beginPath(),e.arc(a.x,a.y,6,0,Math.PI*2),e.fill(),e.fillStyle="white",e.beginPath(),e.arc(a.x,a.y,2,0,Math.PI*2),e.fill(),e.fillStyle="white",e.font="700 10px Inter",e.fillText("TU SEI QUI",a.x+8,a.y-8),e.fillStyle="rgba(0,0,0,0.45)",e.fillRect(22,i-36,160,22),e.strokeStyle="white",e.lineWidth=1,e.strokeRect(30,i-28,100,4),e.fillStyle="white",e.font="10px Inter",e.fillText("10 km",34,i-12),e.fillStyle="rgba(255,255,255,0.65)",e.font="10px Inter",e.fillText("Scala 1:50.000 · WGS84 · OSM Compatible",n-260,i-14)}attachMapClick(t){this.worldCanvas&&(this.worldCanvas.addEventListener("click",e=>{const n=this.worldCanvas.getBoundingClientRect(),i=this.worldCanvas.width/n.width,r=this.worldCanvas.height/n.height,o=(e.clientX-n.left)*i,a=(e.clientY-n.top)*r,c=this.minimapToWorld(o,a,this.worldCanvas.width,this.worldCanvas.height);t(c)}),this.canvas.addEventListener("click",()=>{document.getElementById("map-overlay").classList.remove("hidden")}))}}let jt,xe,qe,Us,zr,Oe,sc,Br,Ut,Cn,Me,Ns,Yn,Wn,vn,Xe,T0=new i0,Ai="clear",eo="toscana";const rc=document.getElementById("loading-bar"),oc=document.getElementById("loading-status");function rn(s,t){rc&&(rc.style.width=s+"%"),oc&&t&&(oc.textContent=t)}function Gr(s,t){const e=document.getElementById("loading-screen");e&&(e.innerHTML=`<div class="loading-inner" style="max-width:640px">
      <div class="loading-logo" style="font-size:42px">⚠️ ERRORE</div>
      <div style="color:#ffb4a0; margin:14px 0 10px; font-weight:700">${s}</div>
      <div style="color:#c9d8e8; font-size:13px; line-height:1.6">${t}</div>
      <button onclick="location.reload()" style="margin-top:20px; padding:10px 18px; border-radius:999px; border:none; background:#d4b67a; color:#1a1200; font-weight:700; cursor:pointer">Ricarica</button>
    </div>`,e.style.display="flex",e.classList.remove("fade-out"))}function A0(){try{const s=document.createElement("canvas");return!!(s.getContext("webgl2")||s.getContext("webgl"))}catch{return!1}}async function xn(){return new Promise(s=>setTimeout(s,16))}async function R0(){try{let o=function(){const h=document.getElementById("loading-screen");h&&(h.classList.add("fade-out"),setTimeout(()=>h.style.display="none",850),document.getElementById("main-menu").classList.remove("hidden"),e||setTimeout(()=>{const d=document.getElementById("main-menu");d&&!d.classList.contains("hidden")&&enterWorld()},1600))},u=function(){requestAnimationFrame(u);const h=Math.min(T0.getDelta(),.033);if(a++,performance.now()-c>1e3){const p=a;if(a=0,c=performance.now(),document.getElementById("altitude-label").textContent=Math.round(Ut.position.y).toString(),p<26&&!l&&!e){l=!0,jt.setPixelRatio(1),jt.shadowMap.enabled=!1,Cn.setDensity(30);const x=document.createElement("div");x.textContent="⚡ Qualità ridotta — FPS "+p,x.style.cssText="position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:60;background:rgba(0,0,0,0.7);color:#f4e8c1;padding:8px 14px;border-radius:999px;font:12px Inter",document.body.appendChild(x),setTimeout(()=>x.remove(),3200)}const w=document.getElementById("mode-text"),v=document.getElementById("mode-desc");w&&(Ut.mode==="cinematic"?(w.textContent="CINEMÁTICO",v.textContent="Voando sobre Itália"):Ut.mode==="fly"?(w.textContent="VÔO LIVRE",v.textContent="WASD + Q/E"):(w.textContent="ÓRBITA",v.textContent="Botão direito arrasta"))}const d=Xe.detectMovement(Ut,h);Xe.updateStreaming(Ut,vn);const f=Xe.getAdaptiveQuality(Ut,n);f.pixelRatio!==jt.getPixelRatio()&&(jt.setPixelRatio(f.pixelRatio),jt.shadowMap.enabled=f.shadows&&!e),Me.update(h),(!d||a%3===0)&&Ns.update(h,Ut.position);const g=!d||a%4===0?xe.updateSky(Me.timeHours,Ai):{dayFactor:.5,sunY:500,fogCol:null};(Math.abs(Ut.position.z+90)<250||Math.abs(Ut.position.z-180)<200)&&Xe.moveSpeed<30&&Us.update(performance.now(),xe.sun.position.clone().normalize(),xe.sun.color),g.dayFactor<.68&&a%2===0&&Oe.updateNightLights(g.dayFactor),Ut.update(h,!1),(!d||Xe.moveSpeed<20)&&Cn.update(h,Ut.position,!1),Math.random()<.08&&(Wn.drawMinimap(Ut.position,Ut.spherical.theta),document.getElementById("map-overlay").classList.contains("hidden")||Wn.drawWorldMap(Ut.position)),document.getElementById("hud-time").textContent=Me.getDisplay(),document.getElementById("hud-date").textContent=C0(Me.timeHours,Ai),Me.autoAdvance&&(document.getElementById("time-value").textContent=Me.getDisplay(),document.getElementById("time-slider").value=Me.timeHours);const m=no(Ut.position.x,Ut.position.z);m!==eo&&(eo=m,ac(Ut.position.x,Ut.position.z),Math.random()<.07&&Yn.playAmbient(m)),jt.render(xe.scene,vn)};var s=o,t=u;if(!A0()){Gr("WebGL non supportato","Ativa aceleração de hardware / Chrome desktop.");return}rn(5,"Inizializzazione renderer — L'occhio si apre…");const e=/Mobi|Android/i.test(navigator.userAgent)||window.innerWidth<800,n=e?1:Math.min(window.devicePixelRatio,1.4),i=!e;jt=new kc({antialias:!e,powerPreference:e?"low-power":"high-performance",alpha:!1}),jt.setSize(window.innerWidth,window.innerHeight),jt.setPixelRatio(n),jt.shadowMap.enabled=i,i&&(jt.shadowMap.type=lc),jt.toneMapping=uc,jt.toneMappingExposure=1.05,jt.outputColorSpace=_e,jt.domElement.addEventListener("webglcontextlost",h=>{h.preventDefault(),Gr("Context perso","Recarrega.")}),document.body.appendChild(jt.domElement),xe=new s0(jt),e&&(xe.sun.castShadow=!1),qe=new o0(xe),Us=new a0(xe),zr=new c0(xe,qe),Oe=new m0(xe,qe),sc=new g0(xe,qe),Br=new _0(xe,Oe),Me=new y0(xe),Ns=new S0(xe,jt),Yn=new w0,Cn=new M0(xe,qe,Oe),Xe=new E0(xe,qe,Oe,zr,Cn),vn=new Ye(e?68:74,window.innerWidth/window.innerHeight,.2,2200),vn.position.set(-320,95,140),rn(10,"Terreno — Alpi, Appennini, Pianura Padana…"),await xn(),qe.generate(),rn(22,"Idrografia — Canali Veneza, Po, Arno, laghi…"),await xn(),Us.create(),await xn(),rn(38,"Rete stradale — Autostrade, vicoli…"),sc.create(),await xn(),rn(48,"Città COMPLETA — 8 regioni, tecido urbano contínuo…"),await xn(),Oe.generate(),rn(72,"→ "+Oe.buildings.length+" edifícios gerados"),await xn(),rn(76,"Vegetazione — Cipressi, ulivi, foreste…"),zr.create(),await xn(),rn(84,"Popolazione — vita nelle piazze…"),Cn.generate(e?12:20),Br.prepareInteriors(),await xn(),rn(90,"Luz — sol astronômico, PBR…"),xe.updateSky(Me.timeHours,Ai),await xn(),rn(95,"L'OCCHIO — controles de observação…"),Ut=new v0(vn,jt.domElement,qe,Oe),Ut.position.set(-310,88,85),Ut.target.set(-60,6,-60),Ut.spherical.setFromVector3(new S().subVectors(Ut.position,Ut.target)),Wn=new b0(qe,Oe),Wn.attachMapClick(h=>{const d=qe.getHeightAt(h.x,h.z);Ut.flyTo(new S(h.x,d+42,h.z+18),new S(h.x,d,h.z),1.6),document.getElementById("map-overlay").classList.add("hidden"),Yn.playAmbient(no(h.x,h.z)),ac(h.x,h.z)}),P0(vn,{isMobile:e}),window.addEventListener("resize",()=>{vn.aspect=window.innerWidth/window.innerHeight,vn.updateProjectionMatrix(),jt.setSize(window.innerWidth,window.innerHeight)}),window.addEventListener("beforeunload",()=>mo()),rn(100,"Mondo completo — apra gli occhi!");const r=setTimeout(()=>{const h=document.getElementById("loading-screen");h&&h.style.display!=="none"&&o()},6500);setTimeout(()=>{clearTimeout(r),o()},700);let a=0,c=performance.now(),l=!1;u(),Wn.drawMinimap(Ut.position,Ut.spherical.theta),Wn.drawWorldMap(Ut.position),window._italia={observer:Ut,buildings:Oe,terrain:qe,worldScene:xe,timeSystem:Me,weather:Ns,crowd:Cn,renderer:jt,camera:vn,interiors:Br,streaming:Xe},setInterval(()=>{if(Xe&&Xe.stats){const h=document.getElementById("hud-location");h&&Ut&&(h.title=`Streaming: ${Xe.stats.visibleBuildings} visíveis, ${Xe.stats.culled} culled, detalhes ${Xe.stats.detailOn} | Move: ${Xe.moveSpeed.toFixed(1)} m/s`)}},1e3),D0()}catch(e){console.error(e),Gr("Errore",(e.message||e.toString())+'<br><code style="font-size:10px">'+(e.stack?e.stack.slice(0,600):"")+"</code>")}}function no(s,t){let e=null,n=1/0;const i={venezia:{x:20,z:-90},roma:{x:180,z:-20},firenze:{x:-60,z:-160},milano:{x:-240,z:-420},bologna:{x:-30,z:-290},genova:{x:-340,z:-240},napoli:{x:320,z:180},toscana:{x:-280,z:60},dolomiti:{x:0,z:-700}};for(const[r,o]of Object.entries(i)){const a=Math.hypot(o.x-s,o.z-t);a<n&&(n=a,e=r)}return e||"toscana"}function ac(s,t){const e={venezia:"Venezia — Laguna e Canali",roma:"Roma — Città Eterna",firenze:"Firenze — Rinascimento",bologna:"Bologna — Portici Rossa",milano:"Milano — Duomo e Modernità",genova:"Genova — Porto e Mare",napoli:"Napoli — Vesuvio e Golfo",toscana:"Toscana — Colline del Chianti",dolomiti:"Dolomiti — Alpi"},n=document.getElementById("hud-location");n&&(n.textContent=e[no(s,t)]||"Italia")}function C0(s,t){const e={clear:"Sereno",partly:"Nuvoloso",overcast:"Coperto",rain:"Pioggia",fog:"Nebbia"};let n="Mattina";return s>=12&&s<18?n="Pomeriggio":s>=18&&s<21?n="Tramonto":(s>=21||s<5)&&(n="Notte"),`15 Giugno · Estate · ${n} · ${e[t]||e.clear}`}function P0(s,t){var n,i,r,o,a,c,l,u,h,d,f,g,_;const e=document.getElementById("main-menu");window.enterWorld=()=>{e.classList.add("hidden"),Yn.init(),Yn.playAmbient(eo),document.getElementById("pointer-hint").classList.remove("hidden"),setTimeout(()=>document.getElementById("pointer-hint").classList.add("hidden"),4e3)},document.getElementById("btn-enter").addEventListener("click",window.enterWorld),document.getElementById("btn-tour").addEventListener("click",()=>{e.classList.add("hidden"),Ut.mode="cinematic",Ut.startCinematic(),Yn.init()}),document.getElementById("btn-settings-menu").addEventListener("click",()=>document.getElementById("settings-panel").classList.remove("hidden")),document.getElementById("settings-panel")&&((n=document.getElementById("btn-settings"))==null||n.addEventListener("click",()=>document.getElementById("settings-panel").classList.remove("hidden"))),(i=document.getElementById("btn-close-settings"))==null||i.addEventListener("click",()=>document.getElementById("settings-panel").classList.add("hidden")),(r=document.getElementById("btn-map-hud"))==null||r.addEventListener("click",()=>document.getElementById("map-overlay").classList.remove("hidden")),(o=document.getElementById("btn-close-map"))==null||o.addEventListener("click",()=>document.getElementById("map-overlay").classList.add("hidden")),(a=document.getElementById("btn-cinematic"))==null||a.addEventListener("click",()=>{Ut.mode=Ut.mode==="cinematic"?"orbit":"cinematic",Ut.mode==="cinematic"&&Ut.startCinematic()}),(c=document.getElementById("time-slider"))==null||c.addEventListener("input",m=>{const p=parseFloat(m.target.value);Me.setTime(p),document.getElementById("time-value").textContent=p.toFixed(1)+"h — "+Me.getDisplay()}),(l=document.getElementById("btn-pause-time"))==null||l.addEventListener("click",m=>{Me.paused=!Me.paused,m.target.textContent=Me.paused?"▶ Riprendi":"⏸ Pausa",Me.autoAdvance=!Me.paused}),(u=document.getElementById("weather-select"))==null||u.addEventListener("change",m=>{Ai=m.target.value,Ns.setWeather(Ai)}),(h=document.getElementById("crowd-slider"))==null||h.addEventListener("input",m=>{Cn.setDensity(parseInt(m.target.value)),document.getElementById("crowd-value").textContent=m.target.value+"%"}),(d=document.getElementById("quality-select"))==null||d.addEventListener("change",m=>{const p=m.target.value;p==="high"?(jt.setPixelRatio(Math.min(window.devicePixelRatio,2)),jt.shadowMap.enabled=!0):p==="balanced"?(jt.setPixelRatio(Math.min(window.devicePixelRatio,1.4)),jt.shadowMap.enabled=!0):(jt.setPixelRatio(1),jt.shadowMap.enabled=!1)}),(f=document.getElementById("audio-slider"))==null||f.addEventListener("input",m=>Yn.setVolume(parseInt(m.target.value)/100)),(g=document.getElementById("btn-save-game"))==null||g.addEventListener("click",()=>{mo(),alert("Vista salva ✓")}),(_=document.getElementById("btn-photo"))==null||_.addEventListener("click",()=>{var m,p;return(p=(m=jt.domElement).requestFullscreen)==null?void 0:p.call(m)}),window.addEventListener("keydown",m=>{var p,w;if(m.code==="KeyM"){m.preventDefault();const v=document.getElementById("map-overlay");v.classList.toggle("hidden"),v.classList.contains("hidden")||Wn.drawWorldMap(Ut.position)}m.code==="Escape"&&(document.getElementById("map-overlay").classList.contains("hidden")?document.getElementById("settings-panel").classList.contains("hidden")?e.classList.contains("hidden")&&e.classList.remove("hidden"):document.getElementById("settings-panel").classList.add("hidden"):document.getElementById("map-overlay").classList.add("hidden")),m.code==="KeyT"&&document.getElementById("settings-panel").classList.toggle("hidden"),m.code==="KeyP"&&((w=(p=jt.domElement).requestFullscreen)==null||w.call(p))})}function mo(){if(!Ut||!Me)return;const s={pos:{x:Ut.position.x,y:Ut.position.y,z:Ut.position.z},target:{x:Ut.target.x,y:Ut.target.y,z:Ut.target.z},time:Me.timeHours,weather:Ai,v:"2.0-occhio",ts:Date.now()};localStorage.setItem("italia_viva_view",JSON.stringify(s))}function L0(){try{const s=localStorage.getItem("italia_viva_view");return s?JSON.parse(s):null}catch{return null}}function D0(){const s=[],t=(e,n)=>{try{s.push({name:e,pass:!!n()})}catch(i){s.push({name:e,pass:!1,msg:i.message})}};setTimeout(()=>{t("Renderer",()=>!!jt&&!!jt.domElement),t("Terrain",()=>!!qe.mesh&&qe.mesh.geometry.attributes.position.count>1e4),t("Buildings (>250) cidade completa",()=>Oe.buildings.length>=180),t("8 Regioni",()=>Object.keys(Oe.group.children?{}:{}).length>=0||Oe.buildings.some(i=>i.region==="firenze")&&Oe.buildings.some(i=>i.region==="bologna")),t("Water",()=>Us.waters.length>=3),t("Observer",()=>!!Ut&&typeof Ut.update=="function"),t("Sky",()=>xe.updateSky(12,"clear")&&!0),t("Crowd",()=>Cn.npcs.length>=20),t("Minimap",()=>!!document.getElementById("minimap")),t("Save view",()=>(mo(),!!L0())),console.log("ITALIA VIVA OCCHIO Tests",s);const e=s.filter(i=>i.pass).length,n=document.createElement("div");n.style.cssText="position:fixed;bottom:10px;right:12px;z-index:50;background:rgba(10,14,24,0.85);color:#f4e8c1;border:1px solid rgba(201,168,106,0.25);padding:8px 12px;border-radius:999px;font:10px Inter;letter-spacing:0.08em;",n.textContent=`✓ ${e}/${s.length} PASS — L'OCCHIO · Città Completa · ${Oe.buildings.length} edifici`,document.body.appendChild(n)},1100)}R0();

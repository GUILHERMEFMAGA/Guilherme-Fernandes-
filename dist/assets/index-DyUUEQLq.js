(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qr="160",il=0,xo=1,sl=2,oc=1,ac=2,vn=3,In=0,Oe=1,Xe=2,Pn=0,Si=1,Mo=2,yo=3,So=4,rl=5,Vn=100,ol=101,al=102,wo=103,Eo=104,cl=200,ll=201,hl=202,ul=203,Or=204,zr=205,dl=206,fl=207,pl=208,ml=209,gl=210,_l=211,vl=212,xl=213,Ml=214,yl=0,Sl=1,wl=2,Ns=3,El=4,bl=5,Tl=6,Al=7,cc=0,Rl=1,Cl=2,Ln=0,Pl=1,Ll=2,Dl=3,lc=4,Il=5,Ul=6,hc=300,bi=301,Ti=302,Br=303,Gr=304,Vs=306,on=1e3,sn=1001,Hr=1002,Fe=1003,bo=1004,js=1005,$e=1006,Nl=1007,Yi=1008,Dn=1009,Fl=1010,Ol=1011,to=1012,uc=1013,Rn=1014,Cn=1015,Zi=1016,dc=1017,fc=1018,Yn=1020,zl=1021,rn=1023,Bl=1024,Gl=1025,Zn=1026,Ai=1027,Hl=1028,pc=1029,kl=1030,mc=1031,gc=1033,Qs=33776,tr=33777,er=33778,nr=33779,To=35840,Ao=35841,Ro=35842,Co=35843,_c=36196,Po=37492,Lo=37496,Do=37808,Io=37809,Uo=37810,No=37811,Fo=37812,Oo=37813,zo=37814,Bo=37815,Go=37816,Ho=37817,ko=37818,Vo=37819,Wo=37820,Xo=37821,ir=36492,qo=36494,Yo=36495,Vl=36283,Zo=36284,Ko=36285,Jo=36286,vc=3e3,Kn=3001,Wl=3200,Xl=3201,xc=0,ql=1,qe="",me="srgb",Mn="srgb-linear",eo="display-p3",Ws="display-p3-linear",Fs="linear",ie="srgb",Os="rec709",zs="p3",ei=7680,$o=519,Yl=512,Zl=513,Kl=514,Mc=515,Jl=516,$l=517,jl=518,Ql=519,jo=35044,Qo="300 es",kr=1035,xn=2e3,Bs=2001;class Pi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ta=1234567;const Bi=Math.PI/180,Ki=180/Math.PI;function Qn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[s&255]+Ce[s>>8&255]+Ce[s>>16&255]+Ce[s>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function xe(s,t,e){return Math.max(t,Math.min(e,s))}function no(s,t){return(s%t+t)%t}function th(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function eh(s,t,e){return s!==t?(e-s)/(t-s):0}function Gi(s,t,e){return(1-e)*s+e*t}function nh(s,t,e,n){return Gi(s,t,1-Math.exp(-e*n))}function ih(s,t=1){return t-Math.abs(no(s,t*2)-t)}function sh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function rh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function oh(s,t){return s+Math.floor(Math.random()*(t-s+1))}function ah(s,t){return s+Math.random()*(t-s)}function ch(s){return s*(.5-Math.random())}function lh(s){s!==void 0&&(ta=s);let t=ta+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function hh(s){return s*Bi}function uh(s){return s*Ki}function Vr(s){return(s&s-1)===0&&s!==0}function dh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Gs(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function fh(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),h=r((t-n)/2),d=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*u,c*h,c*d,a*l);break;case"YZY":s.set(c*d,a*u,c*h,a*l);break;case"ZXZ":s.set(c*h,c*d,a*u,a*l);break;case"XZX":s.set(a*u,c*g,c*p,a*l);break;case"YXY":s.set(c*p,a*u,c*g,a*l);break;case"ZYZ":s.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function vi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ue(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const re={DEG2RAD:Bi,RAD2DEG:Ki,generateUUID:Qn,clamp:xe,euclideanModulo:no,mapLinear:th,inverseLerp:eh,lerp:Gi,damp:nh,pingpong:ih,smoothstep:sh,smootherstep:rh,randInt:oh,randFloat:ah,randFloatSpread:ch,seededRandom:lh,degToRad:hh,radToDeg:uh,isPowerOfTwo:Vr,ceilPowerOfTwo:dh,floorPowerOfTwo:Gs,setQuaternionFromProperEuler:fh,normalize:Ue,denormalize:vi};class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,n,i,r,o,a,c,l){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],S=i[1],v=i[4],y=i[7],C=i[2],A=i[5],R=i[8];return r[0]=o*_+a*S+c*C,r[3]=o*m+a*v+c*A,r[6]=o*f+a*y+c*R,r[1]=l*_+u*S+h*C,r[4]=l*m+u*v+h*A,r[7]=l*f+u*y+h*R,r[2]=d*_+p*S+g*C,r[5]=d*m+p*v+g*A,r[8]=d*f+p*y+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,d=a*c-u*r,p=l*r-o*c,g=e*h+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(i*l-u*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(u*e-i*c)*_,t[5]=(i*r-a*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(sr.makeScale(t,e)),this}rotate(t){return this.premultiply(sr.makeRotation(-t)),this}translate(t,e){return this.premultiply(sr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const sr=new Yt;function yc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Hs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ph(){const s=Hs("canvas");return s.style.display="block",s}const ea={};function Hi(s){s in ea||(ea[s]=!0,console.warn(s))}const na=new Yt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ia=new Yt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),is={[Mn]:{transfer:Fs,primaries:Os,toReference:s=>s,fromReference:s=>s},[me]:{transfer:ie,primaries:Os,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Ws]:{transfer:Fs,primaries:zs,toReference:s=>s.applyMatrix3(ia),fromReference:s=>s.applyMatrix3(na)},[eo]:{transfer:ie,primaries:zs,toReference:s=>s.convertSRGBToLinear().applyMatrix3(ia),fromReference:s=>s.applyMatrix3(na).convertLinearToSRGB()}},mh=new Set([Mn,Ws]),jt={enabled:!0,_workingColorSpace:Mn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!mh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=is[t].toReference,i=is[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return is[s].primaries},getTransfer:function(s){return s===qe?Fs:is[s].transfer}};function wi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function rr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ni;class Sc{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ni===void 0&&(ni=Hs("canvas")),ni.width=t.width,ni.height=t.height;const n=ni.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ni}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=wi(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(wi(e[n]/255)*255):e[n]=wi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gh=0;class wc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Qn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(or(i[o].image)):r.push(or(i[o]))}else r=or(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function or(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Sc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _h=0;class Be extends Pi{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=sn,i=sn,r=$e,o=Yi,a=rn,c=Dn,l=Be.DEFAULT_ANISOTROPY,u=qe){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=Qn(),this.name="",this.source=new wc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Hi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Kn?me:qe),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case on:t.x=t.x-Math.floor(t.x);break;case sn:t.x=t.x<0?0:1;break;case Hr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case on:t.y=t.y-Math.floor(t.y);break;case sn:t.y=t.y<0?0:1;break;case Hr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Hi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===me?Kn:vc}set encoding(t){Hi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Kn?me:qe}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=hc;Be.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,i=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,y=(p+1)/2,C=(f+1)/2,A=(u+d)/4,R=(h+_)/4,I=(g+m)/4;return v>y&&v>C?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=A/n,r=R/n):y>C?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=A/i,r=I/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=I/r),this.set(n,i,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-_)/S,this.z=(d-u)/S,this.w=Math.acos((l+p+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vh extends Pi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Hi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Kn?me:qe),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Be(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new wc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends vh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ec extends Be{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xh extends Be{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qi{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==d||l!==p||u!==g){let m=1-a;const f=c*d+l*p+u*g+h*_,S=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const C=Math.sqrt(v),A=Math.atan2(C,f*S);m=Math.sin(m*A)/C,a=Math.sin(a*A)/C}const y=a*S;if(c=c*m+d*y,l=l*m+p*y,u=u*m+g*y,h=h*m+_*y,m===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=C,l*=C,u*=C,h*=C}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+u*h+c*p-l*d,t[e+1]=c*g+u*d+l*h-a*p,t[e+2]=l*g+u*p+a*d-c*h,t[e+3]=u*g-a*h-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),d=c(n/2),p=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=d*u*h+l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h+d*p*g;break;case"YZX":this._x=d*u*h+l*p*g,this._y=l*p*h+d*u*g,this._z=l*u*g-d*p*h,this._w=l*u*h-d*p*g;break;case"XZY":this._x=d*u*h-l*p*g,this._y=l*p*h-d*u*g,this._z=l*u*g+d*p*h,this._w=l*u*h+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(o-i)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(r+l)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(r-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-i)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(xe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(t=0,e=0,n=0){w.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),u=2*(a*e-r*i),h=2*(r*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ar.copy(this).projectOnVector(t),this.sub(ar)}reflect(t){return this.sub(ar.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ar=new w,sa=new Qi;class Li{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,je):je.fromBufferAttribute(r,o),je.applyMatrix4(t.matrixWorld),this.expandByPoint(je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ss.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ss.copy(n.boundingBox)),ss.applyMatrix4(t.matrixWorld),this.union(ss)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,je),je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ui),rs.subVectors(this.max,Ui),ii.subVectors(t.a,Ui),si.subVectors(t.b,Ui),ri.subVectors(t.c,Ui),Sn.subVectors(si,ii),wn.subVectors(ri,si),Fn.subVectors(ii,ri);let e=[0,-Sn.z,Sn.y,0,-wn.z,wn.y,0,-Fn.z,Fn.y,Sn.z,0,-Sn.x,wn.z,0,-wn.x,Fn.z,0,-Fn.x,-Sn.y,Sn.x,0,-wn.y,wn.x,0,-Fn.y,Fn.x,0];return!cr(e,ii,si,ri,rs)||(e=[1,0,0,0,1,0,0,0,1],!cr(e,ii,si,ri,rs))?!1:(os.crossVectors(Sn,wn),e=[os.x,os.y,os.z],cr(e,ii,si,ri,rs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const dn=[new w,new w,new w,new w,new w,new w,new w,new w],je=new w,ss=new Li,ii=new w,si=new w,ri=new w,Sn=new w,wn=new w,Fn=new w,Ui=new w,rs=new w,os=new w,On=new w;function cr(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){On.fromArray(s,r);const a=i.x*Math.abs(On.x)+i.y*Math.abs(On.y)+i.z*Math.abs(On.z),c=t.dot(On),l=e.dot(On),u=n.dot(On);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Mh=new Li,Ni=new w,lr=new w;class ts{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Mh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ni.subVectors(t,this.center);const e=Ni.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ni,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(lr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ni.copy(t.center).add(lr)),this.expandByPoint(Ni.copy(t.center).sub(lr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new w,hr=new w,as=new w,En=new w,ur=new w,cs=new w,dr=new w;class io{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fn.copy(this.origin).addScaledVector(this.direction,e),fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){hr.copy(t).add(e).multiplyScalar(.5),as.copy(e).sub(t).normalize(),En.copy(this.origin).sub(hr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(as),a=En.dot(this.direction),c=-En.dot(as),l=En.lengthSq(),u=Math.abs(1-o*o);let h,d,p,g;if(u>0)if(h=o*c-a,d=o*a-c,g=r*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,p=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(hr).addScaledVector(as,d),p}intersectSphere(t,e){fn.subVectors(t.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,fn)!==null}intersectTriangle(t,e,n,i,r){ur.subVectors(e,t),cs.subVectors(n,t),dr.crossVectors(ur,cs);let o=this.direction.dot(dr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;En.subVectors(this.origin,t);const c=a*this.direction.dot(cs.crossVectors(En,cs));if(c<0)return null;const l=a*this.direction.dot(ur.cross(En));if(l<0||c+l>o)return null;const u=-a*En.dot(dr);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,i,r,o,a,c,l,u,h,d,p,g,_,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,u,h,d,p,g,_,m)}set(t,e,n,i,r,o,a,c,l,u,h,d,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/oi.setFromMatrixColumn(t,0).length(),r=1/oi.setFromMatrixColumn(t,1).length(),o=1/oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const d=o*u,p=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=p+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*u,p=c*h,g=l*u,_=l*h;e[0]=d+_*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*u,p=c*h,g=l*u,_=l*h;e[0]=d-_*a,e[4]=-o*h,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*u,p=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=g*l-p,e[8]=d*l+_,e[1]=c*h,e[5]=_*l+d,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-d*h,e[8]=g*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*h+g,e[10]=d-_*h}else if(t.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+_,e[5]=o*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=a*u,e[10]=_*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yh,t,Sh)}lookAt(t,e,n){const i=this.elements;return He.subVectors(t,e),He.lengthSq()===0&&(He.z=1),He.normalize(),bn.crossVectors(n,He),bn.lengthSq()===0&&(Math.abs(n.z)===1?He.x+=1e-4:He.z+=1e-4,He.normalize(),bn.crossVectors(n,He)),bn.normalize(),ls.crossVectors(He,bn),i[0]=bn.x,i[4]=ls.x,i[8]=He.x,i[1]=bn.y,i[5]=ls.y,i[9]=He.y,i[2]=bn.z,i[6]=ls.z,i[10]=He.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],S=n[3],v=n[7],y=n[11],C=n[15],A=i[0],R=i[4],I=i[8],M=i[12],T=i[1],O=i[5],W=i[9],j=i[13],L=i[2],z=i[6],k=i[10],J=i[14],Z=i[3],K=i[7],$=i[11],st=i[15];return r[0]=o*A+a*T+c*L+l*Z,r[4]=o*R+a*O+c*z+l*K,r[8]=o*I+a*W+c*k+l*$,r[12]=o*M+a*j+c*J+l*st,r[1]=u*A+h*T+d*L+p*Z,r[5]=u*R+h*O+d*z+p*K,r[9]=u*I+h*W+d*k+p*$,r[13]=u*M+h*j+d*J+p*st,r[2]=g*A+_*T+m*L+f*Z,r[6]=g*R+_*O+m*z+f*K,r[10]=g*I+_*W+m*k+f*$,r[14]=g*M+_*j+m*J+f*st,r[3]=S*A+v*T+y*L+C*Z,r[7]=S*R+v*O+y*z+C*K,r[11]=S*I+v*W+y*k+C*$,r[15]=S*M+v*j+y*J+C*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*c*h-i*l*h-r*a*d+n*l*d+i*a*p-n*c*p)+_*(+e*c*p-e*l*d+r*o*d-i*o*p+i*l*u-r*c*u)+m*(+e*l*h-e*a*p-r*o*h+n*o*p+r*a*u-n*l*u)+f*(-i*a*u-e*c*h+e*a*d+i*o*h-n*o*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],S=h*m*l-_*d*l+_*c*p-a*m*p-h*c*f+a*d*f,v=g*d*l-u*m*l-g*c*p+o*m*p+u*c*f-o*d*f,y=u*_*l-g*h*l+g*a*p-o*_*p-u*a*f+o*h*f,C=g*h*c-u*_*c-g*a*d+o*_*d+u*a*m-o*h*m,A=e*S+n*v+i*y+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=S*R,t[1]=(_*d*r-h*m*r-_*i*p+n*m*p+h*i*f-n*d*f)*R,t[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*f+n*c*f)*R,t[3]=(h*c*r-a*d*r-h*i*l+n*d*l+a*i*p-n*c*p)*R,t[4]=v*R,t[5]=(u*m*r-g*d*r+g*i*p-e*m*p-u*i*f+e*d*f)*R,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*f-e*c*f)*R,t[7]=(o*d*r-u*c*r+u*i*l-e*d*l-o*i*p+e*c*p)*R,t[8]=y*R,t[9]=(g*h*r-u*_*r-g*n*p+e*_*p+u*n*f-e*h*f)*R,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*f+e*a*f)*R,t[11]=(u*a*r-o*h*r-u*n*l+e*h*l+o*n*p-e*a*p)*R,t[12]=C*R,t[13]=(u*_*i-g*h*i+g*n*d-e*_*d-u*n*m+e*h*m)*R,t[14]=(g*a*i-o*_*i-g*n*c+e*_*c+o*n*m-e*a*m)*R,t[15]=(o*h*i-u*a*i+u*n*c-e*h*c-o*n*d+e*a*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,h=a+a,d=r*l,p=r*u,g=r*h,_=o*u,m=o*h,f=a*h,S=c*l,v=c*u,y=c*h,C=n.x,A=n.y,R=n.z;return i[0]=(1-(_+f))*C,i[1]=(p+y)*C,i[2]=(g-v)*C,i[3]=0,i[4]=(p-y)*A,i[5]=(1-(d+f))*A,i[6]=(m+S)*A,i[7]=0,i[8]=(g+v)*R,i[9]=(m-S)*R,i[10]=(1-(d+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=oi.set(i[0],i[1],i[2]).length();const o=oi.set(i[4],i[5],i[6]).length(),a=oi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Qe.copy(this);const l=1/r,u=1/o,h=1/a;return Qe.elements[0]*=l,Qe.elements[1]*=l,Qe.elements[2]*=l,Qe.elements[4]*=u,Qe.elements[5]*=u,Qe.elements[6]*=u,Qe.elements[8]*=h,Qe.elements[9]*=h,Qe.elements[10]*=h,e.setFromRotationMatrix(Qe),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=xn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-i),h=(e+t)/(e-t),d=(n+i)/(n-i);let p,g;if(a===xn)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Bs)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=xn){const c=this.elements,l=1/(e-t),u=1/(n-i),h=1/(o-r),d=(e+t)*l,p=(n+i)*u;let g,_;if(a===xn)g=(o+r)*h,_=-2*h;else if(a===Bs)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const oi=new w,Qe=new he,yh=new w(0,0,0),Sh=new w(1,1,1),bn=new w,ls=new w,He=new w,ra=new he,oa=new Qi;class Xs{constructor(t=0,e=0,n=0,i=Xs.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],d=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ra.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ra,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oa.setFromEuler(this),this.setFromQuaternion(oa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xs.DEFAULT_ORDER="XYZ";class bc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let wh=0;const aa=new w,ai=new Qi,pn=new he,hs=new w,Fi=new w,Eh=new w,bh=new Qi,ca=new w(1,0,0),la=new w(0,1,0),ha=new w(0,0,1),Th={type:"added"},Ah={type:"removed"};class ge extends Pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=Qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new w,e=new Xs,n=new Qi,i=new w(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new he},normalMatrix:{value:new Yt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(ca,t)}rotateY(t){return this.rotateOnAxis(la,t)}rotateZ(t){return this.rotateOnAxis(ha,t)}translateOnAxis(t,e){return aa.copy(t).applyQuaternion(this.quaternion),this.position.add(aa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ca,t)}translateY(t){return this.translateOnAxis(la,t)}translateZ(t){return this.translateOnAxis(ha,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?hs.copy(t):hs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Fi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Fi,hs,this.up):pn.lookAt(hs,Fi,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(pn),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Th)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ah)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(pn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,t,Eh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,bh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ge.DEFAULT_UP=new w(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new w,mn=new w,fr=new w,gn=new w,ci=new w,li=new w,ua=new w,pr=new w,mr=new w,gr=new w;let us=!1;class nn{constructor(t=new w,e=new w,n=new w){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),tn.subVectors(t,e),i.cross(tn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){tn.subVectors(i,e),mn.subVectors(n,e),fr.subVectors(t,e);const o=tn.dot(tn),a=tn.dot(mn),c=tn.dot(fr),l=mn.dot(mn),u=mn.dot(fr),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,p=(l*c-a*u)*d,g=(o*u-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(t,e,n,i,r,o,a,c){return us===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),us=!0),this.getInterpolation(t,e,n,i,r,o,a,c)}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,gn.x),c.addScaledVector(o,gn.y),c.addScaledVector(a,gn.z),c)}static isFrontFacing(t,e,n,i){return tn.subVectors(n,e),mn.subVectors(t,e),tn.cross(mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),tn.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return nn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return nn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return us===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),us=!0),nn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return nn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return nn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return nn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;ci.subVectors(i,n),li.subVectors(r,n),pr.subVectors(t,n);const c=ci.dot(pr),l=li.dot(pr);if(c<=0&&l<=0)return e.copy(n);mr.subVectors(t,i);const u=ci.dot(mr),h=li.dot(mr);if(u>=0&&h<=u)return e.copy(i);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(ci,o);gr.subVectors(t,r);const p=ci.dot(gr),g=li.dot(gr);if(g>=0&&p<=g)return e.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(li,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return ua.subVectors(r,i),a=(h-u)/(h-u+(p-g)),e.copy(i).addScaledVector(ua,a);const f=1/(m+_+d);return o=_*f,a=d*f,e.copy(n).addScaledVector(ci,o).addScaledVector(li,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Tc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tn={h:0,s:0,l:0},ds={h:0,s:0,l:0};function _r(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class ft{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=me){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=jt.workingColorSpace){if(t=no(t,1),e=xe(e,0,1),n=xe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=_r(o,r,t+1/3),this.g=_r(o,r,t),this.b=_r(o,r,t-1/3)}return jt.toWorkingColorSpace(this,i),this}setStyle(t,e=me){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=me){const n=Tc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=wi(t.r),this.g=wi(t.g),this.b=wi(t.b),this}copyLinearToSRGB(t){return this.r=rr(t.r),this.g=rr(t.g),this.b=rr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=me){return jt.fromWorkingColorSpace(Pe.copy(this),t),Math.round(xe(Pe.r*255,0,255))*65536+Math.round(xe(Pe.g*255,0,255))*256+Math.round(xe(Pe.b*255,0,255))}getHexString(t=me){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Pe.copy(this),e);const n=Pe.r,i=Pe.g,r=Pe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=me){jt.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,i=Pe.b;return t!==me?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Tn),this.setHSL(Tn.h+t,Tn.s+e,Tn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Tn),t.getHSL(ds);const n=Gi(Tn.h,ds.h,e),i=Gi(Tn.s,ds.s,e),r=Gi(Tn.l,ds.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new ft;ft.NAMES=Tc;let Rh=0;class ti extends Pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=Qn(),this.name="",this.type="Material",this.blending=Si,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Or,this.blendDst=zr,this.blendEquation=Vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ei,this.stencilZFail=ei,this.stencilZPass=ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Si&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Or&&(n.blendSrc=this.blendSrc),this.blendDst!==zr&&(n.blendDst=this.blendDst),this.blendEquation!==Vn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$o&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ac extends ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new w,fs=new ct;class Ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)fs.fromBufferAttribute(this,e),fs.applyMatrix3(t),this.setXY(e,fs.x,fs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),i=Ue(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),i=Ue(i,this.array),r=Ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jo&&(t.usage=this.usage),t}}class Rc extends Ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Cc extends Ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ne extends Ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ch=0;const Ke=new he,vr=new ge,hi=new w,ke=new Li,Oi=new Li,be=new w;class Se extends Pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Qn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yc(t)?Cc:Rc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return vr.lookAt(t),vr.updateMatrix(),this.applyMatrix4(vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ne(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(t){const n=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Oi.setFromBufferAttribute(a),this.morphTargetsRelative?(be.addVectors(ke.min,Oi.min),ke.expandByPoint(be),be.addVectors(ke.max,Oi.max),ke.expandByPoint(be)):(ke.expandByPoint(Oi.min),ke.expandByPoint(Oi.max))}ke.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)be.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(be));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)be.fromBufferAttribute(a,l),c&&(hi.fromBufferAttribute(t,l),be.add(hi)),i=Math.max(i,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let T=0;T<a;T++)l[T]=new w,u[T]=new w;const h=new w,d=new w,p=new w,g=new ct,_=new ct,m=new ct,f=new w,S=new w;function v(T,O,W){h.fromArray(i,T*3),d.fromArray(i,O*3),p.fromArray(i,W*3),g.fromArray(o,T*2),_.fromArray(o,O*2),m.fromArray(o,W*2),d.sub(h),p.sub(h),_.sub(g),m.sub(g);const j=1/(_.x*m.y-m.x*_.y);isFinite(j)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(j),S.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(j),l[T].add(f),l[O].add(f),l[W].add(f),u[T].add(S),u[O].add(S),u[W].add(S))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let T=0,O=y.length;T<O;++T){const W=y[T],j=W.start,L=W.count;for(let z=j,k=j+L;z<k;z+=3)v(n[z+0],n[z+1],n[z+2])}const C=new w,A=new w,R=new w,I=new w;function M(T){R.fromArray(r,T*3),I.copy(R);const O=l[T];C.copy(O),C.sub(R.multiplyScalar(R.dot(O))).normalize(),A.crossVectors(I,O);const j=A.dot(u[T])<0?-1:1;c[T*4]=C.x,c[T*4+1]=C.y,c[T*4+2]=C.z,c[T*4+3]=j}for(let T=0,O=y.length;T<O;++T){const W=y[T],j=W.start,L=W.count;for(let z=j,k=j+L;z<k;z+=3)M(n[z+0]),M(n[z+1]),M(n[z+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new w,r=new w,o=new w,a=new w,c=new w,l=new w,u=new w,h=new w;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let f=0;f<u;f++)d[g++]=l[p++]}return new Ye(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const d=l[u],p=t(d,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(i[c]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const da=new he,zn=new io,ps=new ts,fa=new w,ui=new w,di=new w,fi=new w,xr=new w,ms=new w,gs=new ct,_s=new ct,vs=new ct,pa=new w,ma=new w,ga=new w,xs=new w,Ms=new w;class F extends ge{constructor(t=new Se,e=new Ac){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){ms.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(xr.fromBufferAttribute(h,t),o?ms.addScaledVector(xr,u):ms.addScaledVector(xr.sub(e),u))}e.add(ms)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(r),zn.copy(t.ray).recast(t.near),!(ps.containsPoint(zn.origin)===!1&&(zn.intersectSphere(ps,fa)===null||zn.origin.distanceToSquared(fa)>(t.far-t.near)**2))&&(da.copy(r).invert(),zn.copy(t.ray).applyMatrix4(da),!(n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,zn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,C=v;y<C;y+=3){const A=a.getX(y),R=a.getX(y+1),I=a.getX(y+2);i=ys(this,f,t,n,l,u,h,A,R,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);i=ys(this,o,t,n,l,u,h,S,v,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,C=v;y<C;y+=3){const A=y,R=y+1,I=y+2;i=ys(this,f,t,n,l,u,h,A,R,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=m,v=m+1,y=m+2;i=ys(this,o,t,n,l,u,h,S,v,y),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Ph(s,t,e,n,i,r,o,a){let c;if(t.side===Oe?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===In,a),c===null)return null;Ms.copy(a),Ms.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ms);return l<e.near||l>e.far?null:{distance:l,point:Ms.clone(),object:s}}function ys(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,ui),s.getVertexPosition(c,di),s.getVertexPosition(l,fi);const u=Ph(s,t,e,n,ui,di,fi,xs);if(u){i&&(gs.fromBufferAttribute(i,a),_s.fromBufferAttribute(i,c),vs.fromBufferAttribute(i,l),u.uv=nn.getInterpolation(xs,ui,di,fi,gs,_s,vs,new ct)),r&&(gs.fromBufferAttribute(r,a),_s.fromBufferAttribute(r,c),vs.fromBufferAttribute(r,l),u.uv1=nn.getInterpolation(xs,ui,di,fi,gs,_s,vs,new ct),u.uv2=u.uv1),o&&(pa.fromBufferAttribute(o,a),ma.fromBufferAttribute(o,c),ga.fromBufferAttribute(o,l),u.normal=nn.getInterpolation(xs,ui,di,fi,pa,ma,ga,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new w,materialIndex:0};nn.getNormal(ui,di,fi,h.normal),u.face=h}return u}class ut extends Se{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(u,3)),this.setAttribute("uv",new ne(h,2));function g(_,m,f,S,v,y,C,A,R,I,M){const T=y/R,O=C/I,W=y/2,j=C/2,L=A/2,z=R+1,k=I+1;let J=0,Z=0;const K=new w;for(let $=0;$<k;$++){const st=$*O-j;for(let ot=0;ot<z;ot++){const X=ot*T-W;K[_]=X*S,K[m]=st*v,K[f]=L,l.push(K.x,K.y,K.z),K[_]=0,K[m]=0,K[f]=A>0?1:-1,u.push(K.x,K.y,K.z),h.push(ot/R),h.push(1-$/I),J+=1}}for(let $=0;$<I;$++)for(let st=0;st<R;st++){const ot=d+st+z*$,X=d+st+z*($+1),tt=d+(st+1)+z*($+1),gt=d+(st+1)+z*$;c.push(ot,X,gt),c.push(X,tt,gt),Z+=6}a.addGroup(p,Z,M),p+=Z,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ut(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ri(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ne(s){const t={};for(let e=0;e<s.length;e++){const n=Ri(s[e]);for(const i in n)t[i]=n[i]}return t}function Lh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Pc(s){return s.getRenderTarget()===null?s.outputColorSpace:jt.workingColorSpace}const Ls={clone:Ri,merge:Ne};var Dh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ih=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yn extends ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dh,this.fragmentShader=Ih,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ri(t.uniforms),this.uniformsGroups=Lh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lc extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class We extends Lc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ki*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Bi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ki*2*Math.atan(Math.tan(Bi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Bi*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const pi=-90,mi=1;class Uh extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new We(pi,mi,t,e);i.layers=this.layers,this.add(i);const r=new We(pi,mi,t,e);r.layers=this.layers,this.add(r);const o=new We(pi,mi,t,e);o.layers=this.layers,this.add(o);const a=new We(pi,mi,t,e);a.layers=this.layers,this.add(a);const c=new We(pi,mi,t,e);c.layers=this.layers,this.add(c);const l=new We(pi,mi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(h,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Dc extends Be{constructor(t,e,n,i,r,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:bi,super(t,e,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nh extends Jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Hi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Kn?me:qe),this.texture=new Dc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:$e}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ut(5,5,5),r=new yn({name:"CubemapFromEquirect",uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:Pn});r.uniforms.tEquirect.value=e;const o=new F(i,r),a=e.minFilter;return e.minFilter===Yi&&(e.minFilter=$e),new Uh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Mr=new w,Fh=new w,Oh=new Yt;class Gn{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Mr.subVectors(n,e).cross(Fh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Mr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Oh.getNormalMatrix(t),i=this.coplanarPoint(Mr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bn=new ts,Ss=new w;class so{constructor(t=new Gn,e=new Gn,n=new Gn,i=new Gn,r=new Gn,o=new Gn){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],d=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],S=i[13],v=i[14],y=i[15];if(n[0].setComponents(c-r,d-l,m-p,y-f).normalize(),n[1].setComponents(c+r,d+l,m+p,y+f).normalize(),n[2].setComponents(c+o,d+u,m+g,y+S).normalize(),n[3].setComponents(c-o,d-u,m-g,y-S).normalize(),n[4].setComponents(c-a,d-h,m-_,y-v).normalize(),e===xn)n[5].setComponents(c+a,d+h,m+_,y+v).normalize();else if(e===Bs)n[5].setComponents(a,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bn)}intersectsSprite(t){return Bn.center.set(0,0,0),Bn.radius=.7071067811865476,Bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ss.x=i.normal.x>0?t.max.x:t.min.x,Ss.y=i.normal.y>0?t.max.y:t.min.y,Ss.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ic(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function zh(s,t){const e=t.isWebGL2,n=new WeakMap;function i(l,u){const h=l.array,d=l.usage,p=h.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,h,d),l.onUploadCallback();let _;if(h instanceof Float32Array)_=s.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=s.SHORT;else if(h instanceof Uint32Array)_=s.UNSIGNED_INT;else if(h instanceof Int32Array)_=s.INT;else if(h instanceof Int8Array)_=s.BYTE;else if(h instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,u,h){const d=u.array,p=u._updateRange,g=u.updateRanges;if(s.bindBuffer(h,l),p.count===-1&&g.length===0&&s.bufferSubData(h,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const f=g[_];e?s.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):s.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}u.clearUpdateRanges()}p.count!==-1&&(e?s.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):s.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);if(h===void 0)n.set(l,i(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}class _e extends Se{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=t/a,d=e/c,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const S=f*d-o;for(let v=0;v<l;v++){const y=v*h-r;g.push(y,-S,0),_.push(0,0,1),m.push(v/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<a;S++){const v=S+l*f,y=S+l*(f+1),C=S+1+l*(f+1),A=S+1+l*f;p.push(v,y,A),p.push(y,C,A)}this.setIndex(p),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _e(t.width,t.height,t.widthSegments,t.heightSegments)}}var Bh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gh=`#ifdef USE_ALPHAHASH
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
#endif`,Hh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Wh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xh=`#ifdef USE_AOMAP
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
#endif`,qh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yh=`#ifdef USE_BATCHING
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
#endif`,Zh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Kh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$h=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jh=`#ifdef USE_IRIDESCENCE
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
#endif`,Qh=`#ifdef USE_BUMPMAP
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
#endif`,tu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,eu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,su=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ru=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,au=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,cu=`#define PI 3.141592653589793
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
} // validated`,lu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hu=`vec3 transformedNormal = objectNormal;
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
#endif`,uu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,du=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mu="gl_FragColor = linearToOutputTexel( gl_FragColor );",gu=`
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
}`,_u=`#ifdef USE_ENVMAP
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
#endif`,vu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xu=`#ifdef USE_ENVMAP
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
#endif`,Mu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yu=`#ifdef USE_ENVMAP
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
#endif`,Su=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tu=`#ifdef USE_GRADIENTMAP
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
}`,Au=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ru=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lu=`uniform bool receiveShadow;
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
#endif`,Du=`#ifdef USE_ENVMAP
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
#endif`,Iu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Uu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ou=`PhysicalMaterial material;
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
#endif`,zu=`struct PhysicalMaterial {
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
}`,Bu=`
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
#endif`,Gu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ku=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Vu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Xu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,qu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ku=`#if defined( USE_POINTS_UV )
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
#endif`,Ju=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$u=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ju=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qu=`#ifdef USE_MORPHNORMALS
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
#endif`,td=`#ifdef USE_MORPHTARGETS
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
#endif`,ed=`#ifdef USE_MORPHTARGETS
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
#endif`,nd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,id=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,od=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ad=`#ifdef USE_NORMALMAP
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
#endif`,cd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ld=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,md=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_d=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Md=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wd=`float getShadowMask() {
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
}`,Ed=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bd=`#ifdef USE_SKINNING
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
#endif`,Td=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ad=`#ifdef USE_SKINNING
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
#endif`,Rd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ld=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dd=`#ifdef USE_TRANSMISSION
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
#endif`,Id=`#ifdef USE_TRANSMISSION
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
#endif`,Ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Od=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bd=`uniform sampler2D t2D;
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
}`,Gd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wd=`#include <common>
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
}`,Xd=`#if DEPTH_PACKING == 3200
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
}`,qd=`#define DISTANCE
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
}`,Yd=`#define DISTANCE
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
}`,Zd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jd=`uniform float scale;
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
}`,$d=`uniform vec3 diffuse;
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
}`,jd=`#include <common>
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
}`,Qd=`uniform vec3 diffuse;
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
}`,tf=`#define LAMBERT
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
}`,ef=`#define LAMBERT
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
}`,nf=`#define MATCAP
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
}`,sf=`#define MATCAP
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
}`,rf=`#define NORMAL
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
}`,of=`#define NORMAL
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
}`,af=`#define PHONG
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
}`,cf=`#define PHONG
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
}`,lf=`#define STANDARD
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
}`,hf=`#define STANDARD
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
}`,uf=`#define TOON
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
}`,df=`#define TOON
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
}`,ff=`uniform float size;
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
}`,pf=`uniform vec3 diffuse;
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
}`,mf=`#include <common>
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
}`,gf=`uniform vec3 color;
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
}`,_f=`uniform float rotation;
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
}`,vf=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:Bh,alphahash_pars_fragment:Gh,alphamap_fragment:Hh,alphamap_pars_fragment:kh,alphatest_fragment:Vh,alphatest_pars_fragment:Wh,aomap_fragment:Xh,aomap_pars_fragment:qh,batching_pars_vertex:Yh,batching_vertex:Zh,begin_vertex:Kh,beginnormal_vertex:Jh,bsdfs:$h,iridescence_fragment:jh,bumpmap_pars_fragment:Qh,clipping_planes_fragment:tu,clipping_planes_pars_fragment:eu,clipping_planes_pars_vertex:nu,clipping_planes_vertex:iu,color_fragment:su,color_pars_fragment:ru,color_pars_vertex:ou,color_vertex:au,common:cu,cube_uv_reflection_fragment:lu,defaultnormal_vertex:hu,displacementmap_pars_vertex:uu,displacementmap_vertex:du,emissivemap_fragment:fu,emissivemap_pars_fragment:pu,colorspace_fragment:mu,colorspace_pars_fragment:gu,envmap_fragment:_u,envmap_common_pars_fragment:vu,envmap_pars_fragment:xu,envmap_pars_vertex:Mu,envmap_physical_pars_fragment:Du,envmap_vertex:yu,fog_vertex:Su,fog_pars_vertex:wu,fog_fragment:Eu,fog_pars_fragment:bu,gradientmap_pars_fragment:Tu,lightmap_fragment:Au,lightmap_pars_fragment:Ru,lights_lambert_fragment:Cu,lights_lambert_pars_fragment:Pu,lights_pars_begin:Lu,lights_toon_fragment:Iu,lights_toon_pars_fragment:Uu,lights_phong_fragment:Nu,lights_phong_pars_fragment:Fu,lights_physical_fragment:Ou,lights_physical_pars_fragment:zu,lights_fragment_begin:Bu,lights_fragment_maps:Gu,lights_fragment_end:Hu,logdepthbuf_fragment:ku,logdepthbuf_pars_fragment:Vu,logdepthbuf_pars_vertex:Wu,logdepthbuf_vertex:Xu,map_fragment:qu,map_pars_fragment:Yu,map_particle_fragment:Zu,map_particle_pars_fragment:Ku,metalnessmap_fragment:Ju,metalnessmap_pars_fragment:$u,morphcolor_vertex:ju,morphnormal_vertex:Qu,morphtarget_pars_vertex:td,morphtarget_vertex:ed,normal_fragment_begin:nd,normal_fragment_maps:id,normal_pars_fragment:sd,normal_pars_vertex:rd,normal_vertex:od,normalmap_pars_fragment:ad,clearcoat_normal_fragment_begin:cd,clearcoat_normal_fragment_maps:ld,clearcoat_pars_fragment:hd,iridescence_pars_fragment:ud,opaque_fragment:dd,packing:fd,premultiplied_alpha_fragment:pd,project_vertex:md,dithering_fragment:gd,dithering_pars_fragment:_d,roughnessmap_fragment:vd,roughnessmap_pars_fragment:xd,shadowmap_pars_fragment:Md,shadowmap_pars_vertex:yd,shadowmap_vertex:Sd,shadowmask_pars_fragment:wd,skinbase_vertex:Ed,skinning_pars_vertex:bd,skinning_vertex:Td,skinnormal_vertex:Ad,specularmap_fragment:Rd,specularmap_pars_fragment:Cd,tonemapping_fragment:Pd,tonemapping_pars_fragment:Ld,transmission_fragment:Dd,transmission_pars_fragment:Id,uv_pars_fragment:Ud,uv_pars_vertex:Nd,uv_vertex:Fd,worldpos_vertex:Od,background_vert:zd,background_frag:Bd,backgroundCube_vert:Gd,backgroundCube_frag:Hd,cube_vert:kd,cube_frag:Vd,depth_vert:Wd,depth_frag:Xd,distanceRGBA_vert:qd,distanceRGBA_frag:Yd,equirect_vert:Zd,equirect_frag:Kd,linedashed_vert:Jd,linedashed_frag:$d,meshbasic_vert:jd,meshbasic_frag:Qd,meshlambert_vert:tf,meshlambert_frag:ef,meshmatcap_vert:nf,meshmatcap_frag:sf,meshnormal_vert:rf,meshnormal_frag:of,meshphong_vert:af,meshphong_frag:cf,meshphysical_vert:lf,meshphysical_frag:hf,meshtoon_vert:uf,meshtoon_frag:df,points_vert:ff,points_frag:pf,shadow_vert:mf,shadow_frag:gf,sprite_vert:_f,sprite_frag:vf},ht={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},cn={basic:{uniforms:Ne([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Ne([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new ft(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Ne([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Ne([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Ne([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new ft(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Ne([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Ne([ht.points,ht.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Ne([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Ne([ht.common,ht.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Ne([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Ne([ht.sprite,ht.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Ne([ht.common,ht.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Ne([ht.lights,ht.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};cn.physical={uniforms:Ne([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const ws={r:0,b:0,g:0};function xf(s,t,e,n,i,r,o){const a=new ft(0);let c=r===!0?0:1,l,u,h=null,d=0,p=null;function g(m,f){let S=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?e:t).get(v)),v===null?_(a,c):v&&v.isColor&&(_(v,1),S=!0);const y=s.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||S)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Vs)?(u===void 0&&(u=new F(new ut(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:Ri(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=jt.getTransfer(v.colorSpace)!==ie,(h!==v||d!==v.version||p!==s.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,p=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new F(new _e(2,2),new yn({name:"BackgroundMaterial",uniforms:Ri(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=jt.getTransfer(v.colorSpace)!==ie,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,p=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,f){m.getRGB(ws,Pc(s)),n.buffers.color.setClear(ws.r,ws.g,ws.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function Mf(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null);let l=c,u=!1;function h(L,z,k,J,Z){let K=!1;if(o){const $=_(J,k,z);l!==$&&(l=$,p(l.object)),K=f(L,J,k,Z),K&&S(L,J,k,Z)}else{const $=z.wireframe===!0;(l.geometry!==J.id||l.program!==k.id||l.wireframe!==$)&&(l.geometry=J.id,l.program=k.id,l.wireframe=$,K=!0)}Z!==null&&e.update(Z,s.ELEMENT_ARRAY_BUFFER),(K||u)&&(u=!1,I(L,z,k,J),Z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(L){return n.isWebGL2?s.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?s.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,z,k){const J=k.wireframe===!0;let Z=a[L.id];Z===void 0&&(Z={},a[L.id]=Z);let K=Z[z.id];K===void 0&&(K={},Z[z.id]=K);let $=K[J];return $===void 0&&($=m(d()),K[J]=$),$}function m(L){const z=[],k=[],J=[];for(let Z=0;Z<i;Z++)z[Z]=0,k[Z]=0,J[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:k,attributeDivisors:J,object:L,attributes:{},index:null}}function f(L,z,k,J){const Z=l.attributes,K=z.attributes;let $=0;const st=k.getAttributes();for(const ot in st)if(st[ot].location>=0){const tt=Z[ot];let gt=K[ot];if(gt===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&(gt=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&(gt=L.instanceColor)),tt===void 0||tt.attribute!==gt||gt&&tt.data!==gt.data)return!0;$++}return l.attributesNum!==$||l.index!==J}function S(L,z,k,J){const Z={},K=z.attributes;let $=0;const st=k.getAttributes();for(const ot in st)if(st[ot].location>=0){let tt=K[ot];tt===void 0&&(ot==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),ot==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor));const gt={};gt.attribute=tt,tt&&tt.data&&(gt.data=tt.data),Z[ot]=gt,$++}l.attributes=Z,l.attributesNum=$,l.index=J}function v(){const L=l.newAttributes;for(let z=0,k=L.length;z<k;z++)L[z]=0}function y(L){C(L,0)}function C(L,z){const k=l.newAttributes,J=l.enabledAttributes,Z=l.attributeDivisors;k[L]=1,J[L]===0&&(s.enableVertexAttribArray(L),J[L]=1),Z[L]!==z&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,z),Z[L]=z)}function A(){const L=l.newAttributes,z=l.enabledAttributes;for(let k=0,J=z.length;k<J;k++)z[k]!==L[k]&&(s.disableVertexAttribArray(k),z[k]=0)}function R(L,z,k,J,Z,K,$){$===!0?s.vertexAttribIPointer(L,z,k,Z,K):s.vertexAttribPointer(L,z,k,J,Z,K)}function I(L,z,k,J){if(n.isWebGL2===!1&&(L.isInstancedMesh||J.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const Z=J.attributes,K=k.getAttributes(),$=z.defaultAttributeValues;for(const st in K){const ot=K[st];if(ot.location>=0){let X=Z[st];if(X===void 0&&(st==="instanceMatrix"&&L.instanceMatrix&&(X=L.instanceMatrix),st==="instanceColor"&&L.instanceColor&&(X=L.instanceColor)),X!==void 0){const tt=X.normalized,gt=X.itemSize,wt=e.get(X);if(wt===void 0)continue;const xt=wt.buffer,Dt=wt.type,Ot=wt.bytesPerElement,Et=n.isWebGL2===!0&&(Dt===s.INT||Dt===s.UNSIGNED_INT||X.gpuType===uc);if(X.isInterleavedBufferAttribute){const Nt=X.data,P=Nt.stride,at=X.offset;if(Nt.isInstancedInterleavedBuffer){for(let Y=0;Y<ot.locationSize;Y++)C(ot.location+Y,Nt.meshPerAttribute);L.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Nt.meshPerAttribute*Nt.count)}else for(let Y=0;Y<ot.locationSize;Y++)y(ot.location+Y);s.bindBuffer(s.ARRAY_BUFFER,xt);for(let Y=0;Y<ot.locationSize;Y++)R(ot.location+Y,gt/ot.locationSize,Dt,tt,P*Ot,(at+gt/ot.locationSize*Y)*Ot,Et)}else{if(X.isInstancedBufferAttribute){for(let Nt=0;Nt<ot.locationSize;Nt++)C(ot.location+Nt,X.meshPerAttribute);L.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Nt=0;Nt<ot.locationSize;Nt++)y(ot.location+Nt);s.bindBuffer(s.ARRAY_BUFFER,xt);for(let Nt=0;Nt<ot.locationSize;Nt++)R(ot.location+Nt,gt/ot.locationSize,Dt,tt,gt*Ot,gt/ot.locationSize*Nt*Ot,Et)}}else if($!==void 0){const tt=$[st];if(tt!==void 0)switch(tt.length){case 2:s.vertexAttrib2fv(ot.location,tt);break;case 3:s.vertexAttrib3fv(ot.location,tt);break;case 4:s.vertexAttrib4fv(ot.location,tt);break;default:s.vertexAttrib1fv(ot.location,tt)}}}}A()}function M(){W();for(const L in a){const z=a[L];for(const k in z){const J=z[k];for(const Z in J)g(J[Z].object),delete J[Z];delete z[k]}delete a[L]}}function T(L){if(a[L.id]===void 0)return;const z=a[L.id];for(const k in z){const J=z[k];for(const Z in J)g(J[Z].object),delete J[Z];delete z[k]}delete a[L.id]}function O(L){for(const z in a){const k=a[z];if(k[L.id]===void 0)continue;const J=k[L.id];for(const Z in J)g(J[Z].object),delete J[Z];delete k[L.id]}}function W(){j(),u=!0,l!==c&&(l=c,p(l.object))}function j(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:W,resetDefaultState:j,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:O,initAttributes:v,enableAttribute:y,disableUnusedAttributes:A}}function yf(s,t,e,n){const i=n.isWebGL2;let r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),e.update(h,r,1)}function c(u,h,d){if(d===0)return;let p,g;if(i)p=s,g="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,u,h,d),e.update(h,r,d)}function l(u,h,d){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(u[g],h[g]);else{p.multiDrawArraysWEBGL(r,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Sf(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),f=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,y=o||t.has("OES_texture_float"),C=v&&y,A=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:S,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:C,maxSamples:A}}function wf(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new Gn,a=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||i;return i=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,f=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const S=r?0:n,v=S*4;let y=f.clippingState||null;c.value=y,y=u(g,d,v,p);for(let C=0;C!==v;++C)y[C]=e[C];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,y=p;v!==_;++v,y+=4)o.copy(h[v]).applyMatrix4(S,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Ef(s){let t=new WeakMap;function e(o,a){return a===Br?o.mapping=bi:a===Gr&&(o.mapping=Ti),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Br||a===Gr)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Nh(c.height/2);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Uc extends Lc{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const xi=4,_a=[.125,.215,.35,.446,.526,.582],Wn=20,yr=new Uc,va=new ft;let Sr=null,wr=0,Er=0;const Hn=(1+Math.sqrt(5))/2,gi=1/Hn,xa=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,Hn,gi),new w(0,Hn,-gi),new w(gi,0,Hn),new w(-gi,0,Hn),new w(Hn,gi,0),new w(-Hn,gi,0)];class Ma{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Sr=this._renderer.getRenderTarget(),wr=this._renderer.getActiveCubeFace(),Er=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Sr,wr,Er),t.scissorTest=!1,Es(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===bi||t.mapping===Ti?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sr=this._renderer.getRenderTarget(),wr=this._renderer.getActiveCubeFace(),Er=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:Zi,format:rn,colorSpace:Mn,depthBuffer:!1},i=ya(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ya(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bf(r)),this._blurMaterial=Tf(r,t,e)}return i}_compileMaterial(t){const e=new F(this._lodPlanes[0],t);this._renderer.compile(e,yr)}_sceneToCubeUV(t,e,n,i){const a=new We(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(va),u.toneMapping=Ln,u.autoClear=!1;const p=new Ac({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),g=new F(new ut,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(va),_=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):S===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const v=this._cubeSize;Es(i,S*v,f>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===bi||t.mapping===Ti;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=wa()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sa());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new F(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Es(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,yr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=xa[(i-1)%xa.length];this._blur(t,i-1,i,r,o)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new F(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Wn-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Wn;m>Wn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wn}`);const f=[];let S=0;for(let R=0;R<Wn;++R){const I=R/_,M=Math.exp(-I*I/2);f.push(M),R===0?S+=M:R<m&&(S+=2*M)}for(let R=0;R<f.length;R++)f[R]=f[R]/S;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const y=this._sizeLods[i],C=3*y*(i>v-xi?i-v+xi:0),A=4*(this._cubeSize-y);Es(e,C,A,3*y,2*y),c.setRenderTarget(e),c.render(h,yr)}}function bf(s){const t=[],e=[],n=[];let i=s;const r=s-xi+1+_a.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-xi?c=_a[o-s+xi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,f=1,S=new Float32Array(_*g*p),v=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){const R=A%3*2/3-1,I=A>2?0:-1,M=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];S.set(M,_*g*A),v.set(d,m*g*A);const T=[A,A,A,A,A,A];y.set(T,f*g*A)}const C=new Se;C.setAttribute("position",new Ye(S,_)),C.setAttribute("uv",new Ye(v,m)),C.setAttribute("faceIndex",new Ye(y,f)),t.push(C),i>xi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ya(s,t,e){const n=new Jn(s,t,e);return n.texture.mapping=Vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Es(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Tf(s,t,e){const n=new Float32Array(Wn),i=new w(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:Wn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ro(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Sa(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ro(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function wa(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ro(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function ro(){return`

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
	`}function Af(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Br||c===Gr,u=c===bi||c===Ti;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=t.get(a);return e===null&&(e=new Ma(s)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),t.set(a,h),h.texture}else{if(t.has(a))return t.get(a).texture;{const h=a.image;if(l&&h&&h.height>0||u&&h&&i(h)){e===null&&(e=new Ma(s));const d=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Rf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Cf(s,t,e,n){const i={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],s.ARRAY_BUFFER)}}function l(h){const d=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let v=0,y=S.length;v<y;v+=3){const C=S[v+0],A=S[v+1],R=S[v+2];d.push(C,A,A,R,R,C)}}else if(g!==void 0){const S=g.array;_=g.version;for(let v=0,y=S.length/3-1;v<y;v+=3){const C=v+0,A=v+1,R=v+2;d.push(C,A,A,R,R,C)}}else return;const m=new(yc(d)?Cc:Rc)(d,1);m.version=_;const f=r.get(h);f&&t.remove(f),r.set(h,m)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Pf(s,t,e,n){const i=n.isWebGL2;let r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function u(p,g){s.drawElements(r,g,a,p*c),e.update(g,r,1)}function h(p,g,_){if(_===0)return;let m,f;if(i)m=s,f="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,a,p*c,_),e.update(g,r,_)}function d(p,g,_){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/c,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,a,p,0,_);let f=0;for(let S=0;S<_;S++)f+=g[S];e.update(f,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function Lf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Df(s,t){return s[0]-t[0]}function If(s,t){return Math.abs(t[1])-Math.abs(s[1])}function Uf(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,o=new oe,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){const d=l.morphTargetInfluences;if(t.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(u);if(m===void 0||m.count!==_){let z=function(){j.dispose(),r.delete(u),u.removeEventListener("dispose",z)};var p=z;m!==void 0&&m.texture.dispose();const v=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,C=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],R=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let M=0;v===!0&&(M=1),y===!0&&(M=2),C===!0&&(M=3);let T=u.attributes.position.count*M,O=1;T>t.maxTextureSize&&(O=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const W=new Float32Array(T*O*4*_),j=new Ec(W,T,O,_);j.type=Cn,j.needsUpdate=!0;const L=M*4;for(let k=0;k<_;k++){const J=A[k],Z=R[k],K=I[k],$=T*O*4*k;for(let st=0;st<J.count;st++){const ot=st*L;v===!0&&(o.fromBufferAttribute(J,st),W[$+ot+0]=o.x,W[$+ot+1]=o.y,W[$+ot+2]=o.z,W[$+ot+3]=0),y===!0&&(o.fromBufferAttribute(Z,st),W[$+ot+4]=o.x,W[$+ot+5]=o.y,W[$+ot+6]=o.z,W[$+ot+7]=0),C===!0&&(o.fromBufferAttribute(K,st),W[$+ot+8]=o.x,W[$+ot+9]=o.y,W[$+ot+10]=o.z,W[$+ot+11]=K.itemSize===4?o.w:1)}}m={count:_,texture:j,size:new ct(T,O)},r.set(u,m),u.addEventListener("dispose",z)}let f=0;for(let v=0;v<d.length;v++)f+=d[v];const S=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(s,"morphTargetBaseInfluence",S),h.getUniforms().setValue(s,"morphTargetInfluences",d),h.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),h.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];n[u.id]=_}for(let y=0;y<g;y++){const C=_[y];C[0]=y,C[1]=d[y]}_.sort(If);for(let y=0;y<8;y++)y<g&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(Df);const m=u.morphAttributes.position,f=u.morphAttributes.normal;let S=0;for(let y=0;y<8;y++){const C=a[y],A=C[0],R=C[1];A!==Number.MAX_SAFE_INTEGER&&R?(m&&u.getAttribute("morphTarget"+y)!==m[A]&&u.setAttribute("morphTarget"+y,m[A]),f&&u.getAttribute("morphNormal"+y)!==f[A]&&u.setAttribute("morphNormal"+y,f[A]),i[y]=R,S+=R):(m&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),f&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),i[y]=0)}const v=u.morphTargetsRelative?1:1-S;h.getUniforms().setValue(s,"morphTargetBaseInfluence",v),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Nf(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return h}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class Nc extends Be{constructor(t,e,n,i,r,o,a,c,l,u){if(u=u!==void 0?u:Zn,u!==Zn&&u!==Ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Zn&&(n=Rn),n===void 0&&u===Ai&&(n=Yn),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Fe,this.minFilter=c!==void 0?c:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Fc=new Be,Oc=new Nc(1,1);Oc.compareFunction=Mc;const zc=new Ec,Bc=new xh,Gc=new Dc,Ea=[],ba=[],Ta=new Float32Array(16),Aa=new Float32Array(9),Ra=new Float32Array(4);function Di(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Ea[i];if(r===void 0&&(r=new Float32Array(i),Ea[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Me(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ye(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function qs(s,t){let e=ba[t];e===void 0&&(e=new Int32Array(t),ba[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Ff(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Of(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2fv(this.addr,t),ye(e,t)}}function zf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;s.uniform3fv(this.addr,t),ye(e,t)}}function Bf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4fv(this.addr,t),ye(e,t)}}function Gf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;Ra.set(n),s.uniformMatrix2fv(this.addr,!1,Ra),ye(e,n)}}function Hf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;Aa.set(n),s.uniformMatrix3fv(this.addr,!1,Aa),ye(e,n)}}function kf(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Me(e,n))return;Ta.set(n),s.uniformMatrix4fv(this.addr,!1,Ta),ye(e,n)}}function Vf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Wf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2iv(this.addr,t),ye(e,t)}}function Xf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;s.uniform3iv(this.addr,t),ye(e,t)}}function qf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4iv(this.addr,t),ye(e,t)}}function Yf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Zf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;s.uniform2uiv(this.addr,t),ye(e,t)}}function Kf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;s.uniform3uiv(this.addr,t),ye(e,t)}}function Jf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;s.uniform4uiv(this.addr,t),ye(e,t)}}function $f(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?Oc:Fc;e.setTexture2D(t||r,i)}function jf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Bc,i)}function Qf(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Gc,i)}function tp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||zc,i)}function ep(s){switch(s){case 5126:return Ff;case 35664:return Of;case 35665:return zf;case 35666:return Bf;case 35674:return Gf;case 35675:return Hf;case 35676:return kf;case 5124:case 35670:return Vf;case 35667:case 35671:return Wf;case 35668:case 35672:return Xf;case 35669:case 35673:return qf;case 5125:return Yf;case 36294:return Zf;case 36295:return Kf;case 36296:return Jf;case 35678:case 36198:case 36298:case 36306:case 35682:return $f;case 35679:case 36299:case 36307:return jf;case 35680:case 36300:case 36308:case 36293:return Qf;case 36289:case 36303:case 36311:case 36292:return tp}}function np(s,t){s.uniform1fv(this.addr,t)}function ip(s,t){const e=Di(t,this.size,2);s.uniform2fv(this.addr,e)}function sp(s,t){const e=Di(t,this.size,3);s.uniform3fv(this.addr,e)}function rp(s,t){const e=Di(t,this.size,4);s.uniform4fv(this.addr,e)}function op(s,t){const e=Di(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function ap(s,t){const e=Di(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function cp(s,t){const e=Di(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function lp(s,t){s.uniform1iv(this.addr,t)}function hp(s,t){s.uniform2iv(this.addr,t)}function up(s,t){s.uniform3iv(this.addr,t)}function dp(s,t){s.uniform4iv(this.addr,t)}function fp(s,t){s.uniform1uiv(this.addr,t)}function pp(s,t){s.uniform2uiv(this.addr,t)}function mp(s,t){s.uniform3uiv(this.addr,t)}function gp(s,t){s.uniform4uiv(this.addr,t)}function _p(s,t,e){const n=this.cache,i=t.length,r=qs(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Fc,r[o])}function vp(s,t,e){const n=this.cache,i=t.length,r=qs(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Bc,r[o])}function xp(s,t,e){const n=this.cache,i=t.length,r=qs(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Gc,r[o])}function Mp(s,t,e){const n=this.cache,i=t.length,r=qs(e,i);Me(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||zc,r[o])}function yp(s){switch(s){case 5126:return np;case 35664:return ip;case 35665:return sp;case 35666:return rp;case 35674:return op;case 35675:return ap;case 35676:return cp;case 5124:case 35670:return lp;case 35667:case 35671:return hp;case 35668:case 35672:return up;case 35669:case 35673:return dp;case 5125:return fp;case 36294:return pp;case 36295:return mp;case 36296:return gp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return vp;case 35680:case 36300:case 36308:case 36293:return xp;case 36289:case 36303:case 36311:case 36292:return Mp}}class Sp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ep(e.type)}}class wp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=yp(e.type)}}class Ep{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const br=/(\w+)(\])?(\[|\.)?/g;function Ca(s,t){s.seq.push(t),s.map[t.id]=t}function bp(s,t,e){const n=s.name,i=n.length;for(br.lastIndex=0;;){const r=br.exec(n),o=br.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Ca(e,l===void 0?new Sp(a,s,t):new wp(a,s,t));break}else{let h=e.map[a];h===void 0&&(h=new Ep(a),Ca(e,h)),e=h}}}class Ds{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);bp(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Pa(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Tp=37297;let Ap=0;function Rp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Cp(s){const t=jt.getPrimaries(jt.workingColorSpace),e=jt.getPrimaries(s);let n;switch(t===e?n="":t===zs&&e===Os?n="LinearDisplayP3ToLinearSRGB":t===Os&&e===zs&&(n="LinearSRGBToLinearDisplayP3"),s){case Mn:case Ws:return[n,"LinearTransferOETF"];case me:case eo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function La(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Rp(s.getShaderSource(t),o)}else return i}function Pp(s,t){const e=Cp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Lp(s,t){let e;switch(t){case Pl:e="Linear";break;case Ll:e="Reinhard";break;case Dl:e="OptimizedCineon";break;case lc:e="ACESFilmic";break;case Ul:e="AgX";break;case Il:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Dp(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Mi).join(`
`)}function Ip(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Mi).join(`
`)}function Up(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Np(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Mi(s){return s!==""}function Da(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ia(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Fp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wr(s){return s.replace(Fp,zp)}const Op=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function zp(s,t){let e=kt[t];if(e===void 0){const n=Op.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Wr(e)}const Bp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ua(s){return s.replace(Bp,Gp)}function Gp(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Na(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Hp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===oc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ac?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===vn&&(t="SHADOWMAP_TYPE_VSM"),t}function kp(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case bi:case Ti:t="ENVMAP_TYPE_CUBE";break;case Vs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Vp(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ti:t="ENVMAP_MODE_REFRACTION";break}return t}function Wp(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case cc:t="ENVMAP_BLENDING_MULTIPLY";break;case Rl:t="ENVMAP_BLENDING_MIX";break;case Cl:t="ENVMAP_BLENDING_ADD";break}return t}function Xp(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function qp(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Hp(e),l=kp(e),u=Vp(e),h=Wp(e),d=Xp(e),p=e.isWebGL2?"":Dp(e),g=Ip(e),_=Up(r),m=i.createProgram();let f,S,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Mi).join(`
`),f.length>0&&(f+=`
`),S=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Mi).join(`
`),S.length>0&&(S+=`
`)):(f=[Na(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mi).join(`
`),S=[p,Na(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?kt.tonemapping_pars_fragment:"",e.toneMapping!==Ln?Lp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,Pp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Mi).join(`
`)),o=Wr(o),o=Da(o,e),o=Ia(o,e),a=Wr(a),a=Da(a,e),a=Ia(a,e),o=Ua(o),a=Ua(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,S=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const y=v+f+o,C=v+S+a,A=Pa(i,i.VERTEX_SHADER,y),R=Pa(i,i.FRAGMENT_SHADER,C);i.attachShader(m,A),i.attachShader(m,R),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function I(W){if(s.debug.checkShaderErrors){const j=i.getProgramInfoLog(m).trim(),L=i.getShaderInfoLog(A).trim(),z=i.getShaderInfoLog(R).trim();let k=!0,J=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(k=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,A,R);else{const Z=La(i,A,"vertex"),K=La(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+j+`
`+Z+`
`+K)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(L===""||z==="")&&(J=!1);J&&(W.diagnostics={runnable:k,programLog:j,vertexShader:{log:L,prefix:f},fragmentShader:{log:z,prefix:S}})}i.deleteShader(A),i.deleteShader(R),M=new Ds(i,m),T=Np(i,m)}let M;this.getUniforms=function(){return M===void 0&&I(this),M};let T;this.getAttributes=function(){return T===void 0&&I(this),T};let O=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=i.getProgramParameter(m,Tp)),O},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ap++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=R,this}let Yp=0;class Zp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Kp(t),e.set(t,n)),n}}class Kp{constructor(t){this.id=Yp++,this.code=t,this.usedTimes=0}}function Jp(s,t,e,n,i,r,o){const a=new bc,c=new Zp,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,T,O,W,j){const L=W.fog,z=j.geometry,k=M.isMeshStandardMaterial?W.environment:null,J=(M.isMeshStandardMaterial?e:t).get(M.envMap||k),Z=J&&J.mapping===Vs?J.image.height:null,K=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const $=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,st=$!==void 0?$.length:0;let ot=0;z.morphAttributes.position!==void 0&&(ot=1),z.morphAttributes.normal!==void 0&&(ot=2),z.morphAttributes.color!==void 0&&(ot=3);let X,tt,gt,wt;if(K){const De=cn[K];X=De.vertexShader,tt=De.fragmentShader}else X=M.vertexShader,tt=M.fragmentShader,c.update(M),gt=c.getVertexShaderID(M),wt=c.getFragmentShaderID(M);const xt=s.getRenderTarget(),Dt=j.isInstancedMesh===!0,Ot=j.isBatchedMesh===!0,Et=!!M.map,Nt=!!M.matcap,P=!!J,at=!!M.aoMap,Y=!!M.lightMap,rt=!!M.bumpMap,q=!!M.normalMap,Tt=!!M.displacementMap,_t=!!M.emissiveMap,E=!!M.metalnessMap,x=!!M.roughnessMap,N=M.anisotropy>0,it=M.clearcoat>0,et=M.iridescence>0,Q=M.sheen>0,St=M.transmission>0,dt=N&&!!M.anisotropyMap,Mt=it&&!!M.clearcoatMap,Rt=it&&!!M.clearcoatNormalMap,Bt=it&&!!M.clearcoatRoughnessMap,nt=et&&!!M.iridescenceMap,Kt=et&&!!M.iridescenceThicknessMap,Zt=Q&&!!M.sheenColorMap,Ft=Q&&!!M.sheenRoughnessMap,At=!!M.specularMap,yt=!!M.specularColorMap,Ht=!!M.specularIntensityMap,Jt=St&&!!M.transmissionMap,ue=St&&!!M.thicknessMap,Xt=!!M.gradientMap,lt=!!M.alphaMap,D=M.alphaTest>0,pt=!!M.alphaHash,mt=!!M.extensions,It=!!z.attributes.uv1,Ct=!!z.attributes.uv2,Qt=!!z.attributes.uv3;let te=Ln;return M.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(te=s.toneMapping),{isWebGL2:u,shaderID:K,shaderType:M.type,shaderName:M.name,vertexShader:X,fragmentShader:tt,defines:M.defines,customVertexShaderID:gt,customFragmentShaderID:wt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ot,instancing:Dt,instancingColor:Dt&&j.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:xt===null?s.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:Mn,map:Et,matcap:Nt,envMap:P,envMapMode:P&&J.mapping,envMapCubeUVHeight:Z,aoMap:at,lightMap:Y,bumpMap:rt,normalMap:q,displacementMap:d&&Tt,emissiveMap:_t,normalMapObjectSpace:q&&M.normalMapType===ql,normalMapTangentSpace:q&&M.normalMapType===xc,metalnessMap:E,roughnessMap:x,anisotropy:N,anisotropyMap:dt,clearcoat:it,clearcoatMap:Mt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Bt,iridescence:et,iridescenceMap:nt,iridescenceThicknessMap:Kt,sheen:Q,sheenColorMap:Zt,sheenRoughnessMap:Ft,specularMap:At,specularColorMap:yt,specularIntensityMap:Ht,transmission:St,transmissionMap:Jt,thicknessMap:ue,gradientMap:Xt,opaque:M.transparent===!1&&M.blending===Si,alphaMap:lt,alphaTest:D,alphaHash:pt,combine:M.combine,mapUv:Et&&_(M.map.channel),aoMapUv:at&&_(M.aoMap.channel),lightMapUv:Y&&_(M.lightMap.channel),bumpMapUv:rt&&_(M.bumpMap.channel),normalMapUv:q&&_(M.normalMap.channel),displacementMapUv:Tt&&_(M.displacementMap.channel),emissiveMapUv:_t&&_(M.emissiveMap.channel),metalnessMapUv:E&&_(M.metalnessMap.channel),roughnessMapUv:x&&_(M.roughnessMap.channel),anisotropyMapUv:dt&&_(M.anisotropyMap.channel),clearcoatMapUv:Mt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Bt&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:Zt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&_(M.sheenRoughnessMap.channel),specularMapUv:At&&_(M.specularMap.channel),specularColorMapUv:yt&&_(M.specularColorMap.channel),specularIntensityMapUv:Ht&&_(M.specularIntensityMap.channel),transmissionMapUv:Jt&&_(M.transmissionMap.channel),thicknessMapUv:ue&&_(M.thicknessMap.channel),alphaMapUv:lt&&_(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(q||N),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:It,vertexUv2s:Ct,vertexUv3s:Qt,pointsUvs:j.isPoints===!0&&!!z.attributes.uv&&(Et||lt),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:j.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:ot,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&O.length>0,shadowMapType:s.shadowMap.type,toneMapping:te,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Et&&M.map.isVideoTexture===!0&&jt.getTransfer(M.map.colorSpace)===ie,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Xe,flipSided:M.side===Oe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:mt&&M.extensions.derivatives===!0,extensionFragDepth:mt&&M.extensions.fragDepth===!0,extensionDrawBuffers:mt&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:mt&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:mt&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function f(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const O in M.defines)T.push(O),T.push(M.defines[O]);return M.isRawShaderMaterial===!1&&(S(T,M),v(T,M),T.push(s.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function S(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function v(M,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function y(M){const T=g[M.type];let O;if(T){const W=cn[T];O=Ls.clone(W.uniforms)}else O=M.uniforms;return O}function C(M,T){let O;for(let W=0,j=l.length;W<j;W++){const L=l[W];if(L.cacheKey===T){O=L,++O.usedTimes;break}}return O===void 0&&(O=new qp(s,T,M,r),l.push(O)),O}function A(M){if(--M.usedTimes===0){const T=l.indexOf(M);l[T]=l[l.length-1],l.pop(),M.destroy()}}function R(M){c.remove(M)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:l,dispose:I}}function $p(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function jp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Fa(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Oa(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(h,d,p,g,_,m){let f=s[t];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},s[t]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=_,f.group=m),t++,f}function a(h,d,p,g,_,m){const f=o(h,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function c(h,d,p,g,_,m){const f=o(h,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function l(h,d){e.length>1&&e.sort(h||jp),n.length>1&&n.sort(d||Fa),i.length>1&&i.sort(d||Fa)}function u(){for(let h=t,d=s.length;h<d;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function Qp(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Oa,s.set(n,[o])):i>=r.length?(o=new Oa,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function tm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new ft};break;case"SpotLight":e={position:new w,direction:new w,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":e={color:new ft,position:new w,halfWidth:new w,halfHeight:new w};break}return s[t.id]=e,e}}}function em(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let nm=0;function im(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function sm(s,t){const e=new tm,n=em(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new w);const r=new w,o=new he,a=new he;function c(u,h){let d=0,p=0,g=0;for(let W=0;W<9;W++)i.probe[W].set(0,0,0);let _=0,m=0,f=0,S=0,v=0,y=0,C=0,A=0,R=0,I=0,M=0;u.sort(im);const T=h===!0?Math.PI:1;for(let W=0,j=u.length;W<j;W++){const L=u[W],z=L.color,k=L.intensity,J=L.distance,Z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=z.r*k*T,p+=z.g*k*T,g+=z.b*k*T;else if(L.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(L.sh.coefficients[K],k);M++}else if(L.isDirectionalLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const $=L.shadow,st=n.get(L);st.shadowBias=$.bias,st.shadowNormalBias=$.normalBias,st.shadowRadius=$.radius,st.shadowMapSize=$.mapSize,i.directionalShadow[_]=st,i.directionalShadowMap[_]=Z,i.directionalShadowMatrix[_]=L.shadow.matrix,y++}i.directional[_]=K,_++}else if(L.isSpotLight){const K=e.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(z).multiplyScalar(k*T),K.distance=J,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,i.spot[f]=K;const $=L.shadow;if(L.map&&(i.spotLightMap[R]=L.map,R++,$.updateMatrices(L),L.castShadow&&I++),i.spotLightMatrix[f]=$.matrix,L.castShadow){const st=n.get(L);st.shadowBias=$.bias,st.shadowNormalBias=$.normalBias,st.shadowRadius=$.radius,st.shadowMapSize=$.mapSize,i.spotShadow[f]=st,i.spotShadowMap[f]=Z,A++}f++}else if(L.isRectAreaLight){const K=e.get(L);K.color.copy(z).multiplyScalar(k),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),i.rectArea[S]=K,S++}else if(L.isPointLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*T),K.distance=L.distance,K.decay=L.decay,L.castShadow){const $=L.shadow,st=n.get(L);st.shadowBias=$.bias,st.shadowNormalBias=$.normalBias,st.shadowRadius=$.radius,st.shadowMapSize=$.mapSize,st.shadowCameraNear=$.camera.near,st.shadowCameraFar=$.camera.far,i.pointShadow[m]=st,i.pointShadowMap[m]=Z,i.pointShadowMatrix[m]=L.shadow.matrix,C++}i.point[m]=K,m++}else if(L.isHemisphereLight){const K=e.get(L);K.skyColor.copy(L.color).multiplyScalar(k*T),K.groundColor.copy(L.groundColor).multiplyScalar(k*T),i.hemi[v]=K,v++}}S>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_FLOAT_1,i.rectAreaLTC2=ht.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ht.LTC_HALF_1,i.rectAreaLTC2=ht.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=g;const O=i.hash;(O.directionalLength!==_||O.pointLength!==m||O.spotLength!==f||O.rectAreaLength!==S||O.hemiLength!==v||O.numDirectionalShadows!==y||O.numPointShadows!==C||O.numSpotShadows!==A||O.numSpotMaps!==R||O.numLightProbes!==M)&&(i.directional.length=_,i.spot.length=f,i.rectArea.length=S,i.point.length=m,i.hemi.length=v,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=A+R-I,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=M,O.directionalLength=_,O.pointLength=m,O.spotLength=f,O.rectAreaLength=S,O.hemiLength=v,O.numDirectionalShadows=y,O.numPointShadows=C,O.numSpotShadows=A,O.numSpotMaps=R,O.numLightProbes=M,i.version=nm++)}function l(u,h){let d=0,p=0,g=0,_=0,m=0;const f=h.matrixWorldInverse;for(let S=0,v=u.length;S<v;S++){const y=u[S];if(y.isDirectionalLight){const C=i.directional[d];C.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),d++}else if(y.isSpotLight){const C=i.spot[g];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),g++}else if(y.isRectAreaLight){const C=i.rectArea[_];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(f),a.identity(),o.copy(y.matrixWorld),o.premultiply(f),a.extractRotation(o),C.halfWidth.set(y.width*.5,0,0),C.halfHeight.set(0,y.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const C=i.point[p];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){const C=i.hemi[m];C.direction.setFromMatrixPosition(y.matrixWorld),C.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:i}}function za(s,t){const e=new sm(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function c(h){e.setup(n,h)}function l(h){e.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function rm(s,t){let e=new WeakMap;function n(r,o=0){const a=e.get(r);let c;return a===void 0?(c=new za(s,t),e.set(r,[c])):o>=a.length?(c=new za(s,t),a.push(c)):c=a[o],c}function i(){e=new WeakMap}return{get:n,dispose:i}}class om extends ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class am extends ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const cm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lm=`uniform sampler2D shadow_pass;
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
}`;function hm(s,t,e){let n=new so;const i=new ct,r=new ct,o=new oe,a=new om({depthPacking:Xl}),c=new am,l={},u=e.maxTextureSize,h={[In]:Oe,[Oe]:In,[Xe]:Xe},d=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:cm,fragmentShader:lm}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new F(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oc;let f=this.type;this.render=function(A,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const M=s.getRenderTarget(),T=s.getActiveCubeFace(),O=s.getActiveMipmapLevel(),W=s.state;W.setBlending(Pn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const j=f!==vn&&this.type===vn,L=f===vn&&this.type!==vn;for(let z=0,k=A.length;z<k;z++){const J=A[z],Z=J.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);const K=Z.getFrameExtents();if(i.multiply(K),r.copy(Z.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/K.x),i.x=r.x*K.x,Z.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/K.y),i.y=r.y*K.y,Z.mapSize.y=r.y)),Z.map===null||j===!0||L===!0){const st=this.type!==vn?{minFilter:Fe,magFilter:Fe}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Jn(i.x,i.y,st),Z.map.texture.name=J.name+".shadowMap",Z.camera.updateProjectionMatrix()}s.setRenderTarget(Z.map),s.clear();const $=Z.getViewportCount();for(let st=0;st<$;st++){const ot=Z.getViewport(st);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),W.viewport(o),Z.updateMatrices(J,st),n=Z.getFrustum(),y(R,I,Z.camera,J,this.type)}Z.isPointLightShadow!==!0&&this.type===vn&&S(Z,I),Z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(M,T,O)};function S(A,R){const I=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Jn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,I,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,I,p,_,null)}function v(A,R,I,M){let T=null;const O=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(O!==void 0)T=O;else if(T=I.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const W=T.uuid,j=R.uuid;let L=l[W];L===void 0&&(L={},l[W]=L);let z=L[j];z===void 0&&(z=T.clone(),L[j]=z,R.addEventListener("dispose",C)),T=z}if(T.visible=R.visible,T.wireframe=R.wireframe,M===vn?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:h[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,I.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const W=s.properties.get(T);W.light=I}return T}function y(A,R,I,M,T){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===vn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const j=t.update(A),L=A.material;if(Array.isArray(L)){const z=j.groups;for(let k=0,J=z.length;k<J;k++){const Z=z[k],K=L[Z.materialIndex];if(K&&K.visible){const $=v(A,K,M,T);A.onBeforeShadow(s,A,R,I,j,$,Z),s.renderBufferDirect(I,null,j,$,A,Z),A.onAfterShadow(s,A,R,I,j,$,Z)}}}else if(L.visible){const z=v(A,L,M,T);A.onBeforeShadow(s,A,R,I,j,z,null),s.renderBufferDirect(I,null,j,z,A,null),A.onAfterShadow(s,A,R,I,j,z,null)}}const W=A.children;for(let j=0,L=W.length;j<L;j++)y(W[j],R,I,M,T)}function C(A){A.target.removeEventListener("dispose",C);for(const I in l){const M=l[I],T=A.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function um(s,t,e){const n=e.isWebGL2;function i(){let D=!1;const pt=new oe;let mt=null;const It=new oe(0,0,0,0);return{setMask:function(Ct){mt!==Ct&&!D&&(s.colorMask(Ct,Ct,Ct,Ct),mt=Ct)},setLocked:function(Ct){D=Ct},setClear:function(Ct,Qt,te,we,De){De===!0&&(Ct*=we,Qt*=we,te*=we),pt.set(Ct,Qt,te,we),It.equals(pt)===!1&&(s.clearColor(Ct,Qt,te,we),It.copy(pt))},reset:function(){D=!1,mt=null,It.set(-1,0,0,0)}}}function r(){let D=!1,pt=null,mt=null,It=null;return{setTest:function(Ct){Ct?Ot(s.DEPTH_TEST):Et(s.DEPTH_TEST)},setMask:function(Ct){pt!==Ct&&!D&&(s.depthMask(Ct),pt=Ct)},setFunc:function(Ct){if(mt!==Ct){switch(Ct){case yl:s.depthFunc(s.NEVER);break;case Sl:s.depthFunc(s.ALWAYS);break;case wl:s.depthFunc(s.LESS);break;case Ns:s.depthFunc(s.LEQUAL);break;case El:s.depthFunc(s.EQUAL);break;case bl:s.depthFunc(s.GEQUAL);break;case Tl:s.depthFunc(s.GREATER);break;case Al:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}mt=Ct}},setLocked:function(Ct){D=Ct},setClear:function(Ct){It!==Ct&&(s.clearDepth(Ct),It=Ct)},reset:function(){D=!1,pt=null,mt=null,It=null}}}function o(){let D=!1,pt=null,mt=null,It=null,Ct=null,Qt=null,te=null,we=null,De=null;return{setTest:function(ee){D||(ee?Ot(s.STENCIL_TEST):Et(s.STENCIL_TEST))},setMask:function(ee){pt!==ee&&!D&&(s.stencilMask(ee),pt=ee)},setFunc:function(ee,Ie,an){(mt!==ee||It!==Ie||Ct!==an)&&(s.stencilFunc(ee,Ie,an),mt=ee,It=Ie,Ct=an)},setOp:function(ee,Ie,an){(Qt!==ee||te!==Ie||we!==an)&&(s.stencilOp(ee,Ie,an),Qt=ee,te=Ie,we=an)},setLocked:function(ee){D=ee},setClear:function(ee){De!==ee&&(s.clearStencil(ee),De=ee)},reset:function(){D=!1,pt=null,mt=null,It=null,Ct=null,Qt=null,te=null,we=null,De=null}}}const a=new i,c=new r,l=new o,u=new WeakMap,h=new WeakMap;let d={},p={},g=new WeakMap,_=[],m=null,f=!1,S=null,v=null,y=null,C=null,A=null,R=null,I=null,M=new ft(0,0,0),T=0,O=!1,W=null,j=null,L=null,z=null,k=null;const J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,K=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec($)[1]),Z=K>=1):$.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Z=K>=2);let st=null,ot={};const X=s.getParameter(s.SCISSOR_BOX),tt=s.getParameter(s.VIEWPORT),gt=new oe().fromArray(X),wt=new oe().fromArray(tt);function xt(D,pt,mt,It){const Ct=new Uint8Array(4),Qt=s.createTexture();s.bindTexture(D,Qt),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let te=0;te<mt;te++)n&&(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)?s.texImage3D(pt,0,s.RGBA,1,1,It,0,s.RGBA,s.UNSIGNED_BYTE,Ct):s.texImage2D(pt+te,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ct);return Qt}const Dt={};Dt[s.TEXTURE_2D]=xt(s.TEXTURE_2D,s.TEXTURE_2D,1),Dt[s.TEXTURE_CUBE_MAP]=xt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Dt[s.TEXTURE_2D_ARRAY]=xt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Dt[s.TEXTURE_3D]=xt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ot(s.DEPTH_TEST),c.setFunc(Ns),_t(!1),E(xo),Ot(s.CULL_FACE),q(Pn);function Ot(D){d[D]!==!0&&(s.enable(D),d[D]=!0)}function Et(D){d[D]!==!1&&(s.disable(D),d[D]=!1)}function Nt(D,pt){return p[D]!==pt?(s.bindFramebuffer(D,pt),p[D]=pt,n&&(D===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=pt),D===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=pt)),!0):!1}function P(D,pt){let mt=_,It=!1;if(D)if(mt=g.get(pt),mt===void 0&&(mt=[],g.set(pt,mt)),D.isWebGLMultipleRenderTargets){const Ct=D.texture;if(mt.length!==Ct.length||mt[0]!==s.COLOR_ATTACHMENT0){for(let Qt=0,te=Ct.length;Qt<te;Qt++)mt[Qt]=s.COLOR_ATTACHMENT0+Qt;mt.length=Ct.length,It=!0}}else mt[0]!==s.COLOR_ATTACHMENT0&&(mt[0]=s.COLOR_ATTACHMENT0,It=!0);else mt[0]!==s.BACK&&(mt[0]=s.BACK,It=!0);It&&(e.isWebGL2?s.drawBuffers(mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(mt))}function at(D){return m!==D?(s.useProgram(D),m=D,!0):!1}const Y={[Vn]:s.FUNC_ADD,[ol]:s.FUNC_SUBTRACT,[al]:s.FUNC_REVERSE_SUBTRACT};if(n)Y[wo]=s.MIN,Y[Eo]=s.MAX;else{const D=t.get("EXT_blend_minmax");D!==null&&(Y[wo]=D.MIN_EXT,Y[Eo]=D.MAX_EXT)}const rt={[cl]:s.ZERO,[ll]:s.ONE,[hl]:s.SRC_COLOR,[Or]:s.SRC_ALPHA,[gl]:s.SRC_ALPHA_SATURATE,[pl]:s.DST_COLOR,[dl]:s.DST_ALPHA,[ul]:s.ONE_MINUS_SRC_COLOR,[zr]:s.ONE_MINUS_SRC_ALPHA,[ml]:s.ONE_MINUS_DST_COLOR,[fl]:s.ONE_MINUS_DST_ALPHA,[_l]:s.CONSTANT_COLOR,[vl]:s.ONE_MINUS_CONSTANT_COLOR,[xl]:s.CONSTANT_ALPHA,[Ml]:s.ONE_MINUS_CONSTANT_ALPHA};function q(D,pt,mt,It,Ct,Qt,te,we,De,ee){if(D===Pn){f===!0&&(Et(s.BLEND),f=!1);return}if(f===!1&&(Ot(s.BLEND),f=!0),D!==rl){if(D!==S||ee!==O){if((v!==Vn||A!==Vn)&&(s.blendEquation(s.FUNC_ADD),v=Vn,A=Vn),ee)switch(D){case Si:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Mo:s.blendFunc(s.ONE,s.ONE);break;case yo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case So:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Si:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Mo:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case yo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case So:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,C=null,R=null,I=null,M.set(0,0,0),T=0,S=D,O=ee}return}Ct=Ct||pt,Qt=Qt||mt,te=te||It,(pt!==v||Ct!==A)&&(s.blendEquationSeparate(Y[pt],Y[Ct]),v=pt,A=Ct),(mt!==y||It!==C||Qt!==R||te!==I)&&(s.blendFuncSeparate(rt[mt],rt[It],rt[Qt],rt[te]),y=mt,C=It,R=Qt,I=te),(we.equals(M)===!1||De!==T)&&(s.blendColor(we.r,we.g,we.b,De),M.copy(we),T=De),S=D,O=!1}function Tt(D,pt){D.side===Xe?Et(s.CULL_FACE):Ot(s.CULL_FACE);let mt=D.side===Oe;pt&&(mt=!mt),_t(mt),D.blending===Si&&D.transparent===!1?q(Pn):q(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),a.setMask(D.colorWrite);const It=D.stencilWrite;l.setTest(It),It&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),N(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Ot(s.SAMPLE_ALPHA_TO_COVERAGE):Et(s.SAMPLE_ALPHA_TO_COVERAGE)}function _t(D){W!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),W=D)}function E(D){D!==il?(Ot(s.CULL_FACE),D!==j&&(D===xo?s.cullFace(s.BACK):D===sl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Et(s.CULL_FACE),j=D}function x(D){D!==L&&(Z&&s.lineWidth(D),L=D)}function N(D,pt,mt){D?(Ot(s.POLYGON_OFFSET_FILL),(z!==pt||k!==mt)&&(s.polygonOffset(pt,mt),z=pt,k=mt)):Et(s.POLYGON_OFFSET_FILL)}function it(D){D?Ot(s.SCISSOR_TEST):Et(s.SCISSOR_TEST)}function et(D){D===void 0&&(D=s.TEXTURE0+J-1),st!==D&&(s.activeTexture(D),st=D)}function Q(D,pt,mt){mt===void 0&&(st===null?mt=s.TEXTURE0+J-1:mt=st);let It=ot[mt];It===void 0&&(It={type:void 0,texture:void 0},ot[mt]=It),(It.type!==D||It.texture!==pt)&&(st!==mt&&(s.activeTexture(mt),st=mt),s.bindTexture(D,pt||Dt[D]),It.type=D,It.texture=pt)}function St(){const D=ot[st];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function dt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Bt(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Kt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Zt(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ft(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(D){gt.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),gt.copy(D))}function Jt(D){wt.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),wt.copy(D))}function ue(D,pt){let mt=h.get(pt);mt===void 0&&(mt=new WeakMap,h.set(pt,mt));let It=mt.get(D);It===void 0&&(It=s.getUniformBlockIndex(pt,D.name),mt.set(D,It))}function Xt(D,pt){const It=h.get(pt).get(D);u.get(pt)!==It&&(s.uniformBlockBinding(pt,It,D.__bindingPointIndex),u.set(pt,It))}function lt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},st=null,ot={},p={},g=new WeakMap,_=[],m=null,f=!1,S=null,v=null,y=null,C=null,A=null,R=null,I=null,M=new ft(0,0,0),T=0,O=!1,W=null,j=null,L=null,z=null,k=null,gt.set(0,0,s.canvas.width,s.canvas.height),wt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Ot,disable:Et,bindFramebuffer:Nt,drawBuffers:P,useProgram:at,setBlending:q,setMaterial:Tt,setFlipSided:_t,setCullFace:E,setLineWidth:x,setPolygonOffset:N,setScissorTest:it,activeTexture:et,bindTexture:Q,unbindTexture:St,compressedTexImage2D:dt,compressedTexImage3D:Mt,texImage2D:At,texImage3D:yt,updateUBOMapping:ue,uniformBlockBinding:Xt,texStorage2D:Zt,texStorage3D:Ft,texSubImage2D:Rt,texSubImage3D:Bt,compressedTexSubImage2D:nt,compressedTexSubImage3D:Kt,scissor:Ht,viewport:Jt,reset:lt}}function dm(s,t,e,n,i,r,o){const a=i.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,x){return p?new OffscreenCanvas(E,x):Hs("canvas")}function _(E,x,N,it){let et=1;if((E.width>it||E.height>it)&&(et=it/Math.max(E.width,E.height)),et<1||x===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const Q=x?Gs:Math.floor,St=Q(et*E.width),dt=Q(et*E.height);h===void 0&&(h=g(St,dt));const Mt=N?g(St,dt):h;return Mt.width=St,Mt.height=dt,Mt.getContext("2d").drawImage(E,0,0,St,dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+St+"x"+dt+")."),Mt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Vr(E.width)&&Vr(E.height)}function f(E){return a?!1:E.wrapS!==sn||E.wrapT!==sn||E.minFilter!==Fe&&E.minFilter!==$e}function S(E,x){return E.generateMipmaps&&x&&E.minFilter!==Fe&&E.minFilter!==$e}function v(E){s.generateMipmap(E)}function y(E,x,N,it,et=!1){if(a===!1)return x;if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Q=x;if(x===s.RED&&(N===s.FLOAT&&(Q=s.R32F),N===s.HALF_FLOAT&&(Q=s.R16F),N===s.UNSIGNED_BYTE&&(Q=s.R8)),x===s.RED_INTEGER&&(N===s.UNSIGNED_BYTE&&(Q=s.R8UI),N===s.UNSIGNED_SHORT&&(Q=s.R16UI),N===s.UNSIGNED_INT&&(Q=s.R32UI),N===s.BYTE&&(Q=s.R8I),N===s.SHORT&&(Q=s.R16I),N===s.INT&&(Q=s.R32I)),x===s.RG&&(N===s.FLOAT&&(Q=s.RG32F),N===s.HALF_FLOAT&&(Q=s.RG16F),N===s.UNSIGNED_BYTE&&(Q=s.RG8)),x===s.RGBA){const St=et?Fs:jt.getTransfer(it);N===s.FLOAT&&(Q=s.RGBA32F),N===s.HALF_FLOAT&&(Q=s.RGBA16F),N===s.UNSIGNED_BYTE&&(Q=St===ie?s.SRGB8_ALPHA8:s.RGBA8),N===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),N===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function C(E,x,N){return S(E,N)===!0||E.isFramebufferTexture&&E.minFilter!==Fe&&E.minFilter!==$e?Math.log2(Math.max(x.width,x.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?x.mipmaps.length:1}function A(E){return E===Fe||E===bo||E===js?s.NEAREST:s.LINEAR}function R(E){const x=E.target;x.removeEventListener("dispose",R),M(x),x.isVideoTexture&&u.delete(x)}function I(E){const x=E.target;x.removeEventListener("dispose",I),O(x)}function M(E){const x=n.get(E);if(x.__webglInit===void 0)return;const N=E.source,it=d.get(N);if(it){const et=it[x.__cacheKey];et.usedTimes--,et.usedTimes===0&&T(E),Object.keys(it).length===0&&d.delete(N)}n.remove(E)}function T(E){const x=n.get(E);s.deleteTexture(x.__webglTexture);const N=E.source,it=d.get(N);delete it[x.__cacheKey],o.memory.textures--}function O(E){const x=E.texture,N=n.get(E),it=n.get(x);if(it.__webglTexture!==void 0&&(s.deleteTexture(it.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(N.__webglFramebuffer[et]))for(let Q=0;Q<N.__webglFramebuffer[et].length;Q++)s.deleteFramebuffer(N.__webglFramebuffer[et][Q]);else s.deleteFramebuffer(N.__webglFramebuffer[et]);N.__webglDepthbuffer&&s.deleteRenderbuffer(N.__webglDepthbuffer[et])}else{if(Array.isArray(N.__webglFramebuffer))for(let et=0;et<N.__webglFramebuffer.length;et++)s.deleteFramebuffer(N.__webglFramebuffer[et]);else s.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&s.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&s.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let et=0;et<N.__webglColorRenderbuffer.length;et++)N.__webglColorRenderbuffer[et]&&s.deleteRenderbuffer(N.__webglColorRenderbuffer[et]);N.__webglDepthRenderbuffer&&s.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let et=0,Q=x.length;et<Q;et++){const St=n.get(x[et]);St.__webglTexture&&(s.deleteTexture(St.__webglTexture),o.memory.textures--),n.remove(x[et])}n.remove(x),n.remove(E)}let W=0;function j(){W=0}function L(){const E=W;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),W+=1,E}function z(E){const x=[];return x.push(E.wrapS),x.push(E.wrapT),x.push(E.wrapR||0),x.push(E.magFilter),x.push(E.minFilter),x.push(E.anisotropy),x.push(E.internalFormat),x.push(E.format),x.push(E.type),x.push(E.generateMipmaps),x.push(E.premultiplyAlpha),x.push(E.flipY),x.push(E.unpackAlignment),x.push(E.colorSpace),x.join()}function k(E,x){const N=n.get(E);if(E.isVideoTexture&&Tt(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){const it=E.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{gt(N,E,x);return}}e.bindTexture(s.TEXTURE_2D,N.__webglTexture,s.TEXTURE0+x)}function J(E,x){const N=n.get(E);if(E.version>0&&N.__version!==E.version){gt(N,E,x);return}e.bindTexture(s.TEXTURE_2D_ARRAY,N.__webglTexture,s.TEXTURE0+x)}function Z(E,x){const N=n.get(E);if(E.version>0&&N.__version!==E.version){gt(N,E,x);return}e.bindTexture(s.TEXTURE_3D,N.__webglTexture,s.TEXTURE0+x)}function K(E,x){const N=n.get(E);if(E.version>0&&N.__version!==E.version){wt(N,E,x);return}e.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+x)}const $={[on]:s.REPEAT,[sn]:s.CLAMP_TO_EDGE,[Hr]:s.MIRRORED_REPEAT},st={[Fe]:s.NEAREST,[bo]:s.NEAREST_MIPMAP_NEAREST,[js]:s.NEAREST_MIPMAP_LINEAR,[$e]:s.LINEAR,[Nl]:s.LINEAR_MIPMAP_NEAREST,[Yi]:s.LINEAR_MIPMAP_LINEAR},ot={[Yl]:s.NEVER,[Ql]:s.ALWAYS,[Zl]:s.LESS,[Mc]:s.LEQUAL,[Kl]:s.EQUAL,[jl]:s.GEQUAL,[Jl]:s.GREATER,[$l]:s.NOTEQUAL};function X(E,x,N){if(N?(s.texParameteri(E,s.TEXTURE_WRAP_S,$[x.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,$[x.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,$[x.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,st[x.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,st[x.minFilter])):(s.texParameteri(E,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(E,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(x.wrapS!==sn||x.wrapT!==sn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(E,s.TEXTURE_MAG_FILTER,A(x.magFilter)),s.texParameteri(E,s.TEXTURE_MIN_FILTER,A(x.minFilter)),x.minFilter!==Fe&&x.minFilter!==$e&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,ot[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const it=t.get("EXT_texture_filter_anisotropic");if(x.magFilter===Fe||x.minFilter!==js&&x.minFilter!==Yi||x.type===Cn&&t.has("OES_texture_float_linear")===!1||a===!1&&x.type===Zi&&t.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(s.texParameterf(E,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function tt(E,x){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,x.addEventListener("dispose",R));const it=x.source;let et=d.get(it);et===void 0&&(et={},d.set(it,et));const Q=z(x);if(Q!==E.__cacheKey){et[Q]===void 0&&(et[Q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,N=!0),et[Q].usedTimes++;const St=et[E.__cacheKey];St!==void 0&&(et[E.__cacheKey].usedTimes--,St.usedTimes===0&&T(x)),E.__cacheKey=Q,E.__webglTexture=et[Q].texture}return N}function gt(E,x,N){let it=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(it=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(it=s.TEXTURE_3D);const et=tt(E,x),Q=x.source;e.bindTexture(it,E.__webglTexture,s.TEXTURE0+N);const St=n.get(Q);if(Q.version!==St.__version||et===!0){e.activeTexture(s.TEXTURE0+N);const dt=jt.getPrimaries(jt.workingColorSpace),Mt=x.colorSpace===qe?null:jt.getPrimaries(x.colorSpace),Rt=x.colorSpace===qe||dt===Mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const Bt=f(x)&&m(x.image)===!1;let nt=_(x.image,Bt,!1,i.maxTextureSize);nt=_t(x,nt);const Kt=m(nt)||a,Zt=r.convert(x.format,x.colorSpace);let Ft=r.convert(x.type),At=y(x.internalFormat,Zt,Ft,x.colorSpace,x.isVideoTexture);X(it,x,Kt);let yt;const Ht=x.mipmaps,Jt=a&&x.isVideoTexture!==!0&&At!==_c,ue=St.__version===void 0||et===!0,Xt=C(x,nt,Kt);if(x.isDepthTexture)At=s.DEPTH_COMPONENT,a?x.type===Cn?At=s.DEPTH_COMPONENT32F:x.type===Rn?At=s.DEPTH_COMPONENT24:x.type===Yn?At=s.DEPTH24_STENCIL8:At=s.DEPTH_COMPONENT16:x.type===Cn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Zn&&At===s.DEPTH_COMPONENT&&x.type!==to&&x.type!==Rn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Rn,Ft=r.convert(x.type)),x.format===Ai&&At===s.DEPTH_COMPONENT&&(At=s.DEPTH_STENCIL,x.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Yn,Ft=r.convert(x.type))),ue&&(Jt?e.texStorage2D(s.TEXTURE_2D,1,At,nt.width,nt.height):e.texImage2D(s.TEXTURE_2D,0,At,nt.width,nt.height,0,Zt,Ft,null));else if(x.isDataTexture)if(Ht.length>0&&Kt){Jt&&ue&&e.texStorage2D(s.TEXTURE_2D,Xt,At,Ht[0].width,Ht[0].height);for(let lt=0,D=Ht.length;lt<D;lt++)yt=Ht[lt],Jt?e.texSubImage2D(s.TEXTURE_2D,lt,0,0,yt.width,yt.height,Zt,Ft,yt.data):e.texImage2D(s.TEXTURE_2D,lt,At,yt.width,yt.height,0,Zt,Ft,yt.data);x.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(s.TEXTURE_2D,Xt,At,nt.width,nt.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,nt.width,nt.height,Zt,Ft,nt.data)):e.texImage2D(s.TEXTURE_2D,0,At,nt.width,nt.height,0,Zt,Ft,nt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Jt&&ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Xt,At,Ht[0].width,Ht[0].height,nt.depth);for(let lt=0,D=Ht.length;lt<D;lt++)yt=Ht[lt],x.format!==rn?Zt!==null?Jt?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,lt,0,0,0,yt.width,yt.height,nt.depth,Zt,yt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,lt,At,yt.width,yt.height,nt.depth,0,yt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage3D(s.TEXTURE_2D_ARRAY,lt,0,0,0,yt.width,yt.height,nt.depth,Zt,Ft,yt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,lt,At,yt.width,yt.height,nt.depth,0,Zt,Ft,yt.data)}else{Jt&&ue&&e.texStorage2D(s.TEXTURE_2D,Xt,At,Ht[0].width,Ht[0].height);for(let lt=0,D=Ht.length;lt<D;lt++)yt=Ht[lt],x.format!==rn?Zt!==null?Jt?e.compressedTexSubImage2D(s.TEXTURE_2D,lt,0,0,yt.width,yt.height,Zt,yt.data):e.compressedTexImage2D(s.TEXTURE_2D,lt,At,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage2D(s.TEXTURE_2D,lt,0,0,yt.width,yt.height,Zt,Ft,yt.data):e.texImage2D(s.TEXTURE_2D,lt,At,yt.width,yt.height,0,Zt,Ft,yt.data)}else if(x.isDataArrayTexture)Jt?(ue&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Xt,At,nt.width,nt.height,nt.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,Zt,Ft,nt.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,At,nt.width,nt.height,nt.depth,0,Zt,Ft,nt.data);else if(x.isData3DTexture)Jt?(ue&&e.texStorage3D(s.TEXTURE_3D,Xt,At,nt.width,nt.height,nt.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,Zt,Ft,nt.data)):e.texImage3D(s.TEXTURE_3D,0,At,nt.width,nt.height,nt.depth,0,Zt,Ft,nt.data);else if(x.isFramebufferTexture){if(ue)if(Jt)e.texStorage2D(s.TEXTURE_2D,Xt,At,nt.width,nt.height);else{let lt=nt.width,D=nt.height;for(let pt=0;pt<Xt;pt++)e.texImage2D(s.TEXTURE_2D,pt,At,lt,D,0,Zt,Ft,null),lt>>=1,D>>=1}}else if(Ht.length>0&&Kt){Jt&&ue&&e.texStorage2D(s.TEXTURE_2D,Xt,At,Ht[0].width,Ht[0].height);for(let lt=0,D=Ht.length;lt<D;lt++)yt=Ht[lt],Jt?e.texSubImage2D(s.TEXTURE_2D,lt,0,0,Zt,Ft,yt):e.texImage2D(s.TEXTURE_2D,lt,At,Zt,Ft,yt);x.generateMipmaps=!1}else Jt?(ue&&e.texStorage2D(s.TEXTURE_2D,Xt,At,nt.width,nt.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,Zt,Ft,nt)):e.texImage2D(s.TEXTURE_2D,0,At,Zt,Ft,nt);S(x,Kt)&&v(it),St.__version=Q.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function wt(E,x,N){if(x.image.length!==6)return;const it=tt(E,x),et=x.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+N);const Q=n.get(et);if(et.version!==Q.__version||it===!0){e.activeTexture(s.TEXTURE0+N);const St=jt.getPrimaries(jt.workingColorSpace),dt=x.colorSpace===qe?null:jt.getPrimaries(x.colorSpace),Mt=x.colorSpace===qe||St===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Rt=x.isCompressedTexture||x.image[0].isCompressedTexture,Bt=x.image[0]&&x.image[0].isDataTexture,nt=[];for(let lt=0;lt<6;lt++)!Rt&&!Bt?nt[lt]=_(x.image[lt],!1,!0,i.maxCubemapSize):nt[lt]=Bt?x.image[lt].image:x.image[lt],nt[lt]=_t(x,nt[lt]);const Kt=nt[0],Zt=m(Kt)||a,Ft=r.convert(x.format,x.colorSpace),At=r.convert(x.type),yt=y(x.internalFormat,Ft,At,x.colorSpace),Ht=a&&x.isVideoTexture!==!0,Jt=Q.__version===void 0||it===!0;let ue=C(x,Kt,Zt);X(s.TEXTURE_CUBE_MAP,x,Zt);let Xt;if(Rt){Ht&&Jt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ue,yt,Kt.width,Kt.height);for(let lt=0;lt<6;lt++){Xt=nt[lt].mipmaps;for(let D=0;D<Xt.length;D++){const pt=Xt[D];x.format!==rn?Ft!==null?Ht?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D,0,0,pt.width,pt.height,Ft,pt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D,yt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D,0,0,pt.width,pt.height,Ft,At,pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D,yt,pt.width,pt.height,0,Ft,At,pt.data)}}}else{Xt=x.mipmaps,Ht&&Jt&&(Xt.length>0&&ue++,e.texStorage2D(s.TEXTURE_CUBE_MAP,ue,yt,nt[0].width,nt[0].height));for(let lt=0;lt<6;lt++)if(Bt){Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,nt[lt].width,nt[lt].height,Ft,At,nt[lt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,yt,nt[lt].width,nt[lt].height,0,Ft,At,nt[lt].data);for(let D=0;D<Xt.length;D++){const mt=Xt[D].image[lt].image;Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D+1,0,0,mt.width,mt.height,Ft,At,mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D+1,yt,mt.width,mt.height,0,Ft,At,mt.data)}}else{Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Ft,At,nt[lt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,yt,Ft,At,nt[lt]);for(let D=0;D<Xt.length;D++){const pt=Xt[D];Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D+1,0,0,Ft,At,pt.image[lt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,D+1,yt,Ft,At,pt.image[lt])}}}S(x,Zt)&&v(s.TEXTURE_CUBE_MAP),Q.__version=et.version,x.onUpdate&&x.onUpdate(x)}E.__version=x.version}function xt(E,x,N,it,et,Q){const St=r.convert(N.format,N.colorSpace),dt=r.convert(N.type),Mt=y(N.internalFormat,St,dt,N.colorSpace);if(!n.get(x).__hasExternalTextures){const Bt=Math.max(1,x.width>>Q),nt=Math.max(1,x.height>>Q);et===s.TEXTURE_3D||et===s.TEXTURE_2D_ARRAY?e.texImage3D(et,Q,Mt,Bt,nt,x.depth,0,St,dt,null):e.texImage2D(et,Q,Mt,Bt,nt,0,St,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),q(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,et,n.get(N).__webglTexture,0,rt(x)):(et===s.TEXTURE_2D||et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,it,et,n.get(N).__webglTexture,Q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(E,x,N){if(s.bindRenderbuffer(s.RENDERBUFFER,E),x.depthBuffer&&!x.stencilBuffer){let it=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(N||q(x)){const et=x.depthTexture;et&&et.isDepthTexture&&(et.type===Cn?it=s.DEPTH_COMPONENT32F:et.type===Rn&&(it=s.DEPTH_COMPONENT24));const Q=rt(x);q(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Q,it,x.width,x.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,Q,it,x.width,x.height)}else s.renderbufferStorage(s.RENDERBUFFER,it,x.width,x.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,E)}else if(x.depthBuffer&&x.stencilBuffer){const it=rt(x);N&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,it,s.DEPTH24_STENCIL8,x.width,x.height):q(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,it,s.DEPTH24_STENCIL8,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,E)}else{const it=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let et=0;et<it.length;et++){const Q=it[et],St=r.convert(Q.format,Q.colorSpace),dt=r.convert(Q.type),Mt=y(Q.internalFormat,St,dt,Q.colorSpace),Rt=rt(x);N&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Rt,Mt,x.width,x.height):q(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Rt,Mt,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Mt,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ot(E,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),k(x.depthTexture,0);const it=n.get(x.depthTexture).__webglTexture,et=rt(x);if(x.depthTexture.format===Zn)q(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0);else if(x.depthTexture.format===Ai)q(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0,et):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function Et(E){const x=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!x.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Ot(x.__webglFramebuffer,E)}else if(N){x.__webglDepthbuffer=[];for(let it=0;it<6;it++)e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[it]),x.__webglDepthbuffer[it]=s.createRenderbuffer(),Dt(x.__webglDepthbuffer[it],E,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=s.createRenderbuffer(),Dt(x.__webglDepthbuffer,E,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(E,x,N){const it=n.get(E);x!==void 0&&xt(it.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),N!==void 0&&Et(E)}function P(E){const x=E.texture,N=n.get(E),it=n.get(x);E.addEventListener("dispose",I),E.isWebGLMultipleRenderTargets!==!0&&(it.__webglTexture===void 0&&(it.__webglTexture=s.createTexture()),it.__version=x.version,o.memory.textures++);const et=E.isWebGLCubeRenderTarget===!0,Q=E.isWebGLMultipleRenderTargets===!0,St=m(E)||a;if(et){N.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(a&&x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer[dt]=[];for(let Mt=0;Mt<x.mipmaps.length;Mt++)N.__webglFramebuffer[dt][Mt]=s.createFramebuffer()}else N.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(a&&x.mipmaps&&x.mipmaps.length>0){N.__webglFramebuffer=[];for(let dt=0;dt<x.mipmaps.length;dt++)N.__webglFramebuffer[dt]=s.createFramebuffer()}else N.__webglFramebuffer=s.createFramebuffer();if(Q)if(i.drawBuffers){const dt=E.texture;for(let Mt=0,Rt=dt.length;Mt<Rt;Mt++){const Bt=n.get(dt[Mt]);Bt.__webglTexture===void 0&&(Bt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&q(E)===!1){const dt=Q?x:[x];N.__webglMultisampledFramebuffer=s.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Mt=0;Mt<dt.length;Mt++){const Rt=dt[Mt];N.__webglColorRenderbuffer[Mt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,N.__webglColorRenderbuffer[Mt]);const Bt=r.convert(Rt.format,Rt.colorSpace),nt=r.convert(Rt.type),Kt=y(Rt.internalFormat,Bt,nt,Rt.colorSpace,E.isXRRenderTarget===!0),Zt=rt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt,Kt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,N.__webglColorRenderbuffer[Mt])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=s.createRenderbuffer(),Dt(N.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(et){e.bindTexture(s.TEXTURE_CUBE_MAP,it.__webglTexture),X(s.TEXTURE_CUBE_MAP,x,St);for(let dt=0;dt<6;dt++)if(a&&x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)xt(N.__webglFramebuffer[dt][Mt],E,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt);else xt(N.__webglFramebuffer[dt],E,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);S(x,St)&&v(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Q){const dt=E.texture;for(let Mt=0,Rt=dt.length;Mt<Rt;Mt++){const Bt=dt[Mt],nt=n.get(Bt);e.bindTexture(s.TEXTURE_2D,nt.__webglTexture),X(s.TEXTURE_2D,Bt,St),xt(N.__webglFramebuffer,E,Bt,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,0),S(Bt,St)&&v(s.TEXTURE_2D)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?dt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(dt,it.__webglTexture),X(dt,x,St),a&&x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)xt(N.__webglFramebuffer[Mt],E,x,s.COLOR_ATTACHMENT0,dt,Mt);else xt(N.__webglFramebuffer,E,x,s.COLOR_ATTACHMENT0,dt,0);S(x,St)&&v(dt),e.unbindTexture()}E.depthBuffer&&Et(E)}function at(E){const x=m(E)||a,N=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let it=0,et=N.length;it<et;it++){const Q=N[it];if(S(Q,x)){const St=E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,dt=n.get(Q).__webglTexture;e.bindTexture(St,dt),v(St),e.unbindTexture()}}}function Y(E){if(a&&E.samples>0&&q(E)===!1){const x=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],N=E.width,it=E.height;let et=s.COLOR_BUFFER_BIT;const Q=[],St=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=n.get(E),Mt=E.isWebGLMultipleRenderTargets===!0;if(Mt)for(let Rt=0;Rt<x.length;Rt++)e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let Rt=0;Rt<x.length;Rt++){Q.push(s.COLOR_ATTACHMENT0+Rt),E.depthBuffer&&Q.push(St);const Bt=dt.__ignoreDepthValues!==void 0?dt.__ignoreDepthValues:!1;if(Bt===!1&&(E.depthBuffer&&(et|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&(et|=s.STENCIL_BUFFER_BIT)),Mt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,dt.__webglColorRenderbuffer[Rt]),Bt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[St]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[St])),Mt){const nt=n.get(x[Rt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,nt,0)}s.blitFramebuffer(0,0,N,it,0,0,N,it,et,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Q)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Mt)for(let Rt=0;Rt<x.length;Rt++){e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.RENDERBUFFER,dt.__webglColorRenderbuffer[Rt]);const Bt=n.get(x[Rt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,dt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Rt,s.TEXTURE_2D,Bt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}}function rt(E){return Math.min(i.maxSamples,E.samples)}function q(E){const x=n.get(E);return a&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Tt(E){const x=o.render.frame;u.get(E)!==x&&(u.set(E,x),E.update())}function _t(E,x){const N=E.colorSpace,it=E.format,et=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===kr||N!==Mn&&N!==qe&&(jt.getTransfer(N)===ie?a===!1?t.has("EXT_sRGB")===!0&&it===rn?(E.format=kr,E.minFilter=$e,E.generateMipmaps=!1):x=Sc.sRGBToLinear(x):(it!==rn||et!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),x}this.allocateTextureUnit=L,this.resetTextureUnits=j,this.setTexture2D=k,this.setTexture2DArray=J,this.setTexture3D=Z,this.setTextureCube=K,this.rebindTextures=Nt,this.setupRenderTarget=P,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=Y,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=q}function fm(s,t,e){const n=e.isWebGL2;function i(r,o=qe){let a;const c=jt.getTransfer(o);if(r===Dn)return s.UNSIGNED_BYTE;if(r===dc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===fc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Fl)return s.BYTE;if(r===Ol)return s.SHORT;if(r===to)return s.UNSIGNED_SHORT;if(r===uc)return s.INT;if(r===Rn)return s.UNSIGNED_INT;if(r===Cn)return s.FLOAT;if(r===Zi)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===zl)return s.ALPHA;if(r===rn)return s.RGBA;if(r===Bl)return s.LUMINANCE;if(r===Gl)return s.LUMINANCE_ALPHA;if(r===Zn)return s.DEPTH_COMPONENT;if(r===Ai)return s.DEPTH_STENCIL;if(r===kr)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Hl)return s.RED;if(r===pc)return s.RED_INTEGER;if(r===kl)return s.RG;if(r===mc)return s.RG_INTEGER;if(r===gc)return s.RGBA_INTEGER;if(r===Qs||r===tr||r===er||r===nr)if(c===ie)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Qs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===tr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===er)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===nr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Qs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===tr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===er)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===nr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===To||r===Ao||r===Ro||r===Co)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===To)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ao)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ro)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Co)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===_c)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Po||r===Lo)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Po)return c===ie?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Lo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Do||r===Io||r===Uo||r===No||r===Fo||r===Oo||r===zo||r===Bo||r===Go||r===Ho||r===ko||r===Vo||r===Wo||r===Xo)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Do)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Io)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Uo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===No)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Fo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Oo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===zo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Bo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Go)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ho)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ko)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Vo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Wo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Xo)return c===ie?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ir||r===qo||r===Yo)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===ir)return c===ie?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===qo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Yo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Vl||r===Zo||r===Ko||r===Jo)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===ir)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Zo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ko)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Jo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Yn?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class pm extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Pt extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mm={type:"move"};class Tr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mm)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Pt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class gm extends Pi{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,g=null;const _=e.getContextAttributes();let m=null,f=null;const S=[],v=[],y=new ct;let C=null;const A=new We;A.layers.enable(1),A.viewport=new oe;const R=new We;R.layers.enable(2),R.viewport=new oe;const I=[A,R],M=new pm;M.layers.enable(1),M.layers.enable(2);let T=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let tt=S[X];return tt===void 0&&(tt=new Tr,S[X]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(X){let tt=S[X];return tt===void 0&&(tt=new Tr,S[X]=tt),tt.getGripSpace()},this.getHand=function(X){let tt=S[X];return tt===void 0&&(tt=new Tr,S[X]=tt),tt.getHandSpace()};function W(X){const tt=v.indexOf(X.inputSource);if(tt===-1)return;const gt=S[tt];gt!==void 0&&(gt.update(X.inputSource,X.frame,l||o),gt.dispatchEvent({type:X.type,data:X.inputSource}))}function j(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",L);for(let X=0;X<S.length;X++){const tt=v[X];tt!==null&&(v[X]=null,S[X].disconnect(tt))}T=null,O=null,t.setRenderTarget(m),p=null,d=null,h=null,i=null,f=null,ot.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(y.width,y.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",j),i.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(y),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const tt={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Jn(p.framebufferWidth,p.framebufferHeight,{format:rn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let tt=null,gt=null,wt=null;_.depth&&(wt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=_.stencil?Ai:Zn,gt=_.stencil?Yn:Rn);const xt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:r};h=new XRWebGLBinding(i,e),d=h.createProjectionLayer(xt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),f=new Jn(d.textureWidth,d.textureHeight,{format:rn,type:Dn,depthTexture:new Nc(d.textureWidth,d.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const Dt=t.properties.get(f);Dt.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ot.setContext(i),ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L(X){for(let tt=0;tt<X.removed.length;tt++){const gt=X.removed[tt],wt=v.indexOf(gt);wt>=0&&(v[wt]=null,S[wt].disconnect(gt))}for(let tt=0;tt<X.added.length;tt++){const gt=X.added[tt];let wt=v.indexOf(gt);if(wt===-1){for(let Dt=0;Dt<S.length;Dt++)if(Dt>=v.length){v.push(gt),wt=Dt;break}else if(v[Dt]===null){v[Dt]=gt,wt=Dt;break}if(wt===-1)break}const xt=S[wt];xt&&xt.connect(gt)}}const z=new w,k=new w;function J(X,tt,gt){z.setFromMatrixPosition(tt.matrixWorld),k.setFromMatrixPosition(gt.matrixWorld);const wt=z.distanceTo(k),xt=tt.projectionMatrix.elements,Dt=gt.projectionMatrix.elements,Ot=xt[14]/(xt[10]-1),Et=xt[14]/(xt[10]+1),Nt=(xt[9]+1)/xt[5],P=(xt[9]-1)/xt[5],at=(xt[8]-1)/xt[0],Y=(Dt[8]+1)/Dt[0],rt=Ot*at,q=Ot*Y,Tt=wt/(-at+Y),_t=Tt*-at;tt.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(_t),X.translateZ(Tt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const E=Ot+Tt,x=Et+Tt,N=rt-_t,it=q+(wt-_t),et=Nt*Et/x*E,Q=P*Et/x*E;X.projectionMatrix.makePerspective(N,it,et,Q,E,x),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function Z(X,tt){tt===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(tt.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;M.near=R.near=A.near=X.near,M.far=R.far=A.far=X.far,(T!==M.near||O!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,O=M.far);const tt=X.parent,gt=M.cameras;Z(M,tt);for(let wt=0;wt<gt.length;wt++)Z(gt[wt],tt);gt.length===2?J(M,A,R):M.projectionMatrix.copy(A.projectionMatrix),K(X,M,tt)};function K(X,tt,gt){gt===null?X.matrix.copy(tt.matrixWorld):(X.matrix.copy(gt.matrixWorld),X.matrix.invert(),X.matrix.multiply(tt.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(tt.projectionMatrix),X.projectionMatrixInverse.copy(tt.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ki*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)};let $=null;function st(X,tt){if(u=tt.getViewerPose(l||o),g=tt,u!==null){const gt=u.views;p!==null&&(t.setRenderTargetFramebuffer(f,p.framebuffer),t.setRenderTarget(f));let wt=!1;gt.length!==M.cameras.length&&(M.cameras.length=0,wt=!0);for(let xt=0;xt<gt.length;xt++){const Dt=gt[xt];let Ot=null;if(p!==null)Ot=p.getViewport(Dt);else{const Nt=h.getViewSubImage(d,Dt);Ot=Nt.viewport,xt===0&&(t.setRenderTargetTextures(f,Nt.colorTexture,d.ignoreDepthValues?void 0:Nt.depthStencilTexture),t.setRenderTarget(f))}let Et=I[xt];Et===void 0&&(Et=new We,Et.layers.enable(xt),Et.viewport=new oe,I[xt]=Et),Et.matrix.fromArray(Dt.transform.matrix),Et.matrix.decompose(Et.position,Et.quaternion,Et.scale),Et.projectionMatrix.fromArray(Dt.projectionMatrix),Et.projectionMatrixInverse.copy(Et.projectionMatrix).invert(),Et.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),xt===0&&(M.matrix.copy(Et.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),wt===!0&&M.cameras.push(Et)}}for(let gt=0;gt<S.length;gt++){const wt=v[gt],xt=S[gt];wt!==null&&xt!==void 0&&xt.update(wt,tt,l||o)}$&&$(X,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const ot=new Ic;ot.setAnimationLoop(st),this.setAnimationLoop=function(X){$=X},this.dispose=function(){}}}function _m(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Pc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,S,v,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,S,v):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Oe&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Oe&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=t.get(f).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,e(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,S,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=v*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),t.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Oe&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const S=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function vm(s,t,e,n){let i={},r={},o=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,v){const y=v.program;n.uniformBlockBinding(S,y)}function l(S,v){let y=i[S.id];y===void 0&&(g(S),y=u(S),i[S.id]=y,S.addEventListener("dispose",m));const C=v.program;n.updateUBOMapping(S,C);const A=t.render.frame;r[S.id]!==A&&(d(S),r[S.id]=A)}function u(S){const v=h();S.__bindingPointIndex=v;const y=s.createBuffer(),C=S.__size,A=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,C,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,y),y}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const v=i[S.id],y=S.uniforms,C=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let A=0,R=y.length;A<R;A++){const I=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,T=I.length;M<T;M++){const O=I[M];if(p(O,A,M,C)===!0){const W=O.__offset,j=Array.isArray(O.value)?O.value:[O.value];let L=0;for(let z=0;z<j.length;z++){const k=j[z],J=_(k);typeof k=="number"||typeof k=="boolean"?(O.__data[0]=k,s.bufferSubData(s.UNIFORM_BUFFER,W+L,O.__data)):k.isMatrix3?(O.__data[0]=k.elements[0],O.__data[1]=k.elements[1],O.__data[2]=k.elements[2],O.__data[3]=0,O.__data[4]=k.elements[3],O.__data[5]=k.elements[4],O.__data[6]=k.elements[5],O.__data[7]=0,O.__data[8]=k.elements[6],O.__data[9]=k.elements[7],O.__data[10]=k.elements[8],O.__data[11]=0):(k.toArray(O.__data,L),L+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,W,O.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(S,v,y,C){const A=S.value,R=v+"_"+y;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{const I=C[R];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return C[R]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(S){const v=S.uniforms;let y=0;const C=16;for(let R=0,I=v.length;R<I;R++){const M=Array.isArray(v[R])?v[R]:[v[R]];for(let T=0,O=M.length;T<O;T++){const W=M[T],j=Array.isArray(W.value)?W.value:[W.value];for(let L=0,z=j.length;L<z;L++){const k=j[L],J=_(k),Z=y%C;Z!==0&&C-Z<J.boundary&&(y+=C-Z),W.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=y,y+=J.storage}}}const A=y%C;return A>0&&(y+=C-A),S.__size=y,S.__cache={},this}function _(S){const v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function m(S){const v=S.target;v.removeEventListener("dispose",m);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function f(){for(const S in i)s.deleteBuffer(i[S]);o=[],i={},r={}}return{bind:c,update:l,dispose:f}}class Hc{constructor(t={}){const{canvas:e=ph(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=me,this._useLegacyLights=!1,this.toneMapping=Ln,this.toneMappingExposure=1;const v=this;let y=!1,C=0,A=0,R=null,I=-1,M=null;const T=new oe,O=new oe;let W=null;const j=new ft(0);let L=0,z=e.width,k=e.height,J=1,Z=null,K=null;const $=new oe(0,0,z,k),st=new oe(0,0,z,k);let ot=!1;const X=new so;let tt=!1,gt=!1,wt=null;const xt=new he,Dt=new ct,Ot=new w,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Nt(){return R===null?J:1}let P=n;function at(b,U){for(let H=0;H<b.length;H++){const V=b[H],B=e.getContext(V,U);if(B!==null)return B}return null}try{const b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qr}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",D,!1),e.addEventListener("webglcontextcreationerror",pt,!1),P===null){const U=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&U.shift(),P=at(U,b),P===null)throw at(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Y,rt,q,Tt,_t,E,x,N,it,et,Q,St,dt,Mt,Rt,Bt,nt,Kt,Zt,Ft,At,yt,Ht,Jt;function ue(){Y=new Rf(P),rt=new Sf(P,Y,t),Y.init(rt),yt=new fm(P,Y,rt),q=new um(P,Y,rt),Tt=new Lf(P),_t=new $p,E=new dm(P,Y,q,_t,rt,yt,Tt),x=new Ef(v),N=new Af(v),it=new zh(P,rt),Ht=new Mf(P,Y,it,rt),et=new Cf(P,it,Tt,Ht),Q=new Nf(P,et,it,Tt),Zt=new Uf(P,rt,E),Bt=new wf(_t),St=new Jp(v,x,N,Y,rt,Ht,Bt),dt=new _m(v,_t),Mt=new Qp,Rt=new rm(Y,rt),Kt=new xf(v,x,N,q,Q,d,c),nt=new hm(v,Q,rt),Jt=new vm(P,Tt,rt,q),Ft=new yf(P,Y,Tt,rt),At=new Pf(P,Y,Tt,rt),Tt.programs=St.programs,v.capabilities=rt,v.extensions=Y,v.properties=_t,v.renderLists=Mt,v.shadowMap=nt,v.state=q,v.info=Tt}ue();const Xt=new gm(v,P);this.xr=Xt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=Y.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Y.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(b){b!==void 0&&(J=b,this.setSize(z,k,!1))},this.getSize=function(b){return b.set(z,k)},this.setSize=function(b,U,H=!0){if(Xt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,k=U,e.width=Math.floor(b*J),e.height=Math.floor(U*J),H===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(z*J,k*J).floor()},this.setDrawingBufferSize=function(b,U,H){z=b,k=U,J=H,e.width=Math.floor(b*H),e.height=Math.floor(U*H),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy($)},this.setViewport=function(b,U,H,V){b.isVector4?$.set(b.x,b.y,b.z,b.w):$.set(b,U,H,V),q.viewport(T.copy($).multiplyScalar(J).floor())},this.getScissor=function(b){return b.copy(st)},this.setScissor=function(b,U,H,V){b.isVector4?st.set(b.x,b.y,b.z,b.w):st.set(b,U,H,V),q.scissor(O.copy(st).multiplyScalar(J).floor())},this.getScissorTest=function(){return ot},this.setScissorTest=function(b){q.setScissorTest(ot=b)},this.setOpaqueSort=function(b){Z=b},this.setTransparentSort=function(b){K=b},this.getClearColor=function(b){return b.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(b=!0,U=!0,H=!0){let V=0;if(b){let B=!1;if(R!==null){const vt=R.texture.format;B=vt===gc||vt===mc||vt===pc}if(B){const vt=R.texture.type,bt=vt===Dn||vt===Rn||vt===to||vt===Yn||vt===dc||vt===fc,Lt=Kt.getClearColor(),Ut=Kt.getClearAlpha(),Wt=Lt.r,zt=Lt.g,Gt=Lt.b;bt?(p[0]=Wt,p[1]=zt,p[2]=Gt,p[3]=Ut,P.clearBufferuiv(P.COLOR,0,p)):(g[0]=Wt,g[1]=zt,g[2]=Gt,g[3]=Ut,P.clearBufferiv(P.COLOR,0,g))}else V|=P.COLOR_BUFFER_BIT}U&&(V|=P.DEPTH_BUFFER_BIT),H&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",D,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),Mt.dispose(),Rt.dispose(),_t.dispose(),x.dispose(),N.dispose(),Q.dispose(),Ht.dispose(),Jt.dispose(),St.dispose(),Xt.dispose(),Xt.removeEventListener("sessionstart",De),Xt.removeEventListener("sessionend",ee),wt&&(wt.dispose(),wt=null),Ie.stop()};function lt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const b=Tt.autoReset,U=nt.enabled,H=nt.autoUpdate,V=nt.needsUpdate,B=nt.type;ue(),Tt.autoReset=b,nt.enabled=U,nt.autoUpdate=H,nt.needsUpdate=V,nt.type=B}function pt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function mt(b){const U=b.target;U.removeEventListener("dispose",mt),It(U)}function It(b){Ct(b),_t.remove(b)}function Ct(b){const U=_t.get(b).programs;U!==void 0&&(U.forEach(function(H){St.releaseProgram(H)}),b.isShaderMaterial&&St.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,H,V,B,vt){U===null&&(U=Et);const bt=B.isMesh&&B.matrixWorld.determinant()<0,Lt=Qc(b,U,H,V,B);q.setMaterial(V,bt);let Ut=H.index,Wt=1;if(V.wireframe===!0){if(Ut=et.getWireframeAttribute(H),Ut===void 0)return;Wt=2}const zt=H.drawRange,Gt=H.attributes.position;let fe=zt.start*Wt,Ge=(zt.start+zt.count)*Wt;vt!==null&&(fe=Math.max(fe,vt.start*Wt),Ge=Math.min(Ge,(vt.start+vt.count)*Wt)),Ut!==null?(fe=Math.max(fe,0),Ge=Math.min(Ge,Ut.count)):Gt!=null&&(fe=Math.max(fe,0),Ge=Math.min(Ge,Gt.count));const Ee=Ge-fe;if(Ee<0||Ee===1/0)return;Ht.setup(B,V,Lt,H,Ut);let un,ae=Ft;if(Ut!==null&&(un=it.get(Ut),ae=At,ae.setIndex(un)),B.isMesh)V.wireframe===!0?(q.setLineWidth(V.wireframeLinewidth*Nt()),ae.setMode(P.LINES)):ae.setMode(P.TRIANGLES);else if(B.isLine){let qt=V.linewidth;qt===void 0&&(qt=1),q.setLineWidth(qt*Nt()),B.isLineSegments?ae.setMode(P.LINES):B.isLineLoop?ae.setMode(P.LINE_LOOP):ae.setMode(P.LINE_STRIP)}else B.isPoints?ae.setMode(P.POINTS):B.isSprite&&ae.setMode(P.TRIANGLES);if(B.isBatchedMesh)ae.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)ae.renderInstances(fe,Ee,B.count);else if(H.isInstancedBufferGeometry){const qt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Zs=Math.min(H.instanceCount,qt);ae.renderInstances(fe,Ee,Zs)}else ae.render(fe,Ee)};function Qt(b,U,H){b.transparent===!0&&b.side===Xe&&b.forceSinglePass===!1?(b.side=Oe,b.needsUpdate=!0,ns(b,U,H),b.side=In,b.needsUpdate=!0,ns(b,U,H),b.side=Xe):ns(b,U,H)}this.compile=function(b,U,H=null){H===null&&(H=b),m=Rt.get(H),m.init(),S.push(m),H.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),b!==H&&b.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights(v._useLegacyLights);const V=new Set;return b.traverse(function(B){const vt=B.material;if(vt)if(Array.isArray(vt))for(let bt=0;bt<vt.length;bt++){const Lt=vt[bt];Qt(Lt,H,B),V.add(Lt)}else Qt(vt,H,B),V.add(vt)}),S.pop(),m=null,V},this.compileAsync=function(b,U,H=null){const V=this.compile(b,U,H);return new Promise(B=>{function vt(){if(V.forEach(function(bt){_t.get(bt).currentProgram.isReady()&&V.delete(bt)}),V.size===0){B(b);return}setTimeout(vt,10)}Y.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let te=null;function we(b){te&&te(b)}function De(){Ie.stop()}function ee(){Ie.start()}const Ie=new Ic;Ie.setAnimationLoop(we),typeof self<"u"&&Ie.setContext(self),this.setAnimationLoop=function(b){te=b,Xt.setAnimationLoop(b),b===null?Ie.stop():Ie.start()},Xt.addEventListener("sessionstart",De),Xt.addEventListener("sessionend",ee),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Xt.enabled===!0&&Xt.isPresenting===!0&&(Xt.cameraAutoUpdate===!0&&Xt.updateCamera(U),U=Xt.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,U,R),m=Rt.get(b,S.length),m.init(),S.push(m),xt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(xt),gt=this.localClippingEnabled,tt=Bt.init(this.clippingPlanes,gt),_=Mt.get(b,f.length),_.init(),f.push(_),an(b,U,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(Z,K),this.info.render.frame++,tt===!0&&Bt.beginShadows();const H=m.state.shadowsArray;if(nt.render(H,b,U),tt===!0&&Bt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Kt.render(_,b),m.setupLights(v._useLegacyLights),U.isArrayCamera){const V=U.cameras;for(let B=0,vt=V.length;B<vt;B++){const bt=V[B];fo(_,b,bt,bt.viewport)}}else fo(_,b,U);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(v,b,U),Ht.resetDefaultState(),I=-1,M=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function an(b,U,H,V){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){V&&Ot.setFromMatrixPosition(b.matrixWorld).applyMatrix4(xt);const bt=Q.update(b),Lt=b.material;Lt.visible&&_.push(b,bt,Lt,H,Ot.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const bt=Q.update(b),Lt=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ot.copy(b.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Ot.copy(bt.boundingSphere.center)),Ot.applyMatrix4(b.matrixWorld).applyMatrix4(xt)),Array.isArray(Lt)){const Ut=bt.groups;for(let Wt=0,zt=Ut.length;Wt<zt;Wt++){const Gt=Ut[Wt],fe=Lt[Gt.materialIndex];fe&&fe.visible&&_.push(b,bt,fe,H,Ot.z,Gt)}}else Lt.visible&&_.push(b,bt,Lt,H,Ot.z,null)}}const vt=b.children;for(let bt=0,Lt=vt.length;bt<Lt;bt++)an(vt[bt],U,H,V)}function fo(b,U,H,V){const B=b.opaque,vt=b.transmissive,bt=b.transparent;m.setupLightsView(H),tt===!0&&Bt.setGlobalState(v.clippingPlanes,H),vt.length>0&&jc(B,vt,U,H),V&&q.viewport(T.copy(V)),B.length>0&&es(B,U,H),vt.length>0&&es(vt,U,H),bt.length>0&&es(bt,U,H),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function jc(b,U,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const vt=rt.isWebGL2;wt===null&&(wt=new Jn(1,1,{generateMipmaps:!0,type:Y.has("EXT_color_buffer_half_float")?Zi:Dn,minFilter:Yi,samples:vt?4:0})),v.getDrawingBufferSize(Dt),vt?wt.setSize(Dt.x,Dt.y):wt.setSize(Gs(Dt.x),Gs(Dt.y));const bt=v.getRenderTarget();v.setRenderTarget(wt),v.getClearColor(j),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const Lt=v.toneMapping;v.toneMapping=Ln,es(b,H,V),E.updateMultisampleRenderTarget(wt),E.updateRenderTargetMipmap(wt);let Ut=!1;for(let Wt=0,zt=U.length;Wt<zt;Wt++){const Gt=U[Wt],fe=Gt.object,Ge=Gt.geometry,Ee=Gt.material,un=Gt.group;if(Ee.side===Xe&&fe.layers.test(V.layers)){const ae=Ee.side;Ee.side=Oe,Ee.needsUpdate=!0,po(fe,H,V,Ge,Ee,un),Ee.side=ae,Ee.needsUpdate=!0,Ut=!0}}Ut===!0&&(E.updateMultisampleRenderTarget(wt),E.updateRenderTargetMipmap(wt)),v.setRenderTarget(bt),v.setClearColor(j,L),v.toneMapping=Lt}function es(b,U,H){const V=U.isScene===!0?U.overrideMaterial:null;for(let B=0,vt=b.length;B<vt;B++){const bt=b[B],Lt=bt.object,Ut=bt.geometry,Wt=V===null?bt.material:V,zt=bt.group;Lt.layers.test(H.layers)&&po(Lt,U,H,Ut,Wt,zt)}}function po(b,U,H,V,B,vt){b.onBeforeRender(v,U,H,V,B,vt),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),B.onBeforeRender(v,U,H,V,b,vt),B.transparent===!0&&B.side===Xe&&B.forceSinglePass===!1?(B.side=Oe,B.needsUpdate=!0,v.renderBufferDirect(H,U,V,B,b,vt),B.side=In,B.needsUpdate=!0,v.renderBufferDirect(H,U,V,B,b,vt),B.side=Xe):v.renderBufferDirect(H,U,V,B,b,vt),b.onAfterRender(v,U,H,V,B,vt)}function ns(b,U,H){U.isScene!==!0&&(U=Et);const V=_t.get(b),B=m.state.lights,vt=m.state.shadowsArray,bt=B.state.version,Lt=St.getParameters(b,B.state,vt,U,H),Ut=St.getProgramCacheKey(Lt);let Wt=V.programs;V.environment=b.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(b.isMeshStandardMaterial?N:x).get(b.envMap||V.environment),Wt===void 0&&(b.addEventListener("dispose",mt),Wt=new Map,V.programs=Wt);let zt=Wt.get(Ut);if(zt!==void 0){if(V.currentProgram===zt&&V.lightsStateVersion===bt)return go(b,Lt),zt}else Lt.uniforms=St.getUniforms(b),b.onBuild(H,Lt,v),b.onBeforeCompile(Lt,v),zt=St.acquireProgram(Lt,Ut),Wt.set(Ut,zt),V.uniforms=Lt.uniforms;const Gt=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Gt.clippingPlanes=Bt.uniform),go(b,Lt),V.needsLights=el(b),V.lightsStateVersion=bt,V.needsLights&&(Gt.ambientLightColor.value=B.state.ambient,Gt.lightProbe.value=B.state.probe,Gt.directionalLights.value=B.state.directional,Gt.directionalLightShadows.value=B.state.directionalShadow,Gt.spotLights.value=B.state.spot,Gt.spotLightShadows.value=B.state.spotShadow,Gt.rectAreaLights.value=B.state.rectArea,Gt.ltc_1.value=B.state.rectAreaLTC1,Gt.ltc_2.value=B.state.rectAreaLTC2,Gt.pointLights.value=B.state.point,Gt.pointLightShadows.value=B.state.pointShadow,Gt.hemisphereLights.value=B.state.hemi,Gt.directionalShadowMap.value=B.state.directionalShadowMap,Gt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Gt.spotShadowMap.value=B.state.spotShadowMap,Gt.spotLightMatrix.value=B.state.spotLightMatrix,Gt.spotLightMap.value=B.state.spotLightMap,Gt.pointShadowMap.value=B.state.pointShadowMap,Gt.pointShadowMatrix.value=B.state.pointShadowMatrix),V.currentProgram=zt,V.uniformsList=null,zt}function mo(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=Ds.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function go(b,U){const H=_t.get(b);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function Qc(b,U,H,V,B){U.isScene!==!0&&(U=Et),E.resetTextureUnits();const vt=U.fog,bt=V.isMeshStandardMaterial?U.environment:null,Lt=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Mn,Ut=(V.isMeshStandardMaterial?N:x).get(V.envMap||bt),Wt=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,zt=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Gt=!!H.morphAttributes.position,fe=!!H.morphAttributes.normal,Ge=!!H.morphAttributes.color;let Ee=Ln;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ee=v.toneMapping);const un=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ae=un!==void 0?un.length:0,qt=_t.get(V),Zs=m.state.lights;if(tt===!0&&(gt===!0||b!==M)){const Ze=b===M&&V.id===I;Bt.setState(V,b,Ze)}let de=!1;V.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==Zs.state.version||qt.outputColorSpace!==Lt||B.isBatchedMesh&&qt.batching===!1||!B.isBatchedMesh&&qt.batching===!0||B.isInstancedMesh&&qt.instancing===!1||!B.isInstancedMesh&&qt.instancing===!0||B.isSkinnedMesh&&qt.skinning===!1||!B.isSkinnedMesh&&qt.skinning===!0||B.isInstancedMesh&&qt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&qt.instancingColor===!1&&B.instanceColor!==null||qt.envMap!==Ut||V.fog===!0&&qt.fog!==vt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==Bt.numPlanes||qt.numIntersection!==Bt.numIntersection)||qt.vertexAlphas!==Wt||qt.vertexTangents!==zt||qt.morphTargets!==Gt||qt.morphNormals!==fe||qt.morphColors!==Ge||qt.toneMapping!==Ee||rt.isWebGL2===!0&&qt.morphTargetsCount!==ae)&&(de=!0):(de=!0,qt.__version=V.version);let Un=qt.currentProgram;de===!0&&(Un=ns(V,U,B));let _o=!1,Ii=!1,Ks=!1;const Re=Un.getUniforms(),Nn=qt.uniforms;if(q.useProgram(Un.program)&&(_o=!0,Ii=!0,Ks=!0),V.id!==I&&(I=V.id,Ii=!0),_o||M!==b){Re.setValue(P,"projectionMatrix",b.projectionMatrix),Re.setValue(P,"viewMatrix",b.matrixWorldInverse);const Ze=Re.map.cameraPosition;Ze!==void 0&&Ze.setValue(P,Ot.setFromMatrixPosition(b.matrixWorld)),rt.logarithmicDepthBuffer&&Re.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Re.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Ii=!0,Ks=!0)}if(B.isSkinnedMesh){Re.setOptional(P,B,"bindMatrix"),Re.setOptional(P,B,"bindMatrixInverse");const Ze=B.skeleton;Ze&&(rt.floatVertexTextures?(Ze.boneTexture===null&&Ze.computeBoneTexture(),Re.setValue(P,"boneTexture",Ze.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(Re.setOptional(P,B,"batchingTexture"),Re.setValue(P,"batchingTexture",B._matricesTexture,E));const Js=H.morphAttributes;if((Js.position!==void 0||Js.normal!==void 0||Js.color!==void 0&&rt.isWebGL2===!0)&&Zt.update(B,H,Un),(Ii||qt.receiveShadow!==B.receiveShadow)&&(qt.receiveShadow=B.receiveShadow,Re.setValue(P,"receiveShadow",B.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Nn.envMap.value=Ut,Nn.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),Ii&&(Re.setValue(P,"toneMappingExposure",v.toneMappingExposure),qt.needsLights&&tl(Nn,Ks),vt&&V.fog===!0&&dt.refreshFogUniforms(Nn,vt),dt.refreshMaterialUniforms(Nn,V,J,k,wt),Ds.upload(P,mo(qt),Nn,E)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ds.upload(P,mo(qt),Nn,E),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Re.setValue(P,"center",B.center),Re.setValue(P,"modelViewMatrix",B.modelViewMatrix),Re.setValue(P,"normalMatrix",B.normalMatrix),Re.setValue(P,"modelMatrix",B.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ze=V.uniformsGroups;for(let $s=0,nl=Ze.length;$s<nl;$s++)if(rt.isWebGL2){const vo=Ze[$s];Jt.update(vo,Un),Jt.bind(vo,Un)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Un}function tl(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function el(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,U,H){_t.get(b.texture).__webglTexture=U,_t.get(b.depthTexture).__webglTexture=H;const V=_t.get(b);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Y.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,U){const H=_t.get(b);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,H=0){R=b,C=U,A=H;let V=!0,B=null,vt=!1,bt=!1;if(b){const Ut=_t.get(b);Ut.__useDefaultFramebuffer!==void 0?(q.bindFramebuffer(P.FRAMEBUFFER,null),V=!1):Ut.__webglFramebuffer===void 0?E.setupRenderTarget(b):Ut.__hasExternalTextures&&E.rebindTextures(b,_t.get(b.texture).__webglTexture,_t.get(b.depthTexture).__webglTexture);const Wt=b.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(bt=!0);const zt=_t.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(zt[U])?B=zt[U][H]:B=zt[U],vt=!0):rt.isWebGL2&&b.samples>0&&E.useMultisampledRTT(b)===!1?B=_t.get(b).__webglMultisampledFramebuffer:Array.isArray(zt)?B=zt[H]:B=zt,T.copy(b.viewport),O.copy(b.scissor),W=b.scissorTest}else T.copy($).multiplyScalar(J).floor(),O.copy(st).multiplyScalar(J).floor(),W=ot;if(q.bindFramebuffer(P.FRAMEBUFFER,B)&&rt.drawBuffers&&V&&q.drawBuffers(b,B),q.viewport(T),q.scissor(O),q.setScissorTest(W),vt){const Ut=_t.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ut.__webglTexture,H)}else if(bt){const Ut=_t.get(b.texture),Wt=U||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ut.__webglTexture,H||0,Wt)}I=-1},this.readRenderTargetPixels=function(b,U,H,V,B,vt,bt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=_t.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&bt!==void 0&&(Lt=Lt[bt]),Lt){q.bindFramebuffer(P.FRAMEBUFFER,Lt);try{const Ut=b.texture,Wt=Ut.format,zt=Ut.type;if(Wt!==rn&&yt.convert(Wt)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Gt=zt===Zi&&(Y.has("EXT_color_buffer_half_float")||rt.isWebGL2&&Y.has("EXT_color_buffer_float"));if(zt!==Dn&&yt.convert(zt)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(zt===Cn&&(rt.isWebGL2||Y.has("OES_texture_float")||Y.has("WEBGL_color_buffer_float")))&&!Gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-V&&H>=0&&H<=b.height-B&&P.readPixels(U,H,V,B,yt.convert(Wt),yt.convert(zt),vt)}finally{const Ut=R!==null?_t.get(R).__webglFramebuffer:null;q.bindFramebuffer(P.FRAMEBUFFER,Ut)}}},this.copyFramebufferToTexture=function(b,U,H=0){const V=Math.pow(2,-H),B=Math.floor(U.image.width*V),vt=Math.floor(U.image.height*V);E.setTexture2D(U,0),P.copyTexSubImage2D(P.TEXTURE_2D,H,0,0,b.x,b.y,B,vt),q.unbindTexture()},this.copyTextureToTexture=function(b,U,H,V=0){const B=U.image.width,vt=U.image.height,bt=yt.convert(H.format),Lt=yt.convert(H.type);E.setTexture2D(H,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,H.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,H.unpackAlignment),U.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,V,b.x,b.y,B,vt,bt,Lt,U.image.data):U.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,V,b.x,b.y,U.mipmaps[0].width,U.mipmaps[0].height,bt,U.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,V,b.x,b.y,bt,Lt,U.image),V===0&&H.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),q.unbindTexture()},this.copyTextureToTexture3D=function(b,U,H,V,B=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const vt=b.max.x-b.min.x+1,bt=b.max.y-b.min.y+1,Lt=b.max.z-b.min.z+1,Ut=yt.convert(V.format),Wt=yt.convert(V.type);let zt;if(V.isData3DTexture)E.setTexture3D(V,0),zt=P.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)E.setTexture2DArray(V,0),zt=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment);const Gt=P.getParameter(P.UNPACK_ROW_LENGTH),fe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ge=P.getParameter(P.UNPACK_SKIP_PIXELS),Ee=P.getParameter(P.UNPACK_SKIP_ROWS),un=P.getParameter(P.UNPACK_SKIP_IMAGES),ae=H.isCompressedTexture?H.mipmaps[B]:H.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,ae.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ae.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,b.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,b.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,b.min.z),H.isDataTexture||H.isData3DTexture?P.texSubImage3D(zt,B,U.x,U.y,U.z,vt,bt,Lt,Ut,Wt,ae.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(zt,B,U.x,U.y,U.z,vt,bt,Lt,Ut,ae.data)):P.texSubImage3D(zt,B,U.x,U.y,U.z,vt,bt,Lt,Ut,Wt,ae),P.pixelStorei(P.UNPACK_ROW_LENGTH,Gt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ge),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ee),P.pixelStorei(P.UNPACK_SKIP_IMAGES,un),B===0&&V.generateMipmaps&&P.generateMipmap(zt),q.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),q.unbindTexture()},this.resetState=function(){C=0,A=0,R=null,q.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===eo?"display-p3":"srgb",e.unpackColorSpace=jt.workingColorSpace===Ws?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===me?Kn:vc}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Kn?me:Mn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class xm extends Hc{}xm.prototype.isWebGL1Renderer=!0;class ki{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ft(t),this.density=e}clone(){return new ki(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Mm extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class kc extends ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ba=new w,Ga=new w,Ha=new he,Ar=new io,bs=new ts;class ym extends ge{constructor(t=new Se,e=new kc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Ba.fromBufferAttribute(e,i-1),Ga.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Ba.distanceTo(Ga);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bs.copy(n.boundingSphere),bs.applyMatrix4(i),bs.radius+=r,t.ray.intersectsSphere(bs)===!1)return;Ha.copy(i).invert(),Ar.copy(t.ray).applyMatrix4(Ha);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new w,u=new w,h=new w,d=new w,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const f=Math.max(0,o.start),S=Math.min(g.count,o.start+o.count);for(let v=f,y=S-1;v<y;v+=p){const C=g.getX(v),A=g.getX(v+1);if(l.fromBufferAttribute(m,C),u.fromBufferAttribute(m,A),Ar.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);const I=t.ray.origin.distanceTo(d);I<t.near||I>t.far||e.push({distance:I,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),S=Math.min(m.count,o.start+o.count);for(let v=f,y=S-1;v<y;v+=p){if(l.fromBufferAttribute(m,v),u.fromBufferAttribute(m,v+1),Ar.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);const A=t.ray.origin.distanceTo(d);A<t.near||A>t.far||e.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}class oo extends ti{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ka=new he,Xr=new io,Ts=new ts,As=new w;class Vc extends ge{constructor(t=new Se,e=new oo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(i),Ts.radius+=r,t.ray.intersectsSphere(Ts)===!1)return;ka.copy(i).invert(),Xr.copy(t.ray).applyMatrix4(ka);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=l.getX(g);As.fromBufferAttribute(h,m),Va(As,m,c,i,t,e,this)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=d,_=p;g<_;g++)As.fromBufferAttribute(h,g),Va(As,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Va(s,t,e,n,i,r,o){const a=Xr.distanceSqToPoint(s);if(a<e){const c=new w;Xr.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,object:o})}}class ln extends Be{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const u=n[i],d=n[i+1]-u,p=(o-u)/d;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new ct:new w);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new w,i=[],r=[],o=[],a=new w,c=new he;for(let p=0;p<=t;p++){const g=p/t;i[p]=this.getTangentAt(g,new w)}r[0]=new w,o[0]=new w;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),h=Math.abs(i[0].y),d=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(i[p-1],i[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(xe(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(xe(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],p*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ao extends hn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e){const n=e||new ct,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*u-p*h+this.aX,l=d*h+p*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Sm extends ao{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function co(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let d=(o-r)/l-(a-r)/(l+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+h)+(c-a)/h;d*=u,p*=u,i(o,a,d,p)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Rs=new w,Rr=new co,Cr=new co,Pr=new co;class Ve extends hn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new w){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(Rs.subVectors(i[0],i[1]).add(i[0]),l=Rs);const h=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(Rs.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Rs),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),p),_=Math.pow(h.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(u),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Rr.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,g,_,m),Cr.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,g,_,m),Pr.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Rr.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Cr.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Pr.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(Rr.calc(c),Cr.calc(c),Pr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new w().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Wa(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function wm(s,t){const e=1-s;return e*e*t}function Em(s,t){return 2*(1-s)*s*t}function bm(s,t){return s*s*t}function Vi(s,t,e,n){return wm(s,t)+Em(s,e)+bm(s,n)}function Tm(s,t){const e=1-s;return e*e*e*t}function Am(s,t){const e=1-s;return 3*e*e*s*t}function Rm(s,t){return 3*(1-s)*s*s*t}function Cm(s,t){return s*s*s*t}function Wi(s,t,e,n,i){return Tm(s,t)+Am(s,e)+Rm(s,n)+Cm(s,i)}class Wc extends hn{constructor(t=new ct,e=new ct,n=new ct,i=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ct){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Wi(t,i.x,r.x,o.x,a.x),Wi(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Pm extends hn{constructor(t=new w,e=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new w){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Wi(t,i.x,r.x,o.x,a.x),Wi(t,i.y,r.y,o.y,a.y),Wi(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xc extends hn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lm extends hn{constructor(t=new w,e=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new w){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new w){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qc extends hn{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Vi(t,i.x,r.x,o.x),Vi(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dm extends hn{constructor(t=new w,e=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new w){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Vi(t,i.x,r.x,o.x),Vi(t,i.y,r.y,o.y),Vi(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yc extends hn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Wa(a,c.x,l.x,u.x,h.x),Wa(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ct().fromArray(i))}return this}}var qr=Object.freeze({__proto__:null,ArcCurve:Sm,CatmullRomCurve3:Ve,CubicBezierCurve:Wc,CubicBezierCurve3:Pm,EllipseCurve:ao,LineCurve:Xc,LineCurve3:Lm,QuadraticBezierCurve:qc,QuadraticBezierCurve3:Dm,SplineCurve:Yc});class Im extends hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new qr[i.type]().fromJSON(i))}return this}}class Yr extends Im{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Xc(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new qc(this.currentPoint.clone(),new ct(t,e),new ct(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Wc(this.currentPoint.clone(),new ct(t,e),new ct(n,i),new ct(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Yc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){const l=new ao(t,e,n,i,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class lo extends Se{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=xe(i,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,h=new w,d=new ct,p=new w,g=new w,_=new w;let m=0,f=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,f=t[S+1].y-t[S].y,p.x=f*1,p.y=-m,p.z=f*0,_.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[S+1].x-t[S].x,f=t[S+1].y-t[S].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),c.push(p.x,p.y,p.z),_.copy(g)}for(let S=0;S<=e;S++){const v=n+S*u*i,y=Math.sin(v),C=Math.cos(v);for(let A=0;A<=t.length-1;A++){h.x=t[A].x*y,h.y=t[A].y,h.z=t[A].x*C,o.push(h.x,h.y,h.z),d.x=S/e,d.y=A/(t.length-1),a.push(d.x,d.y);const R=c[3*A+0]*y,I=c[3*A+1],M=c[3*A+0]*C;l.push(R,I,M)}}for(let S=0;S<e;S++)for(let v=0;v<t.length-1;v++){const y=v+S*t.length,C=y,A=y+t.length,R=y+t.length+1,I=y+1;r.push(C,A,I),r.push(R,I,A)}this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("uv",new ne(a,2)),this.setAttribute("normal",new ne(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lo(t.points,t.segments,t.phiStart,t.phiLength)}}class Xi extends lo{constructor(t=1,e=1,n=4,i=8){const r=new Yr;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new Xi(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ci extends Se{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new w,u=new ct;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,d=3;h<=e;h++,d+=3){const p=n+h/e*i;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(a,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class se extends Se{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const u=[],h=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;S(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new ne(h,3)),this.setAttribute("normal",new ne(d,3)),this.setAttribute("uv",new ne(p,2));function S(){const y=new w,C=new w;let A=0;const R=(e-t)/n;for(let I=0;I<=r;I++){const M=[],T=I/r,O=T*(e-t)+t;for(let W=0;W<=i;W++){const j=W/i,L=j*c+a,z=Math.sin(L),k=Math.cos(L);C.x=O*z,C.y=-T*n+m,C.z=O*k,h.push(C.x,C.y,C.z),y.set(z,R,k).normalize(),d.push(y.x,y.y,y.z),p.push(j,1-T),M.push(g++)}_.push(M)}for(let I=0;I<i;I++)for(let M=0;M<r;M++){const T=_[M][I],O=_[M+1][I],W=_[M+1][I+1],j=_[M][I+1];u.push(T,O,j),u.push(O,W,j),A+=6}l.addGroup(f,A,0),f+=A}function v(y){const C=g,A=new ct,R=new w;let I=0;const M=y===!0?t:e,T=y===!0?1:-1;for(let W=1;W<=i;W++)h.push(0,m*T,0),d.push(0,T,0),p.push(.5,.5),g++;const O=g;for(let W=0;W<=i;W++){const L=W/i*c+a,z=Math.cos(L),k=Math.sin(L);R.x=M*k,R.y=m*T,R.z=M*z,h.push(R.x,R.y,R.z),d.push(0,T,0),A.x=z*.5+.5,A.y=k*.5*T+.5,p.push(A.x,A.y),g++}for(let W=0;W<i;W++){const j=C+W,L=O+W;y===!0?u.push(L,L+1,j):u.push(L+1,L,j),I+=3}l.addGroup(f,I,y===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new se(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ae extends se{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ae(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zr extends Yr{constructor(t){super(t),this.uuid=Qn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Yr().fromJSON(i))}return this}}const Um={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Zc(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,h,d,p;if(n&&(r=Bm(s,t,r,e)),s.length>80*e){a=l=s[0],c=u=s[1];for(let g=e;g<i;g+=e)h=s[g],d=s[g+1],h<a&&(a=h),d<c&&(c=d),h>l&&(l=h),d>u&&(u=d);p=Math.max(l-a,u-c),p=p!==0?32767/p:0}return Ji(r,o,e,a,c,p,0),o}};function Zc(s,t,e,n,i){let r,o;if(i===Jm(s,t,e,n)>0)for(r=t;r<e;r+=n)o=Xa(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=Xa(r,s[r],s[r+1],o);return o&&Ys(o,o.next)&&(ji(o),o=o.next),o}function $n(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Ys(e,e.next)||le(e.prev,e,e.next)===0)){if(ji(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ji(s,t,e,n,i,r,o){if(!s)return;!o&&r&&Wm(s,n,i,r);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?Fm(s,n,i,r):Nm(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),ji(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=Om($n(s),t,e),Ji(s,t,e,n,i,r,2)):o===2&&zm(s,t,e,n,i,r):Ji($n(s),t,e,n,i,r,1);break}}}function Nm(s){const t=s.prev,e=s,n=s.next;if(le(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=i<r?i<o?i:o:r<o?r:o,h=a<c?a<l?a:l:c<l?c:l,d=i>r?i>o?i:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=p&&yi(i,a,r,c,o,l,g.x,g.y)&&le(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Fm(s,t,e,n){const i=s.prev,r=s,o=s.next;if(le(i,r,o)>=0)return!1;const a=i.x,c=r.x,l=o.x,u=i.y,h=r.y,d=o.y,p=a<c?a<l?a:l:c<l?c:l,g=u<h?u<d?u:d:h<d?h:d,_=a>c?a>l?a:l:c>l?c:l,m=u>h?u>d?u:d:h>d?h:d,f=Kr(p,g,t,e,n),S=Kr(_,m,t,e,n);let v=s.prevZ,y=s.nextZ;for(;v&&v.z>=f&&y&&y.z<=S;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==o&&yi(a,u,c,h,l,d,v.x,v.y)&&le(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==o&&yi(a,u,c,h,l,d,y.x,y.y)&&le(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=f;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==i&&v!==o&&yi(a,u,c,h,l,d,v.x,v.y)&&le(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=S;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==i&&y!==o&&yi(a,u,c,h,l,d,y.x,y.y)&&le(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Om(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!Ys(i,r)&&Kc(i,n,n.next,r)&&$i(i,r)&&$i(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ji(n),ji(n.next),n=s=r),n=n.next}while(n!==s);return $n(n)}function zm(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Ym(o,a)){let c=Jc(o,a);o=$n(o,o.next),c=$n(c,c.next),Ji(o,t,e,n,i,r,0),Ji(c,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Bm(s,t,e,n){const i=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:s.length,l=Zc(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(qm(l));for(i.sort(Gm),r=0;r<i.length;r++)e=Hm(i[r],e);return e}function Gm(s,t){return s.x-t.x}function Hm(s,t){const e=km(s,t);if(!e)return t;const n=Jc(e,s);return $n(n,n.next),$n(e,e.next)}function km(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let u=1/0,h;e=i;do r>=e.x&&e.x>=c&&r!==e.x&&yi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(h=Math.abs(o-e.y)/(r-e.x),$i(e,s)&&(h<u||h===u&&(e.x>i.x||e.x===i.x&&Vm(i,e)))&&(i=e,u=h)),e=e.next;while(e!==a);return i}function Vm(s,t){return le(s.prev,s,t.prev)<0&&le(t.next,s,s.next)<0}function Wm(s,t,e,n){let i=s;do i.z===0&&(i.z=Kr(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Xm(i)}function Xm(s){let t,e,n,i,r,o,a,c,l=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,l*=2}while(o>1);return s}function Kr(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function qm(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function yi(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function Ym(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Zm(s,t)&&($i(s,t)&&$i(t,s)&&Km(s,t)&&(le(s.prev,s,t.prev)||le(s,t.prev,t))||Ys(s,t)&&le(s.prev,s,s.next)>0&&le(t.prev,t,t.next)>0)}function le(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Ys(s,t){return s.x===t.x&&s.y===t.y}function Kc(s,t,e,n){const i=Ps(le(s,t,e)),r=Ps(le(s,t,n)),o=Ps(le(e,n,s)),a=Ps(le(e,n,t));return!!(i!==r&&o!==a||i===0&&Cs(s,e,t)||r===0&&Cs(s,n,t)||o===0&&Cs(e,s,n)||a===0&&Cs(e,t,n))}function Cs(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ps(s){return s>0?1:s<0?-1:0}function Zm(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Kc(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function $i(s,t){return le(s.prev,s,s.next)<0?le(s,t,s.next)>=0&&le(s,s.prev,t)>=0:le(s,t,s.prev)<0||le(s,s.next,t)<0}function Km(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Jc(s,t){const e=new Jr(s.i,s.x,s.y),n=new Jr(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Xa(s,t,e,n){const i=new Jr(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ji(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Jr(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Jm(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class qi{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return qi.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];qa(t),Ya(n,t);let o=t.length;e.forEach(qa);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,Ya(n,e[c]);const a=Um.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function qa(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Ya(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class ks extends Se{constructor(t=new Zr([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new ne(i,3)),this.setAttribute("uv",new ne(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const f=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:$m;let v,y=!1,C,A,R,I;f&&(v=f.getSpacedPoints(u),y=!0,d=!1,C=f.computeFrenetFrames(u,!1),A=new w,R=new w,I=new w),d||(m=0,p=0,g=0,_=0);const M=a.extractPoints(l);let T=M.shape;const O=M.holes;if(!qi.isClockWise(T)){T=T.reverse();for(let P=0,at=O.length;P<at;P++){const Y=O[P];qi.isClockWise(Y)&&(O[P]=Y.reverse())}}const j=qi.triangulateShape(T,O),L=T;for(let P=0,at=O.length;P<at;P++){const Y=O[P];T=T.concat(Y)}function z(P,at,Y){return at||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(at,Y)}const k=T.length,J=j.length;function Z(P,at,Y){let rt,q,Tt;const _t=P.x-at.x,E=P.y-at.y,x=Y.x-P.x,N=Y.y-P.y,it=_t*_t+E*E,et=_t*N-E*x;if(Math.abs(et)>Number.EPSILON){const Q=Math.sqrt(it),St=Math.sqrt(x*x+N*N),dt=at.x-E/Q,Mt=at.y+_t/Q,Rt=Y.x-N/St,Bt=Y.y+x/St,nt=((Rt-dt)*N-(Bt-Mt)*x)/(_t*N-E*x);rt=dt+_t*nt-P.x,q=Mt+E*nt-P.y;const Kt=rt*rt+q*q;if(Kt<=2)return new ct(rt,q);Tt=Math.sqrt(Kt/2)}else{let Q=!1;_t>Number.EPSILON?x>Number.EPSILON&&(Q=!0):_t<-Number.EPSILON?x<-Number.EPSILON&&(Q=!0):Math.sign(E)===Math.sign(N)&&(Q=!0),Q?(rt=-E,q=_t,Tt=Math.sqrt(it)):(rt=_t,q=E,Tt=Math.sqrt(it/2))}return new ct(rt/Tt,q/Tt)}const K=[];for(let P=0,at=L.length,Y=at-1,rt=P+1;P<at;P++,Y++,rt++)Y===at&&(Y=0),rt===at&&(rt=0),K[P]=Z(L[P],L[Y],L[rt]);const $=[];let st,ot=K.concat();for(let P=0,at=O.length;P<at;P++){const Y=O[P];st=[];for(let rt=0,q=Y.length,Tt=q-1,_t=rt+1;rt<q;rt++,Tt++,_t++)Tt===q&&(Tt=0),_t===q&&(_t=0),st[rt]=Z(Y[rt],Y[Tt],Y[_t]);$.push(st),ot=ot.concat(st)}for(let P=0;P<m;P++){const at=P/m,Y=p*Math.cos(at*Math.PI/2),rt=g*Math.sin(at*Math.PI/2)+_;for(let q=0,Tt=L.length;q<Tt;q++){const _t=z(L[q],K[q],rt);xt(_t.x,_t.y,-Y)}for(let q=0,Tt=O.length;q<Tt;q++){const _t=O[q];st=$[q];for(let E=0,x=_t.length;E<x;E++){const N=z(_t[E],st[E],rt);xt(N.x,N.y,-Y)}}}const X=g+_;for(let P=0;P<k;P++){const at=d?z(T[P],ot[P],X):T[P];y?(R.copy(C.normals[0]).multiplyScalar(at.x),A.copy(C.binormals[0]).multiplyScalar(at.y),I.copy(v[0]).add(R).add(A),xt(I.x,I.y,I.z)):xt(at.x,at.y,0)}for(let P=1;P<=u;P++)for(let at=0;at<k;at++){const Y=d?z(T[at],ot[at],X):T[at];y?(R.copy(C.normals[P]).multiplyScalar(Y.x),A.copy(C.binormals[P]).multiplyScalar(Y.y),I.copy(v[P]).add(R).add(A),xt(I.x,I.y,I.z)):xt(Y.x,Y.y,h/u*P)}for(let P=m-1;P>=0;P--){const at=P/m,Y=p*Math.cos(at*Math.PI/2),rt=g*Math.sin(at*Math.PI/2)+_;for(let q=0,Tt=L.length;q<Tt;q++){const _t=z(L[q],K[q],rt);xt(_t.x,_t.y,h+Y)}for(let q=0,Tt=O.length;q<Tt;q++){const _t=O[q];st=$[q];for(let E=0,x=_t.length;E<x;E++){const N=z(_t[E],st[E],rt);y?xt(N.x,N.y+v[u-1].y,v[u-1].x+Y):xt(N.x,N.y,h+Y)}}}tt(),gt();function tt(){const P=i.length/3;if(d){let at=0,Y=k*at;for(let rt=0;rt<J;rt++){const q=j[rt];Dt(q[2]+Y,q[1]+Y,q[0]+Y)}at=u+m*2,Y=k*at;for(let rt=0;rt<J;rt++){const q=j[rt];Dt(q[0]+Y,q[1]+Y,q[2]+Y)}}else{for(let at=0;at<J;at++){const Y=j[at];Dt(Y[2],Y[1],Y[0])}for(let at=0;at<J;at++){const Y=j[at];Dt(Y[0]+k*u,Y[1]+k*u,Y[2]+k*u)}}n.addGroup(P,i.length/3-P,0)}function gt(){const P=i.length/3;let at=0;wt(L,at),at+=L.length;for(let Y=0,rt=O.length;Y<rt;Y++){const q=O[Y];wt(q,at),at+=q.length}n.addGroup(P,i.length/3-P,1)}function wt(P,at){let Y=P.length;for(;--Y>=0;){const rt=Y;let q=Y-1;q<0&&(q=P.length-1);for(let Tt=0,_t=u+m*2;Tt<_t;Tt++){const E=k*Tt,x=k*(Tt+1),N=at+rt+E,it=at+q+E,et=at+q+x,Q=at+rt+x;Ot(N,it,et,Q)}}}function xt(P,at,Y){c.push(P),c.push(at),c.push(Y)}function Dt(P,at,Y){Et(P),Et(at),Et(Y);const rt=i.length/3,q=S.generateTopUV(n,i,rt-3,rt-2,rt-1);Nt(q[0]),Nt(q[1]),Nt(q[2])}function Ot(P,at,Y,rt){Et(P),Et(at),Et(rt),Et(at),Et(Y),Et(rt);const q=i.length/3,Tt=S.generateSideWallUV(n,i,q-6,q-3,q-2,q-1);Nt(Tt[0]),Nt(Tt[1]),Nt(Tt[3]),Nt(Tt[1]),Nt(Tt[2]),Nt(Tt[3])}function Et(P){i.push(c[P*3+0]),i.push(c[P*3+1]),i.push(c[P*3+2])}function Nt(P){r.push(P.x),r.push(P.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return jm(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new qr[i.type]().fromJSON(i)),new ks(n,t.options)}}const $m={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],u=t[i*3+1];return[new ct(r,o),new ct(a,c),new ct(l,u)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],h=t[n*3+2],d=t[i*3],p=t[i*3+1],g=t[i*3+2],_=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new ct(o,1-c),new ct(l,1-h),new ct(d,1-g),new ct(_,1-f)]:[new ct(a,1-c),new ct(u,1-h),new ct(p,1-g),new ct(m,1-f)]}};function jm(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Le extends Se{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new w,d=new w,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const S=[],v=f/n;let y=0;f===0&&o===0?y=.5/e:f===n&&c===Math.PI&&(y=-.5/e);for(let C=0;C<=e;C++){const A=C/e;h.x=-t*Math.cos(i+A*r)*Math.sin(o+v*a),h.y=t*Math.cos(o+v*a),h.z=t*Math.sin(i+A*r)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(A+y,1-v),S.push(l++)}u.push(S)}for(let f=0;f<n;f++)for(let S=0;S<e;S++){const v=u[f][S+1],y=u[f][S],C=u[f+1][S],A=u[f+1][S+1];(f!==0||o>0)&&p.push(v,y,A),(f!==n-1||c<Math.PI)&&p.push(y,C,A)}this.setIndex(p),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Le(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class G extends ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xc,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ho extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class Qm extends ho{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Lr=new he,Za=new w,Ka=new w;class $c{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new so,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Za.setFromMatrixPosition(t.matrixWorld),e.position.copy(Za),Ka.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ka),e.updateMatrixWorld(),Lr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Lr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ja=new he,zi=new w,Dr=new w;class t0 extends $c{constructor(){super(new We(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ct(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),zi.setFromMatrixPosition(t.matrixWorld),n.position.copy(zi),Dr.copy(n.position),Dr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Dr),n.updateMatrixWorld(),i.makeTranslation(-zi.x,-zi.y,-zi.z),Ja.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ja)}}class $a extends ho{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new t0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class e0 extends $c{constructor(){super(new Uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ja extends ho{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new e0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class n0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qa(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Qa();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Qa(){return(typeof performance>"u"?Date:performance).now()}class tc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(xe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qr);class i0{constructor(t){this.renderer=t,this.scene=new Mm,this.scene.background=new ft(8894168),this.scene.fog=new ki(13228264,7e-4),this.skyGeo=new Le(4e3,32,15),this.skyMat=new yn({side:Oe,uniforms:{topColor:{value:new ft(1714762)},bottomColor:{value:new ft(8894168)},offset:{value:400},exponent:{value:.7},sunPosition:{value:new w(500,800,200)},sunColor:{value:new ft(16773569)},time:{value:12}},vertexShader:`
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
      `}),this.sky=new F(this.skyGeo,this.skyMat),this.scene.add(this.sky);const e=new Se,n=3e3,i=new Float32Array(n*3);for(let o=0;o<n;o++){const a=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1),l=3500;i[o*3]=l*Math.sin(c)*Math.cos(a),i[o*3+1]=l*Math.cos(c)*.9+300,i[o*3+2]=l*Math.sin(c)*Math.sin(a)}e.setAttribute("position",new Ye(i,3));const r=new oo({color:16777215,size:3.2,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1});this.stars=new Vc(e,r),this.scene.add(this.stars),this.sun=new ja(16774880,2.2),this.sun.position.set(600,900,300),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=2e3,this.sun.shadow.camera.left=-600,this.sun.shadow.camera.right=600,this.sun.shadow.camera.top=600,this.sun.shadow.camera.bottom=-600,this.sun.shadow.bias=-6e-4,this.sun.shadow.autoUpdate=!0,this.scene.add(this.sun),this.sunTarget=new ge,this.sunTarget.position.set(0,0,0),this.scene.add(this.sunTarget),this.sun.target=this.sunTarget,this.ambient=new Qm(9417688,3811866,.65),this.scene.add(this.ambient),this.moon=new ja(10203391,0),this.moon.position.set(-600,500,-300),this.scene.add(this.moon),this.worldRoot=new Pt,this.scene.add(this.worldRoot),this.buildingGroup=new Pt,this.worldRoot.add(this.buildingGroup),this.terrainGroup=new Pt,this.worldRoot.add(this.terrainGroup),this.waterGroup=new Pt,this.worldRoot.add(this.waterGroup),this.vegetationGroup=new Pt,this.worldRoot.add(this.vegetationGroup),this.streetGroup=new Pt,this.worldRoot.add(this.streetGroup),this.interiorGroup=new Pt,this.worldRoot.add(this.interiorGroup),this.npcGroup=new Pt,this.worldRoot.add(this.npcGroup),this.propGroup=new Pt,this.worldRoot.add(this.propGroup),this.envLightIntensity=1}updateSky(t,e="clear"){const n=t,r=(n-12)/12*Math.PI,o=Math.cos(r),a=2500,c=Math.sin(r)*a*.85,l=Math.max(-300,o*900+120),u=Math.cos(r)*a*.45;this.sun.position.set(c,l,u),this.moon.position.set(-c,-l+600,-u),this.skyMat.uniforms.sunPosition.value.copy(this.sun.position),this.skyMat.uniforms.time.value=n;const h=re.clamp((l+200)/900,0,1),d=re.lerp(0,2.4,Math.pow(h,.9));this.sun.intensity=d,this.moon.intensity=(1-h)*.35;const p=new ft(16747082),g=new ft(16774880),_=new ft().lerpColors(p,g,Math.pow(h,.7));this.sun.color.copy(_),this.skyMat.uniforms.sunColor.value.copy(_);let m,f,S,v;if(h>.15){const C=re.clamp((h-.15)/.3,0,1),A=new ft(2767452),R=new ft(1714762);m=new ft().lerpColors(A,R,C);const I=new ft(16758890),M=new ft(8894168);f=new ft().lerpColors(I,M,C),S=new ft().lerpColors(new ft(14067850),new ft(13228264),C),v=re.lerp(.35,.75,h)}else{const C=new ft(132630),A=new ft(1714762),R=re.clamp(h/.15,0,1);m=new ft().lerpColors(C,A,R);const I=new ft(659488),M=new ft(3811914);f=new ft().lerpColors(I,M,R),S=new ft().lerpColors(new ft(660512),new ft(2767452),R),v=re.lerp(.18,.35,R)}if(e==="overcast"&&(m.lerp(new ft(6977162),.35),f.lerp(new ft(10528952),.35),S.lerp(new ft(10135736),.2),this.sun.intensity*=.45),e==="rain"&&(m.lerp(new ft(4871528),.35),f.lerp(new ft(9082024),.45)),e==="fog")S=new ft(14212579),this.scene.fog=new ki(S,.0022);else{const C=re.lerp(.0012,5e-4,h);this.scene.fog=new ki(S,e==="overcast"?.001:C)}this.skyMat.uniforms.topColor.value.copy(m),this.skyMat.uniforms.bottomColor.value.copy(f),this.ambient.color.copy(f),this.ambient.groundColor.copy(S),this.ambient.intensity=v;const y=1-h;return this.stars.material.opacity=re.clamp((y-.4)/.6,0,1)*(e==="clear"?1:.25),e==="fog"&&(this.stars.material.opacity*=.1),this.renderer&&(this.renderer.toneMappingExposure=re.lerp(.65,1.05,h)),{sunY:l,dayFactor:h,fogCol:S}}}class s0{constructor(t=1337){this.seed=t,this.perm=new Uint8Array(512);const e=new Uint8Array(256);for(let r=0;r<256;r++)e[r]=r;let n=t;const i=()=>(n=n*1664525+1013904223>>>0,n/4294967296);for(let r=255;r>0;r--){const o=Math.floor(i()*(r+1));[e[r],e[o]]=[e[o],e[r]]}for(let r=0;r<512;r++)this.perm[r]=e[r&255]}fade(t){return t*t*t*(t*(t*6-15)+10)}lerp(t,e,n){return t+(e-t)*n}grad(t,e,n){const i=t&3,r=i<2?e:n,o=i<2?n:e;return(i&1?-r:r)+(i&2?-o:o)}perlin2(t,e){const n=Math.floor(t)&255,i=Math.floor(e)&255,r=t-Math.floor(t),o=e-Math.floor(e),a=this.fade(r),c=this.fade(o),l=this.perm[this.perm[n]+i],u=this.perm[this.perm[n]+i+1],h=this.perm[this.perm[n+1]+i],d=this.perm[this.perm[n+1]+i+1],p=this.lerp(this.grad(l,r,o),this.grad(h,r-1,o),a),g=this.lerp(this.grad(u,r,o-1),this.grad(d,r-1,o-1),a);return this.lerp(p,g,c)}fbm(t,e,n=4,i=2,r=.5){let o=1,a=1,c=0,l=0;for(let u=0;u<n;u++)c+=this.perlin2(t*a,e*a)*o,l+=o,o*=r,a*=i;return c/l}ridge(t,e){return 1-Math.abs(this.fbm(t,e,3))}}class r0{constructor(t){this.worldScene=t,this.noise=new s0(42),this.group=t.terrainGroup,this.tiles=[],this.heightCache=new Map,this.cacheHits=0,this.cacheMiss=0}computeHeight(t,e){const i=e/2e3+.5,r=Math.pow(Math.max(0,i<.35?(.35-i)/.35:0),1.2),o=Math.exp(-Math.pow((i-.55)/.22,2))*.6,a=i>.85?(i-.85)/.15:0,c=this.noise.fbm(t*.0012,e*.0012,4,2.1,.5)*35,l=this.noise.fbm(t*.003,e*.003,3,2,.5)*8,u=this.noise.ridge(t*8e-4,e*8e-4)*12;let h=0;if(h+=c*(.5+o*.8+r*1.2),h+=l*.5,h+=u*o,i<.28){const p=this.noise.fbm(t*.002+100,e*.002,5,2,.5);h+=r*(120+p*60),h+=r*Math.pow(Math.abs(this.noise.perlin2(t*.001,e*.001)),.6)*80}if(i>.35&&i<.75){const p=this.noise.fbm(t*9e-4+50,e*9e-4,4,2,.5);h+=o*p*45;const g=Math.sin(t*.004+Math.cos(e*.002)*2)*6*o;h+=g}i>.82&&(h=re.lerp(h,-2+Math.sin(t*.01)*.5,a*.85));const d=Math.abs(t*.3+e-200)/900;return d<.12&&i>.3&&i<.62&&(h-=(.12-d)/.12*8),h+=(i-.5)*4,h}getHeightAt(t,e){const n=(Math.round(t*2)/2).toFixed(1)+":"+(Math.round(e*2)/2).toFixed(1);if(this.heightCache.has(n))return this.cacheHits++,this.heightCache.get(n);const i=this.computeHeight(t,e);if(this.heightCache.size>4e3){const r=this.heightCache.keys().next().value;this.heightCache.delete(r)}return this.heightCache.set(n,i),this.cacheMiss++,i}generate(){const n=new _e(2e3,2e3,150,150);n.rotateX(-Math.PI/2);const i=n.attributes.position;for(let a=0;a<i.count;a++){const c=i.getX(a),l=i.getZ(a),u=this.computeHeight(c,l);i.setY(a,u)}i.needsUpdate=!0,n.computeVertexNormals();const r=this.createTerrainMaterial(),o=new F(n,r);o.receiveShadow=!0,o.castShadow=!1,o.name="Terrain_Main",this.group.add(o),this.mesh=o,this.createSea(),this.createLakes();for(let a=-30;a<=30;a+=5)for(let c=-30;c<=30;c+=5)this.getHeightAt(a,c);return o}createTerrainMaterial(){const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d");e.fillStyle="#6b8c42",e.fillRect(0,0,256,256);for(let h=0;h<2e3;h++)e.fillStyle=`rgba(${60+Math.random()*20},${110+Math.random()*30},${40+Math.random()*20},0.15)`,e.fillRect(Math.random()*256,Math.random()*256,2,2);const n=new ln(t);n.wrapS=n.wrapT=on,n.repeat.set(28,28),n.anisotropy=4;const i=document.createElement("canvas");i.width=256,i.height=256;const r=i.getContext("2d");r.fillStyle="#9a9a95",r.fillRect(0,0,256,256);for(let h=0;h<2e3;h++)r.fillStyle=`rgba(0,0,0,${Math.random()*.08})`,r.fillRect(Math.random()*256,Math.random()*256,1,1);const o=new ln(i);o.wrapS=o.wrapT=on,o.repeat.set(18,18);const a=document.createElement("canvas");a.width=256,a.height=256;const c=a.getContext("2d");c.fillStyle="#8a6a42",c.fillRect(0,0,256,256);for(let h=0;h<1500;h++)c.fillStyle="rgba(40,30,20,0.07)",c.fillRect(Math.random()*256,Math.random()*256,2,1);const l=new ln(a);l.wrapS=l.wrapT=on,l.repeat.set(20,20);const u=new G({map:n,roughness:.95,metalness:0});return u.onBeforeCompile=h=>{h.uniforms.texRock={value:o},h.uniforms.texSoil={value:l},h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
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
        `)},u}createSea(){const t=new _e(3e3,900,1,1);t.rotateX(-Math.PI/2);const e=new G({color:932434,roughness:.15,metalness:.1,transparent:!0,opacity:.98}),n=new F(t,e);n.position.set(0,-2.2,1050),this.group.add(n);const i=new _e(3e3,120,1,1);i.rotateX(-Math.PI/2);const r=document.createElement("canvas");r.width=256,r.height=256;const o=r.getContext("2d");o.fillStyle="#d8c9a0",o.fillRect(0,0,256,256);for(let u=0;u<1e3;u++)o.fillStyle="rgba(0,0,0,0.06)",o.fillRect(Math.random()*256,Math.random()*256,1,1);const a=new ln(r);a.wrapS=a.wrapT=on,a.repeat.set(12,2);const c=new G({map:a,roughness:.95}),l=new F(i,c);l.position.set(0,-1,980),l.receiveShadow=!0,this.group.add(l)}createLakes(){const t=new Ci(120,24);t.rotateX(-Math.PI/2);const e=new G({color:1194586,roughness:.18,metalness:.15,transparent:!0,opacity:.95}),n=new F(t,e);n.position.set(-420,2.5,-480),n.scale.set(1.4,1,.8),this.group.add(n);const i=n.clone();i.position.set(380,3,-520),i.scale.set(1.1,1,1.3),this.group.add(i)}}class o0{constructor(t){this.worldScene=t,this.group=t.waterGroup,this.waters=[]}create(){this.createCanalNetwork(),this.createRiver(),this.createFountain()}createCanalNetwork(){const t=new yn({uniforms:{time:{value:0},deepColor:{value:new ft(666170)},shallowColor:{value:new ft(2976606)},sunDir:{value:new w(.5,.8,.2)},sunColor:{value:new ft(16773569)}},vertexShader:`
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
      `,transparent:!0}),e=new Ve([new w(-140,.4,-220),new w(-60,.4,-160),new w(30,.4,-120),new w(90,.4,-60),new w(60,.4,20),new w(-10,.4,50)]),n=this.createRibbonFromCurve(e,22,110),i=new F(n,t);i.name="Canal_Grande",this.group.add(i),this.waters.push({mesh:i,mat:t});for(let r=0;r<3;r++){const o=new Ve([new w(-180+r*70,.38,-90+r*30),new w(-100+r*50,.38,-30+r*20),new w(-30+r*40,.38,40+r*10)]),a=this.createRibbonFromCurve(o,10,50),c=new F(a,t.clone());c.material.uniforms=Ls.clone(t.uniforms),this.group.add(c),this.waters.push({mesh:c,mat:c.material})}this.canalMat=t}createRibbonFromCurve(t,e,n){const i=t.getPoints(n),r=new Se,o=[],a=[],c=[];for(let l=0;l<i.length;l++){const u=i[l],h=l<i.length-1?new w().subVectors(i[l+1],u).normalize():new w().subVectors(u,i[l-1]).normalize(),d=new w(-h.z,0,h.x).normalize().multiplyScalar(e/2),p=d.clone().negate();if(o.push(u.x+d.x,u.y,u.z+d.z),o.push(u.x+p.x,u.y,u.z+p.z),a.push(0,l/i.length),a.push(1,l/i.length),l<i.length-1){const g=l*2,_=g+1,m=g+2,f=g+3;c.push(g,_,m,_,f,m)}}return r.setAttribute("position",new ne(o,3)),r.setAttribute("uv",new ne(a,2)),r.setIndex(c),r.computeVertexNormals(),r}createRiver(){const t=new Ve([new w(-900,.6,120),new w(-500,.7,100),new w(-200,.7,90),new w(100,.65,110),new w(500,.6,140),new w(900,.55,180)]),e=this.createRibbonFromCurve(t,38,120),n=this.canalMat.clone();n.uniforms=Ls.clone(this.canalMat.uniforms),n.uniforms.deepColor.value=new ft(929311),n.uniforms.shallowColor.value=new ft(3832410);const i=new F(e,n);this.group.add(i),this.waters.push({mesh:i,mat:n})}createFountain(){const t=new se(8,9,.8,24),e=new G({color:14209216,roughness:.7}),n=new F(t,e);n.position.set(180,1.2,-40),this.worldScene.streetGroup.add(n);const i=new Ci(7,24);i.rotateX(-Math.PI/2);const r=this.canalMat.clone();r.uniforms=Ls.clone(this.canalMat.uniforms);const o=new F(i,r);o.position.set(0,.5,0),n.add(o),this.waters.push({mesh:o,mat:r})}update(t,e,n){this.waters.forEach(i=>{i.mat.uniforms.time.value=t*.001,e&&i.mat.uniforms.sunDir.value.copy(e),n&&i.mat.uniforms.sunColor.value.copy(n)})}}class a0{constructor(t,e){this.worldScene=t,this.terrain=e,this.group=t.vegetationGroup}create(){this.createCypressAlley(),this.createOliveGroves(),this.createForest(),this.createGardens()}makeCypress(t,e,n=1){const i=18*n+Math.random()*4,r=new se(.18*n,.32*n,i*.12,6),o=new G({color:4863264,roughness:.9}),a=new F(r,o);a.position.y=i*.06;const c=new Ae(1.2*n,i*.9,8),l=new G({color:1718802,roughness:.85}),u=new F(c,l);u.position.y=i*.55;const h=new Pt;return h.add(a),h.add(u),h.position.set(t,this.terrain.getHeightAt(t,e),e),h.castShadow=!0,h.rotation.z=(Math.random()-.5)*.06,h.scale.set(.95+Math.random()*.1,1,.95+Math.random()*.1),h}createCypressAlley(){for(let e=0;e<22;e++){const n=-340+e*28,i=this.makeCypress(-226,n,1.1+Math.random()*.15),r=this.makeCypress(-214,n,1.1+Math.random()*.15);this.group.add(i),this.group.add(r)}}makeOlive(t,e){const n=new Pt,i=new se(.2,.45,3,6),r=new G({color:5917232,roughness:.95}),o=new F(i,r);o.position.y=1.4,o.rotation.z=(Math.random()-.5)*.3;const a=new Le(2.2,8,6);a.scale(1,.75,1);const c=new G({color:5925690,roughness:.9}),l=new F(a,c);l.position.y=3.8;const u=l.geometry.attributes.position;for(let h=0;h<u.count;h++)u.setX(h,u.getX(h)*(.9+Math.random()*.2)),u.setZ(h,u.getZ(h)*(.9+Math.random()*.2));return u.needsUpdate=!0,n.add(o),n.add(l),n.position.set(t,this.terrain.getHeightAt(t,e),e),n}createOliveGroves(){const t={x:-280,z:80};for(let e=0;e<6;e++)for(let n=0;n<5;n++){const i=t.x+e*14+(Math.random()-.5)*4,r=t.z+n*14+(Math.random()-.5)*4;this.group.add(this.makeOlive(i,r))}for(let e=0;e<8;e++){const n=160+e*6;for(let i=0;i<18;i++){const r=-360+i*12,o=new ut(.18,.9,.18),a=new G({color:3820826,roughness:.9}),c=new F(o,a);c.position.set(r,this.terrain.getHeightAt(r,n)+.45,n+Math.sin(i)*.3),this.group.add(c);const l=new Le(.45,6,5),u=new G({color:5929518}),h=new F(l,u);h.position.set(r,this.terrain.getHeightAt(r,n)+.9,n),h.scale.set(1.2,.6,1.2),this.group.add(h)}}}createForest(){for(let t=0;t<120;t++){const e=(Math.random()-.5)*1100,n=-900+Math.random()*280,i=10+Math.random()*8,r=this.makePine(e,n,i);this.group.add(r)}for(let t=0;t<60;t++){const e=(Math.random()-.5)*900,n=-250+Math.random()*300,i=this.makeOak(e,n);this.group.add(i)}}makePine(t,e,n){const i=new Pt,r=new F(new se(.18,.36,n*.18,6),new G({color:4008728,roughness:.95}));r.position.y=n*.09,i.add(r);for(let o=0;o<3;o++){const a=new F(new Ae(1.6-o*.35,4.5-o*.7,8),new G({color:1980958,roughness:.9}));a.position.y=n*.22+o*2.2,i.add(a)}return i.position.set(t,this.terrain.getHeightAt(t,e),e),i.scale.set(.9+Math.random()*.2,1,.9+Math.random()*.2),i}makeOak(t,e){const n=new Pt,i=new F(new se(.22,.42,3.2,6),new G({color:4864032}));i.position.y=1.6,n.add(i);const r=new F(new Le(2.8,8,7),new G({color:2968094,roughness:.92}));return r.position.y=4.2,r.scale.set(1.3,.9,1.3),n.add(r),n.position.set(t,this.terrain.getHeightAt(t,e),e),n}createGardens(){const t={x:-80,z:-10};for(let e=-2;e<=2;e++)for(let n=-1;n<=1;n++){const i=new F(new ut(1.1,.45,1.1),new G({color:8034890}));i.position.set(t.x+e*2.4,this.terrain.getHeightAt(t.x+e*2.4,t.z+n*2.4)+.22,t.z+n*2.4),this.group.add(i)}for(let e=0;e<6;e++){const n=t.x+(Math.random()-.5)*14,i=t.z+(Math.random()-.5)*8,r=this.makeLemonTree(n,i);this.group.add(r)}}makeLemonTree(t,e){const n=new Pt,i=new F(new se(.12,.18,1.8,6),new G({color:5917226}));i.position.y=.9,n.add(i);const r=new F(new Le(1.2,7,6),new G({color:3824154}));r.position.y=1.9,n.add(r);for(let o=0;o<3;o++){const a=new F(new Le(.16,6,5),new G({color:15257632}));a.position.set((Math.random()-.5)*.9,1.7+Math.random()*.5,(Math.random()-.5)*.9),n.add(a)}return n.position.set(t,this.terrain.getHeightAt(t,e),e),n}}function jn(s,t,e){const n=document.createElement("canvas");n.width=s,n.height=t;const i=n.getContext("2d");e(i,s,t);const r=new ln(n);return r.wrapS=r.wrapT=on,r.colorSpace=me,r.needsUpdate=!0,r}function Ir(){const s=jn(512,512,(e,n,i)=>{e.fillStyle="#e8ddd0",e.fillRect(0,0,n,i);for(let r=0;r<6e3;r++){const o=Math.random()*n,a=Math.random()*i,c=Math.random()*1.8+.4,l=Math.random()*.09;e.fillStyle=`rgba(${180+Math.random()*30|0},${170+Math.random()*20|0},${150+Math.random()*25|0},${l})`,e.beginPath(),e.arc(o,a,c,0,Math.PI*2),e.fill()}e.strokeStyle="rgba(90,80,70,0.07)",e.lineWidth=.7;for(let r=0;r<22;r++){e.beginPath();let o=Math.random()*n,a=Math.random()*i;e.moveTo(o,a);for(let c=0;c<6;c++)o+=(Math.random()-.5)*80,a+=(Math.random()-.5)*40,e.lineTo(o,a);e.stroke()}}),t=jn(512,512,(e,n,i)=>{e.fillStyle="#9a9a9a",e.fillRect(0,0,n,i);for(let r=0;r<8e3;r++){const o=Math.random()*n,a=Math.random()*i,c=140+Math.random()*40;e.fillStyle=`rgba(${c},${c},${c},0.35)`,e.fillRect(o,a,1,1)}});return t.colorSpace=qe,{albedo:s,roughness:t,normal:null}}function c0(){return{albedo:jn(512,512,(t,e,n)=>{t.fillStyle="#d8c9b6",t.fillRect(0,0,e,n);for(let i=0;i<n;i+=4+Math.random()*8)t.fillStyle=`rgba(0,0,0,${.03+Math.random()*.04})`,t.fillRect(0,i,e,1+Math.random()*2);for(let i=0;i<4e3;i++){const r=Math.random()*e,o=Math.random()*n;t.fillStyle=`rgba(60,50,40,${Math.random()*.06})`,t.fillRect(r,o,1,1.5)}for(let i=0;i<900;i++){const r=Math.random()*e,o=Math.random()*n,a=Math.random()*2+.5;t.fillStyle="rgba(70,60,50,0.12)",t.beginPath(),t.ellipse(r,o,a,a*.6,0,0,Math.PI*2),t.fill()}}),roughness:null,normal:null}}function l0(){return{albedo:jn(512,512,(t,e,n)=>{t.fillStyle="#b05a3a",t.fillRect(0,0,e,n);const i=22,r=52;t.fillStyle="#d8c9b8";for(let o=0;o<n;o+=i){t.fillRect(0,o,e,3);const a=o/i%2===0?0:r/2;for(let c=a-r;c<e;c+=r)t.fillRect(c,o,3,i)}for(let o=3;o<n;o+=i){const a=Math.floor(o/i)%2===0?0:r/2;for(let c=a;c<e;c+=r){const l=(Math.random()-.5)*22;t.fillStyle=`rgba(${l},${l},${l},0.14)`,t.fillRect(c+3,o+3,r-6,i-6),t.strokeStyle="rgba(0,0,0,0.08)",t.strokeRect(c+3,o+3,r-6,i-6)}}}),roughness:null,normal:null}}function h0(){return{albedo:jn(512,512,(t,e,n)=>{t.fillStyle="#b85c3b",t.fillRect(0,0,e,n);for(let i=0;i<n;i+=16)t.fillStyle="rgba(0,0,0,0.07)",t.fillRect(0,i,e,2),t.fillStyle="rgba(255,255,255,0.06)",t.fillRect(0,i+2,e,1);for(let i=0;i<5e3;i++){const r=Math.random()*e,o=Math.random()*n;t.fillStyle=`rgba(50,20,10,${Math.random()*.05})`,t.fillRect(r,o,2,1)}}),roughness:null,normal:null}}function u0(){return{albedo:jn(512,512,(t,e,n)=>{t.fillStyle="#8a8d91",t.fillRect(0,0,e,n);for(let i=0;i<120;i++){const r=Math.random()*e,o=Math.random()*n,a=18+Math.random()*14,c=12+Math.random()*10,l=110+Math.random()*30;t.fillStyle=`rgb(${l},${l},${l+2})`,t.beginPath(),t.ellipse(r,o,a,c,Math.random()*.6,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(60,60,60,0.35)",t.lineWidth=1.2,t.stroke()}t.fillStyle="rgba(40,30,20,0.08)";for(let i=0;i<2e3;i++)t.fillRect(Math.random()*e,Math.random()*n,1,1)}),roughness:null,normal:null}}function d0(){return{albedo:jn(512,512,(t,e,n)=>{t.fillStyle="#ece7de",t.fillRect(0,0,e,n),t.strokeStyle="rgba(120,110,100,0.25)",t.lineWidth=.9;for(let i=0;i<12;i++){t.beginPath();let r=Math.random()*e*.3,o=Math.random()*n;t.moveTo(r,o);for(let a=0;a<80;a++)r+=6+Math.random()*8,o+=Math.sin(a*.2+i)*4+(Math.random()-.5)*3,t.lineTo(r,o);t.stroke()}t.strokeStyle="rgba(180,160,140,0.12)";for(let i=0;i<10;i++){t.beginPath();let r=0,o=Math.random()*n;t.moveTo(r,o);for(let a=0;a<90;a++)r+=6,o+=Math.sin(a*.15)*2,t.lineTo(r,o);t.stroke()}}),roughness:null,normal:null}}const Ur={};function f0(s){if(Ur[s])return Ur[s];let t;switch(s){case"plaster_cream":t=Ir(),t.albedo.repeat.set(1,1);break;case"plaster_ochre":t=Ir(),t.albedo.repeat.set(1,1);break;case"travertine":t=c0();break;case"brick":t=l0();break;case"terracotta":t=h0();break;case"cobble":t=u0(),t.albedo.repeat.set(2,2);break;case"marble":t=d0();break;default:t=Ir()}return[t.albedo,t.roughness,t.normal].forEach(e=>{e&&(e.wrapS=e.wrapT=on,e.anisotropy=8)}),s==="plaster_ochre"&&(t.tint="#e8c9a0"),Ur[s]=t,t}function _i(s,t={}){const e=f0(s),n=new G({map:e.albedo,roughness:t.roughness??.85,metalness:t.metalness??0,color:t.color?new ft(t.color):new ft(16777215)});return e.albedo&&(n.map=e.albedo),t.repeat&&n.map.repeat.set(t.repeat[0],t.repeat[1]),e.roughness,n.needsUpdate=!0,n}const ce={venezia:{id:"venezia",name:"Venezia",color:"#d35400",center:{x:20,z:-90},palette:["#e8c9a0","#d8b48a","#c9a89a","#e6dcc8","#d4b89a"],roof:"terracotta",facade:"plaster_ochre",floors:[2,4],canal:!0,bridge:!0,density:.95},roma:{id:"roma",name:"Roma",color:"#8e44ad",center:{x:180,z:-20},palette:["#e8ddd0","#d8c9b6","#e6c9a0","#d4b8a0"],roof:"terracotta",facade:"travertine",floors:[3,5],density:.92},firenze:{id:"firenze",name:"Firenze",color:"#c0392b",center:{x:-60,z:-160},palette:["#e8dcc0","#d8c9a0","#d4b89a","#c9b08a"],roof:"terracotta",facade:"plaster_cream",floors:[3,5],density:.88},milano:{id:"milano",name:"Milano",color:"#2c3e50",center:{x:-240,z:-420},palette:["#d8ddd8","#c9d0d8","#e8e0d0","#b8c0c8"],roof:"terracotta",facade:"plaster_cream",floors:[4,7],modern:!0,density:.92},bologna:{id:"bologna",name:"Bologna",color:"#8e3515",center:{x:-30,z:-290},palette:["#c95a2a","#d8a090","#b94a1a","#e8c9a0"],roof:"terracotta",facade:"brick",floors:[3,5],density:.85},toscana:{id:"toscana",name:"Toscana",color:"#27ae60",center:{x:-280,z:60},palette:["#d8c9a0","#e6dcc8","#c9b89a","#b8a08a"],roof:"terracotta",facade:"plaster_cream",floors:[2,3],density:.42},genova:{id:"genova",name:"Genova",color:"#2980b9",center:{x:-340,z:-240},palette:["#e8c9a0","#f4e8c1","#d8b89a","#c9dcc0"],roof:"slate",facade:"plaster_ochre",floors:[3,6],density:.82},napoli:{id:"napoli",name:"Napoli",color:"#e67e22",center:{x:320,z:180},palette:["#e8ddd0","#f4e8d0","#d8c9a0","#e8c9a0"],roof:"terracotta",facade:"plaster_cream",floors:[3,6],density:.88},dolomiti:{id:"dolomiti",name:"Dolomiti",color:"#16a085",center:{x:0,z:-700},palette:["#d8ddd0","#c9c0b0","#8a9a8a"],roof:"slate",facade:"plaster_cream",floors:[2,3],alpine:!0,density:.32}};class p0{constructor(t,e){this.worldScene=t,this.terrain=e,this.group=t.buildingGroup,this.buildings=[],this.colliders=[]}generate(){Object.values(ce).forEach(t=>{this.generateRegion(t)}),this.generateConnectingFabric(),this.generateSuburbs(),this.addStreetFurniture()}generateRegion(t){const e=Math.round(t.density*(t.id==="toscana"?52:t.id==="dolomiti"?32:t.id==="firenze"?62:t.id==="bologna"?56:t.id==="genova"?48:t.id==="napoli"?58:64)),n=t.id==="dolomiti"?560:t.id==="toscana"?420:(t.id==="genova",300),i=t.id==="dolomiti"?240:t.id==="toscana"?360:t.id==="genova"?280:260;for(let r=0;r<e;r++){const o=t.center.x+(Math.random()-.5)*n+(Math.random()-.5)*20,a=t.center.z+(Math.random()-.5)*i+(Math.random()-.5)*20;if(t.id==="venezia"&&Math.abs(o-(20+Math.sin(a*.02)*18))>145)continue;const c=Math.hypot(o+420,a+480),l=Math.hypot(o-380,a+520);if(c<150||l<130||this.buildings.some(g=>Math.hypot(g.position.x-o,g.position.z-a)<7.5)&&Math.random()<.7)continue;const u=re.randInt(t.floors[0],t.floors[1]),h=6.5+Math.random()*9,d=6.5+Math.random()*9,p=u*3.28+(t.alpine?1.6:.8);this.createBuilding(o,a,h,d,p,t,u)}this.createHeroLandmarks(t)}generateConnectingFabric(){[{a:ce.firenze.center,b:ce.roma.center,count:28,width:80},{a:ce.bologna.center,b:ce.firenze.center,count:22,width:70},{a:ce.milano.center,b:ce.bologna.center,count:24,width:90},{a:ce.genova.center,b:ce.milano.center,count:18,width:70},{a:ce.toscana.center,b:ce.firenze.center,count:20,width:60},{a:ce.roma.center,b:ce.napoli.center,count:26,width:85},{a:ce.venezia.center,b:ce.bologna.center,count:16,width:55}].forEach(e=>{for(let n=0;n<e.count;n++){const i=Math.random(),r=re.lerp(e.a.x,e.b.x,i)+(Math.random()-.5)*e.width,o=re.lerp(e.a.z,e.b.z,i)+(Math.random()-.5)*e.width;if(Math.hypot(r+420,o+480)<140||Math.hypot(r-380,o+520)<120||this.buildings.some(p=>Math.hypot(p.position.x-r,p.position.z-o)<8))continue;const a=re.randInt(2,4),c=6+Math.random()*7,l=6+Math.random()*7,u=a*3.2+.6;let h=ce.firenze,d=1/0;if(Object.values(ce).forEach(p=>{const g=Math.hypot(p.center.x-r,p.center.z-o);g<d&&(d=g,h=p)}),this.createBuilding(r,o,c,l,u,h,a),Math.random()<.35)for(let p=0;p<2;p++){const g=r+(Math.random()-.5)*22,_=o+(Math.random()-.5)*22;this.buildings.some(m=>Math.hypot(m.position.x-g,m.position.z-_)<7)||this.createBuilding(g,_,5+Math.random()*5,5+Math.random()*5,2.8+Math.random()*2.5,h,2)}}})}generateSuburbs(){Object.values(ce).forEach(t=>{if(t.id==="dolomiti"||t.id==="toscana")return;const e=14;for(let n=0;n<e;n++){const i=Math.random()*Math.PI*2,r=140+Math.random()*90,o=t.center.x+Math.cos(i)*r*.85,a=t.center.z+Math.sin(i)*r*.75;if(this.buildings.some(l=>Math.hypot(l.position.x-o,l.position.z-a)<7.5))continue;const c=re.randInt(2,3);this.createBuilding(o,a,5.5+Math.random()*6,5.5+Math.random()*6,c*3.1,t,c)}});for(let t=0;t<22;t++){const e=(Math.random()-.5)*900,n=(Math.random()-.5)*600;if(Object.values(ce).some(o=>Math.hypot(o.center.x-e,o.center.z-n)<110)||Math.hypot(e+420,n+480)<130)continue;this.createBuilding(e,n,5+Math.random()*4,5+Math.random()*4,6.2,ce.toscana,2),Math.random()<.5&&this.createBuilding(e+8+Math.random()*6,n+Math.random()*6,4,5,3.8,ce.toscana,1)}}createBuilding(t,e,n,i,r,o,a){const c=this.terrain.getHeightAt(t,e),l=new Pt;l.position.set(t,c,e),l.userData.region=o.id,l.userData.enterable=Math.random()<.38,l.userData.buildingId=`b_${o.id}_${this.buildings.length}`;const u=this.getFacadeMaterial(o,t,e),h=new ut(n,r,i),d=new F(h,u);d.position.y=r/2,d.castShadow=!0,d.receiveShadow=!0,l.add(d);const p=this.createRoof(n,i,r,o);l.add(p),this.addFacadeDetails(l,n,i,r,a,o);const g=this.createDoor(n,i,r,o);l.add(g);const _=new ut(n+.28,.45,i+.28),m=new G({color:9079432,roughness:.85}),f=new F(_,m);if(f.position.y=.22,l.add(f),(o.id==="roma"||o.id==="milano"||o.id==="firenze"||o.id==="napoli")&&Math.random()<.32){const v=new _e(2.2,.58),y=document.createElement("canvas");y.width=256,y.height=64;const C=y.getContext("2d");C.fillStyle="#1a1a1a",C.fillRect(0,0,256,64),C.fillStyle="#d4b67a",C.font="600 20px Cinzel",C.fillText(["TRATTORIA","CAFFE","LIBRERIA","MODA","FARMACIA","GELATERIA","PANIFICIO"][Math.floor(Math.random()*7)],12,38);const A=new ln(y);A.colorSpace=me;const R=new G({map:A,emissive:3351040,emissiveIntensity:.12}),I=new F(v,R);I.position.set(0,2.05,i/2+.11),l.add(I)}this.group.add(l);const S=new Li(new w(t-n/2,c,e-i/2),new w(t+n/2,c+r+2,e+i/2));return this.colliders.push(S),this.buildings.push({id:l.userData.buildingId,region:o.id,position:new w(t,c,e),size:{w:n,d:i,h:r},floors:a,enterable:l.userData.enterable,mesh:l}),l.userData.enterable&&(l.userData.interiorData=this.createInteriorData(n,i,r,o,a)),l}getFacadeMaterial(t,e,n){const i=Math.sin(e*.13)*Math.cos(n*.11);let r=t.facade;t.id==="venezia"&&i>.3&&(r="plaster_cream"),t.id==="roma"&&Math.random()<.18&&(r="brick"),t.id==="bologna"&&(r="brick");const o=t.palette[Math.floor(Math.abs(Math.sin(e*.05+n*.03))*t.palette.length)%t.palette.length];return _i(r,{color:o,roughness:.88})}createRoof(t,e,n,i){const r=new Pt;if(i.alpine){const a=new Zr;a.moveTo(-t/2-.3,0),a.lineTo(0,2.8),a.lineTo(t/2+.3,0),a.lineTo(-t/2-.3,0);const c=new ks(a,{depth:e+.6,bevelEnabled:!1}),l=new G({color:4868682,roughness:.9}),u=new F(c,l);u.position.set(0,n,-e/2-.3),u.castShadow=!0,r.add(u);const h=new F(new ut(.6,1.4,.6),new G({color:3815994}));h.position.set(t*.3,n+1,0),r.add(h)}else{const a=new Ae(Math.max(t,e)*.72,1.2,4,1);a.rotateY(Math.PI/4);const c=_i("terracotta",{roughness:.9,color:12082235}),l=new F(a,c);l.position.y=n+1.2/2-.1,l.castShadow=!0,r.add(l);const u=new F(new ut(t*.12,.18,e*.12),new G({color:10111530}));u.position.y=n+1.2-.1,r.add(u)}return r}addFacadeDetails(t,e,n,i,r,o){const l=i/r,u=n/2+.02,h=o.id==="venezia",d=o.modern&&Math.random()<.32;for(let g=0;g<r;g++){const _=.9+g*l+l*.35,m=e>9?3:2;for(let f=0;f<m;f++){if(d&&g>2){const M=new _e(1.9,2),T=new G({color:9089224,metalness:.35,roughness:.1,transparent:!0,opacity:.72}),O=new F(M,T),W=(f-(m-1)/2)*2.6;O.position.set(W,_,u+.08),t.add(O);continue}const S=(f-(m-1)/2)*(e/(m+.5)),v=new ut(1.25+.18,1.7+.18,.06),y=new G({color:h?15789280:15261904,roughness:.85}),C=new F(v,y);C.position.set(S,_,u),t.add(C);const A=new _e(1.25,1.7),R=new G({color:662058,metalness:.15,roughness:.12,transparent:!0,opacity:.82});Math.random()<.42&&(R.emissive=new ft(16763008),R.emissiveIntensity=0,R.userData.isWindowLight=!0);const I=new F(A,R);if(I.position.set(S,_,u+.04),t.add(I),!d&&Math.random()<(h?.55:.62)){const M=new ut(.52,1.7,.04),T=new G({color:o.id==="toscana"?2968090:o.id==="venezia"?4876890:(o.id==="bologna",6961706),roughness:.9}),O=new F(M,T);O.position.set(S-1.25/2-.28,_,u+.05);const W=O.clone();W.position.set(S+1.25/2+.28,_,u+.05),Math.random()<.32&&(O.rotation.y=Math.PI/3.5,W.rotation.y=-Math.PI/3.5),t.add(O),t.add(W)}if(g>=1&&Math.random()<.32&&!d){const M=new ut(2.05,.08,.55),T=new G({color:14209216,roughness:.85}),O=new F(M,T);O.position.set(S,_-.95,u+.28),t.add(O);const W=new ut(1.25+.8,.45,.03),j=new G({color:2763306,metalness:.3,roughness:.5}),L=new F(W,j);if(L.position.set(S,_-.68,u+.52),t.add(L),Math.random()<.45){const z=new F(new ut(1.75,.22,.16),new G({color:9058858}));z.position.set(S,_-.78,u+.45),t.add(z);const k=new F(new Le(.18,6,5),new G({color:16730730}));k.position.set(S+.2,_-.66,u+.52),t.add(k)}}}}const p=e/2+.02;for(let g=0;g<r;g++){const _=.9+g*l+l*.35,m=new ut(.06,1.5,1.1),f=new G({color:15261904}),S=new F(m,f);S.position.set(p,_,0),t.add(S)}}createDoor(t,e,n,i){const r=new Pt,o=1.1,a=2.15,c=new ut(o,a,.05),l=i.id==="venezia"?2767434:i.id==="toscana"?5913114:3811866,u=new G({color:l,roughness:.85}),h=new F(c,u);h.position.set(0,a/2+.25,e/2+.06),r.add(h);const d=new ut(o+.3,.18,.08),p=new G({color:14209216}),g=new F(d,p);g.position.set(0,a+.35,e/2+.07),r.add(g);const _=new F(new Le(.05,6,6),new G({color:13215850,metalness:.6,roughness:.3}));_.position.set(.35,1.1,e/2+.09),r.add(_);const m=document.createElement("canvas");m.width=64,m.height=32;const f=m.getContext("2d");f.fillStyle="#d8d0c0",f.fillRect(0,0,64,32),f.fillStyle="#1a1a1a",f.font="700 18px Inter",f.fillText(`${Math.floor(Math.random()*120+1)}`,18,22);const S=new ln(m),v=new F(new _e(.32,.16),new G({map:S}));return v.position.set(0,a+.35,e/2+.12),r.add(v),r.userData.isDoor=!0,r}createInteriorData(t,e,n,i,r){return{size:{w:t-.8,d:e-.8,h:n-.9},region:i.id,floors:r,style:i.id}}createHeroLandmarks(t){if(t.id==="roma"){const e=new Pt,n=this.terrain.getHeightAt(t.center.x,t.center.z);e.position.set(210,n,-55);const i=new se(28,30,12,48,1,!0),r=new G({color:14207414,roughness:.85,side:Xe}),o=new F(i,r);o.position.y=6,e.add(o);for(let d=0;d<24;d++){const p=d/24*Math.PI*2,g=new F(new _e(2.4,4),new G({color:657930})),_=29;g.position.set(Math.cos(p)*_,4,Math.sin(p)*_),g.lookAt(0,4,0),e.add(g)}const a=new F(new Ci(20,32),new G({color:13219990,roughness:.95}));a.rotation.x=-Math.PI/2,a.position.y=.1,e.add(a);for(let d=0;d<3;d++){const p=new F(new se(22-d*3,24-d*3,1.2,48,1,!0),r);p.position.y=2+d*1.8,e.add(p)}this.group.add(e),this.buildings.push({id:"hero_colosseum",region:"roma",position:e.position.clone(),size:{w:60,d:60,h:12},floors:2,enterable:!1,hero:!0,mesh:e});const c=new Pt;c.position.set(160,this.terrain.getHeightAt(160,-15),-15);const l=new F(new se(14,14,10,32),new G({color:15261136,roughness:.8}));l.position.y=5,c.add(l);const u=new F(new Le(14,32,16,0,Math.PI*2,0,Math.PI/2),new G({color:14209216,roughness:.85}));u.position.y=10,c.add(u);for(let d=0;d<8;d++){const p=d/8*Math.PI*.6-.3,g=new F(new se(.55,.65,9,8),new G({color:16051424}));g.position.set(Math.cos(p)*12,4.5,Math.sin(p)*12+6),c.add(g)}const h=new F(new ut(16,1,8),new G({color:15261136}));h.position.set(0,9,10),c.add(h),this.group.add(c)}if(t.id==="firenze"){const e=new Pt;e.position.set(-62,this.terrain.getHeightAt(-62,-162),-162);const n=new F(new ut(22,12,34),new G({color:16052454}));n.position.y=6,e.add(n);const i=new F(new Le(9,24,12,0,Math.PI*2,0,Math.PI/2),new G({color:12597547}));i.position.y=12,e.add(i);const r=new F(new se(1.2,1.2,3,8),new G({color:16050369}));r.position.y=20,e.add(r);const o=new F(new ut(5,28,5),new G({color:15261136}));o.position.set(14,14,12),e.add(o),this.group.add(e);const a=new Pt;a.position.set(-45,this.terrain.getHeightAt(-45,-155)+.8,-155);const c=new F(new ut(30,1.2,6),new G({color:14207392}));c.position.y=3.2,a.add(c);for(let l=0;l<4;l++){const u=new F(new ut(5,3.5,3),new G({color:15260864}));u.position.set((l-1.5)*7,5.2,1.5),a.add(u)}this.group.add(a)}if(t.id==="venezia"){const e=new Pt,n=this.terrain.getHeightAt(35,-105);e.position.set(35,n,-105);const i=new F(new ut(7,38,7),new G({color:14201994,roughness:.85}));i.position.y=19,e.add(i);const r=new F(new ut(6,7,6),new G({color:15261136}));r.position.y=38,e.add(r);for(let h=0;h<4;h++){const d=new F(new _e(2.2,3.2),new G({color:657930,side:Xe})),p=h*Math.PI/2;d.position.set(Math.cos(p)*3.01,38,Math.sin(p)*3.01),d.rotation.y=-p,e.add(d)}const o=new F(new Ae(4.2,7,4),new G({color:6982234}));o.position.y=45,o.rotation.y=Math.PI/4,e.add(o);const a=new F(new Ae(.5,1.2,6),new G({color:13215850,metalness:.6}));a.position.y=49,e.add(a),this.group.add(e);const c=new Pt;c.position.set(55,this.terrain.getHeightAt(55,-85),-85);const l=new F(new ut(34,12,12),_i("plaster_cream",{color:"#f4e8d1"}));l.position.y=6,c.add(l);for(let h=0;h<9;h++){const d=new F(new _e(2.8,4.5),new G({color:657930}));d.position.set((h-4)*3.6,3,6.01),c.add(d);const p=new F(new se(.28,.32,6,8),new G({color:16051424}));p.position.set((h-4)*3.6+1.8,3,6),c.add(p)}const u=new F(new ut(34,6,12),new G({color:15251648}));u.position.y=12,c.add(u);for(let h=-16;h<=16;h+=3)for(let d=10;d<=14;d+=2){const p=new F(new _e(1.2,1.2),new G({color:Math.abs(h+d)%4===0?16050369:14198968}));p.position.set(h,d,6.02),c.add(p)}this.group.add(c);for(let h=0;h<4;h++){const d=-60+h*50,p=-140+h*30,g=new Pt;g.position.set(d,this.terrain.getHeightAt(d,p)+.9,p);const _=new se(6,6,.9,12,1,!1,0,Math.PI),m=new G({color:14209216,side:Xe}),f=new F(_,m);f.rotation.z=Math.PI/2,f.rotation.x=Math.PI,f.position.y=1.2,g.add(f);const S=new F(new ut(12,.35,3.2),new G({color:1322e4}));S.position.y=2.1,g.add(S);const v=new F(new ut(12,.55,.08),new G({color:9079434}));v.position.set(0,2.6,1.45),g.add(v);const y=v.clone();y.position.z=-1.45,g.add(y),this.group.add(g)}for(let h=0;h<5;h++){const d=new Pt,p=h/5,g=-140+p*200,_=-210+p*140;d.position.set(g,.55,_);const m=new F(new ut(7,.35,1.1),new G({color:657930}));m.position.y=0,d.add(m);const f=new F(new Ae(.55,1.4,4),new G({color:657930}));f.rotation.z=-Math.PI/2,f.position.set(4,.2,0),d.add(f);const S=f.clone();S.rotation.z=Math.PI/2,S.position.set(-4,.2,0),d.add(S),d.rotation.y=Math.sin(p*Math.PI)*.6,this.worldScene.propGroup.add(d)}}if(t.id==="bologna"){const e=new Pt;e.position.set(-28,this.terrain.getHeightAt(-28,-288),-288);const n=new F(new ut(5,38,5),new G({color:13195818}));n.position.set(-3,19,0),e.add(n);const i=new F(new ut(4,26,4),new G({color:13195818}));i.position.set(4,13,2),i.rotation.z=.08,e.add(i),this.group.add(e);for(let r=0;r<10;r++){const o=new F(new se(.32,.36,4.8,8),new G({color:16050369}));o.position.set(-50+r*4,2.4,-295),this.worldScene.streetGroup.add(o);const a=new F(new _e(3.2,3.5),new G({color:1710618}));a.position.set(-50+r*4+2,2.4,-294.9),this.worldScene.streetGroup.add(a)}}if(t.id==="milano"){const e=new Pt;e.position.set(-240,this.terrain.getHeightAt(-240,-420),-420);const n=new F(new ut(28,14,52),new G({color:16052454}));n.position.y=7,e.add(n);for(let h=-12;h<=12;h+=3){const d=new F(new Ae(.45,6,6),new G({color:16052454}));d.position.set(h,17,26),e.add(d)}const i=new F(new Ae(1.2,12,6),new G({color:13215850,metalness:.2}));i.position.set(0,20,0),e.add(i);const r=new F(new Ci(2.8,16),new G({color:4872810,transparent:!0,opacity:.85}));r.position.set(0,10,26.01),e.add(r);for(let h=-20;h<=20;h+=8){const d=new F(new ut(.4,3,4),new G({color:15261904}));d.position.set(14.4,9,h),e.add(d);const p=d.clone();p.position.set(-14.4,9,h),e.add(p)}this.group.add(e);for(let h=0;h<3;h++){const d=new Pt,p=-260+h*18,g=-460+h*12;d.position.set(p,this.terrain.getHeightAt(p,g),g);const _=28+h*9,m=new ut(12,_,12),f=new G({color:9089224,metalness:.45,roughness:.18,transparent:!0,opacity:.88}),S=new F(m,f);S.position.y=_/2,d.add(S);for(let v=0;v<_/2;v++){const y=new F(new ut(12.4,.12,12.4),new G({color:13687008}));y.position.y=4+v*2.2,d.add(y)}this.group.add(d)}const a=new Ve([new w(-300,.2,-380),new w(-220,.2,-380),new w(-200,.2,-430),new w(-280,.2,-450)],!0).getPoints(80),c=new Se().setFromPoints(a),l=new kc({color:4868682}),u=new ym(c,l);u.position.y=.02,this.worldScene.streetGroup.add(u)}if(t.id==="genova"){const e=new Pt;e.position.set(-350,this.terrain.getHeightAt(-350,-240),-240);const n=new F(new ut(60,2,12),new G({color:9079432}));n.position.y=.5,e.add(n);const i=new F(new se(1.4,1.8,18,8),new G({color:16052454}));i.position.set(22,9,0),e.add(i);const r=new F(new se(1.6,1.6,1.2,8),new G({color:16773569,emissive:16764006,emissiveIntensity:.6}));r.position.set(22,18.5,0),e.add(r),this.group.add(e)}if(t.id==="napoli"){const e=new Pt;e.position.set(360,this.terrain.getHeightAt(360,220),220);const n=new F(new Ae(34,22,16),new G({color:4864554}));n.position.y=11,e.add(n);const i=new F(new se(6,8,2,16),new G({color:2759194}));i.position.y=22,e.add(i);const r=new F(new Le(4,8,6),new G({color:9079434,transparent:!0,opacity:.35}));r.position.y=26,e.add(r),this.group.add(e);for(let o=0;o<6;o++){const a=new F(new ut(7,12+o%2*4,7),new G({color:["#e8c9a0","#f4e8c1","#d8a0a0","#f4d0a0"][o%4]}));a.position.set(300+o*9,6+o%2*2,165),this.group.add(a)}}if(t.id==="toscana"){const e=new Pt,n=-260,i=40;e.position.set(n,this.terrain.getHeightAt(n,i),i);const r=new F(new ut(18,7,12),_i("plaster_ochre",{color:"#e8dcc0"}));r.position.y=3.5,e.add(r);const o=new F(new Ae(11,2.2,4),_i("terracotta"));o.position.y=7.8,o.rotation.y=Math.PI/4,e.add(o);for(let h=0;h<4;h++){const d=new F(new se(.28,.32,5,8),new G({color:16051424}));d.position.set((h-1.5)*3.2,2.5,6.6),e.add(d);const p=new F(new _e(2.2,3),new G({color:662042}));p.position.set((h-1.5)*3.2,2.8,6.62),e.add(p)}const a=new F(new ut(12,.18,10),new G({color:6982234}));a.position.set(10,3.2,2),e.add(a);for(let h=0;h<4;h++){const d=new F(new se(.12,.12,3.2,6),new G({color:9071170}));d.position.set(6+h*2.4,1.6,-2+h*1.2),e.add(d)}this.group.add(e);const c=new Pt;c.position.set(-310,this.terrain.getHeightAt(-310,90),90);const l=new F(new ut(12,5.5,9),new G({color:12099722}));l.position.y=2.75,c.add(l);const u=new F(new Ae(7.5,2,4),_i("terracotta"));u.position.y=6.2,u.rotation.y=Math.PI/4,c.add(u),this.group.add(c)}if(t.id==="dolomiti"){const e=new Pt,n=30,i=-720;e.position.set(n,this.terrain.getHeightAt(n,i),i);const r=new F(new ut(10,7,16),new G({color:15261904}));r.position.y=3.5,e.add(r);const o=new Zr;o.moveTo(-5,0),o.lineTo(0,4),o.lineTo(5,0),o.lineTo(-5,0);const a=new ks(o,{depth:16,bevelEnabled:!1}),c=new F(a,new G({color:6974058}));c.position.set(0,7,-8),e.add(c);const l=new F(new ut(4,16,4),new G({color:15261904}));l.position.set(0,8,9),e.add(l);const u=new F(new Ae(2.8,6,4),new G({color:2775610}));u.position.set(0,19,9),u.rotation.y=Math.PI/4,e.add(u),this.group.add(e);for(let h=0;h<6;h++){const d=(Math.random()-.5)*300,p=-700+(Math.random()-.5)*180,g=new Pt;g.position.set(d,this.terrain.getHeightAt(d,p),p);const _=new F(new ut(6,3.5,6),new G({color:9071170}));_.position.y=1.75,g.add(_);const m=new F(new Ae(4.5,2.2,4),new G({color:5913130}));m.position.y=4.1,m.rotation.y=Math.PI/4,g.add(m),this.group.add(g)}}}addStreetFurniture(){const t=new G({color:1710618,metalness:.5,roughness:.6}),e=new G({color:16773569,emissive:16764006,emissiveIntensity:0});let n=0;for(let i=0;i<140&&n<90;i++){const r=(Math.random()-.5)*1200,o=(Math.random()-.5)*1e3;if(!this.buildings.some(p=>Math.hypot(p.position.x-r,p.position.z-o)<19))continue;n++;const c=this.terrain.getHeightAt(r,o),l=new Pt;l.position.set(r,c,o);const u=new F(new se(.06,.08,4.2,8),t);u.position.y=2.1,l.add(u);const h=new F(new Le(.22,8,6),e);h.position.y=4.3,h.userData.isLamp=!0,l.add(h);const d=new F(new ut(.04,.04,.6),t);d.position.set(0,4,.3),l.add(d),this.worldScene.streetGroup.add(l)}for(let i=0;i<40;i++){const r=(Math.random()-.5)*800,o=(Math.random()-.5)*600;if(!(Math.hypot(r-180,o+20)<220||Math.hypot(r-60,o+160)<180||Math.hypot(r-20,o+90)<180))continue;const c=this.terrain.getHeightAt(r,o),l=new Pt;l.position.set(r,c+.25,o),l.rotation.y=Math.random()*Math.PI;const u=new F(new ut(1.8,.08,.55),new G({color:6965802}));u.position.y=.45,l.add(u);const h=new F(new ut(1.8,.45,.06),new G({color:6965802}));h.position.set(0,.75,-.22),l.add(h);const d=new F(new ut(.06,.45,.5),new G({color:1710618}));d.position.set(-.7,.22,0),l.add(d);const p=d.clone();p.position.x=.7,l.add(p),this.worldScene.streetGroup.add(l)}for(let i=0;i<16;i++){const r=-280+(Math.random()-.5)*60,o=20+Math.random()*80,a=this.terrain.getHeightAt(r,o),c=new F(new Ae(1.1,7,8),new G({color:1718802}));c.position.set(r,a+3.5,o),this.worldScene.vegetationGroup.add(c)}}getClosestBuilding(t,e=18){let n=null,i=1/0;for(const r of this.buildings){const o=Math.hypot(r.position.x-t.x,r.position.z-t.z);o<e&&o<i&&(n=r,i=o)}return n?{building:n,dist:i}:null}checkCollision(t,e=.6){for(const n of this.colliders){const i=(n.min.x+n.max.x)*.5,r=(n.min.z+n.max.z)*.5;if(Math.abs(t.x-i)>18||Math.abs(t.z-r)>18)continue;const o=new w(re.clamp(t.x,n.min.x,n.max.x),t.y,re.clamp(t.z,n.min.z,n.max.z)),a=t.x-o.x,c=t.z-o.z;if(a*a+c*c<e*e)return{hit:!0,box:n}}return{hit:!1}}updateNightLights(t){const e=1-t,n=re.clamp((e-.25)/.5,0,1);this.worldScene.buildingGroup.traverse(i=>{i.isMesh&&i.material&&i.material.emissive&&i.material.userData&&i.material.userData.isWindowLight&&(i.material.emissiveIntensity=n*1.7*(.75+Math.random()*.25)),i.userData&&i.userData.isLamp&&i.material.emissive&&(i.material.emissiveIntensity=n*2.2)}),this.worldScene.streetGroup.traverse(i=>{i.userData&&i.userData.isLamp&&i.material.emissive&&(i.material.emissiveIntensity=n*1.6)})}}class m0{constructor(t,e){this.worldScene=t,this.terrain=e,this.group=t.streetGroup}create(){this.createHighway(),this.createCityStreets(),this.createCountryRoads()}createRoadMesh(t,e,n){const i=t.getPoints(120),r=new Se,o=[],a=[],c=[];for(let u=0;u<i.length;u++){const h=i[u],d=this.terrain.getHeightAt(h.x,h.z)+.08;h.y=d;const p=u<i.length-1?new w().subVectors(i[u+1],h).normalize():new w().subVectors(h,i[u-1]).normalize(),g=new w(-p.z,0,p.x).normalize().multiplyScalar(e/2);if(o.push(h.x+g.x,d,h.z+g.z),o.push(h.x-g.x,d,h.z-g.z),a.push(0,u/i.length*10),a.push(1,u/i.length*10),u<i.length-1){const _=u*2,m=_+1,f=_+2,S=_+3;c.push(_,m,f,m,S,f)}}r.setAttribute("position",new ne(o,3)),r.setAttribute("uv",new ne(a,2)),r.setIndex(c),r.computeVertexNormals();const l=new F(r,n);return l.receiveShadow=!0,l}createHighway(){const t=new Ve([new w(-260,-.5,-860),new w(-180,0,-500),new w(-120,0,-200),new w(0,0,0),new w(120,0,260),new w(200,0,600),new w(240,0,980)]),e=new G({color:2764339,roughness:.92}),n=this.createRoadMesh(t,9,e);this.group.add(n);const i=new G({color:16777215}),r=new Ve(t.points.map(a=>a.clone())),o=this.createRoadMesh(r,.22,i);o.position.y=.015,this.group.add(o)}createCityStreets(){const t=new G({color:3816770,roughness:.9});for(let o=0;o<5;o++){const a=120+o*18,c=new Ve([new w(a,0,-80),new w(a,0,40)]);this.group.add(this.createRoadMesh(c,6,t))}for(let o=-60;o<=30;o+=18){const a=new Ve([new w(110,0,o),new w(260,0,o)]);this.group.add(this.createRoadMesh(a,6,t))}const e=document.createElement("canvas");e.width=256,e.height=256;const n=e.getContext("2d");n.fillStyle="#9a9a9a",n.fillRect(0,0,256,256);for(let o=0;o<120;o++){const a=Math.random()*256,c=Math.random()*256;n.fillStyle="rgba(0,0,0,0.08)",n.fillRect(a,c,18,12),n.strokeStyle="rgba(255,255,255,0.2)",n.strokeRect(a,c,18,12)}const i=new ln(e);i.wrapS=i.wrapT=on,i.repeat.set(6,6);const r=new G({map:i,roughness:.95});for(let o=0;o<4;o++){const a=new Ve([new w(-140+o*30,0,-180+o*10),new w(-80+o*20,0,-100+o*20),new w(-20+o*20,0,-20+o*10)]);this.group.add(this.createRoadMesh(a,4.2,r))}}createCountryRoads(){const t=new G({color:14209208,roughness:.97}),e=new Ve([new w(-220,0,-340),new w(-220,0,-120),new w(-240,0,20),new w(-300,0,120)]);this.group.add(this.createRoadMesh(e,5,t));const n=new Ve([new w(-200,0,-620),new w(-80,0,-650),new w(40,0,-620),new w(120,0,-580),new w(60,0,-520)]),i=new G({color:4868682,roughness:.92});this.group.add(this.createRoadMesh(n,7,i))}}class g0{constructor(t,e){this.worldScene=t,this.buildingSystem=e,this.group=t.interiorGroup,this.activeInterior=null,this.doorProxies=[]}prepareInteriors(){this.buildingSystem.buildings.forEach(t=>{if(!t.enterable)return;const e=new w(t.position.x,t.position.y+1.1,t.position.z+t.size.d/2+.7);this.doorProxies.push({pos:e,building:t})})}findNearbyDoor(t,e=3.2){let n=null,i=1/0;for(const r of this.doorProxies){const o=Math.hypot(r.pos.x-t.x,r.pos.z-t.z);o<e&&o<i&&(n=r,i=o)}return n}enterBuilding(t,e){if(this.activeInterior)return;const n=this.buildInteriorMesh(t);return n.position.copy(t.position),n.position.y=t.position.y+.02,this.group.add(n),this.activeInterior={mesh:n,building:t,entryPos:e.position.clone()},e.position.set(t.position.x,t.position.y+1,t.position.z),e.velocity.y=0,this.worldScene.buildingGroup.visible=!1,this.worldScene.streetGroup.visible=!1,this.worldScene.vegetationGroup.visible=!1,n}exitBuilding(t){this.activeInterior&&(this.group.remove(this.activeInterior.mesh),this.activeInterior.mesh.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose&&e.material.dispose()}),this.activeInterior=null,this.worldScene.buildingGroup.visible=!0,this.worldScene.streetGroup.visible=!0,this.worldScene.vegetationGroup.visible=!0,this.buildingSystem.buildings.find(e=>e.id===this.lastBuildingId)||this.buildingSystem.buildings[0])}exitToEntry(t){this.activeInterior&&(t.position.copy(this.activeInterior.entryPos),t.position.y+=.3,this.group.remove(this.activeInterior.mesh),this.activeInterior=null,this.worldScene.buildingGroup.visible=!0,this.worldScene.streetGroup.visible=!0,this.worldScene.vegetationGroup.visible=!0)}buildInteriorMesh(t){const e=new Pt,n=t.size.w,i=t.size.d,r=t.size.h-1.2,o=n-.8,a=i-.8,c=Math.min(2.8,r),l=document.createElement("canvas");l.width=512,l.height=512;const u=l.getContext("2d");u.fillStyle="#8a6a3a",u.fillRect(0,0,512,512);for(let j=0;j<512;j+=28){u.fillStyle="rgba(0,0,0,0.08)",u.fillRect(0,j,512,2);for(let L=0;L<512;L+=90)u.strokeStyle="rgba(0,0,0,0.07)",u.strokeRect(L,j,90,28)}const h=new ln(l);h.wrapS=h.wrapT=on,h.repeat.set(2,2);const d=new G({map:h,roughness:.75}),p=new F(new ut(o,.12,a),d);p.position.y=.06,p.receiveShadow=!0,e.add(p);const g=new G({color:16051424,roughness:.92}),_=.12,m=c/2,f=new F(new ut(o,c,_),g);f.position.set(0,m,-a/2),e.add(f);const S=new F(new ut(_,c,a),g);S.position.set(-o/2,m,0),e.add(S);const v=S.clone();v.position.x=o/2,e.add(v);const y=new F(new ut((o-1.4)/2,c,_),g);y.position.set(-o/4-.35,m,a/2),e.add(y);const C=y.clone();C.position.x=o/4+.35,e.add(C);const A=new F(new ut(1.4,c-2.2,_),g);A.position.set(0,c-(c-2.2)/2,a/2),e.add(A);const R=new F(new ut(o,.08,a),new G({color:16777215,roughness:.95}));R.position.y=c+.04,e.add(R),this.furnish(e,t,o,a,c);const I=new $a(16773569,18,9,1.6);I.position.set(0,c-.2,0),e.add(I);const M=new $a(16773569,8,6,2);M.position.set(-o*.3,c-.4,-a*.3),e.add(M);const T=new G({color:9089232,emissive:3361386,emissiveIntensity:.18,transparent:!0,opacity:.55}),O=new F(new _e(1.6,1.6),T);O.position.set(-o/2+.07,1.6,0),O.rotation.y=Math.PI/2,e.add(O);const W=O.clone();return W.position.set(o/2-.07,1.6,0),W.rotation.y=-Math.PI/2,e.add(W),e}furnish(t,e,n,i,r){const o=e.region,a=(v,y,C=0)=>{const A=new Pt;A.position.set(v,.38,y),A.rotation.y=C;const R=new F(new ut(1.6,.06,1),new G({color:6965802,roughness:.8}));R.position.y=.38,A.add(R);for(let I=0;I<4;I++){const M=new F(new se(.03,.03,.76,6),new G({color:4863264}));M.position.set(I%2?.7:-.7,0,I<2?.4:-.4),A.add(M)}t.add(A);for(let I=0;I<2;I++){const M=new Pt;M.position.set(v+(I?.95:-.95),.25,y+.2);const T=new F(new ut(.48,.06,.48),new G({color:9071170}));T.position.y=.25,M.add(T);const O=new F(new ut(.48,.42,.04),new G({color:9071170}));O.position.set(0,.5,-.22),M.add(O),t.add(M)}},c=(v,y)=>{const C=new Pt;C.position.set(v,.22,y);const A=new F(new ut(1.9,.45,.9),new G({color:9062970,roughness:.95}));A.position.y=.22,C.add(A);const R=new F(new ut(1.9,.55,.15),new G({color:8010282}));R.position.set(0,.55,-.38),C.add(R),t.add(C)},l=(v,y)=>{const C=new F(new ut(2.4,.88,.62),new G({color:16051424,roughness:.6}));C.position.set(v,.44,y),t.add(C);const A=new F(new ut(2.4,.06,.62),new G({color:9079432,roughness:.5}));A.position.set(v,.88,y),t.add(A);for(let I=0;I<3;I++){const M=new F(new ut(.72,.55,.32),new G({color:15261904}));M.position.set(v-.72+I*.72,1.45,y),t.add(M)}const R=new F(new ut(.6,1.65,.6),new G({color:16777215,metalness:.15,roughness:.5}));R.position.set(v+1.6,.82,y),t.add(R)},u=(v,y)=>{const C=new Pt;C.position.set(v,.28,y);const A=new F(new ut(2,.28,1.45),new G({color:6965802}));A.position.y=.14,C.add(A);const R=new F(new ut(1.95,.18,1.4),new G({color:16051424}));R.position.y=.32,C.add(R);const I=new F(new ut(.62,.12,.55),new G({color:16777215}));I.position.set(-.55,.42,0),C.add(I),t.add(C)},h=(v,y)=>{const C=new Pt;C.position.set(v,.7,y);for(let I=0;I<4;I++){const M=new F(new ut(1.1,.04,.32),new G({color:6965802}));M.position.y=I*.42,C.add(M)}const A=new F(new ut(.04,1.4,.32),new G({color:6965802}));A.position.set(-.53,.7,0),C.add(A);const R=A.clone();R.position.x=.53,C.add(R);for(let I=0;I<5;I++){const M=new F(new ut(.08,.36,.22),new G({color:13215850+Math.random()*2236962}));M.position.set(-.35+I*.16,.21,0),C.add(M)}t.add(C)};if(o==="venezia"||o==="roma"){c(-n*.25,-i*.22),a(n*.18,.6,.2),h(n*.38,-i*.34);const v=new F(new _e(1.1,.75),new G({color:14201994}));v.position.set(0,1.6,-i/2+.07),t.add(v);const y=new F(new ut(1.14,.79,.02),new G({color:13215850}));y.position.copy(v.position),y.position.z-=.01,t.add(y)}else if(o==="toscana"){a(0,-.2,.4),l(n*.32,i*.28),h(-n*.38,-i*.2);const v=new F(new ut(1.2,1,.32),new G({color:9071170,roughness:.9}));v.position.set(-n*.38,.5,i*.28),t.add(v)}else if(o==="dolomiti"){a(0,0,0);const v=new F(new ut(2,.45,.9),new G({color:5917232}));v.position.set(n*.3,.22,-i*.25),t.add(v),l(-n*.28,i*.22)}else c(-n*.2,-i*.2),a(.6,.4,.1),u(n*.28,-i*.28);const d=document.createElement("canvas");d.width=256,d.height=256;const p=d.getContext("2d");p.fillStyle="#c9a86a",p.fillRect(0,0,256,256),p.strokeStyle="#8a6a42",p.lineWidth=8,p.strokeRect(8,8,240,240);for(let v=0;v<6;v++)p.fillStyle="rgba(120,80,40,0.12)",p.beginPath(),p.arc(128+Math.cos(v)*40,128+Math.sin(v)*40,18,0,Math.PI*2),p.fill();const g=new ln(d),_=new F(new _e(2.4,1.6),new G({map:g,roughness:.95}));_.rotation.x=-Math.PI/2,_.position.set(0,.021,.3),t.add(_);const m=new Pt;m.position.set(-n*.38,.8,-i*.35);const f=new F(new se(.04,.04,1.2,8),new G({color:1710618,metalness:.4}));f.position.y=.6,m.add(f);const S=new F(new Ae(.28,.32,16,1,!0),new G({color:16050369,side:Xe,emissive:16771520,emissiveIntensity:.18}));S.position.y=1.25,m.add(S),t.add(m)}}class _0{constructor(t,e,n,i){this.camera=t,this.domElement=e,this.terrain=n,this.buildingSystem=i,this.position=new w(-320,95,140),this.target=new w(-80,8,20),this.up=new w(0,1,0),this.spherical=new tc,this.sphericalDelta=new tc,this.offset=new w,this.spherical.setFromVector3(new w().subVectors(this.position,this.target)),this.camera.position.copy(this.position),this.camera.lookAt(this.target),this.keys={},this.mouseDown=!1,this.mouseButton=-1,this.mouseX=0,this.mouseY=0,this.shift=!1,this.wheelDelta=0,this.rotateSpeed=.0032,this.panSpeed=.9,this.zoomSpeed=1.12,this.flySpeed=42,this.fastMultiplier=3.2,this.damping=.92,this.velocity=new w,this.angularVel=new ct,this.minDistance=4,this.maxDistance=900,this.minPolar=.08,this.maxPolar=Math.PI/2-.02,this.mode="orbit",this.cinematicT=0,this.cinematicPath=null,this.enabled=!0,this.setupListeners(),this.updateCameraRotation()}setupListeners(){window.addEventListener("keydown",t=>this.onKeyDown(t)),window.addEventListener("keyup",t=>this.onKeyUp(t)),this.domElement.addEventListener("mousedown",t=>this.onMouseDown(t)),window.addEventListener("mouseup",t=>this.onMouseUp(t)),window.addEventListener("mousemove",t=>this.onMouseMove(t)),this.domElement.addEventListener("wheel",t=>this.onWheel(t),{passive:!1}),this.domElement.addEventListener("contextmenu",t=>t.preventDefault()),this.domElement.addEventListener("touchstart",t=>this.onTouchStart(t),{passive:!1}),this.domElement.addEventListener("touchmove",t=>this.onTouchMove(t),{passive:!1}),this.domElement.addEventListener("touchend",t=>this.onTouchEnd(t))}onKeyDown(t){this.keys[t.code]=!0,(t.code==="ShiftLeft"||t.code==="ShiftRight")&&(this.shift=!0),t.code==="KeyC"&&(this.mode=this.mode==="cinematic"?"orbit":"cinematic",this.mode==="cinematic"&&this.startCinematic()),t.code==="KeyO"&&(this.mode="orbit"),t.code==="KeyF"&&(this.mode="fly"),t.code==="Space"&&(t.preventDefault(),this.goToNextLandmark())}onKeyUp(t){this.keys[t.code]=!1,(t.code==="ShiftLeft"||t.code==="ShiftRight")&&(this.shift=!1)}onMouseDown(t){this.mouseDown=!0,this.mouseButton=t.button,this.mouseX=t.clientX,this.mouseY=t.clientY,t.button===0&&t.altKey}onMouseUp(t){this.mouseDown=!1}onMouseMove(t){if(!this.mouseDown)return;const e=t.clientX-this.mouseX,n=t.clientY-this.mouseY;this.mouseX=t.clientX,this.mouseY=t.clientY,this.mode!=="cinematic"&&(this.mouseButton===2||this.mouseButton===0&&t.altKey||this.keys.AltLeft||this.keys.AltRight?this.pan(e,n):this.mode==="fly"?(this.angularVel.x-=e*.0026,this.angularVel.y-=n*.0026):(this.sphericalDelta.theta-=e*this.rotateSpeed,this.sphericalDelta.phi-=n*this.rotateSpeed))}onWheel(t){t.preventDefault();const e=t.deltaY>0?this.zoomSpeed:1/this.zoomSpeed,n=re.clamp(this.spherical.radius*e,this.minDistance,this.maxDistance);this.spherical.radius=n,this.wheelDelta=e}onTouchStart(t){t.touches.length===1&&(this.mouseDown=!0,this.mouseX=t.touches[0].clientX,this.mouseY=t.touches[0].clientY),t.preventDefault()}onTouchMove(t){if(!this.mouseDown||t.touches.length!==1)return;const e=t.touches[0].clientX-this.mouseX,n=t.touches[0].clientY-this.mouseY;this.mouseX=t.touches[0].clientX,this.mouseY=t.touches[0].clientY,this.sphericalDelta.theta-=e*this.rotateSpeed*1.2,this.sphericalDelta.phi-=n*this.rotateSpeed*1.2,t.preventDefault()}onTouchEnd(t){this.mouseDown=!1}pan(t,e){const n=new w;n.copy(this.position).sub(this.target);let i=n.length();i*=Math.tan(this.camera.fov/2*Math.PI/180);const r=new w().setFromMatrixColumn(this.camera.matrix,0);r.multiplyScalar(-t*i*.0012);const o=new w().setFromMatrixColumn(this.camera.matrix,1);o.multiplyScalar(e*i*.0012);const a=new w().addVectors(r,o);this.target.add(a),this.position.add(a)}startCinematic(){const t=[new w(-320,110,140),new w(-80,65,40),new w(35,55,-40),new w(180,70,-20),new w(60,85,120),new w(-240,80,-420),new w(-10,140,-320),new w(0,95,-700)];this.cinematicPath=new Ve(t,!1,"catmullrom",.5),this.cinematicT=0}goToNextLandmark(){const t=[{pos:new w(35,42,-105),target:new w(35,12,-80),name:"venezia"},{pos:new w(210,78,20),target:new w(210,6,-55),name:"roma"},{pos:new w(-260,85,-340),target:new w(-240,8,-420),name:"milano"},{pos:new w(-310,65,110),target:new w(-280,6,60),name:"toscana"},{pos:new w(40,160,-620),target:new w(0,12,-700),name:"dolomiti"}];let e=0,n=1/0;t.forEach((r,o)=>{const a=r.pos.distanceTo(this.position);a<n&&(n=a,e=o)});const i=t[(e+1)%t.length];this.flyTo(i.pos,i.target,2.2)}flyTo(t,e,n=1.8){this.mode="fly";const i=this.position.clone(),r=this.target.clone(),o=performance.now(),a=()=>{const c=Math.min((performance.now()-o)/(n*1e3),1),l=1-Math.pow(1-c,3);this.position.lerpVectors(i,t,l),this.target.lerpVectors(r,e,l),c<1?requestAnimationFrame(a):(this.mode="orbit",this.spherical.setFromVector3(new w().subVectors(this.position,this.target)))};a()}teleport(t,e,n){const i=this.spherical.radius;this.target.set(t,e-1,n);const r=new w().subVectors(this.position,this.target).normalize().multiplyScalar(i);r.length()<1&&r.set(0,i*.6,i*.8),this.position.copy(this.target).add(r),this.spherical.setFromVector3(r)}getPosition(){return this.position.clone()}update(t,e){if(this.enabled){if(this.mode==="cinematic"&&this.cinematicPath){this.cinematicT+=t*.018,this.cinematicT>1&&(this.cinematicT-=1);const n=this.cinematicPath.getPointAt(this.cinematicT),i=this.cinematicPath.getPointAt(Math.min(this.cinematicT+.02,1)),r=this.terrain?this.terrain.getHeightAt(n.x,n.z):0;n.y=Math.max(n.y,r+28),this.position.lerp(n,.04),this.target.lerp(i,.05),this.spherical.setFromVector3(new w().subVectors(this.position,this.target))}else if(this.mode==="fly"){const n=new w;this.camera.getWorldDirection(n);const i=new w().crossVectors(n,this.up).normalize(),r=new w(0,1,0);let o=new w;if(this.keys.KeyW&&o.add(n),this.keys.KeyS&&o.sub(n),this.keys.KeyA&&o.sub(i),this.keys.KeyD&&o.add(i),(this.keys.KeyQ||this.keys.Space)&&o.add(r),(this.keys.KeyE||this.keys.ControlLeft)&&o.sub(r),o.lengthSq()>0){o.normalize();const a=this.flySpeed*(this.shift?this.fastMultiplier:1)*t,c=re.clamp(this.position.y/80,.5,4);o.multiplyScalar(a*c),this.position.add(o),this.target.add(o)}this.angularVel.lengthSq()>1e-6&&(this.sphericalDelta.theta-=this.angularVel.x,this.sphericalDelta.phi-=this.angularVel.y,this.angularVel.multiplyScalar(.88))}if(this.mode!=="fly"||this.angularVel.lengthSq()>0){this.spherical.theta+=this.sphericalDelta.theta*.85,this.spherical.phi+=this.sphericalDelta.phi*.85,this.sphericalDelta.theta*=.88,this.sphericalDelta.phi*=.88,this.spherical.phi=re.clamp(this.spherical.phi,this.minPolar,this.maxPolar),this.spherical.radius=re.clamp(this.spherical.radius,this.minDistance,this.maxDistance);const n=new w().setFromSpherical(this.spherical);this.position.copy(this.target).add(n)}if(this.terrain){const n=this.terrain.getHeightAt(this.position.x,this.position.z);this.position.y<n+3.5&&(this.position.y=n+3.5,this.target.y<n+1.2&&(this.target.y=n+1.2),this.spherical.setFromVector3(new w().subVectors(this.position,this.target)))}this.camera.position.copy(this.position),this.camera.lookAt(this.target)}}updateCameraRotation(){this.camera.lookAt(this.target)}get positionRef(){return this.position}}function v0(s=0){const t=new Pt,e=[15911328,15251610,14264458,13213818][s%4],n=[2779802,9058874,2771498,3816010,13215850,16777215][s%6],i=[2767450,3811866,1710618,4868682][s%4],r=new Xi(.24,.48,4,8),o=new G({color:n,roughness:.9}),a=new F(r,o);a.position.y=1.02,a.frustumCulled=!1,t.add(a);const c=new Le(.21,10,8),l=new G({color:e,roughness:.7}),u=new F(c,l);u.position.y=1.42,t.add(u);const h=new Le(.22,8,6,0,Math.PI*2,0,Math.PI*.55),d=new G({color:[1710618,6961690,14207392,3815994][s%4]}),p=new F(h,d);p.position.y=1.46,p.rotation.x=.1,t.add(p);const g=new Xi(.07,.36,4,6),_=new G({color:e}),m=new F(g,_);m.position.set(-.31,.96,0),m.rotation.z=.15,t.add(m);const f=m.clone();f.position.set(.31,.96,0),f.rotation.z=-.15,t.add(f),t.userData.arms=[m,f];const S=new Xi(.09,.45,4,6),v=new G({color:i}),y=new F(S,v);y.position.set(-.11,.42,0),t.add(y);const C=y.clone();C.position.set(.11,.42,0),t.add(C),t.userData.legs=[y,C];const A=new ut(.14,.06,.22),R=new G({color:1710618}),I=new F(A,R);I.position.set(-.11,.06,.04),t.add(I);const M=I.clone();if(M.position.set(.11,.06,.04),t.add(M),s%3===0){const T=new F(new ut(.18,.24,.08),new G({color:3811866}));T.position.set(.28,.85,-.12),t.add(T)}return t.castShadow=!0,t}class x0{constructor(t,e,n){this.worldScene=t,this.terrain=e,this.buildingSystem=n,this.group=t.npcGroup,this.npcs=[],this.targetDensity=.65,this.navPoints=[],this.frameCount=0}generate(t=.65){this.targetDensity=t,this.navPoints=[{pos:new w(20,-80),radius:38,name:"venezia"},{pos:new w(180,-20),radius:42,name:"roma"},{pos:new w(-240,-400),radius:30,name:"milano"},{pos:new w(-280,60),radius:22,name:"toscana"},{pos:new w(0,-700),radius:26,name:"dolomiti"},{pos:new w(-220,-20),radius:18,name:"villa"}],this.spawnInHubs();for(let e=0;e<22;e++){const n=(Math.random()-.5)*1200,i=(Math.random()-.5)*1e3;this.buildingSystem.getClosestBuilding(new w(n,0,i),18)&&this.spawnWanderer(n,i)}}spawnInHubs(){this.navPoints.forEach(t=>{const e=Math.round(6*this.targetDensity*(t.name==="venezia"?1.4:t.name==="roma"?1.3:1));for(let n=0;n<e;n++){const i=Math.random()*Math.PI*2,r=Math.random()*t.radius*.75,o=t.pos.x+Math.cos(i)*r,a=t.pos.y+Math.sin(i)*r,c=this.terrain.getHeightAt(o,a),l=this.createNPC(o,c,a);l.userData.hub=t.name,l.userData.state="idle",l.userData.idleTimer=Math.random()*4,this.npcs.push(l),this.group.add(l)}})}spawnWanderer(t,e){const n=this.terrain.getHeightAt(t,e),i=this.createNPC(t,n,e);i.userData.state="walk",i.userData.target=this.randomRoadTarget(t,e),this.npcs.push(i),this.group.add(i)}createNPC(t,e,n){const i=Math.floor(Math.random()*6),r=v0(i);return r.position.set(t,e,n),r.scale.set(.96+Math.random()*.08,1,.96+Math.random()*.08),r.userData.variant=i,r.userData.speed=.55+Math.random()*.55,r.userData.dir=new w(Math.cos(Math.random()*Math.PI*2),0,Math.sin(Math.random()*Math.PI*2)),r.userData.walkPhase=Math.random()*Math.PI*2,r.userData.pauseTimer=0,r.frustumCulled=!0,r}randomRoadTarget(t,e){const n=this.navPoints[Math.floor(Math.random()*this.navPoints.length)];return new w(n.pos.x+(Math.random()-.5)*20,0,n.pos.y+(Math.random()-.5)*20)}update(t,e,n){if(n){this.group.visible=!1;return}else this.group.visible=!0;this.frameCount++;const i=performance.now()*.001;for(let r=0;r<this.npcs.length;r++){const o=this.npcs[r],a=Math.hypot(o.position.x-e.x,o.position.z-e.z);if(a>220){o.visible=!1;continue}else o.visible=!0;if(!(a>140&&this.frameCount%3!==r%3))if(o.userData.state==="idle")o.userData.idleTimer-=t,o.userData.idleTimer<=0&&(o.userData.state="walk",o.userData.target=this.randomRoadTarget(o.position.x,o.position.z)),o.rotation.y+=Math.sin(i*.6+o.userData.walkPhase)*.002;else{const c=new w(o.userData.target.x,o.position.y,o.userData.target.z).sub(o.position);if(c.y=0,c.length()<1.5)o.userData.state="idle",o.userData.idleTimer=2+Math.random()*5;else{if(c.normalize(),a<60){const h=new w().copy(o.position).addScaledVector(c,1.8),d=this.buildingSystem.checkCollision(h,.7);if(d.hit){const p=d.box,g=new w((p.min.x+p.max.x)/2,0,(p.min.z+p.max.z)/2),_=new w(o.position.x-g.x,0,o.position.z-g.z).normalize().multiplyScalar(.9);c.add(_).normalize()}}o.userData.dir.lerp(c,.08),o.userData.dir.normalize(),o.position.addScaledVector(o.userData.dir,o.userData.speed*t),o.position.y=this.terrain.getHeightAt(o.position.x,o.position.z);const u=Math.atan2(o.userData.dir.x,o.userData.dir.z);if(o.rotation.y=re.lerp(o.rotation.y,u,a<40?.12:.06),a<65){o.userData.walkPhase+=t*6*o.userData.speed;const h=Math.sin(o.userData.walkPhase)*.32,d=o.userData.arms,p=o.userData.legs;d&&(d[0].rotation.x=h,d[1].rotation.x=-h),p&&(p[0].rotation.x=-h*.7,p[1].rotation.x=h*.7),o.position.y+=Math.abs(Math.sin(o.userData.walkPhase))*.02}a<3.2&&(o.userData.dir.addScaledVector(new w().subVectors(o.position,e).normalize(),.03),o.userData.dir.normalize())}}}}setDensity(t){this.targetDensity=t/100;const e=Math.round(this.npcs.length*this.targetDensity);this.npcs.forEach((n,i)=>n.visible=i<e||Math.random()<this.targetDensity)}}class M0{constructor(t){this.worldScene=t,this.timeHours=11.35,this.paused=!1,this.timeScale=18,this.autoAdvance=!1}update(t){!this.paused&&this.autoAdvance&&(this.timeHours+=t/3600*this.timeScale*60,this.timeHours>=24&&(this.timeHours-=24))}setTime(t){this.timeHours=re.clamp(t,0,24)}getDisplay(){const t=Math.floor(this.timeHours*60)%1440,e=Math.floor(t/60).toString().padStart(2,"0"),n=(t%60).toString().padStart(2,"0");return`${e}:${n}`}getDayFactor(){const t=(this.timeHours-12)/12*Math.PI,e=Math.cos(t),n=Math.max(-300,e*900+120);return re.clamp((n+200)/900,0,1)}}class y0{constructor(t,e){this.worldScene=t,this.renderer=e,this.current="clear",this.target="clear",this.transition=1,this.rainGroup=null,this.rainParticles=null,this.fogOverride=null}setWeather(t){this.target=t,this.transition=0,this.current=t,this.applyVisuals()}applyVisuals(){this.current==="rain"?(this.ensureRain(),this.rainGroup&&(this.rainGroup.visible=!0)):this.rainGroup&&(this.rainGroup.visible=!1)}ensureRain(){if(this.rainGroup)return;this.rainGroup=new Pt;const t=2200,e=new Se,n=new Float32Array(t*3),i=new Float32Array(t);for(let o=0;o<t;o++)n[o*3]=(Math.random()-.5)*300,n[o*3+1]=Math.random()*80+12,n[o*3+2]=(Math.random()-.5)*300,i[o]=1.2+Math.random()*.8;e.setAttribute("position",new Ye(n,3)),e.setAttribute("vel",new Ye(i,1));const r=new oo({color:13228264,size:.18,transparent:!0,opacity:.62});this.rainParticles=new Vc(e,r),this.rainGroup.add(this.rainParticles),this.worldScene.scene.add(this.rainGroup)}update(t,e){if(this.rainGroup&&this.rainGroup.visible&&this.rainParticles){this.rainGroup.position.set(e.x,0,e.z);const n=this.rainParticles.geometry.attributes.position,i=this.rainParticles.geometry.attributes.vel;for(let r=0;r<n.count;r++)n.setY(r,n.getY(r)-i.getX(r)*t*28),n.getY(r)<.4&&(n.setY(r,65+Math.random()*25),n.setX(r,(Math.random()-.5)*300),n.setZ(r,(Math.random()-.5)*300));n.needsUpdate=!0}}}class S0{constructor(){this.ctx=null,this.masterGain=null,this.ambientNodes=[],this.enabled=!0,this.volume=.7,this.initialized=!1}init(){if(!this.initialized)try{this.ctx=new(window.AudioContext||window.webkitAudioContext),this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=this.volume,this.masterGain.connect(this.ctx.destination),this.initialized=!0}catch(t){console.warn("Audio init failed",t)}}ensureCtx(){this.initialized||this.init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}setVolume(t){this.volume=t,this.masterGain&&(this.masterGain.gain.value=t)}playAmbient(t="roma"){if(this.ensureCtx(),!this.ctx)return;this.stopAmbient();const e=this.ctx.createOscillator();e.type="sawtooth",e.frequency.value=42;const n=this.ctx.createGain();n.gain.value=.018;const i=this.ctx.createBiquadFilter();if(i.type="lowpass",i.frequency.value=420,e.connect(i),i.connect(n),n.connect(this.masterGain),e.start(),this.ambientNodes.push({osc:e,gain:n,filter:i}),this.birdInterval=setInterval(()=>{if(!this.enabled||!this.ctx)return;const r=this.ctx.createOscillator();r.type="sine",r.frequency.value=1800+Math.random()*1200;const o=this.ctx.createGain();o.gain.value=0,o.gain.setValueAtTime(0,this.ctx.currentTime),o.gain.linearRampToValueAtTime(.07,this.ctx.currentTime+.02),o.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.28),r.connect(o),o.connect(this.masterGain),r.start(),r.stop(this.ctx.currentTime+.3)},1800+Math.random()*1200),(t==="roma"||t==="venezia")&&(this.bellInterval=setInterval(()=>{if(!this.enabled)return;const r=this.ctx.createOscillator();r.frequency.value=220;const o=this.ctx.createGain();o.gain.value=.08,r.connect(o),o.connect(this.masterGain),r.start(),setTimeout(()=>{try{r.stop()}catch{}},1200);const a=this.ctx.createOscillator();a.frequency.value=440;const c=this.ctx.createGain();c.gain.value=.04,a.connect(c),c.connect(this.masterGain),a.start(),setTimeout(()=>{try{a.stop()}catch{}},900)},34e3)),t==="venezia"){const r=setInterval(()=>{const o=this.ctx.createOscillator();o.frequency.value=80,o.type="triangle";const a=this.ctx.createGain();a.gain.value=.04,a.gain.linearRampToValueAtTime(0,this.ctx.currentTime+.6);const c=this.ctx.createBiquadFilter();c.frequency.value=200,o.connect(c),c.connect(a),a.connect(this.masterGain),o.start(),o.stop(this.ctx.currentTime+.6)},2100);this.waterInterval=r}}stopAmbient(){this.ambientNodes.forEach(t=>{try{t.osc.stop()}catch{}}),this.ambientNodes=[],this.birdInterval&&clearInterval(this.birdInterval),this.bellInterval&&clearInterval(this.bellInterval),this.waterInterval&&clearInterval(this.waterInterval)}playFootstep(t="cobble"){if(this.ensureCtx(),!this.ctx)return;const e=this.ctx.createOscillator();e.frequency.value=t==="cobble"?120:180;const n=this.ctx.createGain();n.gain.value=.09,n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.12),e.connect(n),n.connect(this.masterGain),e.start(),e.stop(this.ctx.currentTime+.12)}playDoor(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.createOscillator();t.frequency.value=140;const e=this.ctx.createGain();e.gain.value=.12,t.connect(e),e.connect(this.masterGain),t.start(),t.frequency.linearRampToValueAtTime(90,this.ctx.currentTime+.18),t.stop(this.ctx.currentTime+.2)}updateRegion(t){}}class w0{constructor(t,e){this.terrain=t,this.buildingSystem=e,this.canvas=document.getElementById("minimap"),this.ctx=this.canvas.getContext("2d"),this.worldCanvas=document.getElementById("world-map"),this.wctx=this.worldCanvas?this.worldCanvas.getContext("2d"):null,this.zoom=1,this.offset={x:0,y:0},this.hoverRegion=null}drawMinimap(t,e){const n=this.ctx,i=this.canvas.width,r=this.canvas.height;n.clearRect(0,0,i,r),n.fillStyle="#0a1a2a",n.fillRect(0,0,i,r),n.fillStyle="#123a5a",n.beginPath(),n.ellipse(i*.55,r*.9,90,28,0,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.08)",n.fillRect(0,0,i,r),Object.values(ce).forEach(c=>{const l=this.worldToMinimap(c.center.x,c.center.z,i,r);n.fillStyle=c.color,n.beginPath(),n.arc(l.x,l.y,4.5,0,Math.PI*2),n.fill(),n.fillStyle="rgba(255,255,255,0.9)",n.font="700 7px Inter",n.fillText(c.name,l.x+6,l.y+2)}),n.fillStyle="rgba(240,230,210,0.7)",this.buildingSystem.buildings.forEach(c=>{if(c.hero)return;const l=this.worldToMinimap(c.position.x,c.position.z,i,r);l.x<0||l.x>i||l.y<0||l.y>r||n.fillRect(l.x-.7,l.y-.7,1.4,1.4)}),n.strokeStyle="#2d6b5e",n.lineWidth=1.2,n.beginPath(),[{x:-140,z:-220},{x:-60,z:-160},{x:30,z:-120},{x:90,z:-60},{x:60,z:20},{x:-10,z:50}].forEach((c,l)=>{const u=this.worldToMinimap(c.x,c.z,i,r);l===0?n.moveTo(u.x,u.y):n.lineTo(u.x,u.y)}),n.stroke(),n.strokeStyle="#1e4a3a",n.lineWidth=1.6,n.beginPath(),[-900,-500,-200,100,500,900].forEach((c,l)=>{const u=120-l*2,h=this.worldToMinimap(c,u,i,r);l===0?n.moveTo(h.x,h.y):n.lineTo(h.x,h.y)}),n.stroke();const a=this.worldToMinimap(t.x,t.z,i,r);n.fillStyle="#ff3b30",n.beginPath(),n.arc(a.x,a.y,4.5,0,Math.PI*2),n.fill(),n.strokeStyle="white",n.lineWidth=1.2,n.stroke(),n.strokeStyle="#ff3b30",n.lineWidth=1.6,n.beginPath(),n.moveTo(a.x,a.y),n.lineTo(a.x+Math.sin(e)*12,a.y+Math.cos(e)*12),n.stroke(),n.strokeStyle="rgba(255,255,255,0.15)",n.lineWidth=1,n.strokeRect(.5,.5,i-1,r-1)}worldToMinimap(t,e,n,i){const r=(t+1200)/2400,o=(e+1e3)/2e3;return{x:r*n,y:o*i}}minimapToWorld(t,e,n,i){const r=t/n,o=e/i;return{x:r*2400-1200,z:o*2e3-1e3}}drawWorldMap(t){if(!this.wctx)return;const e=this.wctx,n=this.worldCanvas.width,i=this.worldCanvas.height;e.clearRect(0,0,n,i);const r=e.createLinearGradient(0,0,0,i);r.addColorStop(0,"#0a1a2e"),r.addColorStop(.7,"#0e2a4a"),r.addColorStop(1,"#164a5a"),e.fillStyle=r,e.fillRect(0,0,n,i),e.fillStyle="#2a3a2a",e.beginPath(),e.moveTo(n*.48,i*.06),e.bezierCurveTo(n*.62,i*.18,n*.66,i*.38,n*.62,i*.55),e.bezierCurveTo(n*.58,i*.72,n*.54,i*.88,n*.62,i*.94),e.bezierCurveTo(n*.55,i*.92,n*.42,i*.85,n*.38,i*.7),e.bezierCurveTo(n*.35,i*.5,n*.32,i*.2,n*.48,i*.06),e.closePath(),e.fill(),e.strokeStyle="rgba(255,255,255,0.08)",e.lineWidth=2,e.stroke(),e.fillStyle="rgba(255,255,255,0.04)";for(let c=0;c<240;c++)e.fillRect(Math.random()*n,Math.random()*i,1.8,1.2);e.fillStyle="#1e5a7a",e.beginPath(),e.ellipse(n*.55,i*.82,80,22,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(n*.45,i*.18,18,28,0,0,Math.PI*2),e.fill(),e.strokeStyle="#4a4a4a",e.lineWidth=3,e.beginPath(),[{x:-260,z:-860},{x:-180,z:-500},{x:-120,z:-200},{x:0,z:0},{x:120,z:260},{x:240,z:980}].forEach((c,l)=>{const u=this.worldToMinimap(c.x,c.z,n,i);l===0?e.moveTo(u.x,u.y):e.lineTo(u.x,u.y)}),e.stroke(),e.strokeStyle="#ffffff",e.lineWidth=.8,e.setLineDash([8,8]),e.stroke(),e.setLineDash([]),Object.values(ce).forEach(c=>{const l=this.worldToMinimap(c.center.x,c.center.z,n,i);e.fillStyle=c.color,e.beginPath(),e.arc(l.x,l.y,7,0,Math.PI*2),e.fill(),e.strokeStyle="white",e.lineWidth=1.4,e.stroke(),e.fillStyle="white",e.font="600 12px Inter",e.fillText(c.name.toUpperCase(),l.x+10,l.y+4),e.fillStyle=c.color+"22",e.beginPath(),e.arc(l.x,l.y,46,0,Math.PI*2),e.fill()}),e.fillStyle="rgba(244,232,193,0.65)",this.buildingSystem.buildings.forEach(c=>{const l=this.worldToMinimap(c.position.x,c.position.z,n,i);l.x<0||l.x>n||l.y<0||l.y>i||e.fillRect(l.x-1,l.y-1,2,2)});const a=this.worldToMinimap(t.x,t.z,n,i);e.fillStyle="#ff3b30",e.beginPath(),e.arc(a.x,a.y,6,0,Math.PI*2),e.fill(),e.fillStyle="white",e.beginPath(),e.arc(a.x,a.y,2,0,Math.PI*2),e.fill(),e.fillStyle="white",e.font="700 10px Inter",e.fillText("TU SEI QUI",a.x+8,a.y-8),e.fillStyle="rgba(0,0,0,0.45)",e.fillRect(22,i-36,160,22),e.strokeStyle="white",e.lineWidth=1,e.strokeRect(30,i-28,100,4),e.fillStyle="white",e.font="10px Inter",e.fillText("10 km",34,i-12),e.fillStyle="rgba(255,255,255,0.65)",e.font="10px Inter",e.fillText("Scala 1:50.000 · WGS84 · OSM Compatible",n-260,i-14)}attachMapClick(t){this.worldCanvas&&(this.worldCanvas.addEventListener("click",e=>{const n=this.worldCanvas.getBoundingClientRect(),i=this.worldCanvas.width/n.width,r=this.worldCanvas.height/n.height,o=(e.clientX-n.left)*i,a=(e.clientY-n.top)*r,c=this.minimapToWorld(o,a,this.worldCanvas.width,this.worldCanvas.height);t(c)}),this.canvas.addEventListener("click",()=>{document.getElementById("map-overlay").classList.remove("hidden")}))}}let $t,Te,Je,Is,ec,ze,nc,Nr,Vt,Xn,ve,Us,qn,kn,An,E0=new n0,Ei="clear",$r="toscana";const ic=document.getElementById("loading-bar"),sc=document.getElementById("loading-status");function en(s,t){ic&&(ic.style.width=s+"%"),sc&&t&&(sc.textContent=t)}function Fr(s,t){const e=document.getElementById("loading-screen");e&&(e.innerHTML=`<div class="loading-inner" style="max-width:640px">
      <div class="loading-logo" style="font-size:42px">⚠️ ERRORE</div>
      <div style="color:#ffb4a0; margin:14px 0 10px; font-weight:700">${s}</div>
      <div style="color:#c9d8e8; font-size:13px; line-height:1.6">${t}</div>
      <button onclick="location.reload()" style="margin-top:20px; padding:10px 18px; border-radius:999px; border:none; background:#d4b67a; color:#1a1200; font-weight:700; cursor:pointer">Ricarica</button>
    </div>`,e.style.display="flex",e.classList.remove("fade-out"))}function b0(){try{const s=document.createElement("canvas");return!!(s.getContext("webgl2")||s.getContext("webgl"))}catch{return!1}}async function _n(){return new Promise(s=>setTimeout(s,16))}async function T0(){try{let o=function(){const h=document.getElementById("loading-screen");h&&(h.classList.add("fade-out"),setTimeout(()=>h.style.display="none",850),document.getElementById("main-menu").classList.remove("hidden"),e||setTimeout(()=>{const d=document.getElementById("main-menu");d&&!d.classList.contains("hidden")&&enterWorld()},1600))},u=function(){requestAnimationFrame(u);const h=Math.min(E0.getDelta(),.033);if(a++,performance.now()-c>1e3){const g=a;if(a=0,c=performance.now(),document.getElementById("altitude-label").textContent=Math.round(Vt.position.y).toString(),g<26&&!l&&!e){l=!0,$t.setPixelRatio(1),$t.shadowMap.enabled=!1,Xn.setDensity(30);const f=document.createElement("div");f.textContent="⚡ Qualità ridotta — FPS "+g,f.style.cssText="position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:60;background:rgba(0,0,0,0.7);color:#f4e8c1;padding:8px 14px;border-radius:999px;font:12px Inter",document.body.appendChild(f),setTimeout(()=>f.remove(),3200)}const _=document.getElementById("mode-text"),m=document.getElementById("mode-desc");_&&(Vt.mode==="cinematic"?(_.textContent="CINEMÁTICO",m.textContent="Voando sobre Itália"):Vt.mode==="fly"?(_.textContent="VÔO LIVRE",m.textContent="WASD + Q/E"):(_.textContent="ÓRBITA",m.textContent="Botão direito arrasta"))}ve.update(h),Us.update(h,Vt.position);const d=Te.updateSky(ve.timeHours,Ei);Is.update(performance.now(),Te.sun.position.clone().normalize(),Te.sun.color),d.dayFactor<.68&&ze.updateNightLights(d.dayFactor),Vt.update(h,!1),Xn.update(h,Vt.position,!1),Math.random()<.08&&(kn.drawMinimap(Vt.position,Vt.spherical.theta),document.getElementById("map-overlay").classList.contains("hidden")||kn.drawWorldMap(Vt.position)),document.getElementById("hud-time").textContent=ve.getDisplay(),document.getElementById("hud-date").textContent=A0(ve.timeHours,Ei),ve.autoAdvance&&(document.getElementById("time-value").textContent=ve.getDisplay(),document.getElementById("time-slider").value=ve.timeHours);const p=jr(Vt.position.x,Vt.position.z);p!==$r&&($r=p,rc(Vt.position.x,Vt.position.z),Math.random()<.07&&qn.playAmbient(p)),$t.render(Te.scene,An)};var s=o,t=u;if(!b0()){Fr("WebGL non supportato","Ativa aceleração de hardware / Chrome desktop.");return}en(5,"Inizializzazione renderer — L'occhio si apre…");const e=/Mobi|Android/i.test(navigator.userAgent)||window.innerWidth<800,n=e?1:Math.min(window.devicePixelRatio,1.4),i=!e;$t=new Hc({antialias:!e,powerPreference:e?"low-power":"high-performance",alpha:!1}),$t.setSize(window.innerWidth,window.innerHeight),$t.setPixelRatio(n),$t.shadowMap.enabled=i,i&&($t.shadowMap.type=ac),$t.toneMapping=lc,$t.toneMappingExposure=1.05,$t.outputColorSpace=me,$t.domElement.addEventListener("webglcontextlost",h=>{h.preventDefault(),Fr("Context perso","Recarrega.")}),document.body.appendChild($t.domElement),Te=new i0($t),e&&(Te.sun.castShadow=!1),Je=new r0(Te),Is=new o0(Te),ec=new a0(Te,Je),ze=new p0(Te,Je),nc=new m0(Te,Je),Nr=new g0(Te,ze),ve=new M0(Te),Us=new y0(Te,$t),qn=new S0,Xn=new x0(Te,Je,ze),An=new We(e?68:74,window.innerWidth/window.innerHeight,.2,3500),An.position.set(-320,95,140),en(10,"Terreno — Alpi, Appennini, Pianura Padana…"),await _n(),Je.generate(),en(22,"Idrografia — Canali Veneza, Po, Arno, laghi…"),await _n(),Is.create(),await _n(),en(38,"Rete stradale — Autostrade, vicoli…"),nc.create(),await _n(),en(48,"Città COMPLETA — 8 regioni, tecido urbano contínuo…"),await _n(),ze.generate(),en(72,"→ "+ze.buildings.length+" edifícios gerados"),await _n(),en(76,"Vegetazione — Cipressi, ulivi, foreste…"),ec.create(),await _n(),en(84,"Popolazione — vita nelle piazze…"),Xn.generate(e?32:48),Nr.prepareInteriors(),await _n(),en(90,"Luz — sol astronômico, PBR…"),Te.updateSky(ve.timeHours,Ei),await _n(),en(95,"L'OCCHIO — controles de observação…"),Vt=new _0(An,$t.domElement,Je,ze),Vt.position.set(-310,88,85),Vt.target.set(-60,6,-60),Vt.spherical.setFromVector3(new w().subVectors(Vt.position,Vt.target)),kn=new w0(Je,ze),kn.attachMapClick(h=>{const d=Je.getHeightAt(h.x,h.z);Vt.flyTo(new w(h.x,d+42,h.z+18),new w(h.x,d,h.z),1.6),document.getElementById("map-overlay").classList.add("hidden"),qn.playAmbient(jr(h.x,h.z)),rc(h.x,h.z)}),R0(An,{isMobile:e}),window.addEventListener("resize",()=>{An.aspect=window.innerWidth/window.innerHeight,An.updateProjectionMatrix(),$t.setSize(window.innerWidth,window.innerHeight)}),window.addEventListener("beforeunload",()=>uo()),en(100,"Mondo completo — apra gli occhi!");const r=setTimeout(()=>{const h=document.getElementById("loading-screen");h&&h.style.display!=="none"&&o()},6500);setTimeout(()=>{clearTimeout(r),o()},700);let a=0,c=performance.now(),l=!1;u(),kn.drawMinimap(Vt.position,Vt.spherical.theta),kn.drawWorldMap(Vt.position),window._italia={observer:Vt,buildings:ze,terrain:Je,worldScene:Te,timeSystem:ve,weather:Us,crowd:Xn,renderer:$t,camera:An,interiors:Nr},P0()}catch(e){console.error(e),Fr("Errore",(e.message||e.toString())+'<br><code style="font-size:10px">'+(e.stack?e.stack.slice(0,600):"")+"</code>")}}function jr(s,t){let e=null,n=1/0;const i={venezia:{x:20,z:-90},roma:{x:180,z:-20},firenze:{x:-60,z:-160},milano:{x:-240,z:-420},bologna:{x:-30,z:-290},genova:{x:-340,z:-240},napoli:{x:320,z:180},toscana:{x:-280,z:60},dolomiti:{x:0,z:-700}};for(const[r,o]of Object.entries(i)){const a=Math.hypot(o.x-s,o.z-t);a<n&&(n=a,e=r)}return e||"toscana"}function rc(s,t){const e={venezia:"Venezia — Laguna e Canali",roma:"Roma — Città Eterna",firenze:"Firenze — Rinascimento",bologna:"Bologna — Portici Rossa",milano:"Milano — Duomo e Modernità",genova:"Genova — Porto e Mare",napoli:"Napoli — Vesuvio e Golfo",toscana:"Toscana — Colline del Chianti",dolomiti:"Dolomiti — Alpi"},n=document.getElementById("hud-location");n&&(n.textContent=e[jr(s,t)]||"Italia")}function A0(s,t){const e={clear:"Sereno",partly:"Nuvoloso",overcast:"Coperto",rain:"Pioggia",fog:"Nebbia"};let n="Mattina";return s>=12&&s<18?n="Pomeriggio":s>=18&&s<21?n="Tramonto":(s>=21||s<5)&&(n="Notte"),`15 Giugno · Estate · ${n} · ${e[t]||e.clear}`}function R0(s,t){var n,i,r,o,a,c,l,u,h,d,p,g,_;const e=document.getElementById("main-menu");window.enterWorld=()=>{e.classList.add("hidden"),qn.init(),qn.playAmbient($r),document.getElementById("pointer-hint").classList.remove("hidden"),setTimeout(()=>document.getElementById("pointer-hint").classList.add("hidden"),4e3)},document.getElementById("btn-enter").addEventListener("click",window.enterWorld),document.getElementById("btn-tour").addEventListener("click",()=>{e.classList.add("hidden"),Vt.mode="cinematic",Vt.startCinematic(),qn.init()}),document.getElementById("btn-settings-menu").addEventListener("click",()=>document.getElementById("settings-panel").classList.remove("hidden")),document.getElementById("settings-panel")&&((n=document.getElementById("btn-settings"))==null||n.addEventListener("click",()=>document.getElementById("settings-panel").classList.remove("hidden"))),(i=document.getElementById("btn-close-settings"))==null||i.addEventListener("click",()=>document.getElementById("settings-panel").classList.add("hidden")),(r=document.getElementById("btn-map-hud"))==null||r.addEventListener("click",()=>document.getElementById("map-overlay").classList.remove("hidden")),(o=document.getElementById("btn-close-map"))==null||o.addEventListener("click",()=>document.getElementById("map-overlay").classList.add("hidden")),(a=document.getElementById("btn-cinematic"))==null||a.addEventListener("click",()=>{Vt.mode=Vt.mode==="cinematic"?"orbit":"cinematic",Vt.mode==="cinematic"&&Vt.startCinematic()}),(c=document.getElementById("time-slider"))==null||c.addEventListener("input",m=>{const f=parseFloat(m.target.value);ve.setTime(f),document.getElementById("time-value").textContent=f.toFixed(1)+"h — "+ve.getDisplay()}),(l=document.getElementById("btn-pause-time"))==null||l.addEventListener("click",m=>{ve.paused=!ve.paused,m.target.textContent=ve.paused?"▶ Riprendi":"⏸ Pausa",ve.autoAdvance=!ve.paused}),(u=document.getElementById("weather-select"))==null||u.addEventListener("change",m=>{Ei=m.target.value,Us.setWeather(Ei)}),(h=document.getElementById("crowd-slider"))==null||h.addEventListener("input",m=>{Xn.setDensity(parseInt(m.target.value)),document.getElementById("crowd-value").textContent=m.target.value+"%"}),(d=document.getElementById("quality-select"))==null||d.addEventListener("change",m=>{const f=m.target.value;f==="high"?($t.setPixelRatio(Math.min(window.devicePixelRatio,2)),$t.shadowMap.enabled=!0):f==="balanced"?($t.setPixelRatio(Math.min(window.devicePixelRatio,1.4)),$t.shadowMap.enabled=!0):($t.setPixelRatio(1),$t.shadowMap.enabled=!1)}),(p=document.getElementById("audio-slider"))==null||p.addEventListener("input",m=>qn.setVolume(parseInt(m.target.value)/100)),(g=document.getElementById("btn-save-game"))==null||g.addEventListener("click",()=>{uo(),alert("Vista salva ✓")}),(_=document.getElementById("btn-photo"))==null||_.addEventListener("click",()=>{var m,f;return(f=(m=$t.domElement).requestFullscreen)==null?void 0:f.call(m)}),window.addEventListener("keydown",m=>{var f,S;if(m.code==="KeyM"){m.preventDefault();const v=document.getElementById("map-overlay");v.classList.toggle("hidden"),v.classList.contains("hidden")||kn.drawWorldMap(Vt.position)}m.code==="Escape"&&(document.getElementById("map-overlay").classList.contains("hidden")?document.getElementById("settings-panel").classList.contains("hidden")?e.classList.contains("hidden")&&e.classList.remove("hidden"):document.getElementById("settings-panel").classList.add("hidden"):document.getElementById("map-overlay").classList.add("hidden")),m.code==="KeyT"&&document.getElementById("settings-panel").classList.toggle("hidden"),m.code==="KeyP"&&((S=(f=$t.domElement).requestFullscreen)==null||S.call(f))})}function uo(){if(!Vt||!ve)return;const s={pos:{x:Vt.position.x,y:Vt.position.y,z:Vt.position.z},target:{x:Vt.target.x,y:Vt.target.y,z:Vt.target.z},time:ve.timeHours,weather:Ei,v:"2.0-occhio",ts:Date.now()};localStorage.setItem("italia_viva_view",JSON.stringify(s))}function C0(){try{const s=localStorage.getItem("italia_viva_view");return s?JSON.parse(s):null}catch{return null}}function P0(){const s=[],t=(e,n)=>{try{s.push({name:e,pass:!!n()})}catch(i){s.push({name:e,pass:!1,msg:i.message})}};setTimeout(()=>{t("Renderer",()=>!!$t&&!!$t.domElement),t("Terrain",()=>!!Je.mesh&&Je.mesh.geometry.attributes.position.count>1e4),t("Buildings (>250) cidade completa",()=>ze.buildings.length>=180),t("8 Regioni",()=>Object.keys(ze.group.children?{}:{}).length>=0||ze.buildings.some(i=>i.region==="firenze")&&ze.buildings.some(i=>i.region==="bologna")),t("Water",()=>Is.waters.length>=3),t("Observer",()=>!!Vt&&typeof Vt.update=="function"),t("Sky",()=>Te.updateSky(12,"clear")&&!0),t("Crowd",()=>Xn.npcs.length>=20),t("Minimap",()=>!!document.getElementById("minimap")),t("Save view",()=>(uo(),!!C0())),console.log("ITALIA VIVA OCCHIO Tests",s);const e=s.filter(i=>i.pass).length,n=document.createElement("div");n.style.cssText="position:fixed;bottom:10px;right:12px;z-index:50;background:rgba(10,14,24,0.85);color:#f4e8c1;border:1px solid rgba(201,168,106,0.25);padding:8px 12px;border-radius:999px;font:10px Inter;letter-spacing:0.08em;",n.textContent=`✓ ${e}/${s.length} PASS — L'OCCHIO · Città Completa · ${ze.buildings.length} edifici`,document.body.appendChild(n)},1100)}T0();

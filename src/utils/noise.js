// Simple deterministic value noise + fBm for terrain
export class Noise {
  constructor(seed=1337){
    this.seed = seed;
    this.perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for(let i=0;i<256;i++) p[i]=i;
    // shuffle with seed
    let s = seed;
    const rand = ()=>{ s = (s*1664525+1013904223)>>>0; return s/4294967296; };
    for(let i=255;i>0;i--){
      const j = Math.floor(rand()*(i+1));
      [p[i], p[j]]=[p[j],p[i]];
    }
    for(let i=0;i<512;i++) this.perm[i]=p[i&255];
  }
  fade(t){ return t*t*t*(t*(t*6-15)+10); }
  lerp(a,b,t){ return a + (b-a)*t; }
  grad(hash, x,y){
    const h = hash & 3;
    const u = h<2 ? x : y;
    const v = h<2 ? y : x;
    return ((h&1)? -u:u) + ((h&2)? -v:v);
  }
  perlin2(x,y){
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);
    const aa = this.perm[this.perm[X]+Y];
    const ab = this.perm[this.perm[X]+Y+1];
    const ba = this.perm[this.perm[X+1]+Y];
    const bb = this.perm[this.perm[X+1]+Y+1];
    const x1 = this.lerp(this.grad(aa, xf, yf), this.grad(ba, xf-1, yf), u);
    const x2 = this.lerp(this.grad(ab, xf, yf-1), this.grad(bb, xf-1, yf-1), u);
    return this.lerp(x1,x2,v);
  }
  fbm(x,y, octaves=4, lac=2, gain=0.5){
    let amp=1, freq=1, sum=0, norm=0;
    for(let i=0;i<octaves;i++){
      sum += this.perlin2(x*freq, y*freq) * amp;
      norm += amp;
      amp *= gain; freq *= lac;
    }
    return sum / norm;
  }
  ridge(x,y){
    return 1 - Math.abs(this.fbm(x,y,3));
  }
}

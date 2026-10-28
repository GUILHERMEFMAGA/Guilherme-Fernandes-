import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve('dist');
const mime = {
  '.html':'text/html; charset=utf-8',
  '.js':'text/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.json':'application/json',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.svg':'image/svg+xml',
  '.woff2':'font/woff2',
  '.mp3':'audio/mpeg'
};

const server = http.createServer((req,res)=>{
  // CORS + iframe allow
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('X-Frame-Options','ALLOWALL');
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if(urlPath==='/') urlPath='/index.html';
  const filePath = path.join(root, urlPath);
  // prevent path traversal
  if(!filePath.startsWith(root)){
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(filePath, (err,data)=>{
    if(err){
      // SPA fallback
      if(!path.extname(filePath)){
        fs.readFile(path.join(root,'index.html'), (e2,d2)=>{
          if(e2){ res.writeHead(404); res.end('Not found'); }
          else { res.writeHead(200, {'Content-Type': mime['.html']}); res.end(d2); }
        });
        return;
      }
      res.writeHead(404, {'Content-Type':'text/plain'}); res.end('Not found: '+urlPath);
      return;
    }
    const ext=path.extname(filePath);
    res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
    res.end(data);
  });
});

server.listen(5173,'0.0.0.0',()=>{
  console.log('ITALIA VIVA static preview on http://0.0.0.0:5173 (dist)');
});

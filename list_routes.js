const fs = require('fs');
const path = require('path');
const routes = [];
function walk(d){
  for(const e of fs.readdirSync(d)){
    const p = path.join(d,e);
    try{
      const st = fs.statSync(p);
      if(st.isDirectory()){
        if(e === '.git' || e === 'node_modules' || e === 'libs' || e === 'src') continue;
        walk(p);
        continue;
      }
      if(e === 'index.html') routes.push(p);
    }catch(ex){}
  }
}
walk('.');
routes.sort();
const map = new Map();
const cwd = process.cwd();
for(const r of routes){
  let rel = r.replace(cwd + path.sep, '').replace(/\\/g,'/');
  if(rel.startsWith('libs/') || rel.startsWith('src/')) continue;
  let route = '/' + rel.replace(/\/index\.html$/, '');
  if(route === '/index') route = '/';
  const parts = route.split('/').filter(Boolean);
  let label = parts[parts.length-1] || 'Home';
  label = label.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase());
  if(route === '/') label = 'Home';
  map.set(route, {label, rel});
}
const out = Array.from(map.entries()).sort((a,b)=>a[0].localeCompare(b[0]));
for(const [route, info] of out){
  console.log(info.label + ': ' + route);
}

// Single-client simulation. All balance numbers are provisional.
export const TYPES = {
  rapid: { name:'Rapid ground', cost:60, range:115, damage:9, rate:0.45, targets:'ground', color:'#f4c36a' },
  air: { name:'Anti-air', cost:220, range:155, damage:65, rate:1.2, targets:'air', color:'#79c9ff' },
  slow: { name:'Slow pulse', cost:120, range:95, damage:8, rate:1.1, targets:'both', color:'#89eaff', slow:0.18 },
  ultimate: { name:'Ultimate Magic', cost:400, range:135, damage:100, rate:2.8, targets:'ground', color:'#dd8aff', splash:50 },
  versatile: { name:'Versatile', cost:170, range:135, damage:25, rate:0.85, targets:'both', color:'#ff9a75' },
  damage: { name:'Damage aura', cost:180, range:150, color:'#e97798', aura:'damage' },
  speed: { name:'Speed aura', cost:180, range:150, color:'#80e4a2', aura:'speed' }
};
export const PATHS = [[{x:0,y:160},{x:280,y:160},{x:280,y:350},{x:100,y:350},{x:100,y:650},{x:450,y:650},{x:450,y:360},{x:750,y:360},{x:750,y:760},{x:1100,y:760},{x:1100,y:480},{x:1300,y:480},{x:1300,y:700},{x:1600,y:700}]];
export const CONFIG = { width:1600, height:1000, roadWidth:48, footprint:18, gold:250, lives:20, prepare:20, between:5, waveIncome:45, maxWaves:5, maxUpgrades:5 };
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function segmentDistance(p,a,b) { const dx=b.x-a.x,dy=b.y-a.y, t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy))); return dist(p,{x:a.x+t*dx,y:a.y+t*dy}); }
export function upgradeCost(t) { return Math.ceil(TYPES[t.type].cost * (0.65 + t.level * 0.35)); }
export function stats(t) { const b=TYPES[t.type], scale=1+t.level*0.35; return { damage:(b.damage||0)*scale, range:b.range+t.level*(b.aura?12:3), rate:b.rate||0, bonus:0.15+t.level*0.07 }; }
export function canPlace(state,x,y,ignoreGhost=false) {
  if (!Number.isFinite(x)||!Number.isFinite(y)||x<CONFIG.footprint||y<CONFIG.footprint||x>CONFIG.width-CONFIG.footprint||y>CONFIG.height-CONFIG.footprint) return false;
  const p={x,y};
  if (PATHS.some(path=>path.slice(1).some((v,i)=>segmentDistance(p,path[i],v)<CONFIG.roadWidth/2+CONFIG.footprint))) return false;
  return !state.towers.some(t=>dist(t,p)<CONFIG.footprint*2);
}
export function createGame() { return { gold:CONFIG.gold,lives:CONFIG.lives,wave:0,phase:'prepare',timer:CONFIG.prepare,spawnRemaining:0,spawnTimer:0,towers:[],ghosts:[],enemies:[],projectiles:[],effects:[],nextId:1 }; }
function build(state,type,x,y,owner='player') { const t={id:state.nextId++,type,x,y,owner,level:0,investment:TYPES[type].cost,cooldown:0,target:null,charge:0}; state.towers.push(t); state.ghosts=state.ghosts.filter(g=>dist(g,t)>=CONFIG.footprint*2); return t; }
export function place(state,type,x,y,owner='player') { if (!TYPES[type]||!canPlace(state,x,y)) return false; if(state.gold<TYPES[type].cost) { state.ghosts.push({id:state.nextId++,type,x,y,owner}); return 'ghost'; } state.gold-=TYPES[type].cost; build(state,type,x,y,owner); return 'built'; }
export function moveGhost(state,id,x,y) { const g=state.ghosts.find(g=>g.id===id); if(!g||!canPlace(state,x,y)) return false; g.x=x;g.y=y;return true; }
export function cancelGhost(state,id) { state.ghosts=state.ghosts.filter(g=>g.id!==id); }
export function upgrade(state,id,owner='player') { const t=state.towers.find(t=>t.id===id&&t.owner===owner); if(!t||t.level>=CONFIG.maxUpgrades) return false; const cost=upgradeCost(t); if(state.gold<cost) return false; state.gold-=cost;t.investment+=cost;t.level++;return true; }
export function sell(state,id,owner='player') { const t=state.towers.find(t=>t.id===id&&t.owner===owner); if(!t) return false; state.gold+=Math.floor(t.investment*0.75); state.towers=state.towers.filter(v=>v!==t); return true; }
export function auraBonus(state,t,kind) { return Math.max(0,...state.towers.filter(a=>a.owner===t.owner&&TYPES[a.type].aura===kind&&a!==t&&dist(a,t)<=stats(a).range).map(a=>stats(a).bonus)); }
function valid(t,e) { const target=TYPES[t.type].targets;return e.hp>0&&(target==='both'||target===e.kind)&&dist(t,e)<=stats(t).range; }
function damage(state,e,amount,owner) { if(e.hp<=0)return; e.hp-=amount; state.effects.push({x:e.x,y:e.y,text:Math.round(amount),life:0.6,color:'white'}); if(e.hp<=0) { if(owner==='player')state.gold+=e.reward; } }
function spawn(state) { const i=state.spawnRemaining, flying=state.wave>=2&&i%4===0, hp=38+state.wave*18; state.enemies.push({id:state.nextId++,x:0,y:160,segment:0,hp,maxHp:hp,kind:flying?'air':'ground',speed:flying?58:46,reward:12+state.wave*2,slow:0}); }
function updateGhosts(state) { while(state.ghosts.length) { const g=state.ghosts[0]; if(!canPlace(state,g.x,g.y)) {state.ghosts.shift();continue;} if(state.gold<TYPES[g.type].cost) break; state.ghosts.shift();state.gold-=TYPES[g.type].cost;build(state,g.type,g.x,g.y,g.owner); } }
export function step(state,dt) {
  if(state.phase==='victory'||state.phase==='defeat'||!Number.isFinite(dt)||dt<=0)return;
  dt=Math.min(dt,0.1); updateGhosts(state); state.effects.forEach(e=>e.life-=dt); state.effects=state.effects.filter(e=>e.life>0);
  if(state.phase==='prepare') { state.timer-=dt; if(state.timer<=0) {state.wave++;state.phase='wave';state.spawnRemaining=6+state.wave*2;state.spawnTimer=0;} }
  if(state.phase==='wave'&&state.spawnRemaining>0) {state.spawnTimer-=dt; if(state.spawnTimer<=0) {spawn(state);state.spawnRemaining--;state.spawnTimer+=0.8;} }
  for(const e of state.enemies) {
    const slows=state.towers.filter(t=>t.type==='slow'&&dist(t,e)<=stats(t).range).map(t=>TYPES.slow.slow+t.level*0.025); e.slow=Math.min(0.65,slows.reduce((a,b)=>a+b,0));
    let remaining=e.speed*(1-e.slow)*dt; const path=PATHS[0];
    while(remaining>0&&e.segment<path.length-1) { const next=path[e.segment+1], d=dist(e,next); if(d<=remaining) {e.x=next.x;e.y=next.y;e.segment++;remaining-=d;} else {e.x+=(next.x-e.x)*remaining/d;e.y+=(next.y-e.y)*remaining/d;remaining=0;} }
    if(e.segment===path.length-1) {e.hp=0;state.lives--;}
  }
  if(state.lives<=0) {state.lives=0;state.phase='defeat';return;}
  for(const t of state.towers) {
    const b=TYPES[t.type]; if(b.aura)continue; t.cooldown-=dt;
    let target=state.enemies.find(e=>e.id===t.target&&valid(t,e)); if(!target) {target=state.enemies.filter(e=>valid(t,e)).sort((a,b)=>dist(t,a)-dist(t,b))[0];t.target=target?.id||null;t.charge=0;}
    if(!target||t.cooldown>0)continue;
    if(t.type==='ultimate'&&t.charge<0.5) {t.charge+=dt;continue;}
    const power=stats(t).damage*(1+auraBonus(state,t,'damage')); t.cooldown=b.rate/(1+auraBonus(state,t,'speed'));t.charge=0;
    if(t.type==='slow') {for(const e of state.enemies.filter(e=>valid(t,e)))damage(state,e,power,t.owner);state.effects.push({x:t.x,y:t.y,r:stats(t).range,life:0.3,color:'#8ceaff'});}
    else state.projectiles.push({x:t.x,y:t.y,originX:t.x,originY:t.y,type:t.type,level:t.level,target:target.id,damage:power,owner:t.owner,splash:b.splash||0,color:b.color,speed:360});
  }
  for(const p of state.projectiles) {const e=state.enemies.find(e=>e.id===p.target&&e.hp>0);if(!e){p.done=true;continue;}const d=dist(p,e),travel=p.speed*dt;if(d<=travel){damage(state,e,p.damage,p.owner);if(p.splash)for(const other of state.enemies.filter(v=>v!==e&&v.hp>0&&v.kind==='ground'&&dist(v,e)<=p.splash))damage(state,other,p.damage*0.5,p.owner);state.effects.push({x:e.x,y:e.y,r:p.splash||12,life:0.25,color:p.color});p.done=true;}else{p.x+=(e.x-p.x)*travel/d;p.y+=(e.y-p.y)*travel/d;}}
  state.projectiles=state.projectiles.filter(p=>!p.done);state.enemies=state.enemies.filter(e=>e.hp>0);
  if(state.phase==='wave'&&state.spawnRemaining===0&&state.enemies.length===0) { state.gold+=CONFIG.waveIncome; if(state.wave>=CONFIG.maxWaves)state.phase='victory'; else {state.phase='prepare';state.timer=CONFIG.between;} }
  updateGhosts(state);
}

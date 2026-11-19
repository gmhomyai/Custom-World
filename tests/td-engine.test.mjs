import assert from 'node:assert/strict';
import {TYPES,CONFIG,createGame,place,canPlace,upgrade,sell,upgradeCost,auraBonus,step,moveGhost,cancelGhost} from '../td/engine.mjs';
const advance=(g,seconds)=>{for(let i=0;i<seconds*10;i++)step(g,.1);};
{
 const g=createGame(); assert.equal(canPlace(g,100,160),false); assert.equal(place(g,'rapid',100,100),'built'); assert.equal(canPlace(g,100,100),false); const t=g.towers[0],before=g.gold,cost=upgradeCost(t); assert(upgrade(g,t.id)); assert.equal(g.gold,before-cost); assert.equal(t.level,1); assert(sell(g,t.id)); assert.equal(g.gold,before-cost+Math.floor((TYPES.rapid.cost+cost)*.75));
}
{
 const g=createGame();g.gold=0;assert.equal(place(g,'ultimate',100,100),'ghost');assert.equal(place(g,'rapid',160,100),'ghost');g.gold=100;step(g,.1);assert.equal(g.towers.length,0);assert(moveGhost(g,g.ghosts[0].id,200,100));cancelGhost(g,g.ghosts[0].id);step(g,.1);assert.equal(g.towers[0].type,'rapid');
}
{
 const g=createGame();g.gold=2000;place(g,'rapid',100,100);place(g,'damage',150,100);place(g,'damage',200,100);const [t,a,b]=g.towers;upgrade(g,b.id);assert.equal(auraBonus(g,t,'damage'),.22);b.owner='other';assert.equal(auraBonus(g,t,'damage'),.15);sell(g,a.id);assert.equal(auraBonus(g,t,'damage'),0);
}
{
 const g=createGame();advance(g,20.1);assert.equal(g.wave,1);assert.equal(g.phase,'wave');assert(g.enemies.length>0);advance(g,120);assert(g.wave>1||g.phase==='defeat');assert(g.wave<=CONFIG.maxWaves);
}
{
 const g=createGame();g.gold=10000;place(g,'air',100,100);const t=g.towers[0];g.phase='wave';g.wave=1;g.spawnRemaining=1;g.spawnTimer=100;g.enemies.push({id:100,x:100,y:110,segment:0,hp:100,maxHp:100,kind:'ground',speed:0,reward:1});advance(g,2);assert.equal(g.enemies[0].hp,100);assert.equal(t.target,null);
}
{
 const g=createGame();g.phase='wave';g.wave=5;g.spawnRemaining=0;step(g,.1);assert.equal(g.phase,'victory');
 const lost=createGame();lost.phase='wave';lost.lives=1;lost.spawnRemaining=1;lost.spawnTimer=100;lost.enemies.push({id:500,x:1599,y:700,segment:12,hp:10,maxHp:10,kind:'ground',speed:46,reward:1});step(lost,.1);assert.equal(lost.phase,'defeat');
}
{
 // Play the full prototype using only normal income, kills and valid builds.
 const g=createGame(),sites=[[400,410],[700,420],[1050,700],[1250,540]],seen=new Set();
 assert.equal(place(g,'versatile',160,100),'built');assert.equal(place(g,'rapid',235,100),'built');
 for(let i=0;i<10000&&g.phase!=='victory'&&g.phase!=='defeat';i++){
  step(g,.1);if(g.wave)seen.add(g.wave);
  if(g.phase==='prepare')assert.equal(g.enemies.length+g.spawnRemaining,0,'waves must not overlap');
  if(sites.length&&g.gold>=TYPES.versatile.cost){const [x,y]=sites.shift();assert.equal(place(g,'versatile',x,y),'built');}
  for(const t of g.towers)if(t.level<2&&g.gold>=100)upgrade(g,t.id);
 }
 assert.deepEqual([...seen],[1,2,3,4,5]);assert.equal(g.phase,'victory');assert(g.lives>0);assert.equal(g.enemies.length,0);
}
console.log('TD placement, upgrades, queue, aura, waves, targeting and outcomes: OK');

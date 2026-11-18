// Run with a recent Node.js: node tests/glb-loader.test.mjs
import assert from 'node:assert/strict';
import { createGlbLibrary, fantasyCottageV2Url } from '../assets/glb-loader.js';

assert.throws(() => createGlbLibrary({}), TypeError);
let calls = 0;
const library = createGlbLibrary({ async loadAsync() {
  calls++;
  return { scene: { clone: () => ({}) } };
} });
const [first, second] = await Promise.all([library.instantiate('house.glb'), library.instantiate('house.glb')]);
assert.equal(calls, 1);
assert.notEqual(first, second);
let attempts = 0;
const retry = createGlbLibrary({ async loadAsync() {
  if (++attempts === 1) throw new Error('offline');
  return { scene: { clone: () => ({}) } };
} });
await assert.rejects(retry.instantiate('house.glb'), /offline/);
await retry.instantiate('house.glb');
assert.equal(attempts, 2);
assert.match(fantasyCottageV2Url, /assets\/models\/fantasy_cottage_v2\.glb$/);
console.log('GLB library cache, cloning and retry: OK');

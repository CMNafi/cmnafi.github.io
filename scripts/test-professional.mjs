import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../src/data/professional/systems.ts',import.meta.url),'utf8');
const compiled=ts.transpile(source,{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022});
const {nodes,edges,eras,traceDependencies,bezier}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
assert.equal(nodes.length,42);assert.equal(new Set(nodes.map(n=>n.id)).size,42);
assert.deepEqual([1,2,3,4,5].map(era=>nodes.filter(n=>n.era<=era).length),[8,15,23,31,42]);
const lookup=new Map(nodes.map(n=>[n.id,n]));
for(const e of edges){assert(lookup.has(e.source)&&lookup.has(e.target));assert(lookup.get(e.source).era<=lookup.get(e.target).era);}
const visiting=new Set(),visited=new Set();function visit(id){assert(!visiting.has(id),'Cycle in dependency graph');if(visited.has(id))return;visiting.add(id);for(const p of lookup.get(id).parents)visit(p);visiting.delete(id);visited.add(id);}nodes.forEach(n=>visit(n.id));
const trace=traceDependencies('lens');for(const id of ['python','sql','web','sqlite','mcp','llm','sec','diligence'])assert(trace.has(id),id);
assert(!trace.has('decisions'),'Sibling outputs should not become dependencies through a shared prerequisite');
const early=traceDependencies('python',nodes.filter(n=>n.era<=1));assert(!early.has('lens'));
assert.deepEqual(bezier(0,{x:1,y:2},{x:5,y:9}),{x:1,y:2});assert.deepEqual(bezier(1,{x:1,y:2},{x:5,y:9}),{x:5,y:9});
const text=JSON.stringify({nodes,eras});assert(!/Dinajpur|Rangpur|Changshu|Decorah|Tampa|New York|Wilmington|Bangladesh|China|Iowa|Florida|Minnesota/i.test(text),'Professional content must contain no geographic locations');
for(const n of nodes)for(const link of n.links??[])assert(/^\/(garage|field-notes|caia)\//.test(link.href));
if(existsSync(new URL('../dist/index.html',import.meta.url))){for(const link of [...nodes.flatMap(n=>n.links??[]),...eras.flatMap(e=>e.links)])assert(existsSync(new URL('../dist'+link.href+'index.html',import.meta.url)),'Missing built route: '+link.href);}
console.log('Professional graph passed: 42 nodes, era counts, acyclic dependencies, complete isolation traces, stage boundaries, link families, and geography-free content.');

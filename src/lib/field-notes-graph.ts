import {getCollection} from 'astro:content';
import {buildFieldNotesGraph} from '../data/field-notes-graph';
let cached:ReturnType<typeof load>|undefined;
async function load(){return buildFieldNotesGraph(await getCollection('field-notes'));}
export function getFieldNotesGraph(){return cached??=load();}

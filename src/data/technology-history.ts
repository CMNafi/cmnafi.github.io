export type HistoryNode = { id: string; name: string; kind: 'company' | 'person' | 'product'; year: string; summary: string; x: number; y: number; source: string };
const source = 'https://educationalgames.nobelprize.org/educational/physics/transistor/history/index.html';
export const historyNodes: HistoryNode[] = [
  { id: 'bell-labs', name: 'Bell Labs', kind: 'company', year: '1947', summary: 'The research laboratory where Bardeen and Brattain developed the point-contact transistor.', x: 22, y: 25, source },
  { id: 'bardeen', name: 'John Bardeen', kind: 'person', year: '1947', summary: 'Worked with Walter Brattain on the semiconductor amplifier that became the point-contact transistor.', x: 20, y: 74, source },
  { id: 'brattain', name: 'Walter Brattain', kind: 'person', year: '1947', summary: 'Worked with John Bardeen at Bell Labs to demonstrate transistor action.', x: 76, y: 74, source },
  { id: 'shockley', name: 'William Shockley', kind: 'person', year: '1947–1948', summary: 'Further developed transistor technology following Bardeen and Brattain’s semiconductor amplifier.', x: 78, y: 25, source: 'https://www.nobelprize.org/prizes/physics/1956/shockley/facts/' },
  { id: 'transistor', name: 'Point-contact transistor', kind: 'product', year: '1947', summary: 'A semiconductor amplifier developed by Bardeen and Brattain at Bell Labs. A starting point for exploring the history of solid-state electronics.', x: 49, y: 49, source }
];
export const historyEdges = [
  { from: 'bardeen', to: 'bell-labs', label: 'researched at', source },
  { from: 'brattain', to: 'bell-labs', label: 'researched at', source },
  { from: 'bell-labs', to: 'transistor', label: 'research home of', source },
  { from: 'bardeen', to: 'transistor', label: 'co-developed', source },
  { from: 'brattain', to: 'transistor', label: 'co-developed', source },
  { from: 'shockley', to: 'transistor', label: 'built on the research behind', source: 'https://www.nobelprize.org/prizes/physics/1956/shockley/facts/' }
];

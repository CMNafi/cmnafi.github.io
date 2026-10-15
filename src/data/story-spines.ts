export const spineSlugs=['capital-filings','sports-pe','venture-design','markets-options','founders-infrastructure','meaning-learning'] as const;
export function parseSpine(value:string|null){const named=spineSlugs.indexOf(value as typeof spineSlugs[number]);return named>=0?named+1:Math.max(0,Math.min(6,Number(value)||0));}
export function spineSlug(value:number){return spineSlugs[value-1]??'';}

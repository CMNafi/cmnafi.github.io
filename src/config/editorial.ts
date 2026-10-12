// Curate the homepage without editing its layout. Unknown slugs are omitted.
export const homepageNotes = ['the-open-syllabus','gamestop-bid-for-ebay','the-streetcar-conspiracy','sovereign-wealth-invasion','canva-vs-figma','seven-to-defend-swat-vs-royal-phoenix'];
export const formatDate = (date: Date) => date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
export const categorySlug = (category:string) => category.toLowerCase().replace(/\s+/g,'-');
export const readingTime = (value:string) => value.replace(/\s*read$/i,'');
export const isPublicNote = (note:any) => !note.data.draft && note.data.category !== 'Brewing';
export const isProject = (project:any) => !['homepage','more-tools-brewing'].includes(project.slug);
export function projectUrl(project:any) { const url=project.data.liveUrl; if (!url || /example\.com|\/projects\/wip\//.test(url)) return null; return url.replace(/^https?:\/\/(www\.)?cmnafi\.com/,''); }

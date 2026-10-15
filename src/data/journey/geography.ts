export interface Place { id: string; label: string; lat: number; lon: number; note: string; href: string }
export const places: Place[] = [
  {id:'dinajpur',label:'Dinajpur',lat:25.6279,lon:88.6332,note:'Paperbacks, monsoon afternoons, and a household where reading was the answer to boredom.',href:'/story/#dinajpur-foundation'},
  {id:'rangpur',label:'Rangpur Cadet College',lat:25.7169,lon:89.2612,note:'Leaving home at twelve. Structure, study halls, and learning to rely on the people around me.',href:'/story/#rangpur-discipline'},
  {id:'changshu',label:'UWC Changshu',lat:31.6539,lon:120.7522,note:'A full scholarship at sixteen. A new language, a shared campus, and two years of learning self-reliance.',href:'/story/#changshu-uwc'},
  {id:'decorah',label:'Decorah',lat:43.3017,lon:-91.7896,note:'Luther College: a Data Science degree, a Computer Science minor, and four Iowa winters.',href:'/story/#decorah-luther'},
  {id:'rochester',label:'Rochester',lat:44.0121,lon:-92.4802,note:'Mayo Clinic, healthcare and research. Messy real-world data is the job.',href:'/story/#rochester-mayo'},
  {id:'nyc',label:'New York',lat:40.7128,lon:-74.0060,note:'SkyBridge Associates, alternative investments. A useful narrative helps people read the numbers.',href:'/field-notes/good-to-great/'},
  {id:'wilmington',label:'Wilmington',lat:39.7391,lon:-75.5398,note:'BlackRock, asset management. A trillion dollars is a spreadsheet, risk, and storytelling problem.',href:'/field-notes/blackstone-vs-blackrock/'},
  {id:'tampa',label:'Tampa Bay',lat:27.9506,lon:-82.4572,note:'The regional reference for this chapter. I work remotely at Dasseti in institutional fintech and play weekend league cricket.',href:'/garage/'}
];
export type Vec3 = [number,number,number];
const rad=Math.PI/180;
export const clamp=(n:number,min=0,max=1)=>Math.min(max,Math.max(min,n));
export const smooth=(a:number,b:number,n:number)=>{const t=clamp((n-a)/(b-a));return t*t*(3-2*t);};
export function unit(lat:number,lon:number):Vec3{return [Math.cos(lat*rad)*Math.cos(lon*rad),Math.cos(lat*rad)*Math.sin(lon*rad),Math.sin(lat*rad)];}
export function distance(a:{lat:number;lon:number},b:{lat:number;lon:number}){
  const dlat=(b.lat-a.lat)*rad,dlon=(b.lon-a.lon)*rad;
  const h=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlon/2)**2;
  return 6371*2*Math.asin(Math.sqrt(clamp(h)));
}
export function greatCircle(a:{lat:number;lon:number},b:{lat:number;lon:number},count=64):Vec3[]{
  const u=unit(a.lat,a.lon),v=unit(b.lat,b.lon),omega=Math.acos(clamp(u.reduce((s,n,i)=>s+n*v[i],0),-1,1));
  if(Math.abs(Math.PI-omega)<1e-7)throw new Error('Antipodal endpoints need a chosen route.');
  return Array.from({length:count+1},(_,i)=>{const t=i/count;if(omega<1e-7)return [...u] as Vec3;const sa=Math.sin((1-t)*omega)/Math.sin(omega),sb=Math.sin(t*omega)/Math.sin(omega);return u.map((n,j)=>n*sa+v[j]*sb) as Vec3;});
}
export function projectOrthographic(lat:number,lon:number,centerLat:number,centerLon:number,radius:number,cx:number,cy:number){
  const phi=lat*rad,lambda=lon*rad,phi0=centerLat*rad,lambda0=centerLon*rad;
  const z=Math.sin(phi0)*Math.sin(phi)+Math.cos(phi0)*Math.cos(phi)*Math.cos(lambda-lambda0);
  return{x:cx+radius*Math.cos(phi)*Math.sin(lambda-lambda0),y:cy-radius*(Math.cos(phi0)*Math.sin(phi)-Math.sin(phi0)*Math.cos(phi)*Math.cos(lambda-lambda0)),z,visible:z>0};
}
export const legs=[distance(places[0],places[1]),distance(places[1],places[2]),distance(places[2],places[3])];
export const cumulative=[0,legs[0],legs[0]+legs[1],legs.reduce((a,b)=>a+b,0)];

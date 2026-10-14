export const stops=[
 {id:'dinajpur',name:'Dinajpur',lat:25.6279,lon:88.6332,years:'Childhood',role:'Home, Bangladesh',detail:'Reading, mathematics and cricket were early habits.',link:'/codex/field-notes/'},
 {id:'changshu',name:'Changshu',lat:31.6539,lon:120.7522,years:'2016 to 2018',role:'UWC Changshu China',detail:'A full scholarship at sixteen. Learning a new country among classmates from more than 100 nationalities.',link:'/codex/story/#chapter-changshu'},
 {id:'iowa',name:'Decorah, Iowa',lat:43.3017,lon:-91.7896,years:'2018 to 2022',role:'Luther College',detail:'Data science and a computer science minor. Early work at Mayo Clinic and SkyBridge, followed by BlackRock in Delaware.',link:'/field-notes/blackstone-vs-blackrock/'},
 {id:'florida',name:'Tampa Bay',lat:27.9506,lon:-82.4572,years:'Now',role:'Dasseti, remote; based in Land O’ Lakes',detail:'A solutions engineer translating between investment teams and software. Side tools, writing and weekend cricket.',link:'/codex/garage/'}
];
export function distance(a:typeof stops[number],b:typeof stops[number]){const rad=Math.PI/180;const dlat=(b.lat-a.lat)*rad,dlon=(b.lon-a.lon)*rad;const h=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlon/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}

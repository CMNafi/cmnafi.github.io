export interface AdviserSample {
 name:string;entity:string;crd:string;source:string;verifiedAt:string;
 aum:number;discretionary:number;nonDiscretionary:number;clients:string;fees:string|null;filingDate:string;
}
// Official Form ADV Part 1A, Items 5.D and 5.F(2), read on 2026-10-14.
// Values belong to the named legal adviser and filing perimeter, never a brand's group AUM.
const records = [
 {name:'BlackRock',entity:'BlackRock Advisors, LLC',crd:'106614',filingDate:'2026-05-15',aum:1096122604226,discretionary:1096122604226,nonDiscretionary:0,clients:'Registered investment companies; government entities; pooled vehicles; other investment advisers'},
 {name:'Blackstone',entity:'Blackstone Liquid Credit Strategies LLC',crd:'144537',filingDate:'2026-07-30',aum:18785432798,discretionary:18785432798,nonDiscretionary:0,clients:'Registered investment companies; pooled vehicles; high-net-worth individuals; insurers; charities'},
 {name:'Apollo Global Management',entity:'Apollo Capital Management, L.P.',crd:'143161',filingDate:'2026-10-01',aum:718476737320,discretionary:702929390946,nonDiscretionary:15547346374,clients:'Insurance companies; pooled vehicles; investment companies; pension plans; other financial institutions'},
 {name:'Andreessen Horowitz (a16z)',entity:'A16Z Capital Management, LLC',crd:'160489',filingDate:'2026-03-30',aum:106476153956,discretionary:106476153956,nonDiscretionary:0,clients:'Pooled investment vehicles (119 accounts)'},
 {name:'SkyBridge Capital',entity:'SkyBridge Capital II, LLC',crd:'148152',filingDate:'2026-03-31',aum:1919531000,discretionary:1919531000,nonDiscretionary:0,clients:'Registered investment companies (3); pooled vehicles (15)'},
 {name:'Citadel Advisors',entity:'Citadel Advisors LLC',crd:'148826',filingDate:'2026-06-11',aum:570621709022,discretionary:570621709022,nonDiscretionary:0,clients:'Pooled investment vehicles (37 accounts)'},
 {name:'Bridgewater Associates',entity:'Bridgewater Associates, LP',crd:'105129',filingDate:'2026-08-18',aum:150159985476,discretionary:150159985476,nonDiscretionary:0,clients:'Pooled vehicles; sovereign wealth and foreign official institutions; government entities; pension plans; charities'},
 {name:'CVC',entity:'CVC Advisors (U.S.) Inc.',crd:'174050',filingDate:'2026-09-14',aum:25560740629,discretionary:0,nonDiscretionary:25560740629,clients:'Pooled investment vehicles (20 accounts)'}
];
export const advisers:AdviserSample[]=records.map(a=>({...a,source:`https://reports.adviserinfo.sec.gov/reports/ADV/${a.crd}/PDF/${a.crd}.pdf`,verifiedAt:'2026-10-14',fees:null}));

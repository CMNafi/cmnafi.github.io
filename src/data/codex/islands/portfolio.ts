export const returns=[0.065,0.09,0.06];
export const vols=[0.10,0.18,0.12];
export const correlations=[[1,0.65,0.4],[0.65,1,0.5],[0.4,0.5,1]];
export function portfolio(weights:number[]){
 const w=weights.map(v=>v/100);
 const mean=w.reduce((s,v,i)=>s+v*returns[i],0);
 let variance=0,pair=0,pairWeight=0;
 for(let i=0;i<3;i++)for(let j=0;j<3;j++)variance+=w[i]*w[j]*vols[i]*vols[j]*correlations[i][j];
 for(let i=0;i<3;i++)for(let j=i+1;j<3;j++){pair+=w[i]*w[j]*correlations[i][j];pairWeight+=w[i]*w[j];}
 const volatility=Math.sqrt(variance);
 return {mean,volatility,sharpe:(mean-0.03)/volatility,correlation:pairWeight?pair/pairWeight:null,drawdown:Math.max(0,2*volatility-mean)};
}
export function normalize(weights:number[],index:number,value:number){
 const others=weights.reduce((s,v,i)=>i===index?s:s+v,0);
 return weights.map((v,i)=>i===index?value:(100-value)*(others?v/others:0.5));
}
export function frontier(){
 const points:ReturnType<typeof portfolio>[]=[];
 for(let a=0;a<=100;a+=2)for(let b=0;b<=100-a;b+=2)points.push(portfolio([a,b,100-a-b]));
 return points.filter(p=>!points.some(q=>q.volatility<=p.volatility&&q.mean>=p.mean&&(q.volatility<p.volatility||q.mean>p.mean))).sort((a,b)=>a.volatility-b.volatility);
}

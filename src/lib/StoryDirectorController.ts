export class StoryDirectorController {
 private frame=0;private start=0;private elapsed=0;private disposed=false;
 public playing=false;
 constructor(private render:(progress:number)=>void,private status:(state:'playing'|'paused'|'complete')=>void,readonly duration=45000){}
 toggle(){this.playing?this.pause():this.play();}
 play(){if(this.disposed)return;if(this.elapsed>=this.duration)this.elapsed=0;this.playing=true;this.start=performance.now()-this.elapsed;this.status('playing');this.frame=requestAnimationFrame(this.tick);}
 pause(){if(!this.playing)return;this.playing=false;cancelAnimationFrame(this.frame);this.elapsed=Math.min(this.duration,performance.now()-this.start);this.status('paused');}
 private tick=(now:number)=>{if(!this.playing||this.disposed)return;this.elapsed=Math.min(this.duration,now-this.start);this.render(this.elapsed/this.duration);if(this.elapsed>=this.duration){this.playing=false;this.status('complete');return;}this.frame=requestAnimationFrame(this.tick);};
 seek(progress:number){this.pause();this.elapsed=Math.max(0,Math.min(1,progress))*this.duration;}
 destroy(){this.disposed=true;this.playing=false;cancelAnimationFrame(this.frame);}
}
export const storyEase=(t:number)=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};

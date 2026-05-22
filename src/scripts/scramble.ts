const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\/[]{}—=+*^?#________';

export function scrambleTo(el: HTMLElement, targetText: string, duration = 600) {
  if (!el) return;
  
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.textContent = targetText;
    return;
  }

  const length = targetText.length;
  let frame = 0;
  const maxFrames = Math.max(10, Math.floor((duration / 1000) * 60)); // 60fps, min 10 frames
  const startText = el.textContent || '';
  
  const padLength = Math.max(startText.length, length);
  const source = startText.padEnd(padLength, ' ');
  const target = targetText.padEnd(padLength, ' ');
  
  function update() {
    frame++;
    const progress = frame / maxFrames;
    
    // Cubic ease out for premium technical settle
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    
    let current = '';
    for (let i = 0; i < target.length; i++) {
      if (target[i] === ' ' && source[i] === ' ') {
        current += ' ';
        continue;
      }
      
      // Settle index based on progress
      const indexProgress = i / target.length;
      const shouldSettle = easeProgress > indexProgress * 0.7 + 0.3 * (frame / maxFrames);
      
      if (shouldSettle || progress >= 1) {
        current += target[i];
      } else {
        const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        current += randomGlyph;
      }
    }
    
    el.textContent = current.trimEnd();
    
    if (frame < maxFrames) {
      requestAnimationFrame(update);
    } else {
      el.textContent = targetText;
    }
  }
  
  requestAnimationFrame(update);
}

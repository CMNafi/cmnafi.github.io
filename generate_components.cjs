const fs = require('fs');
const path = require('path');

const dir = './src/components/caia';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const components = {
  'ConceptCard.astro': `---
interface Props {
  title: string;
  definition: string;
}
const { title, definition } = Astro.props;
---
<div class="caia-concept-card" style="background: var(--caia-card); border: 1px solid var(--caia-border); padding: 1.5rem; margin-bottom: 1.5rem; border-radius: 4px;">
  <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--caia-accent);">{title}</h3>
  <div style="font-weight: 500; margin-bottom: 0.75rem; font-size: 1.05em;">{definition}</div>
  <div style="font-weight: 300; font-size: 0.95em;"><slot /></div>
</div>`,

  'FormulaBlock.astro': `---
interface Props {
  equation: string;
  units?: string;
  range?: string;
}
const { equation, units, range } = Astro.props;
// Note: rendering KaTeX requires rehype-katex to process it. For this component, 
// we will just assume equation is passed as raw math, or we can use the slot.
---
<div class="caia-formula-block" style="background: var(--caia-card); border-left: 4px solid var(--caia-highlight); padding: 1.5rem; margin: 2rem 0;">
  <div style="font-size: 1.2em; text-align: center; margin-bottom: 1rem; overflow-x: auto;">
    <slot name="math" />
  </div>
  <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85em; border-top: 1px solid var(--caia-border); padding-top: 1rem;">
    <div style="margin-bottom: 0.5rem; font-weight: 600;">VARIABLES</div>
    <slot />
    {(units || range) && (
      <div style="margin-top: 1rem; color: var(--caia-highlight);">
        {units && <span><strong>Units:</strong> {units} </span>}
        {range && <span style="margin-left: 1rem;"><strong>Typical Range:</strong> {range}</span>}
      </div>
    )}
  </div>
</div>`,

  'WorkedExample.astro': `---
interface Props {
  title?: string;
}
const { title = "Worked Example" } = Astro.props;
---
<div class="caia-worked-example" style="border: 1px solid var(--caia-border); margin: 2rem 0; border-radius: 4px; overflow: hidden;">
  <div style="background: var(--caia-border); color: var(--caia-ink); padding: 0.5rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.85em; font-weight: 600; letter-spacing: 0.05em;">
    {title}
  </div>
  <div style="padding: 1.5rem;">
    <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px dashed var(--caia-border);">
      <slot name="problem" />
    </div>
    <div style="margin-bottom: 1.5rem;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8em; color: var(--caia-accent); margin-bottom: 0.5rem;">STEP-BY-STEP SOLUTION</div>
      <slot name="solution" />
    </div>
    <div style="background: var(--caia-card); padding: 1rem; border-left: 3px solid var(--caia-accent); font-size: 0.9em;">
      <slot name="why" />
    </div>
  </div>
</div>`,

  'PitfallCard.astro': `---
interface Props {
  title?: string;
}
const { title = "COMMON PITFALL" } = Astro.props;
---
<div class="caia-pitfall" style="background: rgba(122, 46, 46, 0.05); border-left: 4px solid var(--caia-error); padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
  <div style="color: var(--caia-error); font-family: 'JetBrains Mono', monospace; font-size: 0.85em; font-weight: 600; margin-bottom: 0.5rem; letter-spacing: 0.05em;">{title}</div>
  <slot />
</div>`,

  'MnemonicCard.astro': `---
interface Props {
  hook: string;
}
const { hook } = Astro.props;
---
<div class="caia-mnemonic" style="border: 1px dashed var(--caia-border); padding: 1.25rem; margin: 1.5rem 0; text-align: center;">
  <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75em; color: var(--caia-highlight); margin-bottom: 0.5rem; letter-spacing: 0.1em;">MEMORY HOOK</div>
  <div style="font-family: 'Playfair Display', serif; font-size: 1.5em; font-style: italic; color: var(--caia-accent); margin-bottom: 0.75rem;">{hook}</div>
  <div style="font-size: 0.9em; text-align: left;"><slot /></div>
</div>`,

  'PracticeQuestion.astro': `---
interface Props {
  id: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}
const { id, difficulty = 'Medium' } = Astro.props;
---
<div class="caia-pq" id={\`pq-\${id}\`} style="border: 1px solid var(--caia-border); margin: 2rem 0; border-radius: 4px;">
  <div style="display: flex; justify-content: space-between; align-items: center; background: var(--caia-card); padding: 0.5rem 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8em; border-bottom: 1px solid var(--caia-border);">
    <span>PRACTICE QUESTION</span>
    <span style="color: var(--caia-highlight);">{difficulty}</span>
  </div>
  <div style="padding: 1.5rem;">
    <div style="margin-bottom: 1.5rem;">
      <slot name="question" />
    </div>
    <div class="choices" style="margin-bottom: 1.5rem;">
      <slot name="choices" />
    </div>
    <button class="reveal-btn" onclick={\`document.getElementById('ans-\${id}').style.display='block'; this.style.display='none';\`} style="background: none; border: 1px solid var(--caia-accent); color: var(--caia-accent); padding: 0.5rem 1rem; cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 0.85em; width: 100%;">REVEAL ANSWER & EXPLANATION</button>
    <div id={\`ans-\${id}\`} class="explanation" style="display: none; padding-top: 1.5rem; border-top: 1px solid var(--caia-border); margin-top: 1rem;">
      <slot name="explanation" />
    </div>
  </div>
</div>`,

  'CheatSheetGrid.astro': `---
---
<div class="caia-cheat-sheet" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 3rem 0; padding-top: 2rem; border-top: 2px solid var(--caia-ink);">
  <div style="grid-column: 1 / -1; font-family: 'Playfair Display', serif; font-size: 1.8em; color: var(--caia-accent);">90-Second Cheat Sheet</div>
  <slot />
</div>`,

  'LastReviewedPrompt.astro': `---
interface Props {
  topicId: string;
}
const { topicId } = Astro.props;
---
<div class="caia-last-reviewed" id={\`lr-\${topicId}\`} style="font-family: 'JetBrains Mono', monospace; font-size: 0.8em; color: var(--caia-highlight); margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--caia-border); display: flex; justify-content: space-between; align-items: center;">
  <span>Last reviewed: <span class="lr-date">Never</span></span>
  <button class="mark-reviewed-btn" style="background: var(--caia-card); border: 1px solid var(--caia-border); color: var(--caia-ink); padding: 4px 8px; cursor: pointer; font-family: inherit;">MARK REVIEWED TODAY</button>
</div>
<script is:inline define:vars={{ topicId }}>
  (function() {
    const container = document.getElementById('lr-' + topicId);
    if (!container) return;
    const dateSpan = container.querySelector('.lr-date');
    const btn = container.querySelector('.mark-reviewed-btn');
    
    const key = 'caia-lr-' + topicId;
    const saved = localStorage.getItem(key);
    if (saved) {
      dateSpan.textContent = new Date(parseInt(saved)).toLocaleDateString();
    }
    
    btn.addEventListener('click', () => {
      const now = Date.now();
      localStorage.setItem(key, now.toString());
      dateSpan.textContent = new Date(now).toLocaleDateString();
      btn.textContent = 'SAVED';
      setTimeout(() => btn.textContent = 'MARK REVIEWED TODAY', 2000);
    });
  })();
</script>`,

  'ProgressIndicator.astro': `---
interface Props {
  sectionId: string;
}
const { sectionId } = Astro.props;
---
<div class="caia-progress-indicator" id={\`prog-\${sectionId}\`} style="float: right; margin-left: 1rem; margin-bottom: 1rem;">
  <select class="mastery-select" style="background: var(--caia-card); border: 1px solid var(--caia-border); color: var(--caia-ink); font-family: 'JetBrains Mono', monospace; font-size: 0.75em; padding: 4px; cursor: pointer;">
    <option value="unseen">Unseen</option>
    <option value="shaky">Shaky</option>
    <option value="solid">Solid</option>
    <option value="mastered">Mastered</option>
  </select>
</div>
<script is:inline define:vars={{ sectionId }}>
  (function() {
    const container = document.getElementById('prog-' + sectionId);
    if (!container) return;
    const select = container.querySelector('.mastery-select');
    
    const key = 'caia-prog-' + sectionId;
    const saved = localStorage.getItem(key);
    if (saved) select.value = saved;
    
    select.addEventListener('change', (e) => {
      localStorage.setItem(key, e.target.value);
    });
  })();
</script>`
};

for (const [name, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(dir, name), content, 'utf-8');
}
console.log('Components created!');

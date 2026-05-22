function c(){if(typeof window>"u"||window.__keyboardShortcutsInitialized)return;window.__keyboardShortcutsInitialized=!0;const a="shortcuts-panel-styles";if(!document.getElementById(a)){const e=document.createElement("style");e.id=a,e.textContent=`
      .shortcuts-panel {
        position: fixed;
        inset: 0;
        background: rgba(18, 15, 13, 0.95);
        backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 200ms cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Berkeley Mono', 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace;
      }
      .shortcuts-panel.is-visible {
        opacity: 1;
        pointer-events: all;
      }
      .shortcuts-content {
        background: #1a1714;
        border: 1px solid #2a2520;
        padding: 1.5rem 2rem;
        width: min(90vw, 420px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(125, 211, 160, 0.1);
        color: #f4ede4;
        position: relative;
      }
      .shortcuts-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #2a2520;
        padding-bottom: 0.75rem;
        margin-bottom: 1rem;
      }
      .shortcuts-title {
        color: #7dd3a0;
        font-size: 11px;
        font-weight: bold;
        letter-spacing: 0.1em;
      }
      .shortcuts-close {
        background: none;
        border: none;
        color: #a89c8b;
        font-size: 22px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }
      .shortcuts-close:hover {
        color: #7dd3a0;
      }
      .shortcuts-grid {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
      }
      .shortcut-row {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 13px;
      }
      .shortcut-row kbd {
        background: #2a2520;
        border: 1px solid #3a3530;
        border-radius: 3px;
        color: #7dd3a0;
        display: inline-block;
        font-size: 11px;
        font-weight: bold;
        min-width: 36px;
        padding: 3px 6px;
        text-align: center;
        box-shadow: 0 2px 0 rgba(0,0,0,0.5);
      }
      .shortcut-row span {
        color: #a89c8b;
        letter-spacing: 0.05em;
      }
      .shortcuts-footer {
        text-align: center;
        font-size: 10px;
        color: #6a6055;
        border-top: 1px solid #2a2520;
        padding-top: 0.75rem;
        letter-spacing: 0.05em;
      }
    `,document.head.appendChild(e)}let t=document.getElementById("shortcuts-panel");if(!t){t=document.createElement("div"),t.id="shortcuts-panel",t.className="shortcuts-panel",t.setAttribute("aria-hidden","true"),t.innerHTML=`
      <div class="shortcuts-content">
        <div class="shortcuts-header">
          <span class="shortcuts-title">[ ACTIVE SPECIMEN ROUTING ]</span>
          <button class="shortcuts-close" id="shortcuts-close-btn" aria-label="Close shortcuts">&times;</button>
        </div>
        <div class="shortcuts-grid">
          <div class="shortcut-row"><kbd>P</kbd> <span>PIT WALL (HOME)</span></div>
          <div class="shortcut-row"><kbd>G</kbd> <span>GARAGE (PROJECTS)</span></div>
          <div class="shortcut-row"><kbd>F</kbd> <span>FIELD NOTES (WRITING)</span></div>
          <div class="shortcut-row"><kbd>S</kbd> <span>PARC FERMÉ (STORY)</span></div>
          <div class="shortcut-row"><kbd>C</kbd> <span>CONNECT (CONTACT)</span></div>
          <div class="shortcut-row"><kbd>?</kbd> <span>TOGGLE SHORTCUTS PANEL</span></div>
          <div class="shortcut-row"><kbd>ESC</kbd> <span>CLOSE PANEL</span></div>
        </div>
        <div class="shortcuts-footer">PRESS CAPITALIZED KEY TO TRANSFER ROUTE</div>
      </div>
    `,document.body.appendChild(t);const e=document.getElementById("shortcuts-close-btn");e&&e.addEventListener("click",i),t.addEventListener("click",s=>{s.target===t&&i()})}function i(){if(!t)return;const e=t.classList.toggle("is-visible");t.setAttribute("aria-hidden",e?"false":"true")}window.addEventListener("keydown",e=>{const s=document.activeElement;if(s){const o=s.tagName.toLowerCase(),d=s.hasAttribute("contenteditable")||s.contentEditable==="true";if(o==="input"||o==="textarea"||d)return}const n=e.key.toLowerCase();if(e.key==="?"||n==="/"&&e.shiftKey){e.preventDefault(),i();return}if(e.key==="Escape"){t&&t.classList.contains("is-visible")&&i();return}const r={p:"/",g:"/garage",f:"/field-notes",s:"/story",c:"/connect"};if(r[n]){e.preventDefault(),t&&t.classList.contains("is-visible")&&(t.classList.remove("is-visible"),t.setAttribute("aria-hidden","true"));const o=document.querySelector(".page-shell");o?(o.classList.remove("page-ready"),o.classList.add("page-exiting"),setTimeout(()=>{window.location.href=r[n]},300)):window.location.href=r[n]}})}export{c as i};

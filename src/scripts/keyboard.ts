export function initKeyboardShortcuts() {
  if (typeof window === 'undefined') return;
  if ((window as any).__keyboardShortcutsInitialized) return;
  (window as any).__keyboardShortcutsInitialized = true;

  // 1. Inject Styles
  const styleId = 'shortcuts-panel-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
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
    `;
    document.head.appendChild(style);
  }

  // 2. Create Modal Element if not exists
  let modal = document.getElementById('shortcuts-panel');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'shortcuts-panel';
    modal.className = 'shortcuts-panel';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
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
    `;
    document.body.appendChild(modal);

    // Event listener for close button
    const closeBtn = document.getElementById('shortcuts-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', toggleShortcuts);
    }

    // Clicking overlay closes it
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        toggleShortcuts();
      }
    });
  }

  function toggleShortcuts() {
    if (!modal) return;
    const isVisible = modal.classList.toggle('is-visible');
    modal.setAttribute('aria-hidden', !isVisible ? 'true' : 'false');
  }

  // 3. Listen to keyboard events
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    // Ignore keypresses inside input, textarea, or contenteditable
    const activeEl = document.activeElement;
    if (activeEl) {
      const tagName = activeEl.tagName.toLowerCase();
      const isContentEditable = activeEl.hasAttribute('contenteditable') || (activeEl as any).contentEditable === 'true';
      if (tagName === 'input' || tagName === 'textarea' || isContentEditable) {
        return;
      }
    }

    const key = e.key.toLowerCase();
    
    // Toggle modal on '?'
    if (e.key === '?' || (key === '/' && e.shiftKey)) {
      e.preventDefault();
      toggleShortcuts();
      return;
    }

    // Close modal on 'escape'
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('is-visible')) {
        toggleShortcuts();
      }
      return;
    }

    // Handle single-key navigations if modal is not open, or even if it is
    const routes: Record<string, string> = {
      'p': '/',
      'g': '/garage',
      'f': '/field-notes',
      's': '/story',
      'c': '/connect'
    };

    if (routes[key]) {
      e.preventDefault();
      
      // Close modal if open
      if (modal && modal.classList.contains('is-visible')) {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
      }

      // Check if Astro View Transitions is active
      const pageShell = document.querySelector('.page-shell');
      if (pageShell) {
        pageShell.classList.remove('page-ready');
        pageShell.classList.add('page-exiting');
        setTimeout(() => {
          window.location.href = routes[key];
        }, 300);
      } else {
        window.location.href = routes[key];
      }
    }
  });
}

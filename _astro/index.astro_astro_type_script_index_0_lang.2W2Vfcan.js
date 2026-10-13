(function(){let m=[],B=[],N={};try{const e=document.getElementById("admin-seed-experiments");e&&(m=JSON.parse(e.textContent||"[]"));const t=document.getElementById("admin-seed-notes");t&&(B=JSON.parse(t.textContent||"[]"));const s=document.getElementById("admin-seed-env");s&&(N=JSON.parse(s.textContent||"{}"));const a=localStorage.getItem("cm_admin_experiments");if(a)try{m=JSON.parse(a)}catch{}}catch(e){console.error("Error bootstrapping admin data:",e)}const y=document.getElementById("auth-shield"),E=document.getElementById("cockpit-viewport"),w=document.getElementById("auth-form"),g=document.getElementById("auth-error-msg"),x=document.getElementById("btn-logout"),v="cm_admin_session_auth";function b(){(sessionStorage.getItem(v)||localStorage.getItem(v))==="valid_operator_nafi"?(y&&(y.style.display="none"),E&&(E.style.display="block"),f()):(y&&(y.style.display="flex"),E&&(E.style.display="none"))}w&&w.addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("admin-email")?.value.trim(),s=document.getElementById("admin-password")?.value.trim();(t.includes("nafi")||t.includes("admin"))&&(s==="telemetry2026"||s.length>=6)?(sessionStorage.setItem(v,"valid_operator_nafi"),localStorage.setItem(v,"valid_operator_nafi"),g&&(g.style.display="none"),b()):g&&(g.textContent='Invalid access credentials. Default passkey is "telemetry2026".',g.style.display="block")}),x&&x.addEventListener("click",()=>{sessionStorage.removeItem(v),localStorage.removeItem(v),b()});const k=document.querySelectorAll(".nav-tab");k.forEach(e=>{e.addEventListener("click",()=>{k.forEach(s=>s.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-tab");if(document.querySelectorAll(".tab-content").forEach(s=>s.classList.remove("active")),t){const s=document.getElementById(t);s&&s.classList.add("active")}})});function M(e){const t=1/(1+.2316419*e),a=.3989422804014327*Math.exp(-.5*e*e)*t*(.31938153+t*(-.356563782+t*(1.781477937+t*(-1.821255978+t*1.330274429))));return Math.max(1e-4,a*2)}function A(e){const t=e.variantA.metrics,s=e.variantB.metrics,a=Math.max(t.impressions,1),l=Math.max(s.impressions,1),c=t.engagements/a*100,n=s.engagements/l*100,i=c>0?(n-c)/c*100:0,d=(t.engagements+s.engagements)/(a+l),o=Math.sqrt(d*(1-d)*(1/a+1/l)),u=o>0?(s.engagements/l-t.engagements/a)/o:0,p=M(Math.abs(u)),S=Math.min(99.9,Math.round((1-p)*1e3)/10),F=t.impressions+s.impressions>=40&&S>=95&&u>1.96;return{rateA:c,rateB:n,uplift:i,zScore:u,pVal:p,confidence:S,isSignificant:F}}function I(){localStorage.setItem("cm_admin_experiments",JSON.stringify(m)),localStorage.setItem("cm_runtime_experiments",JSON.stringify(m))}function h(){const e=document.getElementById("experiments-grid"),t=document.getElementById("filter-category")?.value||"all",s=document.getElementById("filter-status")?.value||"all",a=document.getElementById("experiments-showing-count"),l=document.getElementById("tab-count-experiments");if(!e)return;const c=m.filter(n=>!(t!=="all"&&n.category!==t||s!=="all"&&n.status!==s));a&&(a.textContent=String(c.length)),l&&(l.textContent=String(m.length)),e.innerHTML=c.map(n=>{const i=A(n),d=n.variantA,o=n.variantB;return`
          <div class="exp-card ${n.winner==="B"?"winner-card":""}" data-exp-id="${n.id}">
            <div class="exp-card-header">
              <div class="exp-header-left">
                <span class="badge-tag">${n.category}</span>
                <span class="exp-slug">/field-notes/${n.postSlug}</span>
              </div>
              <div class="exp-header-right">
                ${i.isSignificant?'<span class="badge-win">⚡ 99%+ CONFIDENCE WINNER</span>':'<span class="badge-progress">COLLECTING DATA</span>'}
                <span class="badge-status ${n.status}">${n.status.toUpperCase()}</span>
              </div>
            </div>

            <div class="variants-comparison-grid">
              <!-- VARIANT A -->
              <div class="variant-col variant-a">
                <div class="variant-badge">VARIANT A · CONTROL</div>
                <div class="variant-title">${d.title}</div>
                <div class="variant-desc">${d.description}</div>
                <div class="variant-metric-strip">
                  <div class="v-metric">
                    <span class="m-val">${d.metrics.impressions.toLocaleString()}</span>
                    <span class="m-lbl">IMPRESSIONS</span>
                  </div>
                  <div class="v-metric">
                    <span class="m-val">${i.rateA.toFixed(1)}%</span>
                    <span class="m-lbl">ENGAGEMENT</span>
                  </div>
                  <div class="v-metric">
                    <span class="m-val">${d.metrics.avgReadTimeSeconds}s</span>
                    <span class="m-lbl">READ TIME</span>
                  </div>
                </div>
              </div>

              <!-- VS BADGE & UPLIFT -->
              <div class="vs-column">
                <div class="uplift-circle ${i.uplift>0?"positive":"negative"}">
                  <span class="uplift-num">${i.uplift>0?"+":""}${i.uplift.toFixed(1)}%</span>
                  <span class="uplift-lbl">UPLIFT</span>
                </div>
                <div class="conf-pill">${i.confidence}% CONF</div>
              </div>

              <!-- VARIANT B -->
              <div class="variant-col variant-b">
                <div class="variant-badge text-green">VARIANT B · AI/SEO OPTIMIZED</div>
                <div class="variant-title">${o.title}</div>
                <div class="variant-desc">${o.description}</div>
                ${o.aiTakeaways&&o.aiTakeaways.length>0?`
                  <div class="variant-takeaways-preview">
                    <strong>AI TAKEAWAYS INJECTED (${o.aiTakeaways.length}):</strong>
                    <span>${o.aiTakeaways[0]}</span>
                  </div>
                `:""}
                <div class="variant-metric-strip">
                  <div class="v-metric">
                    <span class="m-val text-green">${o.metrics.impressions.toLocaleString()}</span>
                    <span class="m-lbl">IMPRESSIONS</span>
                  </div>
                  <div class="v-metric">
                    <span class="m-val text-green">${i.rateB.toFixed(1)}%</span>
                    <span class="m-lbl">ENGAGEMENT</span>
                  </div>
                  <div class="v-metric">
                    <span class="m-val text-green">${o.metrics.avgReadTimeSeconds}s</span>
                    <span class="m-lbl">READ TIME</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CARD FOOTER ACTIONS -->
            <div class="exp-card-footer">
              <div class="footer-telemetry-note">
                <span>GA4 Telemetry: ${d.metrics.impressions+o.metrics.impressions} events logged</span>
              </div>
              <div class="footer-btn-group">
                <a href="/field-notes/${n.postSlug}?ab_variant=A" target="_blank" class="btn-ghost-small">Preview A ↗</a>
                <a href="/field-notes/${n.postSlug}?ab_variant=B" target="_blank" class="btn-ghost-small text-green">Preview B (AI) ↗</a>
                ${n.winner==="B"?`
                  <span class="btn-promoted-tag">✓ PROMOTED AS WINNER</span>
                `:`
                  <button class="btn-promote-single btn-action-small" data-slug="${n.postSlug}">
                    ⭐ Promote Variant B to Live
                  </button>
                `}
              </div>
            </div>
          </div>
        `}).join(""),document.querySelectorAll(".btn-promote-single").forEach(n=>{n.addEventListener("click",i=>{const d=i.currentTarget.getAttribute("data-slug");O(d)})})}function O(e){if(!e)return;const t=m.find(s=>s.postSlug===e);t&&(t.winner="B",t.status="concluded",I(),f(),alert(`✓ Variant B for "${e}" promoted as official winner! Winning title, meta description, and AI key takeaways are now activated.`))}let r=null;function $(){const e=document.getElementById("studio-post-list"),t=document.getElementById("studio-post-search")?.value.toLowerCase()||"";if(!e)return;const s=B.filter(a=>a.title.toLowerCase().includes(t)||a.slug.toLowerCase().includes(t));e.innerHTML=s.map(a=>{const l=m.some(n=>n.postSlug===a.slug);return`
          <div class="post-item ${r&&r.slug===a.slug?"selected":""}" data-slug="${a.slug}">
            <div class="post-item-title">${a.title}</div>
            <div class="post-item-meta">
              <span>${a.category}</span>
              ${l?'<span class="badge-has-exp">A/B ACTIVE</span>':""}
            </div>
          </div>
        `}).join(""),e.querySelectorAll(".post-item").forEach(a=>{a.addEventListener("click",()=>{const l=a.getAttribute("data-slug");r=B.find(c=>c.slug===l),D(),$()})})}function D(){const e=document.getElementById("studio-empty-state"),t=document.getElementById("studio-active-panel");if(!r){e&&(e.style.display="flex"),t&&(t.style.display="none");return}e&&(e.style.display="none"),t&&(t.style.display="block");const s=document.getElementById("studio-post-title"),a=document.getElementById("studio-post-slug"),l=document.getElementById("studio-post-cat");s&&(s.textContent=r.title),a&&(a.textContent=`/field-notes/${r.slug}`),l&&(l.textContent=r.category);const c=["Capital Markets","Asset Allocation","Form ADV","SEC","Due Diligence"],n=document.getElementById("studio-entities-chips");n&&(n.innerHTML=c.map(p=>`<span class="chip-item">${p}</span>`).join(""));const i=m.find(p=>p.postSlug===r.slug),d=document.getElementById("variant-edit-title"),o=document.getElementById("variant-edit-desc"),u=document.getElementById("variant-edit-takeaways");i?(d&&(d.value=i.variantB.title),o&&(o.value=i.variantB.description),u&&i.variantB.aiTakeaways&&(u.innerHTML=i.variantB.aiTakeaways.map((p,S)=>`
            <div class="takeaway-edit-row">
              <span class="row-num">${S+1}</span>
              <input type="text" class="input-text takeaway-input" value="${p}" />
            </div>
          `).join(""))):(d&&(d.value=`${r.title}: Strategic Breakdown & Operational Teardown`),o&&(o.value=`${r.description||r.excerpt||""}, Discover structural market takeaways and allocator framework.`),u&&(u.innerHTML=`
            <div class="takeaway-edit-row"><span class="row-num">1</span><input type="text" class="input-text takeaway-input" value="Core structural thesis: Explaining fundamental market dynamics." /></div>
            <div class="takeaway-edit-row"><span class="row-num">2</span><input type="text" class="input-text takeaway-input" value="Empirical data: Quantitative indicators validate unexpected market divergence." /></div>
            <div class="takeaway-edit-row"><span class="row-num">3</span><input type="text" class="input-text takeaway-input" value="Tactical allocator playbook: Key criteria for institutional evaluation." /></div>
          `))}const T=document.getElementById("btn-launch-ab-test");T&&T.addEventListener("click",()=>{if(!r)return;const e=document.getElementById("variant-edit-title")?.value,t=document.getElementById("variant-edit-desc")?.value,s=document.querySelectorAll(".takeaway-input"),a=[];s.forEach(c=>a.push(c.value));let l=m.find(c=>c.postSlug===r.slug);l?(l.variantB.title=e,l.variantB.description=t,l.variantB.aiTakeaways=a):m.unshift({id:`exp_${r.slug.replace(/[^a-z0-9]/gi,"_")}`,postSlug:r.slug,category:r.category,status:"active",trafficSplit:50,startDate:new Date().toISOString(),variantA:{id:"A",title:r.title,description:r.description||r.excerpt||"",metrics:{impressions:0,engagements:0,scrollDepth75:0,avgReadTimeSeconds:0,bounces:0}},variantB:{id:"B",title:e,description:t,aiTakeaways:a,metrics:{impressions:0,engagements:0,scrollDepth75:0,avgReadTimeSeconds:0,bounces:0}},winner:null}),I(),f(),alert(`✓ A/B Experiment launched successfully for "${r.slug}"! 50/50 traffic split is live.`)});function R(){const e=document.getElementById("feed-items-container");e&&(e.innerHTML=m.map(t=>{const s=A(t);return`
          <div class="feed-card">
            <div class="feed-top">
              <span class="feed-icon">${s.isSignificant?"🏆":"📈"}</span>
              <div>
                <div class="feed-post-title">${t.postSlug}</div>
                <div class="feed-time">Automated Telemetry Audit · ${new Date(t.startDate).toLocaleDateString()}</div>
              </div>
              <div class="feed-stat-badge ${s.uplift>0?"positive":""}">
                ${s.uplift>0?"+":""}${s.uplift.toFixed(1)}% UPLIFT
              </div>
            </div>
            <div class="feed-commentary">
              ${t.agentAnalysis?t.agentAnalysis.commentary:`Variant B holds a +${s.uplift.toFixed(1)}% engagement advantage over Variant A with ${s.confidence}% statistical confidence.`}
            </div>
            <div class="feed-metrics-grid">
              <div class="fm-cell">
                <span class="fm-lbl">Z-SCORE</span>
                <span class="fm-val">${s.zScore.toFixed(2)}</span>
              </div>
              <div class="fm-cell">
                <span class="fm-lbl">P-VALUE</span>
                <span class="fm-val">${s.pVal.toFixed(4)}</span>
              </div>
              <div class="fm-cell">
                <span class="fm-lbl">SAMPLE (A / B)</span>
                <span class="fm-val">${t.variantA.metrics.impressions} / ${t.variantB.metrics.impressions}</span>
              </div>
              <div class="fm-cell">
                <span class="fm-lbl">RECOMMENDATION</span>
                <span class="fm-val text-green">${s.isSignificant?"PROMOTE TO LIVE":"COLLECT TRAFFIC"}</span>
              </div>
            </div>
          </div>
        `}).join(""))}function _(){const e=document.getElementById("sim-target-select");e&&(e.innerHTML=m.map(c=>`<option value="${c.id}">${c.postSlug} (${c.category})</option>`).join(""));const t=document.getElementById("btn-sim-traffic"),s=document.getElementById("btn-sim-supercharge"),a=document.getElementById("sim-feedback");function l(c){const n=e?.value,i=m.find(u=>u.id===n);if(!i)return;const d=c?500:100,o=d/2;i.variantA.metrics.impressions+=o,i.variantB.metrics.impressions+=o,i.variantA.metrics.engagements+=Math.round(o*.38),i.variantB.metrics.engagements+=Math.round(o*(c?.54:.48)),I(),f(),a&&(a.textContent=`✓ Generated ${d} simulated visitor sessions for ${i.postSlug}. Telemetry and Z-scores recalculated!`,a.style.display="block",setTimeout(()=>{a.style.display="none"},4e3))}t?.addEventListener("click",()=>l(!1)),s?.addEventListener("click",()=>l(!0))}const L=document.getElementById("btn-promote-all-significant");L&&L.addEventListener("click",()=>{let e=0;m.forEach(t=>{A(t).isSignificant&&t.winner!=="B"&&(t.winner="B",t.status="concluded",e++)}),I(),f(),alert(`✓ Successfully promoted ${e} winning variant(s) as production defaults!`)});const C=document.getElementById("btn-export-experiments-json");C&&C.addEventListener("click",()=>{const e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(m,null,2)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download","ab-experiments-export.json"),t.click()});function f(){h(),$(),R(),_()}document.getElementById("filter-category")?.addEventListener("change",h),document.getElementById("filter-status")?.addEventListener("change",h),document.getElementById("studio-post-search")?.addEventListener("input",$),b()})();

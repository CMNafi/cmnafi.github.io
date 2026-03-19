(function () {
    'use strict';

    const DATA = './data/';

    /* ---- UTILITIES ---- */

    async function fetchJSON(file) {
        try {
            const res = await fetch(DATA + file);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return await res.json();
        } catch (e) {
            console.error('cricket.js: failed to load ' + file, e);
            return null;
        }
    }

    function fmt(n, decimals) {
        if (n === null || n === undefined) return '—';
        if (decimals !== undefined) return Number(n).toFixed(decimals);
        return String(n);
    }

    function fmtDate(iso) {
        if (!iso) return '—';
        const [y, m, d] = iso.split('-');
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return d + ' ' + months[parseInt(m, 10) - 1] + ' ' + y;
    }

    function statusBadge(s) {
        if (!s) return '';
        return '<span class="data-status-badge data-status-badge--' + s + '">' + s + '</span>';
    }

    function categoryBadge(cat) {
        return '<span class="highlight-category highlight-category--' + cat + '">' + cat + '</span>';
    }

    function resultPill(r) {
        if (!r) return '<span style="color:var(--muted)">—</span>';
        const cls = r === 'W' ? 'match-result--w' : r === 'L' ? 'match-result--l' : 'match-result--nr';
        return '<span class="match-result ' + cls + '">' + r + '</span>';
    }

    function bestBowling(wkts, runs) {
        if (wkts === null) return '—';
        return wkts + '/' + (runs !== null ? runs : '?');
    }

    function el(id) { return document.getElementById(id); }
    function setHTML(id, html) { const e = el(id); if (e) e.innerHTML = html; }

    function statCard(label, value, sub, modifier) {
        const mod = modifier ? ' stat-card--' + modifier : '';
        return '<div class="stat-card' + mod + '">' +
            '<span class="stat-card-label">' + label + '</span>' +
            '<span class="stat-card-value">' + value + '</span>' +
            (sub ? '<span class="stat-card-sub">' + sub + '</span>' : '') +
            '</div>';
    }

    /* ---- RENDER: HUB ---- */

    async function renderHub() {
        const [profile, career, milestones] = await Promise.all([
            fetchJSON('player-profile.json'),
            fetchJSON('career-summary.json'),
            fetchJSON('milestones.json')
        ]);

        if (profile) {
            const hero = el('player-hero');
            if (hero) {
                hero.innerHTML =
                    '<div class="player-hero-copy">' +
                        '<p class="eyebrow">Adventures · Cricket</p>' +
                        '<h1 class="player-hero-name">' + profile.name + '</h1>' +
                        '<p class="player-hero-meta">' +
                            '<span>' + profile.role + '</span>' +
                            '<span>' + profile.battingStyle + ' Bat</span>' +
                            '<span>' + profile.bowlingStyle + ' Bowl</span>' +
                            '<span>' + profile.currentTeam + '</span>' +
                        '</p>' +
                        '<div class="player-hero-badges">' +
                            '<span class="player-hero-badge">All Rounder</span>' +
                            '<span class="player-hero-badge">Leather & Tennis</span>' +
                            '<span class="player-hero-badge">Tampa Bay</span>' +
                        '</div>' +
                        '<div class="player-hero-cta">' +
                            '<a class="button button-primary" href="records.html">View records</a>' +
                            '<a class="button button-secondary" href="' + profile.cricclubsUrl + '" target="_blank" rel="noopener noreferrer">CricClubs profile ↗</a>' +
                        '</div>' +
                        '<p style="color:var(--muted);font-size:0.9rem;line-height:1.7;margin-top:8px;max-width:560px">' +
                            '"Cricket has been competition, community, routine, chaos, team-building, and memory."' +
                        '</p>' +
                    '</div>' +
                    '<div class="player-hero-visual">' +
                        '<div class="hero-stat-ring">' +
                            '<span class="hero-stat-ring-value">' + (career ? career.batting.matches : '—') + '</span>' +
                            '<span class="hero-stat-ring-label">Matches</span>' +
                        '</div>' +
                    '</div>';
            }
        }

        if (career) {
            const b = career.batting;
            const bow = career.bowling;
            const f = career.fielding;

            setHTML('career-batting-stats',
                statCard('Runs', fmt(b.runs), null, 'accent') +
                statCard('Average', fmt(b.average, 2), null) +
                statCard('Strike Rate', fmt(b.strikeRate, 2), null) +
                statCard('High Score', fmt(b.highScore), null, 'cool') +
                statCard('50s', fmt(b.fifties), null) +
                statCard('Fours', fmt(b.fours), null) +
                statCard('Sixes', fmt(b.sixes), null)
            );

            setHTML('career-bowling-stats',
                statCard('Wickets', fmt(bow.wickets), null, 'cool') +
                statCard('Economy', fmt(bow.economy, 2), null) +
                statCard('Best', bestBowling(bow.bestFiguresWickets, bow.bestFiguresRuns), null, 'accent') +
                statCard('Overs', fmt(bow.overs), null) +
                statCard('Runs Conceded', fmt(bow.runsConceded), null)
            );

            setHTML('career-fielding-stats',
                statCard('Catches', fmt(f.catches), null) +
                statCard('Run Outs', fmt(f.runOuts), null) +
                statCard('Stumpings', fmt(f.stumpings), null)
            );
        }

        if (milestones && milestones.length) {
            const strip = el('milestone-strip');
            if (strip) {
                strip.innerHTML = milestones.slice(0, 4).map(m =>
                    '<div class="milestone-pill">' +
                        '<span class="milestone-pill-value">' + m.value + '</span>' +
                        '<span class="milestone-pill-label">' + m.title + '</span>' +
                    '</div>'
                ).join('');
            }
        }
    }

    /* ---- RENDER: RECORDS ---- */

    async function renderRecords() {
        const [career, seasons, milestones] = await Promise.all([
            fetchJSON('career-summary.json'),
            fetchJSON('seasons.json'),
            fetchJSON('milestones.json')
        ]);

        // Tab switching
        const tabBar = el('records-tab-bar');
        if (tabBar) {
            tabBar.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
                    btn.classList.add('is-active');
                    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('is-active'));
                    const target = el(btn.dataset.tab);
                    if (target) target.classList.add('is-active');
                });
            });
        }

        // Career tab
        if (career) {
            const b = career.batting, bow = career.bowling, f = career.fielding;
            setHTML('tab-career',
                '<div class="cricket-section">' +
                    '<div class="cricket-section-heading"><h2>Batting</h2>' + statusBadge(career.status) + '</div>' +
                    '<div class="stat-grid">' +
                        statCard('Matches', fmt(b.matches), null) +
                        statCard('Innings', fmt(b.innings), null) +
                        statCard('Not Outs', fmt(b.notOuts), null) +
                        statCard('Runs', fmt(b.runs), null, 'accent') +
                        statCard('Balls', fmt(b.balls), null) +
                        statCard('High Score', fmt(b.highScore), null, 'cool') +
                        statCard('Average', fmt(b.average, 2), null) +
                        statCard('Strike Rate', fmt(b.strikeRate, 2), null) +
                        statCard('100s', fmt(b.hundreds), null) +
                        statCard('50s', fmt(b.fifties), null) +
                        statCard('Fours', fmt(b.fours), null) +
                        statCard('Sixes', fmt(b.sixes), null) +
                    '</div>' +
                '</div>' +
                '<div class="cricket-section">' +
                    '<div class="cricket-section-heading"><h2>Bowling</h2></div>' +
                    '<div class="stat-grid">' +
                        statCard('Overs', fmt(bow.overs), null) +
                        statCard('Wickets', fmt(bow.wickets), null, 'cool') +
                        statCard('Runs Conceded', fmt(bow.runsConceded), null) +
                        statCard('Economy', fmt(bow.economy, 2), null) +
                        statCard('Average', fmt(bow.average, 2), null) +
                        statCard('Best', bestBowling(bow.bestFiguresWickets, bow.bestFiguresRuns), null, 'accent') +
                    '</div>' +
                '</div>' +
                '<div class="cricket-section">' +
                    '<div class="cricket-section-heading"><h2>Fielding</h2></div>' +
                    '<div class="stat-grid">' +
                        statCard('Catches', fmt(f.catches), null) +
                        statCard('Run Outs', fmt(f.runOuts), null) +
                        statCard('Stumpings', fmt(f.stumpings), null) +
                    '</div>' +
                '</div>'
            );
        }

        // By Season tab
        if (seasons) {
            const sorted = [...seasons].sort((a, b) => b.year - a.year);
            setHTML('tab-seasons',
                '<div style="overflow-x:auto;margin-top:8px">' +
                '<table class="match-table">' +
                '<thead><tr>' +
                    '<th>Season</th><th>Team</th><th>Format</th>' +
                    '<th>M</th><th>Runs</th><th>Avg</th><th>SR</th><th>HS</th><th>50s</th>' +
                    '<th>Wkts</th><th>Econ</th><th>Best</th><th>Status</th>' +
                '</tr></thead>' +
                '<tbody>' +
                sorted.map(s => {
                    const b = s.batting, bow = s.bowling;
                    return '<tr>' +
                        '<td>' + s.seasonName + '</td>' +
                        '<td>' + s.team + '</td>' +
                        '<td><span style="text-transform:capitalize">' + s.format + '</span></td>' +
                        '<td>' + fmt(b.matches) + '</td>' +
                        '<td style="color:var(--accent);font-weight:700">' + fmt(b.runs) + '</td>' +
                        '<td>' + fmt(b.average, 2) + '</td>' +
                        '<td>' + fmt(b.strikeRate, 2) + '</td>' +
                        '<td>' + fmt(b.highScore) + '</td>' +
                        '<td>' + fmt(b.fifties) + '</td>' +
                        '<td style="color:var(--accent-cool);font-weight:700">' + fmt(bow.wickets) + '</td>' +
                        '<td>' + fmt(bow.economy, 2) + '</td>' +
                        '<td>' + bestBowling(bow.bestFiguresWickets, bow.bestFiguresRuns) + '</td>' +
                        '<td>' + statusBadge(s.status) + '</td>' +
                    '</tr>';
                }).join('') +
                '</tbody></table></div>'
            );
        }

        // By Team tab
        if (seasons) {
            const byTeam = {};
            seasons.forEach(s => {
                if (!byTeam[s.team]) byTeam[s.team] = [];
                byTeam[s.team].push(s);
            });
            let html = '';
            Object.entries(byTeam).forEach(([team, teamSeasons]) => {
                html += '<div class="cricket-section">' +
                    '<div class="cricket-section-heading"><h2>' + team + '</h2></div>' +
                    '<div class="stat-grid">';
                const totalRuns = teamSeasons.reduce((acc, s) => acc + (s.batting.runs || 0), 0);
                const totalWkts = teamSeasons.reduce((acc, s) => acc + (s.bowling.wickets || 0), 0);
                const totalM = teamSeasons.reduce((acc, s) => acc + (s.batting.matches || 0), 0);
                html += statCard('Matches', fmt(totalM), null) +
                    statCard('Runs', fmt(totalRuns), null, 'accent') +
                    statCard('Wickets', fmt(totalWkts), null, 'cool');
                html += '</div></div>';
            });
            setHTML('tab-teams', html);
        }

        // Bowling tab
        if (seasons) {
            const sorted = [...seasons].sort((a, b) => b.year - a.year);
            setHTML('tab-bowling',
                '<div class="cricket-section">' +
                    '<div class="cricket-section-heading"><h2>Career Bowling</h2></div>' +
                    '<div class="stat-grid">' +
                    (career ? (
                        statCard('Wickets', fmt(career.bowling.wickets), null, 'cool') +
                        statCard('Economy', fmt(career.bowling.economy, 2), null) +
                        statCard('Best', bestBowling(career.bowling.bestFiguresWickets, career.bowling.bestFiguresRuns), null, 'accent') +
                        statCard('Overs', fmt(career.bowling.overs), null) +
                        statCard('Runs Conceded', fmt(career.bowling.runsConceded), null)
                    ) : '') +
                    '</div>' +
                '</div>' +
                '<div class="cricket-section">' +
                    '<div class="cricket-section-heading"><h2>By Season</h2></div>' +
                    '<div style="overflow-x:auto">' +
                    '<table class="match-table"><thead><tr>' +
                        '<th>Season</th><th>Format</th><th>Overs</th><th>Wickets</th><th>Economy</th><th>Best</th><th>Status</th>' +
                    '</tr></thead><tbody>' +
                    sorted.filter(s => s.bowling.wickets !== null).map(s =>
                        '<tr>' +
                        '<td>' + s.seasonName + '</td>' +
                        '<td>' + s.format + '</td>' +
                        '<td>' + fmt(s.bowling.overs) + '</td>' +
                        '<td style="color:var(--accent-cool);font-weight:700">' + fmt(s.bowling.wickets) + '</td>' +
                        '<td>' + fmt(s.bowling.economy, 2) + '</td>' +
                        '<td>' + bestBowling(s.bowling.bestFiguresWickets, s.bowling.bestFiguresRuns) + '</td>' +
                        '<td>' + statusBadge(s.status) + '</td>' +
                        '</tr>'
                    ).join('') +
                    '</tbody></table></div>' +
                '</div>'
            );
        }

        // Milestones tab
        if (milestones) {
            setHTML('tab-milestones',
                '<div class="highlight-grid" style="margin-top:8px">' +
                milestones.map(m =>
                    '<div class="highlight-card">' +
                        '<span class="highlight-category highlight-category--' + m.category + '">' + m.category + '</span>' +
                        '<p class="highlight-headline">' + m.value + '</p>' +
                        '<p class="highlight-body">' + m.title + (m.competition ? ' — ' + m.competition : '') + '</p>' +
                        '<div class="highlight-meta">' +
                            (m.team ? '<span>' + m.team + '</span>' : '') +
                            statusBadge(m.status) +
                        '</div>' +
                    '</div>'
                ).join('') +
                '</div>'
            );
        }
    }

    /* ---- RENDER: MATCHES ---- */

    async function renderMatches() {
        const matches = await fetchJSON('matches.json');
        if (!matches) return;

        const yearSel = el('filter-year');
        const teamSel = el('filter-team');
        const fmtSel = el('filter-format');
        const oppSearch = el('filter-opponent');
        const container = el('match-table-container');
        const emptyMsg = el('match-empty');

        // Build filter options from data
        const years = [...new Set(matches.map(m => m.date ? m.date.split('-')[0] : null).filter(Boolean))].sort((a,b) => b-a);
        const teams = [...new Set(matches.map(m => m.team).filter(Boolean))].sort();
        const formats = [...new Set(matches.map(m => m.format).filter(Boolean))].sort();

        if (yearSel) years.forEach(y => { const o = document.createElement('option'); o.value = y; o.textContent = y; yearSel.appendChild(o); });
        if (teamSel) teams.forEach(t => { const o = document.createElement('option'); o.value = t; o.textContent = t; teamSel.appendChild(o); });
        if (fmtSel) formats.forEach(f => { const o = document.createElement('option'); o.value = f; o.textContent = f; fmtSel.appendChild(o); });

        function buildTable(rows) {
            if (!rows.length) {
                if (container) container.innerHTML = '';
                if (emptyMsg) emptyMsg.style.display = 'block';
                return;
            }
            if (emptyMsg) emptyMsg.style.display = 'none';
            const html = '<table class="match-table">' +
                '<thead><tr>' +
                    '<th>Date</th><th>Opponent</th><th>Team</th><th>Format</th>' +
                    '<th>Bat</th><th>Bowl</th><th>Field</th><th>Result</th><th>Source</th>' +
                '</tr></thead>' +
                '<tbody>' +
                rows.map(m => {
                    const bat = m.batting;
                    const bow = m.bowling;
                    const fld = m.fielding;
                    const batStr = bat.runs !== null ? bat.runs + (bat.notOut ? '*' : '') + ' (' + bat.balls + ')' : '—';
                    const bowStr = bow.wickets !== null ? bow.wickets + '/' + bow.runsConceded + ' (' + bow.overs + ')' : '—';
                    const fldStr = fld.catches ? fld.catches + ' ct' : '—';
                    return '<tr>' +
                        '<td>' + fmtDate(m.date) + '</td>' +
                        '<td>' + m.opponent + '</td>' +
                        '<td>' + m.team + '</td>' +
                        '<td style="text-transform:capitalize">' + m.format + '</td>' +
                        '<td>' + batStr + '</td>' +
                        '<td>' + bowStr + '</td>' +
                        '<td>' + fldStr + '</td>' +
                        '<td>' + resultPill(m.result) + '</td>' +
                        '<td>' + statusBadge(m.status) + '</td>' +
                    '</tr>';
                }).join('') +
                '</tbody></table>';
            if (container) container.innerHTML = '<div class="match-table-wrap">' + html + '</div>';
        }

        function applyFilters() {
            const yr = yearSel ? yearSel.value : '';
            const tm = teamSel ? teamSel.value : '';
            const fm = fmtSel ? fmtSel.value : '';
            const opp = oppSearch ? oppSearch.value.toLowerCase().trim() : '';
            const filtered = matches.filter(m => {
                if (yr && (!m.date || !m.date.startsWith(yr))) return false;
                if (tm && m.team !== tm) return false;
                if (fm && m.format !== fm) return false;
                if (opp && !m.opponent.toLowerCase().includes(opp)) return false;
                return true;
            });
            buildTable(filtered);
        }

        [yearSel, teamSel, fmtSel].forEach(s => s && s.addEventListener('change', applyFilters));
        if (oppSearch) oppSearch.addEventListener('input', applyFilters);

        buildTable(matches);
    }

    /* ---- RENDER: TEAMS ---- */

    async function renderTeams() {
        const [teams, seasons] = await Promise.all([
            fetchJSON('teams.json'),
            fetchJSON('seasons.json')
        ]);
        if (!teams) return;

        const seasonMap = {};
        if (seasons) seasons.forEach(s => { seasonMap[s.id] = s; });

        const grid = el('teams-grid');
        if (!grid) return;

        grid.innerHTML = teams.map(team => {
            const activeBadge = team.active
                ? '<span class="team-active-badge">Current</span>'
                : '';
            const seasonPills = (team.seasons || []).map(sid => {
                const s = seasonMap[sid];
                return s ? '<span class="team-season-pill">' + s.seasonName + '</span>' : '';
            }).join('');

            return '<div class="team-card' + (team.active ? ' team-card--active' : '') + '">' +
                '<div class="team-card-header">' +
                    '<h3 class="team-card-name">' + team.name + '</h3>' +
                    '<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">' +
                        activeBadge +
                        statusBadge(team.status) +
                    '</div>' +
                '</div>' +
                (team.notes ? '<p class="team-card-notes">' + team.notes + '</p>' : '') +
                (seasonPills ? '<div class="team-card-seasons">' + seasonPills + '</div>' : '') +
            '</div>';
        }).join('');
    }

    /* ---- RENDER: HIGHLIGHTS ---- */

    async function renderHighlights() {
        const highlights = await fetchJSON('highlights.json');
        if (!highlights) return;

        const filterBar = el('highlight-filter-bar');
        const grid = el('highlights-grid');
        if (!grid) return;

        const categories = ['all', ...new Set(highlights.map(h => h.category))];

        if (filterBar) {
            filterBar.innerHTML = categories.map(cat =>
                '<button class="highlight-filter-pill' + (cat === 'all' ? ' is-active' : '') + '" data-cat="' + cat + '">' +
                    (cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)) +
                '</button>'
            ).join('');

            filterBar.querySelectorAll('.highlight-filter-pill').forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBar.querySelectorAll('.highlight-filter-pill').forEach(b => b.classList.remove('is-active'));
                    btn.classList.add('is-active');
                    const selected = btn.dataset.cat;
                    grid.querySelectorAll('.highlight-card').forEach(card => {
                        card.style.display = (selected === 'all' || card.dataset.category === selected) ? '' : 'none';
                    });
                });
            });
        }

        grid.innerHTML = highlights.map(h =>
            '<div class="highlight-card" data-category="' + h.category + '">' +
                categoryBadge(h.category) +
                '<p class="highlight-headline">' + h.headline + '</p>' +
                '<p class="highlight-body">' + h.body + '</p>' +
                '<div class="highlight-meta">' +
                    (h.date ? '<span>' + fmtDate(h.date) + '</span>' : '') +
                    (h.team ? '<span>' + h.team + '</span>' : '') +
                    (h.competition ? '<span>' + h.competition + '</span>' : '') +
                    statusBadge(h.status) +
                '</div>' +
            '</div>'
        ).join('');
    }

    /* ---- RENDER: TIMELINE ---- */

    async function renderTimeline() {
        const timeline = await fetchJSON('timeline.json');
        if (!timeline) return;

        const container = el('cricket-timeline');
        if (!container) return;

        const sorted = [...timeline].sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return (a.month || 0) - (b.month || 0);
        });

        const dotClass = (type) => {
            if (type === 'milestone') return 'timeline-dot';
            if (type === 'team-change') return 'timeline-dot timeline-dot--cool';
            if (type === 'debut') return 'timeline-dot timeline-dot--cool';
            return 'timeline-dot timeline-dot--muted';
        };

        container.innerHTML = sorted.map(entry =>
            '<div class="timeline-entry" role="listitem">' +
                '<div class="' + dotClass(entry.type) + '"></div>' +
                '<p class="timeline-label">' + entry.label +
                    '<span class="timeline-type-badge timeline-type-badge--' + entry.type + '">' + entry.type.replace('-', ' ') + '</span>' +
                '</p>' +
                '<h3 class="timeline-title">' + entry.title + '</h3>' +
                '<p class="timeline-body">' + entry.body + '</p>' +
                (entry.highlightId ?
                    '<a class="timeline-entry-link" href="highlights.html">See highlight →</a>' : '') +
                '<div style="margin-top:8px">' + statusBadge(entry.status) + '</div>' +
            '</div>'
        ).join('');
    }

    /* ---- INIT ---- */

    const page = document.body.dataset.page;
    if (page === 'cricket-hub')        renderHub();
    if (page === 'cricket-records')    renderRecords();
    if (page === 'cricket-matches')    renderMatches();
    if (page === 'cricket-teams')      renderTeams();
    if (page === 'cricket-highlights') renderHighlights();
    if (page === 'cricket-timeline')   renderTimeline();

})();

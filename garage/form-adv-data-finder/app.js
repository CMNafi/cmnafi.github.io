// Dynamic API base URL resolver for static hosting
const params = new URLSearchParams(window.location.search);
const apiParam = params.get('api_url');
const API_BASE_URL = apiParam ? apiParam : (window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? '' : 'http://localhost:8000');

// ---------------------------------------------------------------------------
// Global Variables & Configuration
// ---------------------------------------------------------------------------
let lossChart = null;
let statusInterval = null;
let logsInterval = null;
let lastLogLineCount = 0;
let isModelLoading = false;

// UI Elements
const els = {
    // Nav tabs
    tabTrainBtn: document.getElementById('tab-train-btn'),
    tabPlayBtn: document.getElementById('tab-play-btn'),
    tabDashBtn: document.getElementById('tab-dash-btn'),
    tabTrain: document.getElementById('tab-train'),
    tabPlay: document.getElementById('tab-play'),
    tabDash: document.getElementById('tab-dash'),
    pageTitle: document.getElementById('page-title'),

    // Sys Stats
    cpuPercent: document.getElementById('cpu-percent'),
    ramPercent: document.getElementById('ram-percent'),
    gpuPercent: document.getElementById('gpu-percent'),
    gpuVram: document.getElementById('gpu-vram'),
    gpuTemp: document.getElementById('gpu-temp'),

    // Model Status Card
    modelStatusDot: document.getElementById('model-status-dot'),
    modelStatusText: document.getElementById('model-status-text'),
    loadModelBtn: document.getElementById('load-model-btn'),
    unloadModelBtn: document.getElementById('unload-model-btn'),

    // Training metrics
    datasetCount: document.getElementById('dataset-count'),
    trainStep: document.getElementById('train-step'),
    trainLoss: document.getElementById('train-loss'),
    trainLr: document.getElementById('train-lr'),
    trainingBadge: document.getElementById('training-badge'),

    // Training Controls & Form
    epochs: document.getElementById('epochs'),
    maxSteps: document.getElementById('max_steps'),
    lr: document.getElementById('lr'),
    loraRank: document.getElementById('lora_rank'),
    noMerge: document.getElementById('no_merge'),
    startTrainBtn: document.getElementById('start-train-btn'),
    stopTrainBtn: document.getElementById('stop-train-btn'),

    // Console
    consoleTerminal: document.getElementById('console-terminal'),
    clearConsoleBtn: document.getElementById('clear-console-btn'),

    // Playground Left Column
    maxNewTokens: document.getElementById('max_new_tokens'),
    temperature: document.getElementById('temperature'),
    topP: document.getElementById('top_p'),
    lblMaxTokens: document.getElementById('lbl-max-tokens'),
    lblTemperature: document.getElementById('lbl-temperature'),
    lblTopp: document.getElementById('lbl-topp'),
    adapterWarning: document.getElementById('adapter-warning'),

    // Playground Chat
    trainingActiveBanner: document.getElementById('training-active-banner'),
    chatModelBadge: document.getElementById('chat-model-badge'),
    chatThread: document.getElementById('chat-thread'),
    clearChatBtn: document.getElementById('clear-chat-btn'),
    suggestions: document.getElementById('suggestions'),
    promptInput: document.getElementById('prompt-input'),
    sendBtn: document.getElementById('send-btn'),
    generationStats: document.getElementById('generation-stats'),
    statTime: document.getElementById('stat-time'),
    statTokens: document.getElementById('stat-tokens'),
    statSpeed: document.getElementById('stat-speed'),
    statVram: document.getElementById('stat-vram'),

    // Dashboard Builder Chat
    dashChatThread: document.getElementById('dash-chat-thread'),
    clearDashChatBtn: document.getElementById('clear-dash-chat-btn'),
    dashPromptInput: document.getElementById('dash-prompt-input'),
    dashSendBtn: document.getElementById('dash-send-btn')
};

// ---------------------------------------------------------------------------
// Chart Initialization
// ---------------------------------------------------------------------------
function initChart() {
    const ctx = document.getElementById('lossChart').getContext('2d');
    lossChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Training Loss',
                data: [],
                borderColor: '#c084fc',
                backgroundColor: 'rgba(192, 132, 252, 0.1)',
                borderWidth: 2,
                tension: 0.2,
                fill: true,
                pointRadius: 1,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Steps', color: '#9ca3af' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#6b7280' }
                },
                y: {
                    title: { display: true, text: 'Loss', color: '#9ca3af' },
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#6b7280' }
                }
            }
        }
    });
}

function updateChart(history) {
    if (!lossChart) return;
    
    const steps = history.map(h => h.step);
    const losses = history.map(h => h.loss);
    
    lossChart.data.labels = steps;
    lossChart.data.datasets[0].data = losses;
    lossChart.update('none'); // silent update
}

// ---------------------------------------------------------------------------
// Tab Controls
// ---------------------------------------------------------------------------
els.tabTrainBtn.addEventListener('click', () => {
    els.tabTrainBtn.classList.add('active');
    els.tabPlayBtn.classList.remove('active');
    els.tabDashBtn.classList.remove('active');
    els.tabTrain.classList.add('active');
    els.tabPlay.classList.remove('active');
    els.tabDash.classList.remove('active');
    els.pageTitle.innerText = 'Training Monitor';
});

els.tabPlayBtn.addEventListener('click', () => {
    els.tabPlayBtn.classList.add('active');
    els.tabTrainBtn.classList.remove('active');
    els.tabDashBtn.classList.remove('active');
    els.tabPlay.classList.add('active');
    els.tabTrain.classList.remove('active');
    els.tabDash.classList.remove('active');
    els.pageTitle.innerText = 'Model Playground';
});

els.tabDashBtn.addEventListener('click', () => {
    els.tabDashBtn.classList.add('active');
    els.tabTrainBtn.classList.remove('active');
    els.tabPlayBtn.classList.remove('active');
    els.tabDash.classList.add('active');
    els.tabTrain.classList.remove('active');
    els.tabPlay.classList.remove('active');
    els.pageTitle.innerText = 'AI Dashboard Builder';
});

// Playground Param Labels
els.maxNewTokens.addEventListener('input', (e) => {
    els.lblMaxTokens.innerText = `${e.target.value} tokens`;
});
els.temperature.addEventListener('input', (e) => {
    els.lblTemperature.innerText = e.target.value;
});
els.topP.addEventListener('input', (e) => {
    els.lblTopp.innerText = e.target.value;
});

// ---------------------------------------------------------------------------
// API Status Updates & Polling
// ---------------------------------------------------------------------------
async" use strict";

async function fetchStatus() {
    try {
        const res = await fetch(API_BASE_URL + '/api/status');
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const data = await res.json();
        
        updateSystemStats(data.system);
        updateModelStatus(data.model);
        updateTrainingStatus(data.training, data.dataset);
        
    } catch (e) {
        console.error("Error fetching status:", e);
    }
}

function updateSystemStats(sys) {
    els.cpuPercent.innerText = `${sys.cpu_percent}%`;
    els.ramPercent.innerText = `${sys.ram.percent}%`;
    
    if (sys.gpu.available) {
        els.gpuPercent.innerText = `${sys.gpu.gpu_util}%`;
        els.gpuVram.innerText = `${sys.gpu.used_vram} / ${sys.gpu.total_vram} MB`;
        els.gpuTemp.innerText = `${sys.gpu.gpu_temp}°C`;
    } else {
        els.gpuPercent.innerText = 'N/A';
        els.gpuVram.innerText = 'N/A';
        els.gpuTemp.innerText = 'N/A';
    }
}

function updateModelStatus(model) {
    // Model Warning about adapter availability
    if (model.adapter_available) {
        els.adapterWarning.style.display = 'none';
        els.chatModelBadge.innerText = model.type === 'peft' ? 'TinyLlama-1.1B + LoRA' : 'TinyLlama-1.1B (Base)';
    } else {
        els.adapterWarning.style.display = 'flex';
        els.chatModelBadge.innerText = 'TinyLlama-1.1B (Base)';
    }

    if (model.is_loading) {
        els.modelStatusDot.className = 'status-dot warning';
        els.modelStatusText.innerText = 'Loading...';
        els.loadModelBtn.disabled = true;
        els.unloadModelBtn.disabled = true;
        isModelLoading = true;
    } else if (model.loaded) {
        els.modelStatusDot.className = 'status-dot online';
        els.modelStatusText.innerText = model.type === 'peft' ? 'LoRA Loaded' : 'Base Loaded';
        els.loadModelBtn.disabled = true;
        els.unloadModelBtn.disabled = false;
        isModelLoading = false;
    } else {
        els.modelStatusDot.className = 'status-dot offline';
        els.modelStatusText.innerText = 'Not Loaded';
        els.loadModelBtn.disabled = false;
        els.unloadModelBtn.disabled = true;
        isModelLoading = false;
    }
}

function updateTrainingStatus(train, dataset) {
    els.datasetCount.innerText = dataset.exists ? dataset.records.toLocaleString() : 'No DB';
    
    const isActive = train.active;
    
    // UI states depending on whether training is active
    if (isActive) {
        els.trainingBadge.innerText = 'Active';
        els.trainingBadge.className = 'badge active';
        els.startTrainBtn.disabled = true;
        els.stopTrainBtn.disabled = false;
        els.trainingActiveBanner.style.display = 'flex';
        els.sendBtn.disabled = true;
        els.promptInput.disabled = true;
        
        // Disable fields during training
        els.epochs.disabled = true;
        els.maxSteps.disabled = true;
        els.lr.disabled = true;
        els.loraRank.disabled = true;
        els.noMerge.disabled = true;
    } else {
        els.trainingBadge.innerText = 'Idle';
        els.trainingBadge.className = 'badge';
        els.startTrainBtn.disabled = false;
        els.stopTrainBtn.disabled = true;
        els.trainingActiveBanner.style.display = 'none';
        els.sendBtn.disabled = false;
        els.promptInput.disabled = false;
        
        // Re-enable fields
        els.epochs.disabled = false;
        els.maxSteps.disabled = false;
        els.lr.disabled = false;
        els.loraRank.disabled = false;
        els.noMerge.disabled = false;
    }
    
    // Update live metrics from progress.json
    const prog = train.progress;
    if (prog && prog.step !== undefined) {
        const max = prog.max_steps > 0 ? prog.max_steps : 'Calculating...';
        els.trainStep.innerText = `${prog.step} / ${max}`;
        els.trainLoss.innerText = prog.loss ? prog.loss.toFixed(4) : '--';
        els.trainLr.innerText = prog.learning_rate ? prog.learning_rate.toExponential(3) : '--';
        
        if (prog.history && prog.history.length > 0) {
            updateChart(prog.history);
        }
    } else {
        els.trainStep.innerText = '--';
        els.trainLoss.innerText = '--';
        els.trainLr.innerText = '--';
    }
}

// ---------------------------------------------------------------------------
// Log Tailing
// ---------------------------------------------------------------------------
async function fetchLogs() {
    try {
        const res = await fetch(API_BASE_URL + '/api/train/logs?limit=100');
        if (!res.ok) return;
        const data = await res.json();
        
        // Only re-render terminal if there are new lines
        if (data.logs.length !== lastLogLineCount) {
            lastLogLineCount = data.logs.length;
            els.consoleTerminal.innerHTML = '';
            
            data.logs.forEach(line => {
                const lineEl = document.createElement('div');
                lineEl.className = 'log-line';
                
                // Color codes for certain strings
                if (line.includes('Starting training') || line.includes('Training complete')) {
                    lineEl.classList.add('system');
                } else if (line.includes('Error') || line.includes('Exception') || line.includes('CUDA not available')) {
                    lineEl.classList.add('error');
                } else if (line.includes('Saving LoRA adapter') || line.includes('Merged model saved')) {
                    lineEl.classList.add('success');
                }
                
                lineEl.innerText = line;
                els.consoleTerminal.appendChild(lineEl);
            });
            
            // Scroll to bottom
            els.consoleTerminal.scrollTop = els.consoleTerminal.scrollHeight;
        }
    } catch (e) {
        console.error("Error fetching logs:", e);
    }
}

// ---------------------------------------------------------------------------
// Training Actions
// ---------------------------------------------------------------------------
els.startTrainBtn.addEventListener('click', async () => {
    const epochs = parseInt(els.epochs.value);
    const max_steps = parseInt(els.maxSteps.value);
    const lr = parseFloat(els.lr.value);
    const lora_rank = parseInt(els.loraRank.value);
    const no_merge = els.noMerge.checked;
    
    // Clear terminal log screen
    els.consoleTerminal.innerHTML = '<div class="log-line system">Sending start training command to server...</div>';
    lastLogLineCount = 0;
    
    try {
        const res = await fetch(API_BASE_URL + '/api/train/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ epochs, max_steps, lr, lora_rank, no_merge })
        });
        
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.detail || "Server error starting training");
        }
        
        appendSystemLog("Training process launched successfully.");
        // Immediately fetch status and start tailing logs frequently
        fetchStatus();
        
    } catch (e) {
        appendErrorLog(`Failed to start training: ${e.message}`);
    }
});

els.stopTrainBtn.addEventListener('click', async () => {
    appendSystemLog("Sending stop request...");
    try {
        const res = await fetch(API_BASE_URL + '/api/train/stop', { method: 'POST' });
        if (res.ok) {
            appendSystemLog("Training stopped successfully.");
            fetchStatus();
        } else {
            throw new Error("HTTP error " + res.status);
        }
    } catch (e) {
        appendErrorLog(`Failed to stop training: ${e.message}`);
    }
});

els.clearConsoleBtn.addEventListener('click', () => {
    els.consoleTerminal.innerHTML = '<div class="log-line system">Console cleared.</div>';
    lastLogLineCount = 0;
});

function appendSystemLog(msg) {
    const el = document.createElement('div');
    el.className = 'log-line system';
    el.innerText = `[Studio] ${msg}`;
    els.consoleTerminal.appendChild(el);
    els.consoleTerminal.scrollTop = els.consoleTerminal.scrollHeight;
}

function appendErrorLog(msg) {
    const el = document.createElement('div');
    el.className = 'log-line error';
    el.innerText = `[Studio] Error: ${msg}`;
    els.consoleTerminal.appendChild(el);
    els.consoleTerminal.scrollTop = els.consoleTerminal.scrollHeight;
}

// ---------------------------------------------------------------------------
// Model Loading Actions
// ---------------------------------------------------------------------------
els.loadModelBtn.addEventListener('click', async () => {
    els.modelStatusDot.className = 'status-dot warning';
    els.modelStatusText.innerText = 'Loading...';
    els.loadModelBtn.disabled = true;
    
    try {
        const res = await fetch(API_BASE_URL + '/api/model/load', { method: 'POST' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Error loading model");
        
        fetchStatus();
    } catch (e) {
        alert("Failed to load model: " + e.message);
        fetchStatus();
    }
});

els.unloadModelBtn.addEventListener('click', async () => {
    try {
        const res = await fetch(API_BASE_URL + '/api/model/unload', { method: 'POST' });
        if (!res.ok) throw new Error("Error unloading model");
        fetchStatus();
    } catch (e) {
        alert("Failed to unload model: " + e.message);
        fetchStatus();
    }
});

// ---------------------------------------------------------------------------
// Chat playground
// ---------------------------------------------------------------------------
els.clearChatBtn.addEventListener('click', () => {
    els.chatThread.innerHTML = `
        <div class="message assistant">
            <div class="message-content">
                <p>Hello! I am fine-tuned on Form ADV filing summaries and general regulatory information. Ask me anything about the registered investment advisers, Exempt Reporting Advisers, or Form ADV rules.</p>
            </div>
        </div>
    `;
    els.generationStats.style.display = 'none';
});

async function sendPrompt(text) {
    if (!text.trim()) return;
    
    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<div class="message-content"><p>${escapeHtml(text)}</p></div>`;
    els.chatThread.appendChild(userMsg);
    els.chatThread.scrollTop = els.chatThread.scrollHeight;
    
    els.promptInput.value = '';
    
    // Disable inputs while generating
    els.sendBtn.disabled = true;
    els.promptInput.disabled = true;
    
    // Add assistant typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message assistant typing-indicator-msg';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    els.chatThread.appendChild(typingIndicator);
    els.chatThread.scrollTop = els.chatThread.scrollHeight;
    
    const model_type = document.querySelector('input[name="model_type"]:checked').value;
    const max_new_tokens = parseInt(els.maxNewTokens.value);
    const temperature = parseFloat(els.temperature.value);
    const top_p = parseFloat(els.topP.value);
    
    try {
        const res = await fetch(API_BASE_URL + '/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: text,
                model_type,
                max_new_tokens,
                temperature,
                top_p
            })
        });
        
        const data = await res.json();
        
        // Remove typing indicator
        const indicator = els.chatThread.querySelector('.typing-indicator-msg');
        if (indicator) indicator.remove();
        
        if (!res.ok) {
            throw new Error(data.detail || "Server error during generation");
        }
        
        // Append Assistant Message
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'message assistant';
        assistantMsg.innerHTML = `<div class="message-content"><p>${formatAssistantResponse(data.response)}</p></div>`;
        els.chatThread.appendChild(assistantMsg);
        
        // Show Generation metrics
        els.statTime.innerText = `${data.generation_time_sec.toFixed(1)}s`;
        els.statTokens.innerText = data.num_tokens;
        els.statSpeed.innerText = `${data.tokens_sec.toFixed(1)} tok/s`;
        els.statVram.innerText = `${Math.round(data.vram_allocated_mb)} MB`;
        els.generationStats.style.display = 'flex';
        
    } catch (e) {
        // Remove typing indicator
        const indicator = els.chatThread.querySelector('.typing-indicator-msg');
        if (indicator) indicator.remove();
        
        // Append system error message
        const errMsg = document.createElement('div');
        errMsg.className = 'message system';
        errMsg.innerHTML = `<div class="message-content"><strong>Inference Error:</strong> ${e.message}</div>`;
        els.chatThread.appendChild(errMsg);
    } finally {
        els.sendBtn.disabled = false;
        els.promptInput.disabled = false;
        els.promptInput.focus();
        els.chatThread.scrollTop = els.chatThread.scrollHeight;
    }
}

// Key handler for textarea
els.promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const text = els.promptInput.value;
        sendPrompt(text);
    }
});

els.sendBtn.addEventListener('click', () => {
    const text = els.promptInput.value;
    sendPrompt(text);
});

window.sendSuggestion = function(text) {
    sendPrompt(text);
};

// ---------------------------------------------------------------------------
// Code Snippets tabs
// ---------------------------------------------------------------------------
window.switchDocTab = function(type) {
    const btnContainer = document.querySelector('.tab-docs-nav');
    const buttons = btnContainer.querySelectorAll('.doc-tab-btn');
    
    // Set active button
    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(type)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Set active pre code block
    document.getElementById('code-curl').style.display = type === 'curl' ? 'block' : 'none';
    document.getElementById('code-python').style.display = type === 'python' ? 'block' : 'none';
    document.getElementById('code-fetch').style.display = type === 'fetch' ? 'block' : 'none';
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatAssistantResponse(text) {
    // Basic formatting: convert linebreaks and markdown bold/bullets
    let formatted = escapeHtml(text);
    
    // **bold** -> <strong>bold</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // * bullet -> list item (basic replacement)
    formatted = formatted.replace(/^\*\s(.*)$/gm, '• $1');
    
    // New lines to br
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
}

// ---------------------------------------------------------------------------
// Dashboard Builder chat
// ---------------------------------------------------------------------------
els.clearDashChatBtn.addEventListener('click', () => {
    els.dashChatThread.innerHTML = `
        <div class="message assistant">
            <div class="message-content">
                <p>Hello! Ask me any analytical question about the investment advisers database. I will query the live SQLite data and draw a dashboard chart for you!</p>
            </div>
        </div>
    `;
});

async function sendDashPrompt(text) {
    if (!text.trim()) return;
    
    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerHTML = `<div class="message-content"><p>${escapeHtml(text)}</p></div>`;
    els.dashChatThread.appendChild(userMsg);
    els.dashChatThread.scrollTop = els.dashChatThread.scrollHeight;
    
    els.dashPromptInput.value = '';
    
    // Disable inputs while generating
    els.dashSendBtn.disabled = true;
    els.dashPromptInput.disabled = true;
    
    // Add assistant typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message assistant typing-indicator-msg';
    typingIndicator.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    els.dashChatThread.appendChild(typingIndicator);
    els.dashChatThread.scrollTop = els.dashChatThread.scrollHeight;
    
    try {
        const res = await fetch(API_BASE_URL + '/api/chat/dashboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: text })
        });
        
        const data = await res.json();
        
        // Remove typing indicator
        const indicator = els.dashChatThread.querySelector('.typing-indicator-msg');
        if (indicator) indicator.remove();
        
        if (!res.ok) {
            throw new Error(data.detail || "Server error during SQL generation");
        }
        
        // Build response message
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'message assistant';
        
        // Add unique ID for new chart canvas
        const chartId = `chart-${Date.now()}`;
        
        let messageContentHTML = `<div class="message-content"><p>${formatAssistantResponse(data.text_response)}</p>`;
        
        // Add SQL query toggle block
        if (data.sql) {
            messageContentHTML += `
                <button class="sql-toggle-btn" onclick="toggleSql(this)">Show SQLite Query</button>
                <pre class="sql-code-block"><code>${escapeHtml(data.sql)}</code></pre>
            `;
        }
        
        // Add Chart canvas if config is returned
        if (data.chart_config) {
            messageContentHTML += `
                <div class="chart-card">
                    <div class="chart-wrapper">
                        <canvas id="${chartId}"></canvas>
                    </div>
                </div>
            `;
        } 
        // Render raw table if table type and rows exist
        else if (data.data && data.data.length > 0) {
            const cols = Object.keys(data.data[0]);
            let tableHTML = `
                <div class="chat-table-wrapper">
                    <table class="chat-table">
                        <thead>
                            <tr>
                                ${cols.map(c => `<th>${escapeHtml(c.replace('_', ' ').toUpperCase())}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${data.data.map(row => `
                                <tr>
                                    ${cols.map(c => {
                                        let val = row[c];
                                        if (typeof val === 'number' && val > 100000) {
                                            val = val.toLocaleString();
                                        }
                                        return `<td>${escapeHtml(String(val !== null ? val : ''))}</td>`;
                                    }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            messageContentHTML += tableHTML;
        }
        
        messageContentHTML += `</div>`;
        assistantMsg.innerHTML = messageContentHTML;
        els.dashChatThread.appendChild(assistantMsg);
        
        // Initialize Chart.js on the canvas if created
        if (data.chart_config) {
            const canvasCtx = document.getElementById(chartId).getContext('2d');
            
            // Setup responsive chart options for embedding
            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: data.chart_config.type === 'pie' || data.chart_config.type === 'doughnut',
                        labels: { color: '#9ca3af', boxWidth: 12, font: { family: 'Outfit', size: 11 } }
                    }
                },
                scales: {}
            };
            
            // Disable grid lines for circular charts
            if (data.chart_config.type !== 'pie' && data.chart_config.type !== 'doughnut') {
                chartOptions.scales = {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.03)' },
                        ticks: { color: '#9ca3af', font: { family: 'Outfit', size: 10 } }
                    },
                    y: {
                        grid: { color: 'rgba(255,255,255,0.03)' },
                        ticks: {
                            color: '#9ca3af',
                            font: { family: 'Outfit', size: 10 },
                            callback: function(value) {
                                // Formatting for large numbers (AUM / Count)
                                if (value >= 1e12) return '$' + (value / 1e12).toFixed(1) + 'T';
                                if (value >= 1e9) return '$' + (value / 1e9).toFixed(1) + 'B';
                                if (value >= 1e6) return '$' + (value / 1e6).toFixed(1) + 'M';
                                if (value >= 1000) return value.toLocaleString();
                                return value;
                            }
                        }
                    }
                };
            }
            
            new Chart(canvasCtx, {
                type: data.chart_config.type,
                data: data.chart_config.data,
                options: chartOptions
            });
        }
        
    } catch (e) {
        // Remove typing indicator
        const indicator = els.dashChatThread.querySelector('.typing-indicator-msg');
        if (indicator) indicator.remove();
        
        // Append error card
        const errMsg = document.createElement('div');
        errMsg.className = 'message system';
        errMsg.innerHTML = `<div class="message-content"><strong>Dashboard Builder Error:</strong> ${e.message}</div>`;
        els.dashChatThread.appendChild(errMsg);
    } finally {
        els.dashSendBtn.disabled = false;
        els.dashPromptInput.disabled = false;
        els.dashPromptInput.focus();
        els.dashChatThread.scrollTop = els.dashChatThread.scrollHeight;
    }
}

// Global window functions
window.sendDashSuggestion = function(text) {
    sendDashPrompt(text);
};

window.toggleSql = function(btn) {
    const codeBlock = btn.nextElementSibling;
    if (codeBlock.style.display === 'block') {
        codeBlock.style.display = 'none';
        btn.innerText = 'Show SQLite Query';
    } else {
        codeBlock.style.display = 'block';
        btn.innerText = 'Hide SQLite Query';
    }
};

// Input listeners for dashboard prompt
els.dashPromptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendDashPrompt(els.dashPromptInput.value);
    }
});

els.dashSendBtn.addEventListener('click', () => {
    sendDashPrompt(els.dashPromptInput.value);
});

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    
    // Run status updates immediately
    fetchStatus();
    fetchLogs();
    
    // Set status intervals
    statusInterval = setInterval(fetchStatus, 3000);
    
    // Set log checks
    logsInterval = setInterval(() => {
        // Only pull logs if training is running
        // Or if logs are still empty (to load initial content)
        fetchLogs();
    }, 2000);
});

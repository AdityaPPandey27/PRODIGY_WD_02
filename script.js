/**
 * Stopwatch Application Logic
 * Utilizes performance.now() for high-accuracy timing drift prevention.
 */

// ==========================
// STATE VARIABLES
// ==========================
let startTime = 0;
let elapsedTime = 0;
let lastLapTime = 0;
let timerAnimationFrame;
let state = 'stopped'; // 'stopped', 'running', 'paused'
let laps = [];

// ==========================
// DOM ELEMENTS
// ==========================
const display = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    milliseconds: document.getElementById('milliseconds'),
    container: document.getElementById('timer-display')
};

const buttons = {
    start: document.getElementById('btn-start'),
    pause: document.getElementById('btn-pause'),
    resume: document.getElementById('btn-resume'),
    lap: document.getElementById('btn-lap'),
    reset: document.getElementById('btn-reset')
};

const statusEl = {
    text: document.getElementById('status-text'),
    dot: document.getElementById('status-dot')
};

const lapsData = {
    container: document.getElementById('laps-list'),
    count: document.getElementById('lap-count')
};

// ==========================
// CORE TIMER FUNCTIONS
// ==========================

/**
 * Formats time in milliseconds to an object containing HH, MM, SS, MS strings
 */
function formatTime(timeInMs) {
    const totalMs = Math.floor(timeInMs);
    const ms = Math.floor(totalMs % 1000);
    const totalSeconds = Math.floor(totalMs / 1000);
    const s = totalSeconds % 60;
    const m = Math.floor(totalSeconds / 60) % 60;
    const h = Math.floor(totalSeconds / 3600);

    return {
        h: h.toString().padStart(2, '0'),
        m: m.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0'),
        ms: ms.toString().padStart(3, '0')
    };
}

/**
 * Updates the DOM elements with the current formatted time
 */
function updateDisplay(time) {
    const formatted = formatTime(time);
    display.hours.textContent = formatted.h;
    display.minutes.textContent = formatted.m;
    display.seconds.textContent = formatted.s;
    display.milliseconds.textContent = formatted.ms;
}

/**
 * The main timer loop using requestAnimationFrame for smooth 60fps updates
 */
function timerLoop() {
    elapsedTime = performance.now() - startTime;
    updateDisplay(elapsedTime);
    timerAnimationFrame = requestAnimationFrame(timerLoop);
}

// ==========================
// CONTROL ACTIONS
// ==========================

function startTimer() {
    if (state === 'running') return;
    
    // Calculate start time relative to already elapsed time (if resuming)
    startTime = performance.now() - elapsedTime;
    timerAnimationFrame = requestAnimationFrame(timerLoop);
    
    state = 'running';
    updateUI();
}

function pauseTimer() {
    if (state !== 'running') return;
    
    cancelAnimationFrame(timerAnimationFrame);
    state = 'paused';
    updateUI();
}

function resetTimer() {
    cancelAnimationFrame(timerAnimationFrame);
    state = 'stopped';
    elapsedTime = 0;
    lastLapTime = 0;
    laps = [];
    
    updateDisplay(0);
    renderLaps();
    updateUI();
}

function recordLap() {
    if (state !== 'running') return;
    
    const currentLapTime = elapsedTime - lastLapTime;
    lastLapTime = elapsedTime;
    
    laps.unshift({
        total: elapsedTime,
        diff: currentLapTime
    });
    
    renderLaps();
}

// ==========================
// UI MANAGEMENT
// ==========================

function updateUI() {
    // Reset classes
    statusEl.dot.className = 'dot';
    buttons.start.classList.add('hidden');
    buttons.pause.classList.add('hidden');
    buttons.resume.classList.add('hidden');
    buttons.lap.classList.add('hidden');
    buttons.reset.classList.add('hidden');
    display.container.classList.remove('active-glow');

    switch (state) {
        case 'stopped':
            statusEl.text.textContent = 'Stopped';
            statusEl.dot.classList.add('stopped');
            buttons.start.classList.remove('hidden');
            break;
            
        case 'running':
            statusEl.text.textContent = 'Running';
            statusEl.dot.classList.add('running');
            display.container.classList.add('active-glow');
            
            buttons.pause.classList.remove('hidden');
            buttons.lap.classList.remove('hidden');
            buttons.reset.classList.remove('hidden');
            
            buttons.lap.disabled = false;
            break;
            
        case 'paused':
            statusEl.text.textContent = 'Paused';
            statusEl.dot.classList.add('paused');
            
            buttons.resume.classList.remove('hidden');
            buttons.lap.classList.remove('hidden');
            buttons.reset.classList.remove('hidden');
            
            // Disable Lap button while paused
            buttons.lap.disabled = true;
            break;
    }
}

function renderLaps() {
    lapsData.count.textContent = `${laps.length} Total`;
    
    if (laps.length === 0) {
        lapsData.container.innerHTML = '<div class="empty-state">No laps recorded yet</div>';
        return;
    }

    // Clear and re-render to ensure newest is always at the top
    lapsData.container.innerHTML = '';
    
    laps.forEach((lap, index) => {
        const lapNum = laps.length - index;
        const totalFmt = formatTime(lap.total);
        const diffFmt = formatTime(lap.diff);
        
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        
        lapElement.innerHTML = `
            <div class="lap-details">
                <span class="lap-number">Lap ${lapNum}</span>
                <span class="lap-diff">+ ${diffFmt.h}:${diffFmt.m}:${diffFmt.s}:${diffFmt.ms}</span>
            </div>
            <div class="lap-total" aria-label="Total time">
                ${totalFmt.h}:${totalFmt.m}:${totalFmt.s}:${totalFmt.ms}
            </div>
        `;
        
        lapsData.container.appendChild(lapElement);
    });

    // Auto-scroll to top (since newest is added to top)
    lapsData.container.scrollTop = 0;
}

// ==========================
// EVENT LISTENERS
// ==========================

// Button Clicks
buttons.start.addEventListener('click', startTimer);
buttons.pause.addEventListener('click', pauseTimer);
buttons.resume.addEventListener('click', startTimer);
buttons.reset.addEventListener('click', resetTimer);
buttons.lap.addEventListener('click', recordLap);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ignore keyboard shortcuts if user is focused on an input/textarea (though we have none here)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.code) {
        case 'Space':
            e.preventDefault(); // Prevent page scroll
            if (state === 'stopped' || state === 'paused') {
                startTimer();
            } else if (state === 'running') {
                pauseTimer();
            }
            break;
        case 'KeyL':
            if (state === 'running') recordLap();
            break;
        case 'KeyR':
            resetTimer();
            break;
    }
});
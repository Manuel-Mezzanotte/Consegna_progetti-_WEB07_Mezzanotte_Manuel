let startTime = null;
let elapsed = 0;
let intervalId = null;
let lapCounter = 0;
const lapsList = document.getElementById('lapsList');


function updateDisplay() {
   const totalMs = Math.floor(elapsed);
    const min = String(Math.floor(totalMs / 60000)).padStart(2, '0');
    const sec = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, '0');
    const ms = String(totalMs % 1000).padStart(3, '0');
    document.getElementById('display').textContent = `${min}:${sec}.${ms}`;
    return `${min}:${sec}.${ms}`;
}

function startTimer() {
    if (!intervalId) {
        startTime = performance.now() - elapsed;
        intervalId = setInterval(() => {
            elapsed = performance.now() - startTime;
            updateDisplay();
        }, 10); 
    }
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function resetTimer() {
    stopTimer();
    elapsed = 0;
    updateDisplay();
    lapCounter = 0;
    lapsList.innerHTML = '';
}

function recordLap() {
    if (intervalId) {
        lapCounter++;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Giro ${lapCounter}: ${updateDisplay(elapsed)}`;
        lapsList.prepend(lapItem); 
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

document.getElementById('lap').disabled = true;
document.getElementById('start').addEventListener('click', function() {
    document.getElementById('lap').disabled = false;
});
document.getElementById('stop').addEventListener('click', function() {
    document.getElementById('lap').disabled = true;
});
document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('lap').disabled = true;
});

updateDisplay();
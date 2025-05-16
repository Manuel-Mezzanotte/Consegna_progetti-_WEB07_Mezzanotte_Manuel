let seconds = 0;
let intervalId = null;

function updateDisplay() {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    document.getElementById('display').textContent = `${min}:${sec}`;
}

function startTimer() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
}

document.getElementById('start').addEventListener('click', startTimer);

updateDisplay();
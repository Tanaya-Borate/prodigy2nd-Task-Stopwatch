let startTime;
let running = false;
let interval;
let laps = [];
let lapId = 1;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startPauseTimer() {
  if (!running) {
    startTime = Date.now() - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
    interval = setInterval(updateTimer, 10);
    startPauseBtn.textContent = 'Pause';
    running = true;
  } else {
    clearInterval(interval);
    startPauseBtn.textContent = 'Resume';
    running = false;
  }
}

function updateTimer() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  display.textContent = formattedTime;
}

function formatTime(time) {
  const pad = (num) => num.toString().padStart(2, '0');
  const hours = pad(Math.floor(time / 3600000));
  const minutes = pad(Math.floor((time % 3600000) / 60000));
  const seconds = pad(Math.floor((time % 60000) / 1000));
  const milliseconds = pad(Math.floor((time % 1000) / 10));
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function resetTimer() {
  clearInterval(interval);
  display.textContent = '00:00:00';
  running = false;
  startPauseBtn.textContent = 'Start';
  laps = [];
  lapId = 1;
  lapsList.innerHTML = '';
}

function recordLap() {
  if (running) {
    const currentTime = Date.now() - startTime;
    const lapTime = formatTime(currentTime);
    laps.push(currentTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapId}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapId++;
  }
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

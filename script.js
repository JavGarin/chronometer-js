// Elementos del DOM
const stopwatch = document.getElementById("stopwatch");
const playPauseButton = document.getElementById("play-pause");
const stopButton = document.getElementById("stop");
const secondsSphere = document.getElementById("seconds-sphere");

// Variables
let stopwatchInterval;
let runningTime = 0;
let isRunning = false;

// Funciones
const start = () => {
  secondsSphere.style.animationPlayState = "running";
  const startTime = Date.now() - runningTime;
  stopwatchInterval = setInterval(() => {
    runningTime = Date.now() - startTime;
    stopwatch.textContent = formatTime(runningTime);
  }, 1000);
};

const pause = () => {
  secondsSphere.style.animationPlayState = "paused";
  clearInterval(stopwatchInterval);
};

const stop = () => {
  runningTime = 0;
  clearInterval(stopwatchInterval);
  stopwatch.textContent = "00:00";
  secondsSphere.style.animation = "none";
  void secondsSphere.offsetWidth; // Reiniciar la animación
  secondsSphere.style.animation = "rotate 60s linear infinite";
  secondsSphere.style.animationPlayState = "paused";
  isRunning = false;
  playPauseButton.textContent = "Play";
};

const playPause = () => {
  if (isRunning) {
    pause();
    playPauseButton.textContent = "Play";
  } else {
    start();
    playPauseButton.textContent = "Pause";
  }
  isRunning = !isRunning;
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

// Event Listeners
playPauseButton.addEventListener("click", playPause);
stopButton.addEventListener("click", stop);
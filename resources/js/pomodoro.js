// @ts-check (checks code using JSDoc using TypeScript rules)
/**
 * @typedef {import("./global").UserSettings} UserSettings
 */
/**
 * Thanks to https://github.com/hellomayuko/Pomodoro-Countdown for the original code
*/

export const secondsInaMinute = 60;

/**
 * An interval. Later set with setInterval()
 * @type {number}
 * See also {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval#return_value} for the official documentation.
 */
export let interval;

export let isPaused = true;
export let countdownWasStarted = false;
export let pomodoroDuration = 25 * secondsInaMinute; // Default duration of 25 minutes
export let timeLeftInSeconds = 0;
export const pomodoroCountdown = document.getElementById("pomodoro-countdown");
if(!pomodoroCountdown){
  throw new Error(`Element with id "pomodoro-countdown" not found.`);
}

// Button Handlers

export function playPauseCountdown() {
  isPaused = !isPaused

  updatePlayPauseButton();

  if(!countdownWasStarted) {
    //This function could be called after initiating the timer,
    //so we need to differentiate when its start vs pause vs resume
    resetCountdown()
    updateTimeString()
  }

  countdownWasStarted = true

  if(isPaused) {
    stopCountdown()
  } else {
    // Update the count down every 1 second
    interval = setInterval(updateCountdown, 1000);
  }
}

export function restartCountdown() {
  //When we reset the countdown, stop the interval and reset things back to normal
  stopCountdown()
  resetCountdown()

  isPaused = true
  updatePlayPauseButton()
  updateTimeString()
}

// Biz Logic
export function updateCountdown() {
  if(isPaused) {
    return
  }

  timeLeftInSeconds--;

  updateTimeString();

  if(timeLeftInSeconds == 0) {
    alertTimerEnd()
    stopCountdown()
    isPaused = true
    updatePlayPauseButton()
  }
}

export function pauseCountdown() {
  isPaused = !isPaused;
}

export function stopCountdown() {
  clearInterval(interval)
}

export function resetCountdown() {
  isPaused = false
  timeLeftInSeconds = pomodoroDuration
}

// View Updates
export function updatePlayPauseButton() {
  const playPausePomodoroElement = document.querySelector("#playPausePomodoro");
  if(!playPausePomodoroElement){
    throw new Error(`Element with id "playPausePomodoro" not found`)
  }
    if(isPaused) {
        playPausePomodoroElement.textContent = "pause";
    } else {
        playPausePomodoroElement.textContent = "play";
    }
}

export function updateTimeString() {
  let minutes = Math.floor(timeLeftInSeconds / secondsInaMinute);
  let seconds = timeLeftInSeconds % secondsInaMinute;
  let secondsString;
  if(seconds < 10) {
    secondsString = "0" + seconds
  } else {
    secondsString = seconds
  }

  if(pomodoroCountdown){
    pomodoroCountdown.innerHTML = minutes + ":" + secondsString;
  }
}

export function alertTimerEnd() {
  alert("Time's up!");
}

export function initializePomodoroTimer (){
    document.querySelector("#playPausePomodoro")?.addEventListener("click", playPauseCountdown);
    document.querySelector("#resetPomodoro")?.addEventListener("click", restartCountdown);
}

/**
 * @param {UserSettings} passedUserSettings
 */
export function updatePomodoroValues(passedUserSettings) {
    pomodoroDuration = parseInt(passedUserSettings.pomodoro.timerDurationMinutes) * secondsInaMinute;
    restartCountdown();
}
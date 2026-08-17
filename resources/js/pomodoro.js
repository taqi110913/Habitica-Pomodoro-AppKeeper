export async function startPomodoroTimer() {
    globalThis.timerInterval; // Global variable to hold the timer interval
    const endTimerTime = new Date();
    endTimerTime.setMinutes(endTimerTime.getMinutes() + (parseInt(await Neutralino.storage.getData("timerDurationMinutes"))));
    timerInterval = setInterval(()=>{
        const currentTime = new Date();
        if(currentTime >= endTimerTime) {
            clearInterval(timerInterval);
        }
        const timeLeft = endTimerTime.getTime() - currentTime.getTime();
        const minutesLeft = Math.floor(timeLeft / 60000);
        const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
        document.querySelector("#timer-display").textContent = `
            ${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}
        `
    }, 1000);
}
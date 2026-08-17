import { setTray, onTrayMenuItemClicked, onWindowClose, minimizeToTray } from "./general.js";
import { startPomodoroTimer } from "./pomodoro.js";
import { blockApp } from "./blocker.js";
import {} from "./habitica.js";

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);

(async ()=>{ // check whether timerDurationMinutes is set in storage, if not set it to default 25 minutes
    try{
        await Neutralino.storage.getData("timerDurationMinutes");
    } catch(error) {
        await Neutralino.storage.setData("timerDurationMinutes", "25");
    }
})();

const toggleTimerButton = document.querySelector("#toggle-timer");
toggleTimerButton.addEventListener("click", () => {
    if(toggleTimerButton.classList.contains("start-timer")) {
        startPomodoroTimer();
        toggleTimerButton.textContent = "End Timer";
        toggleTimerButton.classList.remove("start-timer");
        toggleTimerButton.classList.add("end-timer");
    } else if(toggleTimerButton.classList.contains("end-timer")) {
        clearInterval(timerInterval);
        document.querySelector("#timer-display").textContent = "00:00";
        toggleTimerButton.textContent = "Start Timer";
        toggleTimerButton.classList.remove("end-timer");
        toggleTimerButton.classList.add("start-timer");
    }
});

const timerSetupButton = document.querySelector("#timer-setup-button");
timerSetupButton.addEventListener("click", () => {
    const pomodoroTimerDiv = document.querySelector("#pomodoro-timer");
    const timerSetupDiv = document.querySelector("#timer-setup");
    pomodoroTimerDiv.classList.add("hidden");
    timerSetupDiv.classList.remove("hidden");
});

const saveTimerSetupButton = document.querySelector("#save-timer-setup");
saveTimerSetupButton.addEventListener("click", () => {
    const pomodoroTimerDurationInput = document.querySelector("#pomodoro-timer-duration");
    const timerDurationMinutes = parseInt(pomodoroTimerDurationInput.value);
    Neutralino.storage.setData("timerDurationMinutes", timerDurationMinutes.toString());
    const pomodoroTimerDiv = document.querySelector("#pomodoro-timer");
    const timerSetupDiv = document.querySelector("#timer-setup");
    pomodoroTimerDiv.classList.remove("hidden");
    timerSetupDiv.classList.add("hidden");
});

// Conditional initialization: Set up system tray if not running on macOS
if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
}

/*
    When app is up and running and published, check out https://neutralino.js.org/docs/how-to/auto-updater to learn about auto-updates.
*/

/*
This is the code for getting list of apps installed. To be used later.
Note: to open an app, use the command: explorer.exe shell:AppsFolder\<appId>

Neutralino.events.on("ready", () => {
  Neutralino.events.on("windowClose", () => {
    Neutralino.app.exit();
  });
  async function runCommand() {
    try {
      let commandOutput = await Neutralino.os.execCommand('powershell "Get-StartApps | ConvertTo-Csv -NoTypeInformation"');
      console.log(commandOutput);
      console.log(commandOutput.stdOut);
      let appsList = commandOutput.stdOut.split('\r\n').map(part => part.split(",").map(p => p.replace(/"/g, '')));
      let appSelect = document.getElementById("app-select");
      console.log(appsList);
      for (let i = 1; i < appsList.length; i++) {
        let appName = appsList[i][0];
        let appId = appsList[i][1];
        console.log(`App Name: ${appName}, App ID: ${appId}`);
        let option = document.createElement("option");
        option.value = appId;
        option.text = appName;
        appSelect.appendChild(option);

      }
    } catch (error) {
      console.error("Failed to execute command. Error:", error);
    }
  }
  runCommand();
  const appSelect = document.getElementById("app-select");
  const appOutput = document.getElementById("app-output");
  document.querySelector("#app-form").addEventListener("submit", (event) => {
    event.preventDefault();
    appOutput.innerText = `You chose ${appSelect.selectedOptions[0].text},
  with ID: ${appSelect.value}`;
  });
});
*/
import * as general from "./general.js";
import * as pomodoro from "./pomodoro.js";
import * as blocker from "./blocker.js";
import * as habitica from "./habitica.js";

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", general.onTrayMenuItemClicked);
Neutralino.events.on("windowClose", general.onWindowClose);

/* ==== Setup variables and storage ==== */
general.checkTimerDuration();

/* ==== Setup Pomodoro Timer ==== */
pomodoro.initializePomodoroTimer();

// Conditional initialization: Set up system tray if not running on macOS
if(NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    general.setTray();
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
// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library


/*
    Function to set up a system tray menu with options specific to the window mode.
    This function checks if the application is running in window mode, and if so,
    it defines the tray menu items and sets up the tray accordingly.
*/
function setTray() {
    // Tray menu is only available in window mode
    if(NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }

    // Define tray menu items
    let tray = {
        icon: "/resources/icons/trayIcon.png",
        menuItems: [
            {id: "SHOW", text: "Show App"},
            {id: "SEP", text: "-"},
            {id: "QUIT", text: "Quit"}
        ]
    };

    // Set the tray menu
    Neutralino.os.setTray(tray);
}

/*
    Function to handle click events on the tray menu items.
    This function performs different actions based on the clicked item's ID,
    such as displaying version information or exiting the application.
*/
function onTrayMenuItemClicked(event) {
    switch(event.detail.id) {
        case "SHOW":
            // Show the application window
            Neutralino.window.show();
            break;
        case "QUIT":
            // Exit the application
            Neutralino.app.exit();
            break;
    }
}

/*
    Function to handle the window close event by gracefully exiting the Neutralino application.
*/
function onWindowClose() {
    Neutralino.app.exit();
}

/*
    Function to minimize to system tray
*/
function minimizeToTray() {
    Neutralino.window.hide();
}

/*
    Function to block a blocked app
*/
function blockApp() {
    Neutralino.window.focus();
    Neutralino.window.setFullScreen(true);
}

let timerInterval; // Global variable to hold the timer interval
function startPomodoroTimer() {
    const timerDurationMinutes = 25;
    const endTimerTime = new Date();
    endTimerTime.setMinutes(endTimerTime.getMinutes() + timerDurationMinutes);
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

// Initialize Neutralino
Neutralino.init();

// Register event listeners
Neutralino.events.on("trayMenuItemClicked", onTrayMenuItemClicked);
Neutralino.events.on("windowClose", onWindowClose);
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
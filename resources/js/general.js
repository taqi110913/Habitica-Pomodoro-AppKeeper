// @ts-check (checks code using JSDoc using TypeScript rules)
/**
 * @typedef {import("./global").UserSettings} UserSettings
 * @typedef {import("./pomodoro")} pomodoro
*/
export function setTray() {
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
/**
 * 
 * @param {CustomEvent} event 
 */
export function onTrayMenuItemClicked(event) {
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

export function onWindowClose() {
    Neutralino.app.exit();
}

export function minimizeToTray() {
    Neutralino.window.hide();
}
/**
 * 
 * @returns {Promise<UserSettings>}
 */
export async function getSettings() {
    try{
        return JSON.parse(await Neutralino.storage.getData("userSettings"));
    } catch(error) {
        console.log("No user settings found. Attempting to create default settings…");
        await Neutralino.storage.setData("userSettings", JSON.stringify({
            pomodoro: {
                timerDurationMinutes: 25
            }
        }));
        return JSON.parse(await Neutralino.storage.getData("userSettings"));
    }
}
export function openSettingsPage (){
    Neutralino.window.create("/html/settings.html", {
        title: "Habitica Pomodoro AppKeeper Settings"
    });
}
/**
 * 
 * @param {pomodoro} passedPomodoro 
 */
export async function detectSettingsPageSave(passedPomodoro) {
    let storageWatcher = await Neutralino.filesystem.createWatcher(NL_PATH);
    await Neutralino.events.on('watchFile',
        
        /**
         * @param {CustomEvent} event
        */
        async (event) => {
            if(storageWatcher == event.detail.id) {
                console.log("Storage changed: ", event.detail);
                if(event.detail.dir === "..storage"){
                    getSettings();
                    passedPomodoro.updatePomodoroValues(await getSettings());
                }
            }
        }
    );
}
/**
 * @param {UserSettings} newSettings 
 */
export async function saveSettings(newSettings) {
    await Neutralino.storage.setData("userSettings", JSON.stringify(newSettings));
}
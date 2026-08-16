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
export async function checkTimerDuration() {
    try{
        await Neutralino.storage.getData("timerDurationMinutes");
    } catch(error) {
        await Neutralino.storage.setData("timerDurationMinutes", "25");
    }
}
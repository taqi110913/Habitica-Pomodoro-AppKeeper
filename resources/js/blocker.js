/*
    Function to block a blocked app
*/
export function blockApp() {
    Neutralino.window.focus();
    Neutralino.window.setFullScreen(true);
}
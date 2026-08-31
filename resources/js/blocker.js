// @ts-check (checks code using JSDoc using TypeScript rules)
/**
*  Function to block a blocked app
*/
export function blockApp() {
    Neutralino.window.focus();
    Neutralino.window.setFullScreen(true);
}
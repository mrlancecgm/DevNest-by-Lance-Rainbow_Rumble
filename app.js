const { app, BrowserWindow } = require("electron");

let appWindow;

function createWindow() {
  appWindow = new BrowserWindow({
    fullscreen: true,
    autoHideMenuBar: true,
    
  });
  appWindow.loadFile("dist/rainbow-rumble-app/browser/index.html");

  appWindow.on("closed", function () {
    appWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
});

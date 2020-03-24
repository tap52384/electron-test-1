'use strict';

const { app, BrowserWindow, globalShortcut, nativeTheme } = require('electron');
const os = require('os');
const osType = process.platform || os.type().toLowerCase();

function createWindow () {
  // Create the browser window.
  // https://www.electronjs.org/docs/api/browser-window
  const win = new BrowserWindow({
    center: true,
    minHeight: 600,
    minWidth: 600,
    width: 800,
    height: 600,
    title: 'Hakchi',
    // https://www.electronjs.org/docs/api/frameless-window#hiddeninset
    titleBarStyle: 'hidden',
    // titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html');

  // Open the DevTools.
  // https://www.electronjs.org/docs/api/web-contents#contentsopendevtoolsoptions
//   win.webContents.openDevTools(
//       {
//           'mode': 'bottom'
//       }
//   );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// .then() returns a Promise, so it's chainable, meaning you can call something
// else afterwards
app.whenReady().then(createWindow).then(
    () => {
        // Register a 'CommandOrControl+Y' shortcut listener.
        // https://www.electronjs.org/docs/api/accelerator#accelerator
        globalShortcut.register('CommandOrControl+R', () => {
          // Do stuff when R and either Command/Control is pressed; this
          // accelerator prevents refreshing the app and messing up the styling
          // May need to specify a background color though...
        });
    }
);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  console.log('osType: ' + osType);
  if (osType !== 'darwin') {
    app.quit();
  }
});

// Listen for dark mode and use it!
// https://www.electronjs.org/docs/tutorial/mojave-dark-mode-guide
// TODO: How do you set up an app theme properly?
nativeTheme.on('updated', function theThemeHasChanged () {
    console.log('nativeTheme.shouldUseDarkColors: ' + (nativeTheme.shouldUseDarkColors === true ? 'true' : 'false'));
    // updateMyAppTheme(nativeTheme.shouldUseDarkColors);
});


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

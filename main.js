'use strict';

const { app, BrowserWindow, nativeTheme } = require('electron');

function createWindow () {
  // Create the browser window.
  // https://www.electronjs.org/docs/api/browser-window
  const win = new BrowserWindow({
    minWidth: 600,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html');

  // Open the DevTools.
  // https://www.electronjs.org/docs/api/web-contents#contentsopendevtoolsoptions
  win.webContents.openDevTools(
      {
          'mode': 'bottom'
      }
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Listen for dark mode and use it!
// https://www.electronjs.org/docs/tutorial/mojave-dark-mode-guide
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

const { app, BrowserWindow, webFrame, ipcRenderer, ipcMain, screen } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
let fader;
function fadeout(){
  if(fader != null){
    clearInterval(fader)
    fader = null
  }
  fader = setInterval(fade, 10, true);
}
function fadein(){
  if(fader != null){
    clearInterval(fader)
    fader = null
  }
  fader = setInterval(fade, 10, false)
}
function fade(fadeout){
  const win = BrowserWindow.getFocusedWindow();
  const winop = win.getOpacity();
  if (winop <= 0 && fadeout|| winop >= 1 && !fadeout){
    clearInterval(fader);
    fader = null;
  }else{
    if (fadeout){
      if (winop - 0.01 >= 0){
        win.setOpacity(winop - 0.01);
      } else {
        win.setOpacity(0)
      }
    }else{
      if (winop + 0.01 <= 1){
        win.setOpacity(winop + 0.01);
      } else {
        win.setOpacity(1)
      }
    }
  }
}
const createWindow = () => {
  // Create the browser window.
  const display = screen.getPrimaryDisplay()
  const {width, height} = display.workAreaSize
  const nheight = height * 0.9
  const nwidth = (nheight/16) * 9
  const mainWindow = new BrowserWindow({
    nwidth,
    height,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.setPosition(0, 0)

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.on('fadeout', fadeout)
    ipcMain.on('fadein', fadein)
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

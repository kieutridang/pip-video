const electron = require('electron')
const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
let buildTray = require('./tray')
let win;

const { 
  WIDTH,
  HEIGHT,
} = require('./constants')

function createWindow(launchInfo) {
  const { screen } = electron
  
  const {
    size: { 
      width: monitorWidth,
      height: monitorHeight 
    }
  } = screen.getPrimaryDisplay()
  win = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    minWidth: WIDTH,
    maxWidth: WIDTH,
    minHeight: HEIGHT,
    maxHeight: HEIGHT,
    frame: false,
    // titleBarStyle: 'hidden',
    icon: `file://${__dirname}/img/youtube-512.png`,
  });
  // win.loadFile('./index.html');
  win.loadURL('https://youtube.com');
  win.setPosition(0, monitorHeight - HEIGHT);
  // win.webContents.openDevTools();
  win.on('closed', (event) => {
    win = null; 
  })
  require('electron-debug')();
  require('devtron').install();

  win.setAlwaysOnTop(true, "floating");
  win.setVisibleOnAllWorkspaces(true);
  win.setFullScreenable(false);

  buildTray.bind(win)()
}

ipcMain.on('log', (event, args) => {
  console.log('args: ', args);
})

app.on('ready', createWindow);

app.on('window-all-closed', (event, exitCode) => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', (event) => {
  if (win === null) {
    createWindow();
  }
})
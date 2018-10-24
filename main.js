const { app, BrowserWindow, ipcMain } = require('electron');
let win;

function createWindow(launchInfo) {
  win = new BrowserWindow({
    width: 350,
    height: 200,
    minWidth: 350,
    maxWidth: 350,
    minHeight: 200,
    maxHeight: 200,
    frame: false,
    // titleBarStyle: 'hidden',
    icon: `file://${__dirname}/img/youtube-512.png`,
  });
  // win.loadFile('./index.html');
  win.loadURL('https://youtube.com');
  win.setPosition(0, 700);
  // win.webContents.openDevTools();
  win.on('closed', (event) => {
    win = null;
  })
  require('electron-debug')();
  require('devtron').install();

  win.setAlwaysOnTop(true, "floating");
  win.setVisibleOnAllWorkspaces(true);
  win.setFullScreenable(false);
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
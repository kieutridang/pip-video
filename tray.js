const electron = require('electron')
const { Menu, Tray } = require('electron')
const { 
  WIDTH,
  HEIGHT,
} = require('./constants')
const path = require('path')
let tray

function setPositionOfPip(menuItem, browserWindow, event) {
  const { screen } = electron
  const {
    size: { 
      width: monitorWidth,
      height: monitorHeight 
    }
  } = screen.getPrimaryDisplay()
  const [y, x] = menuItem.label.split(' ')
  const Y = y == 'top' ? 0 : monitorHeight - HEIGHT
  const X = x == 'left' ? 0 : monitorWidth - WIDTH
  this.setPosition(X, Y)
}

function buildTray() {
  const pathname = path.join(__dirname, './img/youtube-tray.png')
  tray = new Tray(pathname)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'bottom left', type: 'radio', checked: true, click: setPositionOfPip.bind(this) },
    { label: 'bottom right', type: 'radio', click: setPositionOfPip.bind(this) },
    { label: 'top left', type: 'radio', click: setPositionOfPip.bind(this) },
    { label: 'top right', type: 'radio', click: setPositionOfPip.bind(this) },
    { type: 'separator'},
    { role: 'quit' },
  ])
  tray.setToolTip('Set position for application.')
  tray.setContextMenu(contextMenu)
}

module.exports = buildTray
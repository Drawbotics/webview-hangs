const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const interceptRequests = require('./intercept-requests');


const IS_DEV = process.env.NODE_ENV === 'development';


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: IS_DEV ? 1600 : 1100,
    height: 800,
    webPreferences: {
      webSecurity: false,
    },
  });

  mainWindow.loadFile(path.resolve(__dirname, '../render/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (IS_DEV) {
    mainWindow.toggleDevTools();
  }

  interceptRequests();
}


app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

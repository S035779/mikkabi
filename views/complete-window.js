require('dotenv').config();
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

module.exports = class MainWindow {
  constructor() {
    this.window = null;
    this.start();
  }
  start() {
    app.on('ready', () => {
      this.createWindow();
    });
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    });
    app.on('activate', () => {
      if (this.window === null) {
        createWindow()
      }
    });
    app.on('showFormComplete', () => {
      this.window.show();
    });
  }
  createWindow() {
    this.window = new BrowserWindow({
      x: 0, y: 0, width: 1152, height: 964
      //, frame: false
      //, titleBarStyle: 'hidden'
      //, titleBarStyle: 'hiddenInset'
      //, titleBarStyle: 'customButtonsOnHover', frame: false
      , titleBarStyle: 'customButtonsOnHover'
      , show: false
    });
    this.window.loadURL(url.format({
      pathname: path.join(`${__dirname}/../public`
        , 'complete.html'),
      protocol: 'file:',
      slashes: true
    }));
    //this.window.webContents.openDevTools();
    this.window.on('close', (event) => {
      if(this.window.isVisible()) {
        this.window.hide();
        event.preventDefault();
      }
    });
  }
};

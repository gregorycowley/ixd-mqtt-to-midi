/* global __dirname, process */
// Main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const MqttConnect = require('../connect/MqttConnect');
const path = require('node:path');
const { enableReload } = require('../util/development.js');

module.exports = class MainProcess {

  mqttConnection = null;

  constructor() {
    console.log('MainProcess constructor');
    app.on('ready', this.onReady);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('will-quit', this.onWillQuit);
    app.on('activate', this.onActivate);
    // console.log(enableReload);
    enableReload();
  }

  onWindowAllClosed = () => {
    if (process.platform !== 'darwin') app.quit();
  };

  onReady = () => {
    this.createWindow();
    this.connectMQTT();
  };

  onActivate = () => {
    if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
  };

  onWillQuit = () => {
    // Do nothing
  };

  createWindow = () => {
    const mainWindow = new BrowserWindow({
      width: 650,
      height: 800,
      webPreferences: { 
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });
    mainWindow.loadFile('src/ui/index.html');
    mainWindow.webContents.openDevTools();
  };

  connectMQTT = () => { 
    this.mqttConnection = new MqttConnect();
    this.mqttConnection.on('mqtt-message', this.onMQTTMessage);
  };

  onMQTTMessage = (topic, msgBuffer) => {
    let strMessage = msgBuffer.toString();
    console.log('Main Process mqtt-message :: ', topic, strMessage );
    // Send message to renderer
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('mqtt-message', { topic, strMessage });
    });
  };  
};


/* global __dirname, process */
// Main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const MqttConnect = require('../connect/MqttConnect');
const MidiConnect = require('../midi/MidiConnect');
const MqttParse = require('../connect/MqttParse');

const { first, all } = require('macaddress-local-machine');
const path = require('node:path');
const macAddress = first();

// require('dotenv').config();
// if ( process.env.MODE == 'development' ) {
//   const { enableReload } = require('../util/development.js')();
// }

module.exports = class MainProcess {
  mqttConnection = null;
  midiConnect = null;

  constructor() {
    app.on('ready', this.onReady);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('will-quit', this.onWillQuit);
    app.on('activate', this.onActivate);

    this.midiConnect = new MidiConnect();
    this.midiConnect.on('midi-message-received', this.onMIDIMessage);
    this.midiConnect.on('midi-message-sent', this.onMIDIMessage);
    this.midiConnect.on('midi-message-status', this.onMIDIStatus);

    this.mqttConnection = new MqttConnect();
    this.mqttParse = new MqttParse();
    this.mqttParse.on('found-midi-message', this.onMQTTtoMIDI);
  }

  onWindowAllClosed = () => {
    if (process.platform !== 'darwin') app.quit();
  };

  onReady = () => {
    this.createWindow();
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

    // if (process.env.MODE == 'development'){
    //   mainWindow.webContents.openDevTools();
    // } else {
    //   mainWindow.setResizable(false);
    // }

    setTimeout(() => {
      mainWindow.webContents.send('mac-address', macAddress.macAddr);
    }, 250);

    // MQTT
    ipcMain.on('mqtt-connect', (event) => {
      console.log('Main Process mqtt-connect');
      this.connectMQTT();
    });
    ipcMain.on('mqtt-disconnect', (event) => {
      console.log('Main Process mqtt-disconnect');
      this.disconnectMQTT();
    });
    ipcMain.on('mqtt-send', (event, message) => {
      console.log('Main Process mqtt-send', message);
      this.sendMQTT(message);
    });

    // MIDI
    ipcMain.on('midi-connect', (event) => {
      console.log('Main Process midi-connect');
      this.connectMIDI();
    });
    ipcMain.on('midi-disconnect', (event) => {
      console.log('Main Process midi-disconnect');
      this.disconnectMIDI();
    });
    ipcMain.on('midi-send', (event, message) => {
      console.log('Main Process midi-send', message);
      this.sendMIDI(message);
    });
  };


  // MQTT
  connectMQTT = () => { 
    this.mqttConnection.on('mqtt-message', this.onMQTTMessage);
    this.mqttConnection.connect();
  };

  disconnectMQTT = () => {
    this.mqttConnection.disconnect();
  };

  sendMQTT = (message) => {
    this.mqttConnection.publish(this.mqttConnection.topic, message);
  };

  onMQTTMessage = (topic, msgBuffer) => {
    let strMessage = msgBuffer.toString();
    this.mqttParse.parse(strMessage);
    // console.log('Main Process mqtt-message :: ', topic, strMessage );
    // Send message to renderer
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('mqtt-message', { topic, strMessage });
    });
  };  

  // MIDI
  connectMIDI = () => { 
    this.midiConnect.connect();
  };

  disconnectMIDI = () => {
    this.midiConnect.disconnect();
  };

  sendMIDI = () => {
    this.midiConnect.noteon(64);
    setTimeout(() => {
      this.midiConnect.noteoff(64);
    }, 1000);
  };

  onMIDIMessage = ( msg ) => {
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('midi-message', msg);
    });
  }; 

  onMIDIStatus = ( message ) => {
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('midi-status', message);
    });
  };
  
  onMQTTtoMIDI = ( midiObj ) => {
  
    const midiInfo = {
      channel: midiObj.channel,
      note: midiObj.note,
      velocity: midiObj.velocity
    };

    console.log('Main Process onMQTTtoMIDI', midiObj._type, midiInfo);
    this.midiConnect.send(midiObj._type, midiInfo);
  };
};


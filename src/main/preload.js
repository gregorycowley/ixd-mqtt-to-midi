// preload.js

const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onMIDIMessage: (callback) => ipcRenderer.on('midi-message', (_event, message) => callback(message)),
  onMIDIStatus: (callback) => ipcRenderer.on('midi-status', (_event, message) => callback(message)),
  onMQTTMessage: (callback) => ipcRenderer.on('mqtt-message', (_event, message) => callback(message)),
  onMACAddress: (callback) => ipcRenderer.on('mac-address', (_event, message) => callback(message)),
  mqttConnect: () => ipcRenderer.send('mqtt-connect'),
  mqttDisconnect: () => ipcRenderer.send('mqtt-disconnect'),
  mqttSend: (message) => ipcRenderer.send('mqtt-send', message),
  midiConnect: () => ipcRenderer.send('midi-connect'),
  midiDisconnect: () => ipcRenderer.send('midi-disconnect'),
  midiSend: (message) => ipcRenderer.send('midi-send', message)
});
// preload.js

const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  onMQTTMessage: (callback) => ipcRenderer.on('mqtt-message', (_event, message) => callback(message))
});
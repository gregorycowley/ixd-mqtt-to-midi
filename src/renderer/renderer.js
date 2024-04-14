'use strict';

// const { Text } = require('material');

const midiConnectButton = document.querySelector('#midi-connect');
const midiDisconnectButton = document.querySelector('#midi-disconnect');
const midiSendButton = document.querySelector('#midi-send');

const mqttConnectButton = document.querySelector('#mqtt-connect');
const mqttDisconnectButton = document.querySelector('#mqtt-disconnect');
const mqttSendButton = document.querySelector('#mqtt-send');

const clearButton = document.querySelector('#clear');
const logField = document.querySelector('#log');  
const macAddressText = document.querySelector('#address');  

window.electronAPI.onMQTTMessage((message) => {
  logField.value += 'c:' + message.strMessage + '\n';
});

window.electronAPI.onMIDIMessage((message) => {
  console.log('onMIDIMessage', message);
  logField.value += 'm:' + message + '\n';
});
window.electronAPI.onMIDIStatus((message) => {
  console.log('onMIDIStatus', message);
  logField.value += 's:' + message + '\n';
});

window.electronAPI.onMACAddress((address) => {
  macAddressText.innerHTML = address;
});

clearButton.addEventListener('click', () => {
  logField.value = '';
});

// MIDI
midiConnectButton.addEventListener('click', () => {
  window.electronAPI.midiConnect();
});

midiDisconnectButton.addEventListener('click', () => {
  window.electronAPI.midiDisconnect();
});

midiSendButton.addEventListener('click', () => {
  window.electronAPI.midiSend( 'a message' );
});

// MQTT
mqttConnectButton.addEventListener('click', () => {
  window.electronAPI.mqttConnect();
});

mqttDisconnectButton.addEventListener('click', () => {
  window.electronAPI.mqttDisconnect();
});

mqttSendButton.addEventListener('click', () => {
  window.electronAPI.mqttSend( 'a message' );
});




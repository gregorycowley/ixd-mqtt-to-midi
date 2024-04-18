'use strict';

// const { Text } = require('material');
// import MidiControls from './controlsMIDI';
// const MidiControls = require('./controlsMIDI');

const midiConnectButton = document.querySelector('#midi-connect');
const midiDisconnectButton = document.querySelector('#midi-disconnect');
const midiSendButton = document.querySelector('#midi-send');

const mqttConnectButton = document.querySelector('#mqtt-connect');
const mqttDisconnectButton = document.querySelector('#mqtt-disconnect');
const mqttSendButton = document.querySelector('#mqtt-send');

const clearButton = document.querySelector('#clear');
const logField = document.querySelector('#log');  
const macAddressText = document.querySelector('#address'); 

const connectionState = {
  midi: {
    disconnected: true,
    connected: false
  },
  mqtt: {
    disconnected: true,
    connected: false
  }
};


const statusUpdate = () => {
  console.log('statusUpdate', connectionState);
  if ( connectionState.mqtt.disconnected == true ) {
    mqttConnectButton.disabled = false;
    mqttDisconnectButton.disabled = true;
    mqttSendButton.disabled = true;
  
  } else {
    mqttConnectButton.disabled = true;
    mqttDisconnectButton.disabled = false;
    mqttSendButton.disabled = false;
  }
  if ( connectionState.midi.disconnected == true ){
    midiConnectButton.disabled = false;
    midiDisconnectButton.disabled = true;
    midiSendButton.disabled = true;
  } else {
    midiConnectButton.disabled = true;
    midiDisconnectButton.disabled = false;
    midiSendButton.disabled = false;
  }
};

const connectStatus = (button, status) => {
  if (status === 'connected') {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
};


// Message Handlers
const mainMessageHandlerSetup =  () => {
  window.electronAPI.onMQTTMessage((messageObj) => {
    const message = messageObj.strMessage;
    // console.log('onMQTTMessage', Object.keys(message));
    if ( message.indexOf('Connected') > -1 ) {
      connectionState.mqtt.connected = true;
      connectionState.mqtt.disconnected = false;
      statusUpdate();
    } else if ( ( message.indexOf('Connection') > -1 ) && (message.indexOf('ended') > -1) ) {
      connectionState.mqtt.connected = false;
      connectionState.mqtt.disconnected = true;
      statusUpdate();
    }
    logField.value += 'c:' + message + '\n';
  });

  window.electronAPI.onMIDIMessage((message) => {
    console.log('onMIDIMessage', message);
    logField.value += 'm:' + message + '\n';
  });

  window.electronAPI.onMIDIStatus((message) => {
    console.log('onMIDIStatus', message.indexOf('Disconnected'));
    if ( message.indexOf('Connected') > -1 ) {
      connectionState.midi.connected = true;
      connectionState.midi.disconnected = false;
      statusUpdate();
    } else if ( message.indexOf('Disconnected') > -1 ) {
      connectionState.midi.connected = false;
      connectionState.midi.disconnected = true;
      statusUpdate();
    }
    logField.value += 's:' + message + '\n';
  });

  window.electronAPI.onMACAddress((address) => {
    macAddressText.innerHTML = address;
  });
};

const uiButtonSetup = () => {
  clearButton.addEventListener('click', () => {
    logField.value = '';
  });
};

const midiButtonSetup = () => {
  midiConnectButton.addEventListener('click', () => {
    window.electronAPI.midiConnect();
  });
  
  midiDisconnectButton.addEventListener('click', () => {
    window.electronAPI.midiDisconnect();
  });
  
  midiSendButton.addEventListener('click', () => {
    window.electronAPI.midiSend( 'a message' );
  });
};

const mqttButtonSetup = () => {
  mqttConnectButton.addEventListener('click', () => {
    window.electronAPI.mqttConnect();
  });

  mqttDisconnectButton.addEventListener('click', () => {
    window.electronAPI.mqttDisconnect();
  });

  mqttSendButton.addEventListener('click', () => {
    window.electronAPI.mqttSend( 'a message' );
  });
};

// Setup
mainMessageHandlerSetup();
uiButtonSetup();
midiButtonSetup();
mqttButtonSetup();
statusUpdate();



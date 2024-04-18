const EventEmitter = require('events');

export default class MidiControls extends EventEmitter {

  constructor(connectButton, disconnectButton, sendButton, window) {
    super();
    this.connectButton = connectButton;
    this.disconnectButton = disconnectButton;
    this.sendButton = sendButton;
    this.window = window;

    console.log('ControlsMIDI constructor');
  }

  setup() {
    this.connectButton.addEventListener('click', () => {
      this.window.electronAPI.midiConnect();
    });

    this.disconnectButton.addEventListener('click', () => {
      this.window.electronAPI.midiDisconnect();
    });

    this.sendButton.addEventListener('click', () => {
      this.window.electronAPI.midiSend( 'a message' );
    });
  }

  disable() {
    this.connectButton.disabled = true;
    this.disconnectButton.disabled = true;
    this.sendButton.disabled = true;
  }
};
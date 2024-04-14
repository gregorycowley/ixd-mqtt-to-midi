const easymidi = require('easymidi');
const EventEmitter = require('node:events');

module.exports = class MidiConnect extends EventEmitter {

  constructor() {
    super();
    console.log('MidiConnect constructor');
    this.midiDriver = 'IAC Driver Bus 1';
    this.inputs = easymidi.getInputs();
    this.outputs = easymidi.getOutputs();
    console.log(this.inputs, this.outputs);
  }

  connect = () => {
    // console.log('MidiConnect connect');
    this.input = new easymidi.Input(this.midiDriver);
    this.output = new easymidi.Output(this.midiDriver);
    this.input.on('noteon', this.onReceive);
    this.input.on('noteoff', this.onReceive);
    this.onStatus(`MIDI Connected: ${this.midiDriver}`);
  };

  disconnect = () => {
    // console.log('MidiConnect disconnect: ', this.midiDriver);
    this.input.close();
    this.output.close();
    this.onStatus(`MIDI Disconnected: ${this.midiDriver}`);
  };

  /* ---- */
  noteon = (note=64) => {
    this.send('noteon', {
      note: note,
      velocity: 127,
      channel: 0
    });
  };

  noteoff = (note=64) => {
    this.send('noteoff', {
      note: note,
      velocity: 127,
      channel: 0
    });
  };

  /* ---- */
  send = (midiType, midiObj) => {
    console.log('MidiConnect send', midiType, midiObj);
    this.output.send(midiType, midiObj);
    this.emit('midi-message-sent', `${midiType},channel:${midiObj.channel},note:${midiObj.note},velocity: ${midiObj.velocity}`);
  };

  onReceive = (message) => {
    console.log('MidiConnect onReceive', message);
    // this.emit('midi-message-received', message);
  };

  onStatus = (message) => {
    // console.log('MidiConnect onStatus', message);
    this.emit('midi-message-status', message);
  };
};


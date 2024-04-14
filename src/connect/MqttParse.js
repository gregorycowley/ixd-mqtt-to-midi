const { EventEmitter } = require('node:events');

module.exports = class MqttParse extends EventEmitter {
  constructor() {
    super();
    console.log('MqttParse constructor');
  }

  // Route the message to the correct protocol
  parse (msg) {
    console.log('MqttParse parse ', msg);
    try {
      const msgObj = JSON.parse(msg);
      if (Object.hasOwn(msgObj, 'channel') && Object.hasOwn(msgObj, 'note')) {
        this.emit('found-midi-message', msgObj);
      }
    } catch (e) {
      // console.log('MqttParse parse error', e);
    }    
  }
};
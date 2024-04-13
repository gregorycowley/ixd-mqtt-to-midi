/* global */

const EventEmitter = require('node:events');
const mqtt = require('mqtt');

const protocol = 'mqtt';
const host = '192.168.86.95';
const port = 1883;
const clientId = 'electron_app_01';
const QOS = 2;
const connectUrl = `${protocol}://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  qos: 2,
});
/**
 * Create a new MQTT client
 * 
 * 
 * Quality of Service (QoS):
 * QoS 0: At most once delivery
 * QoS 1: At least once delivery
 * QoS 2: Exactly once delivery
    # Subscribe to test topic
    node mqtt-cli.js sub -t test

    # Publish an MQTT message
    node mqtt-cli.js pub -t test -m 'Hello MQTT!'
 */

module.exports = class MqttConnect extends EventEmitter {
  
  topic = 'electron';
 
  constructor(){
    super();
    console.log('MqttConnect constructor');
    client.on('connect', this.onConnect);
    client.on('subscribe', this.onSubscribe);
    client.on('message', this.onMessage);
    client.on('offline', this.onOffline);
    client.on('reconnect', this.onReconnect);
    client.on('end', this.onEnd);
  }

  onConnect = (...args) => {
    console.log('Connected', args);
    client.subscribe(this.topic, (err) => {
      if (!err) {
        client.publish(this.topic, 'Hello mqtt');
      }
    });
  };

  onSubscribe = ([topic], ...args) => {
    console.log(`Subscribe to topic '${topic}'`, args);
  };

  onMessage = (topic, msgBuffer) => {
    this.emit('mqtt-message', topic, msgBuffer);
    // let strMessage = msgBuffer.toString();
    // console.log('Client has received a message : ', topic, strMessage);
  };

  onOffline = (...args) => {
    console.log('Client is offline', args);
  };
  
  onReconnect = (...args) => {
    console.log('Reconnecting to MQTT broker', args);
  };
  
  onEnd = (...args) => { 
    console.log('Connection to MQTT broker ended', args);
  };

};

/* global */

const EventEmitter = require('node:events');
const mqtt = require('mqtt');
module.exports = class MqttConnect extends EventEmitter {
  
  constructor(){
    super();
    this.client = mqtt;
    console.log('MqttConnect constructor');
  }

  connect = () => {
    const protocol = 'mqtt';
    const host = '192.168.8.113';
    const port = 1883;
    this.topicID = 'ixdstudio';
    this.clientId = 'electron_app_01';
    this.topic = `${this.topicID}/${this.clientId }`;
    const QOS = 2;
    this.connectUrl = `${protocol}://${host}:${port}`;

    this.client = mqtt.connect(this.connectUrl, {
      qos: 2,
    });

    this.client.on('connect', this.onConnect);
    this.client.on('subscribe', this.onSubscribe);
    this.client.on('message', this.onMessage);
    this.client.on('offline', this.onOffline);
    this.client.on('reconnect', this.onReconnect);
    this.client.on('end', this.onEnd);

    this.client.subscribe(`${this.topic}/in`, (err) => {
      if (!err) {
        this.client.publish(`${this.topic}/in`, 'Hello sent');
        // this.emit('mqtt-message', `${this.topic}/out`, `Subscribe to ${this.topic} successful`);
      }
    });

    this.client.subscribe(`${this.topic}/out`, (err) => {
      if (!err) {
        this.client.publish(`${this.topic}/out`, 'Hello Received');
        // this.emit('mqtt-message', `${this.topic}/out`, `Subscribe to ${this.topic} successful`);
      }
    });

    this.emit('mqtt-message', this.topic, 'Connecting to MQTT broker...');
  };

  disconnect = () => {
    this.client.end();
  };

  publish = (currenttopic, message) => {
    this.client.publish(currenttopic, message);
  };

  onConnect = (...args) => {
    this.emit('mqtt-message', this.topic, `Connected to MQTT broker ${this.connectUrl} `);
  };

  onSubscribe = ([topic], ...args) => {
    console.log(`Subscribe to topic '${topic}'`, args);
    this.emit('mqtt-message', topic, `Subscribe to topic '${topic}'`);
  };

  onMessage = (topic, msgBuffer) => {
    this.emit('mqtt-message', topic, msgBuffer.toString());
  };

  onOffline = (...args) => {
    console.log('Client is offline', args);
    this.emit('mqtt-message', this.topic, 'Client is offline');
  };
  
  onReconnect = (...args) => {
    console.log('Reconnecting to MQTT broker', args);
    this.emit('mqtt-message', this.topic, 'Reconnecting to MQTT broker');
  };
  
  onEnd = (...args) => { 
    console.log('Connection to MQTT broker ended', args);
    this.emit('mqtt-message', this.topic, 'Connection to MQTT broker ended');
  };
};

/* global */

const EventEmitter = require('node:events');
const mqtt = require('mqtt');

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
  
  

  // wemos/esp-8c:aa:b5:7c:ed:47/out 
  // wemos/esp-8c:aa:b5:7c:ed:47/in
  // wemos/electron_app_01/out
  // wemos/electron_app_01/in


  // ixdstudio/esp-8c:aa:b5:7c:ed:47/out 
  // ixdstudio/esp-8c:aa:b5:7c:ed:47/in
  // ixdstudio/electron_app_01/out
  // ixdstudio/electron_app_01/in

 
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
    // console.log('Connected', args);
    this.emit('mqtt-message', this.topic, `Connected to MQTT broker ${this.connectUrl} `);
    // this.client.subscribe(this.topic, (err) => {
    //   if (!err) {
    //     this.client.publish(`${this.topic}/out`, 'Hello MQTT');
    //     this.emit('mqtt-message', this.topic, `Subscribe to ${this.topic} successful`);
    //   }
    // });
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

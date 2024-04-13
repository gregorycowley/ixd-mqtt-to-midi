/* global process */
// mqtt-cli.js

const { program } = require( 'commander' );
const mqtt = require( 'mqtt' );

// MQTT Broker URL
const brokerUrl = 'mqtt://localhost:1883';

// Define CLI commands
program
  .command('pub')
  .description('Publish message to the given topic')
  .option('-t, --topic <TOPIC>', 'the message topic')
  .option('-m, --message <BODY>', 'the message body')
  .action((options) => {
    const { topic, message } = options;

    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      client.publish(topic, message, () => {
        console.log(`Published message "${message}" to topic "${topic}"`);
        client.end();
      });
    });
  });

program
  .command('sub')
  .description('Subscribe to the given topic and log incoming messages')
  .option('-t, --topic <TOPIC>', 'the message topic')
  .action((options) => {
    const { topic } = options;

    const client = mqtt.connect(brokerUrl);

    client.on('connect', () => {
      console.log(`Subscribed to topic "${topic}"`);

      client.subscribe(topic, () => {
        client.on('message', (topic, message) => {
          console.log(`Received message "${message.toString()}" on topic "${topic}"`);
        });
      });
    });
  });

program.parse(process.argv);

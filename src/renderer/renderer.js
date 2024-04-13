'use strict';

// const { Text } = require('material');

const topicSpan = document.querySelector('#topic > span');
const messageSpan = document.querySelector('#message > span');

window.electronAPI.onMQTTMessage((message) => {
  console.log('Renderer :: ', message);  
  topicSpan.innerText = message.topic;
  messageSpan.innerText = message.strMessage;
});

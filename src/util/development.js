/* global process, __dirname, electron, hardResetMethod */

module.exports.enableReload = () => {
  console.log('Development: enableReload');
  const path = require('node:path');
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') { 
    require('electron-reload')(__dirname, { 
      electron: path.join(__dirname, '../../node_modules', '.bin', 'electron'), 
      hardResetMethod: 'exit'
    }); 
  } 
};
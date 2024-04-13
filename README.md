# Node.js and Electron.js

## Prerequisites

[Quick Start](https://www.electronjs.org/docs/latest/tutorial/quick-start)

To use Electron, you need to install Node.js. We recommend that you use the latest LTS version available.

Please install Node.js using pre-built installers for your platform. You may encounter incompatibility issues with different development tools otherwise.

To check that Node.js was installed correctly, type the following commands in your terminal client:

node -vgit status
npm -v

The commands should print the versions of Node.js and npm accordingly.

Note: Since Electron embeds Node.js into its binary, the version of Node.js running your code is unrelated to the version running on your system.

## Getting Started:
```bash
npm install --save-dev electron

npm start
```

# Folder Structure

`index.html` - This is the HTML file that is rendered in the browser window.
`preload.js` - This file is loaded before the renderer process is loaded. It is used to set up the environment for the renderer process.
`main.js` - This is the main file that creates the Electron app and creates a browser window to render HTML.


## Creating a distributable app

Use [Electron Forge](https://www.electronforge.io/)

```bash
cd my-app
npm install --save-dev @electron-forge/cli
npm exec --package=@electron-forge/cli -c "electron-forge import"
```

Add the following to the `package.json` file:

```javascript
{
  // ...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "publish": "electron-forge publish"
  }
  // ... 
}
```

```javascript
{
  // ...
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "name": "electron_quick_start"
          }
        },
        {
          "name": "@electron-forge/maker-zip",
          "platforms": [
            "darwin"
          ]
        },
        {
          "name": "@electron-forge/maker-deb",
          "config": {}
        },
        {
          "name": "@electron-forge/maker-rpm",
          "config": {}
        }
      ]
    }
  }
  // ...
}
```

```bash
npm run make
```

# Other Resources
-[P5.JS with Electron JS](https://medium.com/random-pink-hula/p5-js-with-electronjs-making-generative-art-distributable-on-mac-and-windows-8469de3c836b)
- [Electron JS for Students](https://github.com/Jay-study-nildana/FrontEndForStudents/tree/main/ElectronJSForStudents/my-electron-app)
- [p5-electron-quick-start](https://github.com/camerenisonfire/p5-electron-quick-start)

# MQTT
https://www.emqx.com/en/blog/how-to-use-mqtt-in-nodejs

```bash
  # MQTT Broker Info
  Server: 192.168.86.95 
  TCP Port: 1883

  # Optional?
  WebSocket Port: 8083
  SSL/TLS Port: 8883
  Secure WebSocket Port: 8084
```

# Housekeeping

# Unit Testing

## Fixtures

Fixed data for testing that matches the dynamic data used at run-time.
- Sample Data from the UI
- Sample Data from MQTT
- Sample Data from Tangible Engine

## Mocha

# Dev Notes

## Main
- Create browser window
- Load Preload script
  - Create a main listener
    - handle a call from Renderer
- Connect to MQTT Broker
- 

## Renderer
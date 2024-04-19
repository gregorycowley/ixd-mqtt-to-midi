# Node.js and Electron.js

## Prerequisites
## Getting Started
# Other Resources

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

```
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
 ```

# Housekeeping

```
  // wemos/esp-8c:aa:b5:7c:ed:47/out 
  // wemos/esp-8c:aa:b5:7c:ed:47/in
  // wemos/electron_app_01/out
  // wemos/electron_app_01/in


  // ixdstudio/esp-8c:aa:b5:7c:ed:47/out 
  // ixdstudio/esp-8c:aa:b5:7c:ed:47/in
  // ixdstudio/electron_app_01/out
  // ixdstudio/electron_app_01/in

```

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
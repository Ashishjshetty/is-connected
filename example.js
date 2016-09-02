'use strict';
let IsConnected = require('./');

let isConnectivity = new IsConnected();
isConnectivity.on('connected', function connected() {
    console.log('internet connected');
}).on('disconnected', function disconnected() {
    console.log('internet not connected');
}).init('dns');

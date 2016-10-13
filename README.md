### is-connected
check if connected to internet on regular intervals and emit events accordingly. Currently you can check for internet using DNS and PING more methods will be added in future, suggestions are welcome.

### Installation
	npm install is-connected --save

### Example

		'use strict';
		let IsConnected = require('is-connected');

		let isConnectivity = new IsConnected();
		isConnectivity.on('connected', function connected() {
		    console.log('internet connected');
		}).on('disconnected', function disconnected() {
		    console.log('internet not connected');
		}).init('dns');

### Options

		// Defaults: check_interval=1000ms (milliseconds),
		// host_name=google.com (address or ip)
		// ping_timeout=5 (timeout in seconds for ping command, if ping specified on init)
		let isConnectivity = new IsConnected(<check_interval>,<host_name>,<ping_timeout);

		// Use init to start, has 2 options dns or ping, defaults to dns
		isConnectivity.init() // defaults to DNS
		isConnectivity.init('dns');
		isConnectivity.init('ping');

### Note
windows has shown a difference in behaviour as compared to linux, has been tested on linux.

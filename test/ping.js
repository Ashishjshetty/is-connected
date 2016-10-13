'use strict';
let IsConnected = require('../');

describe('PING Tests', function() {
    let isConnectivity = new IsConnected(1000);
    it('should emit a connection event', function(done) {
        isConnectivity.once('connected', function connected() {
            done();
        }).once('disconnected', function disconnected() {
            done();
        }).init('ping');
    }).timeout(2000);
});

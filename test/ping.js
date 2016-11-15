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
describe('PING Tests with ping timeout', function() {
    let isConnectivity = new IsConnected(1000, 'www.google.com', 5);
    it('should emit a connection event', function(done) {
        isConnectivity.once('connected', function connected() {
            done();
        }).once('disconnected', function disconnected() {
            done();
        }).init('ping');
    }).timeout(2000);
});

describe('PING Tests with ping forceType', function() {
    let isConnectivity = new IsConnected(1000, 'www.google.com', 5);
    it('should emit a connection event', function(done) {
        isConnectivity.once('connected', function connected() {
            done();
        }).once('disconnected', function disconnected() {
            done();
        }).init('ping');
    }).timeout(2000, 'win32');
});

'use strict';
let IsConnected = require('../');

describe('DNS Tests', function() {
    let isConnectivity = new IsConnected(1000);
    it('should emit a connection event', function(done) {
        isConnectivity.once('connected', function connected() {
            done();
        }).once('disconnected', function disconnected() {
            done();
        }).init('dns');
    }).timeout(2000);
});

describe('DNS Tests explicit lookup', function() {
    let isConnectivity = new IsConnected(1000);
    it('should emit a connection event', function(done) {
        isConnectivity.once('connected', function connected() {
            done();
        }).once('disconnected', function disconnected() {
            done();
        }).init('dns', 'lookup');
    }).timeout(2000);
});
describe('DNS Tests explicit resolve', function() {
    let isConnectivity = new IsConnected(1000);
    it('should emit a connection event', function(done) {
        isConnectivity.once('connected', function connected() {
            done();
        }).once('disconnected', function disconnected() {
            done();
        }).init('dns', 'resolve');
    }).timeout(2000);
});


describe('DNS Tests forced disconnected event', function() {
    let isConnectivity = new IsConnected(1000, 'ajsdfjsf.com');
    it('should emit a connection event', function(done) {
        isConnectivity.once('connected', function connected() {
            done();
        }).once('disconnected', function disconnected() {
            done();
        }).init('dns');
    }).timeout(2000);
});

'use strict';
const EventEmitter = require('events').EventEmitter;
const resolve = require('dns').resolve;
const lookup = require('dns').lookup;
const exec = require('child_process').exec;
const os = require('os');

/**
 * IsConnected check if connected to internet on regular intervals and emit events accordingly.
 */
class IsConnected extends EventEmitter {
    /**
     * constructs IsConnected
     * @param  {Integer} checkInterval check interval defaults to 10000 seconds ie 10 seconds
     * @param  {String} hostName       hostname of server to check internet using
     * @param  {Integer} pingTimeout   if using ping, the number of seconds to wait for response, defaults to 5
     */
    constructor(checkInterval, hostName, pingTimeout) {
            super();
            this.checkInterval = (checkInterval) ? checkInterval : 10000;
            this.state = false;
            this.hostName = (hostName) ? hostName : 'www.google.com';
            this.pingTimeout = pingTimeout || 5;
        }
        /**
         * start Connectivity monitoring process
         * @param  {String} type type of check dns|ping
         */
    init(type) {
            switch (type) {
                case 'dns':
                    this._dns();
                    break;
                case 'ping':
                    this._ping();
                    break;
                default:
                    this._dns();
            }
        }
        /**
         * dns method to check internet connectivity emits 2 events connected|disconnected
         * used dns lookup instead of resolve for any OS other than linux as there was a
         * change in behaviour in windows. raised in issue #1
         */
    _dns() {
            if (os.platform() === 'linux') {
                setTimeout(function() {
                    resolve(this.hostName, function(err) {
                        if (err) {
                            this.state = false;
                            this.emit('disconnected');
                        } else {
                            this.state = true;
                            this.emit('connected');
                        }
                        process.nextTick(function() { this._dns(); }.bind(this));
                    }.bind(this));
                }.bind(this), this.checkInterval);
            } else {
                setTimeout(function() {
                    lookup(this.hostName, function(err) {
                        if (err) {
                            this.state = false;
                            this.emit('disconnected');
                        } else {
                            this.state = true;
                            this.emit('connected');
                        }
                        process.nextTick(function() { this._dns(); }.bind(this));
                    }.bind(this));
                }.bind(this), this.checkInterval);
            }

        }
        /**
         * ping method to check internet connectivity emits 2 events connected|disconnected
         */
    _ping() {
        let cmd;
        if (os.platform() === 'win32') {
            cmd = 'ping -n 1 -w :pingTimeout :hostName'.replace(/:hostName/, this.hostName).replace(/:pingTimeout/, this.pingTimeout * 1000);
        } else {
            cmd = 'ping -c 1 -w :pingTimeout :hostName'.replace(/:hostName/, this.hostName).replace(/:pingTimeout/, this.pingTimeout);
        }
        setTimeout(function() {
            exec(cmd, function ping(err) {
                if (err) {
                    this.state = false;
                    this.emit('disconnected');
                } else {
                    this.state = true;
                    this.emit('connected');
                }
                process.nextTick(function() { this._ping(); }.bind(this));
            }.bind(this));
        }.bind(this), this.checkInterval);
    }
}

module.exports = IsConnected;

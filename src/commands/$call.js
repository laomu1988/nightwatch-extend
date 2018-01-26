/**
 * @file 执行函数
 * @author laomu1988@qq.com
 */
const util = require('util');
const events = require('events');
const config = require('../config');
const _ = require('lodash');

/**
 * 执行脚本函数
 * @param {Function} func 要执行的函数
 * @return {Object} Nightwatch
 */
function command(func) {
    const me = this;
    process.nextTick(() => {
        func.apply(me.client.api);
        me.emit('complete');
    });
    return this;
}


function WaitFor() {
    events.EventEmitter.call(this);
}

util.inherits(WaitFor, events.EventEmitter);

WaitFor.prototype.command = command;

module.exports = WaitFor;

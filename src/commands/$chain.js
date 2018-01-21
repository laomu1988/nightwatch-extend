/**
 * @file 链式调用
 * @author muzhilong<muzhilong@baidu.com>
 */
const fs = require('fs');
const util = require('util');
const events = require('events');
const config = require('../config');

/**
 * 链式调用
 * @param {Function} func... 函数列表，函数参数([result...], next), result为上一个函数执行后调用next时的参数列表, next表示当前执行完毕，开始执行下一个函数。。 第一个函数参数只有next。 当当前函数执行完毕后，调用next(result1, result2)将参数传递给下一个函数.
 * @return {Object} Nightwatch
 */
function command() {
    const me = this;
    const funcs = arguments;
    let index = 0;
    let len = funcs.length;
    wait();
    function wait() {
        let func = funcs[index];
        let args = Array.prototype.slice.call(arguments, 0).concat(wait);
        index += 1;
        if (typeof func === 'function') {
            config.log('$chain:', index, arguments);
            func.apply(me.client.api, args);
        }
        else if (index < len) {
            config.log('$chain:', index, arguments);
            wait();
        }
        else {
            me.emit('complete');
            config.log('$chain: complete');
        }
    }
    return this;
}


function WaitFor() {
    events.EventEmitter.call(this);
}

util.inherits(WaitFor, events.EventEmitter);

WaitFor.prototype.command = command;

module.exports = WaitFor;

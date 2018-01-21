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
 * @param {Array} funcs 函数列表： 函数参数(result, next), result为上一个函数的执行结果, next表示当前执行完毕，开始执行下一个函数。。 第一个函数只有next
 * @param {Function} cb 回调函数
 * @return {Object} Nightwatch
 */
function command(funcs, cb) {
    const me = this;
    let index = 0;
    wait();
    function wait(result) {
        let func = funcs[index];
        index += 1;
        if (func) {
            func.call(me.client.api, index > 1 ? result : wait, wait);
        }
        else {
            if (typeof cb === 'function') {
                cb.call(me.client.api, {value: result});
            }
            me.emit('complete');
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

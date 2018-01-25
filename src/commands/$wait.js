/**
 * @file 执行客户端函数直到指定结果
 * @author laomu1988@qq.com
 */
const util = require('util');
const events = require('events');
const config = require('../config');
const common = require('../common');

/**
 * 调用函数至到函数返回结果!!result为true
 * @param {string} func 函数体
 * @param {Array} [args] 参数列表
 * @param {number} [timeout] 超时时间，默认5000ms
 * @param {Function} [cb] 回调函数
 * @return {Object} Nightwatch
 */
function command(func, args, timeout = 5000, cb) {
    const me = this;
    const start = Date.now();
    if (typeof timeout === 'function') {
        cb = timeout;
        timeout = 5000;
    }
    if (typeof args === 'number') {
        timeout = args;
        args = [];
    }
    if (typeof args === 'function') {
        cb = args;
        args = [];
        timeout = 5000;
    }
    if (args && args.length > 0 && args.pop) {
        while (args.length > 0 && typeof args[args.length - 1] === 'undefined') {
            args.pop();
        }
    }
    else {
        args = [];
    }
    timeout = timeout || 5000;
    const msg = '[执行函数体]' + func;
    function wait() {
        config.log('$wait: start', func, args, timeout);
        return me.client.api.execute(func, args, function (result) {
            config.log('$wait: result', func, JSON.stringify(result));
            let value = result.value;
            if (value) {
                if (!cb) {
                    if (value && value.ELEMENT) { // 返回了元素节点
                        value = true;
                    }
                    me.client.api.assert.equal(JSON.stringify(value), 'true', msg);
                }
                else if (typeof cb === 'function') {
                    cb.call(me.client.api, result);
                }
                me.emit('complete');
            }
            else if (Date.now() - start > timeout) {
                me.client.api.assert.equal('timeout', true, msg);
            }
            else {
                setTimeout(wait, 10);
            }
        });
    }
    process.nextTick(wait);
    return this;
}


function WaitFor() {
    events.EventEmitter.call(this);
}

util.inherits(WaitFor, events.EventEmitter);

WaitFor.prototype.command = command;

module.exports = WaitFor;

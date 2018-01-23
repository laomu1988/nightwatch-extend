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
 * @param {string|Function} funcName 函数体或者$night扩展函数名称
 * @param {Array} [args] 参数列表
 * @param {number} [timeout] 超时时间，默认50ms
 * @param {Function} [cb] 回调函数
 * @return {Object} Nightwatch
 */
function command(funcName, args, timeout = 50, cb) {
    const me = this;
    const start = Date.now();
    if (typeof timeout === 'function') {
        cb = timeout;
        timeout = 50;
    }
    if (typeof args === 'number') {
        timeout = args;
        args = [];
    }
    if (typeof args === 'function') {
        cb = args;
        args = [];
        timeout = 50;
    }
    if (args && args.length > 0 && args.pop) {
        while (args.length > 0 && typeof args[args.length - 1] === 'undefined') {
            args.pop();
        }
    }
    else {
        args = [];
    }
    const msg = '[' + (config.names[funcName] || funcName) + ']' + args.join(', ');
    wait();
    function wait() {
        config.log('exec-util: start', funcName, args, timeout);
        return common.clientFunc(me.client.api, funcName, args, function (result) {
            config.log('$exec-util: result', funcName, JSON.stringify(result));
            let value = result.value;
            if (value) {
                if (typeof funcName === 'string' && !cb) {
                    if (value && value.ELEMENT) { // 返回了元素节点
                        value = true;
                    }
                    me.client.api.assert.equal(value, true, msg);
                    if (value !== true) {
                        console.trace(result);
                    }
                }
                else if (typeof cb === 'function') {
                    cb.call(me.client.api, value);
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
    return this;
}


function WaitFor() {
    events.EventEmitter.call(this);
}

util.inherits(WaitFor, events.EventEmitter);

WaitFor.prototype.command = command;

module.exports = WaitFor;

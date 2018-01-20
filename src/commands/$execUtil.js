/**
 * @file 执行客户端函数直到指定结果
 * @author muzhilong<muzhilong@baidu.com>
 */
const fs = require('fs');
const util = require('util');
const events = require('events');
const clientjs = fs.readFileSync(__dirname + '/../../dist/client.js', 'utf8');
const config = require('../config');

function command(funcName, args, timeout = 50, cb) {
    const me = this;
    const start = Date.now();
    if (args && args.length > 0) {
        while (args.length > 0 && typeof args[args.length - 1] === 'undefined') {
            args.pop();
        }
    }
    args = args || [];
    const msg = '[' + (config.names[funcName] || funcName) + ']' + args.join(', ');
    wait();
    function wait() {
        me.client.api.execute(function (clientjs) {
            if (window.$night) {
                return true;
            }
            eval(clientjs);
            return true;
        }, [clientjs], function (result) {
            if (result.value !== true) {
                this.assert.equal(result.value, true, msg);
                console.trace(result);
            }
        })
        .execute(function (funcName, args) {
            if (!window.$night) {
                return false;
            }
            try {
                return window.$night[funcName].apply(window.$night, args);
            }
            catch (err) {
                console.trace(err);
                return false;
            }
        }, [funcName, args], function (result) {
            let value = result.value;
            if (value && value.ELEMENT) { // 返回了元素节点
                value = true;
            }
            if (value) {
                me.client.api.assert.equal(value, true, msg);
                if (value !== true) {
                    console.trace(result);
                }
                if (cb) {
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

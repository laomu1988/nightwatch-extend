/**
 * @file 执行client端的函数
 * @author muzhilong<muzhilong@baidu.com>
 */
let fs = require('fs');
let config = require('../config');
let clientjs = fs.readFileSync(__dirname + '/../../dist/client.js', 'utf8');

/**
 * 执行客户端函数
 * @param {string} funcName 函数名
 * @param {Array} args 参数列表
 * @return {Object} browser对象
 */
exports.command = function (funcName, args, cb) {
    const me = this;
    if (args && args.length > 0) {
        while (args.length > 0 && typeof args[args.length - 1] === 'undefined') {
            args.pop();
        }
    }
    args = args || [];
    const msg = '[' + (config.names[funcName] || funcName) + ']' + args.join(', ');
    config.log('$exec: start', funcName, args);
    return this
        .execute(function (clientjs) {
            if (window.$night) {
                return true;
            }
            eval(clientjs);
            return true;
        }, [clientjs], function (result) {
            config.log('$exec: injectjs', funcName, args);
            if (result.value !== true) {
                this.assert.equal(result.value, true, msg);
                console.trace(result);
            }
        })
        .execute(function (funcName, args) {
            if (!window.$night) {
                return false;
            }
            return window.$night[funcName].apply(window.$night, args);
        }, [funcName, args], function (result) {
            config.log('$exec: result', funcName, JSON.stringify(result));
            let value = result.value;
            if (cb) {
                cb(result);
            }
            else {
                if (value && value.ELEMENT) { // 返回了元素节点
                    value = true;
                }
                me.client.api.assert.equal(value, true, msg);
                if (value !== true) {
                    console.trace(result);
                }
            }
        });
};
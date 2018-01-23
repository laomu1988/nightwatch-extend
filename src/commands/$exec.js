/**
 * @file 执行client端的函数
 * @author muzhilong<muzhilong@baidu.com>
 */
let config = require('../config');
const common = require('../common');

/**
 * 执行客户端函数
 * @param {string} funcName 函数名
 * @param {Array} [args] 参数列表
 * @param {Function} [cb] 回调函数
 * @return {Object} browser对象
 */
exports.command = function (funcName, args, cb) {
    const me = this;
    if (typeof args === 'function') {
        cb = args;
        args = [];
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
    config.log('$exec: start', funcName, args);
    return common.clientFunc(me, funcName, args, function (result) {
        let value = result.value;
        if (typeof cb === 'function') {
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
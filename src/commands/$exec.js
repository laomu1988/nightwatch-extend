/**
 * @file 执行client端的函数
 * @author laomu1988@qq.com
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
    return common.clientFunc(me, funcName, args, common.catchResult(this, msg, cb));
};
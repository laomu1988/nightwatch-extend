/**
 * @file 执行client端的函数
 * @author muzhilong<muzhilong@baidu.com>
 */
let fs = require('fs');
let ext = require('../extend');
let config = require('../config');
let clientjs = fs.readFileSync(__dirname + '/../../dist/client.js', 'utf8');

/**
 * 执行客户端函数
 * @param {string} funcName 函数名
 * @param {Array} args 参数列表
 * @param {number} timeout 超时时间
 * @return {Object} browser对象
 */
exports.command = function (funcName, args, timeout = 10) {
    if (args && args.length > 0) {
        while (args.length > 0 && typeof args[args.length - 1] === 'undefined') {
            args.pop();
        }
    }
    args = args || [];
    return this
        .executeAsync(function (code, done) {
            if (window.$night) {
                return done(true);
            }
            try {
                console.log('run code');
                eval(code);
                done(true);
            }
            catch (err) {
                done(err + '');
            }
        }, [clientjs], function (result) {
            if (result.value !== true) {
                console.error('ErrorWhenInjectCode');
                this.assert.equal(result.value, true);
            }
        })
        .executeAsync(ext.exec, [funcName, args, timeout || 10], function (result) {
            if (result.value !== true) {
                console.log('    ErrorWhenCall:', ext.names[funcName] || funcName, args.join(', '));
                this.assert.equal(result.value, true);
            }
            else if (config.debug) {
                console.log('    ', (ext.names[funcName] || funcName) + ':', args.join(', '));
            }
        });
};
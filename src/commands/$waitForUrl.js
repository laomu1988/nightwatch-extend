/**
 * @file 等待跳转到指定网址
 * @author laomu1988@qq.com
 */
let config = require('../config');


/**
 * 等待跳转到指定网址
 * @param {string|RegExp} urlOrReg 网址片段或者正则
 * @param {number} [timeout] 超时时间,单位ms,默认2000ms
 * @param {Function} [cb] 回调函数
 * @return {Object} Nightwatch
 */
exports.command = function (urlOrReg, timeout = 2000, cb) {
    if (typeof timeout === 'function') {
        cb = timeout;
        timeout = 2000;
    }
    return this.$execUtil(config.api.waitForUrl, [urlOrReg], timeout, cb);
};
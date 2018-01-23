/**
 * @file 等待指定文本消失
 * @author muzhilong<muzhilong@baidu.com>
 */
let config = require('../config');

/**
 * 等待指定文本消失
 * @param {string} text 文字内容，注意一个节点的全部内容
 * @param {number} [timeout] 超时时间,单位ms,默认2000ms
 * @param {Function} [cb] 回调函数
 * @return {Object} Nightwatch
 */
exports.command = function (text, timeout = 2000, cb) {
    if (typeof timeout === 'function') {
        cb = timeout;
        timeout = 2000;
    }
    return this.$execUtil('notText', [text], timeout, cb);
};
/**
 * @file 返回是否存在文本
 * @author laomu1988@qq.com
 */
let config = require('../config');

/**
 * 等待指定文本出现
 * @param {string} text 文字内容，注意一个节点的全部内容
 * @param {Function} [cb] 回调函数
 * @return {Object} Nightwatch
 */
exports.command = function (text, cb) {
    let me = this;
    return this.$exec(config.api.waitForText, [text], function (result) {
        if (result.value && result.value.ELEMENT) {
            result.value = true;
        }
        if (typeof cb === 'function') {
            cb(result);
        }
        else {
            me.$msg('$hasText ' + text + JSON.stringify(result.value));
        }
    });
};
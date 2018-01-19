/**
 * @file 等待指定文本出现
 * @author muzhilong<muzhilong@baidu.com>
 */
let ext = require('../extend');
exports.command = function (text, timeout = 2000) {
    return this.$exec(ext.waitForText, [text], timeout);
};
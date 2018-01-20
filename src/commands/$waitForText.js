/**
 * @file 等待指定文本出现
 * @author muzhilong<muzhilong@baidu.com>
 */
let config = require('../config');
exports.command = function (text, timeout = 2000) {
    return this.$execUtil(config.api.waitForText, [text], timeout);
};
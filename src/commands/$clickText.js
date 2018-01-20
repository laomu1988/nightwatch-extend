/**
 * @file 根据文本查找节点并点击
 * @author muzhilong<muzhilong@baidu.com>
 */

let config = require('../config');
exports.command = function (text, selector, timeout = 20) {
    return this.$execUtil(config.api.clickText, [text, selector], timeout);
};

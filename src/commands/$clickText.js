/**
 * @file 根据文本查找节点并点击
 * @author muzhilong<muzhilong@baidu.com>
 */

let ext = require('../extend');
exports.command = function (text, selector, timeout = 20) {
    return this.$exec(ext.clickText, [text, selector], timeout);
};

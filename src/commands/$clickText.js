/**
 * @file 根据文本查找节点并点击
 * @author muzhilong<muzhilong@baidu.com>
 */

let config = require('../config');

exports.command = function (text, cb) {
    config.log('$clickText: start', text);
    return this.$textSelectorCommand(text, 'click', [], cb);
};
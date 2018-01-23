/**
 * @file 根据文本查找节点并点击
 * @author laomu1988@qq.com
 */

let config = require('../config');

exports.command = function (text, cb) {
    config.log('$clickText: start', text);
    return this.$selectorCommand(text, 'click', cb);
};
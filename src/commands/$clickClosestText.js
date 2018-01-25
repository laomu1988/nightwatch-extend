/**
 * @file 根据文本临近节点并点击
 * @author laomu1988@qq.com
 */

let config = require('../config');

exports.command = function (text, targetText, cb) {
    config.log('$clickClosest: start', text, targetText);
    return this.$selectorCommand([text, targetText], 'click', cb);
};
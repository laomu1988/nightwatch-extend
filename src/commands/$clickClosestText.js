/**
 * @file 根据文本临近节点并点击
 * @author laomu1988@qq.com
 */

let config = require('../config');

/**
 * 点击临近的文本内容
 * @param {string} text 起始节点文本或者css选择器
 * @param {string} targetText 结束节点的文本
 * @param {Function} cb 回调函数
 * @return {Object} Nightwatch
 */
exports.command = function (text, targetText, cb) {
    config.log('$clickClosest: start', text, targetText);
    return this.$selectorCommand([text, targetText], 'click', cb);
};
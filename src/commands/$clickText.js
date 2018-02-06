/**
 * @file 根据文本查找节点并点击
 * @author laomu1988@qq.com
 */

let config = require('../config');
let common = require('../common');

exports.command = function (text, cb) {
    config.log('$clickText: start', text);
    const msg = '[点击]' + text;
    return this.$selectorCommand(text, 'click', common.catchResult(this, msg, cb));
};
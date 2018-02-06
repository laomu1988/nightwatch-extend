/**
 * @file 移动到指定文字内容上
 * @author laomu1988@qq.com
 */
const config = require('../config');
const common = require('../common');
exports.command = function (text, cb) {
    config.log('$moveToText: start', text);
    return this.$selectorCommand(text, 'moveToElement', [5, 5], common.catchResult(this, '[移动到文字节点]' + text, cb));
};

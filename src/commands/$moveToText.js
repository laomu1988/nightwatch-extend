/**
 * @file 移动到指定文字内容上
 * @author laomu1988@qq.com
 */
const config = require('../config');

exports.command = function (text, cb) {
    config.log('$moveToText: start', text);
    return this.$selectorCommand(text, 'moveToElement', [5, 5], cb);
};

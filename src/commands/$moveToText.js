/**
 * @file 移动到指定文字内容上
 * @author muzhilong<muzhilong@baidu.com>
 */
const config = require('../config');

exports.command = function (text, cb) {
    config.log('$moveToText: start', text);
    return this.$textSelectorCommand(text, 'moveToElement', [5, 5], cb);
};

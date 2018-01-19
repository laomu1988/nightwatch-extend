/**
 * @file 根据label查找input并输入值
 * @author muzhilong<muzhilong@baidu.com>
 */

let ext = require('../extend');

exports.command = function (text, value) {
    return this.$exec(ext.labelValue, [text, value]);
};

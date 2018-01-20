/**
 * @file 根据label查找input并输入值
 * @author muzhilong<muzhilong@baidu.com>
 */

let config = require('../config');

exports.command = function (text, value) {
    return this.$execUtil(config.api.labelValue, [text, value], 50);
};

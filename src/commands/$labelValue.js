/**
 * @file 根据label查找input并输入值
 * @author laomu1988@qq.com
 */

let config = require('../config');

exports.command = function (text, value, cb) {
    return this.$execUtil(config.api.labelValue, [text, value], 20, cb);
};

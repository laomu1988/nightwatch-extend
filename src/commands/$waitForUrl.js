/**
 * @file 等待跳转到指定网址
 * @author muzhilong<muzhilong@baidu.com>
 */
let config = require('../config');
exports.command = function (urlOrReg, timeout = 2000) {
    return this.$execUtil(config.api.waitForUrl, [urlOrReg], timeout);
};
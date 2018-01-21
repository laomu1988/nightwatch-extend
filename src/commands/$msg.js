/**
 * @file 展示提示消息
 */

exports.command = function (msg) {
    return this.assert.equal(typeof msg, 'string', msg);
};
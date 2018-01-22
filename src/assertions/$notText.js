/**
 * @file 存在文本内容（注意除了空格外务必和节点内容完全一致）
 * @param {strong} text
 */
const config = require('../config');
exports.assertion = function (text) {
    this.message = 'Testing if document has NOT element with text “' + text + '”.';
    this.expected = null;
    this.pass = function (val) {
        return val === this.expected;
    };
    this.value = function (res) {
        config.log('assert.$hasText: result', res);
        return res.value;
    };
    this.command = function (cb) {
        var self = this;
        config.log('assert.$hasText: start', text);
        return this.api.$exec('findDomByText', [text], function (res) {
            cb.call(self, res);
        });
    };
};

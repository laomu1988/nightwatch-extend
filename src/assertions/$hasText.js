/**
 * @file 存在文本内容（注意除了空格外务必和节点内容完全一致）
 * @param {string} text
 */
const config = require('../config');

exports.assertion = function (text) {
    this.message = 'Testing if document has element with text “' + text + '”.';
    this.expected = true;
    this.pass = function (val) {
        return val === this.expected;
    };
    this.value = function (res) {
        config.log('assert.$hasText: result', res);
        let value = res.value;
        if (value && value.ELEMENT) {
            value = true;
        }
        return value;
    };
    this.command = function (cb) {
        var self = this;
        config.log('assert.$hasText: start', text);
        return this.api.$exec('findDomByText', [text], function (res) {
            cb.call(self, res);
        });
    };
};

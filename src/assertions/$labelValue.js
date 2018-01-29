/**
 * @file 根据label查找到的输入框内的值等于指定值
 * @param {string} label 输入框内的值
 * @param {string} value 输入框内的值
 * @param {string} msg 提示消息
 */

exports.assertion = function (label, value = '', msg = '') {
    this.message = msg || ('[输入框内值]' + label);
    this.expected = value;
    this.pass = function (val) {
        return val === this.expected;
    };
    this.value = function (res) {
        // console.log(res);
        // return value;
        return res.value;
    };
    this.command = function (cb) {
        let self = this;
        return this.api.$exec(function (label) {
            let dom = window.$night.labelInput(label);
            if (dom) {
                return dom.value;
            }
            return null;
        }, [label], function (res) {
            cb.call(self, res);
        });
    };
};

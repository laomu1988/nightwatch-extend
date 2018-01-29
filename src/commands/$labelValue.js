/**
 * @file 根据label查找input并输入值
 * @author laomu1988@qq.com
 */

let _ = require('lodash');
let config = require('../config');

exports.command = function (text, value, cb) {
    let me = this;
    let selector = '';
    let msg = '[输入]' + text + (_.isArray(value) ? value.join(',') : value);
    config.log(msg);
    return this.screenshot().$chain(function (done) {
        me.$exec('labelInputSelector', [text], function (result) {
            config.log(msg, result);
            selector = result.value;
            if (typeof selector !== 'string') {
                me.assert.equal(JSON.stringify(result.value), 'need_to_be_string', msg);
            }
            done();
        });
    // }, function (done) {
    //     setTimeout(done, 1000000);
    }, function (done) {
        me.clearValue(selector).setValue(selector, value, function (result) {
            config.log(msg, result);
            if (result.value && result.value.message) {
                me.assert.equal(JSON.stringify(result.value), 'null', msg);
            }
            if (typeof cb === 'function') {
                cb(result);
            }
            done();
        });
    });
    // return this.$execUtil(config.api.labelValue, [text, value], 20, cb);
};

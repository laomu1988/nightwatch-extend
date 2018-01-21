/**
 * @file 根据文本查找节点并点击
 * @author muzhilong<muzhilong@baidu.com>
 */

let config = require('../config');

exports.command = function (text, cb) {
    let selector = null;
    let me = this;
    config.log('$clickText: start', text);
    return this
        .$textSelectorThen(text, function (selector, done) {
            config.log('$clickText: selector', text, selector);
            me.click(selector, function () {
                if (typeof cb === 'function') {
                    cb.call(me, {value: typeof selector === 'string'});
                }
                else {
                    me.$msg(text);
                }
                done();
                config.log('$clickText: complete', text);
            });
        });
};
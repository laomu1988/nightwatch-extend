/**
 * @file 移动到指定文字内容上
 * @author muzhilong<muzhilong@baidu.com>
 */
const config = require('../config');

exports.command = function (text, cb) {
    let selector = null;
    let me = this;
    config.log('$moveToText: start', text);
    return this
        .$textSelectorThen(text, function (selector, done) {
            config.log('$moveToText: selector', text, selector);
            me.moveToElement(selector, 5, 5, function () {
                if (typeof cb === 'function') {
                    cb.call(me, {value: typeof selector === 'string'});
                }
                else {
                    me.$msg(text);
                }
                done();
                config.log('$moveToText: complete', text, selector);
            });
        });
};

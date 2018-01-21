/**
 * @file 移动到指定文字内容上
 * @author muzhilong<muzhilong@baidu.com>
 */

let config = require('../config');

exports.command = function (text, cb) {
    let selector = null;
    let me = this;
    return this
        .$exec(config.api.getSelector, [text], function (result) {
            me.assert.equal(typeof result.value, 'string');
            selector = result.value;
            if (typeof result.value !== 'string') {
                console.log(result);
            }
        })
        .$chain([
            function (next) {
                me.moveToElement(selector, 5, 5, function () {
                    next();
                });
            }
        ]);
};

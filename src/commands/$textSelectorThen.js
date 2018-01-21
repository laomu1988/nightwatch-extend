/**
 * @file 移动到指定文字内容上
 * @author muzhilong<muzhilong@baidu.com>
 */

let config = require('../config');

exports.command = function (text, cb) {
    let selector = null;
    let me = this;
    config.log('$textSelectorThen: start', text);
    return this
        .$exec(config.api.getSelector, [text], function (result) {
            config.log('$textSelectorThen: getSelect', text, result.value);
            selector = result.value;
            if (typeof result.value !== 'string') {
                me.assert.equal(typeof result.value, 'string', text);
                console.error(result);
            }
        })
        .$chain(
            function (next) {
                cb(selector, function () {
                    next();
                    config.log('$textSelectorThen: complete', text);
                });
            }
        );
};

/**
 * @file 移动到指定文字内容上
 * @author muzhilong<muzhilong@baidu.com>
 */

let config = require('../config');

exports.command = function (text, command, args, cb) {
    let selector = null;
    let me = this;
    if (typeof args === 'function') {
        cb = args;
        args = [];
    }
    args = args || [];
    config.log('$textSelectorCommand: start', text);
    return this
        .$exec(config.api.getSelector, [text], function (result) {
            config.log('$textSelectorCommand: getSelector', text, result.value);
            selector = result.value;
            if (typeof result.value !== 'string') {
                me.assert.equal(typeof result.value, 'string', text);
                console.error(result);
            }
        })
        .$chain(
            function (next) {
                let arr = [selector].concat(args);
                arr.push(function (result) {
                    if (typeof cb === 'function') {
                        cb.call(me, result);
                    }
                    else {
                        me.$msg(text);
                    }
                    next();
                    config.log('$textSelectorCommand: complete', text, command, JSON.stringify(result));
                });
                config.log('$textSelectorCommand: command', text, command, args);
                me[command].apply(me, arr);
            }
        );
};

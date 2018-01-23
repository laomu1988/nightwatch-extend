/**
 * @file 取得文字节点css选择器并执行command命令
 * @author laomu1988@qq.com
 */

let config = require('../config');

/**
 * 取得文字节点css选择器并执行command命令
 * @param {Array|string} text 查询dom节点的参数
 * @param {string} command 取得选择器的内容
 * @param {Array} commandArgs 执行命令时的参数
 * @param {Function} [cb] 执行命令后的回调函数
 */
exports.command = function (text, command, commandArgs, cb) {
    let selector = null;
    let me = this;
    if (!text || !(text.length > 0)) {
        throw new Error('$selectorCommand参数错误');
    }
    if (typeof text === 'string') {
        text = [text];
    }
    if (typeof commandArgs === 'function') {
        cb = commandArgs;
        commandArgs = [];
    }
    commandArgs = commandArgs || [];

    config.log('$selectorCommand: start', text, command, commandArgs);
    return this
        .$exec(config.api.getSelector, text, function (result) {
            config.log('$selectorCommand: getSelector', text, result.value);
            selector = result.value;
            if (typeof result.value !== 'string') {
                me.assert.equal(typeof result.value, 'string', text.join(','));
                console.error(result);
                throw new Error('$selectorCommand: [' + text.join(',') + '] Failure');
            }
        })
        .$chain(
            function (next) {
                let arr = [selector].concat(commandArgs);
                arr.push(function (result) {
                    if (typeof cb === 'function') {
                        cb.call(me, result);
                    }
                    else {
                        me.$msg('[' + command + ']' + commandArgs.join(', '));
                    }
                    next();
                    config.log('$selectorCommand: complete', command, JSON.stringify(result));
                });
                config.log('$selectorCommand: command', command, selector, commandArgs || '');
                me[command].apply(me, arr);
            }
        );
};

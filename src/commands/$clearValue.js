/**
 * @file 清理输入框的值
 */

const config = require('../config');

/**
 * 清理输入框的值
 * @param {string} selectorOrText 输入框的选择器或者label文字
 * @param {Function} cb 设定输入框的值之后的回调函数
 */
function command(selectorOrText, cb) {
    let me = this;
    return this.$exec(function (selectorOrText) {
        let dom = document.querySelector(selectorOrText);
        if (!dom) {
            dom = window.$night.labelInput(selectorOrText);
        }
        if (dom && dom.value) {
            dom.value = '';
            let event = document.createEvent('UIEvents');
            event.initEvent('input', true, true);
            event.eventType = 'message';
            dom.dispatchEvent(event);
        }
        return true;
    }, [selectorOrText], function (result) {
        me.$catchResult(result);
        if (typeof cb === 'function') {
            cb(result);
        }
    });
}

exports.command = command;
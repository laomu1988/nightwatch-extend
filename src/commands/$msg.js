/**
 * @file 展示提示消息
 */

const config = require('../config');
function command(msg) {
    config.log('$msg: start', msg);
    if (arguments.length > 1) {
        for (let i = 1; i < arguments.length; i ++) {
            msg += ',' + JSON.stringify(arguments[i]);
        }
    }
    let me = this;
    return this.$call(function () {
        me.assert.equal(typeof msg, 'string', msg);
        config.log('$msg: end', msg);
    });
}

exports.command = command;
/**
 * @file 展示提示消息
 */

const config = require('../config');
function command(msg) {
    config.log('$msg: start', msg);
    return this.execute(function () {
        return true;
    }, [], function () {
        this.assert.equal(typeof msg, 'string', msg);
        config.log('$msg: end', msg);
    });
}

exports.command = command;
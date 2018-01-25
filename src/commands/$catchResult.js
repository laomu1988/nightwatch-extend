/**
 * @file 判断结果中是否有错误，假如有错误就输出提示
 */
const config = require('../config');
function command(result, msg) {
    return this.execute(function () {
        return true;
    }, [], function () {
        if (result && result.value && result.value.message) {
            this.assert.equal(JSON.stringify(result), 'unCatchMessage', msg);
        }
    });
}

exports.command = command;
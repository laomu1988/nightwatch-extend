/**
 * @file 拖动节点到另一个节点上
 */
const config = require('../config');
function command(fromText, toText) {
    let me = this;
    return this
        .$msg('[开始拖动]', fromText, toText)
        // .$selectorCommand(fromText, 'click')
        .$selectorCommand(fromText, 'moveToElement', [5, 5], function (result) {
            me.$catchResult(result);
        })
        .pause(2000)
        .mouseButtonDown()
        .$msg('[鼠标按下]')
        .pause(20)
        .$selectorCommand(toText, 'moveToElement', [5, 5], function (result) {
            me.$catchResult(result, '移动到节点');
        })
        .pause(2000)
        .$msg('[鼠标移动]')
        .pause(20)
        .mouseButtonUp(0, function (result) {
            me.$catchResult(result);
            console.log('up', result);
        })
        .$msg('[鼠标松开]');
}

exports.command = command;
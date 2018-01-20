/**
 * @file 客户端脚本
 *  执行环境浏览器端
 *  每个函数独立执行不能引用外部变量或函数
 *  $night的执行入口
 * @author laomu1988
 * @module
 */

function exec(funcName, args, timeout, done) {
    let start = Date.now();
    let hasCalled = false;
    function callFunc() {
        try {
            if (Date.now() - start > timeout) { // 是否已超时
                return done('timeout');
            }
            if (!window.$night) {
                // eval(injectjs);
                // console.log('injectjs');
                return setTimeout(callFunc, 20);
            }
            if (!window.$night[funcName]) {
                done('Can not find client Function：' + funcName);
                return;
            }
            let result = window.$night[funcName].apply(window.$night, args);
            if (result) {
                if (result instanceof Error) {
                    done(result + '');
                }
                else {
                    done(true);
                }
            }
            else {
                setTimeout(callFunc, 20);
            }
        }
        catch (err) {
            done(err);
        }
    }
    callFunc();
}

module.exports = {
    exec,
    waitForText: 'findDomByText',
    labelValue: 'labelValue',
    clickText: 'clickText',
    waitForUrl: 'waitForUrl',
    names: {
        findDomByText: '等待',
        waitForUrl: '等待跳转',
        labelValue: 'label输入',
        clickText: '点击'
    }
};

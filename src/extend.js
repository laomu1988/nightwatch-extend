/**
 * @file 客户端脚本
 *  执行环境浏览器端
 *  每个函数独立执行不能引用外部变量或函数
 *  $night的执行入口
 * @author laomu1988
 * @module
 */

function exec(funcName, args, wait, done) {
    let start = Date.now();
    function callFunc() {
        if (window.$night && window.$night) {
            if (window.$night[funcName]) {
                try {
                    let result = window.$night[funcName].apply(window.$night, args);
                    if (result) {
                        console.log('exec-result:', result);
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
                    done(err + '');
                }
            }
            else {
                done('Can not find client Function：' + funcName);
            }
        }
        else if (Date.now() - start > wait) {
            done('timeout');
        }
        else {
            setTimeout(callFunc, 20);
        }
    }
    callFunc();
}

function waitForText(text, selector, milisecond, done) {
    let start = Date.now();
    function wait() {
        if (window.$night && window.$night.findDomByText(text, selector)) {
            done(true);
        }
        else if (Date.now() - start > milisecond) {
            done(null);
        }
        else {
            setTimeout(wait, 20);
        }
    }
    setTimeout(wait, 4);
}

// 根据label，设置输入框的输入内容
function labelValue(label, value, done) {
    let milisecond = 1000;
    let start = Date.now();
    function wait() {
        if (window.$night && window.$night.labelValue(label, value)) {
            done(true);
        }
        else if (Date.now() - start > milisecond) {
            done(null);
        }
        else {
            setTimeout(wait, 20);
        }
    }
    setTimeout(wait, 4);
}

function clickText(text, selector, milisecond, done) {
    let start = Date.now();
    function wait() {
        if (window.$night && window.$night.clickText(text, selector)) {
            done(true);
        }
        else if (Date.now() - start > milisecond) {
            done(null);
        }
        else {
            setTimeout(wait, 20);
        }
    }
    setTimeout(wait, 4);
}

module.exports = {
    exec,
    waitForText: 'findDomByText',
    labelValue: 'labelValue',
    clickText: 'clickText',
    names: {
        findDomByText: '等待',
        labelValue: 'label输入',
        clickText: '点击'
    }
};

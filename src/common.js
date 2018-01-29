/**
 * 脚本部分公共代码
 */
let fs = require('fs');
let config = require('./config');
let clientjs = fs.readFileSync(__dirname + '/../dist/client.js', 'utf8');

// 返回错误提示内容
function error(...argv) {
    let msg = argv[0];
    if (argv.length === 1) {
        if (msg instanceof Error) {
            return {
                message: msg.message,
                stack: msg.stack
            };
        }
        else {
            msg = msg + '';
        }
    }
    else {
        msg = argv.join('，');
    }
    return {message: msg};
}

// 默认在浏览器端执行的函数
function clientDefaultFunc(funcName, args) {
    if (!window.$night) {
        // $night is not ready.
        return null;
    }
    if (!window.$night[funcName]) {
        return window.$night.error('$night has NOT func ' + funcName);
    }
    return window.$night[funcName].apply(window.$night, args);
}

function clientFunc(browser, funcName, args, cb) {
    let func = clientDefaultFunc;
    if (typeof args === 'function') {
        cb = args;
        args = [];
    }
    let argv = [funcName, args];
    // 假如传入的要执行的函数内容是func
    if (typeof funcName === 'function') {
        func = funcName;
        argv = args;
    }
    config.log('common.clientFunc: injectjs', func, argv);
    return browser.execute(function (clientjs) {
        if (window.$night) {
            return true;
        }
        try {
            eval(clientjs);
        }
        catch (err) {
            return {
                message: err.message,
                stack: err.stack
            };
        }
        return true;
    }, [clientjs], function (result) {
        if (result.value !== true) {
            this.assert.equal(JSON.stringify(result.value), 'true', 'InjectClientJS');
        }
    })
    .pause(5)
    .execute(func, argv, function (result) {
        config.log('common.clientFunc: result', funcName, JSON.stringify(result));
        cb(result);
    });
}

module.exports = {
    error,
    clientFunc
};

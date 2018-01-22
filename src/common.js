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
                errmsg: msg.message,
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
    return {errmsg: msg};
}

function clientFunc(browser, funcName, args, cb) {
    config.log('common.clientFunc: injectjs', funcName, args);
    return browser.execute(function (clientjs) {
        if (window.$night) {
            return true;
        }
        try {
            eval(clientjs);
        }
        catch (err) {
            return {
                errmsg: err.message,
                stack: err.stack
            };
        }
        return true;
    }, [clientjs], function (result) {
        if (result.value !== true) {
            this.assert.equal(result.value, true);
        }
    })
    .execute(function (funcName, args) {
        if (!window.$night) {
            return {errmsg: '$night is NOT ready'};
        }
        if (!window.$night[funcName]) {
            return window.$night.error('$night has NOT func ' + funcName);
        }
        return window.$night[funcName].apply(window.$night, args);
    }, [funcName, args], function (result) {
        config.log('common.clientFunc: result', funcName, JSON.stringify(result));
        cb(result);
    });
}


module.exports = {
    error,
    clientFunc
};

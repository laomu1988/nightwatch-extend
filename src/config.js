/**
 * @file 测试文件总配置
 */
const debug = require('debug')('nightwatch-extend');
let isDebug = process.env.debug
    || process.argv.indexOf('--debug') >= 0
    || process.argv.indexOf('--verbose') >= 0
    || process.argv.indexOf('DEBUG') >= 0;
module.exports = {
    debug: isDebug,
    log: debug,
    cookiePath: __dirname + '/../test/cookie.json',
    names: {
        findDomByText: '等待',
        notText: '等待文字消失',
        matchUrl: '等待跳转',
        clickText: '点击'
    },
    api: {
        getSelector: 'getSelector',
        waitForText: 'findDomByText',
        clickText: 'clickText',
        waitForUrl: 'matchUrl'
    },
    timeout: 2000
};
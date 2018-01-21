/**
 * @file 自动测试启动文件， 可传递参数
 * 参考： https://github.com/vuejs/vue/blob/dev/test/e2e/runner.js
 */

var spawn = require('cross-spawn');
var args = process.argv.slice(2);
// 直接更改路径为test/pages下文件路径
if (args[0] && /^\w*$/.test(args[0])) {
    args[0] = 'test/' + args[0] + '.js';
}

if (args.indexOf('--config') === -1) {
    args = args.concat(['--config', 'nightwatch.conf.js']);
}

if (args.indexOf('--env') === -1) {
    args = args.concat(['--env', 'chrome']);
}

var runner = spawn('./node_modules/.bin/nightwatch', args, {
    stdio: 'inherit'
});

runner.on('exit', function (code) {
    process.exit(code);
});

runner.on('error', function (err) {
    throw err;
});

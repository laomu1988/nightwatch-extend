/**
 * @file 记录cookies便于下次测试使用
 * @author laomu1988@qq.com
 */
const cookies = require('../cookies.js');
cookies.readCookie();
exports.command = function () {
    let me = this;
    let host = '';
    return me
        // 读取host
        .$exec(function () {
            return location.host;
        }, function (result) {
            me.$catchResult(result);
            host = result.value;
        })
        // 设置cookies
        .$chain(function (done) {
            me.getCookies(function (result) {
                me.$catchResult(result, '记录cookie');
                cookies.recordCookies(host, result.value);
                me.$msg('[记录cookies信息]');
                done();
            });
        });
};

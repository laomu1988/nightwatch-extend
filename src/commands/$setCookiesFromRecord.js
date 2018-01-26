/**
 * @file 从记录中读取cookies并写入
 * @author laomu1988@qq.com
 */

const cookies = require('../cookies.js');

cookies.readCookie();

exports.command = function (callback) {
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
            let cookie = cookies.cookies[host];
            let hasCookie = cookie && host;
            if (hasCookie) {
                for (let attr in cookie) {
                    if (cookie[attr] && cookie[attr].name) {
                        me = me.setCookie(cookie[attr]);
                    }
                }
                me.$msg('[写入cookies信息]从之前的记录中获取的cookies');
            }
            me.$call(function () {
                if (typeof callback === 'function') {
                    callback({value: hasCookie});
                }
                done();
            });
        });
};

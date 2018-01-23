/**
 * @file 批量设置cookies
 * @author laomu1988@qq.com
 */


exports.commond = function (cookies) {
    let me = this;
    for (let attr in cookies) {
        if (cookies[attr] && cookies[attr].name) {
            me = me.setCookie(cookies[attr]);
        }
    }
    return me;
};

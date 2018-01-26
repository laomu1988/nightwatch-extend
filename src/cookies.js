/**
 * @file 读取和写入cookie
 */
const config = require('./config');
const fs = require('fs');
const cookies = {};
let filepath = config.cookiePath;
let hasRead = false;

module.exports = {
    cookies: cookies,
    // 设置cookie文件路径并读取cookie
    readCookie() {
        if (hasRead) {
            return;
        }
        try {
            hasRead = true;
            if (fs.existsSync(filepath)) {
                let json = require(filepath);
                for (let attr in json) {
                    cookies[attr] = json[attr];
                }
            }
            config.log('[read-cookies]', JSON.stringify(cookies));
        }
        catch (e) {
            console.error('readCookieError:', e);
        }
    },
    // 修改cookie内容
    recordCookies(host, values) {
        config.log('[record-cookies]', host, JSON.stringify(values));
        if (!host) {
            return console.error('setCookie need host');
        }
        let changed = false;
        let cookie = cookies[host];
        if (!cookie) {
            cookie = cookies[host] = {};
            changed = true;
        }
        if (values && values.length > 0) {
            values.forEach(v => {
                if (!cookie[v.name] || cookie[v.name].value !== v.value) {
                    changed = true;
                    cookie[v.name] = v;
                }
            });
        }
        if (changed && filepath) {
            fs.writeFile(filepath, JSON.stringify(cookies, null, 4));
        }
    }
};
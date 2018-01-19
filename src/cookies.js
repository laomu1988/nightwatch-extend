/**
 * @file 读取和写入cookie
 */
const fs = require('fs');
const cookies = {};
let filepath = '';
module.exports = {
    cookies: cookies,
    // 设置cookie文件路径并读取cookie
    readCookie(path) {
        filepath = path;
        try {
            if (fs.existsSync(filepath)) {
                let json = require(filepath);
                for (let attr in json) {
                    cookies[attr] = json[attr];
                }
            }
        }
        catch (e) {
            console.log('readCookieError:', e);
        }
    },
    // 修改cookie内容
    setCookies(values) {
        let changed = false;
        if (values && values.length > 0) {
            values.forEach(v => {
                if (!cookies[v.name] || cookies[v.name].value !== v.value) {
                    changed = true;
                    cookies[v.name] = v;
                }
            });
        }
        if (changed && filepath) {
            fs.writeFile(filepath, JSON.stringify(cookies, null, 4));
        }
    }
};

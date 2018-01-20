/**
 * @file 等待指定文本出现
 * @author muzhilong<muzhilong@baidu.com>
 */
let ext = require('../extend');
exports.command = function (urlOrReg, timeout = 2000) {
    let time = 5;
    let me = this;
    me.url(function (url) {
        console.log(url);
    });
    return me;
};

let util = require('util');
let events = require('events');

function WaitFor() {
    events.EventEmitter.call(this);
}

util.inherits(WaitFor, events.EventEmitter);

WaitFor.prototype.command = function (urlOrReg, timeout = 50, cb) {
    let me = this;
    // If we don't pass the milliseconds, the client will
    // be suspended indefinitely
    if (!urlOrReg) {
        return this;
    }
    let start = Date.now();
    let timer = 0;
    hasUrl();
    function hasUrl() {
        me.client.api.url(function (result) {
            let url = result.value;
            // console.log('url:', url);
            if (url && (typeof urlOrReg === 'string' && url.indexOf(urlOrReg) >= 0)) {
                if ((typeof urlOrReg === 'string' && url.indexOf(urlOrReg) >= 0)
                    || (urlOrReg.test && urlOrReg.test(url))) {
                    if (cb) {
                        cb.call(me.client.api, true);
                    }
                    me.emit('complete');
                    return;
                }
            }
            if (Date.now() - start > timeout) {
                if (cb) {
                    cb.call(me.client.api, false);
                }
                me.emit('complete');
            }
            else {
                timer = setTimeout(hasUrl, 10);
            }
        });
    }
    return this;
};

module.exports = WaitFor;

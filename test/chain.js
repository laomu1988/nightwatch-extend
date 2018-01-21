
module.exports = {
    chain(browser) {
        browser
            .url('https://cn.vuejs.org/')
            .$waitForText('学习')
            .$chain(
                function (next) {
                    setTimeout(() => {
                        next(1);
                    }, 100);
                }, function (result, next) {
                    browser.assert.equal(result, 1);
                    setTimeout(() => {
                        next(2, 3);
                    }, 100);
                }, function (r2, r3, next) {
                    browser.assert.equal(r2, 2);
                    browser.assert.equal(r3, 3);
                    next({obj: 'test'});
                }, function (result, next) {
                    browser.assert.equal(result.obj, 'test');
                    next();
                }, function (next) {
                    browser.assert.equal(typeof next, 'function');
                    next();
                }
            ).end();
    }
};

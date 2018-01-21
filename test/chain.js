
module.exports = {
    chain(browser) {
        browser
            .url('https://cn.vuejs.org/')
            .$waitForText('学习')
            .$chain([
                function (next) {
                    setTimeout(() => {
                        next(1);
                    }, 100);
                }, function (result, next) {
                    browser.assert.equal(result, 1);
                    setTimeout(() => {
                        next(2);
                    }, 100);
                }, function (result, next) {
                    browser.assert.equal(result, 2);
                    next({obj: 'test'});
                }], function (result) {
                    browser.assert.equal(result.value.obj, 'test');
                })
            .end();
    }
};

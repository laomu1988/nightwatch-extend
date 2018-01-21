/**
 * @file 测试等待文本出现
 * @author laomu1988
 */

module.exports = {
    test(browser) {
        browser
            .url('https://cn.vuejs.org/')
            .$waitForText('学习', 1000, function (result) {
                this.assert.equal(typeof result.ELEMENT, 'string');
            })
            .$waitForText('多语言', function (result) {
                this.assert.equal(typeof result.ELEMENT, 'string');
            })
            .$waitForText('学习')
            .end();
    }
};

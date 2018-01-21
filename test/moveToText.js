/**
 * @file 测试等待文本出现
 * @author laomu1988
 */

module.exports = {
    test(browser) {
        browser
            .url('https://cn.vuejs.org/')
            .$waitForText('学习')
            .$moveToText('学习')
            .$clickText('教程')
            .$waitForUrl('/v2/guide')
            .end();
    }
};

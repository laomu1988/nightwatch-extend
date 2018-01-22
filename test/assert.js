/**
 * @file asserts
 * @author laomu1988
 */

module.exports = {
    test(browser) {
        browser
            .url('https://cn.vuejs.org/')
            .$waitForText('学习')
            .assert.$hasText('学习')
            .assert.$notText('教程')
            .$moveToText('学习')
            .assert.$hasText('教程')
            // .pause(100000000)
            .end();
    }
};

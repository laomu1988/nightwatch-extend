/**
 * @file 测试等待文本出现
 * @author laomu1988
 */

module.exports = {
    test(browser) {
        browser
            .url('http://element.eleme.io/#/zh-CN')
            .$waitForText('指南')
            .$waitForText('确定')
            .$clickText('确定')
            .$waitForText('指南')
            .$waitForNotText('导航')
            .assert.$hasText('指南')
            .$clickText('指南')
            .$waitForNotText('网站快速成型工具')
            .assert.$notText('网站快速成型工具')
            .assert.$hasText('导航')
            .end();
    }
};

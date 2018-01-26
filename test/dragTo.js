/**
 * @file drag
 * @author laomu1988
 */

module.exports = {
    test(browser) {
        browser
            .url('http://www.w3school.com.cn/tiy/loadtext.asp?f=html5_draganddrop')
            .$waitForText('请把 W3School 的图片拖放到矩形中：')
            .$dragTo('#drag1', '#div1')
            .pause(300000)
    }
};

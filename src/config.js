/**
 * @file 测试文件总配置
 */
module.exports = {
    debug: process.env.debug || false,
    names: {
        findDomByText: '等待',
        matchUrl: '等待跳转',
        labelValue: '输入',
        clickText: '点击'
    },
    api: {
        waitForText: 'findDomByText',
        labelValue: 'labelValue',
        clickText: 'clickText',
        waitForUrl: 'matchUrl'
    },
    timeout: 2000
};

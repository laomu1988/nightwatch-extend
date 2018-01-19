/**
 * @file 自动测试配置文件
 * @author muzhilong
 * 参考：
 *      http://nightwatchjs.org/guide#settings-file
 *      https://github.com/vuejs/vue/blob/dev/test/e2e/nightwatch.config.js
 */
/* eslint-disable */
module.exports = {
    src_folders: ['cases'],
    output_folder: 'reports',

    // page_objects_path: 'test/page_objects_path',
    // custom_commands_path: ['node_modules/nightwatch-helpers/commands'],
    // custom_assertions_path: ['node_modules/nightwatch-helpers/assertions'],
    selenium: {
        start_process: true,
        server_path: require('selenium-server').path,
        log_path: 'reports/',
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': require('chromedriver').path
            // , 'webdriver.gecko.driver': require('geckodriver').path
        }
    },
    test_settings: {
        'default': {
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true,
            screenshots: {
                enabled: false,
                on_failure: true,
                on_error: true,
                path: 'reports/screenshots'
            }
        },

        'chrome': {
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        },

        'firefox': {
            desiredCapabilities: {
                browserName: 'firefox',
                javascriptEnabled: true,
                acceptSslCerts: true,
                marionette: true
            }
        },

        'phantomjs': {
            desiredCapabilities: {
                browserName: 'phantomjs',
                javascriptEnabled: true,
                acceptSslCerts: true
            }
        }
    }
};

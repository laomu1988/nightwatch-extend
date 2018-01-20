/**
 * @file 客户端脚本， 在浏览器中扩展的函数
 * 返回null或者false表示未找到元素
 * 返回error表示出错
 * @author muzhilong
 * @module
 */
// const $ = window.jQuery || require('jquery');
const client = window.$night = {};
const inputEvent = document.createEvent('UIEvents');
inputEvent.initEvent('input', true, true);
inputEvent.eventType = 'message';
// client.$ = $;

/**
 * 根据文本内容查找dom
 * @param {string} text 要查找的文本
 * @param {string} [selector] 文本所在的选择器
 * @param {string} [superSelector] 容器的选择器，默认body
 * @return {DOM} 查找到的dom节点，未找到时返回null
 */
function findDomByText(text, selector, superSelector = 'body') {
    console.log('findDomByText', text, selector);
    text = (text + '').replace(/\s/g, '');
    let root = document.querySelector(superSelector);
    if (selector) {
        let doms = root.querySelector(selector);
        let len = doms.length;
        for (let i = 0; i < len; i++) {
            let dom = doms[i];
            let inner = dom.innerText;
            if (inner && inner.replace(/\s/g, '') === text) {
                return dom;
            }
            let value = dom.getAttribute('value');
            if (value && value.replace(/\s/g, '') === text) {
                return dom;
            }
        }
        return null;
    }
    // 部分元素的value属性，例如input
    let values = document.querySelectorAll('[value]');
    for (let i = 0; i < values.length; i++) {
        let dom = values[i];
        let value = dom.getAttribute('value');
        if (value && value.replace(/\s/g, '') === text) {
            return dom;
        }
    }
    return findDomByTextAssist(text, root);
}

function findDomByTextAssist(text, dom) {
    let myText = (dom.innerText + '').replace(/\n/g, '');
    if (myText.indexOf(text) < 0) {
        return null;
    }
    if (dom.childElementCount > 0) {
        for (let i = dom.childElementCount - 1; i >= 0; i--) {
            let d = findDomByTextAssist(text, dom.children[i]);
            if (d) {
                return d;
            }
        }
    }
    else if (text === myText) {
        return dom;
    }
    return null;
}

/**
 * 根据label设置输入框的输入内容
 * @param {string} label label中文字
 * @param {string} value 输入框中要输入的文字
 * @return {DOM} 查找到的输入框, 未找到输入框时返回null
 */
function labelValue(label, value = '') {
    let dom = findDomByText(label);
    if (dom) {
        let p = dom.parentNode;
        let input = p.querySelector('input');
        if (!input) {
            input = p.parentNode.querySelector('input');
        }
        if (!input) {
            return null;
        }
        else {
            input.value = value;
            input.dispatchEvent(inputEvent);
            return input;
        }
    }
    return null;
}

function clickText(text, selector) {
    let dom = findDomByText(text, selector);
    if (dom) {
        dom.click();
        return dom;
    }
    return false;
}


function matchUrl(urlOrReg) {
    if (typeof urlOrReg === 'string' && location.href.indexOf(urlOrReg) >= 0) {
        return true;
    }
    if (urlOrReg && urlOrReg.test && urlOrReg.test(location.href)) {
        return true;
    }
    return false;
}

client.findDomByText = findDomByText;
client.labelValue = labelValue;
client.clickText = clickText;
client.matchUrl = matchUrl;

module.exports = client;

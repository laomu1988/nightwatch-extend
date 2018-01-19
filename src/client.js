/**
 * @file 客户端脚本， 在浏览器中执行的内容
 * @author muzhilong
 * @module
 */
let $ = window.jQuery || require('jquery');
let client = window.$nightClient = {};
client.$ = $;

/**
 * 根据文本内容查找dom
 * @param {string} text 要查找的文本
 * @param {string} [selector] 文本所在的选择器
 * @param {string} [superSelector] 容器的选择器，默认body
 * @return {DOM} 查找到的dom节点，未找到时返回null
 */
function findDomByText(text, selector, superSelector = 'body') {
    text = (text + '').replace(/\s/g, '');
    let root = document.querySelector(superSelector);
    if (root.innerText.replace(/\s/g, '').indexOf(text) < 0) {
        return null;
    }
    if (selector) {
        let doms = root.querySelector(selector);
        let len = doms.length;
        for (let i = 0; i < len; i++) {
            let dom = doms[i];
            if (dom.innerText.replace(/\s/g, '').indexOf(text) > 0) {
                return dom;
            }
        }
        return null;
    }
    return findDomByTextAssist(text, root);
}

function findDomByTextAssist(text, dom) {
    if (dom.innerText.replace(/\n/g, '').indexOf(text) < 0) {
        return null;
    }
    if (dom.childElementCount > 0) {
        for (let i = dom.childElementCount - 1; i >= 0; i--) {
            let d = findDomByTextAssist(text, dom.children[i]);
            if (d) {
                return d;
            }
        }
        return null;
    }
    else {
        return dom;
    }
}

client.findDomByText = findDomByText;

module.exports = client;

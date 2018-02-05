/**
 * @file 客户端脚本， 在浏览器中扩展的函数
 * 返回null或者false表示未找到元素
 * 返回error表示出错
 * @author muzhilong
 * @module
 */
const $ = window.jQuery || require('jquery');
const client = window.$night = {};
const inputEvent = document.createEvent('UIEvents');
inputEvent.initEvent('input', true, true);
inputEvent.eventType = 'message';
client.$ = $;

// 返回错误提示内容
function error(...argv) {
    let msg = argv[0];
    if (argv.length === 1) {
        if (msg instanceof Error) {
            return {
                message: msg.message,
                where: 'client.js',
                stack: msg.stack
            };
        } else {
            msg = msg + '';
        }
    }
    else {
        msg = argv.join('，');
    }
    return {message: msg};
}

/**
 * 根据文本内容查找dom
 * @param {string} text 要查找的文本
 * @param {string} [selector] 文本所在的选择器
 * @param {string|DOM} [superSelector] 容器的选择器，默认body
 * @return {DOM} 查找到的dom节点，未找到时返回null
 */
function findDomByText(text, selector, superSelector = 'body') {
    if (!text || typeof text !== 'string') {
        return error('findDomByText(text) need text as string');
    }
    console.log('findDomByText', text, selector);
    text = (text + '').replace(/\s/g, '');
    let root = superSelector.querySelector ? superSelector : document.querySelector(superSelector);
    if (selector) {
        let doms = root.querySelectorAll(selector);
        let len = doms.length;
        for (let i = len - 1; i >= 0; i--) { // 从后向前查找，避免后面覆盖前面时查找到的是前面内容
            let dom = doms[i];
            let inner = dom.innerText;
            if (inner && inner.replace(/\s/g, '') === text) {
                return dom;
            }
            // input元素的当前输入值
            let value = dom.getAttribute('value') || dom.value;
            if (value && value.replace(/\s/g, '') === text) {
                return dom;
            }

            value = dom.getAttribute('placeholder');
            if (value && value.replace(/\s/g, '') === text) {
                return dom;
            }
        }
        return null;
    }
    // input元素的当前输入值
    let values = document.querySelectorAll('input');
    for (let i = 0; i < values.length; i++) {
        let dom = values[i];
        let value = dom.getAttribute('value') || dom.value;
        if (value && value.replace(/\s/g, '') === text) {
            return dom;
        }
    }

    // 查询input元素的placeholder
    values = document.querySelectorAll('[placeholder]');
    for (let i = 0; i < values.length; i++) {
        let dom = values[i];
        let value = dom.getAttribute('placeholder');
        if (value && value.replace(/\s/g, '') === text) {
            return dom;
        }
    }
    return findDomByTextAssist(text, root);
}


function findDomByTextAssist(text, dom) {
    let myText = ((dom.innerText || dom.data) + '').replace(/\s/g, '');
    if (myText.indexOf(text) < 0) {
        return null;
    }
    if (dom.TEXT_NODE > 0 || dom.childElementCount > 0) {
        // 从后向前查找，避免后面覆盖前面时查找到的是前面内容
        let node = dom.lastChild;
        while (node) {
            let d = findDomByTextAssist(text, node);
            if (d) {
                return d.tagName ? d : node;
            }
            node = node.previousSibling;
        }
    }
    if (text === myText) {
        return dom;
    }
    return null;
}

function notText(text) {
    let dom = findDomByText(text);
    if (dom && (dom.style.display !== 'none' && dom.style.opacity !== '0')) {
        return null;
    }
    return true;
}

/**
 * 根据label查找输入框
 * @param {string} label label中文字
 * @return {DOM} 查找到的输入框, 未找到输入框时返回null
 */
function labelInput(label) {
    console.log('labelInput:', label);
    let dom = findDomByText(label);
    if (dom && dom.querySelector) {
        let p = dom;
        let input = p.querySelector('input');
        if (!input && p.parentNode) {
            p = p.parentNode;
            input = p.querySelector('input');
        }
        if (!input && p.parentNode) {
            p = p.parentNode;
            input = p.querySelector('input');
        }
        if (!input) {
            return null;
        }
        else {
            return input;
        }
    }
    return null;
}

/**
 * 根据label查找输入框
 * @param {string} label label中文字
 * @return {string} 查找到的输入框的选择器, 未找到输入框时返回null
 */
function labelInputSelector(label, ) {
    console.log('labelInputSelector:', label);
    let dom = labelInput(label);
    if (dom) {
        return domSelector(dom);
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

let selectorCount = 0;
function getSelector(text) {
    console.log('getSelector:', text);
    let len = arguments.length;
    let dom;
    if (len === 2) {
        dom = closest(text, arguments[1]);
    }
    else {
        try {
            dom = document.querySelector(text);
        }
        catch (err) {
        }
        if (!dom) {
            dom = findDomByText(text);
        }
    }

    if (dom) {
        return domSelector(dom);
    }
    return null;
}

function domSelector(dom) {
    let id = dom.getAttribute('night-random-id');
    if (!id) {
        selectorCount += 1;
        id = (selectorCount + '_' + Math.random()).replace('.', '').slice(0, 9);
        dom.setAttribute('night-random-id', id);
    }
    return dom.tagName + `[night-random-id="${id}"]`;
}

function matchUrl(urlOrReg) {
    console.log('matchUrl:', urlOrReg);
    if (typeof urlOrReg === 'string' && location.href.indexOf(urlOrReg) >= 0) {
        return true;
    }
    if (urlOrReg && urlOrReg.test && urlOrReg.test(location.href)) {
        return true;
    }
    return false;
}

// 查找最近的其他文本节点
function closest(startText, targetText) {
    let dom = null;
    try {
        dom = document.querySelector(startText);
    }
    catch (err) {
        console.error('try querySelector:', startText);
    }
    if (!dom) {
        dom = findDomByText(startText);
    }
    if (!dom) {
        return null;
    }

    targetText = (targetText + '').replace(/\s/g, '');
    let bodyText = document.body.innerText.replace(/\s/g, '');
    if (bodyText.indexOf(targetText) < 0) {
        return null;
    }

    while (dom && dom.tagName && dom.tagName !== 'HTML') {
        let target = findDomByText(targetText, '', dom);
        if (target) {
            return target;
        }
        dom = dom.parentElement;
    }
    return null;
}


function catchError(func) {
    return function (...argv) {
        try {
            return func.apply(window.$night, argv);
        }
        catch (err) {
            console.error(err);
            return error(err);
        }
    };
}

client.inputEvent = inputEvent;
client.findDomByText = catchError(findDomByText);
client.labelInput = catchError(labelInput);
client.labelInputSelector = catchError(labelInputSelector);
client.clickText = catchError(clickText);
client.matchUrl = catchError(matchUrl);
client.getSelector = catchError(getSelector);
client.error = error;
client.notText = catchError(notText);
client.domSelector = catchError(domSelector);

module.exports = client;

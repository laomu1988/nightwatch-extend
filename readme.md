# nightwatch测试扩展函数
  提供[nightwatch](http://nightwatchjs.org/gettingstarted)部分扩展函数

## 安装
```
npm install nightwatch-extend --save-dev
```

## 使用
在 Nightwatch 配置文件中增加:
```
{
  "custom_commands_path": ["node_modules/nightwatch-helpers/commands"],
  "custom_assertions_path": ["node_modules/nightwatch-helpers/assertions"]
}
```

## 包含内容
### Assertions
* $hasText(text) 存在文本内容为text的节点（文本会过滤空格，避免空格影响判断）
* $notText(text) 不存在文本内容为text的节点（文本会过滤空格，避免空格影响判断）

### Commands
* $msg(msg) 展示消息
* $chain(func1, func2, func3...) 链式操作，每个函数最后一个参数为next，执行next(arg1, arg2...)即可将参数传入下一个函数
* $waitForText(text, [timeout = 10000], [cb]) 等待展示文本节点
* $waitForNotText(text, [timeout = 10000], [cb]) 等待文本消失
* $hasText(text, cb) 判断是否存在text节点，存在则回调函数result的value为true
* $waitForUrl(urlOrReg, [timeout = 10000], [cb]) 等待跳转到指定链接
* $clickText(innerText, cb) 点击根据文本找到到的dom节点
* $labelValue(labelText, inputValue) 根据label查找输入框并设置值
* $moveToText(text, cb) 移动鼠标到text节点
* $call(func) 执行func, 非异步


## nightwatch环境依赖
* node 版本6.0及以上
* java 版本1.8及以上（使用命令行java -version检查版本，，低于1.8请更新jdk）
* chrome 版本59及以上

## 开发注意问题
* 客户端函数的error对象不能被序列化，所以错误不能作为执行结果返回
* 客户端返回的dom节点，到执行脚本时只会保留一个Element，结构{ELEMENT: '....'}
* 带有延迟触发complete事件时，务必保证先返回this对象
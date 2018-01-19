# nightwatch测试扩展函数
  封装[nightwatch](http://nightwatchjs.org/gettingstarted)部分函数

## 功能
- [ ] 客户端引入jquery等扩展函数
- [ ] 根据文字查找dom，然后触发点击等动作
- [ ] 根据文字查找最近输入框输入内容
- [ ] 自动延迟，当第一次未查找到指定节点时，间隔50ms查询一次，最多等待5秒钟
- [ ] 查找dom或内容时，避免加载中弹窗，当有dialog展示时，仅查询dialog中内容
- [ ] 根据内容查找节点时，过滤掉隐藏节点
- [ ] 封装拖拽动作
- [ ] 修改debug模式等配置

## 函数列表
* $waitForText(innerText, timeout) 等待展示文本节点
* $clickText(innerText, timeout) 根据文本内容
* $labelValue(labelText, inputValue) 根据label查找输入框并设置值

## nightwatch环境依赖
* node 版本6.0及以上
* java 版本1.8及以上（使用命令行java -version检查版本，，低于1.8请更新jdk）
* chrome 版本59及以上
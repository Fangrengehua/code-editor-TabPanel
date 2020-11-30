# tab-code-editor安装和使用

## Installation 
 `npm install tab-code-editor`

## 配置和API

>**必须配置项：**

1. **tabs: 导航栏标签(tab)对象数组**
    
    tab对象：

    属性|类型|备注
    -|-|-|
    id|string or number|标签唯一标识(用户指定)
    name|string|标签名(用户指定)
    value|string|code-editor初始值(用户指定)
    

    示例:

        const tabs = [
        {
            id: 1,
            name: "index.js",
            value: 'index.js content'
        },{
            id: 2,
            name: "App.css",
            value: 'App.css content'
        }]
     
        
>(可选项) **configure: 相关事件配置**

    - title: (object)
    
        - show_title: (bool)鼠标悬浮在导航栏标签上时，是否显示title
        - content:(string)要显示的title内容
    
    - 点击导航栏标签   
    
        tabClick:(tab)=>{}

            参数说明：
            - tab: (tab)点击的导航栏标签数据
            
            返回值：promise
            

    - 关闭导航栏标签
    
        tabClose: (tab,active_tab)=>{}
        
            参数说明：
            - tab: (tab)关闭的导航栏标签数据
            - active_tab: (tab)下一个激活的tab。若关闭的tab为当前唯一存在的tab，则active_tab=null
            
            返回值：promise (可以通过resolve(nextTabId)指定下一个需要激活的tab id.默认激活当前tab,若关闭的是当前tab,则激活前一个tab)

## Using

> **webpack配置**

由于本组件依赖于monaco-editor，而monaco-editor的实现采用worker的方式，为了能够正常引用其中内置的语言及控件来实现代码高亮、自动补全以及错误提示等功能，使用前请先进行webpack配置：

1. 安装monaco-editor-webpack-plugin：

    `npm install monaco-editor-webpack-plugin`

2. 将 monaco-editor-webpack-plugin 引入进你的 webpack.config.js:

    ```
    const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
    module.exports = {
    plugins: [
        ...
        new MonacoWebpackPlugin({
        languages: ['json']
        }),
        ...
    ]};
    ```
    

> **获取组件实例对象**

    
在本组件上指定属性onRef

    <TabsControl onRef={(ref) => {this.tab_control = ref;}}/>
    
之后可以通过 this.tab_control 调用本组件内的方法：

    - this.tab_control.openInTab(tab)
            
        参数说明：(tab)要打开/激活的tab
        无返回值

    - this.tab_control.tabClose(tab)
            
        参数说明：(tab)要关闭的tab
        无返回值

    - this.tab_control.tabReset(tab)

        参数说明：(tab)要重置的tab
        无返回值

    - this.tab_control.getValue()

        返回值：value 当前打开的编辑器的内容(string)


## example
```js
import React from 'react'
import TabsControl from 'file-code-editor'

export default class App extends React.PureComponent{
    constructor(props) {
      super(props);
      this.state = {
        tabs:[],
        count:0
      }
    }
    onRef = (ref) => {
      this.tab_control = ref;
    }
    componentDidMount() {
      const _this = this;
      document.onkeydown = function () {
        var oEvent = window.event;
        if (oEvent.keyCode === 83 && oEvent.ctrlKey) {  
          let cur_code = _this.tab_control.getValue();
          console.log("你按下了ctrl+s", cur_code);
          oEvent.preventDefault();
        }
      }  
    }
    tab_configure = {
      title: {
        show_title: true,
        content:'fsd'
      },
      tabClick:(tab) =>{
        console.log("tabClick", tab)
        return new Promise((resolve, reject) => {
          if (1 < 2) {
            resolve()
          } else {
            reject("保存失败！")
          }
        })
      },
      tabClose: (tab) => {
        console.log("tabClose", tab)
        return new Promise((resolve, reject) => {
          if (1 < 2) {
            resolve(2) //激活id为2的tab
          } else {
            reject("保存失败！")
          }
        })
      }
    }
    
    genTab() {
      this.setState({count:this.state.count+1})
      var tab = {
        id: this.state.count,
        name: "file" + this.state.count+".js",
        value: "file" + this.state.count
      }
      var tabs = [...this.state.tabs]
      tabs.push(tab)
      this.setState({ tabs: tabs })
      
      this.tab_control.openInTab(tab)
    }
    changeTab() {
      var tabs = this.state.tabs
      var tab = {
        id: this.state.count,
        name: "file" + this.state.count,
        value: "file" + this.state.count
      }
      this.tab_control.openInTab(tabs[1])
    }
    closeTab() {
      var tabs = this.state.tabs
      this.tab_control.tabClose && this.tab_control.tabClose(tabs[0])
    }
    

    render() {
      return (
        <div className="App">
          <TabsControl
            tabs={this.state.tabs}
            onRef={this.onRef}
            configure={this.tab_configure}
          />
          <div>
            <button
              onClick={
                () => { this.genTab(); }
            }>genTab</button>
            <button
              onClick={
                () => { this.changeTab() }
              }>changeTab</button>
            <button
              onClick={
                () => { this.closeTab() }
              }>closeTab</button>
          </div>
          
        </div>
      );
  }
}
```

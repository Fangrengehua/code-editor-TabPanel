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
     
        
2. **configure: 相关事件配置**

    - title: {
        show_title: (bool)鼠标悬浮在导航栏标签上时，是否显示title,
        content:(string)要显示的title内容
    }

    - *导航栏标签* 点击事件
    
        tabClick:(tab)=>{}
    
            参数说明：
            - tab: (tab)点击的导航栏标签数据
            
            返回值：promise
            

    - *导航栏标签关闭* 点击事件
    
        tabClose: (tab,active_tab)=>{}
        
            参数说明：
            - tab: (tab)关闭的导航栏标签数据
            - active_tab: (tab)关闭后激活的导航栏标签数据，若关闭的标签为导航栏中的唯一存在的标签，则active_tab=null(即不存在下一个激活标签)
            
            返回值：promise


> **获取组件实例对象：this.onRef**

在调用本组件的组件内部定义onRef

    onRef = (ref) => {
      this.tab_control = ref;
    }
    
在本组件上指定属性onRef

    <TabsControl onRef={this.onRef}/>
    
之后可以通过 this.onRef 调用本组件内的方法：

    - this.onRef.openInTab(tab)
            
        参数说明：(tab)要打开/激活的tab
        无返回值

    - this.onRef.tabClose(tab)
            
        参数说明：(tab)要关闭的tab
        无返回值

    - this.onRef.getValue()

        返回值：(string)当前打开的编辑器的value


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
      tabClose: (tab,active_tab) => {
        console.log("tabClose", tab,active_tab)
        return new Promise((resolve, reject) => {
          if (1 < 2) {
            resolve()
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

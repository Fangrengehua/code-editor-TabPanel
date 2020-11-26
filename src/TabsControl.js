import React from 'react'
import CodeEditor from './MonacoEditor'
import closeBT from '../src/css/closeBT.png'
import '../src/css/tab.css'

export default class TabsControl extends React.PureComponent {
    constructor(props) {
        super(props);
        this.monaco = React.createRef();
        this.state = {
            currentTabId: -1,
            tabs: props.tabs
        }
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this)
    }
    check_tittle_index(tabId) {
        return tabId === this.state.currentTabId ? "Tab_tittle active" : "Tab_tittle";
    }
    check_item_index(tabId) {
        return tabId === this.state.currentTabId ? 'Tab_item show' : 'Tab_item';
    }
    openInTab(tab) {
        var tabs = this.state.tabs;
        if (tabs.indexOf(tab) !== -1) { //已经在tabs打开
            this.setState({
                currentTabId: tab.id
            })
            return;
        }
        //还没在tabs中打开
        tabs.push(tab);
        this.setState({
            tabs: tabs,
            currentTabId: tab.id
        })
    }
    tabClick(ele) {
        this.setState({ currentTabId: ele.id })
        if (this.props.configure) {
            this.props.configure.tabClick && this.props.configure.tabClick(ele).then(null, reason => { console.log(reason) });
        }
    }
    tabClose(tab) { //移除tab是否需要把对应的在files中的文件也从内存中移除
        let tabs = [...this.state.tabs];
        const removeIndex = tabs.indexOf(tab);
        var currentTabId = this.state.currentTabId;
        //var active_tab;
        tabs.splice(removeIndex, 1)
        if (tab.id === currentTabId) {
            if (removeIndex === tabs.length && tabs.length !== 0) { //最后一个且删除后的数组不为空
                var nextIndex = removeIndex - 1;
                currentTabId = tabs[nextIndex].id;
            }
            else if (removeIndex === 0) {//第一个
                if (tabs.length === 0) {  //删除后数组为空
                    currentTabId = -1;
                    //active_tab = null;
                }
                else { //删除后数组不为空
                    currentTabId = tabs[removeIndex].id;
                }
            }
            else {
                currentTabId = tabs[removeIndex].id;
            }
        }
        else { //不是当前tab,currentTabId不变
            currentTabId = this.state.currentTabId;
        }
        // tabs.forEach(tab => {
        //     if (tab.id === currentTabId) {
        //         active_tab = tab;
        //     }
        // });
        if (this.props.configure) {
            this.props.configure.tabClose && this.props.configure.tabClose(tab).then((value) => {
                this.setState({
                    tabs: tabs,
                    currentTabId: value ? value : currentTabId
                })
            }, () => {
                this.setState({
                    tabs: tabs,
                    currentTabId: currentTabId
                })
            })
            return;
        }
        this.setState({
            tabs: tabs,
            currentTabId: currentTabId
        })


    }
    getValue() {
        var value = this.monaco.current.editor.getValue()
        return value;
    }
    makeIcoClass(filename) {
        const consts = {
            IMAGE: ["jpeg", "jpg", "png", "bmp", "gif"],
            VIDEO: ["mp4", "mov", "avi", "mpeg", "mpg", "asf", "qt"],
            AUDIO: ["mp3", "wav", "midi", "aiff", "flac"],
            TXT: ["text", "txt"],
            TS: ["ts", 'tsx']
        }
        var type;
        var icoCss = "";
        //得到文件类型
        var FileType = filename.split('.');
        //文件图标，在css中定义其位置，图标使用node.icon属性定义其路径（makeNodeIcoStyle）
        if (FileType.length > 1) { //有后缀名文件
            type = FileType.pop().toLowerCase();
            if (consts.IMAGE.indexOf(type) > -1) { //image
                icoCss = "image";
            } else if (consts.VIDEO.indexOf(type) > -1) { //video
                icoCss = "video";
            } else if (consts.AUDIO.indexOf(type) > -1) { //audio
                icoCss = "audio";
            } else if (consts.TXT.indexOf(type) > -1) { //audio
                icoCss = "text";
            } else if (consts.TS.indexOf(type) > -1) { //typescript
                icoCss = "ts";
            } else { //其他                       
                icoCss = type;
            }
        } else { //无后缀名文件
            type = FileType.shift();
            if (type.toLowerCase() === "license") {
                icoCss = "license";
            }
            else { icoCss = "docu"; }
        }
        return icoCss;
    }
    setLanguage(name) {
        var fileType = name.split('.');
        var type = fileType.pop().toLowerCase();
        var language = "javascript";
        switch (type) {
            case 'js': language = "javascript"; break;
            case 'html': language = "html"; break;
            case 'css': language = "css"; break;
            case 'json': language = "json"; break;
            case 'ts' || 'tsx': language = "typescript"; break;
            default: language = "javascript";
        }
        return language;
    }

    render() {
        const { tabs } = this.state;
        const { configure } = this.props;
        var tab_title = null;
        return (
            <div className="tabsControl">
                {/*动态生成Tab导航*/}
                <ul className="Tab_tittle_wrap">
                    {tabs.map((ele) => {
                        const id = "title_" + ele.id
                        if (configure) {
                            tab_title = configure.title ?
                                (configure.title.show_title ?
                                    (configure.title.content ? configure.title.content : ele.name)
                                    : null)
                                : null
                        }
                        return (
                            <li id={id} className={this.check_tittle_index(ele.id)} key={ele.id} title={tab_title}>
                                <div>
                                    <span className={this.makeIcoClass(ele.name)} onClick={() => {
                                        this.tabClick(ele);
                                    }} >{ele.name}</span>
                                    <img src={closeBT} alt='close' title='close' className='closeBT' onClick={() => {
                                        //console.log("要删除的tab.id是：" + ele.id)
                                        this.tabClose(ele);
                                    }} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {/*Tab内容区域*/}
                <div className="Tab_item_wrap" >
                    {tabs.map((ele) => {
                        const id = "item_" + ele.id
                        return (
                            <div id={id} key={ele.id} className={this.check_item_index(ele.id)}>
                                <CodeEditor
                                    ref={this.monaco}
                                    language={this.setLanguage(ele.name)}
                                    theme={this.props.theme ? this.props.theme : "vs-dark"}
                                    value={ele.value}
                                    className={ele.name}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}


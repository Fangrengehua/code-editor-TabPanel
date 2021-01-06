import React from 'react'
import CodeEditor from './MonacoEditor'
import * as monaco from 'monaco-editor';
import closeBT from './css/closeBT.png'
import './css/tab.css'

// export default class TabsControl extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.monaco = React.createRef();
//         this.state = {
//             currentTabId: -1,
//             tabs: props.tabs
//         }
//         this.modelCount = 1;
//         this.tabReset.bind(this);
//         this.tabClose.bind(this);
//         this.openInTab.bind(this);
//         this.getValue.bind(this);
//         this.readFile.bind(this);
//         this.layout.bind(this);
//         this.setLanguage.bind(this);
//         this.setEditorLanguage.bind(this)
//     }

//     componentDidMount() {
//         this.props.onRef && this.props.onRef(this)
//     }
//     checkTittleIndex(tabId) {
//         return tabId === this.state.currentTabId ? "Tab_tittle active" : "Tab_tittle";
//     }
//     checkItemIndex(tabId) {
//         return tabId === this.state.currentTabId ? 'Tab_item show' : 'Tab_item';
//     }
//     layout() {
//         this.monaco.current.editor.layout()
//     }

//     setEditorLanguage(i, language) {
//         if(!this.monaco.current){return}
//         var model = monaco.editor.getModel(this.state.tabs[i].uri)
//         monaco.editor.setModelLanguage(model, language)
//     }
//     openInTab(tab) {
//         var tabs = this.state.tabs;
//         for (let i = 0; i < tabs.length; i++) { //已经在tabs中打开
//             if (tabs[i].id === tab.id) {
//                 this.setState({
//                     currentTabId: tab.id
//                 })
//                 return;
//             }
//         }
//         //还没在tabs中打开
//         tab.uri = "inmemory://model/" + this.modelCount
//         this.modelCount++;
//         this.readFile(tab.filepath)
//         tabs.push(tab);
//         this.setState({
//             tabs: tabs,
//             currentTabId: tab.id
//         })
//     }
//     tabClick(ele) {
//         this.setState({ currentTabId: ele.id })
//         if (this.props.configure) {
//             this.props.configure.tabClick && this.props.configure.tabClick(ele).then(null, reason => { console.log(reason) });
//         }
//     }
//     readFile(filepath) {
//         let promise = this.props.readFile(filepath);
//         promise.then(
//             result => {
//                 if (this.monaco.current) {
//                     this.monaco.current.editor.setValue(result)
//                 }
//             },
//             reason => {
//                 console.log(reason)
//             }
//         )
//     }
//     tabClose(tab) {
//         let tabs = [...this.state.tabs];
//         const removeIndex = tabs.indexOf(tab);
//         var currentTabId = this.state.currentTabId;
//         var active_tab;
//         tabs.splice(removeIndex, 1)
//         if (tab.id === currentTabId) {
//             if (removeIndex === tabs.length && tabs.length !== 0) { //最后一个且删除后的数组不为空
//                 let nextIndex = removeIndex - 1;
//                 currentTabId = tabs[nextIndex].id;
//             }
//             else if (removeIndex === 0) {//第一个
//                 if (tabs.length === 0) {  //删除后数组为空
//                     currentTabId = -1;
//                     active_tab = null;
//                 } else { //删除后数组不为空
//                     currentTabId = tabs[removeIndex].id;
//                 }
//             }
//             else {
//                 currentTabId = tabs[removeIndex].id;
//             }
//         }
//         tabs.forEach(tab => {
//             if (tab.id === currentTabId) {
//                 active_tab = tab;
//             }
//         });
//         if (this.props.configure) {
//             this.props.configure.tabClose && this.props.configure.tabClose(tab, active_tab).then((value) => {
//                 this.setState({
//                     tabs: tabs,
//                     currentTabId: value ? value : currentTabId
//                 })
//             }, () => {
//                 this.setState({
//                     tabs: tabs,
//                     currentTabId: currentTabId
//                 })
//             })
//             return;
//         }
//         this.setState({
//             tabs: tabs,
//             currentTabId: currentTabId
//         })
//     }
//     //tabReset(tab) {
//         // var tabs = [...this.state.tabs];
//         // var isInTabs = false;
//         // tabs.map((ele) => {
//         //     if (ele.id === tab.id) {
//         //         ele = tab;
//         //         isInTabs = true;
//         //     }
//         // })
//         // if (isInTabs) { //如果重命名的文件在tabs中已打开，就更新tab名字
//         //     this.setState({
//         //         tabs: tabs,
//         //     });
//         // } else { return; }
//         // //如果重命名文件不在内存也不在tabs中，就只需要更新节点路径
//         // //数据库中更改文件路径
//         tabReset(newname, index) {
//             var tabs = [...this.state.tabs];
//             tabs[index].name = newname;
//             var pathArray = tabs[index].filepath.split('/')
//             pathArray.pop()
//             pathArray.push(newname)
//             tabs[index].filepath = pathArray.join('/')
//             var language = this.setLanguage(newname)
//             this.setEditorLanguage(index, language)

//             this.setState({
//                 tabs: tabs,
//             });
//         }

//     //}
//     getValue() {
//         var value = this.monaco.current.editor.getValue()
//         return value;
//     }
//     makeIcoClass(filename) {
//         const consts = {
//             IMAGE: ["jpeg", "jpg", "png", "bmp", "gif"],
//             VIDEO: ["mp4", "mov", "avi", "mpeg", "mpg", "asf", "qt"],
//             AUDIO: ["mp3", "wav", "midi", "aiff", "flac"],
//             TXT: ["text", "txt"],
//             TS: ["ts", 'tsx']
//         }
//         var type;
//         var icoCss = "";
//         //得到文件类型
//         var FileType = filename.split('.');
//         //文件图标，在css中定义其位置，图标使用node.icon属性定义其路径（makeNodeIcoStyle）
//         if (FileType.length > 1) { //有后缀名文件
//             type = FileType.pop().toLowerCase();
//             if (consts.IMAGE.indexOf(type) > -1) { //image
//                 icoCss = "image";
//             } else if (consts.VIDEO.indexOf(type) > -1) { //video
//                 icoCss = "video";
//             } else if (consts.AUDIO.indexOf(type) > -1) { //audio
//                 icoCss = "audio";
//             } else if (consts.TXT.indexOf(type) > -1) { //audio
//                 icoCss = "text";
//             } else if (consts.TS.indexOf(type) > -1) { //typescript
//                 icoCss = "ts";
//             } else { //其他                       
//                 icoCss = type;
//             }
//         } else { //无后缀名文件
//             type = FileType.shift();
//             if (type.toLowerCase() === "license") {
//                 icoCss = "license";
//             }
//             else { icoCss = "docu"; }
//         }
//         return icoCss;
//     }
//     setLanguage(name) {
//         var fileType = name.split('.');
//         var type = fileType.pop().toLowerCase();
//         var language = "javascript";
//         switch (type) {
//             case 'js': language = "javascript"; break;
//             case 'html': language = "html"; break;
//             case 'css': language = "css"; break;
//             case 'json': language = "json"; break;
//             case 'ts' || 'tsx': language = "typescript"; break;
//             default: language = "javascript";
//         }
//         return language;
//     }

//     render() {
//         const { tabs } = this.state;
//         const { configure } = this.props;
//         var tab_title = null;
//         return (
//             <div className="tabsControl">
//                 {/*动态生成Tab导航*/}
//                 <ul className="Tab_tittle_wrap">
//                     {tabs.map((ele) => {
//                         const id = "title_" + ele.id
//                         if (configure) {
//                             tab_title = configure.title ?
//                                 (configure.title.show_title ?
//                                     (configure.title.content ? configure.title.content : ele.filepath)
//                                     : null)
//                                 : null
//                         }
//                         return (
//                             <li id={id} className={this.checkTittleIndex(ele.id)} key={ele.id} title={tab_title}>
//                                 <div>
//                                     <span className={this.makeIcoClass(ele.name)} onClick={() => {
//                                         this.tabClick(ele);
//                                     }} >{ele.name}</span>
//                                     <img src={closeBT} alt='close' title='close' className='closeBT' onClick={() => {
//                                         this.tabClose(ele);
//                                     }} />
//                                 </div>
//                             </li>
//                         );
//                     })}
//                 </ul>
//                 {/*Tab内容区域*/}
//                 <div className="Tab_item_wrap" >
//                     {tabs.map((ele) => {
//                         // const id = "item_" + ele.id
//                         return (
//                             <CodeEditor
//                                 key={ele.id}
//                                 ref={this.monaco}
//                                 language={this.setLanguage(ele.name)}
//                                 theme={this.props.theme ? this.props.theme : "vs-dark"}
//                                 className={this.checkItemIndex(ele.id)}
//                             />
//                         )
//                     })}
//                 </div>
//             </div>
//         )
//     }
// }
export default class TabsControl extends React.PureComponent {
    constructor(props) {
        super(props);
        this.monaco = React.createRef();
        this.state = {
            currentTabId: -1,
            tabs: props.tabs
        }
        this.modelCount = 1;
        this.tabReset.bind(this);
        this.tabClose.bind(this);
        this.openInTab.bind(this);
        this.getValue.bind(this);
        this.readFile.bind(this);
        this.layout.bind(this);
        this.setLanguage.bind(this);
        this.setEditorLanguage.bind(this)
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this)
    }
    checkTittleIndex(tabId) {
        return tabId === this.state.currentTabId ? "Tab_tittle active" : "Tab_tittle";
    }
    checkItemIndex(tabId) {
        return tabId === this.state.currentTabId ? 'Tab_item show' : 'Tab_item';
    }
    openInTab(tab) {
        var tabs = this.state.tabs;

        for (let i = 0; i < tabs.length; i++) { //已经在tabs中打开
            if (tabs[i].id === tab.id) {
                this.setState({
                    currentTabId: tab.id
                })
                return tabs;
            }
        }
        //还没在tabs中打开
        this.readFile(tab.filepath)
        tab.uri = "inmemory://model/" + this.modelCount
        this.modelCount++;
        tabs.push(tab);
        this.setState({
            tabs: tabs,
            currentTabId: tab.id
        })
        return tabs;
    }
    tabClick(ele) {
        this.setState({ currentTabId: ele.id })
        if (this.props.configure) {
            this.props.configure.tabClick && this.props.configure.tabClick(ele).then(null, reason => { console.log(reason) });
        }
    }
    layout() {
        this.monaco.current.editor.layout()
    }
    setEditorLanguage(uri, language) {
        // if (!this.monaco.current) { return }
        var model = monaco.editor.getModel(uri)
        monaco.editor.setModelLanguage(model, language)
        //console.log(this.state.tabs[i].uri)
    }
    readFile(filepath) {
        let promise = this.props.readFile(filepath);
        promise.then(
            result => {
                this.monaco.current.editor.setValue(result)
            },
            reason => {
                console.log(reason)
            }
        )
    }
    tabClose(tab) {
        let tabs = [...this.state.tabs];
        const removeIndex = tabs.indexOf(tab);
        var currentTabId = this.state.currentTabId;
        var active_tab;
        tabs.splice(removeIndex, 1)
        if (tab.id === currentTabId) {
            if (removeIndex === tabs.length && tabs.length !== 0) { //最后一个且删除后的数组不为空
                let nextIndex = removeIndex - 1;
                currentTabId = tabs[nextIndex].id;
            }
            else if (removeIndex === 0) {//第一个
                if (tabs.length === 0) {  //删除后数组为空
                    currentTabId = -1;
                    active_tab = null;
                } else { //删除后数组不为空
                    currentTabId = tabs[removeIndex].id;
                }
            }
            else {
                currentTabId = tabs[removeIndex].id;
            }
        }
        tabs.forEach(tab => {
            if (tab.id === currentTabId) {
                active_tab = tab;
            }
        });
        if (this.props.configure) {
            this.props.configure.tabClose && this.props.configure.tabClose(tab, active_tab).then((value) => {
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
            return tabs;
        }
        this.setState({
            tabs: tabs,
            currentTabId: currentTabId
        })
        return tabs;
    }
    tabReset(tab) {
        var tabs = [...this.state.tabs];
        var isInTabs = false;
        var uri = null
        tabs.map((ele) => {
            if (ele.id === tab.id) {
                ele.name = tab.name;
                ele.filepath = tab.filepath;
                uri = ele.uri
                isInTabs = true;
            }
        })
        if (isInTabs) { //如果重命名的文件在tabs中已打开，就更新tab名字
            var language = this.setLanguage(tab.name)
            this.setEditorLanguage(uri, language)
            this.setState({
                tabs: tabs,
            });
            return tabs;
        } else { return tabs }
        // 如果重命名文件不在内存也不在tabs中，就只需要更新节点路径
        // 数据库中更改文件路径
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
        console.log("setLanguage:" + language)
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
                                    (configure.title.content ? configure.title.content : ele.filepath)
                                    : null)
                                : null
                        }
                        return (
                            <li id={id} className={this.checkTittleIndex(ele.id)} key={ele.id} title={tab_title}>
                                <div>
                                    <span className={this.makeIcoClass(ele.name)} onClick={() => {
                                        this.tabClick(ele);
                                    }} >{ele.name}</span>
                                    <img src={closeBT} alt='close' title='close' className='closeBT' onClick={() => {
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
                        return (
                            // <div key={ele.id} className={this.checkItemIndex(ele.id)}>
                            <CodeEditor
                                key={ele.id}
                                ref={this.monaco}
                                language={this.setLanguage(ele.name)}
                                theme={this.props.theme ? this.props.theme : "vs-dark"}
                                className={this.checkItemIndex(ele.id)}
                            />
                            //</div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

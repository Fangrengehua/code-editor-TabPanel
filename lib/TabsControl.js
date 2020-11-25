'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MonacoEditor = require('./MonacoEditor');

var _MonacoEditor2 = _interopRequireDefault(_MonacoEditor);

var _closeBT = require('../src/css/closeBT.png');

var _closeBT2 = _interopRequireDefault(_closeBT);

require('../src/css/tab.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabsControl = function (_React$PureComponent) {
    _inherits(TabsControl, _React$PureComponent);

    function TabsControl(props) {
        _classCallCheck(this, TabsControl);

        var _this2 = _possibleConstructorReturn(this, (TabsControl.__proto__ || Object.getPrototypeOf(TabsControl)).call(this, props));

        _this2.monaco = _react2.default.createRef();
        _this2.state = {
            currentTabId: -1,
            tabs: props.tabs
        };
        return _this2;
    }

    _createClass(TabsControl, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;
            this.props.onRef && this.props.onRef(this);
            document.onkeydown = function () {
                var oEvent = window.event;
                if (oEvent.keyCode === 83 && oEvent.ctrlKey) {
                    //ctrl+s
                    var cur_code = _this.monaco.current.editor.getValue();
                    console.log("你按下了ctrl+s", cur_code);
                    _this.props.configure.saveValue(cur_code);
                    oEvent.preventDefault();
                }
            };
        }
    }, {
        key: 'check_tittle_index',
        value: function check_tittle_index(tabId) {
            return tabId === this.state.currentTabId ? "Tab_tittle active" : "Tab_tittle";
        }
    }, {
        key: 'check_item_index',
        value: function check_item_index(tabId) {
            return tabId === this.state.currentTabId ? 'Tab_item show' : 'Tab_item';
        }
    }, {
        key: 'openInTab',
        value: function openInTab(tab) {
            var tabs = this.state.tabs;
            if (tabs.indexOf(tab) !== -1) {
                //已经在tabs打开
                this.setState({
                    currentTabId: tab.id
                });
                return;
            }
            //还没在tabs中打开
            tabs.push(tab);
            this.setState({
                tabs: tabs,
                currentTabId: tab.id
            });
        }
    }, {
        key: 'tabClick',
        value: function tabClick(ele) {
            this.setState({ currentTabId: ele.id });
            this.props.configure.tabClick(ele).then(null, function (reason) {
                console.log(reason);
            });
        }
    }, {
        key: 'tabClose',
        value: function tabClose(tab) {
            var _this3 = this;

            //移除tab是否需要把对应的在files中的文件也从内存中移除
            var tabs = [].concat(_toConsumableArray(this.state.tabs));
            var removeIndex = tabs.indexOf(tab);
            var currentTabId = this.state.currentTabId;
            var active_tab;
            tabs.splice(removeIndex, 1);
            if (tab.id === currentTabId) {
                if (removeIndex === tabs.length && tabs.length !== 0) {
                    //最后一个且删除后的数组不为空
                    var nextIndex = removeIndex - 1;
                    currentTabId = tabs[nextIndex].id;
                } else if (removeIndex === 0) {
                    //第一个
                    if (tabs.length === 0) {
                        //删除后数组为空
                        currentTabId = -1;
                        active_tab = null;
                    } else {
                        //删除后数组不为空
                        currentTabId = tabs[removeIndex].id;
                    }
                } else {
                    currentTabId = tabs[removeIndex].id;
                }
            } else {
                //不是当前tab,currentTabId不变
                currentTabId = this.state.currentTabId;
            }
            tabs.forEach(function (tab) {
                if (tab.id === currentTabId) {
                    active_tab = tab;
                }
            });
            this.props.configure.tabClose(tab, active_tab).then(function () {
                _this3.setState({
                    tabs: tabs,
                    currentTabId: currentTabId
                });
            });
        }
    }, {
        key: 'makeIcoClass',
        value: function makeIcoClass(filename) {
            var consts = {
                IMAGE: ["jpeg", "jpg", "png", "bmp", "gif"],
                VIDEO: ["mp4", "mov", "avi", "mpeg", "mpg", "asf", "qt"],
                AUDIO: ["mp3", "wav", "midi", "aiff", "flac"],
                TXT: ["text", "txt"],
                TS: ["ts", 'tsx']
            };
            var type;
            var icoCss = "";
            // //获取文件名
            // var nameStr = node.name;
            //得到文件类型
            var FileType = filename.split('.');
            //文件图标，在css中定义其位置，图标使用node.icon属性定义其路径（makeNodeIcoStyle）
            if (FileType.length > 1) {
                //有后缀名文件
                type = FileType.pop().toLowerCase();
                if (consts.IMAGE.indexOf(type) > -1) {
                    //image
                    icoCss = "image";
                } else if (consts.VIDEO.indexOf(type) > -1) {
                    //video
                    icoCss = "video";
                } else if (consts.AUDIO.indexOf(type) > -1) {
                    //audio
                    icoCss = "audio";
                } else if (consts.TXT.indexOf(type) > -1) {
                    //audio
                    icoCss = "text";
                } else if (consts.TS.indexOf(type) > -1) {
                    //typescript
                    icoCss = "ts";
                } else {
                    //其他                       
                    icoCss = type;
                }
            } else {
                //无后缀名文件
                type = FileType.shift();
                if (type.toLowerCase() === "license") {
                    icoCss = "license";
                } else {
                    icoCss = "docu";
                }
            }
            return icoCss;
        }
    }, {
        key: 'setLanguage',
        value: function setLanguage(name) {
            var fileType = name.split('.');
            var type = fileType.pop().toLowerCase();
            var language = "javascript";
            switch (type) {
                case 'js':
                    language = "javascript";break;
                case 'html':
                    language = "html";break;
                case 'css':
                    language = "css";break;
                case 'json':
                    language = "json";break;
                case 'ts' || 'tsx':
                    language = "typescript";break;
                default:
                    language = "javascript";
            }
            return language;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var tabs = this.state.tabs;
            var configure = this.props.configure;

            var tab_title = configure.title ? configure.title.show_title ? configure.title.content : null : null;
            return _react2.default.createElement(
                'div',
                { className: 'tabsControl' },
                _react2.default.createElement(
                    'ul',
                    { className: 'Tab_tittle_wrap' },
                    tabs.map(function (ele) {
                        var id = "title_" + ele.id;
                        return _react2.default.createElement(
                            'li',
                            { id: id, className: _this4.check_tittle_index(ele.id), key: ele.id, title: tab_title },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    { className: _this4.makeIcoClass(ele.name), onClick: function onClick() {
                                            _this4.tabClick(ele);
                                        } },
                                    ele.name
                                ),
                                _react2.default.createElement('img', { src: _closeBT2.default, alt: 'close', title: 'close', className: 'closeBT', onClick: function onClick() {
                                        //console.log("要删除的tab.id是：" + ele.id)
                                        _this4.tabClose(ele);
                                    } })
                            )
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Tab_item_wrap' },
                    tabs.map(function (ele) {
                        var id = "item_" + ele.id;
                        return _react2.default.createElement(
                            'div',
                            { id: id, key: ele.id, className: _this4.check_item_index(ele.id) },
                            _react2.default.createElement(_MonacoEditor2.default, {
                                ref: _this4.monaco,
                                language: _this4.setLanguage(ele.name),
                                theme: _this4.props.theme ? _this4.props.theme : "vs-dark",
                                value: ele.value,
                                tab: ele,
                                className: ele.name
                            })
                        );
                    })
                )
            );
        }
    }]);

    return TabsControl;
}(_react2.default.PureComponent);

exports.default = TabsControl;
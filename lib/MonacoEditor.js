"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _monacoEditor = require("monaco-editor");

var monaco = _interopRequireWildcard(_monacoEditor);

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonacoEditor = function (_React$PureComponent) {
    _inherits(MonacoEditor, _React$PureComponent);

    function MonacoEditor(props) {
        _classCallCheck(this, MonacoEditor);

        var _this = _possibleConstructorReturn(this, (MonacoEditor.__proto__ || Object.getPrototypeOf(MonacoEditor)).call(this, props));

        _this.monaco = React.createRef();
        return _this;
    }

    _createClass(MonacoEditor, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.editor = this.initMonaco();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.editor.dispose();
        }
    }, {
        key: "initMonaco",
        value: function initMonaco() {
            var _props = this.props,
                value = _props.value,
                language = _props.language,
                theme = _props.theme;

            if (!this.editor) {
                this.editor = monaco.editor.create(this.monaco.current, {
                    value: value,
                    language: language,
                    theme: theme
                });
                return this.editor;
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { id: "monaco", className: "monaco-container", ref: this.monaco });
        }
    }]);

    return MonacoEditor;
}(React.PureComponent);

exports.default = MonacoEditor;
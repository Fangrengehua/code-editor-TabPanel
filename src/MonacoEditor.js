import * as monaco from 'monaco-editor';
import * as React from "react";

export default class MonacoEditor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.monaco = React.createRef();
    }
    componentDidMount() {
        this.editor = this.initMonaco()

    }
    componentWillUnmount() {
        this.editor.dispose();
    }

    initMonaco() {
        const { value, language, theme } = this.props
        if (!this.editor) {
            this.editor = monaco.editor.create(
                this.monaco.current,
                {
                    value,
                    language,
                    theme,
                }
            );
            return this.editor;
        }
    }

    render() {
        return (
            <div id="monaco" className="monaco-container" ref={this.monaco} />
        )
    }
}
import React from "react";
import PropTypes from "prop-types";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from "draft-js";

import "draft-js/dist/Draft.css";

import Toolbar from "./Toolbar";

const {
  handleKeyCommand,
  onTab,
  toggleBlockType,
  toggleInlineStyle
} = RichUtils;

const STYLE_BLOCK = "block";
const STYLE_INLINE = "inline";

const styleMap = {
  emphasis: {
    backgroundColor: "#cbe2c8"
  }
};

const controls = [
  { type: STYLE_BLOCK, label: "H", style: "header-two" },
  { type: STYLE_BLOCK, label: "UL", style: "unordered-list-item" },
  { type: STYLE_INLINE, label: "B", style: "BOLD" },
  { type: STYLE_INLINE, label: "E", style: "emphasis" }
];

class RTE extends React.Component {
  static defaultProps = {
    content: "",
    placeholder: ""
  };

  static propTypes = {
    content: PropTypes.string,
    placeholder: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    let editorState;

    if (props.content) {
      editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(props.content))
      );
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      editorState
    };
  }

  getEditorNode = editor => {
    this.editor = editor;
  };

  handleClick = () => this.editor.focus();

  handleChange = editorState => this.setState({ editorState });

  handleKeyCommand(command, editorState) {
    const newState = handleKeyCommand(editorState, command);
    if (newState) {
      this.handleChange(newState);
      return true;
    }
    return false;
  }

  handleTab = e => {
    const maxDepth = 4;
    this.handleChange(onTab(e, this.state.editorState, maxDepth));
  };

  handleToggle = ({ type, style }) => {
    const toggle = type === STYLE_BLOCK ? toggleBlockType : toggleInlineStyle;
    const editorState = toggle(this.state.editorState, style);
    this.handleChange(editorState);
  };

  handleBlur = () => {
    const content = this.state.editorState.getCurrentContent();
    const rawState = convertToRaw(content);
    this.props.onUpdate(rawState);
    this.setState({ focus: false });
  };

  handleFocus = () => {
    this.setState({ focus: true });
  };

  active = control => {
    const { editorState } = this.state;
    let active;
    if (control.type === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      active = control.style === blockType;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      active = currentStyle.has(control.style);
    }
    return active;
  };

  render() {
    const { editorState, focus } = this.state;

    return (
      <div>
        <Toolbar
          editorState={editorState}
          onToggle={this.handleToggle}
          controls={controls}
          active={this.active}
        />
        <div onClick={this.handleClick} focus={focus}>
          <Editor
            ariaLabel={this.props.label}
            placeholder={this.props.placeholder}
            editorState={editorState}
            onKeyCommand={this.handleKeyCommand}
            onChange={this.handleChange}
            onTab={this.handleTab}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            ref={this.getEditorNode}
            customStyleMap={styleMap}
            spellCheck
          />
        </div>
      </div>
    );
  }
}

export default RTE;

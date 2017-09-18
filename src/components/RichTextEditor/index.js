import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from "draft-js";

import "draft-js/dist/Draft.css";

import Toolbar, { STYLE_BLOCK } from "./Toolbar";

const {
  handleKeyCommand,
  onTab,
  toggleBlockType,
  toggleInlineStyle
} = RichUtils;

const styleMap = {
  emphasis: {
    backgroundColor: "#cbe2c8"
  }
};

const Wrapper = styled.div`
  position: relative;
  h1,
  h2,
  h3,
  h4,
  h5,
  ul,
  ol {
    margin: 0 0 0.5em 0;
  }
`;

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
      editorState,
      showPlaceholder: true
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
    let { placeholder, label, ...otherProps } = this.props;
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        placeholder = "";
      }
    }
    return (
      <Wrapper>
        <Toolbar
          editorState={editorState}
          onToggle={this.handleToggle}
          active={this.active}
          visible={focus}
          {...otherProps}
        />
        <div onClick={this.handleClick}>
          <Editor
            ariaLabel={label}
            placeholder={placeholder}
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
      </Wrapper>
    );
  }
}

export default RTE;

import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromHTML,
  ContentState,
  Modifier
} from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

import Toolbar, { STYLE_BLOCK } from "./Toolbar";

const { toggleBlockType, toggleInlineStyle } = RichUtils;
const { createWithContent } = EditorState;

const styleMap = {
  ITALIC: {
    backgroundColor: "#cbe2c8"
  }
};

const heading = css`
  font-size: 1.3em;
  font-weight: bold;
`;

const list = css`margin-left: 1.5em;`;

const sizes = {
  large: css`
    font-size: 1.75em;
    font-weight: 700;
  `,

  medium: css`
    font-size: 1.125em;
    font-weight: 700;
  `,

  small: css`font-size: 0.875em;`
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

  h2 {
    ${heading};
  }

  li {
    ${list};
  }

  ${props => sizes[props.size]};

  .public-DraftEditorPlaceholder-root {
    ${props => props.placeholderStyle === "header-two" && heading};
    ${props => props.placeholderStyle === "unordered-list-item" && list};
    color: #a3a3a3;
  }
`;

Wrapper.defaultProps = {
  size: "small"
};

const toHTML = editorState =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));

const fromHTML = html => {
  const { contentBlocks, entityMap } = convertFromHTML(html);
  const state = ContentState.createFromBlockArray(contentBlocks, entityMap);

  return createWithContent(state);
};

class RichTextEditor extends React.Component {
  static defaultProps = {
    placeholder: "",
    multiline: false
  };

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    multiline: PropTypes.bool,
    size: PropTypes.oneOf(Object.keys(sizes))
  };

  constructor(props) {
    super(props);

    const editorState = props.value
      ? fromHTML(props.value)
      : EditorState.createEmpty();

    this.state = {
      editorState
    };
  }

  focus() {
    if (this.editor) {
      this.editor.focus();
    }
  }

  getHTML() {
    return toHTML(this.state.editorState);
  }

  setEditorNode = editor => {
    this.editor = editor;
  };

  handleClick = () => this.editor.focus();

  handleChange = editorState => {
    return this.setState({ editorState });
  };

  handleToggle = ({ type, style }) => {
    const toggle = type === STYLE_BLOCK ? toggleBlockType : toggleInlineStyle;
    const editorState = toggle(this.state.editorState, style);
    this.handleChange(editorState);
  };

  handleBlur = () => {
    this.props.onUpdate({
      name: this.props.id,
      value: this.getHTML()
    });

    this.setState({ focused: false });
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  hasBlockStyle = (editorState, style) => {
    const selection = editorState.getSelection();

    const blockStyle = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return blockStyle === style;
  };

  hasInlineStyle = (editorState, style) =>
    editorState.getCurrentInlineStyle().has(style);

  isActiveControl = ({ style, type }) => {
    const { editorState } = this.state;

    return type === STYLE_BLOCK
      ? this.hasBlockStyle(editorState, style)
      : this.hasInlineStyle(editorState, style);
  };

  handlePaste = text => {
    this.handleChange(
      EditorState.push(
        this.state.editorState,
        Modifier.replaceText(
          this.state.editorState.getCurrentContent(),
          this.state.editorState.getSelection(),
          text.replace(/\n/g, " ")
        )
      )
    );

    return "handled";
  };

  handleReturn = () => {
    return "handled";
  };

  render() {
    const { editorState, focused } = this.state;
    const contentState = editorState.getCurrentContent();
    const { placeholder, label, multiline, size, ...otherProps } = this.props;

    return (
      <Wrapper
        size={size}
        placeholderStyle={contentState
          .getBlockMap()
          .first()
          .getType()}
      >
        <Toolbar
          editorState={editorState}
          onToggle={this.handleToggle}
          onFocus={this.handleFocus}
          isActiveControl={this.isActiveControl}
          visible={focused}
          {...otherProps}
        />
        <div onClick={this.handleClick} id="rte-click-context">
          <Editor
            ariaLabel={label}
            placeholder={placeholder}
            editorState={editorState}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            ref={this.setEditorNode}
            customStyleMap={styleMap}
            handleReturn={multiline ? undefined : this.handleReturn}
            handlePastedText={multiline ? undefined : this.handlePaste}
            spellCheck
          />
        </div>
      </Wrapper>
    );
  }
}

export default RichTextEditor;

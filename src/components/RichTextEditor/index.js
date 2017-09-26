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

const { toggleBlockType, toggleInlineStyle } = RichUtils;
const { createWithContent, createEmpty } = EditorState;

const styleMap = {
  emphasis: {
    backgroundColor: "#cbe2c8"
  }
};

const heading = css`
  font-size: 1.3em;
  font-weight: bold;
`;

const list = css`margin-left: 1.5em;`;

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

  .public-DraftEditorPlaceholder-root {
    ${props => props.placeholderStyle === "header-two" && heading};
    ${props => props.placeholderStyle === "unordered-list-item" && list};
  }
`;

class RichTextEditor extends React.Component {
  static defaultProps = {
    placeholder: ""
  };

  static propTypes = {
    value: PropTypes.shape({
      entityMap: PropTypes.object,
      blocks: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          text: PropTypes.string,
          type: PropTypes.string,
          depth: PropTypes.number,
          inlineStyleRanges: PropTypes.array,
          entityRanges: PropTypes.array,
          data: PropTypes.object
        })
      )
    }),
    placeholder: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    const editorState = props.value
      ? createWithContent(convertFromRaw(props.value))
      : createEmpty();

    this.state = {
      editorState
    };
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
    const content = this.state.editorState.getCurrentContent();
    const rawState = convertToRaw(content);
    this.props.onUpdate(rawState);
    this.setState({ focused: false });
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  getBlockType = editorState => {
    const selection = editorState.getSelection();

    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
  };

  hasCurrentStyle = (editorState, style) =>
    editorState.getCurrentInlineStyle().has(style);

  isActiveControl = ({ style, type }) => {
    const { editorState } = this.state;

    return type === STYLE_BLOCK
      ? style === this.getBlockType(editorState)
      : this.hasCurrentStyle(editorState, style);
  };

  render() {
    const { editorState, focused } = this.state;
    const contentState = editorState.getCurrentContent();

    let { placeholder, label, ...otherProps } = this.props;

    return (
      <Wrapper
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
            spellCheck
          />
        </div>
      </Wrapper>
    );
  }
}

export default RichTextEditor;

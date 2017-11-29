import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  CompositeDecorator
} from "draft-js";
import "draft-js/dist/Draft.css";
import { toHTML, fromHTML } from "./utils/convert";
import Toolbar, { STYLE_BLOCK } from "./Toolbar";
import PipedValueDecorator, {
  entityToHTML as pipedEntityToHTML,
  htmlToEntity as htmlToPipedEntity,
  findPipedEntities,
  replacePipedValues,
  insertPipedValue
} from "./entities/PipedValue";

import { flow, uniq, map, keyBy, mapValues } from "lodash/fp";

const styleMap = {
  ITALIC: {
    backgroundColor: "#cbe2c8"
  }
};

const heading = css`
  font-size: 1.3em;
  line-height: 1.4;
  font-weight: bold;
`;

const list = css`
  margin-left: 1.5em;
`;

const sizes = {
  large: css`
    font-size: 1.75em;
    font-weight: 700;
    line-height: 1.3;
  `,

  medium: css`
    font-size: 1.125em;
    font-weight: 700;
  `,

  small: css`
    font-size: 0.875em;
  `
};

const Wrapper = styled.div`
  position: relative;
  line-height: 1.5;

  .header-two,
  .unstyled,
  .unordered-list-item {
    margin: 0;
  }

  .header-two {
    ${heading};
    margin-bottom: 0.5rem;
  }

  .unstyled {
    margin-bottom: 1rem;
  }

  .unordered-list-item {
    ${list};
    margin-bottom: 0.25rem;
  }

  ${props => sizes[props.size]};

  .public-DraftEditorPlaceholder-root {
    /* style placeholder based on prospective style */
    ${props => props.placeholderStyle === "header-two" && heading};
    ${props => props.placeholderStyle === "unordered-list-item" && list};
    color: #a3a3a3;
  }
`;

Wrapper.defaultProps = {
  size: "small"
};

const convertToHTML = toHTML(pipedEntityToHTML);
const convertFromHTML = fromHTML(htmlToPipedEntity);

const getBlockStyle = block => block.getType();

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
    className: PropTypes.string,
    multiline: PropTypes.bool,
    size: PropTypes.oneOf(Object.keys(sizes)),
    fetchAnswers: PropTypes.func
  };

  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([PipedValueDecorator]);

    const editorState = props.value
      ? convertFromHTML(props.value, decorator)
      : EditorState.createEmpty(decorator);

    this.state = { editorState };
  }

  componentDidMount() {
    if (this.props.fetchAnswers) {
      this.updatePipedValues(this.state.editorState);
    }
  }

  updatePipedValues() {
    const { editorState } = this.state;
    const { fetchAnswers } = this.props;

    const contentState = editorState.getCurrentContent();
    const entities = findPipedEntities(contentState);

    if (!entities.length) {
      return;
    }

    const createAnswerMap = flow(keyBy("id"), mapValues("label"));
    const fetchAnswersForEntities = flow(
      map("entity.data.id"),
      uniq,
      fetchAnswers
    );

    const replaceEntitiesWithLabels = labels =>
      entities.reduce(replacePipedValues(labels), contentState);

    fetchAnswersForEntities(entities)
      .then(createAnswerMap)
      .then(replaceEntitiesWithLabels)
      .then(contentState =>
        EditorState.push(editorState, contentState, "apply-entity")
      )
      .then(this.handleChange);
  }

  handlePiping = answer => {
    const { editorState } = this.state;

    const newContent = insertPipedValue(
      answer,
      editorState.getCurrentContent(),
      editorState.getSelection()
    );

    this.handleChange(
      EditorState.push(editorState, newContent, "insert-characters"),
      () => this.focus()
    );
  };

  focus() {
    if (this.editor) {
      this.editor.focus();
    }
  }

  getHTML() {
    return convertToHTML(this.state.editorState);
  }

  setEditorNode = editor => {
    this.editor = editor;
  };

  handleClick = () => {
    this.focus();
  };

  handleChange = (editorState, callback) => {
    return this.setState({ editorState }, callback);
  };

  handleToggle = ({ id, type, style }) => {
    const toggle =
      type === STYLE_BLOCK
        ? RichUtils.toggleBlockType
        : RichUtils.toggleInlineStyle;

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
    const selection = editorState.getSelection();
    const {
      placeholder,
      label,
      multiline,
      size,
      className,
      ...otherProps
    } = this.props;

    return (
      <Wrapper
        size={size}
        placeholderStyle={contentState
          .getBlockMap()
          .first()
          .getType()}
        className={className}
      >
        <Toolbar
          editorState={editorState}
          onToggle={this.handleToggle}
          onPiping={this.handlePiping}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          isActiveControl={this.isActiveControl}
          selectionIsCollapsed={selection.isCollapsed()}
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
            blockStyleFn={getBlockStyle}
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

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
import { sharedStyles } from "../Forms/css";
import { Field, Label } from "../Forms";

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
    font-size: 1.3em;
    font-weight: 700;
    line-height: 1.3;
  `,

  medium: css`
    font-size: 1.1em;
    font-weight: 700;
  `,

  small: css`
    font-size: 1em;
  `
};

const Wrapper = styled.div`
  position: relative;
  line-height: 1.5;
  margin-bottom: 2em;
`;

Wrapper.defaultProps = {
  size: "small"
};

const Input = styled.div`
  ${sharedStyles};
  padding: 0;

  .header-two,
  .unstyled,
  .unordered-list-item {
    margin: 0;
  }

  .header-two {
    ${heading};
    margin-bottom: 1rem;
  }

  .unordered-list-item {
    ${list};
    margin-bottom: 0.25rem;
  }

  ${props => sizes[props.size]};

  .DraftEditor-root {
    padding: 1rem;
  }

  .public-DraftEditorPlaceholder-root {
    /* style placeholder based on prospective style */
    ${props => props.placeholderStyle === "header-two" && heading};
    ${props => props.placeholderStyle === "unordered-list-item" && list};
    color: #a3a3a3;
  }
`;

const convertToHTML = toHTML(pipedEntityToHTML);
const convertFromHTML = fromHTML(htmlToPipedEntity);

const getBlockStyle = block => block.getType();

class RichTextEditor extends React.Component {
  static defaultProps = {
    placeholder: "",
    multiline: false,
    autoFocus: false
  };

  state = {
    focused: false
  };

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    multiline: PropTypes.bool,
    size: PropTypes.oneOf(Object.keys(sizes)),
    fetchAnswers: PropTypes.func,
    testSelector: PropTypes.string,
    autoFocus: PropTypes.bool
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
    const { fetchAnswers, autoFocus } = this.props;

    if (fetchAnswers) {
      this.updatePipedValues(this.state.editorState);
    }

    if (autoFocus) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.autoFocus && this.props.autoFocus) {
      this.focus();
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
    if (this.editorInstance) {
      this.editorInstance.focus();
    }
  }

  getHTML() {
    return convertToHTML(this.state.editorState);
  }

  setEditorInstance = editorInstance => {
    this.editorInstance = editorInstance;
  };

  handleClick = e => {
    if (!this.state.focused) {
      this.focus();
    }
  };

  handleMouseDown = e => {
    // prevent blur when mousedown on non-editor elements
    if (!this.editorInstance.editor.contains(e.target)) {
      e.preventDefault();
    }
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

  handleBlur = e => {
    this.props.onUpdate({
      name: this.props.id,
      value: this.getHTML()
    });

    this.timeoutID = setTimeout(() => {
      if (this.state.focused) {
        this.setState({ focused: false });
      }
    }, 0);
  };

  handleFocus = e => {
    clearTimeout(this.timeoutID);

    if (!this.state.focused) {
      this.setState({ focused: true });
    }
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
      testSelector,
      id,
      ...otherProps
    } = this.props;

    return (
      <Wrapper>
        <Field
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          data-test="rte-field"
        >
          <Label id={`label-${id}`}>{label}</Label>
          <Input
            className={className}
            size={size}
            placeholderStyle={contentState
              .getBlockMap()
              .first()
              .getType()}
          >
            <Toolbar
              editorState={editorState}
              onToggle={this.handleToggle}
              onPiping={this.handlePiping}
              isActiveControl={this.isActiveControl}
              selectionIsCollapsed={selection.isCollapsed()}
              visible={focused}
              {...otherProps}
            />

            <Editor
              ariaLabel={label}
              ariaLabelledBy={`label-${id}`}
              editorState={editorState}
              onChange={this.handleChange}
              ref={this.setEditorInstance}
              customStyleMap={styleMap}
              blockStyleFn={getBlockStyle}
              handleReturn={multiline ? undefined : this.handleReturn}
              handlePastedText={multiline ? undefined : this.handlePaste}
              spellCheck
              webDriverTestID={testSelector}
            />
          </Input>
        </Field>
      </Wrapper>
    );
  }
}

export default RichTextEditor;

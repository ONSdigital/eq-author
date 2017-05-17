import React, { Component } from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
`;

const StyledRichTextArea = styled(RichTextEditor)`
  width: 100%;
  min-height: 10em;
`;

const toolbarConfig = {
  display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS"],
  INLINE_STYLE_BUTTONS: [
    {
      label: "Bold",
      style: "BOLD",
      className: "custom-css-class"
    },
    {
      label: "Italic",
      style: "ITALIC"
    }
  ],
  BLOCK_TYPE_BUTTONS: [
    {
      label: "UL",
      style: "unordered-list-item"
    },
    {
      label: "OL",
      style: "ordered-list-item"
    }
  ]
};

const noop = () => {};

export default class RichTextArea extends Component {
  static defaultProps = {
    onChange: noop,
    value: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      value: RichTextEditor.createValueFromString(this.props.value, "html")
    };
  }

  handleChange = value => {
    const html = value.getEditorState().getCurrentContent().hasText()
      ? value.toString("html")
      : "";

    this.setState({ value });

    this.props.onChange({
      target: {
        name: this.props.name,
        value: html
      }
    });
  };

  render() {
    return (
      <Wrapper>
        <StyledRichTextArea
          className="rte"
          rows="10"
          value={this.state.value}
          toolbarConfig={toolbarConfig}
          onChange={this.handleChange}
        />
      </Wrapper>
    );
  }
}

RichTextArea.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  props: PropTypes.object,
  value: PropTypes.string
};

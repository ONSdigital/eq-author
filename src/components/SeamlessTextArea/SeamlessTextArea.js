import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AutoResizeTextArea from "react-textarea-autosize";
import withSeamlessness from "components/EditorSurface/withSeamlessness";
import withChangeHandler from "components/Forms/withChangeHandler";
import { flow } from "lodash";

const ENTER_KEY = 13;

const TextArea = styled(AutoResizeTextArea)`resize: none;`;

class WrappingTextArea extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  handleChange = e => {
    e.target.value = e.target.value.replace(/\n/g, " ");
    this.props.onChange(e);
  };

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <TextArea
        {...this.props}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default flow(withChangeHandler, withSeamlessness)(WrappingTextArea);

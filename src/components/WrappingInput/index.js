import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AutoResizeTextArea from "react-textarea-autosize";
import withChangeHandler from "components/Forms/withChangeHandler";
import { invoke, flowRight } from "lodash";
import { sharedStyles } from "../Forms/css";
import withValidationHandler from "containers/enhancers/withValidationHandler";
import Error from "components/Forms/ValidationError";

const ENTER_KEY = 13;

const StyleContext = styled.div`
  font-weight: ${props => (props.bold ? "bold" : "regular")};
`;

/* eslint-disable no-unused-vars  */
const TextArea = ({ invalid, onUpdate, staticContext, ...otherProps }) => (
  <AutoResizeTextArea {...otherProps} />
);
/* eslint-enable no-unused-vars  */

const StyledTextArea = styled(TextArea)`
  ${sharedStyles};
  font-weight: inherit;
  resize: none;
  overflow: hidden; /* prevent scrollbars on Windows */
`;

class WrappingInput extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    id: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    bold: false
  };

  handleChange = e => {
    e.target.value = e.target.value.replace(/\n/g, " ");
    this.props.onChange(e);
  };

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      e.preventDefault();
    }

    invoke(this.props, "onKeyDown", e);
  };

  render() {
    const {
      bold,
      placeholder,
      valid,
      validationText,
      ...otherProps
    } = this.props;

    return (
      <StyleContext bold={bold}>
        <StyledTextArea
          {...otherProps}
          invalid={!valid}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
        />
        {!valid && <Error>{validationText}</Error>}
      </StyleContext>
    );
  }
}

export default flowRight(
  withChangeHandler,
  withValidationHandler
)(WrappingInput);

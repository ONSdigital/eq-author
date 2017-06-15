import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { sharedStyles } from "components/Forms/css";

const noop = () => {};

const StyledTextArea = styled.textarea`
  ${sharedStyles};
  resize: none;
`;

export const TextArea = ({
  defaultValue,
  id,
  rows,
  handleChange,
  ...otherProps
}) =>
  <StyledTextArea
    defaultValue={defaultValue}
    rows={rows}
    id={id}
    name={id}
    onChange={function(e) {
      handleChange({ [id]: e.target.value });
    }}
    {...otherProps}
  />;

TextArea.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  rows: PropTypes.number
};

TextArea.defaultProps = {
  rows: 10,
  handleChange: noop
};

TextArea.displayName = "Textarea";

export default TextArea;

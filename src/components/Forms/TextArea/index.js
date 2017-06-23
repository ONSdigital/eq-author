import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { sharedStyles } from "components/Forms/css";

const noop = () => {};

const StyledTextArea = styled.textarea`
  ${sharedStyles};
  resize: none;
`;

export const TextArea = ({ value, id, rows = 10, ...otherProps }) =>
  <StyledTextArea
    value={value}
    rows={rows}
    id={id}
    name={id}
    onChange={noop}
    {...otherProps}
  />;

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  rows: PropTypes.number
};

TextArea.displayName = "Textarea";

export default TextArea;

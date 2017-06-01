import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const noop = () => {};

const StyledTextArea = styled.textarea`
  resize: none;
`;

const TextArea = ({ value, id, rows = 10, ...otherProps }) => (
  <StyledTextArea
    value={value}
    rows={rows}
    id={id}
    name={id}
    onChange={noop}
    {...otherProps}
  />
);

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  rows: PropTypes.number
}

export default TextArea

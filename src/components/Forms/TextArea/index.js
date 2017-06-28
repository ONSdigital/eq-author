import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import styled from "styled-components";
import { sharedStyles } from "components/Forms/css";

const StyledTextArea = styled.textarea`
  ${sharedStyles};
  resize: none;
`;

export const TextArea = ({ defaultValue, id, rows, onChange, ...otherProps }) =>
  <StyledTextArea
    defaultValue={defaultValue}
    rows={rows}
    id={id}
    name={id}
    onChange={function(e) {
      onChange({ [id]: e.target.value });
    }}
    {...otherProps}
  />;

TextArea.propTypes = {
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number
};

TextArea.defaultProps = {
  rows: 10,
  onChange: noop
};

TextArea.displayName = "Textarea";

export default TextArea;

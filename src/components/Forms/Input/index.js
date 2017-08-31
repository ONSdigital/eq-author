import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { sharedStyles } from "components/Forms/css";
import iconCheckbox from "./icon-checkbox.svg";
import withChangeHandler from "components/Forms/withChangeHandler";

const checkBox = css`
  display: inline-block;
  width: 1.1em;
  height: 1.1em;
  padding: 0;
  margin: 0 1em 0 0;
  vertical-align: middle;
  appearance: none;
  font-size: 1em;
  &:checked {
    background: url(${iconCheckbox}) no-repeat center;
    background-size: 0.8em auto;
  }
`;

const StyledInput = styled.input`
  ${sharedStyles};
  ${props => props.type === "checkbox" && checkBox};
`;

const Input = ({ type, defaultValue, id, ...otherProps }) =>
  <StyledInput
    type={type}
    defaultValue={defaultValue}
    id={id}
    name={id}
    {...otherProps}
  />;

Input.defaultProps = {
  type: "text"
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "checkbox", "radio", "number"]).isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ])
};

export default withChangeHandler(Input);

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";

const noop = () => {};

const StyledInput = styled.input`
  padding: 1em;
  width: 100%;
  display: block;
  border-radius: 2px;
  border: 1px solid ${colors.borders};
  &:focus {
    outline: none;
    border: 1px solid ${colors.lightBlue};
  }
  &[type = "checkbox"]{
    display: inline-block;
    width: auto;
  }
`;

const Input = ({ type, value, id, ...otherProps }) => (
  <StyledInput
    type={type}
    value={value}
    id={id}
    name={id}
    onChange={noop}
    {...otherProps}
  />
);

Input.defaultProps = {
  type: "text"
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]),
  id: PropTypes.string
};

export default Input;

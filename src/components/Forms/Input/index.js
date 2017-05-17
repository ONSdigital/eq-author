import React from "react";
import styled from "styled-components";

const noop = () => {};

const Input = styled.input`
  padding: 1em;
  width: 100%;
  display: block;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colorBorders};
  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.colorLightBlue};
  }
  &[type = "checkbox"]{
    display: inline-block;
    width: auto;
  }
`;

Input.defaultProps = {
  type: "text"
};

export default ({ type, value, id, ...otherProps }) => (
  <Input
    type={type}
    value={value}
    id={id}
    name={id}
    onChange={noop}
    {...otherProps}
  />
);

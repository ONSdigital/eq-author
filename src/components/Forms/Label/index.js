import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  font-size: 0.9em;
  margin-bottom: 0.4em;
  font-weight: 700;
`;

export default ({ id, children, ...otherProps }) =>
  <Label htmlFor={id} {...otherProps}>{children}</Label>;

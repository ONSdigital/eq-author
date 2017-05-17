import React from "react";
import styled from "styled-components";

const Title = styled.div`
  font-size: 1.4em;
  font-weight: 700;
`;

export default ({ children, ...otherProps }) =>
  <Title {...otherProps}>{children}</Title>;

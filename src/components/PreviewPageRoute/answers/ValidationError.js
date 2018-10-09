import React from "react";
import styled from "styled-components";
import { colors } from "constants/theme";

const Error = styled.span`
  color: ${colors.red};
  font-weight: bold;
  display: inline-flex;
  align-items: center;
`;

export default ({ children }) => <Error>{children}</Error>;

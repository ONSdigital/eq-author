import React from "react";
import styled from "styled-components";
import { colors } from "constants/theme";
import IconText from "components/IconText";
import ErrorIcon from "./icon-error.svg?inline";

const Error = styled.div`
  position: absolute;
  right: 0;
  bottom: -2em;
  color: ${colors.red};
  --color-text: ${colors.red};
  font-weight: normal;
`;

const Icon = styled(IconText)`
  padding-right: 0;
`;

export default ({ children }) => (
  <Error>
    <Icon icon={ErrorIcon}>{children}</Icon>
  </Error>
);

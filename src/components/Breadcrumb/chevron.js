import React from "react";
import styled from "styled-components";
import ChevronSvg from "./chevron.svg";

const ChevronIcon = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  padding: 0 1em;
  background: url('${ChevronSvg}') center center no-repeat;
`;

export default props => <ChevronIcon {...props} />;

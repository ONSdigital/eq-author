import styled from "styled-components";
import iconAlert from "./icon-alert.svg";

export const Alert = styled.div`
  display: flex;
  align-items: center;
`;

export const AlertIcon = styled.span`
  content: url(${iconAlert});
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.7em;
`;

export const AlertBody = styled.span`
  line-height: 1;
`;

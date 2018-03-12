import styled from "styled-components";
import { colors } from "constants/theme";

export const Toolbar = styled.div`
  display: flex;
  border-bottom: 1px solid ${colors.borders};
  margin: 0 0 1em;
  padding: 0.25em 1em;
  align-items: center;
`;

export const Buttons = styled.div`
  margin: 0 -0.5em 0 auto;
`;

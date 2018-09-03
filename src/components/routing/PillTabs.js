import styled from "styled-components";

import { colors } from "constants/theme";

export const PillTabs = styled.div`
  background-color: ${colors.lighterGrey};
  border-radius: 3em;
  display: flex;
  margin: 0.25em 0 1em;
`;

export const PillTab = styled.div`
  padding: 0.5em 0;
  border-radius: 3em;
  color: ${colors.darkGrey};
  cursor: pointer;
  flex: 1 1 auto;
  text-align: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &[aria-selected="true"] {
    background: ${colors.primary};
    color: white;
  }

  &:first-child {
    margin-right: 0.5em;
  }

  &:last-child {
    margin-left: 0.5em;
  }
`;

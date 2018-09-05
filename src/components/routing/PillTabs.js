import styled from "styled-components";

import { colors } from "constants/theme";

export const PillTabs = styled.div`
  border-radius: 4px;
  display: flex;
`;

export const PillTab = styled.div`
  padding: 0.5em 1em;
  border-radius: 4px 4px 0 0;
  color: ${colors.darkGrey};
  cursor: pointer;
  text-align: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &[aria-selected="true"] {
    background: ${colors.primary};
    color: white;
    border-color: ${colors.primary};
  }
`;

export const PillTabsBody = styled.div`
  padding: 1em;
  background-color: ${colors.lighterGrey};
  border-radius: 0 0 4px 4px;
`;

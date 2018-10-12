import styled from "styled-components";

import { colors } from "constants/theme";

export const Tabs = styled.div`
  border-radius: 4em;
  background: ${colors.lighterGrey};
  display: flex;
`;

export const Tab = styled.div`
  padding: 0.5em 1em;
  border-radius: 4em;
  color: ${colors.darkGrey};
  cursor: pointer;
  text-align: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${colors.text};
  }

  &[aria-selected="true"] {
    background: ${colors.primary};
    color: white;
    border-color: ${colors.primary};
  }
`;

export const TabsBody = styled.div`
  padding: 1em 0;
`;

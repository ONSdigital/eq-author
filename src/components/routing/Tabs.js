import styled from "styled-components";

import { colors } from "constants/theme";
import { TabsBody as _TabsBody } from "components/ModalWithNav/Tabs";

export const Tabs = styled.div`
  border-radius: 4px;
  display: flex;
`;

export const Tab = styled.div`
  padding: 0.5em 1em;
  border-radius: 4px 4px 0 0;
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

export const TabsBody = styled(_TabsBody)`
  padding: 1em;
  background-color: ${colors.lighterGrey};
  border-radius: 0 0 4px 4px;
`;

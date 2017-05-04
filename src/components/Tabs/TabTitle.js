import React from 'react';
import styled, {css} from 'styled-components';
import {colorBorders} from 'constants/theme';

const SelectedTabTitle = css`
  background: white;
  border: 1px solid ${colorBorders};
  border-bottom: none;
`;

const UnselectedTabTitle = css`
  opacity: 0.5;
`;

const CompactTabTitle = css`
  padding: 0.75em 3em;
  margin-bottom: -1px;
  border-top: none !important;
  border-bottom: none !important;
  &:first-child {
    border-left: none !important;
  }
`;

const TabTitle = styled.li`
  padding: 1em 3em;
  cursor: pointer;

  &[aria-selected=true] {
    ${SelectedTabTitle};
  }
  &[aria-selected=false] {
    ${UnselectedTabTitle};
  }

  ${props => props.compact && CompactTabTitle};
`;

const TabLabel = styled.div`
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.05em;
  user-select: none;
`;

export default ({children, onClick, selected = true, ...otherProps}) => (
  <TabTitle onClick={onClick} aria-selected={selected} {...otherProps}>
    <TabLabel>{children}</TabLabel>
  </TabTitle>
);

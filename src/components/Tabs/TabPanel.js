import React from 'react';
import styled from 'styled-components';

const TabPanelStyle = styled.div`
  background: white;
  width: 100%;
  padding: ${props => (props.compact ? '1' : '2')}em;
  &[aria-hidden=true] {
    display: none;
  }
`;

const TabPanel = ({children, visible = true, ...otherProps}) => (
  <TabPanelStyle aria-hidden={!visible} {...otherProps}>
    {children}
  </TabPanelStyle>
);

TabPanel.defaultProps = {
  displayName: 'TabPanel',
};

export default TabPanel;

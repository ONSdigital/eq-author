import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const TabPanelStyle = styled.div`
  background: white;
  width: 100%;
  padding: ${props => (props.compact ? "1" : "2")}em;
  &[aria-hidden=true] {
    display: none;
  }
`;

const TabPanel = ({ children, visible = true, ...otherProps }) => (
  <TabPanelStyle aria-hidden={!visible} {...otherProps}>
    {children}
  </TabPanelStyle>
);

TabPanel.displayName = "TabPanel";

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  visible: PropTypes.bool
};

export default TabPanel;

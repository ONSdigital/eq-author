import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "constants/theme";

export const TabsNavItem = ({
  children,
  active,
  onClick,
  controls,
  ...otherProps
}) => (
  <TabsItem role="presentation">
    <TabsBtn
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </TabsBtn>
  </TabsItem>
);

TabsNavItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  controls: PropTypes.string.isRequired
};

export const TabsNav = ({ title, children, ...otherProps }) => (
  <TabList role="tablist" aria-label={title} {...otherProps}>
    {children}
  </TabList>
);

TabsNav.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

const TabPanel = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export const TabsBody = ({ children, navItemId, ...otherProps }) => (
  <TabPanel role="tabpanel" aria-labelledby={navItemId} {...otherProps}>
    {children}
  </TabPanel>
);

TabsBody.propTypes = {
  children: PropTypes.node.isRequired,
  navItemId: PropTypes.string.isRequired
};

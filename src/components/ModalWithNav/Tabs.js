import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "constants/theme";

const TabList = styled.ul`
  list-style: none;
  margin: 0 0 1em;
  padding: 0;
`;

const TabsItem = styled.li`
  margin: 0;
  padding: 0;
`;

const TabsBtn = styled.button`
  --color-text: ${colors.darkGrey};
  color: var(--color-text);
  margin: 0;
  padding: 0.5em 2em;
  appearance: none;
  font-size: 1em;
  width: 100%;
  display: block;
  border: none;
  background: rgba(0, 0, 0, 0);
  text-align: left;
  cursor: pointer;

  &:hover {
    --color-text: ${colors.white};
    background: ${colors.secondary};
  }

  &:focus {
    outline: 3px solid ${colors.orange};
    outline-offset: -3px;
  }

  &:active {
    outline: none;
  }

  &[aria-selected="true"] {
    --color-text: ${colors.black};
    background: ${colors.orange};
    pointer-events: none;
    &::before {
      filter: invert(80%);
    }
  }
`;

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

export const TabsBody = ({ children, navItemId, ...otherProps }) => (
  <div role="tabpanel" aria-labelledby={navItemId} {...otherProps}>
    {children}
  </div>
);

TabsBody.propTypes = {
  children: PropTypes.node.isRequired,
  navItemId: PropTypes.string.isRequired
};

import React from "react";
import { SubMenuItem as RMLSubMenuItem } from "react-menu-list";
import styled from "styled-components";
import PropTypes from "prop-types";
import iconArrow from "./icon-arrow.svg";

import {
  MenuItemInner,
  menuItemStyles,
  highlightedClassName
} from "components/Menu/MenuItem";

const StyledSubMenuItem = styled(RMLSubMenuItem)`
  ${menuItemStyles};
  padding-right: 2em;

  &::after {
    content: "";
    opacity: 0.5;
    display: block;
    background: transparent url(${iconArrow}) no-repeat center;
    position: absolute;
    right: 0.5em;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 22px;
    width: 12px;
  }

  &::before {
    content: "";
    width: 7px;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 100%;
  }
`;

const DisabledSubMenuItem = styled(StyledSubMenuItem.withComponent("div"))`
  cursor: default;

  &::after {
    background: none;
  }

  & ${MenuItemInner} {
    opacity: 0.5;
  }
`;

const SubMenuItem = ({ children, disabled, ...otherProps }) => {
  if (disabled) {
    return (
      <DisabledSubMenuItem>
        <MenuItemInner>{children}</MenuItemInner>
      </DisabledSubMenuItem>
    );
  }

  return (
    <StyledSubMenuItem
      {...otherProps}
      highlightedClassName={highlightedClassName}
      positionOptions={{
        position: "right",
        vAlign: ["top", "center", "bottom"],
        hAlign: ["center", "left", "right"]
      }}
    >
      <MenuItemInner>{children}</MenuItemInner>
    </StyledSubMenuItem>
  );
};

SubMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  lines: PropTypes.number.isRequired,
  disabled: PropTypes.bool
};

SubMenuItem.defaultProps = {
  lines: 1
};

export default SubMenuItem;

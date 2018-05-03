import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "constants/theme";
import { rgba } from "polished";
import IconText from "../IconText";

import Truncated from "components/Truncated";

const Link = styled(RouterNavLink)`
  --color-text: rgb(255, 255, 255);
  text-decoration: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 0.5em 0 0;
  color: var(--color-text);

  &:hover {
    background: ${rgba(0, 0, 0, 0.2)};
  }

  &:focus {
    outline: 3px solid ${colors.orange};
    outline-offset: -3px;
  }

  &:active {
    outline: none;
  }

  &[aria-current="true"] {
    background: ${colors.orange};
    pointer-events: none;

    --color-text: ${colors.black};
    &::before {
      filter: invert(80%);
    }
  }
`;

const Title = styled(Truncated)`
  display: inline-block;
  vertical-align: middle;
  line-height: 1.3;
`;

const NavLink = ({ isActive, to, title, children, icon, ...otherProps }) => (
  <Link to={to} isActive={isActive} title={title} {...otherProps}>
    <IconText icon={icon}>
      <Title>{children}</Title>
    </IconText>
  </Link>
);

NavLink.propTypes = {
  isActive: PropTypes.func,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.func.isRequired
};

export default NavLink;

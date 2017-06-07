import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { colors } from "constants/theme";

export const StyledNav = styled.nav`
  margin: 0;
  display: block;
`;

const StyledNavLink = styled(NavLink)`
  padding: 1em 1.5em;
  display: inline-block;
  cursor: pointer;
  font-size: 0.875em;
  font-weight: 600;
  user-select: none;
  color: ${colors.text};
  transition: color 200ms ease-in-out;
  text-decoration: none;
  border-color: rgba(5, 108, 153, 0);
  border-style: solid;
  border-width: 0 0 2px 0;
  &:hover {
    color: ${colors.blue};
  }
  &.selected {
    color: ${colors.blue};
    border-color: rgba(5, 108, 153, 1);
  }
`;

const Nav = () =>
  <StyledNav>
    <StyledNavLink to="/create" activeClassName="selected">
      Questionnaire meta
    </StyledNavLink>
    <StyledNavLink to="/design" activeClassName="selected">
      Builder
    </StyledNavLink>
  </StyledNav>;

export default Nav;

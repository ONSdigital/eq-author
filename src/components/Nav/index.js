import React from "react";
import styled from "styled-components";
import { Column } from "components/Grid";
import { NavLink } from "react-router-dom";
import { colorBlue, colorText } from "constants/theme";

const StyledGrid = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 auto;
  border-bottom: 1px solid ${props => props.theme.colorBorders};
`;

const StyledNav = styled.nav`
  margin: 0;
  display: block;
`;

const StyledNavLink = styled(NavLink)`
  padding: 1em 2em;
  display: inline-block;
  cursor: pointer;
  font-size: 0.875em;
  font-weight: 600;
  user-select: none;
  color: ${colorText};
  transition: color 200ms ease-in-out;
  text-decoration: none;
  border-color: rgba(5, 108, 153, 0);
  border-style: solid;
  border-width: 0 0 2px 0;
  &:hover {
    color: ${colorBlue};
  }
  &.selected {
    border-color: rgba(5, 108, 153, 1);
  }
`;

const Nav = () => (
  <StyledGrid>
    <Column cols="3" />
    <Column>
      <StyledNav>
        <StyledNavLink to="/create" activeClassName="selected">
          Questionnaire meta
        </StyledNavLink>
        <StyledNavLink to="/design" activeClassName="selected">
          Builder
        </StyledNavLink>
        <StyledNavLink to="/routing" activeClassName="selected">
          Routing
        </StyledNavLink>
      </StyledNav>
    </Column>
  </StyledGrid>
);

export default Nav;

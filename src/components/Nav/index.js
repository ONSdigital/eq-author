import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { colors } from "constants/theme";

import CustomPropsTypes from "custom-prop-types";

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

const Nav = withRouter(({ questionnaire, match }) => {
  const { id } = questionnaire;
  const section = questionnaire.sections[0];
  const page = section.pages[0];

  const navIsActive = () => {
    return match.params.sectionId;
  };

  return (
    <StyledNav>
      <StyledNavLink
        to={`/questionnaire/${id}/meta`}
        activeClassName="selected"
      >
        Questionnaire meta
      </StyledNavLink>
      <StyledNavLink
        to={`/questionnaire/${id}/design/${section.id}/${page.id}`}
        activeClassName="selected"
        isActive={navIsActive}
      >
        Builder
      </StyledNavLink>
    </StyledNav>
  );
});

Nav.propTypes = {
  questionnaire: CustomPropsTypes.questionnaire
};

export default Nav;

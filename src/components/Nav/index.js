import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { colors } from "constants/theme";
import { get } from "lodash";

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
  font-weight: 400;
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

// TODO: find out why route matching doesn't work automatically
// Given a route /foo/:bar/blah
// I would expect that /foo, /foo/1/blah, /foo/2/blah etc would all "match"
// But this is not the case. Unsure if bug or implementation issue
export const NavWithoutRouter = ({ questionnaire, match }) => {
  const { id } = questionnaire;
  const section = get(questionnaire, "sections[0]", {});
  const page = get(section, "pages[0]", {});

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
};

NavWithoutRouter.propTypes = {
  questionnaire: CustomPropsTypes.questionnaire,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
};

export default withRouter(NavWithoutRouter);

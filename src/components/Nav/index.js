import React from "react";
import styled from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { colors } from "constants/theme";
import { getLink } from "utils/UrlUtils";
import findById from "../../utils/findById";

import CustomPropTypes from "custom-prop-types";

export const StyledNav = styled.nav`
  margin: 1.25em 0;
`;

const StyledNavLink = styled(NavLink)`
  padding-bottom: 0.25em;
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
  border-width: 0 0 2px;
  margin-right: 2em;

  &:hover {
    color: ${colors.blue};
  }

  &.selected {
    color: ${colors.blue};
    border-color: rgba(5, 108, 153, 1);
  }
`;

const DisabledNavLink = StyledNavLink.withComponent("span").extend`
  color: ${colors.blue};
  cursor: default;
  opacity: 0.5;
`;

// TODO: find out why route matching doesn't work automatically
// Given a route /foo/:bar/blah
// I would expect that /foo, /foo/1/blah, /foo/2/blah etc would all "match"
// But this is not the case. Unsure if bug or implementation issue

export const NavWithoutRouter = ({ questionnaire, section, page, match }) => {
  const navIsActive = () => {
    if (match.path.indexOf("routing") > -1) {
      return false;
    }
    return match.params.sectionId;
  };

  return (
    <StyledNav>
      <StyledNavLink
        to={getLink(questionnaire.id, section.id, page.id)}
        activeClassName="selected"
        isActive={navIsActive}
      >
        Builder
      </StyledNavLink>
      <StyledNavLink
        to={`${getLink(questionnaire.id, section.id, page.id, "routing")}`}
        activeClassName="selected"
        isActive={function(_, location) {
          return match.path.indexOf("routing") > -1;
        }}
      >
        Routing
      </StyledNavLink>
    </StyledNav>
  );
};

NavWithoutRouter.propTypes = {
  questionnaire: CustomPropTypes.questionnaire,
  section: CustomPropTypes.section,
  page: CustomPropTypes.page,
  match: CustomPropTypes.match
};

export default withRouter(NavWithoutRouter);

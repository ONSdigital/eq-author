import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import styled from "styled-components";

import { getLink } from "utils/UrlUtils";
import { colors } from "constants/theme";

import sectionIcon from "./icon-section.svg";
import getTextFromHTML from "utils/getTextFromHTML";
import { rgba } from "polished";

import CustomPropTypes from "custom-prop-types";

const textInverted = "#E1E1E1";

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${textInverted};
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  padding: 0.3em 0.5em;

  &:link,
  &:visited {
    color: ${colors.text};
  }

  &:hover {
    background: ${rgba(colors.blue, 0.5)};
  }

  &.selected {
    background: ${colors.blue};
    color: white;
  }

  &[aria-disabled="true"] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const Title = styled.span`
  padding: 0.5em 2.5em 0.5em 0;
  font-size: 0.75em;
  margin: 0;
  font-weight: 900;
  position: relative;
  width: 100%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${textInverted};

  &::before {
    height: 1rem;
    vertical-align: sub;
    display: inline-block;
    content: url(${sectionIcon});
    margin-right: 0.5em;
  }
`;

export const UnwrappedSectionNavLink = ({ questionnaire, section, match }) => {
  if (!section) {
    return null;
  }

  const sectionTitle = (
    <Title title={getTextFromHTML(section.title)}>
      {getTextFromHTML(section.title) || "Section Title"}
    </Title>
  );

  const navIsActive = () => {
    return match.params.sectionId === section.id && !match.params.pageId;
  };

  if (section.pages.length === 0) {
    return sectionTitle;
  }

  return (
    <Link
      to={getLink(questionnaire.id, section.id)}
      activeClassName="selected"
      isActive={navIsActive}
      data-test="nav-section-link"
    >
      {sectionTitle}
    </Link>
  );
};

UnwrappedSectionNavLink.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired,
  match: CustomPropTypes.match
};

export default withRouter(UnwrappedSectionNavLink);

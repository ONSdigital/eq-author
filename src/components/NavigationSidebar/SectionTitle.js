import React from "react";
import { NavLink } from "react-router-dom";
import { first } from "lodash";
import styled from "styled-components";

import { getLink } from "utils/UrlUtils";
import { colors } from "constants/theme";

import sectionIcon from "./icon-section.svg";
import getTextFromHTML from "utils/getTextFromHTML";

import CustomPropTypes from "custom-prop-types";

const textInverted = "#E1E1E1";

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${textInverted};
  overflow: hidden;
  text-overflow: ellipsis;

  &:link,
  &:visited {
    color: ${colors.text};
  }
`;

const Title = styled.h3`
  padding: 0.5em 2.5em 0.5em 0;
  font-size: 0.75em;
  margin: 0;
  font-weight: 900;
  position: relative;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
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

const SectionTitle = ({ questionnaire, section }) => {
  if (!section) {
    return null;
  }

  const sectionTitle = (
    <Title title={getTextFromHTML(section.title)}>
      {getTextFromHTML(section.title) || "Section Title"}
    </Title>
  );

  if (section.pages.length === 0) {
    return sectionTitle;
  }

  const firstPage = first(section.pages);
  return (
    <Link
      to={getLink(questionnaire.id, section.id, firstPage.id)}
      activeClassName="selected"
    >
      {sectionTitle}
    </Link>
  );
};

SectionTitle.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired
};

export default SectionTitle;

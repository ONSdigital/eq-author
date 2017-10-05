import React from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import styled from "styled-components";
import { colors } from "constants/theme";

import sectionIcon from "./icon-section.svg";

import PageNav from "components/QuestionnaireNav/PageNav";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { NavLink } from "react-router-dom";

import { first } from "lodash";
import { getLink } from "utils/UrlUtils";

const duration = 200;

const SectionItem = styled.li`
  margin: 0;
  padding: 0.5em 0;
  transition: height ${duration / 2}ms ease-out,
    opacity ${duration}ms ease-out ${duration}ms, padding ${duration}ms ease-out,
    transform ${duration}ms ease-out ${duration}ms;
  opacity: 1;
  transform: translateX(0);

  &:not(:last-child) {
    border-bottom: 1px solid #c3c3c3;
  }

  &.section-enter {
    opacity: 0;
    height: 0;
    padding: 0;
    transform: translateX(-20px);
  }

  &.section-entered {
    height: auto;
  }
`;

const Link = styled(NavLink)`
  text-decoration: none;
  &:link,
  &:visited {
    color: ${colors.text};
  }
`;

const SectionTitle = styled.h3`
  padding: 0.5em 0;
  font-size: 0.75em;
  margin: 0;
  font-weight: 900;
  display: flex;
  &:before {
    content: url(${sectionIcon});
    margin-right: 0.5em;
  }
`;

export const AddPageBtn = styled.button`
  appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 1em;
  color: ${colors.text};
  &:hover {
    color: black;
  }
`;

const NavList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const LinkedSectionTitle = ({ questionnaire, section }) => {
  const sectionTitle = (
    <SectionTitle>{section.title || "Section Title"}</SectionTitle>
  );
  if (section.pages.length > 0) {
    const firstPage = first(section.pages);
    return (
      <Link
        to={getLink(questionnaire.id, section.id, firstPage.id)}
        aria-disabled={parseInt(firstPage.id, 10) < 0}
        activeClassName="selected"
      >
        {sectionTitle}
      </Link>
    );
  } else {
    return sectionTitle;
  }
};

LinkedSectionTitle.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired
};

const SectionNav = ({ questionnaire, onAddPage, onDeletePage }) => (
  <TransitionGroup component={NavList}>
    {questionnaire.sections
      .map((section, i) => ({
        ...section,
        number: `${i + 1}.`
      }))
      .map((section, sectionNum) => (
        <CSSTransition
          key={section.number}
          timeout={duration}
          classNames="section"
        >
          <SectionItem>
            <LinkedSectionTitle
              questionnaire={questionnaire}
              section={section}
            />
            <PageNav
              section={section}
              questionnaire={questionnaire}
              onDelete={onDeletePage}
            />
            <AddPageBtn
              onClick={function() {
                onAddPage(section.id);
              }}
              id="btn-add-page"
            >
              + Add page
            </AddPageBtn>
          </SectionItem>
        </CSSTransition>
      ))}
  </TransitionGroup>
);

SectionNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire,
  onAddPage: PropTypes.func.isRequired,
  onDeletePage: PropTypes.func.isRequired
};

export default SectionNav;

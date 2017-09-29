import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SectionNavItem from "./SectionNavItem";

const duration = 200;

const NavList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const SectionNav = ({
  questionnaire,
  onAddPage,
  onDeleteSection,
  onDeletePage
}) => (
  <TransitionGroup component={NavList}>
    {questionnaire.sections
      .map((section, i) => ({
        ...section,
        number: i + 1
      }))
      .map((section, sectionNum) => (
        <CSSTransition key={section.id} timeout={duration} classNames="section">
          <SectionNavItem
            questionnaire={questionnaire}
            section={section}
            duration={duration}
            onDeletePage={onDeletePage}
            onDeleteSection={onDeleteSection}
            onAddPage={onAddPage}
          />
        </CSSTransition>
      ))}
  </TransitionGroup>
);

SectionNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire,
  onAddPage: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
  onDeletePage: PropTypes.func.isRequired
};

export default SectionNav;

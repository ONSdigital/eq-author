import React from "react";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import PageNavItem from "./PageNavItem";

const duration = 300;

const NavList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const PageNav = ({ section, questionnaire }) => (
  <TransitionGroup component={NavList}>
    {section.pages.map(page => (
      <CSSTransition key={page.id} timeout={duration} classNames="page">
        <PageNavItem
          title={page.title}
          pageId={page.id}
          sectionId={section.id}
          questionnaireId={questionnaire.id}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

PageNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired
};

export default PageNav;

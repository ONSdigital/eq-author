import React from "react";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import { TransitionGroup } from "react-transition-group";
import NavItemTransition from "./NavItemTransition";

import PageNavItem from "./PageNavItem";
import scrollIntoView from "utils/scrollIntoView";

const NavList = styled.ol`
  padding: 0 0 1em;
  margin: 0;
  list-style: none;
  font-weight: regular;
`;

const PageNav = ({ section, questionnaire }) => (
  <TransitionGroup component={NavList}>
    {section.pages.map(page => (
      <NavItemTransition key={page.id} onEntered={scrollIntoView}>
        <PageNavItem
          title={page.title}
          pageId={page.id}
          sectionId={section.id}
          questionnaireId={questionnaire.id}
        />
      </NavItemTransition>
    ))}
  </TransitionGroup>
);

PageNav.propTypes = {
  questionnaire: CustomPropTypes.questionnaire.isRequired,
  section: CustomPropTypes.section.isRequired
};

export default PageNav;

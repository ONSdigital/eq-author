import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";

import { TransitionGroup } from "react-transition-group";
import NavItemTransition from "./NavItemTransition";
import SectionNavItem from "./SectionNavItem";
import scrollIntoView from "utils/scrollIntoView";

const NavList = styled.ol`
  margin: 0 0 1em;
  padding: 0;
  list-style: none;
  font-weight: bold;
`;

class SectionNav extends Component {
  sectionItems = [];

  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    currentSectionId: PropTypes.string.isRequired,
    currentPageId: PropTypes.string
  };

  render() {
    const { questionnaire, currentSectionId, currentPageId } = this.props;
    return (
      <TransitionGroup component={NavList}>
        {questionnaire.sections
          .map((section, i) => ({
            ...section,
            number: i + 1
          }))
          .map((section, sectionNum) => (
            <NavItemTransition key={section.id} onEntered={scrollIntoView}>
              <SectionNavItem
                questionnaire={questionnaire}
                section={section}
                isActive={function() {
                  return currentSectionId === section.id && !currentPageId;
                }}
              />
            </NavItemTransition>
          ))}
      </TransitionGroup>
    );
  }
}

export default SectionNav;

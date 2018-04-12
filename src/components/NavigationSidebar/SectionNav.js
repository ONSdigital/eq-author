import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import styled from "styled-components";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import SectionNavItem from "./SectionNavItem";

const NavList = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const duration = 200;

class SectionNav extends Component {
  sectionItems = [];

  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    onAddPage: PropTypes.func.isRequired
  };

  scrollSectionIntoView = id =>
    this.sectionItems[id].scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start"
    });

  saveSectionItemRef = (id, node) => {
    this.sectionItems[id] = node;
  };

  handleSectionExit = node => {
    const { height } = node.getBoundingClientRect();
    node.style.height = `${height}px`;
  };

  render() {
    const { questionnaire, onAddPage } = this.props;
    return (
      <TransitionGroup component={NavList}>
        {questionnaire.sections
          .map((section, i) => ({
            ...section,
            number: i + 1
          }))
          .map((section, sectionNum) => (
            <CSSTransition
              key={section.id}
              timeout={duration}
              classNames="section"
              onExit={this.handleSectionExit}
            >
              <SectionNavItem
                questionnaire={questionnaire}
                section={section}
                duration={duration}
                onAddPage={onAddPage}
                saveSectionItemRef={this.saveSectionItemRef}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    );
  }
}

export default SectionNav;

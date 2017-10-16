import React, { Component } from "react";

import styled from "styled-components";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import { colors } from "constants/theme";

import SectionNav from "components/QuestionnaireNav/SectionNav";

import plusIcon from "./icon-plus.svg";

const Container = styled.div`
  padding: 1em;
  margin: 0;
`;

const Title = styled.h2`
  font-size: 0.6em;
  text-transform: uppercase;
  font-weight: 900;
  margin: 0;
  line-height: 1.5;
  position: relative;
`;

const AddSection = styled.div`
  border-top: 1px solid #c3c3c3;
  padding: 1em 0;
  position: sticky;
  z-index: 99999;
  bottom: 0;
  left: 0;
  background: ${colors.lighterGrey};
`;

export const AddSectionBtn = styled.button`
  appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: ${colors.text};
  font-weight: 600;
  font-size: 0.75em;

  &::before {
    vertical-align: middle;
    display: inline-block;
    content: url(${plusIcon});
    margin-right: 0.6em;
  }

  &:hover {
    color: black;
  }
`;

class QuestionnaireNav extends Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire.isRequired,
    onAddPage: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onAddSection: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired
  };

  saveSectionNavRef = sectionNav => {
    this.sectionNav = sectionNav;
  };

  handleAddSectionClick = () => {
    const { questionnaire, onAddSection } = this.props;
    onAddSection(questionnaire.id).then(({ id }) =>
      this.sectionNav.scrollSectionIntoView(id)
    );
  };

  handleAddPage = sectionId => {
    const { onAddPage } = this.props;
    onAddPage(sectionId).then(({ section }) =>
      this.sectionNav.scrollSectionIntoView(section.id)
    );
  };

  render() {
    const { questionnaire, onDeletePage, onDeleteSection } = this.props;

    return (
      <Container id="questionnaire-nav">
        <Title>Questionnaire structure</Title>
        <SectionNav
          transitionDuration={200}
          questionnaire={questionnaire}
          onAddPage={this.handleAddPage}
          onDeletePage={onDeletePage}
          onDeleteSection={onDeleteSection}
          ref={this.saveSectionNavRef}
        />
        <AddSection>
          <AddSectionBtn primary onClick={this.handleAddSectionClick}>
            Create new section
          </AddSectionBtn>
        </AddSection>
      </Container>
    );
  }
}

export default QuestionnaireNav;

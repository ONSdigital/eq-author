import React from "react";
import styled from "styled-components";

import { colors } from "constants/theme";
import HoverDeleteButton from "components/QuestionnaireNav/HoverDeleteButton";
import PageNav from "components/QuestionnaireNav/PageNav";
import SectionTitle from "components/QuestionnaireNav/SectionTitle";
import Tooltip from "components/Tooltip";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

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

export const SectionDeleteButton = styled(HoverDeleteButton)`
  top: 0.5em;

  .section-title-wrapper:hover &,
  .section-title-wrapper:focus + &,
  &:focus {
    opacity: 1;
    transform: translateX(0);
  }
`;

const halfDuration = props => props.duration / 2;
const duration = props => props.duration;

const StyledSectionNavItem = styled.li`
  margin: 0;
  padding: 0.5em 0;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid #c3c3c3;
  }

  &.section-enter {
    opacity: 0;
    transform: translateX(-20px);
  }

  &.section-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity ${duration}ms ease-out, transform ${duration}ms ease-out;
  }

  &.section-exit {
    opacity: 1;
    transform: translateX(0);
  }

  &.section-exit-active {
    opacity: 0;
    transform: translateX(-20px);
    height: 0 !important;
    transition: opacity ${halfDuration}ms ease-out,
      transform ${halfDuration}ms ease-out,
      height ${halfDuration}ms ease-in ${halfDuration}ms;
  }
`;

StyledSectionNavItem.propTypes = {
  duration: PropTypes.number.isRequired
};

class SectionNavItem extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    onAddPage: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    section: CustomPropTypes.section.isRequired,
    duration: PropTypes.number.isRequired,
    saveSectionItemRef: PropTypes.func.isRequired
  };

  state = {
    style: {}
  };

  handleAddPage = () => {
    this.props.onAddPage(this.props.section.id);
  };

  handleDeleteSection = () => {
    const { height } = this.elem.getBoundingClientRect();
    const style = { height };

    this.setState({ style }, () =>
      this.props.onDeleteSection(this.props.section.id)
    );
  };

  saveRef = elem => {
    const { section, saveSectionItemRef } = this.props;
    this.elem = elem;
    saveSectionItemRef(section.id, elem);
  };

  render() {
    const { questionnaire, section, onDeletePage, duration } = this.props;

    return (
      <StyledSectionNavItem
        innerRef={this.saveRef}
        style={this.state.style}
        duration={duration}
      >
        <div className="section-title-wrapper">
          <SectionTitle questionnaire={questionnaire} section={section} />
          <Tooltip content="Delete section" offset={{ right: -5 }}>
            <SectionDeleteButton
              type="button"
              aria-label="Delete section"
              onClick={this.handleDeleteSection}
            >
              &times;
            </SectionDeleteButton>
          </Tooltip>
        </div>
        <PageNav
          section={section}
          questionnaire={questionnaire}
          onDelete={onDeletePage}
        />
        <AddPageBtn onClick={this.handleAddPage} id="btn-add-page">
          + Add page
        </AddPageBtn>
      </StyledSectionNavItem>
    );
  }
}

export default SectionNavItem;

import React from "react";
import styled from "styled-components";

import { colors } from "constants/theme";
import HoverDeleteButton from "components/NavigationSidebar/HoverDeleteButton";
import PageNav from "components/NavigationSidebar/PageNav";
import SectionTitle from "components/NavigationSidebar/SectionTitle";
import Tooltip from "components/Tooltip";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

const textInverted = "#E1E1E1";
const navSectionBackground = "#696969";

export const AddPageBtn = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  padding: 1em;
  color: ${textInverted};
  font-weight: bold;
  font-size: 0.75em;
  margin-bottom: 0.35em;
  width: 100%;

  &::before {
    font-size: 1.25em;
    margin-right: 0.6em;
    content: "+";
  }

  &:hover {
    color: ${colors.white};
  }
`;

export const SectionDeleteButton = styled(HoverDeleteButton)`
  top: 0.2em;

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
  position: relative;
  overflow-x: hidden;

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

const SectionTitleWrapper = styled.div`
  background: ${navSectionBackground};
  padding: 0.35em;
  display: flex;
  align-items: center;
`;

class SectionNavItem extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    onAddPage: PropTypes.func.isRequired,
    onDeleteSection: PropTypes.func.isRequired,
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

  handleDeleteFocus = _ => {
    this.elem.scrollLeft = 0;
  };

  render() {
    const { questionnaire, section, duration } = this.props;

    return (
      <StyledSectionNavItem
        innerRef={this.saveRef}
        style={this.state.style}
        duration={duration}
      >
        <SectionTitleWrapper className="section-title-wrapper">
          <SectionTitle questionnaire={questionnaire} section={section} />
          <Tooltip content="Delete section" offset={{ right: -5 }}>
            <SectionDeleteButton
              type="button"
              aria-label="Delete section"
              onClick={this.handleDeleteSection}
              onFocus={this.handleDeleteFocus}
            >
              &times;
            </SectionDeleteButton>
          </Tooltip>
        </SectionTitleWrapper>
        <PageNav section={section} questionnaire={questionnaire} />
        <AddPageBtn onClick={this.handleAddPage} id="btn-add-page">
          Add question
        </AddPageBtn>
      </StyledSectionNavItem>
    );
  }
}

export default SectionNavItem;

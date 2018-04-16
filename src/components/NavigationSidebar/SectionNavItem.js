import React from "react";
import styled from "styled-components";

import { colors } from "constants/theme";
import PageNav from "components/NavigationSidebar/PageNav";
import SectionNavLink from "components/NavigationSidebar/SectionNavLink";
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
  display: flex;
  align-items: center;
`;

class SectionNavItem extends React.Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    onAddPage: PropTypes.func.isRequired,
    section: CustomPropTypes.section.isRequired,
    duration: PropTypes.number.isRequired,
    saveSectionItemRef: PropTypes.func.isRequired
  };

  handleAddPage = () => {
    const { section, onAddPage } = this.props;
    onAddPage(section.id, section.pages.length);
  };

  saveRef = elem => {
    const { section, saveSectionItemRef } = this.props;
    saveSectionItemRef(section.id, elem);
  };

  render() {
    const { questionnaire, section, duration, ...otherProps } = this.props;

    return (
      <StyledSectionNavItem
        innerRef={this.saveRef}
        duration={duration}
        {...otherProps}
        data-test="section-item"
      >
        <SectionTitleWrapper>
          <SectionNavLink questionnaire={questionnaire} section={section} />
        </SectionTitleWrapper>
        <PageNav section={section} questionnaire={questionnaire} />
        <AddPageBtn onClick={this.handleAddPage} data-test="btn-add-page">
          Add question
        </AddPageBtn>
      </StyledSectionNavItem>
    );
  }
}

export default SectionNavItem;

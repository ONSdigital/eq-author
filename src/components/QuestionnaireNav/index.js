import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { colors } from "constants/theme";
import SectionNav from "components/QuestionnaireNav/SectionNav";
import plusIcon from "./icon-plus.svg";
import IconButton from "components/IconButton";
import homeIcon from "./icon-home.svg";
import settingsIcon from "./icon-cog.svg";
import SVG from "react-inlinesvg";

const navBackground = "#4A4A4A";
const textInverted = "#E1E1E1";

const Container = styled.div`
  background: ${navBackground};
  color: ${textInverted};
  flex: 1;
`;

const AddSection = styled.div`
  background: ${navBackground};
  border-top: 1px solid #c3c3c3;
  padding: 0;
  position: sticky;
  z-index: 99999;
  bottom: 0;
  left: 0;
`;

export const AddSectionBtn = styled(IconButton)`
  cursor: pointer;
  background: none;
  border: none;
  padding: 1em 0.6em;
  font-weight: 600;
  font-size: 0.75rem;
  color: ${textInverted};

  &:hover {
    color: ${colors.white};
  }
`;

const NavTopBarIconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  margin: 0;
  background: ${navBackground};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  border-bottom: 1px solid #c3c3c3;

  & > li {
    list-style: none;
  }

  & a,
  & a:link,
  & a:visited {
    color: ${textInverted};
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  & a:hover {
    color: ${colors.white};
  }

  & li:nth-child(2) a svg {
    margin-left: 0.5em;
  }
`;

const SettingsLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  line-height: 1em;
  height: 1em;

  &:link,
  &:visited {
    color: ${textInverted};
  }

  &:hover,
  &:focus {
    color: ${colors.white};
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
        <NavTopBarIconList>
          <li>
            <a href="/">
              <SVG src={homeIcon} />
            </a>
          </li>
          <li>
            <SettingsLink href="/">
              Settings
              <SVG src={settingsIcon} />
            </SettingsLink>
          </li>
        </NavTopBarIconList>
        <SectionNav
          transitionDuration={200}
          questionnaire={questionnaire}
          onAddPage={this.handleAddPage}
          onDeletePage={onDeletePage}
          onDeleteSection={onDeleteSection}
          ref={this.saveSectionNavRef}
        />
        <AddSection>
          <AddSectionBtn
            icon={plusIcon}
            clear
            onClick={this.handleAddSectionClick}
            highlightOnHover={false}
          >
            Create new section
          </AddSectionBtn>
        </AddSection>
      </Container>
    );
  }
}

export default QuestionnaireNav;

import React from "react";
import styled from "styled-components";
import homeIcon from "./icon-home.svg";
import settingsIcon from "./icon-cog.svg";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";
import VisuallyHidden from "components/VisuallyHidden";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";
import IconButton from "components/IconButton";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

const IconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75em;
  margin: 0;
  z-index: 9999;
  border-bottom: 1px solid #c3c3c3;
  flex: 0 0 auto;

  & > li {
    display: flex;
    align-items: center;
  }
`;

export const SettingsButton = styled(IconButton)`
  padding: 0;
  flex-direction: row-reverse;

  & svg {
    margin-left: 0.5em;
  }
`;

class NavigationHeader extends React.Component {
  state = {
    isModalOpen: false
  };

  handleModalOpen = () => this.setState({ isModalOpen: true });
  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    const { onUpdateQuestionnaire, questionnaire } = this.props;

    return (
      <IconList>
        <li>
          <Link to="/">
            <VisuallyHidden>Home</VisuallyHidden>
            <SVG uniqueHash="home-icon" src={homeIcon} />
          </Link>
        </li>
        <li>
          <SettingsButton
            clear
            onClick={this.handleModalOpen}
            highlightOnHover={false}
            icon={settingsIcon}
          >
            Settings
          </SettingsButton>
          <QuestionnaireSettingsModal
            isOpen={this.state.isModalOpen}
            onClose={this.handleModalClose}
            questionnaire={questionnaire}
            onSubmit={onUpdateQuestionnaire}
            confirmText="Apply"
          />
        </li>
      </IconList>
    );
  }
}

NavigationHeader.propTypes = {
  onUpdateQuestionnaire: PropTypes.func.isRequired,
  questionnaire: CustomPropTypes.questionnaire.isRequired
};

export default NavigationHeader;

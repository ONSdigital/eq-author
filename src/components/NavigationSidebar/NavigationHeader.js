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
import { colors } from "constants/theme";
import pipeP from "utils/pipeP";

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

const SettingsButton = styled(IconButton)`
  padding: 0;
  flex-direction: row-reverse;
  font-size: 0.75em;
  font-weight: bold;

  &:focus {
    outline-width: initial;
  }

  &:focus,
  &:hover {
    color: ${colors.white};
  }

  & svg {
    margin-left: 0.25em;
    margin-right: 0;
  }
`;

class NavigationHeader extends React.Component {
  static propTypes = {
    onUpdateQuestionnaire: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire.isRequired
  };

  state = {
    isModalOpen: false
  };

  handleModalOpen = () => this.setState({ isModalOpen: true });
  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    const { questionnaire, onUpdateQuestionnaire } = this.props;

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
            data-test="settings-btn"
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
            onSubmit={pipeP(onUpdateQuestionnaire, this.handleModalClose)}
            confirmText="Apply"
          />
        </li>
      </IconList>
    );
  }
}

export default NavigationHeader;

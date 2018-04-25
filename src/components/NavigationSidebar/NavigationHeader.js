import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import HomeIcon from "./icon-home.svg?inline";
import SettingsIcon from "./icon-cog.svg?inline";

import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";
import Button from "components/Button";
import RouteButton from "components/Button/RouteButton";
import IconText from "components/IconText";

import pipeP from "utils/pipeP";

const IconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2em;
  margin: 0;
  z-index: 9999;
  border-bottom: 1px solid #c3c3c3;
  flex: 0 0 auto;

  & > li {
    display: flex;
    align-items: center;
  }
`;

const HomeIconLink = styled(HomeIcon)`
  vertical-align: middle;
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
          <RouteButton variant="tertiary-light" small to="/">
            <IconText icon={HomeIconLink} hideText>
              Home
            </IconText>
          </RouteButton>
        </li>
        <li>
          <Button
            data-test="settings-btn"
            variant="tertiary-light"
            small
            onClick={this.handleModalOpen}
            highlightOnHover={false}
          >
            <IconText icon={SettingsIcon}>Settings</IconText>
          </Button>
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

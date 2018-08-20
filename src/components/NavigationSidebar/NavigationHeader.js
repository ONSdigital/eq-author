import React, { Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CustomPropTypes from "custom-prop-types";
import HomeIcon from "./icon-home.svg?inline";
import SettingsIcon from "./icon-cog.svg?inline";

import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";
import Button from "components/Button";
import RouteButton from "components/Button/RouteButton";
import IconText from "components/IconText";
import gql from "graphql-tag";

import pipeP from "utils/pipeP";
import AddMenu from "./AddMenu";

const IconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  z-index: 9999;
  flex: 1 1 auto;
`;

const IconListItem = styled.li`
  display: flex;
  align-items: center;
`;

const HomeIconLink = styled(HomeIcon)`
  vertical-align: middle;
`;

const NavigationHeaderRow = styled.div`
  border-bottom: 1px solid #c3c3c3;
  padding: 0.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledAddMenu = styled(AddMenu)`
  margin-left: auto;
`;

class NavigationHeader extends React.Component {
  static propTypes = {
    onUpdateQuestionnaire: PropTypes.func.isRequired,
    onAddPage: PropTypes.func.isRequired,
    onAddSection: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire.isRequired
  };

  state = {
    isModalOpen: false,
    addMenuOpen: false
  };

  handleModalOpen = () => this.setState({ isModalOpen: true });

  handleModalClose = () => this.setState({ isModalOpen: false });

  handleAddMenuToggle = () =>
    this.setState({ addMenuOpen: !this.state.addMenuOpen });

  handleAddPage = () => {
    this.props.onAddPage();
    this.handleAddMenuToggle();
  };

  handleAddSection = () => {
    this.props.onAddSection();
    this.handleAddMenuToggle();
  };

  render() {
    const { questionnaire, onUpdateQuestionnaire } = this.props;

    return (
      <Fragment>
        <NavigationHeaderRow>
          <IconList>
            <IconListItem>
              <RouteButton variant="tertiary-light" small to="/">
                <IconText icon={HomeIconLink} hideText>
                  Home
                </IconText>
              </RouteButton>
            </IconListItem>
            <IconListItem>
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
                onSubmit={pipeP(
                  onUpdateQuestionnaire,
                  this.handleModalClose
                )}
                confirmText="Apply"
              />
            </IconListItem>
          </IconList>
        </NavigationHeaderRow>
        <NavigationHeaderRow>
          <StyledAddMenu
            addMenuOpen={this.state.addMenuOpen}
            onAddMenuToggle={this.handleAddMenuToggle}
            onAddPage={this.handleAddPage}
            onAddSection={this.handleAddSection}
            data-test="add-menu"
          />
        </NavigationHeaderRow>
      </Fragment>
    );
  }
}

NavigationHeader.fragments = {
  NavigationHeader: gql`
    fragment NavigationHeader on Questionnaire {
      ...QuestionnaireSettingsModal
    }

    ${QuestionnaireSettingsModal.fragments.QuestionnaireSettingsModal}
  `
};

export default NavigationHeader;

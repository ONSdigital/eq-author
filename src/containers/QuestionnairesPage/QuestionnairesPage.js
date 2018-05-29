import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { CenteredPanel } from "components/Panel";
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";
import QuestionnairesTable from "./QuestionnairesTable";
import MainCanvas from "components/MainCanvas";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 0 0 1em;
`;

const StyledCenteredPanel = styled(CenteredPanel)`
  padding: 0;
`;

class QuestionnairesPage extends React.Component {
  state = {
    isModalOpen: false
  };

  handleModalOpen = () => this.setState({ isModalOpen: true });
  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    const { onCreateQuestionnaire, loading, ...props } = this.props;

    return (
      <BaseLayout
        title={"Your Questionnaires"}
        docTitle={"Your Questionnaires"}
      >
        <MainCanvas>
          <StyledButtonGroup horizontal>
            <Button
              onClick={this.handleModalOpen}
              primary
              data-test="create-questionnaire"
            >
              Create
            </Button>
            <QuestionnaireSettingsModal
              isOpen={this.state.isModalOpen}
              onClose={this.handleModalClose}
              onSubmit={onCreateQuestionnaire}
              confirmText="Create"
            />
          </StyledButtonGroup>
          <StyledCenteredPanel>
            {!loading && <QuestionnairesTable {...props} />}
          </StyledCenteredPanel>
        </MainCanvas>
      </BaseLayout>
    );
  }
}

QuestionnairesPage.propTypes = {
  loading: PropTypes.bool,
  questionnaires: CustomPropTypes.questionnaireList,
  onCreateQuestionnaire: PropTypes.func.isRequired,
  onDeleteQuestionnaire: PropTypes.func.isRequired
};

export default QuestionnairesPage;

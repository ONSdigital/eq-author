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
import ModalTrigger from "components/ModalTrigger";

const StyledButtonGroup = styled(ButtonGroup)`
  margin: 0 0 1em;
`;

const StyledCenteredPanel = styled(CenteredPanel)`
  padding: 0;
`;

const Questionnaires = props => {
  const title = "Your Questionnaires";
  const onCreateQuestionnaire = props.createQuestionnaire;

  return (
    <BaseLayout title={title} docTitle={title}>
      <MainCanvas>
        <ModalTrigger>
          {({ isOpen, onClose, onOpen }) => (
            <StyledButtonGroup horizontal>
              <Button onClick={onOpen} id="btn-create-questionnaire" primary>
                Create
              </Button>
              <QuestionnaireSettingsModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onCreateQuestionnaire}
              />
            </StyledButtonGroup>
          )}
        </ModalTrigger>
        <StyledCenteredPanel>
          {!props.loading && <QuestionnairesTable {...props} />}
        </StyledCenteredPanel>
      </MainCanvas>
    </BaseLayout>
  );
};

Questionnaires.propTypes = {
  loading: PropTypes.bool,
  questionnaires: CustomPropTypes.questionnaireList,
  createQuestionnaire: PropTypes.func.isRequired
};

export default Questionnaires;

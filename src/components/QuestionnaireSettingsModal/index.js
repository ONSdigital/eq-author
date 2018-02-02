import React from "react";
import ModalDialog from "components/ModalDialog";
import Modal from "components/Modal";
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";
import styled from "styled-components";
import DialogHeader from "components/Dialog/DialogHeader";
import DialogMessage from "components/Dialog/DialogMessage";
import PropTypes from "prop-types";
import QuestionnaireMeta from "components/QuestionnaireMeta";
import CustomPropTypes from "custom-prop-types";
import { colors } from "constants/theme";

const noop = () => {};

const defaultQuestionnaire = {
  title: "",
  description: "",
  surveyId: "",
  theme: "default",
  legalBasis: "StatisticsOfTradeAct",
  navigation: false
};

const CenteredDialogMessage = styled(DialogMessage)`
  text-align: center;
`;

const QuestionnaireSettingsModal = ({
  questionnaire,
  isOpen,
  onClose,
  onSubmit
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <DialogHeader>
      <CenteredDialogMessage heading="Questionnaire settings" />
    </DialogHeader>

    <QuestionnaireMeta
      questionnaire={questionnaire}
      onSubmit={onSubmit}
      onUpdate={noop}
    >
      <ButtonGroup horizontal align="right">
        <Button onClick={onClose} secondary type="button">
          Cancel
        </Button>
        <Button type="submit" primary>
          Create
        </Button>
      </ButtonGroup>
    </QuestionnaireMeta>
  </Modal>
);

QuestionnaireSettingsModal.propTypes = {
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  questionnaire: CustomPropTypes.questionnaire
};

QuestionnaireSettingsModal.defaultProps = {
  questionnaire: defaultQuestionnaire
};

export default QuestionnaireSettingsModal;

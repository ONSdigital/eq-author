import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BaseLayout from "components/BaseLayout";
import { noop } from "lodash";

import QuestionnaireMeta from "components/QuestionnaireMeta";
import Button from "components/Button";
import LinkButton from "components/LinkButton";
import ButtonGroup from "components/ButtonGroup";
import MainCanvas from "components/MainCanvas";

const ActionButtonGroup = styled(ButtonGroup)`align-self: flex-start;`;

const defaultQuestionnaire = {
  title: "",
  description: "",
  surveyId: "",
  theme: "default",
  legalBasis: "StatisticsOfTradeAct",
  navigation: false
};

class QuestionnaireCreatePage extends Component {
  static propTypes = {
    createQuestionnaire: PropTypes.func.isRequired
  };

  handleSubmit = questionnaire => {
    this.props.createQuestionnaire(questionnaire);
  };

  render() {
    const title = "Create a Questionnaire";
    return (
      <BaseLayout title={title} docTitle={title}>
        <MainCanvas>
          <QuestionnaireMeta
            questionnaire={defaultQuestionnaire}
            onSubmit={this.handleSubmit}
            onUpdate={noop}
          >
            <ActionButtonGroup horizontal>
              <Button type="submit" primary>
                Create
              </Button>
              <LinkButton to="/" secondary>
                Cancel
              </LinkButton>
            </ActionButtonGroup>
          </QuestionnaireMeta>
        </MainCanvas>
      </BaseLayout>
    );
  }
}

export default QuestionnaireCreatePage;

import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BaseLayout from "components/BaseLayout";
import { noop } from "lodash";

import QuestionnaireMeta from "components/QuestionnaireMeta";
import Button from "components/Button";
import LinkButton from "components/LinkButton";
import ButtonGroup from "components/ButtonGroup";

const ActionButtonGroup = styled(ButtonGroup)`
  align-self: flex-start;
`;

const Center = styled.div`
  margin: 0 auto;
  max-width: 40em;
  width: 100%;
`;

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
    return (
      <BaseLayout title="Create a Questionnaire">
        <Center>
          <QuestionnaireMeta
            questionnaire={defaultQuestionnaire}
            onChange={this.handleChange}
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
        </Center>
      </BaseLayout>
    );
  }
}

export default QuestionnaireCreatePage;

import React, { Component } from "react";
import PropTypes from "prop-types";
import BaseLayout from "components/BaseLayout";
import { noop } from "lodash";

import QuestionnaireMeta from "components/QuestionnaireMeta";
import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";

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
        <ScrollPane>
          <MainCanvas>
            <QuestionnaireMeta
              questionnaire={defaultQuestionnaire}
              onSubmit={this.handleSubmit}
              onUpdate={noop}
              confirmText="Create"
            />
          </MainCanvas>
        </ScrollPane>
      </BaseLayout>
    );
  }
}

export default QuestionnaireCreatePage;

/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BaseLayout from "components/BaseLayout";
import { merge, set } from "lodash";

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

class QuestionnaireCreatePage extends Component {
  static propTypes = {
    createQuestionnaire: PropTypes.func.isRequired,
    createSection: PropTypes.func.isRequired,
    createPage: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      questionnaire: {
        title: "",
        description: "",
        surveyId: "",
        theme: "default",
        legalBasis: "StatisticsOfTradeAct",
        navigation: false
      }
    };
  }

  componentWillReceiveProps({ questionnaire }) {
    this.setState(questionnaire);
  }

  handleChange = change => {
    this.setState(merge({}, this.state, set({}, change.name, change.value)));
  };

  handleSubmit = e => {
    e.preventDefault();

    const { createQuestionnaire, createSection, createPage } = this.props;

    // TODO: clean all this up when API assumes responsibility of creating initial Section and Page
    return createQuestionnaire(this.state.questionnaire)
      .then(({ data }) =>
        createSection({
          title: "",
          description: "",
          questionnaireId: data.createQuestionnaire.id
        }).then(result =>
          Object.assign({}, result.data.createSection, {
            questionnaireId: data.createQuestionnaire.id
          })
        )
      )
      .then(data =>
        createPage({
          title: "",
          description: "",
          sectionId: data.id,
          type: "General",
          questionnaireId: data.questionnaireId
        })
      );
  };

  render() {
    return (
      <BaseLayout title={"Create a Questionnaire"}>
        <Center>
          <QuestionnaireMeta
            questionnaire={this.state}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
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
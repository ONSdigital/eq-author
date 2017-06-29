/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BaseLayout from "components/BaseLayout";

import QuestionnaireMeta from "components/QuestionnaireMeta";
import Button from "components/Button";
import LinkButton from "components/LinkButton";
import ButtonGroup from "components/ButtonGroup";

const ActionButtonGroup = styled(ButtonGroup)`
  align-self: flex-start;
`;

export class QuestionnaireCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      surveyId: "",
      theme: "default",
      legalBasis: "StatisticsOfTradeAct",
      navigation: false
    };
  }

  componentWillReceiveProps({ questionnaire }) {
    this.setState(questionnaire);
  }

  handleChange = value => this.setState(value);

  handleSubmit = e => {
    e.preventDefault();

    return this.props.createQuestionnaire(this.state).then(({ data }) => {
      this.props.history.push(
        `/questionnaire/${data.createQuestionnaire.id}/design`
      );
    });
  };

  render() {
    return (
      <BaseLayout title={"Create a Questionnaire"} hasNav={false}>
        <QuestionnaireMeta
          questionnaire={this.state}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >

          <ActionButtonGroup horizontal>
            <Button type="submit" primary>Create</Button>
            <LinkButton to="/" secondary>Cancel</LinkButton>
          </ActionButtonGroup>

        </QuestionnaireMeta>
      </BaseLayout>
    );
  }
}

QuestionnaireCreatePage.propTypes = {
  history: PropTypes.object, // eslint-disable-line
  createQuestionnaire: PropTypes.func.isRequired
};

export default QuestionnaireCreatePage;

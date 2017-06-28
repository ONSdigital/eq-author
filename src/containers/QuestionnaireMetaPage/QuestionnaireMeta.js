/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

import BaseLayout from "components/BaseLayout";
import QuestionnaireMeta from "components/QuestionnaireMeta";

const Center = styled.div`
  margin: 2em 0;
`;

export class QuestionnaireMetaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  componentWillReceiveProps({ questionnaire }) {
    this.setState(questionnaire);
  }

  handleChange = value => this.setState(value);

  handleBlur = e => this.props.onUpdate(this.state);

  handleSubmit = e => e.preventDefault();

  render() {
    const { loading, questionnaire } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <BaseLayout
        breadcrumb={{ path: window.location.href, title: this.state.title }}
      >
        <Center>
          <QuestionnaireMeta
            loading={loading}
            questionnaire={questionnaire}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onSubmit={this.handleSubmit}
          />
        </Center>
      </BaseLayout>
    );
  }
}

QuestionnaireMetaPage.propTypes = {
  history: PropTypes.object, // eslint-disable-line
  loading: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  questionnaire: PropTypes.shape({
    description: PropTypes.string.isRequired,
    legalBasis: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export default QuestionnaireMetaPage;

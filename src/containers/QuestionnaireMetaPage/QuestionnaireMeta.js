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

  onChange = value => {
    this.setState(value);
  };

  onBlur = e => {
    this.props.onUpdate(this.state);
  };

  onSubmit = e => e.preventDefault();

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
            handleChange={this.onChange}
            handleBlur={this.onBlur}
            handleSubmit={this.onSubmit}
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

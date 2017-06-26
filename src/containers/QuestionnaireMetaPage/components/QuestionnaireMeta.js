/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import QuestionnaireMeta from "components/QuestionnaireMeta";

export class QuestionnaireMetaPage extends Component {
  componentWillReceiveProps({ questionnaire }) {
    this.setState(questionnaire);
  }

  onChange = value => {
    this.setState(value);
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push("/questionnaire/design");
  };

  handleBlur = e => {
    this.props.onUpdate(this.state);
  };

  render() {
    const { loading, questionnaire } = this.props;

    return (
      <QuestionnaireMeta
        loading={loading}
        questionnaire={questionnaire}
        handleChange={this.onChange}
        handleSubmit={this.onSubmit}
      />
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

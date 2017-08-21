import React, { Component } from "react";
import PropTypes from "prop-types";
import { merge, set, noop, find, isNil } from "lodash";

import CustomPropTypes from "custom-prop-types";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";
import QuestionnaireDesign from "components/QuestionnaireDesign";
import QuestionnaireNav from "components/QuestionnaireNav";

export class QuestionnaireDesignPage extends Component {
  static propTypes = {
    breadcrumb: CustomPropTypes.breadcrumb,
    onAddPage: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onAddSection: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    onSectionUpdate: PropTypes.func.isRequired,
    onPageUpdate: PropTypes.func.isRequired,
    onAnswerUpdate: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    answers: PropTypes.arrayOf(PropTypes.object),
    question: CustomPropTypes.question,
    loading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    const { section, page, answers } = props;

    this.state = {
      section,
      page,
      answers,
      focused: "section"
    };
  }

  componentWillReceiveProps({ section, page, answers }) {
    this.setState({ section, page, answers });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isNil(nextState.page);
  }

  handleChange = change => {
    this.setState(merge({}, this.state, set({}, change.name, change.value)));
  };

  handleAddAnswer = type => {
    this.props.onAddAnswer(type);
  };

  handleDeleteAnswer = answerId => {
    this.props.onDeleteAnswer(answerId);
  };

  handleBlur = focused => {
    this.setFocused(focused);

    if (/section/.test(this.state.focused)) {
      this.props.onSectionUpdate(this.state.section);
    } else if (/page/.test(this.state.focused)) {
      this.props.onPageUpdate(this.state.page);
    } else if (/answer/.test(this.state.focused)) {
      const answerId = this.state.focused.split("answer-")[1];
      this.props.onAnswerUpdate(
        find(this.state.answers, { id: parseInt(answerId, 10) })
      );
    }
  };

  handleFocus = focused => {
    this.setFocused(focused);
  };

  handleAddPage = sectionId => {
    this.props.onAddPage(sectionId);
  };

  handleAddSection = () => {
    this.props.onAddSection(this.props.questionnaire.id);
  };

  setFocused = focused => {
    if (focused === null) {
      return;
    }

    if (focused !== this.state.focused) {
      this.setState({ focused });
    }
  };

  render() {
    const { breadcrumb, loading, questionnaire, onDeletePage } = this.props;
    const { section, page, answers, focused } = this.state;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout breadcrumb={breadcrumb} questionnaire={questionnaire}>
        <Grid align="top">
          <Column cols={2} gutters={false}>
            <QuestionnaireNav
              questionnaire={questionnaire}
              onAddPage={this.handleAddPage}
              onAddSection={this.handleAddSection}
              onDeletePage={onDeletePage}
            />
          </Column>
          <Column gutters={false}>
            <QuestionnaireDesign
              section={section}
              page={page}
              answers={answers}
              focused={focused}
              onAddAnswer={this.handleAddAnswer}
              onDeleteAnswer={this.handleDeleteAnswer}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </Column>
          <Column cols={2} gutters={false}>
            <PropertyPane>
              <PropertyPaneTitle>Question properties</PropertyPaneTitle>
              <QuestionProperties question={page} onSubmit={noop} />
            </PropertyPane>
          </Column>
        </Grid>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;

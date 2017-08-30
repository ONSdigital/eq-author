import React, { Component } from "react";
import PropTypes from "prop-types";
import { merge, set, noop, find, isNil } from "lodash";

import CustomPropTypes from "custom-prop-types";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";
import QuestionnaireDesign from "components/QuestionnaireDesign";

import QuestionnaireNavContainer from "containers/QuestionnaireNavContainer";

export class QuestionnaireDesignPage extends Component {
  static propTypes = {
    breadcrumb: CustomPropTypes.breadcrumb,
    onAddPage: PropTypes.func.isRequired,
    onAddSection: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onAddAnswer: PropTypes.func.isRequired,
    onUpdateSection: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    onUpdateAnswer: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    onDeletePage: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onDeleteAnswer: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    answers: PropTypes.arrayOf(CustomPropTypes.answer),
    question: CustomPropTypes.question,
    loading: PropTypes.bool.isRequired,
    match: CustomPropTypes.match
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
    return this.setState(
      merge({}, this.state, set({}, change.name, change.value))
    );
  };

  handleAddAnswer = type => {
    return this.props.onAddAnswer(type);
  };

  handleDeleteAnswer = answerId => {
    return this.props.onDeleteAnswer(answerId);
  };

  handleBlur = () => {
    const { focused, section, page, answers } = this.state;
    let answerId, answer, optionId, option;

    if (focused) {
      answerId = focused.split("-")[1];
      answer = find(answers, {
        id: parseInt(answerId, 10)
      });
    }

    if (/section/.test(focused)) {
      this.props.onUpdateSection(section);
    } else if (/page/.test(focused)) {
      this.props.onUpdatePage(page);
    } else if (/option/.test(focused)) {
      if (answer) {
        optionId = focused.split("-")[3];
        option = find(answer.options, {
          id: parseInt(optionId, 10)
        });
        this.props.onUpdateOption(option);
      }
    } else if (/answer/.test(focused)) {
      if (answer) {
        this.props.onUpdateAnswer(answer);
      }
    }
  };

  handleFocus = focused => {
    this.setFocused(focused);
  };

  setFocused = focused => {
    if (focused !== this.state.focused) {
      this.setState({ focused });
    }
  };

  render() {
    const {
      breadcrumb,
      loading,
      questionnaire,
      onAddOption,
      onDeleteOption
    } = this.props;

    const { section, page, answers, focused } = this.state;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout breadcrumb={breadcrumb} questionnaire={questionnaire}>
        <Grid align="top">
          <Column cols={2} gutters={false}>
            <QuestionnaireNavContainer
              questionnaireId={this.props.match.params.questionnaireId}
              pageId={this.props.match.params.pageId}
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
              onAddOption={onAddOption}
              onDeleteOption={onDeleteOption}
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

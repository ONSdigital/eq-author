import React, { Component } from "react";
import PropTypes from "prop-types";
import { merge, set, noop, find, isNil } from "lodash";

import CustomPropTypes from "custom-prop-types";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";
import EditingSurface from "components/EditingSurface";

import QuestionnaireNavContainer from "containers/QuestionnaireNavContainer";

export class QuestionnaireDesignPage extends Component {
  static propTypes = {
    breadcrumb: CustomPropTypes.breadcrumb,
    onUpdateSection: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    onUpdateAnswer: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
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

    const { answers } = props;

    this.state = {
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

  handleBlur = () => {
    const { focused, answers } = this.state;
    let answerId, answer, optionId, option;

    if (focused) {
      answerId = focused.split("-")[1];
      answer = find(answers, {
        id: parseInt(answerId, 10)
      });
    }

    if (/option/.test(focused)) {
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
    const { breadcrumb, loading, questionnaire } = this.props;

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
            <EditingSurface
              section={section}
              page={page}
              answers={answers}
              focused={focused}
              onUpdatePage={this.props.onUpdatePage}
              onUpdateSection={this.props.onUpdateSection}
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

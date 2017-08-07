import React, { Component } from "react";
import PropTypes from "prop-types";
import { merge, set, noop, isNil } from "lodash";

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
    onSectionUpdate: PropTypes.func.isRequired,
    onPageUpdate: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    question: CustomPropTypes.question,
    loading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    const { section, page } = props;

    this.state = {
      section,
      page,
      focused: "section"
    };
  }

  componentWillReceiveProps({ section, page }) {
    this.setState({ section, page });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isNil(nextState.page);
  }

  handleChange = change => {
    this.setState(merge({}, this.state, set({}, change.name, change.value)));
  };

  handleAnswerAdd = type => {
    this.props.onAddAnswer("TextField");
  };

  handleBlur = focused => {
    this.setFocused(focused);

    switch (this.state.focused) {
      case "section":
        this.props.onSectionUpdate(this.state.section);
        break;
      case "page":
        this.props.onPageUpdate(this.state.page);
        break;
      default:
        break;
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
    const { section, page, focused } = this.state;

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
              focused={focused}
              onAnswerAdd={this.handleAnswerAdd}
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

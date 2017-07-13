import React, { Component } from "react";
import PropTypes from "prop-types";
import { merge, set, noop } from "lodash";
import CustomPropTypes from "custom-prop-types";

import withQuestionnaire from "components/WithQuestionnaire";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";
import QuestionnaireDesign from "components/QuestionnaireDesign";

export class QuestionnaireDesignPage extends Component {
  static propTypes = {
    breadcrumb: CustomPropTypes.breadcrumb,
    onSubmit: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    question: CustomPropTypes.question
  };

  constructor(props) {
    super(props);

    const { section } = props;

    this.state = {
      section,
      page: {
        title: "",
        description: "",
        guidance: "",
        type: "General"
      },
      focused: "section"
    };
  }

  handleChange = change => {
    this.setState(merge({}, this.state, set({}, change.name, change.value)));
  };

  handleAnswerAdd = () => {
    alert("add an answer to this parent");
  };

  handleBlur = canvasSectionName => {
    this.setFocused(canvasSectionName);
    this.props.onUpdate(this.state);
  };

  handleFocus = canvasSectionName => {
    this.setFocused(canvasSectionName);
  };

  setFocused = canvasSectionName => {
    if (canvasSectionName !== this.state.focused) {
      this.setState({ focused: canvasSectionName });
    }
  };

  render() {
    const { breadcrumb, onSubmit, questionnaire } = this.props;
    const { section, page, focused } = this.state;

    return (
      <BaseLayout breadcrumb={breadcrumb} questionnaire={questionnaire}>
        <Grid align="top">
          <Column cols={2} gutters={false}>
            Sidebar
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
              onSubmit={onSubmit}
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

export default withQuestionnaire(QuestionnaireDesignPage);

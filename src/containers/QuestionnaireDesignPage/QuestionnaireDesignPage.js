import React, { Component } from "react";
import PropTypes from "prop-types";
import { noop, isNil } from "lodash";

import CustomPropTypes from "custom-prop-types";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";
import EditorSurface from "components/EditorSurface";

import QuestionnaireNavContainer from "containers/QuestionnaireNavContainer";

export class QuestionnaireDesignPage extends Component {
  static propTypes = {
    onUpdateSection: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    questionnaireId: PropTypes.string,
    section: CustomPropTypes.section,
    page: CustomPropTypes.page,
    pageId: PropTypes.string,
    breadcrumb: CustomPropTypes.breadcrumb,
    loading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      focused: "section"
    };
  }

  shouldComponentUpdate(nextProps) {
    return !isNil(nextProps.page);
  }

  handleBlur = () => {};

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
      section,
      page,
      questionnaireId,
      pageId,
      onUpdatePage,
      onUpdateSection
    } = this.props;

    const { focused } = this.state;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout breadcrumb={breadcrumb} questionnaire={questionnaire}>
        <Grid align="top">
          <Column cols={2} gutters={false}>
            <QuestionnaireNavContainer
              questionnaireId={questionnaireId}
              pageId={pageId}
            />
          </Column>
          <Column gutters={false}>
            <EditorSurface
              section={section}
              page={page}
              focused={focused}
              onUpdatePage={onUpdatePage}
              onUpdateSection={onUpdateSection}
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

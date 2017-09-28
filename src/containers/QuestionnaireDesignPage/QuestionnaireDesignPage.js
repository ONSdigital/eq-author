import React, { Component } from "react";
import PropTypes from "prop-types";

import { isNil } from "lodash";
import CustomPropTypes from "custom-prop-types";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import MainCanvas from "components/MainCanvas";

import EditorSurface from "components/EditorSurface";

import QuestionnaireNavContainer from "containers/QuestionnaireNavContainer";

export class QuestionnaireDesignPage extends Component {
  static propTypes = {
    onUpdateSection: PropTypes.func.isRequired,
    onUpdatePage: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    questionnaireId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired,
    page: CustomPropTypes.page,
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

  handleFocus = focused => {
    if (focused !== this.state.focused) {
      this.setState({ focused });
    }
  };

  getMetaTitle = () => {
    const { questionnaire, page } = this.props;

    return page.title
      ? `${page.title} - ${questionnaire.title}`
      : `${questionnaire.title}`;
  };

  render() {
    const {
      breadcrumb,
      loading,
      questionnaire,
      section,
      page,
      questionnaireId,
      sectionId,
      pageId,
      onUpdatePage,
      onUpdateSection
    } = this.props;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout
        breadcrumb={breadcrumb}
        questionnaire={questionnaire}
        docTitle={this.getMetaTitle()}
      >
        <Grid align="top">
          <Column cols={2} gutters={false}>
            <QuestionnaireNavContainer
              questionnaire={questionnaire}
              questionnaireId={questionnaireId}
              sectionId={sectionId}
              pageId={pageId}
            />
          </Column>
          <Column gutters={false}>
            <MainCanvas>
              <EditorSurface
                section={section}
                page={page}
                onUpdatePage={onUpdatePage}
                onUpdateSection={onUpdateSection}
                focused={this.state.focused}
                onFocus={this.handleFocus}
              />
            </MainCanvas>
          </Column>
          <Column cols={2} gutters={false} />
        </Grid>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;

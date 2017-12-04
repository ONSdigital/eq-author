import React, { Component } from "react";
import PropTypes from "prop-types";
import { isNil } from "lodash";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";
import EditorSurface from "components/EditorSurface";
import QuestionnaireNavContainer from "containers/QuestionnaireNavContainer";
import getTextFromHTML from "utils/getTextFromHTML";
import ConnectedPropertiesPanel from "components/PropertiesPanel";

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

  shouldComponentUpdate(nextProps) {
    return !isNil(nextProps.section) && !isNil(nextProps.page);
  }

  getMetaTitle = () => {
    const { questionnaire, page } = this.props;
    const pageTitle = getTextFromHTML(page.title);

    return pageTitle
      ? `${pageTitle} - ${questionnaire.title}`
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
            <ScrollPane>
              <QuestionnaireNavContainer
                questionnaire={questionnaire}
                questionnaireId={questionnaireId}
                sectionId={sectionId}
                pageId={pageId}
              />
            </ScrollPane>
          </Column>
          <Column gutters={false}>
            <ScrollPane>
              <MainCanvas>
                <EditorSurface
                  section={section}
                  page={page}
                  onUpdatePage={onUpdatePage}
                  onUpdateSection={onUpdateSection}
                />
              </MainCanvas>
            </ScrollPane>
          </Column>
          <Column cols={2} gutters={false}>
            <ConnectedPropertiesPanel
              questionnaire={questionnaire}
              page={page}
            />
          </Column>
        </Grid>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { isNil } from "lodash";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import NavigationSidebarContainer from "containers/NavigationSidebarContainer";
import getTextFromHTML from "utils/getTextFromHTML";
import ConnectedPropertiesPanel from "components/PropertiesPanel";

import RoutingPageRoute from "./RoutingPageRoute";

export class QuestionnaireRoutingPage extends Component {
  static propTypes = {
    questionnaire: CustomPropTypes.questionnaire,
    section: CustomPropTypes.section,
    questionnaireId: PropTypes.string.isRequired,
    pageId: PropTypes.string,
    sectionId: PropTypes.string.isRequired,
    page: CustomPropTypes.page,
    breadcrumb: CustomPropTypes.breadcrumb,
    loading: PropTypes.bool.isRequired,
    match: CustomPropTypes.match
  };

  shouldComponentUpdate(nextProps) {
    return !isNil(nextProps.section) || !isNil(nextProps.page);
  }

  getMetaTitle = () => {
    const { questionnaire, page, section } = this.props;
    const pageTitle = getTextFromHTML(page ? page.title : section.title);

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
      pageId,
      match
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
            <NavigationSidebarContainer
              questionnaire={questionnaire}
              questionnaireId={questionnaireId}
              section={section}
              page={page}
              currentPageId={pageId}
            />
          </Column>

          <RoutingPageRoute
            questionnaire={questionnaire}
            section={section}
            page={page}
            match={match}
          />

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

export default QuestionnaireRoutingPage;

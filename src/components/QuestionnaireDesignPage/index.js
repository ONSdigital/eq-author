import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import NavigationSidebarContainer from "containers/NavigationSidebarContainer";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import QuestionPageRoute from "components/QuestionPageRoute";
import SectionRoute from "components/SectionRoute";
import { find, flatMap } from "lodash";
import { Titled } from "react-titled";
import { Routes } from "utils/UrlUtils";

class QuestionnaireDesignPage extends Component {
  static propTypes = {
    onAddPage: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    match: CustomPropTypes.match,
    questionnaire: CustomPropTypes.questionnaire,
    location: PropTypes.object // eslint-disable-line
  };

  state = {
    showDeleteConfirmDialog: false,
    showMovePageDialog: false
  };

  handleAddPage = e => {
    const { onAddPage, match, questionnaire } = this.props;
    const { pageId, sectionId } = match.params;

    const pages = flatMap(questionnaire.sections, "pages");
    const page = find(pages, { id: pageId });

    onAddPage(sectionId, page ? page.position + 1 : 0);
  };

  getTitle = title => {
    const { loading, questionnaire } = this.props;
    return loading ? title : `${questionnaire.title} - ${title}`;
  };

  render() {
    const { loading, questionnaire, location } = this.props;

    return (
      <BaseLayout questionnaire={questionnaire}>
        <Titled title={this.getTitle}>
          <Grid>
            <Column cols={2} gutters={false}>
              <NavigationSidebarContainer
                loading={loading}
                onAddPage={this.handleAddPage}
                questionnaire={questionnaire}
              />
            </Column>
            <Column>
              <Switch location={location}>
                <Route path={Routes.SECTION} component={SectionRoute} exact />
                <Route path={Routes.PAGE} component={QuestionPageRoute} exact />
              </Switch>
            </Column>
          </Grid>
        </Titled>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;

import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";
import NavigationSidebarContainer from "containers/NavigationSidebarContainer";
import ConnectedPropertiesPanel from "components/PropertiesPanel";
import styled from "styled-components";
import Button from "components/Button";
import AddPage from "./icon-add-page.svg?inline";
import IconText from "components/IconText";
import SavingIndicator from "components/SavingIndicator";
import { Switch } from "react-router-dom";
import { Route } from "react-router";
import QuestionPageRoute from "components/QuestionPageRoute";
import SectionRoute from "components/SectionRoute";
import { find, flatMap } from "lodash";
import { Titled } from "react-titled";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4em;
`;

const Margin = styled.div`
  margin-top: 2em;
`;

class QuestionnaireDesignPage extends Component {
  static propTypes = {
    onAddPage: PropTypes.func.isRequired,
    questionnaire: CustomPropTypes.questionnaire,
    loading: PropTypes.bool.isRequired,
    match: CustomPropTypes.match,
    location: PropTypes.object // eslint-disable-line
  };

  state = {
    showDeleteConfirmDialog: false,
    showMovePageDialog: false
  };

  handleAddPage = e => {
    const { onAddPage, questionnaire, match } = this.props;
    const { pageId, sectionId } = match.params;

    const page = find(flatMap(questionnaire.sections, "pages"), { id: pageId });

    onAddPage(sectionId, page ? page.position + 1 : 0);
  };

  render() {
    const { loading, questionnaire, location } = this.props;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout questionnaire={questionnaire}>
        <Titled title={title => `${questionnaire.title} - ${title}`}>
          <Grid align="top">
            <Column cols={2} gutters={false}>
              <NavigationSidebarContainer
                onAddPage={this.handleAddPage}
                questionnaire={questionnaire}
              />
            </Column>
            <Column gutters={false}>
              <ScrollPane permanentScrollBar>
                <Margin>
                  <MainCanvas>
                    <SavingIndicator />
                    <Switch location={location}>
                      <Route
                        path="/questionnaire/:questionnaireId/design/:sectionId"
                        component={SectionRoute}
                        exact
                      />
                      <Route
                        path="/questionnaire/:questionnaireId/design/:sectionId/:pageId"
                        component={QuestionPageRoute}
                        exact
                      />
                    </Switch>
                  </MainCanvas>
                </Margin>
                <Centered>
                  <Button
                    variant="tertiary"
                    small
                    onClick={this.handleAddPage}
                    data-test="btn-add-page-2"
                  >
                    <IconText icon={AddPage}>Add question page</IconText>
                  </Button>
                </Centered>
              </ScrollPane>
            </Column>
            <Column cols={2} gutters={false}>
              <ConnectedPropertiesPanel questionnaire={questionnaire} />
            </Column>
          </Grid>
        </Titled>
      </BaseLayout>
    );
  }
}

export default QuestionnaireDesignPage;

import React, { Component } from "react";

import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";
import Routing from "components/Routing";
import QuestionnaireNavContainer from "containers/QuestionnaireNavContainer";
import Nav from "components/Nav";

export class QuestionnaireRoutingPage extends Component {
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
      ...otherProps
    } = this.props;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout
        breadcrumb={breadcrumb}
        questionnaire={questionnaire}
        docTitle={"Routing"}
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
                <Nav
                  questionnaire={questionnaire}
                  section={section}
                  page={page}
                />
                <Routing
                  questionnaire={questionnaire}
                  questionnaireId={questionnaireId}
                  section={section}
                  sectionId={sectionId}
                  page={page}
                  pageId={pageId}
                  {...otherProps}
                />
              </MainCanvas>
            </ScrollPane>
          </Column>
          <Column cols={2} gutters={false} />
        </Grid>
      </BaseLayout>
    );
  }
}

export default QuestionnaireRoutingPage;

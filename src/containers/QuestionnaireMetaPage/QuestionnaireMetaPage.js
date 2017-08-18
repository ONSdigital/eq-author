/* eslint-disable camelcase */
import React, { Component } from "react";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";

import withQuestionnaire from "components/WithQuestionnaire";
import BaseLayout from "components/BaseLayout";
import QuestionnaireMeta from "components/QuestionnaireMeta";
import { Grid, Column } from "components/Grid";

const Margin = styled.div`margin: 2em 1em;`;

export class QuestionnaireMetaPage extends Component {
  static propTypes = {
    breadcrumb: CustomPropTypes.breadcrumb,
    questionnaire: CustomPropTypes.questionnaire
  };

  render() {
    const { questionnaire, breadcrumb, ...otherProps } = this.props;

    return (
      <BaseLayout breadcrumb={breadcrumb} questionnaire={questionnaire}>
        <Grid align="top">
          <Column gutters={false} offset={2}>
            <Margin>
              <QuestionnaireMeta
                questionnaire={questionnaire}
                {...otherProps}
              />
            </Margin>
          </Column>
        </Grid>
      </BaseLayout>
    );
  }
}

export default withQuestionnaire(QuestionnaireMetaPage);

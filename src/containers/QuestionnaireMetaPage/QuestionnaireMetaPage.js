import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import QuestionnaireMeta from "components/QuestionnaireMeta";
import { Grid, Column } from "components/Grid";

const Margin = styled.div`margin: 2em 1em;`;

class QuestionnaireMetaPage extends Component {
  static propTypes = {
    breadcrumb: CustomPropTypes.breadcrumb,
    questionnaire: CustomPropTypes.questionnaire,
    loading: PropTypes.bool
  };

  render() {
    const { questionnaire, breadcrumb, loading, ...otherProps } = this.props;

    if (loading) {
      return null;
    }

    return (
      <BaseLayout
        breadcrumb={breadcrumb}
        questionnaire={questionnaire}
        docTitle="Questionnaire Meta"
      >
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

export default QuestionnaireMetaPage;

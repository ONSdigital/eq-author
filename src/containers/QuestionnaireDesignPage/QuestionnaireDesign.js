import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import { Grid, Column } from "components/Grid";
import { PropertyPane, PropertyPaneTitle } from "components/PropertyPane";
import QuestionProperties from "components/QuestionProperties";

const QuestionnaireDesign = ({ loading, questionnaire, question }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleSubmit = () => {};
  return (
    <BaseLayout
      breadcrumb={{ path: window.location.href, title: questionnaire.title }}
    >
      <Grid align="top">
        <Column cols={3} gutters={false}>
          Sidebar
        </Column>
        <Column gutters={false}>Preview goes here</Column>
        <Column cols={2} gutters={false}>
          <PropertyPane>
            <PropertyPaneTitle>Question properties</PropertyPaneTitle>
            <QuestionProperties
              question={{ type: "General" }}
              onSubmit={handleSubmit}
            />
          </PropertyPane>
        </Column>
      </Grid>
    </BaseLayout>
  );
};

QuestionnaireDesign.propTypes = {
  loading: PropTypes.bool.isRequired,
  questionnaire: CustomPropTypes.questionnaire,
  question: CustomPropTypes.question
};

export default QuestionnaireDesign;

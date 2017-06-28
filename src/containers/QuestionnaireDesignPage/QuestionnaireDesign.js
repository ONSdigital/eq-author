import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";

const QuestionnaireDesign = ({ loading, questionnaire }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseLayout
      breadcrumb={{ path: window.location.href, title: questionnaire.title }}
    >
      Design goes here
    </BaseLayout>
  );
};

QuestionnaireDesign.propTypes = {
  loading: PropTypes.bool.isRequired,
  questionnaire: CustomPropTypes.questionnaire
};

export default QuestionnaireDesign;

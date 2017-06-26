import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "layouts/BaseLayout";

const QuestionnaireDesign = ({ loading, questionnaire }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BaseLayout
      breadcrumb={{ path: window.location, title: questionnaire.title }}
    >
      {}
    </BaseLayout>
  );
};

QuestionnaireDesign.propTypes = {
  loading: PropTypes.bool.isRequired,
  questionnaire: CustomPropTypes.questionnaire
};

export default QuestionnaireDesign;

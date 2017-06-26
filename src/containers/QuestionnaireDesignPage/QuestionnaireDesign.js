import React from "react";

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

export default QuestionnaireDesign;

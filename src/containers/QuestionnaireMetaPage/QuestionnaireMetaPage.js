import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import BaseLayout from "components/BaseLayout";
import QuestionnaireMeta from "components/QuestionnaireMeta";
import MainCanvas from "components/MainCanvas";
import ScrollPane from "components/ScrollPane";

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
        <ScrollPane>
          <MainCanvas>
            <QuestionnaireMeta questionnaire={questionnaire} {...otherProps} />
          </MainCanvas>
        </ScrollPane>
      </BaseLayout>
    );
  }
}

export default QuestionnaireMetaPage;

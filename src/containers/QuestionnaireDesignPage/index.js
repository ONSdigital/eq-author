import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { find } from "lodash";

import getQuestionnaireQuery from "queries/getQuestionnaire";
import updateSectionQuery from "queries/updateSection";
import QuestionnaireDesign from "./QuestionnaireDesign";

export const mapStateToProps = (state, { match }) => {
  const { questionnaireId, sectionId, pageId } = match.params;
  return {
    questionnaireId,
    sectionId,
    pageId
  };
};

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading } = data;
  const { sectionId } = ownProps;

  let props = {
    questionnaire,
    loading
  };

  if (questionnaire) {
    const section = find(questionnaire.sections, {
      id: parseInt(sectionId, 10)
    });

    props = {
      ...props,
      section
    };
  }

  return props;
};

export const withQuestionnaire = graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.questionnaireId } })
});

export const withUpdateSection = graphql(updateSectionQuery, {
  props: ({ ownProps, mutate }) => ({
    update({ section }) {
      return mutate({ variables: section });
    }
  })
});

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection
)(QuestionnaireDesign);

import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { find, pick } from "lodash";

import getQuestionnaireQuery from "queries/getQuestionnaire";
import updateSectionQuery from "queries/updateSection";
import QuestionnaireDesign from "./QuestionnaireDesignPage";

export const mapStateToProps = (state, { match }) =>
  pick(match.params, ["questionnaireId", "sectionId", "pageId"]);

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading } = data;
  const { sectionId } = ownProps;

  const props = {
    questionnaire,
    loading
  };

  if (questionnaire) {
    props.section = find(questionnaire.sections, {
      id: parseInt(sectionId, 10)
    });
  }

  return props;
};

export const withQuestionnaire = graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.questionnaireId } })
});

export const withUpdateSection = graphql(updateSectionQuery, {
  props: ({ ownProps, mutate }) => ({
    onUpdate({ section }) {
      return mutate({ variables: section });
    }
  })
});

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection
)(QuestionnaireDesign);

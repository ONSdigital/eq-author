import getQuestionnaireQuery from "graphql/getQuestionnaire.graphql";
import { graphql } from "react-apollo";
import { find } from "lodash";

const findById = (collection, id) => find(collection, { id });

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading } = data;
  const { sectionId, pageId } = ownProps;

  if (loading) {
    return { loading };
  }

  const section = findById(questionnaire.sections, sectionId);
  const page = findById(section.pages, pageId);

  return {
    loading,
    questionnaire,
    section,
    page
  };
};

export default graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.questionnaireId } })
});

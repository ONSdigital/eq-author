import getQuestionnaireQuery from "graphql/getQuestionnaire.graphql";
import { graphql } from "react-apollo";
import findById from "utils/findById";

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

export const mapPropToOptions = props => ({
  variables: { id: props.questionnaireId }
});

export default graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: mapPropToOptions
});

import getQuestionnaireQuery from "graphql/getQuestionnaire.graphql";
import { graphql } from "react-apollo";
import findById from "utils/findById";
import { get } from "lodash";

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading } = data;
  const { sectionId, pageId } = ownProps;
  let section;
  let page;

  if (loading) {
    return { loading };
  }

  if (!sectionId) {
    return {
      loading,
      questionnaire
    };
  }

  if (questionnaire !== undefined) {
    section = findById(questionnaire.sections, sectionId);
    page = findById(get(section, "pages"), pageId);
  }
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

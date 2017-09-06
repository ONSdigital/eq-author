import getQuestionnaireQuery from "schema/getQuestionnaire.graphql";
import { graphql } from "react-apollo";

import { find, get } from "lodash";

const findById = (collection, id) => find(collection, { id: parseInt(id, 10) });

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading } = data;
  const { sectionId, pageId } = ownProps;

  const props = {
    questionnaire,
    loading
  };

  if (questionnaire) {
    props.section = findById(questionnaire.sections, sectionId);
    props.page = findById(props.section.pages, pageId);
    props.answers = get(props.page, "answers", []);
  }

  return props;
};

export default graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.questionnaireId } })
});

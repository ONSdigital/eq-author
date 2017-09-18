import getQuestionnaireList from "graphql/getQuestionnaireList.graphql";
import { merge } from "lodash";
import { graphql } from "react-apollo";

export const mapResultsToProps = ({ data, ownProps }) => {
  const { loading } = data;

  if (loading) {
    return {
      loading
    };
  }

  const questionnaires = data.questionnaires.map(questionnaire => {
    return merge({}, questionnaire, {
      // TODO Replace this when we have mechanism for retrieving comments.
      status: "Unpublished",
      comments: {
        unread: true,
        count: 1
      },
      actions: {
        delete: true
      }
    });
  });

  return {
    loading,
    questionnaires
  };
};

export default graphql(getQuestionnaireList, {
  props: mapResultsToProps
});

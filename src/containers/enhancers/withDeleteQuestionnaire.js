import { graphql } from "react-apollo";
import deleteQuestionnaire from "graphql/deleteQuestionnaire.graphql";

export const handleDeletion = (ownProps, questionnaireId) => {
  const { history } = ownProps;

  if (history) {
    history.push("/");
  }
  return Promise.resolve();
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeleteQuestionnaire(questionnaireId) {
    const variables = { id: questionnaireId };
    return mutate({ variables }).then(res =>
      handleDeletion(ownProps, questionnaireId).then(() => res)
    );
  }
});

export default graphql(deleteQuestionnaire, {
  props: mapMutateToProps,
  options: {
    refetchQueries: ["GetQuestionnaireList"]
  }
});

import { graphql } from "react-apollo";
import getQuestionnaireQuery from "../../queries/getQuestionnaire.graphql";
import deleteAnswerMutation from "../../queries/deleteAnswer.graphql";
import { find, remove } from "lodash";

const findById = (collection, id) => find(collection, { id: parseInt(id, 10) });

export const deleteUpdater = (questionnaireId, sectionId, pageId, answerId) => (
  proxy,
  result
) => {
  const data = proxy.readQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId }
  });

  const section = findById(data.questionnaire.sections, sectionId);
  const page = findById(section.pages, pageId);

  remove(page.answers, { id: answerId });

  proxy.writeQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId },
    data
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeleteAnswer(answerId) {
    const variables = { id: answerId };
    const update = deleteUpdater(
      ownProps.questionnaireId,
      ownProps.sectionId,
      ownProps.pageId,
      answerId
    );

    return Promise.resolve(mutate({ variables, update }));
  }
});

export default graphql(deleteAnswerMutation, {
  props: mapMutateToProps
});

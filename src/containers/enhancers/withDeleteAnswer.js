import { graphql } from "react-apollo";
import deleteAnswerMutation from "graphql/deleteAnswer.graphql";
import { remove, find } from "lodash";
import fragment from "graphql/pageFragment.graphql";

export const deleteUpdater = (
  pageId,
  answerId,
  fieldsValid,
  fieldValid
) => proxy => {
  const id = `QuestionPage${pageId}`;
  const page = proxy.readFragment({ id, fragment });

  const answer = find(page.answers, { id: answerId });

  let fieldIds = [];

  if (answer.options) {
    fieldIds = answer.options.map(o => `option-label-${o.id}`);

    if (answer.other) {
      fieldIds = fieldIds.concat([
        `option-label-${answer.other.option.id}`,
        `answer-label-${answer.other.answer.id}`
      ]);
    }
    fieldsValid(pageId, fieldIds);
  } else {
    fieldValid(pageId, `answer-label-${answer.id}`);
  }

  remove(page.answers, { id: answerId });

  proxy.writeFragment({
    id,
    fragment,
    data: page
  });
};

export const displayToast = (ownProps, pageId, answerId) => {
  ownProps.raiseToast(`Answer${answerId}`, "Answer deleted", "undeleteAnswer", {
    pageId,
    answerId
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeleteAnswer(pageId, answerId) {
    const answer = { id: answerId };
    const update = deleteUpdater(
      pageId,
      answerId,
      ownProps.fieldsValid,
      ownProps.fieldValid
    );

    const mutation = mutate({
      variables: { input: answer },
      update
    });

    return mutation
      .then(() => displayToast(ownProps, pageId, answerId))
      .then(() => mutation);
  }
});

export default graphql(deleteAnswerMutation, {
  props: mapMutateToProps
});

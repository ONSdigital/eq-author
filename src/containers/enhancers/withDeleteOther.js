import { graphql } from "react-apollo";
import deleteOtherMutation from "graphql/deleteOther.graphql";
import fragment from "graphql/answerFragment.graphql";

export const deleteUpdater = (answerId, pageId, fieldsValid) => proxy => {
  const id = `MultipleChoiceAnswer${answerId}`;
  const parentAnswer = proxy.readFragment({ id, fragment });

  fieldsValid(pageId, [
    `option-label-${parentAnswer.other.option.id}`,
    `answer-label-${parentAnswer.other.answer.id}`
  ]);

  parentAnswer.other = null;

  proxy.writeFragment({
    id,
    fragment,
    data: parentAnswer
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onDeleteOther({ id }) {
    const answer = { parentAnswerId: id };
    const update = deleteUpdater(
      id,
      ownProps.match.params.pageId,
      ownProps.fieldsValid
    );

    return mutate({
      variables: { input: answer },
      update
    });
  }
});

export default graphql(deleteOtherMutation, {
  props: mapMutateToProps
});

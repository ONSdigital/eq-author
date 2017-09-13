import { graphql } from "react-apollo";
import { remove } from "lodash";
import deleteOptionMutation from "graphql/deleteOption.graphql";
import answerFragment from "graphql/answerFragment.graphql";

export const createUpdater = (optionId, answerId) => proxy => {
  const id = `MultipleChoiceAnswer${answerId}`;
  const answer = proxy.readFragment({
    id,
    fragment: answerFragment
  });

  remove(answer.options, { id: optionId });

  proxy.writeFragment({
    id,
    fragment: answerFragment,
    data: answer
  });
};

export const mapMutateToProps = ({ mutate }) => ({
  onDeleteOption(optionId, answerId) {
    const option = {
      id: optionId
    };

    const update = createUpdater(optionId, answerId);

    return mutate({
      variables: option,
      update
    });
  }
});

export default graphql(deleteOptionMutation, {
  props: mapMutateToProps
});

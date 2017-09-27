import { graphql } from "react-apollo";
import { remove } from "lodash";
import deleteOptionMutation from "graphql/deleteOption.graphql";
import fragment from "graphql/answerFragment.graphql";

export const createUpdater = (optionId, answerId) => proxy => {
  const id = `MultipleChoiceAnswer${answerId}`;
  const answer = proxy.readFragment({ id, fragment });

  remove(answer.options, { id: optionId });

  proxy.writeFragment({
    id,
    fragment,
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
      variables: { input: option },
      update
    });
  }
});

export default graphql(deleteOptionMutation, {
  props: mapMutateToProps
});

import { graphql } from "react-apollo";

import createOptionMutation from "graphql/createOption.graphql";
import answerFragment from "graphql/answerFragment.graphql";

export const createUpdater = answerId => (proxy, result) => {
  const id = `MultipleChoiceAnswer${answerId}`;
  const answer = proxy.readFragment({
    id,
    fragment: answerFragment
  });

  answer.options.push(result.data.createOption);

  proxy.writeFragment({
    id,
    fragment: answerFragment,
    data: answer
  });
};

export const mapMutateToProps = ({ mutate }) => ({
  onAddOption(answerId) {
    const option = {
      answerId
    };

    const update = createUpdater(answerId);

    return mutate({
      variables: option,
      update
    });
  }
});

export default graphql(createOptionMutation, {
  props: mapMutateToProps
});

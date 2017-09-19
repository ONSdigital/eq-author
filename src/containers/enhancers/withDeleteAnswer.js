import { graphql } from "react-apollo";
import deleteAnswerMutation from "graphql/deleteAnswer.graphql";
import { remove } from "lodash";
import fragment from "graphql/pageFragment.graphql";

export const deleteUpdater = (pageId, answerId) => (proxy, result) => {
  const id = `QuestionPage${pageId}`;
  const page = proxy.readFragment({ id, fragment });

  remove(page.answers, { id: answerId });

  proxy.writeFragment({
    id,
    fragment,
    data: page
  });
};

export const mapMutateToProps = ({ mutate }) => ({
  onDeleteAnswer(pageId, answerId) {
    const variables = { id: answerId };
    const update = deleteUpdater(pageId, answerId);

    return mutate({ variables, update });
  }
});

export default graphql(deleteAnswerMutation, {
  props: mapMutateToProps
});

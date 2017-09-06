import { graphql, gql } from "react-apollo";
import deleteAnswerMutation from "graphql/deleteAnswer.graphql";
import { remove } from "lodash";

const pageFragment = gql`
  fragment Page on QuestionPage {
    id
    answers {
      id
    }
  }
`;

export const deleteUpdater = (pageId, answerId) => (proxy, result) => {
  const id = `QuestionPage${pageId}`;
  const page = proxy.readFragment({
    id,
    fragment: pageFragment
  });

  remove(page.answers, { id: answerId });

  proxy.writeFragment({
    id,
    fragment: pageFragment,
    data: page
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onDeleteAnswer(answerId) {
    const variables = { id: answerId };
    const update = deleteUpdater(ownProps.page.id, answerId);

    return mutate({ variables, update });
  }
});

export default graphql(deleteAnswerMutation, {
  props: mapMutateToProps
});

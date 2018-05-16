import { graphql } from "react-apollo";
import createAnswerMutation from "graphql/createAnswer.graphql";
import fragment from "graphql/pageFragment.graphql";

export const createUpdater = pageId => (proxy, result) => {
  const id = `QuestionPage${pageId}`;
  const page = proxy.readFragment({
    id,
    fragment
  });

  page.answers.push(result.data.createAnswer);

  proxy.writeFragment({
    id,
    fragment,
    data: page
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onAddAnswer(pageId, type) {
    const answer = {
      type,
      mandatory: false,
      questionPageId: pageId,
      description: "",
      guidance: "",
      qCode: "",
      label: "",
      secondaryLabel: ""
    };

    const update = createUpdater(pageId);

    return mutate({
      variables: { input: answer },
      update
    }).then(res => res.data.createAnswer);
  }
});

export default graphql(createAnswerMutation, {
  props: mapMutateToProps
});

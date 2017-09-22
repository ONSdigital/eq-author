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
  onAddAnswer(type) {
    const answer = {
      type,
      mandatory: false,
      questionPageId: ownProps.page.id,
      description: "",
      guidance: "",
      qCode: "",
      label: ""
    };

    const update = createUpdater(ownProps.page.id);

    return mutate({
      variables: { input: answer },
      update
    });
  }
});

export default graphql(createAnswerMutation, {
  props: mapMutateToProps
});

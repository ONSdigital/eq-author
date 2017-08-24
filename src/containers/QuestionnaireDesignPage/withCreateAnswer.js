import { graphql } from "react-apollo";
import createAnswerMutation from "graphql/createAnswer.graphql";
import pageFragment from "graphql/pageFragment.graphql";

export const createUpdater = pageId => (proxy, result) => {
  const id = `QuestionPage${pageId}`;
  const page = proxy.readFragment({
    id,
    fragment: pageFragment
  });

  page.answers.push(result.data.createAnswer);

  proxy.writeFragment({
    id,
    fragment: pageFragment,
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
      variables: answer,
      update
    }).then(result => {
      return result.data.createAnswer;
    });
  }
});

export default graphql(createAnswerMutation, {
  props: mapMutateToProps
});

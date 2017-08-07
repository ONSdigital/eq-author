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
      type: type,
      mandatory: false,
      questionPageId: ownProps.page.id,
      description: "",
      guidance: "",
      qCode: "",
      label: ""
    };

    const optimisticResponse = {
      createAnswer: {
        __typename: "Answer",
        id: -1,
        ...answer
      }
    };

    if (type === "Checkbox") {
      optimisticResponse.createAnswer = {
        ...optimisticResponse.createAnswer,
        __typename: "MultipleChoiceAnswer",
        options: [
          {
            id: -1,
            __typename: "Option"
          }
        ]
      };
    }

    const update = createUpdater(ownProps.pageId);

    return mutate({
      variables: answer,
      update
    });
  }
});

export default graphql(createAnswerMutation, {
  props: mapMutateToProps
});

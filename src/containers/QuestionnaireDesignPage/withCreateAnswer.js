import { graphql, gql } from "react-apollo";
import createAnswerMutation from "queries/createAnswer.graphql";

const pageFragment = gql`
  fragment Page on QuestionPage {
    id
    answers {
      id
    }
  }
`;

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
      label: "",
      description: "",
      guidance: "",
      qCode: "",
      type: type,
      mandatory: false,
      questionPageId: ownProps.page.id
    };

    // const optimisticResponse = {
    //   createSection: {
    //     __typename: "Section",
    //     id: -1,
    //     description: "",
    //     pages: [],
    //     ...answer
    //   }
    // };

    const update = createUpdater(ownProps.pageId);

    return mutate({
      variables: answer,
      // optimisticResponse,
      update
    });
  }
});

export default graphql(createAnswerMutation, {
  props: mapMutateToProps
});

import { graphql } from "react-apollo";
import createAnswerMutation from "queries/createAnswer.graphql";

// const answerFragment = gql`
//   fragment Answer on QuestionPage {
//     id
//     answer {
//       id
//     }
//   }
// `;
//
// export const createUpdater = pageId => (proxy, result) => {
//   const id = `QuestionPage${pageId}`;
//   const page = proxy.readFragment({
//     id,
//     fragment: answerFragment
//   });
//
//   page.answer.push(result.data.createAnswer);
//
//   proxy.writeFragment({
//     id,
//     fragment: answerFragment,
//     data: answer
//   });
// };

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

    // const update = createUpdater(ownProps.pageId);

    return mutate({
      variables: answer,
      // optimisticResponse,
      refetchQueries: ["GetQuestionnaire"]
    });
  }
});

export default graphql(createAnswerMutation, {
  props: mapMutateToProps
});

import getQuestionnaireQuery from "queries/getQuestionnaire.graphql";
import { graphql } from "react-apollo";
import createAnswerMutation from "queries/createAnswer.graphql";

// export const redirectToDesigner = ownProps => ({ data }) => {
//   const { history, questionPageId } = ownProps;
//   const section = data.createSection;
//   const page = section.pages[0];
//
//   history.push(
//     `/questionnaire/${questionPageId}/design/${section.id}/${page.id}`
//   );
// };

export const createUpdater = questionPageId => (proxy, result) => {
  const data = proxy.readQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionPageId }
  });

  data.questionnaire.sections.push(result.data.createAnswer);

  proxy.writeQuery({
    data,
    query: getQuestionnaireQuery,
    variables: { id: questionPageId }
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onAddAnswer(type) {
    const { questionnaireId, questionPageId } = ownProps;
    const answer = {
      type,
      questionPageId: ownProps.page.id,
      mandatory: false
    };

    // const optimisticResponse = {
    //   createSection: {
    //     __typename: "Section",
    //     id: -1,
    //     description: "",
    //     ...answer
    //   }
    // };

    const update = createUpdater(questionnaireId, questionPageId);

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

import getQuestionnaireQuery from "schema/getQuestionnaire.graphql";
import { graphql } from "react-apollo";
import createSectionMutation from "schema/createSection.graphql";

export const redirectToDesigner = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const section = data.createSection;
  const page = section.pages[0];

  history.push(
    `/questionnaire/${questionnaireId}/design/${section.id}/${page.id}`
  );
};

export const createUpdater = questionnaireId => (proxy, result) => {
  const data = proxy.readQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId }
  });

  data.questionnaire.sections.push(result.data.createSection);

  proxy.writeQuery({
    data,
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId }
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onAddSection() {
    const section = {
      title: "",
      description: "",
      questionnaireId: ownProps.questionnaireId
    };

    const optimisticResponse = {
      createSection: {
        __typename: "Section",
        id: -1,
        description: "",
        pages: [],
        ...section
      }
    };

    const update = createUpdater(ownProps.questionnaireId);

    return mutate({
      variables: section,
      optimisticResponse,
      update
    }).then(redirectToDesigner(ownProps));
  }
});

export default graphql(createSectionMutation, {
  props: mapMutateToProps
});

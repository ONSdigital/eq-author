import { graphql } from "react-apollo";
import createSectionMutation from "graphql/createSection.graphql";
import fragment from "graphql/questionnaireFragment.graphql";
import { buildSectionPath } from "utils/UrlUtils";
import { get, tap } from "lodash/fp";

export const redirectToNewSection = ({ history, questionnaire }) => section => {
  history.push(
    buildSectionPath({
      questionnaireId: questionnaire.id,
      sectionId: section.id
    })
  );
};

export const createUpdater = questionnaireId => (proxy, result) => {
  const id = `Questionnaire${questionnaireId}`;
  const questionnaire = proxy.readFragment({ id, fragment });

  questionnaire.sections.push(result.data.createSection);

  proxy.writeFragment({
    id,
    fragment,
    data: questionnaire
  });
};

export const mapMutateToProps = ({ mutate, ownProps }) => ({
  onAddSection() {
    const section = {
      title: "",
      description: "",
      questionnaireId: ownProps.questionnaire.id
    };

    const update = createUpdater(ownProps.questionnaire.id);

    return mutate({
      variables: { input: section },
      update
    })
      .then(get("data.createSection"))
      .then(tap(redirectToNewSection(ownProps)));
  }
});

export default graphql(createSectionMutation, {
  props: mapMutateToProps
});

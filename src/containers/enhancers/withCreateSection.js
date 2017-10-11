import { graphql } from "react-apollo";
import createSectionMutation from "graphql/createSection.graphql";
import fragment from "graphql/questionnaireFragment.graphql";
import { getLink } from "utils/UrlUtils";

export const redirectToNewPage = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const section = data.createSection;
  const page = section.pages[0];

  history.push(getLink(questionnaireId, section.id, page.id));
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
      questionnaireId: ownProps.questionnaireId
    };

    const update = createUpdater(ownProps.questionnaireId);

    return mutate({
      variables: { input: section },
      update
    }).then(res => {
      redirectToNewPage(ownProps)(res);
      return res.data.createSection;
    });
  }
});

export default graphql(createSectionMutation, {
  props: mapMutateToProps
});

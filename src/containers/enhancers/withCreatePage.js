import { graphql } from "react-apollo";
import fragment from "graphql/sectionFragment.graphql";
import createQuestionPageMutation from "graphql/createQuestionPage.graphql";
import { getLink } from "utils/UrlUtils";

export const redirectToNewPage = ownProps => ({ data }) => {
  const { history, questionnaireId } = ownProps;
  const { id, section } = data.createQuestionPage;
  history.push(getLink(questionnaireId, section.id, id));
};

export const createUpdater = sectionId => (proxy, result) => {
  const id = `Section${sectionId}`;
  const section = proxy.readFragment({ id, fragment });

  section.pages.push(result.data.createQuestionPage);

  proxy.writeFragment({
    id,
    fragment,
    data: section
  });
};

export const mapMutateToProps = ({ ownProps, mutate }) => ({
  onAddPage(sectionId) {
    const page = {
      title: "",
      description: "",
      sectionId
    };

    const update = createUpdater(sectionId);

    return mutate({
      variables: { input: page },
      update
    }).then(result => {
      redirectToNewPage(ownProps)(result);
      return result.data.createQuestionPage;
    });
  }
});

export default graphql(createQuestionPageMutation, {
  props: mapMutateToProps
});

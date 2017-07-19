import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { find, pick } from "lodash";

import getQuestionnaireQuery from "queries/getQuestionnaire";
import updateSectionMutation from "queries/updateSection";
import updatePageMutation from "queries/updatePage";
import createQuestionPageMutation from "queries/createQuestionPage";
import QuestionnaireDesign from "./QuestionnaireDesignPage";

const findById = (collection, id) =>
  find(collection, {
    id: parseInt(id, 10)
  });

export const mapStateToProps = (state, { match }) =>
  pick(match.params, ["questionnaireId", "sectionId", "pageId"]);

export const mapResultsToProps = ({ data, ownProps }) => {
  const { questionnaire, loading } = data;
  const { sectionId, pageId } = ownProps;

  const props = {
    questionnaire,
    loading
  };

  if (questionnaire) {
    props.section = findById(questionnaire.sections, sectionId);
    props.page = findById(props.section.pages, pageId);
  }

  return props;
};

export const withQuestionnaire = graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.questionnaireId } })
});

export const withUpdateSection = graphql(updateSectionMutation, {
  props: ({ mutate }) => ({
    onSectionUpdate: section => mutate({ variables: section })
  })
});

export const withUpdatePage = graphql(updatePageMutation, {
  props: ({ mutate }) => ({
    onPageUpdate: page => mutate({ variables: page })
  })
});

export const createUpdater = (questionnaireId, sectionId) => (
  proxy,
  result
) => {
  const data = proxy.readQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId }
  });

  const section = findById(data.questionnaire.sections, sectionId);

  section.pages.push(result.data.createQuestionPage);

  proxy.writeQuery({
    query: getQuestionnaireQuery,
    variables: { id: questionnaireId },
    data
  });
};

export const redirectToDesigner = ownProps => ({ data }) => {
  const { history, sectionId, questionnaireId } = ownProps;
  const { id } = data.createQuestionPage;
  history.push(`/questionnaire/${questionnaireId}/design/${sectionId}/${id}`);
};

export const mapMutateToProps = ({ ownProps, mutate }) => {
  return {
    onAddPage(sectionId) {
      const page = {
        title: "",
        description: "",
        type: "General",
        sectionId: sectionId
      };
      return mutate({
        variables: page,
        optimisticResponse: {
          createQuestionPage: {
            __typename: "QuestionPage",
            id: -1,
            guidance: "",
            pageType: "",
            answers: [],
            ...page
          }
        },
        update: createUpdater(ownProps.questionnaireId, sectionId)
      }).then(redirectToDesigner(ownProps));
    }
  };
};

export const withCreatePage = graphql(createQuestionPageMutation, {
  props: mapMutateToProps
});

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withCreatePage,
  withUpdatePage
)(QuestionnaireDesign);

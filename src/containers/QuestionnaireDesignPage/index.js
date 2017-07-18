import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { find, pick } from "lodash";

import getQuestionnaireQuery from "queries/getQuestionnaire";
import updateSectionQuery from "queries/updateSection";
import updatePageQuery from "queries/updatePage";
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

export const withUpdateSection = graphql(updateSectionQuery, {
  props: ({ mutate }) => ({
    onSectionUpdate: section => mutate({ variables: section })
  })
});

export const withUpdatePage = graphql(updatePageQuery, {
  props: ({ mutate }) => ({
    onPageUpdate: page => mutate({ variables: page })
  })
});

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withUpdatePage
)(QuestionnaireDesign);

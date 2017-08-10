import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";
import { find, pick } from "lodash";

import getQuestionnaireQuery from "queries/getQuestionnaire.graphql";
import updateSectionMutation from "queries/updateSection.graphql";
import updatePageMutation from "queries/updatePage.graphql";
import updateAnswerMutation from "queries/updateAnswer.graphql";
import QuestionnaireDesign from "./QuestionnaireDesignPage";
import withCreatePage from "./withCreatePage";
import withCreateSection from "./withCreateSection";
import withDeletePage from "./withDeletePage";
import withCreateAnswer from "./withCreateAnswer";

const findById = (collection, id) => find(collection, { id: parseInt(id, 10) });

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
    props.answers = props.page.answers;
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

export const withUpdateAnswer = graphql(updateAnswerMutation, {
  props: ({ mutate }) => ({
    onAnswerUpdate: answer => mutate({ variables: answer })
  })
});

export default compose(
  connect(mapStateToProps),
  withQuestionnaire,
  withUpdateSection,
  withUpdateAnswer,
  withCreateSection,
  withUpdatePage,
  withDeletePage,
  withCreatePage,
  withCreateAnswer
)(QuestionnaireDesign);

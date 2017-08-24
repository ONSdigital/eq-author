import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";

import getQuestionnaireQuery from "queries/getQuestionnaire.graphql";
import withCreatePage from "../QuestionnaireDesignPage/withCreatePage";
import withDeletePage from "../QuestionnaireDesignPage/withDeletePage";

import QuestionnaireNav from "components/QuestionnaireNav";
import withCreateSection from "../QuestionnaireDesignPage/withCreateSection";

export const mapResultsToProps = ({ data }) => {
  return {
    questionnaire: data.questionnaire,
    loading: data.loading
  };
};

export const withQuestionnaire = graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.questionnaireId } })
});

export default compose(
  withRouter,
  withQuestionnaire,
  withCreatePage,
  withDeletePage,
  withCreateSection
)(QuestionnaireNav);

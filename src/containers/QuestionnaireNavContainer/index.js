import { graphql, compose } from "react-apollo";
import { withRouter } from "react-router";

import getQuestionnaireQuery from "graphql/getQuestionnaire.graphql";
import withCreatePage from "../Enhancers/withCreatePage";
import withDeletePage from "../Enhancers/withDeletePage";

import QuestionnaireNav from "components/QuestionnaireNav";
import withCreateSection from "../Enhancers/withCreateSection";

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

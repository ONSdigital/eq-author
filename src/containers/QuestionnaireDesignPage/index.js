import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

import getQuestionnaire from "queries/getQuestionnaire";
import QuestionnaireDesign from "./QuestionnaireDesign";

export const mapStateToProps = (state, { match }) => ({
  id: match.params.id
});

export const mapResultsToProps = ({ data }) => ({
  questionnaire: data.questionnaire,
  loading: data.loading
});

export const withData = graphql(getQuestionnaire, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.id } })
});

export default compose(connect(mapStateToProps), withData)(QuestionnaireDesign);

import getQuestionnaireQuery from "graphql/getQuestionnaire.graphql";
import { graphql } from "react-apollo";
import { get, pick, flow } from "lodash/fp";

export const mapResultsToProps = flow(
  get("data"),
  pick(["loading", "questionnaire"])
);

export const mapPropToOptions = props => ({
  variables: { id: props.questionnaireId }
});

export default graphql(getQuestionnaireQuery, {
  props: mapResultsToProps,
  options: mapPropToOptions
});

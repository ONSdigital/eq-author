import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

import getQuestionnaire from "queries/getQuestionnaire";
import updateQuestionnaire from "queries/updateQuestionnaire";
import QuestionnaireMeta from "./QuestionnaireMeta";

export const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id
});

export const mapResultsToProps = ({ data, ownProps }) => {
  const { loading, questionnaire } = data;

  return {
    questionnaire,
    loading
  };
};

export const withData = graphql(getQuestionnaire, {
  props: mapResultsToProps,
  options: props => ({ variables: { id: props.id } })
});

export const withMutation = graphql(updateQuestionnaire, {
  props: ({ ownProps, mutate }) => ({
    onUpdate(variables) {
      return mutate({ variables });
    }
  })
});

export default compose(connect(mapStateToProps), withData, withMutation)(
  QuestionnaireMeta
);

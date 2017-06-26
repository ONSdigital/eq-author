import { graphql, gql, compose } from "react-apollo";
import { connect } from "react-redux";

import QuestionnaireDesign from "./QuestionnaireDesign";

export const getQuestionnaire = gql`
  query GetQuestionnaire($id: ID!) {
    questionnaire(id: $id) {
      id,
      title,
      description,
      navigation,
      legalBasis,
      theme
    }
  }
`;

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

export default connect(mapStateToProps)(compose(withData)(QuestionnaireDesign));

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import MinValueValidationRule from "graphql/fragments/min-value-validation-rule.graphql";

export const TOGGLE_VALIDATION_RULE = gql`
  mutation ToggleValidationRule($input: ToggleValidationRuleInput!) {
    toggleValidationRule(input: $input) {
      ...MinValueValidationRule
    }
  }
  
  ${MinValueValidationRule}
`;

export const mapMutateToProps = ({ mutate }) => ({
  onToggleValidationRule: input => mutate({ variables: { input } })
});

export default graphql(TOGGLE_VALIDATION_RULE, {
  props: mapMutateToProps
});

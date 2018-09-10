import { graphql } from "react-apollo";
import gql from "graphql-tag";
import MinValueValidationRule from "graphql/fragments/min-value-validation-rule.graphql";
import MaxValueValidationRule from "graphql/fragments/max-value-validation-rule.graphql";
import EarliestDateValidationRule from "graphql/fragments/earliest-date-validation-rule.graphql";

export const UPDATE_VALIDATION_RULE = gql`
  mutation updateValidationRule($input: UpdateValidationRuleInput!) {
    updateValidationRule(input: $input) {
      ...MinValueValidationRule
      ...MaxValueValidationRule
      ...EarliestDateValidationRule
    }
  }

  ${MinValueValidationRule}
  ${MaxValueValidationRule}
  ${EarliestDateValidationRule}
`;

export const mapMutateToProps = ({ mutate }) => ({
  onUpdateAnswerValidation: input =>
    mutate({
      variables: { input }
    })
});

export default graphql(UPDATE_VALIDATION_RULE, {
  props: mapMutateToProps
});

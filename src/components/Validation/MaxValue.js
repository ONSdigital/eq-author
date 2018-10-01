import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { withApollo } from "react-apollo";
import { propType } from "graphql-anywhere";

import { flowRight, inRange, isNaN } from "lodash";

import { colors } from "constants/theme";
import { Grid, Column } from "components/Grid";
import { Input } from "components/Forms";
import DisabledMessage from "components/Validation/DisabledMessage";

import ValidationView from "./ValidationView";
import FieldWithInclude from "./FieldWithInclude";

import MaxValueValidationRule from "graphql/fragments/max-value-validation-rule.graphql";
import withUpdateAnswerValidation from "containers/enhancers/withUpdateAnswerValidation";
import withToggleAnswerValidation from "containers/enhancers/withToggleAnswerValidation";

import ValidationContext from "./ValidationContext";

const Title = styled.h1`
  font-weight: bold;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.9em;
  text-align: center;
  color: ${colors.text};
  margin: 0.6em 0 0;
`;

const ValueInput = styled(Input)`
  width: 10em;
`;

export const MaxValue = ({
  maxValue,
  onUpdateAnswerValidation,
  onToggleValidationRule,
  limit
}) => {
  const handleToggleChange = ({ value }) => {
    const toggleValidationRuleInput = {
      id: maxValue.id,
      enabled: value
    };

    onToggleValidationRule(toggleValidationRuleInput);
  };

  const handleMaxValueChange = ({ value }) => {
    // clamp value of input to +/- limit
    if (value !== "" && !inRange(parseInt(value, 10), 0 - limit, limit + 1)) {
      return false;
    }

    const intValue = parseInt(value, 10);

    const updateValidationRuleInput = {
      id: maxValue.id,
      maxValueInput: {
        inclusive: maxValue.inclusive,
        custom: isNaN(intValue) ? null : intValue
      }
    };

    onUpdateAnswerValidation(updateValidationRuleInput);
  };

  const handleIncludeChange = ({ value }) => {
    const updateValidationRuleInput = {
      id: maxValue.id,
      maxValueInput: {
        custom: maxValue.custom,
        inclusive: value
      }
    };
    onUpdateAnswerValidation(updateValidationRuleInput);
  };

  const renderDisabled = () => (
    <DisabledMessage>Max value is disabled</DisabledMessage>
  );

  const renderContent = () => (
    <Grid>
      <Column cols={3}>
        <Title>Max Value is</Title>
      </Column>
      <Column>
        <FieldWithInclude
          id="max-value-include"
          name="max-value-include"
          onChange={handleIncludeChange}
          checked={maxValue.inclusive}
        >
          <ValueInput
            data-test="max-value-input"
            list="defaultNumbers"
            value={maxValue.custom}
            type="number"
            id="max-value"
            onChange={handleMaxValueChange}
            max={limit}
            min={0 - limit}
          />
        </FieldWithInclude>
      </Column>
    </Grid>
  );

  return (
    <ValidationView
      onToggleChange={handleToggleChange}
      enabled={maxValue.enabled}
      data-test="max-value-view"
    >
      {maxValue.enabled ? renderContent() : renderDisabled()}
    </ValidationView>
  );
};

MaxValue.defaultProps = {
  limit: 999999999
};

MaxValue.propTypes = {
  maxValue: propType(MaxValueValidationRule).isRequired,
  onUpdateAnswerValidation: PropTypes.func.isRequired,
  onToggleValidationRule: PropTypes.func.isRequired,
  limit: PropTypes.number
};

const withQuestionPageEditing = flowRight(
  withApollo,
  withUpdateAnswerValidation,
  withToggleAnswerValidation
);

export const MaxValueWithAnswer = props => (
  <ValidationContext.Consumer>
    {({ answer }) => (
      <MaxValue maxValue={answer.validation.maxValue} {...props} />
    )}
  </ValidationContext.Consumer>
);

export default withQuestionPageEditing(MaxValueWithAnswer);

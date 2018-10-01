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

import MinValueValidationRule from "graphql/fragments/min-value-validation-rule.graphql";
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

export const MinValue = ({
  minValue,
  onUpdateAnswerValidation,
  onToggleValidationRule,
  limit
}) => {
  const handleToggleChange = ({ value }) => {
    const toggleValidationRuleInput = {
      id: minValue.id,
      enabled: value
    };

    onToggleValidationRule(toggleValidationRuleInput);
  };

  const handleMinValueChange = ({ value }) => {
    // clamp value of input to +/- limit
    if (value !== "" && !inRange(parseInt(value, 10), 0 - limit, limit + 1)) {
      return false;
    }

    const intValue = parseInt(value, 10);

    const updateValidationRuleInput = {
      id: minValue.id,
      minValueInput: {
        inclusive: minValue.inclusive,
        custom: isNaN(intValue) ? null : intValue
      }
    };

    onUpdateAnswerValidation(updateValidationRuleInput);
  };

  const handleIncludeChange = ({ value }) => {
    const updateValidationRuleInput = {
      id: minValue.id,
      minValueInput: {
        custom: minValue.custom,
        inclusive: value
      }
    };
    onUpdateAnswerValidation(updateValidationRuleInput);
  };

  const renderDisabled = () => (
    <DisabledMessage>Min value is disabled</DisabledMessage>
  );

  const renderContent = () => (
    <Grid>
      <Column cols={3}>
        <Title>Min Value is</Title>
      </Column>
      <Column>
        <FieldWithInclude
          id="min-value-include"
          name="min-value-include"
          onChange={handleIncludeChange}
          checked={minValue.inclusive}
        >
          <ValueInput
            data-test="min-value-input"
            list="defaultNumbers"
            value={minValue.custom}
            type="number"
            id="min-value"
            onChange={handleMinValueChange}
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
      enabled={minValue.enabled}
      data-test="min-value-view"
    >
      {minValue.enabled ? renderContent() : renderDisabled()}
    </ValidationView>
  );
};

MinValue.defaultProps = {
  limit: 999999999
};

MinValue.propTypes = {
  minValue: propType(MinValueValidationRule).isRequired,
  onUpdateAnswerValidation: PropTypes.func.isRequired,
  onToggleValidationRule: PropTypes.func.isRequired,
  limit: PropTypes.number
};

const withQuestionPageEditing = flowRight(
  withApollo,
  withUpdateAnswerValidation,
  withToggleAnswerValidation
);

export const MinValueWithAnswer = props => (
  <ValidationContext.Consumer>
    {({ answer }) => (
      <MinValue minValue={answer.validation.minValue} {...props} />
    )}
  </ValidationContext.Consumer>
);

export default withQuestionPageEditing(MinValueWithAnswer);

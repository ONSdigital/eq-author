import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { withApollo } from "react-apollo";
import { propType } from "graphql-anywhere";

import { flowRight, inRange, isNaN } from "lodash";

import { ValidationPills } from "components/Validation/ValidationPills";
import { Grid, Column } from "components/Grid";
import { Field, Label } from "components/Forms";
import DisabledMessage from "components/Validation/DisabledMessage";
import ToggleSwitch from "components/ToggleSwitch";

import ValidationTitle from "components/Validation/ValidationTitle";
import ValidationView from "components/Validation/ValidationView";
import ValidationContext from "components/Validation/ValidationContext";
import PathEnd from "components/Validation/path-end.svg?inline";

import withUpdateAnswerValidation from "containers/enhancers/withUpdateAnswerValidation";
import withToggleAnswerValidation from "containers/enhancers/withToggleAnswerValidation";

import MaxValueValidationRule from "graphql/fragments/max-value-validation-rule.graphql";

import * as answerTypes from "constants/answer-types";

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -0.8em;
`;

const Connector = styled(PathEnd)`
  margin-top: 0.75em;
  margin-left: 1.5em;
`;

export const MaxValue = ({
  maxValue,
  onUpdateAnswerValidation,
  onToggleValidationRule,
  limit,
  answerType
}) => {
  const handlePreviousAnswerChange = ({ id }) => {
    const updateValidationRuleInput = {
      id: maxValue.id,
      maxValueInput: {
        inclusive: maxValue.inclusive,
        previousAnswer: id
      }
    };

    onUpdateAnswerValidation(updateValidationRuleInput);
  };

  const handleEntityTypeChange = value => {
    const updateValidationRuleInput = {
      id: maxValue.id,
      maxValueInput: {
        inclusive: maxValue.inclusive,
        entityType: value,
        previousAnswer: null,
        custom: null
      }
    };

    onUpdateAnswerValidation(updateValidationRuleInput);
  };

  const handleToggleChange = ({ value }) => {
    const toggleValidationRuleInput = {
      id: maxValue.id,
      enabled: value
    };

    onToggleValidationRule(toggleValidationRuleInput);
  };

  const handleCustomValueChange = ({ value }) => {
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

  const renderContent = () => {
    return (
      <Grid>
        <Column cols={3}>
          <ValidationTitle>Max Value is</ValidationTitle>
          <Connector />
        </Column>
        <Column cols={8}>
          <ValidationPills
            entityType={maxValue.entityType}
            answerType={answerType}
            previousAnswer={maxValue.previousAnswer}
            customValue={maxValue.custom}
            customValueLimit={limit}
            onEntityTypeChange={handleEntityTypeChange}
            onPreviousAnswerChange={handlePreviousAnswerChange}
            onCustomValueChange={handleCustomValueChange}
          />
          <InlineField>
            <ToggleSwitch
              id="max-value-include"
              name="max-value-include"
              onChange={handleIncludeChange}
              checked={maxValue.inclusive}
            />
            <Label inline htmlFor="max-value-include">
              Include this number
            </Label>
          </InlineField>
        </Column>
      </Grid>
    );
  };

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
  answerType: PropTypes.oneOf(Object.values(answerTypes)).isRequired,
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
      <MaxValue
        maxValue={answer.validation.maxValue}
        answerType={answer.type}
        {...props}
      />
    )}
  </ValidationContext.Consumer>
);

export default withQuestionPageEditing(MaxValueWithAnswer);

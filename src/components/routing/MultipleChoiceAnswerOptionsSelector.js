import React from "react";
import styled from "styled-components";

import { ToggleChip, ToggleChipGroup } from "components/ToggleChip";
import { get } from "lodash";

import { PropTypes } from "prop-types";

const MultipleChoiceAnswerOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1em 0;
`;

const MultipleChoiceAnswerOptionsSelector = ({
  condition,
  onConditionValueChange
}) => {
  const answerOptions = get(condition, "answer.options", []);
  const answerOtherOption = get(condition, "answer.other.option");
  const options = answerOtherOption
    ? answerOptions.concat(answerOtherOption)
    : answerOptions;

  const handleChange = ({ value }) =>
    onConditionValueChange(condition.id, value);

  return (
    <MultipleChoiceAnswerOptions data-test="options-selector">
      <ToggleChipGroup
        onChange={handleChange}
        value={condition.routingValue.value}
      >
        {options.map(option => (
          <ToggleChip key={option.id} value={option.id} title={option.label}>
            {option.label || <strong>Unlabelled option</strong>}
          </ToggleChip>
        ))}
      </ToggleChipGroup>
    </MultipleChoiceAnswerOptions>
  );
};

MultipleChoiceAnswerOptionsSelector.propTypes = {
  condition: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onConditionValueChange: PropTypes.func.isRequired
};

export default MultipleChoiceAnswerOptionsSelector;

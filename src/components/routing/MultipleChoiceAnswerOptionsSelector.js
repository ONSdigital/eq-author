import React from "react";
import styled from "styled-components";

import ToggleChip from "components/ToggleChip";
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

  return (
    <MultipleChoiceAnswerOptions data-test="options-selector">
      {options.map(option => (
        <ToggleChip
          key={option.id}
          name={option.id}
          title={option.label}
          onChange={({ name, value }) =>
            onConditionValueChange(condition.id, name, value)}
        >
          {option.label || <strong>Unlabelled option</strong>}
        </ToggleChip>
      ))}
    </MultipleChoiceAnswerOptions>
  );
};

MultipleChoiceAnswerOptionsSelector.propTypes = {
  condition: PropTypes.object.isRequired,
  onConditionValueChange: PropTypes.func.isRequired
};

export default MultipleChoiceAnswerOptionsSelector;

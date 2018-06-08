import React from "react";
import styled from "styled-components";

import ToggleChip from "components/ToggleChip";

import { PropTypes } from "prop-types";

const MultipleChoiceAnswerOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1em 0;
`;

const MultipleChoiceAnswerOptionsSelector = ({
  options,
  onOptionSelectionChange
}) => (
  <MultipleChoiceAnswerOptions>
    {options.map(option => (
      <ToggleChip
        key={option.id}
        id={option.id}
        checked={option.selected}
        title={option.label}
        onChange={onOptionSelectionChange}
      >
        {option.label || <strong>Unlabelled option</strong>}
      </ToggleChip>
    ))}
  </MultipleChoiceAnswerOptions>
);

MultipleChoiceAnswerOptionsSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onOptionSelectionChange: PropTypes.func.isRequired
};

export default MultipleChoiceAnswerOptionsSelector;

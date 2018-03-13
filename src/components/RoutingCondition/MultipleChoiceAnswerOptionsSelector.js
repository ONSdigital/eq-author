import React from "react";
import styled from "styled-components";

import ToggleChip from "components/ToggleChip";
import TextButton from "components/TextButton";
import { PropTypes } from "prop-types";

const MultipleChoiceAnswerOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5em 0;
`;

const MultipleChoiceAnswerOptionsSelector = ({
  options,
  onOptionSelectionChange,
  onSelectAll
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
        {option.label}
      </ToggleChip>
    ))}
    <TextButton data-test="btn-select-all" onClick={onSelectAll}>
      Select all
    </TextButton>
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
  onOptionSelectionChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired
};

export default MultipleChoiceAnswerOptionsSelector;

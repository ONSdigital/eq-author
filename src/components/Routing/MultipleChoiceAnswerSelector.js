import React from "react";
import styled from "styled-components";

import ToggleChip from "./ToggleChip";
import TextBtn from "./TextBtn";

const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;

class MultipleChoiceAnswerSelector extends React.Component {
  handleOptionChange = (id, selected) => {
    const { selectOption, deselectOption, conditionId } = this.props;
    selected ? selectOption(conditionId, id) : deselectOption(conditionId, id);
  };

  handleSelectAll = () => {
    const { options, selectOption, conditionId } = this.props;
    options.map(({ id }) => selectOption(conditionId, id));
  };

  render() {
    const { options, selectedOptions, conditionId } = this.props;

    return (
      <Answers>
        {options.map((option, index) => (
          <ToggleChip
            key={option.id}
            id={`${conditionId}-${option.id}`}
            name={option.id}
            label={option.label}
            onChange={this.handleOptionChange}
            checked={selectedOptions[option.id]}
          />
        ))}
        <TextBtn style={{ marginLeft: "0.5em" }} onClick={this.handleSelectAll}>
          Select all
        </TextBtn>
      </Answers>
    );
  }
}

export default MultipleChoiceAnswerSelector;

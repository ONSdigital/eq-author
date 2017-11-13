import React from "react";
import styled from "styled-components";

import AddBtn from "./AddBtn";
import AnswerPopup from "./AnswerPopup";
import Chip from "./Chip";
import { map } from "lodash";

import ComparatorSelect from "./ComparatorSelect";
import { Field, Flex, Input } from "./SelectorFields";

const options = [
  "Equals",
  "Not",
  "Greater than",
  "Greater than or equal to",
  "Less than",
  "Less than or equal to"
];

const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;

const Select = styled(ComparatorSelect)`
  margin: -0.5em 0 0.2em -0.5em;
  font-weight: 600;
`;

class NumericSelector extends React.Component {
  state = {
    showAnswerPopup: false,
    comparison: {
      value: null,
      comparator: "Equals"
    }
  };

  handleAddClick = e => {
    this.setState({
      showAnswerPopup: true,
      rect: e.currentTarget.getBoundingClientRect()
    });
  };

  handleAnswerPopupCancel = e => this.setState({ showAnswerPopup: false });

  handleAddAnswer = () => {
    this.props.addOption(
      this.props.conditionId,
      {
        type: "Numeric",
        comparison: this.state.comparison
      },
      this.state.comparison.id
    );
    this.setState({
      showAnswerPopup: false,
      comparison: {
        value: null,
        comparator: "Equals"
      }
    });
  };

  handleSetValue = e => {
    this.setState({
      comparison: {
        ...this.state.comparison,
        value: e.target.value
      }
    });
  };

  handleSetComparator = e => {
    this.setState({
      comparison: {
        ...this.state.comparison,
        comparator: e.target.value
      }
    });
  };

  handleChipClick = e => {
    this.setState({
      showAnswerPopup: true,
      comparison: {
        value: e.currentTarget.dataset.value,
        comparator: e.currentTarget.dataset.comparator,
        id: e.currentTarget.dataset.id
      },
      rect: e.currentTarget.getBoundingClientRect()
    });
  };

  autoFocus = input => input && input.focus();

  setPositioningContext = elem =>
    elem && (this.rect = elem.getBoundingClientRect());

  render() {
    const {
      selectedOptions,
      removeOption,
      multiselect,
      conditionId
    } = this.props;
    const numSelectedOptions = Object.keys(selectedOptions).length;
    let position = { top: 0, left: 0 };
    if (this.state.rect) {
      position = {
        top: this.state.rect.height + this.state.rect.top - this.rect.top,
        left: this.state.rect.left - this.rect.left
      };
    }

    return (
      <Answers innerRef={this.setPositioningContext}>
        <Answers>
          {map(selectedOptions, (option, id) => {
            if (!option.comparison) {
              return;
            }

            return (
              <Chip
                value={option.comparison.value}
                comparator={option.comparison.comparator}
                key={id}
                id={id}
                optionId={id}
                conditionId={conditionId}
                title={`${option.comparison.comparator} <strong>${option
                  .comparison.value}</strong>`}
                onRemove={removeOption}
                isEditing={
                  this.state.showAnswerPopup && id === this.state.comparison.id
                }
                onClick={this.handleChipClick}
              />
            );
          })}
          {(numSelectedOptions === 0 || multiselect) && (
            <AddBtn onClick={this.handleAddClick}>Add a condition</AddBtn>
          )}
        </Answers>

        {this.state.showAnswerPopup && (
          <AnswerPopup
            onDone={this.handleAddAnswer}
            onCancel={this.handleAnswerPopupCancel}
            position={position}
          >
            <Flex>
              <Field>
                <Select
                  defaultValue={this.state.comparison.comparator}
                  onChange={this.handleSetComparator}
                >
                  {options.map((opt, index) => (
                    <option value={opt} key={index}>
                      {opt}
                    </option>
                  ))}
                </Select>
                <Input
                  defaultValue={this.state.comparison.value}
                  onChange={this.handleSetValue}
                  type="number"
                  id="comparator"
                  placeholder=""
                  style={{ width: "7em" }}
                  innerRef={this.autoFocus}
                  valid
                />
              </Field>
            </Flex>
          </AnswerPopup>
        )}
      </Answers>
    );
  }
}

export default NumericSelector;

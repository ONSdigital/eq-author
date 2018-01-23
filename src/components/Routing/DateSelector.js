import React from "react";
import styled from "styled-components";

import AddBtn from "./AddBtn";
import AnswerPopup from "./AnswerPopup";
import Chip from "./Chip";
import { map } from "lodash";
import DateFields from "./DateFields";
import TextBtn from "./TextBtn";

import getFormattedDate from "./getFormattedDate";
import validateDate from "./validateDate";

const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;

const CompletionDateBtn = styled(TextBtn)`
  margin-top: 0.5em;
  margin-left: auto;
  font-size: 0.8em;
`;

const initialState = {
  showAnswerPopup: false,
  valid: null,
  comparison: { day: null, month: null, year: null, valid: null }
};

class DateSelector extends React.Component {
  state = initialState;

  handleAddClick = e => {
    this.setState({
      ...initialState,
      showAnswerPopup: true,
      rect: e.currentTarget.getBoundingClientRect()
    });
  };

  handleAddAnswer = () => {
    const { day, month, year, id } = this.state.comparison;
    const { addOption, conditionId } = this.props;
    const dateValid = validateDate(this.state.comparison);

    this.setState(
      {
        comparison: {
          ...this.state.comparison,
          valid: dateValid
        },
        valid: dateValid
      },
      () => {
        if (this.state.valid) {
          addOption(
            conditionId,
            {
              type: "Date",
              comparison: Date.UTC(year, month - 1, day)
            },
            id
          );
          this.setState(initialState);
        }
      }
    );
  };

  handleAddCompletionDate = () => {
    const { addOption, conditionId } = this.props;
    addOption(conditionId, {
      type: "Date",
      comparison: "completion"
    });
    this.setState(initialState);
  };

  handleAnswerPopupCancel = e => this.setState({ showAnswerPopup: false });

  handleDateChange = e => {
    const id = e.target.id.replace(`${e.target.dataset.prefix}-`, "");
    const { value } = e.target;
    const newDate = {
      ...this.state.comparison,
      [id]: value || ""
    };

    const newState = {
      comparison: {
        ...newDate,
        valid: validateDate(newDate)
      }
    };

    if (e.type === "change") {
      this.setState(newState);
    } else {
      this.setState(
        {
          comparison: {
            ...this.state.comparison,
            [id]: 0
          }
        },
        () => {
          this.setState({
            comparison: {
              ...this.state.comparison,
              [id]: parseInt(value, 10) || ""
            }
          });
        }
      );
    }
  };

  handleChipClick = e => {
    const date = new Date(parseInt(e.currentTarget.dataset.value, 10));

    this.setState({
      showAnswerPopup: true,
      comparison: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        id: e.currentTarget.dataset.id
      },
      rect: e.currentTarget.getBoundingClientRect()
    });
  };

  setPositioningContext = elem =>
    elem && (this.rect = elem.getBoundingClientRect());

  render() {
    const {
      selectedOptions,
      removeOption,
      completionOption,
      conditionId,
      multiselect
    } = this.props;
    let position = { top: 0, left: 0 };
    if (this.state.rect) {
      position = {
        top: this.state.rect.height + this.state.rect.top - this.rect.top,
        left: this.state.rect.left - this.rect.left
      };
    }
    const numSelectedOptions = Object.keys(selectedOptions).length;

    const valid = this.state.valid !== false;

    return (
      <Answers innerRef={this.setPositioningContext}>
        <Answers>
          {map(selectedOptions, (option, id) => {
            if (!option.comparison) {
              return null;
            }
            let date;

            if (option.comparison === "completion") {
              date = "Completion date";
              if (!completionOption) {
                return null;
              }
            } else {
              date = getFormattedDate(new Date(option.comparison));
            }

            return (
              <Chip
                value={option.comparison}
                key={id}
                id={id}
                title={date}
                optionId={id}
                conditionId={conditionId}
                onClick={this.handleChipClick}
                onRemove={removeOption}
                isEditing={
                  this.state.showAnswerPopup && id === this.state.comparison.id
                }
              />
            );
          })}
        </Answers>
        {(numSelectedOptions === 0 || multiselect) && (
          <AddBtn onClick={this.handleAddClick}>Add a date</AddBtn>
        )}

        {this.state.showAnswerPopup && (
          <AnswerPopup
            onDone={this.handleAddAnswer}
            onCancel={this.handleAnswerPopupCancel}
            position={position}
            valid={valid}
            validationError={"Please enter a valid date"}
          >
            <DateFields
              value={this.state.comparison}
              prefix="date"
              legend={"Enter a date"}
              onChange={this.handleDateChange}
              onBlur={this.handleDateChange}
              valid={valid}
            />

            {completionOption && (
              <CompletionDateBtn onClick={this.handleAddCompletionDate}>
                USE COMPLETION
              </CompletionDateBtn>
            )}
          </AnswerPopup>
        )}
      </Answers>
    );
  }
}

export default DateSelector;

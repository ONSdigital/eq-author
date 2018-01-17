import React from "react";
import styled from "styled-components";
import AddBtn from "./AddBtn";
import AnswerPopup from "./AnswerPopup";
import Chip from "./Chip";
import { map } from "lodash";

import DateFields from "./DateFields";
import getFormattedDate from "./getFormattedDate";
import validateDate from "./validateDate";

const Answers = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
`;

const initialState = {
  showAnswerPopup: false,
  valid: null,
  comparison: {
    from: { day: null, month: null, year: null, valid: null },
    to: { day: null, month: null, year: null, valid: null }
  }
};

class DateRangeSelector extends React.Component {
  state = initialState;

  handleAddClick = e => {
    this.setState({
      ...initialState,
      showAnswerPopup: true,
      rect: e.currentTarget.getBoundingClientRect()
    });
  };

  handleAddAnswer = () => {
    const { id } = this.state.comparison;
    const from = this.state.comparison.from;
    const to = this.state.comparison.to;

    this.setState(
      {
        comparison: {
          ...this.state.comparison
        },
        valid:
          this.state.comparison.from.valid && this.state.comparison.to.valid
      },
      () => {
        if (this.state.valid) {
          this.props.addOption(
            {
              type: "DateRange",
              comparison: {
                from: Date.UTC(from.year, from.month - 1, from.day),
                to: Date.UTC(to.year, to.month - 1, to.day)
              }
            },
            id
          );
          this.setState({
            showAnswerPopup: false
          });
        }
      }
    );
  };

  handleAnswerPopupCancel = e => this.setState({ showAnswerPopup: false });

  handleDateRangeChange = e => {
    const prefix = `${e.target.dataset.prefix}`;
    const id = e.target.id.split("-")[1];

    const newDate = {
      ...this.state.comparison[prefix],
      [id]: parseInt(e.target.value, 10)
    };

    const newState = {
      comparison: {
        ...this.state.comparison,
        [prefix]: {
          ...newDate,
          valid: validateDate(newDate)
        }
      }
    };

    if (e.type === "change") {
      this.setState(newState);
    } else {
      this.setState(
        {
          comparison: {
            ...this.state.comparison,
            [prefix]: {
              ...this.state.comparison[prefix],
              [id]: 0
            }
          }
        },
        () => this.setState(newState)
      );
    }
  };

  handleChipClick = e => {
    const value = JSON.parse(e.currentTarget.dataset.value);
    const from = new Date(parseInt(value.from, 10));
    const to = new Date(parseInt(value.to, 10));

    this.setState({
      showAnswerPopup: true,
      valid: true,
      comparison: {
        from: {
          day: from.getDate(),
          month: from.getMonth() + 1,
          year: from.getFullYear(),
          valid: true
        },
        to: {
          day: to.getDate(),
          month: to.getMonth() + 1,
          year: to.getFullYear(),
          valid: true
        },
        id: e.currentTarget.dataset.id
      },
      rect: e.currentTarget.getBoundingClientRect()
    });
  };

  setPositioningContext = elem =>
    elem && (this.rect = elem.getBoundingClientRect());

  render() {
    const { selectedOptions, removeOption, conditionId } = this.props;
    let position = { top: 0, left: 0 };
    if (this.state.rect) {
      position = {
        top: this.state.rect.height + this.state.rect.top - this.rect.top,
        left: this.state.rect.left - this.rect.left
      };
    }

    const valid = this.state.valid !== false;

    return (
      <Answers innerRef={this.setPositioningContext}>
        <Answers>
          {map(selectedOptions, (option, id) => {
            const daterange = option.comparison;

            if (!daterange) {
              return null;
            }

            const from = getFormattedDate(new Date(daterange.from), true);
            const to = getFormattedDate(new Date(daterange.to), true);

            return (
              <Chip
                value={JSON.stringify(option.comparison)}
                key={id}
                id={id}
                title={`<strong>${from}</strong> and <strong>${to}</strong>`}
                onRemove={removeOption}
                optionId={id}
                conditionId={conditionId}
                onClick={this.handleChipClick}
                isEditing={
                  this.state.showAnswerPopup && id === this.state.comparison.id
                }
              />
            );
          })}
        </Answers>
        <AddBtn onClick={this.handleAddClick}>Add a date range</AddBtn>
        {this.state.showAnswerPopup && (
          <AnswerPopup
            onDone={this.handleAddAnswer}
            onCancel={this.handleAnswerPopupCancel}
            position={position}
            valid={valid}
            validationError={"Please enter valid dates"}
          >
            <div className="blah">
              <DateFields
                value={this.state.comparison.from}
                valid={valid || this.state.comparison.from.valid}
                prefix="from"
                legend={"Date from"}
                onChange={this.handleDateRangeChange}
                onBlur={this.handleDateRangeChange}
              />
              <br />
              <DateFields
                value={this.state.comparison.to}
                valid={valid || this.state.comparison.to.valid}
                prefix="to"
                legend={"Date to"}
                onChange={this.handleDateRangeChange}
                onBlur={this.handleDateRangeChange}
                doAutofocus={false}
              />
            </div>
          </AnswerPopup>
        )}
      </Answers>
    );
  }
}

export default DateRangeSelector;

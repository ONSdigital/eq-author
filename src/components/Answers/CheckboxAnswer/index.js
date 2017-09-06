/* eslint-disable react/no-find-dom-node */
import React, { Component } from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styled from "styled-components";

import { colors } from "constants/theme";

import Button from "components/Button";

import CheckboxOption from "./CheckboxOption";

const CheckboxAnswerWrapper = styled.div`
  width: 20em;
  margin: 0;
`;

const CheckboxOptions = styled.div`margin: 0 0 1em 0;`;

export const AddOtherLink = styled.button`
  color: #48a6f6;
  text-decoration: none;
  border: 0;
  background: none;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  color: ${colors.lightGrey};
  padding: .2em;
  border: 0;
  background: none;
  font-size: 1em;

  position: absolute;
  top: .5em;
  right: 1em;

  transition: color .2s ease-in-out;

  &:hover {
    color: ${colors.darkGrey};
    transition: color .2s ease-in-out;
  }
`;

class CheckboxAnswer extends Component {
  static propTypes = {
    answer: CustomPropTypes.answer.isRequired,
    answerIndex: PropTypes.number.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired
    // onEntered: PropTypes.func.isRequired
  };

  handleOptionDelete = optionId => {
    this.props.onDeleteOption(optionId, this.props.answer.id);
  };

  handleAddOptionClick = e => {
    e.preventDefault();
    this.props.onAddOption(this.props.answer.id);
  };

  render() {
    const {
      answer,
      answerIndex,
      onAddOption,
      onDeleteOption,
      ...otherProps
    } = this.props;

    return (
      <CheckboxAnswerWrapper>
        <TransitionGroup component={CheckboxOptions}>
          {answer.options.map((option, optionIndex, options) => {
            const optionName = `answer-${answer.id}-option-${option.id}`;

            return (
              <CSSTransition timeout={200} classNames="option" key={optionName}>
                <CheckboxOption
                  option={option}
                  optionIndex={optionIndex}
                  optionName={optionName}
                  answerIndex={answerIndex}
                  onDelete={this.handleOptionDelete}
                  hasDeleteButton={options.length > 1}
                  {...otherProps}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <div>
          <Button type="button" secondary onClick={this.handleAddOptionClick}>
            Add another option
          </Button>
        </div>
      </CheckboxAnswerWrapper>
    );
  }
}

export default CheckboxAnswer;

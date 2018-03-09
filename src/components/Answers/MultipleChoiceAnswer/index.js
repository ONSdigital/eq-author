import React, { Component } from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import focusOnEntity from "utils/focusOnEntity";

import Button from "components/Button";

import Option from "./Option";
import BasicAnswer from "components/Answers/BasicAnswer";

import { colors } from "constants/theme";
import { CHECKBOX } from "constants/answer-types";

const AnswerWrapper = styled.div`
  width: 50%;
  margin: 0;
`;

const AnswerHelper = styled.div`
  margin-bottom: 0.5em;
  font-size: 0.9em;
  font-weight: 600;
  color: ${colors.text};
`;

const Options = styled.div`
  margin: 0 0 1em;
`;

export const AddOtherLink = styled.button`
  color: #48a6f6;
  text-decoration: none;
  border: 0;
  background: none;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  color: ${colors.lightGrey};
  padding: 0.2em;
  border: 0;
  background: none;
  font-size: 1em;
  position: absolute;
  top: 0.5em;
  right: 1em;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${colors.darkGrey};
    transition: color 0.2s ease-in-out;
  }
`;

class MultipleChoiceAnswer extends Component {
  static propTypes = {
    answer: CustomPropTypes.answer.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    minOptions: PropTypes.number.isRequired,
    id: PropTypes.string
  };

  static defaultProps = {
    minOptions: 1
  };

  handleOptionDelete = optionId => {
    this.props.onDeleteOption(optionId, this.props.answer.id);
  };

  handleAddOption = e => {
    e.preventDefault();
    return this.props.onAddOption(this.props.answer.id).then(focusOnEntity);
  };

  render() {
    const {
      answer,
      onUpdateOption,
      onUpdate,
      minOptions,
      id,
      ...otherProps
    } = this.props;

    return (
      <BasicAnswer
        answer={answer}
        onUpdate={onUpdate}
        labelPlaceholder="Label (optional)"
      >
        <AnswerWrapper>
          {answer.type === CHECKBOX && (
            <AnswerHelper>Select all that apply</AnswerHelper>
          )}
          <TransitionGroup component={Options}>
            {answer.options.map((option, optionIndex, options) => (
              <CSSTransition timeout={200} classNames="option" key={option.id}>
                <Option
                  {...otherProps}
                  option={option}
                  onDelete={this.handleOptionDelete}
                  onUpdate={onUpdateOption}
                  onEnterKey={this.handleAddOption}
                  hasDeleteButton={options.length > minOptions}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
          <div>
            <Button
              type="button"
              secondary
              onClick={this.handleAddOption}
              data-test="btn-add-option"
            >
              Add another option
            </Button>
          </div>
        </AnswerWrapper>
      </BasicAnswer>
    );
  }
}

export default MultipleChoiceAnswer;

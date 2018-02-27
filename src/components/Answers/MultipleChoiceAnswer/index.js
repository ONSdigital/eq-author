import React, { Component } from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import focusOnEntity from "utils/focusOnEntity";

import { colors } from "constants/theme";
import Button from "components/Button";
import Option from "./Option";

const AnswerWrapper = styled.div`
  width: 50%;
  margin: 0;
`;

const AnswerHelper = styled.div`
  margin-bottom: 1em;
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

  handleAddOptionClick = e => {
    e.preventDefault();

    return this.props.onAddOption(this.props.answer.id).then(focusOnEntity);
  };

  render() {
    const {
      answer,
      onUpdateOption,
      minOptions,
      id,
      ...otherProps
    } = this.props;

    return (
      <AnswerWrapper>
        {answer.type === "Checkbox" && (
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
                hasDeleteButton={options.length > minOptions}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
        <div>
          <Button
            type="button"
            secondary
            onClick={this.handleAddOptionClick}
            data-test="btn-add-option"
          >
            Add another option
          </Button>
        </div>
      </AnswerWrapper>
    );
  }
}

export default MultipleChoiceAnswer;

import React, { Component } from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { last } from "lodash";

import { colors } from "constants/theme";
import Button from "components/Button";
import Option from "./Option";

const AnswerWrapper = styled.div`
  width: 25em;
  margin: 0;
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
    minOptions: PropTypes.number.isRequired
  };

  static defaultProps = {
    minOptions: 1
  };

  handleOptionDelete = optionId => {
    this.props.onDeleteOption(optionId, this.props.answer.id);
  };

  handleAddOptionClick = e => {
    e.preventDefault();
    const answerId = this.props.answer.id;
    return this.props.onAddOption(answerId).then(() => {
      const nodes = document.querySelectorAll(
        `#answer-${answerId} [data-autofocus]`
      );
      const node = last(nodes);
      if (node) {
        node.focus();
      }
      return node;
    });
  };

  render() {
    const { answer, onUpdateOption, minOptions, ...otherProps } = this.props;

    return (
      <AnswerWrapper id={`answer-${answer.id}`}>
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
            data-qa="addAnotherOption"
          >
            Add another option
          </Button>
        </div>
      </AnswerWrapper>
    );
  }
}

export default MultipleChoiceAnswer;

import React, { Component } from "react";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import focusOnEntity from "utils/focusOnEntity";

import Option from "./Option";
import BasicAnswer from "components/Answers/BasicAnswer";

import { colors } from "constants/theme";
import { CHECKBOX } from "constants/answer-types";
import SplitButton from "components/SplitButton";
import Dropdown from "components/SplitButton/Dropdown";
import MenuItem from "components/SplitButton/MenuItem";
import TextAnswer from "components/Answers/TextAnswer";

import { last } from "lodash";

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

const OtherAnswerWrapper = styled.div`
  padding-top: 0.25em;
  margin-bottom: 1em;
`;

class MultipleChoiceAnswer extends Component {
  static propTypes = {
    answer: CustomPropTypes.answer.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onUpdateOption: PropTypes.func.isRequired,
    onDeleteOption: PropTypes.func.isRequired,
    onAddOther: PropTypes.func.isRequired,
    onDeleteOther: PropTypes.func.isRequired,
    minOptions: PropTypes.number.isRequired
  };

  static defaultProps = {
    minOptions: 1
  };

  state = {
    open: false
  };

  handleOptionDelete = optionId => {
    this.props.onDeleteOption(optionId, this.props.answer.id);
  };

  handleAddOption = e => {
    e.preventDefault();
    return this.props.onAddOption(this.props.answer.id).then(focusOnEntity);
  };

  handleAddOther = e => {
    e.preventDefault();
    return this.props
      .onAddOther(this.props.answer)
      .then(res => {
        this.handleToggleOpen(false);
        return res;
      })
      .then(res => res.option)
      .then(focusOnEntity);
  };

  handleDeleteOther = e => {
    return this.props
      .onDeleteOther(this.props.answer)
      .then(() => last(this.props.answer.options))
      .then(focusOnEntity);
  };

  handleToggleOpen = open => {
    this.setState({
      open
    });
  };

  render() {
    const {
      answer,
      onUpdateOption,
      onUpdate,
      minOptions,
      ...otherProps
    } = this.props;

    const numberOfOptions = answer.options.length + (answer.other ? 1 : 0);
    const showDeleteOption = numberOfOptions > minOptions;

    return (
      <BasicAnswer
        answer={answer}
        onUpdate={onUpdate}
        labelPlaceholder="Label (optional)"
        autoFocus={false}
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
                  hasDeleteButton={showDeleteOption}
                />
              </CSSTransition>
            ))}
            {answer.other && (
              <CSSTransition
                timeout={200}
                classNames="option"
                key={answer.other.option.id}
              >
                <Option
                  {...otherProps}
                  option={answer.other.option}
                  onDelete={this.handleDeleteOther}
                  onUpdate={onUpdateOption}
                  onEnterKey={this.handleAddOption}
                  labelPlaceholder="Other"
                  hasDeleteButton={showDeleteOption}
                >
                  <OtherAnswerWrapper data-test="other-answer">
                    <TextAnswer
                      answer={answer.other.answer}
                      onUpdate={onUpdate}
                      labelPlaceholder="Please specify"
                      showDescription={false}
                      size="tiny"
                    />
                  </OtherAnswerWrapper>
                </Option>
              </CSSTransition>
            )}
          </TransitionGroup>
          <div>
            <SplitButton
              onPrimaryAction={this.handleAddOption}
              primaryText="Add another option"
              onToggleOpen={this.handleToggleOpen}
              open={this.state.open}
              dataTest="btn-add-option"
            >
              <Dropdown>
                <MenuItem
                  onClick={this.handleAddOther}
                  disabled={answer.other !== null}
                  data-test="btn-add-option-other"
                >
                  Add &quot;other&quot; option
                </MenuItem>
              </Dropdown>
            </SplitButton>
          </div>
        </AnswerWrapper>
      </BasicAnswer>
    );
  }
}

export default MultipleChoiceAnswer;

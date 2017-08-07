import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import Button from "components/Button";
import { Field, Input } from "components/Forms";

import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

import { colors } from "constants/theme";

import styled from "styled-components";

const duration = 200;

const CheckboxAnswerWrapper = styled.div`
  width: 20em;
  margin: 0;
`;

const CheckboxOptions = styled.div`margin: 0 0 1em 0;`;

export const CheckboxOption = styled.div`
  border: 1px solid
    ${props => (props.focused ? colors.lightBlue : colors.borders)};
  padding: 1em 1em 0 1em;
  border-radius: 3px;
  position: relative;

  &:not(:first-child) {
    margin-top: .5em;
  }

  &.option-enter {
    opacity: 0;
    height: 0;
    transform: translateX(-20px);
  }

  &.option-enter-active {
    transition: height ${duration / 2}ms ease-out,
      opacity ${duration / 2}ms ease-out ${duration / 2}ms,
      transform ${duration / 2}ms ease-out ${duration / 2}ms;
    opacity: 1;
    height: 5.625em;
    transform: translateX(0);
  }

  &.option-exit {
    opacity: 1;
    height: 5.625em;
    transform: translateX(0);
  }

  &.option-exit-active {
    transition: opacity ${duration / 2}ms ease-out,
      transform ${duration / 2}ms ease-out,
      height ${duration / 2}ms ease-out ${duration / 2}ms;
    opacity: 0;
    height: 0;
    transform: translateX(-20px);
  }
`;

const SeamlessLabel = styled(SeamlessInput)`
  display: inline-block !important;
  width: auto;
  vertical-align: middle;
`;

export const AddOtherLink = styled.button`
  color: #48a6f6;
  text-decoration: none;
  border: 0;
  background: none;
`;

const StyledCheckboxInput = styled(Input)`
  border: 2px solid ${colors.borders};
  height: 1.4em;
  width: 1.4em;
`;

export const CloseButton = styled.button`display: block;`;

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

const CheckboxAnswer = ({
  id,
  answerIndex,
  answer,
  onChange,
  onAddOption,
  onDeleteOption,
  onFocus,
  onBlur
}) => {
  return (
    <CheckboxAnswerWrapper>
      <TransitionGroup component={CheckboxOptions}>
        {answer.options.map((option, optionIndex) => {
          const optionId = `answer-${answer.id}-option-${option.id}`;
          const handleFocus = function(e) {
            e.stopPropagation();
            onFocus(optionId);
          };
          const handleBlur = function(e) {
            e.stopPropagation();
            onBlur();
          };
          return (
            <CSSTransition
              key={option.clientId || option.id}
              timeout={duration}
              classNames="option"
            >
              <CheckboxOption key={option.id} focused={option.focused}>
                <Field
                  id={`answers[${answerIndex}].options[${optionIndex}].label`}
                >
                  <StyledCheckboxInput type="checkbox" disabled />
                  <SeamlessLabel
                    placeholder="Label"
                    size="medium"
                    onChange={onChange}
                    value={option.label}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoFocus
                  />
                </Field>
                <Field
                  id={`answers[${answerIndex}].options[${optionIndex}].description`}
                >
                  <SeamlessTextArea
                    cols="30"
                    rows="5"
                    placeholder="Optional description"
                    onChange={onChange}
                    value={option.description}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Field>
                {optionIndex > 0 &&
                  <CloseButton
                    name={`answers[${answerIndex}].options[${optionIndex}].delete`}
                    type="button"
                    onClick={function(e) {
                      e.preventDefault();
                      onDeleteOption(option.id, answer.id);
                    }}
                  >
                    &times;
                  </CloseButton>}
              </CheckboxOption>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <div>
        <Button
          type="button"
          secondary
          onClick={function() {
            onAddOption(answer.id);
          }}
        >
          Add another option
        </Button>
      </div>
    </CheckboxAnswerWrapper>
  );
};

CheckboxAnswer.propTypes = {
  id: PropTypes.string,
  answerIndex: PropTypes.number.isRequired,
  answer: CustomPropTypes.answer.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired
};

export default CheckboxAnswer;

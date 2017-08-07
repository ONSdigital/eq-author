import React from "react";
import PropTypes from "prop-types";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import Button from "../../Button";
import { Field, Input } from "../../Forms";

import SeamlessInput from "../../QuestionnaireDesign/SeamlessInput";
import SeamlessTextArea from "../../QuestionnaireDesign/SeamlessTextArea";

import styled from "styled-components";

const duration = 200;

const CheckboxAnswerWrapper = styled.div`
  width: 20em;
  margin: 0 auto;
`;

const CheckboxOptions = styled.div`margin: 1em 0;`;

export const CheckboxOption = styled.div`
  border: 1px solid #e5e5e5;
  padding: 1em 1em 0em 1em;
  border-radius: 4px;

  position: relative;

  transition: height ${duration / 2}ms ease-out,
    opacity ${duration}ms ease-out ${duration}ms, padding ${duration}ms ease-out,
    transform ${duration}ms ease-out ${duration}ms;
  opacity: 1;
  transform: translateX(0);

  &:not(:first-child) {
    margin-top: .5em;
  }

  &.option-enter {
    opacity: 0;
    height: 0;
    padding: 0;
    transform: translateX(-20px);
  }

  &.option-entered {
    height: auto;
  }
`;

const SeamlessLabel = styled(SeamlessInput)`
  display: inline-block !important;
  width: auto;
`;

export const AddOtherLink = styled.a`
  color: #48a6f6;
  text-decoration: none;
`;

const StyledCheckboxInput = styled(Input)`
  border: 2px solid #979797;
  height: 1.4em;
  width: 1.4em;
`;

export const CloseButton = styled.button`
  float: right;
  cursor: pointer;
  color: #ccc;
  padding: .2em;
  border: 0;
  background: none;
  font-size: 1em;

  position: absolute;
  top: .5em;
  right: 1em;

  transition: color .2s ease-in-out;

  &:hover {
    color: #333;
    transition: color .2s ease-in-out;
  }
`;

const OtherOption = styled.small`margin: 0 .5em;`;

const CheckboxAnswer = ({
  options,
  onChangeLabel,
  onChangeDescription,
  onAddOption,
  onDeleteOption,
  onAddOther
}) => {
  return (
    <CheckboxAnswerWrapper>
      <TransitionGroup component={CheckboxOptions}>
        {options &&
          options.map(option =>
            <CSSTransition
              key={option.id}
              timeout={duration}
              classNames="option"
            >
              <CheckboxOption key={option.id}>
                <Field id={"option." + option.id + ".label"}>
                  <StyledCheckboxInput type="checkbox" disabled />
                  <SeamlessLabel
                    placeholder="Label"
                    size="medium"
                    onChange={onChangeLabel}
                    value={option.label}
                  />
                </Field>
                <Field id={"option." + option.id + ".description"}>
                  <SeamlessTextArea
                    cols="30"
                    rows="5"
                    placeholder="Optional description"
                    onChange={onChangeDescription}
                    value={option.description}
                  />
                </Field>
                <CloseButton
                  name={"option." + option.id + ".delete"}
                  onClick={onDeleteOption}
                >
                  &times;
                </CloseButton>
              </CheckboxOption>
            </CSSTransition>
          )}
      </TransitionGroup>
      <div>
        <Button secondary onClick={onAddOption}>
          Add another option
        </Button>
        <OtherOption>
          or{" "}
          <AddOtherLink href="#" onClick={onAddOther}>
            add other
          </AddOtherLink>
        </OtherOption>
      </div>
    </CheckboxAnswerWrapper>
  );
};

CheckboxAnswer.defaultProps = {
  options: [
    {
      id: 1,
      label: "",
      description: ""
    }
  ]
};

CheckboxAnswer.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  onChangeLabel: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onAddOption: PropTypes.func.isRequired,
  onDeleteOption: PropTypes.func.isRequired,
  onAddOther: PropTypes.func.isRequired
};

export default CheckboxAnswer;

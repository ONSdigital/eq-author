import React, { Component } from "react";
import styled from "styled-components";

import { colors } from "constants/theme";
import { Field, Input } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";

const duration = 200;

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

const StyledCheckboxInput = styled(Input)`
  border: 2px solid ${colors.borders};
  height: 1.4em;
  width: 1.4em;
`;

export const StyledCheckboxOption = styled.div`
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

export const SeamlessLabel = styled(SeamlessInput)`
  display: inline-block !important;
  width: auto;
  vertical-align: middle;
`;

class CheckboxOption extends Component {
  static propTypes = {
    id: PropTypes.string,
    answerIndex: PropTypes.number.isRequired,
    option: CustomPropTypes.option.isRequired,
    optionName: PropTypes.string.isRequired,
    optionIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    hasDeleteButton: PropTypes.bool.isRequired
  };

  handleFocus = e => {
    e.stopPropagation();
    this.props.onFocus(this.props.optionName);
  };

  handleBlur = e => {
    e.stopPropagation();
    this.props.onBlur();
  };

  handleDeleteClick = e => {
    e.preventDefault();
    this.props.onDelete(this.props.option.id);
  };

  render() {
    const {
      option,
      optionIndex,
      answerIndex,
      onChange,
      hasDeleteButton
    } = this.props;

    const id = `answers[${answerIndex}].options[${optionIndex}]`;

    return (
      <StyledCheckboxOption key={option.id} focused={option.focused}>
        <Field id={`${id}.label`}>
          <StyledCheckboxInput type="checkbox" disabled />
          <SeamlessLabel
            placeholder="Label"
            size="medium"
            onChange={onChange}
            value={option.label}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            data-autoFocus
          />
        </Field>
        <Field id={`${id}.description`}>
          <SeamlessTextArea
            cols="30"
            rows="5"
            placeholder="Optional description"
            onChange={onChange}
            value={option.description}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </Field>
        {hasDeleteButton &&
          <DeleteButton type="button" onClick={this.handleDeleteClick}>
            &times;
          </DeleteButton>}
      </StyledCheckboxOption>
    );
  }
}

export default CheckboxOption;

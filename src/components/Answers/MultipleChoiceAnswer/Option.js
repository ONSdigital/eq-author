import React, { Component } from "react";
import styled from "styled-components";

import { colors } from "constants/theme";
import { Field, Input } from "components/Forms";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";

import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import DeleteButton from "components/DeleteButton";
import Tooltip from "components/Tooltip";

const duration = 200;

export const DeleteContainer = styled.div`
  padding: .2em;
  position: absolute;
  top: .5em;
  right: 1em;
`;

export const StyledOption = styled.div`
  border: 1px solid ${colors.borders};
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

const StyledInput = styled(Input)`
  border: 2px solid ${colors.borders};
  height: 1.4em;
  width: 1.4em;
`;

export class StatelessOption extends Component {
  static propTypes = {
    option: CustomPropTypes.option.isRequired,
    onChange: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    hasDeleteButton: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(["radio", "checkbox"])
  };

  handleDeleteClick = e => {
    this.props.onDelete(this.props.option.id);
  };

  renderDeleteButton() {
    return (
      <DeleteContainer>
        <Tooltip content="Delete option">
          <DeleteButton
            size="small"
            aria-label="Delete option"
            onClick={this.handleDeleteClick}
          />
        </Tooltip>
      </DeleteContainer>
    );
  }

  render() {
    const { hasDeleteButton, option, onChange, onUpdate, type } = this.props;

    return (
      <StyledOption key={option.id}>
        <Field id="label">
          <StyledInput type={type} disabled />
          <SeamlessLabel
            placeholder="Label"
            size="medium"
            value={option.label}
            onChange={onChange}
            onBlur={onUpdate}
            data-autoFocus
          />
        </Field>
        <Field id="description">
          <SeamlessTextArea
            cols="30"
            rows="5"
            placeholder="Optional description"
            onChange={onChange}
            value={option.description}
            onBlur={onUpdate}
          />
        </Field>
        {hasDeleteButton && this.renderDeleteButton()}
      </StyledOption>
    );
  }
}

export default withEntityEditor("option")(StatelessOption);

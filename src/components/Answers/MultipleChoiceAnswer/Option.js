import React, { Component } from "react";
import styled from "styled-components";
import { colors, radius } from "constants/theme";
import { Field } from "components/Forms";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import withEntityEditor from "components/withEntityEditor";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import DeleteButton from "components/DeleteButton";
import Tooltip from "components/Tooltip";
import { CHECKBOX, RADIO } from "constants/answer-types";
import { get } from "lodash";
import optionFragment from "graphql/fragments/option.graphql";

export const DeleteContainer = styled.div`
  padding: 0.2em;
  position: absolute;
  top: 0.5em;
  right: 1em;
`;

const borderRadii = {
  [CHECKBOX]: "3px",
  [RADIO]: "100%"
};

const DummyInput = styled.div`
  border: ${radius} solid ${colors.borders};
  height: 1.4em;
  width: 1.4em;
  display: inline-block;
  margin: 0 1em 0 0;
  vertical-align: top;
  border-radius: ${props => get(borderRadii, props.type, "initial")};
`;

export const StyledOption = styled.div`
  border: 1px solid ${colors.borders};
  padding: 1em 1em 0;
  border-radius: 3px;
  position: relative;

  &:not(:first-child) {
    margin-top: 0.5em;
  }

  &.option-enter {
    opacity: 0;
    height: 0;
    transform: translateX(-20px);
  }

  &.option-enter-active {
    transition: height ${props => props.duration / 2}ms ease-out,
      opacity ${props => props.duration / 2}ms ease-out
        ${props => props.duration / 2}ms,
      transform ${props => props.duration / 2}ms ease-out
        ${props => props.duration / 2}ms;
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
    transition: opacity ${props => props.duration / 2}ms ease-out,
      transform ${props => props.duration / 2}ms ease-out,
      height ${props => props.duration / 2}ms ease-out
        ${props => props.duration / 2}ms;
    opacity: 0;
    height: 0;
    transform: translateX(-20px);
  }
`;

StyledOption.defaultProps = {
  duration: 200
};

StyledOption.propTypes = {
  duration: PropTypes.number
};

export const SeamlessLabel = styled(SeamlessTextArea)`
  display: inline-block !important;
  width: auto;
  vertical-align: middle;
  margin-right: 1.5em;
  flex: 1 1 0%;
`;

const LabelField = styled(Field)`
  display: flex;
`;

export class StatelessOption extends Component {
  static propTypes = {
    option: CustomPropTypes.option.isRequired,
    onChange: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    hasDeleteButton: PropTypes.bool.isRequired,
    type: PropTypes.oneOf([RADIO, CHECKBOX]).isRequired
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
        <LabelField id="label">
          <DummyInput type={type} />
          <SeamlessLabel
            placeholder="Label"
            size="medium"
            value={option.label}
            onChange={onChange}
            onBlur={onUpdate}
            data-qa="optionLabel"
            data-autofocus
          />
        </LabelField>
        <Field id="description">
          <SeamlessTextArea
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

export default withEntityEditor("option", optionFragment)(StatelessOption);

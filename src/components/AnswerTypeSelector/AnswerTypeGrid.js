/* eslint-disable react/no-find-dom-node */
import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { IconGrid } from "components/IconGrid";
import AnswerTypeButton from "./AnswerTypeButton";
import styled from "styled-components";
import {
  TEXTFIELD,
  NUMBER,
  CURRENCY,
  TEXTAREA,
  CHECKBOX,
  RADIO,
  TIME,
  DATE_RANGE,
  DATE
} from "constants/answer-types";

const Menu = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 5px 20px 0;
  width: 340px;
  text-align: initial;
`;

const Header = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1.5em;
`;

const Title = styled.div`
  color: #444;
  font-size: 0.6em;
  font-weight: 900;
  text-transform: uppercase;
`;

export const CloseButton = styled.button`
  color: #444;
  border: none;
  background: none;
  font-size: 1em;
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  line-height: 0.6;
  padding: 0;
  cursor: pointer;
`;

class AnswerTypeGrid extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
    "aria-labelledby": PropTypes.string
  };

  handleSelect = type => {
    this.props.onClose();
    this.props.onSelect(type);
  };

  focusMenuItem = () => {
    findDOMNode(this.button).focus();
  };

  saveButtonRef = button => {
    this.button = button;
  };

  render() {
    const { onClose, "aria-labelledby": labelledby } = this.props;

    return (
      <Menu>
        <Header>
          <Title>Answer Type</Title>
          <CloseButton onClick={onClose} aria-label="Close" type="button">
            ×
          </CloseButton>
        </Header>
        <IconGrid aria-labelledby={labelledby}>
          <AnswerTypeButton
            type={CHECKBOX}
            title="Checkbox"
            onClick={this.handleSelect}
            ref={this.saveButtonRef}
          />
          <AnswerTypeButton
            type={RADIO}
            title="Radio"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type={TEXTFIELD}
            title="Text"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type={TEXTAREA}
            title="Textarea"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type={CURRENCY}
            title="Currency"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type={NUMBER}
            title="Number"
            onClick={this.handleSelect}
          />

          <AnswerTypeButton
            type={DATE}
            title="Date"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type={DATE_RANGE}
            title="Date range"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type={TIME}
            title="Time"
            onClick={this.handleSelect}
            disabled
          />
        </IconGrid>
      </Menu>
    );
  }
}

export default AnswerTypeGrid;

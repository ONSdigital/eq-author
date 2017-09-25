/* eslint-disable react/no-find-dom-node */
import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { IconGrid } from "components/IconGrid";
import AnswerTypeButton from "./AnswerTypeButton";
import styled from "styled-components";

const Menu = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0 5px 20px 0px;
  width: 340px;
`;

const Header = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 1.5em;
`;

const Title = styled.div`
  color: #444;
  font-size: 0.6em;
  font-weight: bold;
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
            type="Checkbox"
            title="Checkbox"
            onClick={this.handleSelect}
            ref={this.saveButtonRef}
          />
          <AnswerTypeButton
            type="Radio"
            title="Radio"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type="TextField"
            title="Text"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type="TextArea"
            title="Textarea"
            onClick={this.handleSelect}
            disabled
          />
          <AnswerTypeButton
            type="Currency"
            title="Currency"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type="Number"
            title="Number"
            onClick={this.handleSelect}
          />
          <AnswerTypeButton
            type="Date"
            title="Date"
            onClick={this.handleSelect}
            disabled
          />
          <AnswerTypeButton
            type="Time"
            title="Time"
            onClick={this.handleSelect}
            disabled
          />
          <AnswerTypeButton
            type="Select"
            title="Select list"
            onClick={this.handleSelect}
            disabled
          />
        </IconGrid>
      </Menu>
    );
  }
}

export default AnswerTypeGrid;

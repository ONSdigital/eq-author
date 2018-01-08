import React from "react";
import PropTypes from "prop-types";
import Popout from "components/Popout";
import ScaleTransition from "components/Popout/ScaleTransition";
import styled from "styled-components";
import { colors } from "constants/theme";
import AnswerTypeGrid from "./AnswerTypeGrid";
import addIcon from "./icon-add.svg";
import CustomPropTypes from "../../custom-prop-types";

export const AddAnswerBtn = styled.button`
  appearance: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: ${colors.text};
  font-size: 0.75em;

  &::before {
    vertical-align: middle;
    display: inline-block;
    content: url(${addIcon});
    margin-right: 0.6em;
  }

  &:hover {
    color: black;
  }
`;

export default class AnswerTypeSelector extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    answers: PropTypes.arrayOf(CustomPropTypes.answer).isRequired
  };

  state = {
    open: false
  };

  handleOpenToggle = open => {
    this.setState({ open });
  };

  handleSelect = type => {
    this.props.onSelect(type);
  };

  handleEntered = () => {
    this.grid.focusMenuItem();
  };

  saveGridRef = grid => {
    this.grid = grid;
  };

  render() {
    const trigger = (
      <AddAnswerBtn type="button" id="add-answer-btn">
        Add {this.props.answers.length === 0 ? "an" : "another"} answer
      </AddAnswerBtn>
    );

    return (
      <Popout
        open={this.state.open}
        transition={ScaleTransition}
        trigger={trigger}
        onToggleOpen={this.handleOpenToggle}
        onEntered={this.handleEntered}
      >
        <AnswerTypeGrid onSelect={this.handleSelect} ref={this.saveGridRef} />
      </Popout>
    );
  }
}

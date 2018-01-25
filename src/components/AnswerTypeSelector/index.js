import React from "react";
import PropTypes from "prop-types";
import Popout from "components/Popout";
import ScaleTransition from "components/Popout/ScaleTransition";
import AnswerTypeGrid from "./AnswerTypeGrid";
import addIcon from "./icon-add.svg";
import CustomPropTypes from "custom-prop-types";
import IconButton from "components/IconButton";

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
      <IconButton id="add-answer-button" icon={addIcon} clear>
        Add {this.props.answers.length === 0 ? "an" : "another"} answer
      </IconButton>
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

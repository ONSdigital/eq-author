import React from "react";
import PropTypes from "prop-types";
import Popout from "components/Popout";
import ScaleTransition from "components/Popout/ScaleTransition";
import AnswerTypeGrid from "./AnswerTypeGrid";
import AddIcon from "./icon-add.svg?inline";
import CustomPropTypes from "custom-prop-types";
import IconText from "components/IconText";
import Button from "components/Button";

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
      <Button variant="tertiary" small data-test="btn-add-answer">
        <IconText icon={AddIcon}>
          Add {this.props.answers.length === 0 ? "an" : "another"} answer
        </IconText>
      </Button>
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

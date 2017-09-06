import React, { Component } from "react";
import CustomPropTypes from "custom-prop-types";

class Answer extends Component {
  static propTypes = {
    answer: CustomPropTypes.answer
  };

  render() {
    const { answer } = this.props;
  }
}

export default Answer;

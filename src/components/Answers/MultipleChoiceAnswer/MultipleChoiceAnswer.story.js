import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { reject } from "lodash";
import MultipleChoiceAnswer from "./index";
import { CHECKBOX, RADIO } from "constants/answer-types";

const options = [
  {
    id: "0",
    label: "",
    value: "",
    description: ""
  },
  {
    id: "1",
    label: "",
    value: "",
    description: ""
  }
];

class MultipleChoiceAnswerWrapper extends React.Component {
  static propTypes = {
    type: PropTypes.string
  };

  state = {
    answer: {
      id: "0",
      options
    }
  };

  nextId = 1;

  handleAddOption = () => {
    const { answer } = this.state;
    const newOption = {
      ...options[0],
      id: (++this.nextId).toString()
    };

    const newState = {
      answer: {
        ...answer,
        options: answer.options.concat(newOption)
      }
    };

    this.setState(newState);
  };

  handleDeleteOption = id => {
    const { answer } = this.state;

    const newState = {
      answer: {
        ...answer,
        options: reject(answer.options, { id })
      }
    };

    this.setState(newState);
  };

  render() {
    return (
      <MultipleChoiceAnswer
        type={this.props.type}
        answer={this.state.answer}
        onUpdateOption={action("update option")}
        onUpdate={action("update")}
        onAddOption={this.handleAddOption}
        onDeleteOption={this.handleDeleteOption}
      />
    );
  }
}

storiesOf("AnswerTypes/MultipleChoiceAnswer", module)
  .add(RADIO, () => <MultipleChoiceAnswerWrapper type={RADIO} />)
  .add(CHECKBOX, () => <MultipleChoiceAnswerWrapper type={CHECKBOX} />);

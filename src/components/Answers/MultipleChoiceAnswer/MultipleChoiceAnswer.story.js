import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { merge, reject, set } from "lodash";
import CheckboxAnswer from "./index";

const options = [
  {
    id: 0,
    label: "",
    value: "",
    description: ""
  },
  {
    id: 1,
    label: "",
    value: "",
    description: ""
  }
];

class CheckboxAnswerWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      answer: {
        id: 0,
        options
      }
    };
    this.nextId = 1;
  }

  handleChange = ({ name, value }) => {
    this.setState(set(merge({}, this.state), name, value));
  };

  handleAddOption = () => {
    const newOption = {
      ...options[0],
      id: ++this.nextId
    };

    const newState = merge({}, this.state);
    newState.answer.options.push(newOption);
    this.setState(newState);
  };

  handleDeleteOption = optionId => {
    const newState = merge({}, this.state);
    newState.answer.options = reject(newState.answer.options, {
      id: optionId
    });
    this.setState(newState);
  };

  handleAddOther() {
    alert("Add other answer");
  }

  render() {
    return (
      <CheckboxAnswer
        answer={this.state.answer}
        onUpdateOption={action("update option")}
        onUpdate={action("update")}
        onAddOption={this.handleAddOption}
        onDeleteOption={this.handleDeleteOption}
      />
    );
  }
}

storiesOf("AnswerTypes/CheckboxAnswer", module).add("Default", () =>
  <CheckboxAnswerWrapper />
);

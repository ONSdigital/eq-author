import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { merge, reject, set } from "lodash";
import styled from "styled-components";
import CheckboxAnswer from "./index";

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

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

const answers = [
  {
    id: 0,
    options: [options[0]]
  }
];

class CheckboxAnswerWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      answers
    };
    this.nextId = 1;
  }

  handleChange = ({ name, value }) => {
    this.setState(set(merge({}, this.state), name, value));
  };

  handleAddOption = () => {
    const newOption = {
      id: ++this.nextId,
      ...options[0]
    };

    const newState = merge({}, this.state);
    newState.answers[0].options.push(newOption);
    this.setState(newState);
  };

  handleDeleteOption = optionId => {
    const newState = merge({}, this.state);
    newState.answers[0].options = reject(newState.answers[0].options, {
      id: optionId
    });
    this.setState(newState);
  };

  handleAddOther() {
    alert("Add other answer");
  }

  handleFocus() {}

  handleBlur() {}

  render() {
    return (
      <CheckboxAnswer
        answer={this.state.answers[0]}
        answerIndex={0}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onAddOption={this.handleAddOption}
        onDeleteOption={this.handleDeleteOption}
        onAddOther={this.handleAddOther}
      />
    );
  }
}

const CenterDecorator = storyFn =>
  <CenterXY>
    {storyFn()}
  </CenterXY>;

storiesOf("CheckboxAnswer", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () => <CheckboxAnswerWrapper />);

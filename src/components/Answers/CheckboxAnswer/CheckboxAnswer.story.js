import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { concat, split, merge, reject, find } from "lodash";
import styled from "styled-components";
import CheckboxAnswer from "./index";

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const createCounter = (start = 0, step = 1) => () => {
  start = start + step;
  return start;
};

const options = [
  {
    id: 1,
    label: "",
    value: "",
    description: ""
  },
  {
    id: 2,
    label: "",
    value: "",
    description: ""
  }
];

class CheckboxAnswerWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [
        {
          id: 1,
          label: "",
          value: "",
          description: ""
        }
      ]
    };
    this.nextId = createCounter();
  }

  handleChange = ({ name, value }) => {
    const [, optionToUpdate, fieldToUpdate] = split(name, /\./);

    const newState = merge({}, this.state);

    const foundOption = find(newState.options, {
      id: parseInt(optionToUpdate, 10)
    });
    merge(foundOption, { [fieldToUpdate]: value });

    this.setState(newState);
  };

  handleAddOption = () => {
    const newOption = {
      id: this.nextId(),
      label: "",
      value: "",
      description: ""
    };

    this.setState({
      options: concat(this.state.options, newOption)
    });
  };

  handleDeleteOption = e => {
    e.stopPropagation();

    const optionToDelete = split(e.target.name, /\./)[1];
    this.setState({
      options: reject(this.state.options, { id: parseInt(optionToDelete, 10) })
    });
  };

  handleAddOther() {
    alert("Add other answer");
  }

  render() {
    return (
      <CheckboxAnswer
        options={this.state.options}
        onChangeLabel={this.handleChange}
        onChangeDescription={this.handleChange}
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
  .add("Default", () =>
    <CheckboxAnswer
      onChangeLabel={action("changeLabel")}
      onChangeDescription={action("changeDescription")}
      onAddOption={action("addOption")}
      onDeleteOption={action("deleteOption")}
      onAddOther={action("addOther")}
    />
  )
  .add("Multiple options", () =>
    <CheckboxAnswer
      options={options}
      onChangeLabel={action("changeLabel")}
      onChangeDescription={action("changeDescription")}
      onAddOption={action("addOption")}
      onDeleteOption={action("deleteOption")}
      onAddOther={action("addOther")}
    />
  )
  .add("Interactive", () => <CheckboxAnswerWrapper />);

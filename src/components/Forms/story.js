import React from "react";
import { storiesOf } from "@storybook/react";

import styled from "styled-components";
import Field from "components/Forms/Field";
import Input from "components/Forms/Input";
import Label from "components/Forms/Label";
import Select from "components/Forms/Select";
import TextArea from "components/Forms/TextArea";
import Number from "components/Forms/Number";

const Width = styled.div`
  max-width: 30em;
  padding: 2em;
`;

const options = ["Default", "UKIS", "Census"];

class NumberWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      "number.input": "0"
    };
  }

  handleChange = ({ value }) => {
    this.setState({
      "number.input": value
    });
  };

  render = () =>
    <Field id="number.input">
      <Label>Name</Label>
      <Number
        onChange={this.handleChange}
        value={this.state["number.input"]}
        {...this.props}
      />
    </Field>;
}

storiesOf("Forms", module)
  .addDecorator(story =>
    <Width>
      {story()}
    </Width>
  )
  .add("Input/Text", props =>
    <Field id="name">
      <Label>Name</Label>
      <Input type="text" />
    </Field>
  )
  .add("Input/Number", props => <NumberWrapper />)
  .add("Input/Number Without Spinner", props =>
    <NumberWrapper showSpinner={false} />
  )
  .add("Input/Checkbox", props =>
    <Field id="navigation">
      <Input type="checkbox" />
      <Label inline>Navigation</Label>
    </Field>
  )
  .add("Select", () =>
    <Field id="options">
      <Label>Options</Label>
      <Select defaultValue={options[0]} options={options} />
    </Field>
  )
  .add("TextArea", () =>
    <Field id="name">
      <Label>Description</Label>
      <TextArea />
    </Field>
  );

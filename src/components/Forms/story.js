/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import styled from "styled-components";
import {
  Field,
  Input,
  Label,
  Select,
  TextArea,
  Number
} from "components/Forms";

const Width = styled.div`
  max-width: 30em;
  padding: 2em;
`;

class NumberWrapper extends React.Component {
  constructor(props) {
    super();
    this.state = {
      "number.input": props.min.toString()
    };
  }

  handleChange = ({ value }) => {
    this.setState({
      "number.input": value
    });
  };

  render = () => (
    <Field id="number.input">
      <Label>Name</Label>
      <Number
        {...this.props}
        onChange={this.handleChange}
        value={this.state["number.input"]}
      />
    </Field>
  );
}

storiesOf("Forms", module)
  .addDecorator(story => <Width>{story()}</Width>)
  .add("Input/Text", props => (
    <Field id="name">
      <Label>Name</Label>
      <Input type="text" />
    </Field>
  ))
  .add("Input/Number", props => <NumberWrapper min={0} max={100} />)
  .add("Input/Number Without Spinner", props => (
    <NumberWrapper showSpinner={false} min={0} max={100} />
  ))
  .add("Input/Number Min=1 Max=100", props => (
    <NumberWrapper min={1} max={100} />
  ))
  .add("Input/Checkbox", props => (
    <Field id="navigation">
      <Input type="checkbox" />
      <Label inline>Navigation</Label>
    </Field>
  ))
  .add("Select", () => (
    <Field id="options">
      <Label>Options</Label>
      <Select value="UKIS" onChange={action("change")}>
        <option value="Default">Default</option>
        <option value="UKIS">UKIS</option>
        <option value="Census">Census</option>
      </Select>
    </Field>
  ))
  .add("TextArea", () => (
    <Field id="name">
      <Label>Description</Label>
      <TextArea />
    </Field>
  ));

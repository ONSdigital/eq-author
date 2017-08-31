import React from "react";
import { storiesOf } from "@storybook/react";

import styled from "styled-components";
import Field from "components/Forms/Field";
import Input from "components/Forms/Input";
import Label from "components/Forms/Label";
import Select from "components/Forms/Select";
import TextArea from "components/Forms/TextArea";
import NumberInput from "components/Forms/NumberInput";

const Width = styled.div`
  max-width: 30em;
  padding: 2em;
`;

const options = ["Default", "UKIS", "Census"];

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
  .add("Input/Number", props =>
    <Field id="name">
      <Label>Name</Label>
      <NumberInput />
    </Field>
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

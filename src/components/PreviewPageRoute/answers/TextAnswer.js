import React from "react";
import { Field, Input, Label } from "./elements";

export default ({ answer }) => (
  <Field>
    <Label description={answer.description}>{answer.label}</Label>
    <Input type="text" />
  </Field>
);

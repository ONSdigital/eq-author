import React from "react";

import { Field, Label, Input } from "./elements";

const Textarea = Input.withComponent("textarea");

export default ({ answer }) => (
  <Field>
    <Label description={answer.description}>{answer.label}</Label>
    <Textarea cols="60" rows="8" />
  </Field>
);

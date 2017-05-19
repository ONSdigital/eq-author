import React from "react";
import { storiesOf } from "@kadira/storybook";
import Select from "components/Forms/Select";

const options = [
  "Default",
  "UKIS",
  "Census"
];

storiesOf("Select", module)
  .add("Default", () => (
    <Select defaultValue={options[0]} options={options} />
  ));

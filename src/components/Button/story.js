import React from "react";
import { storiesOf } from "@kadira/storybook";
import Button from "components/Button";

storiesOf("Button", module)
  .add("Primary", () => (
    <Button primary>Create survey</Button>
  ))
  .add("Primary Small", () => (
    <Button primary small>Save</Button>
  ))
  .add("Secondary", () => (
    <Button secondary>Cancel</Button>
  ))
  .add("Secondary Small", () => (
    <Button secondary small>Export</Button>
  ));

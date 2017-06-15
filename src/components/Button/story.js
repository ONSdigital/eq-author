import React from "react";
import { storiesOf } from "@kadira/storybook";
import Button from "components/Button";

storiesOf("Button", module)
  .add("Primary", () => <Button primary>Create survey</Button>)
  .add("Secondary", () => <Button secondary>Cancel</Button>);

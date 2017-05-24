import React from "react";
import { storiesOf } from "@kadira/storybook";
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";

storiesOf("ButtonGroup", module)
  .add("Vertical", props => (
    <ButtonGroup>
      <Button primary>Button 1</Button>
      <Button secondary>Button 2</Button>
      <Button secondary>Button 3</Button>
    </ButtonGroup>
  ))
  .add("Horizontal", props => (
    <ButtonGroup horizontal>
      <Button primary>Button 1</Button>
      <Button secondary>Button 2</Button>
      <Button secondary>Button 3</Button>
    </ButtonGroup>
  ));

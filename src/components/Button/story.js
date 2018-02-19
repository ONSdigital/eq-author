import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import Button from "components/Button";

const Padding = styled.div`
  padding: 2em;
`;

storiesOf("Button", module)
  .addDecorator(story => <Padding>{story()}</Padding>)
  .add("Primary", () => (
    <Button onClick={action("click")} primary>
      Create survey
    </Button>
  ))
  .add("Secondary", () => (
    <Button onClick={action("click")} secondary>
      Cancel
    </Button>
  ))
  .add("Tertiary", () => (
    <Button onClick={action("click")} tertiary>
      Abort
    </Button>
  ));

import React from "react";
import { storiesOf } from "@storybook/react";
import AnswerTypeSelector from "./index";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 1em;
  left: 1em;
`;

const Decorator = storyFn => <Wrapper>{storyFn()}</Wrapper>;

storiesOf("AnswerTypeSelector", module)
  .addDecorator(Decorator)
  .add("Default", () => (
    <AnswerTypeSelector
      answers={[]}
      onSelect={action("Answer type selected")}
    />
  ));

import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import styled from "styled-components";
import CanvasSection from "./CanvasSection";
import WrappingInput from "components/WrappingInput";

const Background = styled.div`
  padding: 1em;
  color: #fff;
`;

storiesOf("BasicSection", module)
  .addDecorator(withKnobs)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Default", () => (
    <CanvasSection
      id="foo"
      selectedSection={"foo"}
      focusOnSection={action("focused")}
      onBlur={action("blurred")}
      isFocused={boolean("focused", false)}
    >
      <WrappingInput id="foo" value="Hello World" onChange={action("change")} />
    </CanvasSection>
  ));

import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import { CanvasSection } from "./CanvasSection";
import WrappingInput from "components/WrappingInput";

storiesOf("CanvasSection", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <CanvasSection
      id="foo"
      selectedSection={"foo"}
      focusOnSection={action("focused")}
      onBlur={action("blurred")}
    >
      <WrappingInput id="foo" value="Hello World" onChange={action("change")} />
    </CanvasSection>
  ));

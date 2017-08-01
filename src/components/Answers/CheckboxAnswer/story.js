import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import CheckboxAnswer from "./index";

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const CenterDecorator = storyFn =>
  <CenterXY>
    {storyFn()}
  </CenterXY>;

storiesOf("CheckboxAnswer", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Default", () =>
    <CheckboxAnswer
      onChange={action("changed")}
      onAddOption={action("addOption")}
      onAddOther={action("addOther")}
    />
  );

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

const options = [
  {
    id: 1,
    label: "",
    value: "",
    description: ""
  },
  {
    id: 2,
    label: "",
    value: "",
    description: ""
  }
];

class InteractiveCheckboxAnswer extends React.Component {
  constructor() {
    super();
    this.state = {
      options: []
    };
  }

  addOption() {}
}

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
  )
  .add("Multiple options", () =>
    <CheckboxAnswer
      options={options}
      onChange={action("changed")}
      onAddOption={action("addOption")}
      onAddOther={action("addOther")}
    />
  );

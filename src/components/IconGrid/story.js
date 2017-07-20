import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { IconGrid, IconGridButton } from "./index";

storiesOf("IconGrid", module).add("Default", () =>
  <IconGrid>
    <IconGridButton
      icon="checkbox"
      title="checkbox"
      onChange={action("change")}
    />
    <IconGridButton
      icon="currency"
      title="currency"
      onChange={action("change")}
    />
    <IconGridButton icon="date" title="date" onChange={action("change")} />
    <IconGridButton icon="number" title="number" onChange={action("change")} />
    <IconGridButton icon="radio" title="radio" onChange={action("change")} />
    <IconGridButton icon="select" title="select" onChange={action("change")} />
    <IconGridButton
      icon="textarea"
      title="textarea"
      onChange={action("change")}
    />
    <IconGridButton
      icon="textfield"
      title="textfield"
      onChange={action("change")}
    />
    <IconGridButton icon="time" title="time" onChange={action("change")} />
  </IconGrid>
);

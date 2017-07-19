import React from "react";
import { storiesOf } from "@storybook/react";
import { IconGrid, IconGridButton } from "./index";

storiesOf("IconGrid", module).add("Default", () =>
  <IconGrid>
    <IconGridButton icon="checkbox" title="checkbox" />
    <IconGridButton icon="currency" title="currency" />
    <IconGridButton icon="date" title="date" />
    <IconGridButton icon="number" title="number" />
    <IconGridButton icon="radio" title="radio" />
    <IconGridButton icon="select" title="select" />
    <IconGridButton icon="textarea" title="textarea" />
    <IconGridButton icon="textfield" title="textfield" />
    <IconGridButton icon="time" title="time" />
  </IconGrid>
);

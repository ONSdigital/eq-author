import React from "react";
import { storiesOf } from "@storybook/react";
import { IconGrid, IconGridSVG } from "./index";

storiesOf("IconGrid", module).add("Default", () =>
  <IconGrid>
    <IconGridSVG icon="checkbox" title="checkbox" />
    <IconGridSVG icon="currency" title="currency" />
    <IconGridSVG icon="date" title="date" />
    <IconGridSVG icon="number" title="number" />
    <IconGridSVG icon="radio" title="radio" />
    <IconGridSVG icon="select" title="select" />
    <IconGridSVG icon="textarea" title="textarea" />
    <IconGridSVG icon="textfield" title="textfield" />
    <IconGridSVG icon="time" title="time" />
  </IconGrid>
);

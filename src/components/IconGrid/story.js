import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { IconGrid, IconGridButton } from "./index";
import { icons } from "components/AnswerTypeSelector/AnswerTypeButton";

storiesOf("IconGrid", module).add("Default", () =>
  <IconGrid>
    <IconGridButton
      iconSrc={icons.checkbox}
      title="checkbox"
      onClick={action("click")}
    />
    <IconGridButton
      iconSrc={icons.currency}
      title="currency"
      onClick={action("click")}
    />
    <IconGridButton
      iconSrc={icons.date}
      title="date"
      onClick={action("click")}
    />
    <IconGridButton
      iconSrc={icons.number}
      title="number"
      onClick={action("click")}
    />
    <IconGridButton
      iconSrc={icons.radio}
      title="radio"
      onClick={action("click")}
    />
    <IconGridButton
      iconSrc={icons.select}
      title="select"
      onClick={action("click")}
    />
    <IconGridButton
      iconSrc={icons.textarea}
      title="textarea"
      onClick={action("click")}
    />
    <IconGridButton
      iconSrc={icons.textfield}
      title="textfield"
      onClick={action("click")}
    />
    <IconGridButton icon="time" title="time" onClick={action("click")} />
  </IconGrid>
);

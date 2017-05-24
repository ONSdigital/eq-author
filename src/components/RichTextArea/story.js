import React from "react";
import { storiesOf } from "@kadira/storybook";
import RichTextArea from "components/RichTextArea";

storiesOf("RichTextArea", module)
  .add("Default", () => (
    <RichTextArea />
  ))
  .add("With some default text", () => (
    <RichTextArea value="This is the default text" />
  ))
  .add("With some formatted text", () => (
    <RichTextArea value="<ul><li><b>Bold</b> text</li><li><i>Italic</i> text</li></ul>" />
  ));

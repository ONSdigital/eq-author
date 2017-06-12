import React from "react";
import { storiesOf } from "@kadira/storybook";
import HTMLPreview from "components/HTMLPreview";
import questionnaireData from "components/HTMLPreview/story-data";

storiesOf("HTMLPreview", module).add("Default", () =>
  <HTMLPreview questionnaire={questionnaireData.questionnaire} />
);

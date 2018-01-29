import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

storiesOf("QuestionnaireSettingsModal", module).add("Default", () => (
  <QuestionnaireSettingsModal
    questionnaire={{}}
    isOpen
    onSubmit={action("submit")}
    onClose={action("close")}
  />
));

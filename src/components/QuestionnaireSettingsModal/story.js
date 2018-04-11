import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";
import { Provider } from "react-redux";
import configureStore from "redux/configureStore";

const store = configureStore();

storiesOf("QuestionnaireSettingsModal", module).add("Default", () => (
  <Provider store={store}>
    <QuestionnaireSettingsModal
      questionnaire={{
        id: "1",
        title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
        navigation: true
      }}
      isOpen
      onSubmit={action("submit")}
      onClose={action("close")}
      confirmText="Create"
    />
  </Provider>
));

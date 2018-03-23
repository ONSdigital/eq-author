import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { UnconnectedHeader as Header } from "components/Header";
import { MemoryRouter } from "react-router";

storiesOf("Header", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("With Utility Buttons", () => (
    <Header
      questionnaire={{ title: "My Questionnaire" }}
      signOutUser={action("sign out user")}
      raiseToast={action("copied")}
    />
  ))
  .add("Without Utility Buttons", () => (
    <Header
      signOutUser={action("sign out user")}
      raiseToast={action("copied")}
    />
  ))
  .add("With Breadcrumb", () => (
    <Header
      raiseToast={action("copied")}
      questionnaire={{ title: "My Questionnaire" }}
      signOutUser={action("sign out user")}
    />
  ));

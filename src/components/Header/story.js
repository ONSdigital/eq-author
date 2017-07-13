import React from "react";
import { storiesOf } from "@storybook/react";
import Header from "components/Header";

storiesOf("Header", module)
  .add("With Utility Buttons", () =>
    <Header questionnaire={{ title: "My Questionnaire" }} />
  )
  .add("Without Utility Buttons", () => <Header />)
  .add("With Breadcrumb", () =>
    <Header questionnaire={{ title: "My Questionnaire" }} />
  );

import React from "react";
import { storiesOf } from "@storybook/react";
import Header from "components/Header";

storiesOf("Header", module)
  .add("With Utility Buttons", () => <Header hasUtilityBtns />)
  .add("Without Utility Buttons", () => <Header hasUtilityBtns={false} />)
  .add("With Breadcrumb", () =>
    <Header breadcrumb={{ path: "", title: "My Questionnaire" }} />
  );

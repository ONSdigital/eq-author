import React from "react";
import { storiesOf } from "@storybook/react";
import Nav from "./index";

const questionnaire = {
  id: "1",
  title: "Questionnaire",
  sections: [
    {
      title: "Section 1",
      id: "0",
      pages: [
        {
          title: "Question 1.1",
          id: "2"
        }
      ]
    }
  ]
};

storiesOf("Nav", module).add("Default", () =>
  <Nav questionnaire={questionnaire} />
);

import React from "react";
import { storiesOf } from "@storybook/react";
import Nav from "components/Nav";

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

const match = {
  params: {
    questionnaireId: questionnaire.id
  }
};

storiesOf("Nav", module).add("Default", () => (
  <Nav
    questionnaire={questionnaire}
    section={questionnaire.sections[0]}
    page={questionnaire.sections[0].pages[0]}
    match={match}
  />
));

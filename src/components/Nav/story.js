import React from "react";
import { storiesOf } from "@storybook/react";
import Nav from "components/Nav";
import { MemoryRouter, Route } from "react-router";

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

storiesOf("Nav", module)
  .addDecorator(story => (
    <MemoryRouter
      initialEntries={["/questionnaire/1/design/0/2"]}
      initialIndex={0}
    >
      <Route
        path="/questionnaire/:questionnaireId/design/:sectionId/:pageId"
        exact={false}
        render={story}
      />
    </MemoryRouter>
  ))
  .add("Default", () => (
    <Nav
      questionnaire={{ questionnaire }}
      section={questionnaire.sections[0]}
      page={questionnaire.sections[0].pages[0]}
    />
  ));

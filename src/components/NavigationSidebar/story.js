import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { MemoryRouter, Route } from "react-router";

import styled from "styled-components";

import NavigationSidebar from "components/NavigationSidebar";

const Wrapper = styled.div`
  width: 20em;
`;

const questionnaire = {
  title: "Questionnaire title",
  id: "0",
  sections: [
    {
      title: "Section 1",
      id: "1",
      pages: [
        {
          title: "Question 1.1",
          id: "2"
        },
        {
          title: "Question 1.2",
          id: "3"
        }
      ]
    }
  ]
};

const props = {
  questionnaire,
  onAddPage: action("Add Page"),
  onAddSection: action("Add Section"),
  onUpdateQuestionnaire: action("onUpdateQuestionnaire")
};

storiesOf("NavigationSidebar", module)
  .addDecorator(story => (
    <MemoryRouter
      initialEntries={["/questionnaire/0/design/1/2"]}
      initialIndex={0}
    >
      <Route
        path="/questionnaire/:questionnaireId/design/:sectionId/:pageId"
        exact={false}
        render={story}
      />
    </MemoryRouter>
  ))
  .addDecorator(story => <Wrapper>{story()}</Wrapper>)
  .add("Single section", () => {
    return <NavigationSidebar {...props} />;
  })
  .add("Multiple sections", () => {
    const { questionniare, ...otherProps } = props;
    const questionnaireWithMultipleSection = {
      ...questionnaire,
      sections: [
        ...questionnaire.sections,
        {
          title: "Section 2",
          id: "4",
          pages: [
            {
              title: "Question 2.1",
              id: "5"
            },
            {
              title: "Question 2.2",
              id: "6"
            }
          ]
        }
      ]
    };

    return (
      <NavigationSidebar
        questionnaire={questionnaireWithMultipleSection}
        {...otherProps}
      />
    );
  });

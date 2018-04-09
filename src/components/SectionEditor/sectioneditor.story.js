import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import SectionEditor from "./index";
import { MemoryRouter, Route } from "react-router";
import { ApolloProvider } from "react-apollo";

const CenterXY = styled.div`
  position: absolute;
  height: 20em;
  width: 20em;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

const section = {
  id: "1",
  title: "",
  pages: [
    {
      id: "1",
      title: "",
      answers: [
        {
          id: "1",
          label: "",
          type: "Currency"
        }
      ]
    }
  ]
};

const query = () => ({
  questionnaire: {
    sections: [section]
  }
});

const client = {
  query: query,
  readQuery: query
};

const CenterDecorator = storyFn => <CenterXY>{storyFn()}</CenterXY>;

storiesOf("SectionEditor", module)
  .addDecorator(story => (
    <ApolloProvider client={client}>
      <MemoryRouter
        initialEntries={[{ pathname: "/questionnaire/1/design/1/1" }]}
        initialIndex={0}
      >
        <Route
          path="/questionnaire/:questionnaireId/design/:sectionId/:pageId"
          exact={false}
          render={story}
        />
      </MemoryRouter>
    </ApolloProvider>
  ))
  .addDecorator(CenterDecorator)
  .add("Default", () => (
    <SectionEditor section={section} onUpdate={action("onUpdate")} />
  ));

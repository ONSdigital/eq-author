import React from "react";
import { set, merge } from "lodash";
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

const sectionQuery = {
  sections: [
    {
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
    }
  ]
};

const query = () => ({
  questionnaire: {
    sections: [
      {
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
      }
    ]
  }
});

const client = {
  query: query,
  readQuery: query
};

const props = {
  onUpdate: action("onUpdate"),
  client
};

class SectionEditorWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      "section.title": "Section title",
      "section.description": "Section description"
    };
  }
  handleChange = ({ name, value }) => {
    const newState = set(merge({}, this.state), name, value);
    this.setState(newState);
  };

  render() {
    const renderStory = () => (
      <SectionEditor
        onChange={this.handleChange}
        section={sectionQuery}
        sectionTitle={this.state["section.title"]}
        sectionDescription={this.state["section.description"]}
        {...props}
      />
    );
    return (
      <ApolloProvider client={props.client}>
        <MemoryRouter
          initialEntries={[
            {
              pathname: "/questionnaire/1/design/1/1"
            }
          ]}
          initialIndex={0}
        >
          <Route
            path="/questionnaire/:questionnaireId/design/:sectionId/:pageId"
            exact={false}
            render={renderStory}
          />
        </MemoryRouter>
      </ApolloProvider>
    );
  }
}

const CenterDecorator = storyFn => <CenterXY>{storyFn()}</CenterXY>;

storiesOf("SectionEditor", module)
  .addDecorator(CenterDecorator)
  .add("Default", () => <SectionEditorWrapper />);

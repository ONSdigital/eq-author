import React from "react";
import { storiesOf } from "@storybook/react";
import QuestionnaireMeta from "components/QuestionnaireMeta";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import configureStore from "redux/configureStore";
import { Provider } from "react-redux";

const Background = styled.span`
  padding: 1em;
  display: block;
  max-width: 40em;
`;

const store = configureStore();

storiesOf("QuestionnaireMeta", module)
  .addDecorator(story => (
    <Provider store={store}>
      <Background>{story()}</Background>
    </Provider>
  ))
  .add("Empty", () => (
    <QuestionnaireMeta
      questionnaire={{
        id: "1",
        title: "",
        description: "",
        navigation: true,
        theme: "census"
      }}
      onUpdate={action("update")}
      onSubmit={action("submit")}
      confirmText="Confirm"
    />
  ))
  .add("Prefilled", () => (
    <QuestionnaireMeta
      questionnaire={{
        id: "1",
        title: "Monthly Business Survey",
        description: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        navigation: true,
        theme: "census"
      }}
      onUpdate={action("update")}
      onSubmit={action("submit")}
      confirmText="Confirm"
    />
  ));

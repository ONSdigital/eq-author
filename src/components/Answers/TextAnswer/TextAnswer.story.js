import React from "react";
import { storiesOf } from "@storybook/react";
import TextAnswer from "components/Answers/TextAnswer";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import configureStore from "redux/configureStore";
import { Provider } from "react-redux";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

const store = configureStore();

storiesOf("AnswerTypes/TextAnswer", module)
  .addDecorator(story => (
    <Provider store={store}>
      <Background>{story()}</Background>
    </Provider>
  ))
  .add("Empty", () => (
    <TextAnswer
      answer={{ id: "1", label: "", description: "" }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ))
  .add("Prefilled", () => (
    <TextAnswer
      answer={{
        id: "1",
        label: "Lorem ipsum",
        description: "Nullam id dolor id nibh ultricies."
      }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ));

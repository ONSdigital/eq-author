import React from "react";
import NumberAnswer from "components/Answers/NumberAnswer";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { Provider } from "react-redux";
import configureStore from "redux/configureStore";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;
const store = configureStore();

storiesOf("AnswerTypes/NumberAnswer", module)
  .addDecorator(story => (
    <Provider store={store}>
      <Background>{story()}</Background>
    </Provider>
  ))
  .add("Empty", () => (
    <NumberAnswer
      answer={{ id: "1", label: "", description: "" }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ))
  .add("Prefilled", () => (
    <NumberAnswer
      answer={{
        id: "1",
        label: "Lorem ipsum",
        description: "Nullam id dolor id nibh ultricies."
      }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ));

import React from "react";
import { storiesOf } from "@storybook/react";
import CurrencyAnswer from "components/Answers/CurrencyAnswer";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { Provider } from "react-redux";
import configureStore from "redux/configureStore";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;
const store = configureStore();

storiesOf("AnswerTypes/CurrencyAnswer", module)
  .addDecorator(story => (
    <Provider store={store}>
      <Background>{story()}</Background>
    </Provider>
  ))
  .add("Empty", () => (
    <CurrencyAnswer
      answer={{ id: "", label: "", description: "" }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ))
  .add("Prefilled", () => (
    <CurrencyAnswer
      answer={{
        id: "1",
        label: "Lorem ipsum",
        description: "Nullam id dolor id nibh ultricies."
      }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ));

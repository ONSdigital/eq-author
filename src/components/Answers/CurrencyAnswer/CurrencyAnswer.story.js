import React from "react";
import { storiesOf } from "@storybook/react";
import CurrencyAnswer from "components/Answers/CurrencyAnswer";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

const answer = {
  label: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

storiesOf("AnswerTypes/CurrencyAnswer", module)
  .addDecorator(story =>
    <Background>
      {story()}
    </Background>
  )
  .add("Empty", () =>
    <CurrencyAnswer
      answer={{ label: "", description: "" }}
      onUpdate={action("updated")}
    />
  )
  .add("Prefilled", () =>
    <CurrencyAnswer answer={answer} onUpdate={action("updated")} />
  );

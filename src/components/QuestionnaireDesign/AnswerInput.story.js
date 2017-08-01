import React from "react";
import { storiesOf } from "@storybook/react";
import AnswerInput from "./AnswerInput";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

storiesOf("AnswerInput", module)
  .addDecorator(story =>
    <Background>
      {story()}
    </Background>
  )
  .add("Empty", () => <AnswerInput answer={{}} onChange={action("changed")} />)
  .add("Prefilled", () =>
    <AnswerInput answer={answer} onChange={action("changed")} />
  );

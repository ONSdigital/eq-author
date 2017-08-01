import React from "react";
import { storiesOf } from "@storybook/react";
import AnswerText from "./AnswerText";
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

storiesOf("AnswerText", module)
  .addDecorator(story =>
    <Background>
      {story()}
    </Background>
  )
  .add("Empty", () => <AnswerText answer={{}} onChange={action("changed")} />)
  .add("Prefilled", () =>
    <AnswerText answer={answer} onChange={action("changed")} />
  );

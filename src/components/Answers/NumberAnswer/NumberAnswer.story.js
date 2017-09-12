import React from "react";
import { storiesOf } from "@storybook/react";
import NumberAnswer from "components/Answers/NumberAnswer";
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

storiesOf("AnswerTypes/NumberAnswer", module)
  .addDecorator(story =>
    <Background>
      {story()}
    </Background>
  )
  .add("Empty", () =>
    <NumberAnswer
      answer={{ label: "", description: "" }}
      onUpdate={action("updated")}
    />
  )
  .add("Prefilled", () =>
    <NumberAnswer answer={answer} onUpdate={action("updated")} />
  );

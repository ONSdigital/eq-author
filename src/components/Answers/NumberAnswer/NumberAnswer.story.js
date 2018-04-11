import React from "react";
import NumberAnswer from "components/Answers/NumberAnswer";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

storiesOf("AnswerTypes/NumberAnswer", module)
  .addDecorator(story => <Background>{story()}</Background>)
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

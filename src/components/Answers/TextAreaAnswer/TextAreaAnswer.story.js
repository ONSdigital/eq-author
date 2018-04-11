import React from "react";
import { storiesOf } from "@storybook/react";
import TextAreaAnswer from "components/Answers/TextAreaAnswer";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

storiesOf("AnswerTypes/TextAreaAnswer", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("Empty", () => (
    <TextAreaAnswer
      answer={{ id: "1", label: "", description: "" }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ))
  .add("Prefilled", () => (
    <TextAreaAnswer
      answer={{
        id: "1",
        label: "Lorem ipsum",
        description: "Nullam id dolor id nibh ultricies."
      }}
      onChange={action("changed")}
      onUpdate={action("updated")}
    />
  ));

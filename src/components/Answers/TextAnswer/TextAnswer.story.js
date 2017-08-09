import React from "react";
import { storiesOf } from "@storybook/react";
import TextAnswer from "./index";
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

storiesOf("TextAnswer", module)
  .addDecorator(story =>
    <Background>
      {story()}
    </Background>
  )
  .add("Empty", () => <TextAnswer answer={{}} onChange={action("changed")} />)
  .add("Prefilled", () =>
    <TextAnswer answer={answer} onChange={action("changed")} />
  );

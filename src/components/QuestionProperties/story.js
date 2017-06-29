import React from "react";
import { storiesOf } from "@storybook/react";
import QuestionProperties from "components/QuestionProperties";
import styled from "styled-components";

const Background = styled.span`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

const question = {
  type: "General"
};

storiesOf("QuestionProperties", module).add("Default", () =>
  <Background>
    <QuestionProperties question={question} />
  </Background>
);

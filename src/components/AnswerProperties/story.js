import React from "react";
import { storiesOf } from "@storybook/react";
import AnswerProperties from "components/AnswerProperties";
import styled from "styled-components";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

const question = {
  type: "General"
};

storiesOf("Answer Properties", module).add("Default", () =>
  <Background>
    <AnswerProperties question={question} />
  </Background>
);

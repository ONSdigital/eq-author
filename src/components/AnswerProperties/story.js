import React from "react";
import { storiesOf } from "@storybook/react";
import AnswerProperties from "components/AnswerProperties";
import styled from "styled-components";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

const answer = {};

storiesOf("Properties/Answer", module).add("Default", () =>
  <Background>
    <AnswerProperties answer={answer} />
  </Background>
);

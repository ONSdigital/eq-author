import React from "react";
import { storiesOf } from "@storybook/react";
import AnswerInput from "./AnswerInput";
import styled from "styled-components";

const Background = styled.div`
  padding: 1em;
  display: block;
  max-width: 20em;
`;

storiesOf("AnswerInput", module).add("Default", () =>
  <Background>
    <AnswerInput placeholder="Input text" value="" onChange="" />
  </Background>
);

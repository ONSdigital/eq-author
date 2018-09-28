import React from "react";

import {
  RADIO,
  CHECKBOX,
  TEXTAREA,
  TEXTFIELD,
  DATE,
  DATE_RANGE,
  CURRENCY,
  NUMBER
} from "constants/answer-types";

import DateAnswer from "./DateAnswer";
import DateRangeAnswer from "./DateRangeAnswer";
import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import CurrencyAnswer from "./CurrencyAnswer";
import TextAnswer from "./TextAnswer";
import TextAreaAnswer from "./TextAreaAnswer";
import styled from "styled-components";

export const answers = {
  [CHECKBOX]: MultipleChoiceAnswer,
  [RADIO]: MultipleChoiceAnswer,
  [CURRENCY]: CurrencyAnswer,
  [NUMBER]: TextAnswer,
  [TEXTFIELD]: TextAnswer,
  [TEXTAREA]: TextAreaAnswer,
  [DATE]: DateAnswer,
  [DATE_RANGE]: DateRangeAnswer
};

const Answer = styled.div`
  margin-bottom: 1em;
`;

export const renderAnswer = answer => {
  const AnswerByType = answers[answer.type];
  return (
    <Answer>
      <AnswerByType answer={answer} key={answer.id} />
    </Answer>
  );
};

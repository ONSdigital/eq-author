import React from "react";
import BasicAnswer, {
  BasicAnswerPropTypes
} from "components/Answers/BasicAnswer";
import DummyTextInput from "components/Answers/Dummy/TextInput";

const TextAnswer = props =>
  <BasicAnswer {...props}>
    <DummyTextInput />
  </BasicAnswer>;

TextAnswer.propTypes = BasicAnswerPropTypes;

export default TextAnswer;

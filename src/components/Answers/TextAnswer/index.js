import React from "react";
import BasicAnswer from "components/Answers/BasicAnswer";
import DummyTextInput from "components/Answers/Dummy/TextInput";

const TextAnswer = props =>
  <BasicAnswer {...props}>
    <DummyTextInput />
  </BasicAnswer>;

export default TextAnswer;

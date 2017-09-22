import React from "react";
import BasicAnswer from "components/Answers/BasicAnswer";
import DummyTextInput from "components/Answers/Dummy/TextInput";

const NumberAnswer = props =>
  <BasicAnswer {...props}>
    <div>
      <DummyTextInput />
    </div>
  </BasicAnswer>;

export default NumberAnswer;

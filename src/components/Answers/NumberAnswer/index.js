import React from "react";
import BasicAnswer, {
  BasicAnswerPropTypes
} from "components/Answers/BasicAnswer";
import DummyTextInput from "components/Answers/Dummy/TextInput";

const NumberAnswer = props =>
  <BasicAnswer {...props}>
    <div>
      <DummyTextInput />
    </div>
  </BasicAnswer>;

NumberAnswer.propTypes = BasicAnswerPropTypes;

export default NumberAnswer;

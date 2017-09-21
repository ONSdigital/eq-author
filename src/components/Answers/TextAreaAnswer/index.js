import React from "react";
import BasicAnswer, {
  BasicAnswerPropTypes
} from "components/Answers/BasicAnswer";
import DummyTextArea from "components/Answers/Dummy/TextArea";

const TextAreaAnswer = props =>
  <BasicAnswer {...props}>
    <div>
      <DummyTextArea rows={5} />
    </div>
  </BasicAnswer>;

TextAreaAnswer.propTypes = BasicAnswerPropTypes;

export default TextAreaAnswer;

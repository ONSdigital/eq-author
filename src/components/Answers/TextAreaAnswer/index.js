import React from "react";
import BasicAnswer from "components/Answers/BasicAnswer";
import DummyTextArea from "components/Answers/Dummy/TextArea";

const TextAreaAnswer = props =>
  <BasicAnswer {...props}>
    <div>
      <DummyTextArea rows={5} />
    </div>
  </BasicAnswer>;

export default TextAreaAnswer;

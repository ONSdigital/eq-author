import React from "react";
import BasicAnswer from "components/Answers/BasicAnswer";
import DummyTextInput from "components/Answers/Dummy/TextInput";
import styled from "styled-components";

const DummyNumberInput = styled(DummyTextInput)`
  width: 40%;
`;

const NumberAnswer = props =>
  <BasicAnswer {...props}>
    <div>
      <DummyNumberInput />
    </div>
  </BasicAnswer>;

export default NumberAnswer;

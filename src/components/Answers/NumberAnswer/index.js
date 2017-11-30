import React from "react";
import styled from "styled-components";
import BasicAnswer from "components/Answers/BasicAnswer";
import DummyTextInput from "components/Answers/Dummy/TextInput";

const Width = styled.div`
  position: relative;
  width: 50%;
`;

const NumberAnswer = props => (
  <BasicAnswer {...props}>
    <Width>
      <DummyTextInput placeholder="eg. 123" />
    </Width>
  </BasicAnswer>
);

export default NumberAnswer;

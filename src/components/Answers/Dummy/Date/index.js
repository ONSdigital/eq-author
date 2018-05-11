import React from "react";
import styled from "styled-components";

import DummyTextInput from "components/Answers/Dummy/TextInput";

const Field = styled.div`
  display: inline-block;
  margin-left: 1em;
  flex: 1 1 auto;
  pointer-events: none;

  &:first-of-type {
    margin-left: 0;
  }
`;

const SelectField = styled(Field)`
  flex: 3 3 auto;
`;

const Input = styled(DummyTextInput)`
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Label = styled.p`
  font-size: 0.9em;
  margin: 0 0 0.5rem;
`;

const Date = () => (
  <Wrapper>
    <Field>
      <Label>Day</Label>
      <Input />
    </Field>
    <SelectField>
      <Label>Month</Label>
      <Input />
    </SelectField>
    <Field>
      <Label>Year</Label>
      <Input />
    </Field>
  </Wrapper>
);

export default Date;

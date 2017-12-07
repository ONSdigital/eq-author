import React from "react";
import styled from "styled-components";

import DummyTextInput from "components/Answers/Dummy/TextInput";
import { colors } from "constants/theme";
import chevronIcon from "components/Accordion/chevron.svg";

const Field = styled.div`
  display: inline-block;
  margin-left: 1em;
  flex: 1 1 auto;

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
  width: 50%;
`;

const Select = styled(Input)`
  &::after {
    content: url(${chevronIcon});
    position: absolute;
    right: 0.75em;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 1em;
  }
`;

const Label = styled.p`
  color: ${colors.text};
  font-size: 0.9em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Date = () => (
  <Wrapper>
    <Field>
      <Label>Day</Label>
      <Input placeholder="DD" />
    </Field>
    <SelectField>
      <Label>Month</Label>
      <Select placeholder="Select month" />
    </SelectField>
    <Field>
      <Label>Year</Label>
      <Input placeholder="YYYY" />
    </Field>
  </Wrapper>
);

export default Date;

import React from "react";
import styled from "styled-components";
import DummyTextInput from "../TextInput";
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

const Flex = styled.div`
  display: flex;
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
  font-size: 0.875em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Fieldset = styled.div`
  margin-bottom: 1.125em;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Legend = styled.p`
  font-size: 1.125em;
  font-weight: bold;
  color: ${colors.text};
  margin-top: 0;
  margin-bottom: 0.875rem;
`;

export const DatePicker = () => (
  <Flex>
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
  </Flex>
);

const StyledDateRange = styled.div.attrs({
  role: "presentation"
})`
  cursor: default;
  user-select: none;
`;

const DateRange = () => (
  <StyledDateRange>
    <Fieldset>
      <Legend>Period from</Legend>
      <DatePicker />
    </Fieldset>
    <Fieldset>
      <Legend>Period to</Legend>
      <DatePicker />
    </Fieldset>
  </StyledDateRange>
);

export default DateRange;

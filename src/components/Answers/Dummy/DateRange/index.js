import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DummyTextInput from "../TextInput";
import { colors } from "constants/theme";
import chevronIcon from "components/Accordion/chevron.svg";

const GUTTER = "0.625em";

const Field = styled.div`
  display: inline-block;
  width: calc(${props => props.colWidth} - ${GUTTER});
  margin-left: ${GUTTER};

  &:first-of-type {
    margin-left: 0;
  }
`;

Field.propTypes = {
  colWidth: PropTypes.string.isRequired
};

const Input = styled(DummyTextInput)`
  width: auto;
  border-radius: 3px;
  padding: 0.875em 1em;
  border-color: #bfbfbf;
  color: #bfbfbf;
`;

const Select = styled(Input)`
  &::after {
    content: url(${chevronIcon});
    position: absolute;
    right: 0.75em;
    top: 0.75em;
  }
`;

const Label = styled.p`
  color: ${colors.text};
  font-size: 0.875em;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.75rem;
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
  <div>
    <Field colWidth="25%">
      <Label>Day</Label>
      <Input>DD</Input>
    </Field>
    <Field colWidth="50%">
      <Label>Month</Label>
      <Select>Select month</Select>
    </Field>
    <Field colWidth="25%">
      <Label>Year</Label>
      <Input>YYYY</Input>
    </Field>
  </div>
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

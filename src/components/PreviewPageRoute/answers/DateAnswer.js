import React from "react";
import styled from "styled-components";
import { Field, Input, Label } from "./elements";

import iconSelect from "./icon-select.svg";
import { colors } from "constants/theme";

const DateInput = styled(Input)`
  width: 100%;
`;

const DateFields = styled.div`
  display: flex;
  flex-direction: row;
`;

const DateField = styled.div`
  margin-right: 1em;
  flex: 1 1 0;
`;

const DayDateField = styled(DateField)`
  max-width: 6em;
`;

const MonthDateField = styled(DateField)`
  flex: 2;
  max-width: 15em;
`;

const YearDateField = styled(DateField)`
  max-width: 6em;
  margin-right: 0;
`;

const DateFieldLabel = styled.label`
  display: block;
  margin-bottom: 0.4em;
  font-weight: 600;
  font-size: 0.8em;
  line-height: 1.4;
`;

const Select = styled.select`
  display: block;
  color: inherit;
  border-right: 1px solid ${colors.grey};
  border-radius: 3px;
  transition: border-color 0.2s ease-in;
  appearance: none;
  padding: 0.6em 2em 0.6em 0.5em;
  background: white url(${iconSelect}) no-repeat center right 10px;
  background-size: 1em;
  line-height: 1.25em;
  font-size: 1em;
  width: 100%;
`;

export default ({ answer }) => {
  const { legend, label, properties } = answer;
  const dateFormat = properties.format || "dd/mm/yy";

  return (
    <Field>
      <Label description={answer.description}>{label}</Label>
      <DateFields>
        {dateFormat.includes("dd") && (
          <DayDateField>
            <DateFieldLabel>Day</DateFieldLabel>
            <DateInput placeholder="DD" />
          </DayDateField>
        )}

        {dateFormat.includes("mm") && (
          <MonthDateField>
            <DateFieldLabel>Month</DateFieldLabel>
            <Select>
              <option value="">Select month</option>
            </Select>
          </MonthDateField>
        )}

        <YearDateField>
          <DateFieldLabel>Year</DateFieldLabel>
          <DateInput placeholder="YYYY" />
        </YearDateField>
      </DateFields>
    </Field>
  );
};

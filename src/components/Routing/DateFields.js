import React from "react";
import { Fieldset, Legend, Field, Flex, Label, Input } from "./SelectorFields";

const autofocus = input => input && input.focus();

const DateFields = ({
  prefix,
  legend,
  onChange,
  onBlur,
  value,
  valid,
  doAutofocus = true
}) => (
  <Fieldset>
    <Legend valid={valid}>{legend}</Legend>
    <Flex>
      <Field>
        <Label htmlFor={`${prefix}-day`} valid={valid}>
          Day
        </Label>
        <Input
          value={value.day || ""}
          onChange={onChange}
          onBlur={onBlur}
          data-prefix={prefix}
          type="number"
          min="0"
          max="31"
          id={`${prefix}-day`}
          name={`${prefix}-day`}
          placeholder="DD"
          innerRef={doAutofocus && autofocus}
          valid={valid}
          autocomplete="off"
        />
      </Field>
      <Field>
        <Label htmlFor={`${prefix}-month`} valid={valid}>
          Month
        </Label>
        <Input
          value={value.month || ""}
          onChange={onChange}
          onBlur={onBlur}
          data-prefix={prefix}
          type="number"
          min="0"
          max="12"
          id={`${prefix}-month`}
          name={`${prefix}-month`}
          placeholder="MM"
          valid={valid}
          autocomplete="off"
        />
      </Field>
      <Field>
        <Label htmlFor={`${prefix}-year`} valid={valid}>
          Year
        </Label>
        <Input
          value={value.year || ""}
          onChange={onChange}
          onBlur={onBlur}
          data-prefix={prefix}
          type="number"
          min="1900"
          max="3000"
          id={`${prefix}-year`}
          name={`${prefix}-year`}
          placeholder="YYYY"
          valid={valid}
          autocomplete="off"
        />
      </Field>
    </Flex>
  </Fieldset>
);

export default DateFields;

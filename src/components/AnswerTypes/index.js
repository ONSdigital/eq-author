import React from 'react'

import Field from 'components/forms/Field'
import {default as SelectPrimitive} from 'components/forms/Select'
import Input from 'components/forms/Input'
import Label from 'components/forms/Label'
import {default as TextAreaPrimitive} from 'components/forms/TextArea'

export const Date = ({id, label, value}) =>
  <Field id={id}>
    <Label>{label}</Label>
    <Input type="date" value={value} />
  </Field>

export const TextField = ({id, label, value}) =>
  <Field id={id}>
    <Label>{label}</Label>
    <Input type="text" value={value} />
  </Field>

export const Currency = ({id, label, value}) =>
  <Field id={id}>
    <Label>{label}</Label>
    <Input type="text" value={value} placeholder="£" />
  </Field>

export const Percentage = ({id, label, value}) =>
  <Field id={id}>
    <Label>{label}</Label>
    <Input type="text" value={value} placeholder="%" />
  </Field>

export const Integer = ({id, label, value}) =>
  <Field id={id}>
    <Label>{label}</Label>
    <Input type="number" value={value} />
  </Field>

export const TextArea = ({id, label, value}) =>
  <Field id={id}>
    <Label>{label}</Label>
    <TextAreaPrimitive value={value} rows="10"/>
  </Field>

export const Select = ({id, label, value, options}) =>
  <Field id={id}>
    <Label>{label}</Label>
    <SelectPrimitive options={options} />
  </Field>

export const Radio = ({id, label, value, options}) =>
  <Field id={id}>
    <Options options={options} id={id} label={label} type="radio" />
  </Field>

export const Checkbox = ({id, label, value, options}) =>
  <Field id={id}>
    <Options options={options} id={id} label={label} type="checkbox" />
  </Field>

const Options = ({options, id, type, label}) =>
  <fieldset>
    <legend>{label}</legend>
    {
      options.map((option, index) => (
        <Field id={`${id}-${index}`} key={index}>
          <Input type={type} value={option.value} name={`${id}`} />
          <Label>{option.label}</Label>
        </Field>
      ))
    }
  </fieldset>

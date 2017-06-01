import React from "react";
import CustomPropTypes from "proptypes";
import { Grid, Column } from "components/Grid";
import { Field, Label, Input, Select, TextArea } from "components/Forms";

export const AnswerSettings = ({ options, ...otherProps }) => {
  return (
    <Grid>
      <Column>
        <Field id={`answers.${options.id}.displayName`}>
          <Label>Title</Label>
          <Input value={options.displayName} />
        </Field>
        <Field id={`answers.${options.id}.type`} last>
          <Label>Type</Label>
          <Select
            options={["General", "PositiveInteger"]}
            value={options.type}
          />
        </Field>
      </Column>
      <Column>
        <Field id={`answers.${options.id}.label`}>
          <Label>Label</Label>
          <TextArea value={options.label} rows={9} />
        </Field>
      </Column>
      <Column>
        <Field id={`answers.${options.id}.description`} last>
          <Label>Description</Label>
          <TextArea value={options.description} rows={9} />
        </Field>
      </Column>
    </Grid>
  );
};

AnswerSettings.propTypes = {
  options: CustomPropTypes.answer
};

export const MandatorySettings = ({ options, ...otherProps }) => (
  <Grid>
    <Column cols="4">
      <Field id={`answers.${options.id}.mandatory`}>
        <Label>Mandatory</Label>
        <Input type="checkbox" value={options.mandatory} />
      </Field>
    </Column>
    <Column cols="4">
      <Field id={`answers.${options.id}.q_code`} last>
        <Label>Q_Code</Label>
        <Input value={options.qcode} rows={4} />
      </Field>
    </Column>
  </Grid>
);

MandatorySettings.propTypes = {
  options: CustomPropTypes.answer
};

export const AnswerOptions = [
  {
    label: "Answer Settings",
    component: AnswerSettings
  },
  {
    label: "Mandatory Guidance",
    component: MandatorySettings
  }
];

import React from 'react';
import {Grid, Column} from 'components/Grid';
import {Field, Label, Input, Select, TextArea} from 'components/Forms';

export const AnswerSettings = ({options, ...otherProps}) => (
  <Grid>
    <Column>
      <Field id={`answers.${options.id}.displayName`}>
        <Label>Title</Label>
        <Input value={options.displayName} />
      </Field>
      <Field id={`answers.${options.id}.type`} last>
        <Label>Type</Label>
        <Select options={['General', 'PositiveInteger']} value={options.type} />
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

export const AnswerOptions = [
  {
    label: 'Answer Settings',
    component: AnswerSettings,
  },
];

import React from 'react';
import {Grid, Column} from 'components/Grid';
import {Field, Label, Input, TextArea} from 'components/Forms';

export const SectionSettings = ({options, ...otherProps}) => (
  <Grid>
    <Column cols="4">
      <Field id={`sections.${options.id}.title`}>
        <Label>Title</Label>
        <Input value={options.title} />
      </Field>
    </Column>
    <Column cols="4">
      <Field id={`sections.${options.id}.description`} last>
        <Label>Description</Label>
        <TextArea value={options.description} />
      </Field>
    </Column>
  </Grid>
);

export const SectionOptions = [
  {
    label: 'Section Settings',
    component: SectionSettings,
  },
];

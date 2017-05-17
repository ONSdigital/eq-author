import React from "react";
import PropTypes from "prop-types";
import { Grid, Column } from "components/Grid";
import { Field, Label, Input, TextArea } from "components/Forms";

export const SectionSettings = ({ options, ...otherProps }) => {
  return (
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
};

SectionSettings.propTypes = {
  options: PropTypes.object.isRequired
}

export const SectionOptions = [
  {
    label: "Section Settings",
    component: SectionSettings
  }
];

import React from "react";
import CustomPropTypes from "custom-prop-types";
import { Grid, Column } from "components/Grid";
import { Field, Label, Input, Select, TextArea } from "components/Forms";
import RichTextArea from "components/RichTextArea";

export const QuestionSettings = ({ options, ...otherProps }) =>
  <Grid>
    <Column>
      <Field id={`questions.${options.id}.displayName`}>
        <Label>Title</Label>
        <Input value={options.displayName} />
      </Field>
      <Field id={`questions.${options.id}.type`} last>
        <Label>Type</Label>
        <Select options={["General", "PositiveInteger"]} value={options.type} />
      </Field>
    </Column>
    <Column>
      <Field id={`questions.${options.id}.title`}>
        <Label>Label</Label>
        <TextArea value={options.title} rows={9} />
      </Field>
    </Column>
    <Column>
      <Field id={`questions.${options.id}.description`} last>
        <Label>Description</Label>
        <TextArea value={options.description} rows={9} />
      </Field>
    </Column>
  </Grid>;

QuestionSettings.propTypes = {
  options: CustomPropTypes.question
};

export const QuestionGuidance = ({ options, ...otherProps }) =>
  <Grid>
    <Column>
      <Field id={`questions.${options.id}.title`} last>
        <Label>Guidance</Label>
        <RichTextArea />
      </Field>
    </Column>
  </Grid>;

QuestionGuidance.propTypes = {
  options: CustomPropTypes.question
};

export const QuestionOptions = [
  {
    label: "Question Settings",
    component: QuestionSettings
  },
  {
    label: "Question Guidance",
    component: QuestionGuidance
  }
];

import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Grid, Column } from "components/Grid";
import { Form, Field, Input, Label } from "components/Forms";
import withEntityEditor from "components/withEntityEditor";
import questionnaireFragment from "graphql/fragments/questionnaire.graphql";
import ToggleSwitch from "components/ToggleSwitch";
import styled from "styled-components";

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.2em 0;
`;

export const StatelessQuestionnaireMeta = ({
  questionnaire,
  onSubmit,
  onChange,
  children
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Field id="title">
        <Label>Questionnaire Title</Label>
        <Input
          autoFocus
          defaultValue={questionnaire.title}
          onChange={onChange}
          required
        />
      </Field>
      <Grid>
        <Column cols={12}>
          <InlineField id="navigation">
            <Label inline>Navigation</Label>
            <ToggleSwitch
              name="navigation"
              onChange={onChange}
              checked={questionnaire.navigation}
            />
          </InlineField>
        </Column>
      </Grid>
      <Grid>
        <Column cols={12}>
          <InlineField id="summary">
            <Label inline>Summary on confirmation page</Label>
            <ToggleSwitch
              name="summary"
              onChange={onChange}
              checked={questionnaire.summary}
            />
          </InlineField>
        </Column>
      </Grid>
      {children}
    </Form>
  );
};

StatelessQuestionnaireMeta.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  questionnaire: CustomPropTypes.questionnaire
};

export default withEntityEditor("questionnaire", questionnaireFragment)(
  StatelessQuestionnaireMeta
);

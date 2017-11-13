import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Grid, Column } from "components/Grid";
import { Form, Field, Input, Label, Select, TextArea } from "components/Forms";
import { CenteredPanel } from "components/Panel";
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
  onUpdate,
  onChange,
  children
}) => {
  return (
    <CenteredPanel>
      <Form onSubmit={onSubmit}>
        <Field id="title">
          <Label>Questionnaire Title</Label>
          <Input
            autoFocus
            defaultValue={questionnaire.title}
            onChange={onChange}
            onBlur={onUpdate}
            required
          />
        </Field>
        <Field id="description">
          <Label>Description</Label>
          <TextArea
            defaultValue={questionnaire.description}
            rows={4}
            onChange={onChange}
            onBlur={onUpdate}
          />
        </Field>
        <Grid>
          <Column cols={6}>
            <Field id="theme">
              <Label>Theme</Label>
              <Select
                options={["default", "census"]}
                defaultValue={questionnaire.theme}
                onChange={onChange}
                onBlur={onUpdate}
              />
            </Field>
          </Column>
          <Column cols={6}>
            <Field id="legalBasis">
              <Label>Legal Basis</Label>
              <Select
                options={["StatisticsOfTradeAct", "Voluntary"]}
                defaultValue={questionnaire.legalBasis}
                onChange={onChange}
                onBlur={onUpdate}
              />
            </Field>
          </Column>
        </Grid>
        <Grid>
          <Column cols={6}>
            <InlineField id="navigation">
              <Label inline>
                Site Navigation{" "}
                <span style={{ color: "#676767" }}>
                  (Questionnaire content list)
                </span>
              </Label>
              <ToggleSwitch
                name="navigation"
                onChange={onChange}
                onBlur={onUpdate}
                checked={questionnaire.navigation}
              />
            </InlineField>
          </Column>
        </Grid>
        <Grid>
          <Column cols={6}>
            <InlineField id="summary">
              <Label inline>Summary on confirmation page</Label>
              <ToggleSwitch
                name="summary"
                onChange={onChange}
                onBlur={onUpdate}
                checked={questionnaire.summary}
              />
            </InlineField>
          </Column>
        </Grid>
        {children}
      </Form>
    </CenteredPanel>
  );
};

StatelessQuestionnaireMeta.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func,
  questionnaire: CustomPropTypes.questionnaire
};

export default withEntityEditor("questionnaire", questionnaireFragment)(
  StatelessQuestionnaireMeta
);

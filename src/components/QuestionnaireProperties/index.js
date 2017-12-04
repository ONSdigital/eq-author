import React from "react";
import PropTypes from "prop-types";
import CustomPropTypes from "custom-prop-types";
import { Grid, Column } from "components/Grid";
import { Field, Input, Label, Select } from "components/Forms";
import ToggleSwitch from "components/ToggleSwitch";
import styled from "styled-components";
import { partial, flip } from "lodash";

const InlineField = styled(Field)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.2em 0;
`;

const QuestionnairePropertiesPanel = styled.div`
  font-size: 1em;
`;

export const QuestionnaireProperties = ({
  questionnaire,
  onUpdate,
  onChange,
  children
}) => {
  const immediateUpdate = partial(flip(onChange), onUpdate);
  return (
    <QuestionnairePropertiesPanel>
      <Field id="title">
        <Label small>Title</Label>
        <Input
          autoFocus
          defaultValue={questionnaire.title}
          onChange={onChange}
          onBlur={onUpdate}
          required
        />
      </Field>

      <Grid>
        <Column cols={12}>
          <Field id="theme">
            <Label small>Theme</Label>
            <Select
              options={["default", "census"]}
              defaultValue={questionnaire.theme}
              onChange={onChange}
              onBlur={onUpdate}
            />
          </Field>
        </Column>
      </Grid>
      <Grid>
        <Column cols={12}>
          <Field id="legalBasis">
            <Label small>Legal Basis</Label>
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
        <Column cols={12}>
          <InlineField id="navigation">
            <Label small inline>
              Display navigation
            </Label>
            <ToggleSwitch
              name="navigation"
              onChange={immediateUpdate}
              checked={questionnaire.navigation}
            />
          </InlineField>
        </Column>
      </Grid>
      <Grid>
        <Column cols={12}>
          <InlineField id="summary">
            <Label small inline>
              Summary on confirmation page
            </Label>
            <ToggleSwitch
              name="summary"
              onChange={immediateUpdate}
              checked={questionnaire.summary}
            />
          </InlineField>
        </Column>
      </Grid>
      {children}
    </QuestionnairePropertiesPanel>
  );
};

QuestionnaireProperties.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  questionnaire: CustomPropTypes.questionnaire
};

export default QuestionnaireProperties;

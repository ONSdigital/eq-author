/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CustomPropTypes from "custom-prop-types";
import { Grid, Column } from "components/Grid";
import { Form, Field, Input, Label, Select, TextArea } from "components/Forms";

import Panel from "components/Panel";

const Center = styled.div`
  width: 100%;
  max-width: 40em;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const CreateQuestionnaire = ({
  questionnaire,
  onSubmit,
  onBlur,
  onChange,
  children
}) => {
  return (
    <Center>
      <Panel>
        <Form onSubmit={onSubmit}>
          <Field id="title">
            <Label>Questionnaire Title</Label>
            <Input
              defaultValue={questionnaire.title}
              onChange={onChange}
              onBlur={onBlur}
              required
            />
          </Field>
          <Field id="description">
            <Label>Description</Label>
            <TextArea
              defaultValue={questionnaire.description}
              rows={4}
              onChange={onChange}
              onBlur={onBlur}
              required
            />
          </Field>
          <Field id="surveyId">
            <Label>Survey ID</Label>
            <Input
              defaultValue={questionnaire.surveyId}
              onChange={onChange}
              onBlur={onBlur}
              required
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
                  onBlur={onBlur}
                />
              </Field>
            </Column>
            <Column cols={6}>
              <Field id="legal_basis">
                <Label>Legal Basis</Label>
                <Select
                  options={["StatisticsOfTradeAct", "Voluntary"]}
                  defaultValue={questionnaire.legalBasis}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </Field>
            </Column>
          </Grid>
          <Field id="navigation">
            <Input
              type="checkbox"
              defaultChecked={questionnaire.navigation}
              onChange={onChange}
              onBlur={onBlur}
            />
            <Label inline>Navigation</Label>
          </Field>
          {children}
        </Form>
      </Panel>
    </Center>
  );
};

CreateQuestionnaire.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  questionnaire: CustomPropTypes.questionnaire
};

export default CreateQuestionnaire;

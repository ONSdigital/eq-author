/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  handleSubmit,
  handleBlur,
  handleChange,
  children
}) => {
  return (
    <Center>
      <Panel>
        <Form handleSubmit={handleSubmit}>
          <Field id="title">
            <Label>Questionnaire Title</Label>
            <Input
              defaultValue={questionnaire.title}
              handleChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </Field>
          <Field id="description">
            <Label>Description</Label>
            <TextArea
              defaultValue={questionnaire.description}
              rows={4}
              handleChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </Field>
          <Grid>
            <Column cols={6}>
              <Field id="theme">
                <Label>Theme</Label>
                <Select
                  options={["default", "census", "starwars"]}
                  defaultValue={questionnaire.theme}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </Column>
            <Column cols={6}>
              <Field id="legal_basis">
                <Label>Legal Basis</Label>
                <Select
                  options={["StatisticsOfTradeAct"]}
                  defaultValue={questionnaire.legalBasis}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </Column>
          </Grid>
          <Field id="navigation">
            <Input
              type="checkbox"
              defaultChecked={questionnaire.navigation}
              handleChange={handleChange}
              onBlur={handleBlur}
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
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  questionnaire: PropTypes.shape({
    description: PropTypes.string,
    legalBasis: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string
  })
};

export default CreateQuestionnaire;

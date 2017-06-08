/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid, Column } from "components/Grid";
import { Field, Input, Label, Select } from "components/Forms";
import Panel from "components/Panel";

import LinkButton from "components/LinkButton";
import ButtonGroup from "components/ButtonGroup";

const Center = styled.div`
  width: 100%;
  max-width: 40em;
  display: flex;
  flex-direction: column;
  margin: 2em auto;
`;

const ActionButtonGroup = styled(ButtonGroup)`
  align-self: flex-start;
`;

const CreateQuestionnairePage = ({ meta, onChange }) => {
  const { title, description, theme, legal_basis } = meta;
  return (
    <Center>
      <form onChange={onChange}>
        <Panel>
          <Field id="title">
            <Label>Questionnaire Title</Label>
            <Input value={title} />
          </Field>
          <Field id="description">
            <Label>Description</Label>
            <Input value={description} />
          </Field>
          <Grid>
            <Column cols={6}>
              <Field id="id">
                <Label>Questionnaire ID</Label>
                <Input value={description} />
              </Field>
            </Column>
          </Grid>
          <Grid>
            <Column cols={6}>
              <Field id="theme">
                <Label>Theme</Label>
                <Select
                  options={["default", "census", "starwars"]}
                  value={theme}
                />
              </Field>
            </Column>
            <Column cols={6}>
              <Field id="legal_basis">
                <Label>Legal Basis</Label>
                <Select
                  options={["StatisticsOfTradeAct"]}
                  value={legal_basis}
                />
              </Field>
            </Column>
          </Grid>
          <Field id="navigation">
            <Input type="checkbox" />
            <Label inline>Navigation</Label>
          </Field>
          <ActionButtonGroup horizontal>
            <LinkButton to="/design" primary>Next</LinkButton>
            <LinkButton to="/" secondary>Cancel</LinkButton>
          </ActionButtonGroup>
        </Panel>
      </form>
    </Center>
  );
};

CreateQuestionnairePage.propTypes = {
  meta: PropTypes.shape({
    data_version: PropTypes.string,
    description: PropTypes.string,
    groups: PropTypes.array,
    id: PropTypes.string,
    legal_basis: PropTypes.string,
    mime_type: PropTypes.string,
    questionnaire_id: PropTypes.string,
    schema_version: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string
  }),
  onChange: PropTypes.func
};

export default CreateQuestionnairePage;

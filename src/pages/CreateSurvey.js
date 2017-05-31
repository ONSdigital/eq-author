/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid, Column } from "components/Grid";
import { Field, Input, Label, Select } from "components/Forms";
import RichTextArea from "components/RichTextArea";
import LinkButton from "components/LinkButton";
import ButtonGroup from "components/ButtonGroup";
import { Tabs, TabPanel, TabList, TabTitle } from "components/Tabs";

const ActionButtonGroup = styled(ButtonGroup)`
  padding: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CreateSurveyPage = ({ meta, onChange }) => {
  const { title, description, theme, legal_basis, informationToProvide } = meta;
  return (
    <div>
      <form onChange={onChange}>
        <Tabs>
          <TabList>
            <TabTitle>Survey Meta</TabTitle>
            <TabTitle>Landing Page</TabTitle>
          </TabList>

          <TabPanel>
            <Field id="title">
              <Label>Title</Label>
              <Input value={title} />
            </Field>
            <Field id="description">
              <Label>Description</Label>
              <Input value={description} />
            </Field>
            <Grid>
              <Column>
                <Field id="theme">
                  <Label>Theme</Label>
                  <Select
                    options={["default", "census", "starwars"]}
                    value={theme}
                  />
                </Field>
              </Column>
              <Column>
                <Field id="legal_basis">
                  <Label>Legal Basis</Label>
                  <Select
                    options={["StatisticsOfTradeAct"]}
                    value={legal_basis}
                  />
                </Field>
              </Column>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Field id="info-to-provide">
              <Label>Information to provide</Label>
              <RichTextArea value={informationToProvide} />
            </Field>
          </TabPanel>
        </Tabs>
      </form>
      <ActionButtonGroup horizontal>
        <LinkButton to="/design" primary>Create survey</LinkButton>
        <LinkButton to="/" secondary>Cancel</LinkButton>
      </ActionButtonGroup>
    </div>
  );
};

CreateSurveyPage.propTypes = {
  meta: PropTypes.shape({
    data_version: PropTypes.string,
    description: PropTypes.string,
    groups: PropTypes.array,
    id: PropTypes.string,
    legal_basis: PropTypes.string,
    mime_type: PropTypes.string,
    questionnaire_id: PropTypes.string,
    schema_version: PropTypes.string,
    survey_id: PropTypes.string,
    theme: PropTypes.string,
    title: PropTypes.string
  }),
  onChange: PropTypes.func
};

export default CreateSurveyPage;

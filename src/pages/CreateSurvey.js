/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import { TabbedPageLayout } from "layouts";
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

const SurveyCreatePage = ({ meta, onChange }) => {
  const { title, description, theme, legal_basis, informationToProvide } = meta;
  return (
    <TabbedPageLayout title={"Create a survey"}>
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
                  <Select options={["default", "census", "starwars"]} value={theme} />
                </Field>
              </Column>
              <Column>
                <Field id="legal_basis">
                  <Label>Legal Basis</Label>
                  <Select options={["StatisticsOfTradeAct"]} value={legal_basis} />
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
    </TabbedPageLayout>
  );
};

export default SurveyCreatePage;

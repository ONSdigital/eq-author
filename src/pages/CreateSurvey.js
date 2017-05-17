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
`;

const SurveyCreatePage = ({ survey }) => {
  const { title, description, theme, legal_basis, informationToProvide } = survey;
  return (
    <TabbedPageLayout title={"Create a survey"}>
      <div>
        <Tabs>
          <TabList>
            <TabTitle>Survey Settings</TabTitle>
            <TabTitle>Guidance</TabTitle>
          </TabList>

          <TabPanel>
            <Field id="title">
              <Label>Title</Label>
              <Input name="id" value={title} />
            </Field>
            <Field id="description">
              <Label>Description</Label>
              <Input name="number" value={description} />
            </Field>
            <Grid>
              <Column>
                <Field id="theme">
                  <Label>Theme</Label>
                  <Select
                    name="number"
                    options={["Default", "census", "starwars"]}
                    value={theme}
                  />
                </Field>
              </Column>
              <Column>
                <Field>
                  <Label>Legal Basis</Label>
                  <Select
                    name="number"
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
              <RichTextArea
                name="info-to-provide"
                value={informationToProvide}
              />
            </Field>
          </TabPanel>
        </Tabs>
      </div>
      <ActionButtonGroup horizontal>
        <LinkButton to="/design" primary>Create survey</LinkButton>
        <LinkButton to="/" secondary>Cancel</LinkButton>
      </ActionButtonGroup>
    </TabbedPageLayout>
  );
};

export default SurveyCreatePage;

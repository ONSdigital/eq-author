import React from 'react'
import styled from 'styled-components'

import {Grid, Column} from 'components/Grid'
import {Field, Input, Label, Select} from 'components/Forms'
import RichTextArea from 'components/RichTextArea'
import LinkButton from 'components/LinkButton'
import ButtonGroup from 'components/ButtonGroup'

import {Table, TableHead, TableBody, TableRow, TableCol} from 'components/Table'
import {Tabs, TabPanel, TabList, TabTitle} from 'components/Tabs'

const ActionButtonGroup = styled(ButtonGroup)`
  padding: 1em;
`

const SurveyCreatePage = () => {
  return (
    <div>
      <div>
        <Tabs>
          <TabList>
            <TabTitle>Survey Settings</TabTitle>
            <TabTitle>Guidance</TabTitle>
          </TabList>
          <TabPanel>

            <Field id="title">
              <Label>Title</Label>
              <Input name="id" />
            </Field>
            <Field id="description">
              <Label>Description</Label>
              <Input name="number" />
            </Field>

            <Grid>
              <Column>
                <Field id="theme">
                  <Label>Theme</Label>
                  <Select name="number" options={["Default", "census", "starwars"]} />
                </Field>
              </Column>
              <Column>
                <Field>
                  <Label>Legal Basis</Label>
                  <Select name="number" options={[""]} />
                </Field>
              </Column>
            </Grid>

            <Field id="error-messages">

              <Label>Error messages</Label>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCol>Key</TableCol>
                    <TableCol>Value</TableCol>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCol>MANDATORY</TableCol>
                    <TableCol>Please provide a value, even if your value is zero.</TableCol>
                  </TableRow>
                  <TableRow>
                    <TableCol>NOT_INTEGER</TableCol>
                    <TableCol>Please only enter whole numbers into the field.</TableCol>
                  </TableRow>
                  <TableRow>
                    <TableCol>NEGATIVE_INTEGER</TableCol>
                    <TableCol>The value cannot be negative. Please correct.</TableCol>
                  </TableRow>
                </TableBody>
              </Table>
            </Field>
          </TabPanel>
          <TabPanel>
            <Field id="info-to-provide">
              <Label>Information to provide</Label>
              <RichTextArea name="info-to-provide" />
            </Field>
            <Field id="basis-for-completion">
              <Label>Basis for completion</Label>
              <RichTextArea name="basis-for-completion" />
            </Field>
          </TabPanel>
        </Tabs>
      </div>
      <ActionButtonGroup horizontal>
        <LinkButton to="/design" primary>Create survey</LinkButton>
        <LinkButton to="/" secondary>Cancel</LinkButton>
      </ActionButtonGroup>
  </div>
  )
}

export default SurveyCreatePage

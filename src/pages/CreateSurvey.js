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

const SurveyCreatePage = ({survey}) => {
  const {title, description, theme, legal_basis, messages, groups} = survey
  const { information_to_provide } = groups.length ? groups[0].blocks[0] : ''
  const { basis_for_completion } = groups.length ? groups[0].blocks[0] : ''
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
                  <Select name="number" options={["Default", "census", "starwars"]} value={theme} />
                </Field>
              </Column>
              <Column>
                <Field>
                  <Label>Legal Basis</Label>
                  <Select name="number" options={["StatisticsOfTradeAct"]} value={legal_basis} />
                </Field>
              </Column>
            </Grid>

            <Field id="error-messages">

              <Label>Error messages</Label>
              {messages ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCol>Key</TableCol>
                    <TableCol>Value</TableCol>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(messages).map(key => (
                    <TableRow key={key}>
                      <TableCol>{key}</TableCol>
                      <TableCol>{messages[key]}</TableCol>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>) : (
                <p>No validation messages in schema.</p>
              )}
            </Field>
          </TabPanel>
          <TabPanel>
            <Field id="info-to-provide">
              <Label>Information to provide</Label>
              <RichTextArea name="info-to-provide" value={information_to_provide} />
            </Field>
            <Field id="basis-for-completion">
              <Label>Basis for completion</Label>
              <RichTextArea name="basis-for-completion" value={basis_for_completion}/>
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

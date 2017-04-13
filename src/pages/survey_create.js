import React from 'react'
import {Grid, Column} from '../components/Grid'
import Field from 'components/forms/Field'
import Input from 'components/forms/Input'
import Label from 'components/forms/Label'
import Select from 'components/forms/Select'
import RichTextArea from 'components/forms/RichTextArea'
import Button from 'components/Button'

import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Table, TableHead, TableBody, TableRow, TableCol} from 'components/Table'
import {Tabs, TabPanel, TabList, TabTitle} from 'components/Tabs'

const SurveyCreatePage = () => {

  const fullWidth = {
    width: '100%'
  }
  const tabListStyle = {
    border: '1px solid #ccc',
    borderBottom: '0'
  }
  const tabContentStyle = {
    border: '0',
    textAlign: 'left'
  }
  const ActionButton = styled(Button)`
    margin-right: 1em;
  `
  return (
    <div style={fullWidth}>
      <div>
        <Tabs style={fullWidth} contentStyle={tabContentStyle}>
          <TabList style={tabListStyle}>
            <TabTitle>Survey Settings</TabTitle>
            <TabTitle>Guidance</TabTitle>
          </TabList>
          <TabPanel>
            <Field id="title">
              <Label>Title</Label>
              <Input name="id" />
            </Field>
            <Field id="number">
              <Label>Description</Label>
              <Input name="number" />
            </Field>
            <Grid>
              <Column id="number">
                <Label>Theme</Label>
                <Select name="number" options={[]} />
              </Column>
              <Column id="number">
                <Label>Legal Basis</Label>
                <Select name="number" options={[]} />
              </Column>
            </Grid>
            <Field id="number">
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
            <Field id="number">
              <Label>Information to provide</Label>
              <RichTextArea name="number" />
            </Field>
            <Field id="number">
              <Label>Basis for completion</Label>
              <RichTextArea name="number" />
            </Field>
          </TabPanel>
        </Tabs>
      </div>
      <div style={tabContentStyle}>
        <Link to="/design">
          <ActionButton primary>Create survey</ActionButton>
        </Link>
        <Link to="/">
          <ActionButton secondary>Cancel</ActionButton>
        </Link>
      </div>
  </div>
  )
}

export default SurveyCreatePage

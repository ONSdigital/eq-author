import React from 'react'
import Field from '../components/forms/Field'
import Input from '../components/forms/Input'
import Label from '../components/forms/Label'
import RichTextArea from '../components/forms/RichTextArea'
import Button from '../components/Button'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Table, TableHead, TableBody, TableRow, TableCol} from '../components/Table'
import {Tabs, TabPanel, TabList, TabTitle} from '../components/Tabs'

const SurveyCreatePage = (props) => {

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
  const TwoCols = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `
  const Field50Percent = styled(Field)`
    width: 350px;
  `
  const ActionButton = styled(Button)`
    margin-right: 1em;
  `

  const {title, description, theme, legal_basis, messages} = props.file

  console.log('messages', messages)

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
              <Input name="id" value={title} />
            </Field>
            <Field id="number">
              <Label>Description</Label>
              <Input name="number" value={description} />
            </Field>
            <TwoCols>
              <Field50Percent id="number">
                <Label>Theme</Label>
                <Input name="theme" value={theme} />
              </Field50Percent>
              <Field50Percent id="number">
                <Label>Legal Basis</Label>
                <Input name="legalBasis" value={legal_basis} />
              </Field50Percent>
            </TwoCols>
            <Field id="number">
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

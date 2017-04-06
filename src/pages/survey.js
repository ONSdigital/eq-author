import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Button from '../components/Button'
import FileUpload from '../components/FileUpload'

const SurveyPage = (props) => {
  const CenteredContent = styled.div`
    width: 25vw;
    height: 30vh;
    background-color: #FFF;
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
  const VerticallySpacedButton = styled(Button)`
    margin-bottom: 2em;
  `

  const onFileSelected = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (f) => {
        const data = JSON.parse(f.target.result)
        if (props.file && confirm('This will overwrite your existing file')) {
          props.actions.loadFile(data)
          props.push('/create')
        }
      }
      fileReader.readAsText(file)
    }
  }

  return (
    <div>
      <h3>Select to</h3>
      <CenteredContent>
        <Link to="/create">
          <VerticallySpacedButton primary>Create survey</VerticallySpacedButton>
        </Link>
        <FileUpload onFileSelected={onFileSelected} accept=".json">
          <Button secondary>Load survey</Button>
        </FileUpload>
      </CenteredContent>
    </div>
  )
}

export default SurveyPage

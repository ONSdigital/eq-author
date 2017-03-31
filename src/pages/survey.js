import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Button from '../components/Button'

const SurveyPage = () => {
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
  return (
    <div>
      <h3>Select to</h3>
      <CenteredContent>
        <Link to="/create">
          <VerticallySpacedButton primary>Create survey</VerticallySpacedButton>
        </Link>
        <Button secondary>Load survey</Button>
      </CenteredContent>
    </div>
  )
}

export default SurveyPage

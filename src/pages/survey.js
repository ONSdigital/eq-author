import React from 'react'
import styled from 'styled-components'

import Button from 'components/Button'
import LinkButton from 'components/LinkButton'

const SurveyPage = () => {

  const PanelWithTitle = styled.div`
    text-align: center;
    position: relative;
    top: -4em;
  `

  const Title = styled.h1`
    font-size: 1.4em;
    font-weight: 500;
  `

  const Panel = styled.div`
    border-radius: ${props => props.theme.radiusGlobal};
    padding: 3em 3em;
    background-color: #FFF;
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.colorBorders};
  `

  const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    *:not(:last-child) {
      margin-bottom: 1.5em;
    }
  `

  return (
    <PanelWithTitle>
      <Title>Select to begin</Title>
      <Panel>
        <ButtonGroup vertical>
          <LinkButton to="/create" primary>Create survey</LinkButton>
          <Button secondary>Load survey</Button>
        </ButtonGroup>
      </Panel>
    </PanelWithTitle>
  )
}

export default SurveyPage

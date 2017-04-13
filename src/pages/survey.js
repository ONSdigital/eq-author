import React from 'react'
import styled from 'styled-components'

import Button from 'components/Button'
import ButtonGroup from 'components/ButtonGroup'
import LinkButton from 'components/LinkButton'

import Title from 'components/Title'

const Centered = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PanelWithTitle = styled.div`
  text-align: center;
  position: relative;
  top: -4em;
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
const PanelTitle = styled(Title)`
  margin-bottom: 1em;
`

const SurveyPage = () =>
  <Centered>
    <PanelWithTitle>
      <PanelTitle>Select to begin</PanelTitle>
      <Panel>
        <ButtonGroup vertical>
          <LinkButton to="/create" primary>Create survey</LinkButton>
          <Button secondary>Load survey</Button>
        </ButtonGroup>
      </Panel>
    </PanelWithTitle>
  </Centered>

export default SurveyPage

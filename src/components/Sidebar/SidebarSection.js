import React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  background: #37404A;
  padding: 1em;
`

const Title = styled.div`
  font-size: 0.7em;
  font-weight: 700;
  color: #E0E0E0;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const Section = styled.div``

const SidebarSection = styled.div``

export default (props) => (
  <SidebarSection>
    <Header>
      <Title>{props.title}</Title>
    </Header>
    <Section>
      {props.children}
    </Section>
  </SidebarSection>
)

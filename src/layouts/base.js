import React from 'react'
import styled from 'styled-components'

import App from 'components/App'
import TopBar from 'components/TopBar'

const Wrapper = styled.div`
  background-color: #F5F5F5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const BaseLayout = ({children}) => (
  <App>
    <Wrapper>
      <TopBar />
      <Main>
        {children}
      </Main>
    </Wrapper>
  </App>
)

export default BaseLayout

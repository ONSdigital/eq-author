import React from 'react'
import styled from 'styled-components'

import Title from 'components/Title'
import BaseLayout from './base'

const PageHeading = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4em 0 2em;
`
const PageBody = styled.div`
  width: 100vw;
  display: flex;
  flex: 1 1 auto;
`
const FixedWidthWrapper = styled.div`
  width: 40em;
  margin: 0 auto;
`

const TabbedPageLayout = (props) => {
  return (
    <BaseLayout>
      <PageHeading>
        <Title>{props.title}</Title>
      </PageHeading>
      <PageBody>
        <FixedWidthWrapper>
          {props.children}
        </FixedWidthWrapper>
      </PageBody>
    </BaseLayout>
  )
}

TabbedPageLayout.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default TabbedPageLayout

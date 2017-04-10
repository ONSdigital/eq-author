import React from 'react'
import styled from 'styled-components'

import BaseLayout from './base'

const TabbedPageLayout = (props) => {
  const PageHeading = styled.div`
    background-color: #FAFAFA;
    height: 230px;
    border-bottom: 1px solid #CCC;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  `
  const PageBody = styled.div`
    background-color: #fff;
    position: relative;
    top: -53px;
    display: flex;
    flex: 1 1 100%;
    min-height: 50vh
  `
  const FixedWidthWrapper = styled.div`
    text-align: center;
    width: 750px;
    margin: 0 auto;
  `
  return (
    <BaseLayout>
      <PageHeading>
        <FixedWidthWrapper>
          <h3>{props.title}</h3>
        </FixedWidthWrapper>
      </PageHeading>
      <FixedWidthWrapper>
        <PageBody>
          {props.children}
        </PageBody>
      </FixedWidthWrapper>
    </BaseLayout>
  )
}

TabbedPageLayout.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default TabbedPageLayout

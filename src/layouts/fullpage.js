import React from 'react'
import styled from 'styled-components'

import BaseLayout from './base'

const FullPageLayout = (props) => {
  const FullPage = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #F5F5F5;
    height: 94vh;
  `
  return (
    <BaseLayout>
      <FullPage>
        {props.children}
      </FullPage>
    </BaseLayout>
  )
}

export default FullPageLayout

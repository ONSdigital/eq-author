import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


import BaseLayout from './base'
import Breadcrumb from '../components/Breadcrumb'

const SidebarPageLayout = (props) => {
  const TwoColumnLayout = styled.div`
    display: flex;
    flex-direction: row;
  `
  const SidebarColumn = styled.div`
    flex: 0 0 300px;
  `
  const ContentColumn = styled.div`
    flex: 1 1 100%;
  `
  const FillHeight = styled.div`
    height: 90.7vh;
  `
  const Links = [
    <Link to="/">Survey Home</Link>,
    <Link to="/create">Create Survey</Link>,
    'Design'
  ]
  return (
    <BaseLayout>
      <Breadcrumb links={Links}/>
      <TwoColumnLayout>
        <SidebarColumn>
          <FillHeight>
          <props.sidebar />
          </FillHeight>
        </SidebarColumn>
        <ContentColumn>
          {props.children}
        </ContentColumn>
      </TwoColumnLayout>
    </BaseLayout>
  )
}

export default SidebarPageLayout

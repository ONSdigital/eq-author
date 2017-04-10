import React from 'react'

import styled from 'styled-components'

import {Link} from 'react-router-dom'
import {topBarBlue, brightText, betaTag} from '../../constants/theme'

const TopBar = () => {
  const StyledTopBar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 6vh;
  background-color: ${topBarBlue};
  color: ${brightText};
  `
  const BetaLabel = styled.span`
    color: ${betaTag};
    text-transform: uppercase;
    font-size: .7em;
    margin-left: 1em;
  `
  return (
    <Link to="/">
      <StyledTopBar>
        eQ Author <BetaLabel>Beta</BetaLabel>
      </StyledTopBar>
    </Link>
  )
}

export default TopBar

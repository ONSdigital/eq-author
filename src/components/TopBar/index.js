import React from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";
import { colors } from "constants/theme";

const StyledTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.darkBlue};
  color: ${colors.white};
  font-weight: 500;
  padding: 0.5em 0;
`;

const BetaLabel = styled.div`
  color: ${colors.orange};
  text-transform: uppercase;
  font-size: .5em;
  position: absolute;
  bottom: 1.4em;
  right: -3em;
`;

const Logo = styled(Link)`
  color: white;
  position: relative;
  text-decoration: none;
  &:hover,
  &:focus {
    color: white;
    text-decoration: none;
  }
`;

const TopBar = () => (
  <StyledTopBar>
    <Logo to="/">
      eQ Author<BetaLabel>Beta</BetaLabel>
    </Logo>
  </StyledTopBar>
);

export default TopBar;

import React from "react";
import styled from "styled-components";
import { colors } from "constants/theme";
import homeIcon from "./icon-home.svg";
import settingsIcon from "./icon-cog.svg";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";

const textInverted = "#E1E1E1";
const navBackground = "#4A4A4A";

const IconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75em;
  margin: 0;
  background: ${navBackground};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9999;
  border-bottom: 1px solid #c3c3c3;
  flex: 0 0 auto;

  & > li {
    display: flex;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  color: ${textInverted};
  text-decoration: none;

  &:link,
  &:visited {
    color: ${textInverted};
  }

  &:hover {
    color: ${colors.white};
  }
`;

const SettingsLink = styled(StyledLink)`
  font-size: 0.75em;
  font-weight: bold;
`;

const SettingsIcon = styled(SVG)`
  margin-left: 0.25em;

  & svg {
    vertical-align: middle;
  }
`;

const NavigationHeader = () => {
  return (
    <IconList>
      <li>
        <StyledLink to="/">
          <SVG uniqueHash="home-icon" src={homeIcon} />
        </StyledLink>
      </li>
      <li>
        <SettingsLink to="/">
          Settings
          <SettingsIcon uniqueHash="settings-icon" src={settingsIcon} />
        </SettingsLink>
      </li>
    </IconList>
  );
};

export default NavigationHeader;

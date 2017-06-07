import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";

import IconButton, { icons } from "components/IconButton";
import ButtonGroup from "components/ButtonGroup";
import Breadcrumb from "containers/Breadcrumb";

import { Grid, Column } from "components/Grid";

import logo from "./logo.svg";

const { previewIcon, exportIcon } = icons;

const StyledHeader = styled.header`
  height: 4em;
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background-color: ${colors.darkGrey};
  color: ${colors.white};
  font-weight: 500;
  padding: 1em 1.5em;
`;

export const Logo = styled(Link)`
  color: white;
  position: relative;
  text-decoration: none;
`;

export const UtilityBtns = styled(ButtonGroup)`
  justify-content: flex-end;
`;

export const Header = ({ hasBreadcrumbs, hasUtilityBtns }) =>
  <StyledHeader>

    <Grid align="center">

      <Column cols={3}>
        <Logo to="/">
          <img src={logo} alt="Dahl" />
        </Logo>
      </Column>

      <Column>
        {hasBreadcrumbs && <Breadcrumb />}
      </Column>

      <Column>
        {hasUtilityBtns &&
          <UtilityBtns horizontal>
            <IconButton icon={previewIcon} title="Preview" disabled />
            <IconButton icon={exportIcon} title="Export" disabled />
          </UtilityBtns>}
      </Column>

    </Grid>

  </StyledHeader>;

Header.propTypes = {
  hasBreadcrumbs: PropTypes.bool,
  hasUtilityBtns: PropTypes.bool
};

Header.defaultProps = {
  hasBreadcrumbs: true,
  hasUtilityBtns: true
};

export default Header;

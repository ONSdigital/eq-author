import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";

import IconButton from "components/IconButton";
import ButtonGroup from "components/ButtonGroup";
import Breadcrumb from "components/Breadcrumb";

import { Grid, Column } from "components/Grid";

import logo from "./logo.svg";

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

export const Header = ({ breadcrumb, hasUtilityBtns }) =>
  <StyledHeader>

    <Grid align="center">

      <Column cols={3}>
        <Logo to="/">
          <img src={logo} alt="Dahl" />
        </Logo>
      </Column>

      <Column>
        {breadcrumb && <Breadcrumb breadcrumb={breadcrumb} />}
      </Column>

      <Column>
        {hasUtilityBtns &&
          <UtilityBtns horizontal>
            <IconButton icon="preview" title="Preview" disabled />
            <IconButton icon="export" title="Export" disabled />
          </UtilityBtns>}
      </Column>

    </Grid>

  </StyledHeader>;

Header.propTypes = {
  hasUtilityBtns: PropTypes.bool,
  breadcrumb: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })
};

Header.defaultProps = {
  hasUtilityBtns: true
};

export default Header;

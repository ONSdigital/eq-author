import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "constants/theme";

import CustomPropTypes from "custom-prop-types";
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
  font-weight: 400;
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

const Header = ({ questionnaire }) =>
  <StyledHeader>
    <Grid align="center">
      <Column cols={2}>
        <Logo to="/">
          <img src={logo} alt="Dahl" />
        </Logo>
      </Column>

      <Column>
        {questionnaire && <Breadcrumb title={questionnaire.title} />}
      </Column>

      <Column>
        {questionnaire &&
          <UtilityBtns horizontal>
            <IconButton icon="preview" title="Preview" disabled />
            <IconButton icon="export" title="Export" disabled />
          </UtilityBtns>}
      </Column>
    </Grid>
  </StyledHeader>;

Header.propTypes = {
  questionnaire: CustomPropTypes.questionnaire
};

export default Header;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import App from "components/App";
import Header from "components/Header";
import Nav from "components/Nav";

import { Grid, Column } from "components/Grid";
import { colors } from "constants/theme";

const Wrapper = styled.div`
  background-color: #F5F5F5;
  height: 100vh;
  min-width: 80em;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const NavWrapper = styled.div`
  background: white;
  border-bottom: 1px solid ${colors.borders};
`;

const BaseLayout = ({ children, hasNav, ...otherProps }) =>
  <App>
    <Wrapper>
      <Header {...otherProps} />
      {hasNav &&
        <NavWrapper>
          <Grid fillHeight={false}>
            <Column offset={3}>
              <Nav />
            </Column>
          </Grid>
        </NavWrapper>}
      <Main>
        {children}
      </Main>
    </Wrapper>
  </App>;

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hasNav: PropTypes.bool
};

BaseLayout.defaultProps = {
  hasNav: true
};

export default BaseLayout;

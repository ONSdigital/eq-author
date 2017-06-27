import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import App from "components/App";
import Header from "components/Header";
import Nav from "components/Nav";

import CustomPropTypes from "custom-prop-types";
import { Grid, Column } from "components/Grid";
import { colors } from "constants/theme";

const Wrapper = styled.div`
  background-color: #F5F5F5;
  min-height: 100vh;
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

const Title = styled.div`
  font-size: 1.4em;
  font-weight: 700;
  align-self: center;
  margin: 2em 0;
`;

const BaseLayout = ({ children, title, hasNav, breadcrumb, hasUtilityBtns }) =>
  <App>
    <Wrapper>
      <Header breadcrumb={breadcrumb} hasUtilityBtns={hasUtilityBtns} />
      {hasNav &&
        <NavWrapper>
          <Grid fillHeight={false}>
            <Column offset={3}>
              <Nav />
            </Column>
          </Grid>
        </NavWrapper>}
      <Main>
        {title && <Title>{title}</Title>}
        {children}
      </Main>
    </Wrapper>
  </App>;

BaseLayout.propTypes = {
  breadcrumb: CustomPropTypes.breadcrumb,
  children: PropTypes.node.isRequired,
  hasNav: PropTypes.bool,
  hasUtilityBtns: PropTypes.bool,
  title: PropTypes.string
};

BaseLayout.defaultProps = {
  hasNav: true,
  hasUtilityBtns: false
};

BaseLayout.displayName = "BaseLayout";

export default BaseLayout;

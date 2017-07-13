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
  background-color: #f5f5f5;
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

const Title = styled.h1`
  font-size: 1.4em;
  font-weight: 700;
  align-self: center;
  margin: 2em 0;
`;

const BaseLayout = ({ children, title, questionnaire }) =>
  <App>
    <Wrapper>
      <Header questionnaire={questionnaire} />
      {questionnaire &&
        <NavWrapper>
          <Grid fillHeight={false}>
            <Column offset={2}>
              <Nav questionnaire={questionnaire} />
            </Column>
          </Grid>
        </NavWrapper>}
      <Main>
        {title &&
          <Title>
            {title}
          </Title>}
        {children}
      </Main>
    </Wrapper>
  </App>;

BaseLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  questionnaire: CustomPropTypes.questionnaire
};

export default BaseLayout;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import App from "components/App";
import TopBar from "components/TopBar";

const Wrapper = styled.div`
  background-color: #F5F5F5;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

const BaseLayout = ({ children }) => (
  <App>
    <Wrapper>
      <TopBar />
      <Main>
        {children}
      </Main>
    </Wrapper>
  </App>
);

BaseLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}

export default BaseLayout;

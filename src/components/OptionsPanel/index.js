import React from 'react';
import styled from 'styled-components';
import {colorBorders} from 'constants/theme';

const OptionsPanel = styled.div`
  background: white;
  border: 1px solid ${colorBorders};
  width: 100%;
  height: 16em;
`;

const Header = styled.div`
  height: 3em;
  border-bottom: 1px solid ${colorBorders};
  padding: 1rem;
`;

const Body = styled.div`
  padding: 1rem;
`;

export default ({children, title, ...otherProps}) => (
  <OptionsPanel {...otherProps}>
    <Header>
      {title}
    </Header>
    <Body>
      {children}
    </Body>
  </OptionsPanel>
);

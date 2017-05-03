import React, {Children, cloneElement} from 'react';

import styled from 'styled-components';

const Field = styled.div`
  display: block;
  width: 100%;
  margin-bottom: ${props => (props.last ? '0' : '2')}em;
`;

export default ({children, last, ...otherProps}) => (
  <Field last={last}>
    {Children.map(children, child => cloneElement(child, otherProps))}
  </Field>
);

import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 1em;
  width: auto;
  display: block;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colorBorders};
  &:focus {
    outline: none;
    border: 1px solid ${props => props.theme.colorLightBlue};
  }
  &[type = "checkbox"]{
    display: inline-block;
  }
`;

export default ({type = 'text', value, id, ...otherProps}) => (
  <Input type={type} defaultValue={value} id={id} name={id} {...otherProps} />
);

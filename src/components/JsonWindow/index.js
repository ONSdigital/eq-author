import React from 'react'
import styled from 'styled-components'

const StyledJsonWindow = styled.div`
  background: #333;
  padding: 1rem;
  color: white;
  font-family: monospace;
  overflow-x: scroll;
`;

const JsonWindow = ({question}) => (
  <StyledJsonWindow className="json-window">
    <pre>{JSON.stringify(question, null, 2)}</pre>
  </StyledJsonWindow>
)

export default JsonWindow

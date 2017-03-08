import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #333;
  padding: 1rem;
  color: white;
  font-family: monospace;
  overflow-x: scroll;
`;

const JsonWindow = ({question}) => (
  <Wrapper>
    <pre>{JSON.stringify(question, null, 2)}</pre>
  </Wrapper>
)

export default JsonWindow

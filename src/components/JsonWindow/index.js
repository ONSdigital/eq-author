import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #333;
  padding: 1rem;
  color: white;
  font-family: monospace;
  overflow-x: scroll;
`;

const JsonWindow = ({ schema }) => (
  <Wrapper>
    <pre>{JSON.stringify(schema, null, 2)}</pre>
  </Wrapper>
)

JsonWindow.propTypes = {
  schema: PropTypes.object.isRequired
}

export default JsonWindow;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCanvas = styled.div`
  display: flex;
`;

const Canvas = (props) => (
  <StyledCanvas>
    {props.children}
  </StyledCanvas>
)

Canvas.propTypes = {
  children: PropTypes.object.isRequired
}

export default Canvas

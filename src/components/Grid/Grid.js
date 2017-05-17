import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: flex;
  width: 100%;
  flex: 1 1 auto;
`;

const Grid = ({children}) => (
  <StyledGrid>{children}</StyledGrid>
)

Grid.propTypes = {
  children: PropTypes.oneOfType([
   PropTypes.object,
   PropTypes.array
 ]),
}

export default Grid

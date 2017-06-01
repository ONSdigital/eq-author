import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTitle = styled.div`
  font-size: 1.4em;
  font-weight: 700;
`;

const Title = ({children, ...otherProps}) => (
  <StyledTitle {...otherProps}>{children}</StyledTitle>
)

Title.propTypes = {
  children: PropTypes.string.isRequired
}

export default Title

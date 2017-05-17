import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSurveyPreview = styled.div`
`;

const SurveyPreview = ({children, ...otherProps}) => (
  <StyledSurveyPreview {...otherProps}>
    {children}
  </StyledSurveyPreview>
);

SurveyPreview.propTypes = {
  children: PropTypes.object.isRequired
}

export default SurveyPreview

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledQuestionnairePreview = styled.div`
`;

const QuestionnairePreview = ({ children, ...otherProps }) =>
  <StyledQuestionnairePreview {...otherProps}>
    {children}
  </StyledQuestionnairePreview>;

QuestionnairePreview.propTypes = {
  children: PropTypes.node.isRequired
};

export default QuestionnairePreview;

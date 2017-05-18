import React from "react";
import styled from "styled-components";

const SurveyPreview = styled.div`

`;

export default ({ children, ...otherProps }) => (
  <SurveyPreview {...otherProps}>
    {children}
  </SurveyPreview>
);

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { buildQuestionnairePath } from "utils/UrlUtils";
import { colors } from "constants/theme";
import CustomPropTypes from "custom-prop-types";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${colors.blue};

  &:hover {
    text-decoration: underline;
  }
`;

const QuestionnaireLink = ({ questionnaire, ...otherProps }) => (
  <StyledLink
    {...otherProps}
    to={buildQuestionnairePath({ questionnaireId: questionnaire.id })}
  />
);

QuestionnaireLink.propTypes = {
  questionnaire: CustomPropTypes.questionnaire
};

export default QuestionnaireLink;

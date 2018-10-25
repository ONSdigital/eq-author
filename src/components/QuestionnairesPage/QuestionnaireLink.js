import React from "react";
import PropTypes from "prop-types";
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

const DisabledLink = styled.span`
  color: ${colors.textLight};
`;

const QuestionnaireLink = ({ questionnaire, disabled, ...otherProps }) => {
  const Component = disabled ? DisabledLink : StyledLink;
  return (
    <Component
      {...otherProps}
      to={buildQuestionnairePath({ questionnaireId: questionnaire.id })}
    />
  );
};

QuestionnaireLink.defaultProps = {
  disabled: false
};

QuestionnaireLink.propTypes = {
  questionnaire: CustomPropTypes.questionnaire,
  disabled: PropTypes.bool
};

export default QuestionnaireLink;

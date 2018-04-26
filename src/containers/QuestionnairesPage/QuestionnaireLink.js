import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { getLink } from "utils/UrlUtils";
import { colors } from "constants/theme";
import CustomPropTypes from "custom-prop-types";
import { get } from "lodash";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${colors.blue};

  &:hover {
    text-decoration: underline;
  }
`;

const QuestionnaireLink = ({ questionnaire, ...otherProps }) => {
  const to = getLink(
    questionnaire.id,
    get(questionnaire, "sections[0].id"),
    get(questionnaire, "sections[0].pages[0].id")
  );

  return <StyledLink {...otherProps} to={to} />;
};

QuestionnaireLink.propTypes = {
  questionnaire: CustomPropTypes.questionnaire
};

export default QuestionnaireLink;

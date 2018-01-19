import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { getLink } from "utils/UrlUtils";
import { colors } from "constants/theme";
import CustomPropTypes from "custom-prop-types";

const QuestionnaireLink = styled(NavLink).attrs({
  to: ({ questionnaire }) =>
    getLink(
      questionnaire.id,
      questionnaire.sections[0].id,
      questionnaire.sections[0].pages[0].id
    )
})`
  text-decoration: none;
  color: ${colors.blue};
  width: 100%;
  max-width: 33em;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

QuestionnaireLink.propTypes = {
  questionnaire: CustomPropTypes.questionnaire
};

export default QuestionnaireLink;

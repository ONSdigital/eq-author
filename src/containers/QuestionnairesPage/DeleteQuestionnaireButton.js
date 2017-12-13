import styled from "styled-components";
import Button from "components/Button";

import DeleteSvg from "./deleteQuestionnaireIcon.svg";

const DeleteQuestionnaireButton = styled(Button).attrs({
  title: "Delete questionnaire"
})`
  width: 16px;
  height: 20px;
  padding: 0.5em;
  background: url(${DeleteSvg}) no-repeat;
  background-size: contain;
  border: 0;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    transition: opacity 150ms ease-in;
  }
`;

export default DeleteQuestionnaireButton;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "components/Button";

import DeleteSvg from "./deleteQuestionnaireIcon.svg";

const DeleteQuestionnaireButton = ({ onClick }) => {
  const StyledButton = styled(Button)`
    width: 16px;
    height: 20px;
    padding: .5em;
    background: url(${DeleteSvg}) no-repeat;
    background-size: contain;
    border: 0;
    opacity: .7;
    
    &:hover { 
      opacity: 1;
      transition: opacity 150ms ease-in;
    }
  `;

  return <StyledButton title="Delete questionnaire" onClick={onClick} />;
};

DeleteQuestionnaireButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteQuestionnaireButton;

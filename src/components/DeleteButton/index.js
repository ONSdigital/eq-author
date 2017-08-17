import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

const defaultSize = "1.25em";

const StyledDeleteButton = styled.button`
  color: ${colors.lightGrey};
  border: none;
  background: transparent;
  cursor: pointer;

  transition: color .2s ease-in;

  &:hover {
    color: ${colors.darkGrey};
    transition: color .2s ease-out;
  }

  font-size: ${props => {
    if (props.size === "medium") {
      return "2em";
    } else if (props.size === "large") {
      return "3em";
    } else {
      return defaultSize;
    }
  }};

  padding: 0
    ${props => {
      if (props.size === "medium" || props.size === "large") {
        return ".3em";
      } else {
        return "auto";
      }
    }};
`;

const DeleteButton = ({ onClick, size }) =>
  <StyledDeleteButton size={size} onClick={onClick}>
    &times;
  </StyledDeleteButton>;

DeleteButton.defaultProps = {
  size: "medium"
};

DeleteButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"])
};

export default DeleteButton;

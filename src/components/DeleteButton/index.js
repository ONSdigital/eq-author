import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

const sizes = {
  small: css`
    font-size: 1.25em;
  `,

  medium: css`
    font-size: 2em;
  `,

  large: css`
    font-size: 3em;
  `
};

const StyledDeleteButton = styled.button`
  color: ${colors.lightGrey};
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color 0.2s ease-in;
  width: 1em;
  height: 1em;
  line-height: 1;
  &:hover {
    color: ${colors.darkGrey};
    transition: color 0.2s ease-out;
  }

  &:focus {
    outline: 3px solid ${colors.orange};
  }

  ${props => sizes[props.size]};
`;

const DeleteButton = props => (
  <StyledDeleteButton {...props}>&times;</StyledDeleteButton>
);

DeleteButton.defaultProps = {
  size: "medium",
  type: "button",
  "aria-label": "Delete"
};

DeleteButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"])
};

export default DeleteButton;

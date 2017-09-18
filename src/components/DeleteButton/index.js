import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

const sizes = {
  small: css`
    font-size: 1.25em;
    padding: 0 auto;
  `,

  medium: css`
    font-size: 2em;
    padding: .3em;
  `,

  large: css`
    font-size: 3em;
    padding: .3em;
  `
};

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

  ${props => sizes[props.size]};
`;

const DeleteButton = props =>
  <StyledDeleteButton {...props}>&times;</StyledDeleteButton>;

DeleteButton.defaultProps = {
  size: "medium",
  type: "button",
  "aria-label": "Delete"
};

DeleteButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"])
};

export default DeleteButton;

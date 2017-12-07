import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "constants/theme";

const Button = styled.button`
  width: 8em;
  height: 6em;
  margin: 0.5em;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 2px solid transparent;
  opacity: 1;
  transition: all 200ms ease-in-out;
  outline: none;

  &:hover {
    border-color: ${colors.borders};
  }

  &:focus {
    border-color: ${colors.lightBlue};
  }

  &[disabled] {
    opacity: 0.5;
    background-color: transparent;
    cursor: default;
    pointer-events: none;
  }
`;

const Title = styled.h3`
  margin: 0;
  padding-top: 0.5em;
  font-weight: 400;
`;

const IconGridButton = ({ iconSrc, title, disabled, onClick }) => {
  return (
    <Button
      role="menuitem"
      title={title}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <img src={iconSrc} alt={title} />
      <Title>{title}</Title>
    </Button>
  );
};

IconGridButton.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default IconGridButton;

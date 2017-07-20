import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { keys } from "lodash";

import checkboxIcon from "./icons/checkbox.svg";
import currencyIcon from "./icons/currency.svg";
import dateIcon from "./icons/date.svg";
import numberIcon from "./icons/number.svg";
import radioIcon from "./icons/radio.svg";
import selectIcon from "./icons/select.svg";
import textareaIcon from "./icons/textarea.svg";
import textfieldIcon from "./icons/textfield.svg";
import timeIcon from "./icons/time.svg";

export const icons = {
  checkbox: checkboxIcon,
  currency: currencyIcon,
  date: dateIcon,
  number: numberIcon,
  radio: radioIcon,
  select: selectIcon,
  textarea: textareaIcon,
  textfield: textfieldIcon,
  time: timeIcon
};

const Button = styled.button`
  width: 8em;
  height: 5em;
  margin: 1em;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: none;
  opacity: 1;
  transition: all 200ms ease-in-out;
  &:hover,
  &:focus {
    background-color: #eaeaea;
  }
  &[disabled] {
    opacity: 0.5;
  }
`;

const Title = styled.h3`
  margin: 0;
  padding-top: 0.5em;
  font-weight: normal;
`;

const IconGridButton = ({ icon, title, disabled, handleClick }) => {
  return (
    <Button
      role="menuitem"
      title={title}
      onClick={handleClick}
      disabled={disabled}
    >
      <img src={icons[icon]} alt={title} />
      <Title>
        {title}
      </Title>
    </Button>
  );
};

IconGridButton.propTypes = {
  icon: PropTypes.oneOf(keys(icons)),
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func
};

export default IconGridButton;

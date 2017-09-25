import React from "react";
import PropTypes from "prop-types";
import { IconGridButton } from "components/IconGrid";
import { keys } from "lodash";

import checkboxIcon from "./icons/checkbox.svg";
import currencyIcon from "./icons/currency.svg";
import dateIcon from "./icons/date.svg";
import numberIcon from "./icons/integer.svg";
import radioIcon from "./icons/radio.svg";
import selectIcon from "./icons/select.svg";
import textareaIcon from "./icons/textarea.svg";
import textfieldIcon from "./icons/textfield.svg";
import timeIcon from "./icons/time.svg";

export const icons = {
  Checkbox: checkboxIcon,
  Currency: currencyIcon,
  Date: dateIcon,
  Integer: numberIcon,
  Radio: radioIcon,
  Select: selectIcon,
  TextArea: textareaIcon,
  TextField: textfieldIcon,
  Time: timeIcon
};
export default class AnswerTypeButton extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(keys(icons)).isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  handleClick = () => {
    this.props.onClick(this.props.type);
  };

  render() {
    return (
      <IconGridButton
        disabled={this.props.disabled}
        iconSrc={icons[this.props.type]}
        onClick={this.handleClick}
        title={this.props.title}
      />
    );
  }
}

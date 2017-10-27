import React from "react";
import PropTypes from "prop-types";
import { IconGridButton } from "components/IconGrid";
import { keys } from "lodash";
import * as AnswerTypes from "constants/answer-types";

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
  [AnswerTypes.CHECKBOX]: checkboxIcon,
  [AnswerTypes.CURRENCY]: currencyIcon,
  [AnswerTypes.DATE]: dateIcon,
  [AnswerTypes.DATE_RANGE]: dateIcon,
  [AnswerTypes.NUMBER]: numberIcon,
  [AnswerTypes.RADIO]: radioIcon,
  [AnswerTypes.SELECT]: selectIcon,
  [AnswerTypes.TEXTAREA]: textareaIcon,
  [AnswerTypes.TEXTFIELD]: textfieldIcon,
  [AnswerTypes.TIME]: timeIcon
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

import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import AutoResizeTextArea from "react-textarea-autosize";
import withChangeHandler from "components/Forms/withChangeHandler";
import { colors } from "constants/theme";
import { rgba } from "polished";
import { invoke } from "lodash";

const ENTER_KEY = 13;

/**
 * 1.75em  = 28px/16px
 * 1.125em = 18px/16px
 * 0.875em = 14px/16px
 */
const sizes = {
  large: css`
    font-size: 1.75em;
    font-weight: 700;
  `,

  medium: css`
    font-size: 1.125em;
    font-weight: 700;
  `,

  small: css`
    font-size: 0.875em;
  `
};

const TextArea = styled(AutoResizeTextArea)`
  resize: none;
  border: none;
  padding: 0;
  color: ${colors.darkGrey};
  display: block;
  width: 100%;
  ${props => sizes[props.size]};
  transition: outline-color 100ms ease-in;
  outline: 1px solid transparent;
  outline-offset: 0.25rem;

  &:hover {
    outline-color: ${rgba(colors.blue, 0.5)};
  }

  &:focus {
    outline-color: ${colors.blue};
  }

  &::placeholder {
    color: #a3a3a3;
  }
`;

class WrappingTextArea extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    size: PropTypes.oneOf(Object.keys(sizes))
  };

  static defaultProps = {
    size: "small"
  };

  handleChange = e => {
    e.target.value = e.target.value.replace(/\n/g, " ");
    this.props.onChange(e);
  };

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      e.preventDefault();
    }

    invoke(this.props, "onKeyDown", e);
  };

  render() {
    return (
      <TextArea
        {...this.props}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default withChangeHandler(WrappingTextArea);

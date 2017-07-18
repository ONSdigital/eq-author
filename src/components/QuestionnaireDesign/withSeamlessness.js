import styled, { css } from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

/**
 * 1.75em  = 28px/16px
 * 1.125em = 18px/16px
 * 0.875em = 14px/16px
 */
const sizes = {
  large: css`
    font-size: 1.75em;
    font-weight: bold;
  `,

  medium: css`
    font-size: 1.125em;
    font-weight: bold;
  `,

  small: css`
    font-size: 0.875em;
  `
};

const styles = css`
  border: none;
  padding: 0;
  color: ${colors.darkGrey};
  outline: none;
  display: block;
  width: 100%;

  ${props => sizes[props.size]}

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #a3a3a3;
  }

  &[aria-hidden="true"] {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
`;

const withSeamlessness = WrappedComponent => {
  const StyledSeamless = styled(WrappedComponent)`
    ${styles}
  `;

  return class extends React.Component {
    static defaultProps = {
      size: "small",
      optional: false,
      focused: false
    };

    static propTypes = {
      id: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
      focused: PropTypes.bool,
      optional: PropTypes.bool,
      autoFocus: PropTypes.bool,
      placeholder: PropTypes.string,
      size: PropTypes.oneOf(Object.keys(sizes))
    };

    static displayName = `withSeamlessness(${WrappedComponent.displayName})`;

    render() {
      const {
        id,
        optional,
        value,
        focused,
        placeholder,
        autoFocus,
        size,
        onChange
      } = this.props;

      const shouldBeHidden = optional && !value && !focused;

      return (
        <StyledSeamless
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          name={id}
          size={size}
          aria-hidden={shouldBeHidden}
        />
      );
    }
  };
};

export default withSeamlessness;

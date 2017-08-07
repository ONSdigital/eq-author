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

const styles = css`
  border: none;
  padding: 0;
  color: ${colors.darkGrey};
  outline: none;
  display: block;
  width: 100%;
  transition: opacity 200ms ease-out;

  ${props => sizes[props.size]}

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #a3a3a3;
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
      size: PropTypes.oneOf(Object.keys(sizes)),
      className: PropTypes.string
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
        onChange,
        className,
        ...otherProps
      } = this.props;

      return (
        <StyledSeamless
          className={className}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          name={id}
          size={size}
          {...otherProps}
        />
      );
    }
  };
};

export default withSeamlessness;

import styled, { css } from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { colors } from "constants/theme";
import { transparentize } from "polished";

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
  transition: outline-color 100ms ease-in;
  ${props => sizes[props.size]};

  outline: 1px solid transparent;
  outline-offset: 0.25rem;

  &:hover {
    outline-color: ${transparentize(0.5, colors.blue)};
  }

  &:focus {
    outline-color: ${colors.blue};
  }

  &::placeholder {
    color: #a3a3a3;
  }
`;

const withSeamlessness = WrappedComponent => {
  const StyledSeamless = styled(WrappedComponent)`
    ${styles};
  `;

  return class extends React.Component {
    static defaultProps = {
      size: "small"
    };

    static propTypes = {
      id: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
      placeholder: PropTypes.string,
      size: PropTypes.oneOf(Object.keys(sizes)),
      className: PropTypes.string
    };

    static displayName = `withSeamlessness(${WrappedComponent.displayName})`;

    render() {
      const {
        id,
        value,
        placeholder,
        size,
        onChange,
        className,
        ...otherProps
      } = this.props;

      return (
        <StyledSeamless
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={id}
          id={id}
          size={size}
          {...otherProps}
        />
      );
    }
  };
};

export default withSeamlessness;

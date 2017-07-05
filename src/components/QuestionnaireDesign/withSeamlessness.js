import styled, { css } from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { colors } from "constants/theme";

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
      focussed: false
    };

    static propTypes = {
      id: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
      focussed: PropTypes.bool,
      optional: PropTypes.bool,
      autoFocus: PropTypes.bool,
      placeholder: PropTypes.string,
      size: PropTypes.oneOf(Object.keys(sizes))
    };

    static displayName = `withSeamlessness(${WrappedComponent.displayName})`;

    handleChange = e => {
      this.props.onChange({
        name: this.props.id,
        value: e.target.value
      });
    };

    render() {
      const {
        id,
        optional,
        value,
        focussed,
        placeholder,
        autoFocus,
        size
      } = this.props;
      const shouldBeHidden = optional && !value && !focussed;

      return (
        <StyledSeamless
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChange={this.handleChange}
          name={id}
          size={size}
          aria-hidden={shouldBeHidden}
        />
      );
    }
  };
};

export default withSeamlessness;

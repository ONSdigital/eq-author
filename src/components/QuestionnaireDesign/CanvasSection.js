import React, { cloneElement, Component, Children } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import styled from "styled-components";
import { colors } from "constants/theme";
import { transparentize } from "polished";

const StyledCanvasSection = styled.div`
  padding: 2em 2.5em;
  margin-bottom: -2px;
  border-bottom: 2px dashed #c6c6c6;

  transition: outline-color 0.1s ease-in;
  outline-offset: -2px;
  outline-width: 2px;
  outline-style: solid;
  outline-color: ${props =>
    props.focused ? `${colors.lightBlue} !important` : "transparent"};

  &:hover {
    outline-color: ${transparentize(0.6, colors.lightBlue)};
  }

  &:last-child {
    border: none;
  }
`;

export default class CanvasSection extends Component {
  static propTypes = {
    children: PropTypes.node,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    focused: PropTypes.bool,
    id: PropTypes.string
  };

  static defaultProps = {
    onFocus: noop,
    onBlur: noop,
    focused: false
  };

  handleFocus = e => {
    this.props.onFocus(this.props.id);
  };

  handleBlur = e => {
    this.props.onBlur(null);
  };

  render() {
    const { children, focused } = this.props;

    return (
      <StyledCanvasSection
        onClick={this.handleFocus}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        focused={focused}
      >
        {Children.map(children, child => cloneElement(child, { focused }))}
      </StyledCanvasSection>
    );
  }
}

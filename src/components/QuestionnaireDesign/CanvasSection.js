import React, { cloneElement, Component, Children } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import styled from "styled-components";
import { colors } from "constants/theme";
import { transparentize } from "polished";

const StyledCanvasSection = styled.div`
  padding: 2em 2.625em;
  margin-bottom: -2px;
  border-bottom: 2px dashed #c6c6c6;
  outline-offset: -2px;
  outline: ${props =>
    props.focused ? `2px solid ${colors.lightBlue} !important` : "none"};

  &:last-child {
    border: none;
  }
  &:hover {
    outline: 2px solid ${transparentize(0.6, colors.lightBlue)};
  }
`;

export default class CanvasSection extends Component {
  static propTypes = {
    children: PropTypes.node,
    onFocus: PropTypes.func,
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

  render() {
    const { children, focused } = this.props;

    return (
      <StyledCanvasSection onFocus={this.handleFocus} focused={focused}>
        {Children.map(children, child => cloneElement(child, { focused }))}
      </StyledCanvasSection>
    );
  }
}

import React, { cloneElement, Component, Children } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import styled from "styled-components";
import { colors } from "constants/theme";

const StyledPageSection = styled.div`
  padding: 2em 2.625em;
  margin-bottom: -2px;
  border-bottom: 2px dashed #c6c6c6;
  outline-offset: -3px;
  outline: ${props =>
    props.focussed ? `3px solid ${colors.lightBlue}` : "none"};

  &:last-child {
    border: none;
  }
  &:hover {
    outline: 3px solid ${colors.lightBlue};
  }
`;

export default class PageSection extends Component {
  static propTypes = {
    children: PropTypes.node,
    onFocus: PropTypes.func,
    focussed: PropTypes.bool,
    id: PropTypes.string
  };

  static defaultProps = {
    onFocus: noop,
    onBlur: noop,
    focussed: false
  };

  handleFocus = e => {
    this.props.onFocus(this.props.id);
  };

  render() {
    const { children, focussed } = this.props;

    return (
      <StyledPageSection onFocus={this.handleFocus} focussed={focussed}>
        {Children.map(children, child => cloneElement(child, { focussed }))}
      </StyledPageSection>
    );
  }
}

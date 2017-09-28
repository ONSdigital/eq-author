import React from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import PropTypes from "prop-types";

const Animated = styled.div`
  transform-origin: center center;
  transition: opacity ${props => props.duration / 4}ms ease-in,
    transform ${props => props.duration}ms cubic-bezier(0.175, 0.885, 0.32, 1.4);
  transform: translateY(-3rem) scale(1);

  &.popup-enter {
    opacity: 0.01;
    transform: translateY(0) scale(0.6);
  }

  &.popup-enter-active {
    opacity: 1;
    transform: translateY(-3rem) scale(1);
  }

  &.popup-exit {
    opacity: 1;
    transform: translateY(-3rem) scale(1);
    transition: opacity ${props => props.duration / 4}ms ease-in,
      transform ${props => props.duration}ms ease-in;
  }

  &.popup-exit-active {
    opacity: 0.01;
    transform: translateY(0) scale(0.6);
  }
`;

class PopupTransition extends React.Component {
  static defaultProps = {
    duration: 250,
    in: false
  };

  static propTypes = {
    duration: PropTypes.number,
    children: PropTypes.element
  };

  render() {
    const { duration, children, ...otherProps } = this.props;
    return (
      <CSSTransition timeout={duration} {...otherProps} classNames="popup">
        <Animated duration={duration}>{children}</Animated>
      </CSSTransition>
    );
  }
}

export default PopupTransition;

import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import styled from "styled-components";

const timeout = props => props.timeout;
const halfTimeout = props => props.timeout / 2;

const handleExit = node => {
  const { height } = node.getBoundingClientRect();
  node.style.height = `${height}px`;
};

const Transition = styled(CSSTransition).attrs({
  classNames: "transition",
  onExit: () => handleExit
})`
  position: relative;

  &.transition-enter {
    opacity: 0;
    z-index: 200;
  }

  &.transition-enter-active {
    opacity: 1;
    transition: opacity ${timeout}ms ease-out;
  }

  &.transition-exit {
    opacity: 1;
  }

  &.transition-exit-active {
    opacity: 0;
    height: 0 !important;

    transition: opacity ${halfTimeout}ms ease-out,
      height ${halfTimeout}ms ease-in ${halfTimeout}ms;
  }
`;

Transition.propTypes = {
  timeout: PropTypes.number,
  children: PropTypes.element
};

Transition.defaultProps = {
  timeout: 200
};

export default Transition;

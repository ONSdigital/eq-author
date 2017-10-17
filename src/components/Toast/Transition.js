import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const ToastTransition = styled(CSSTransition).attrs({
  classNames: "toast"
})`
  transition: transform ${props => props.timeout}ms ease-out,
    opacity ${props => props.timeout}ms ease-out;
  transform: translateY(0);

  &.toast-enter {
    opacity: 0;
    transform: translateY(50%);
  }

  &.toast-enter.toast-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  &.toast-exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.toast-exit.toast-exit-active {
    opacity: 0;
    transform: translateY(-50%);
  }
`;

ToastTransition.defaultProps = {
  in: false,
  timeout: 250
};

ToastTransition.propTypes = {
  timeout: PropTypes.number,
  children: PropTypes.element
};

export default ToastTransition;

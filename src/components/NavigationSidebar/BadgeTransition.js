import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const timeout = props => props.timeout;

const NavItemTransition = styled(CSSTransition).attrs({
  classNames: "badge"
})`
  &.badge-enter {
    opacity: 0.01;
    transform: scale(0);
  }

  &.badge-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity ${timeout}ms ease-out,
      transform ${timeout}ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &.badge-exit {
    opacity: 1;
  }

  &.badge-exit-active {
    opacity: 0.01;
    transition: opacity ${timeout}ms ease-ease-in-out;
  }
`;

NavItemTransition.defaultProps = {
  in: true,
  timeout: 200
};

NavItemTransition.propTypes = {
  timeout: PropTypes.number,
  children: PropTypes.element
};

export default NavItemTransition;

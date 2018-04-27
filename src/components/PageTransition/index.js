import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const timeout = props => props.timeout;

const PageTransition = styled(CSSTransition).attrs({
  classNames: "page"
})`
  &.page-enter {
    opacity: 0;
  }

  &.page-enter-active {
    opacity: 1;
    transition: opacity ${timeout}ms ease-out, transform ${timeout}ms ease-out;
  }
`;

PageTransition.defaultProps = {
  in: false,
  enter: true,
  exit: false,
  timeout: 300
};

PageTransition.propTypes = {
  timeout: PropTypes.number,
  children: PropTypes.element
};

export default PageTransition;

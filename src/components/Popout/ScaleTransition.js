import React from "react";
import { CSSTransition } from "react-transition-group";
import { css } from "styled-components";

const FADE_TIMEOUT = 250;

export const styles = css`transform-origin: bottom left;

  transition: transform ${FADE_TIMEOUT / 2}ms;

  > * {
    transition: opacity ${FADE_TIMEOUT / 2}ms ${FADE_TIMEOUT / 2}ms;
  }

  &.scale-enter {
    transform: scale(0);

    > * {
      opacity: 0;
    }
  }

  &.scale-enter-active {
    transform: scale(1);

    > * {
      opacity: 1;
    }
  }

  &.scale-exit {
    transform: scale(1);
    transition: transform ${FADE_TIMEOUT / 2}ms ${FADE_TIMEOUT / 2}ms;

    > * {
      transition: opacity ${FADE_TIMEOUT / 2}ms;
      opacity: 1;
    }
  }

  &.scale-exit-active {
    transform: scale(0);

    > * {
      opacity: 0;
    }
  }`;

class ScaleTransition extends React.Component {
  static defaultProps = {
    in: false,
    timeout: FADE_TIMEOUT
  };

  render() {
    return <CSSTransition {...this.props} classNames="scale" />;
  }
}

export default ScaleTransition;

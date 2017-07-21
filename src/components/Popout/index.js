/* eslint-disable react/no-find-dom-node */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import uncontrollable from "uncontrollable";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ESC_KEY_CODE = 27;

const Container = styled.div`position: relative;`;

const Layer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const DefaultTransition = props =>
  <CSSTransition {...props} timeout={0} classNames="" />;

class Popout extends React.Component {
  static propTypes = {
    trigger: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    onToggleOpen: PropTypes.func.isRequired,
    transition: PropTypes.any // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    open: false,
    transition: DefaultTransition
  };

  bindRootCloseHandlers() {
    document.addEventListener("click", this.handleDocumentClick);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  unbindRootCloseHandlers() {
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  componentWillMount() {
    if (this.props.open) {
      this.bindRootCloseHandlers();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.bindRootCloseHandlers();
    } else {
      this.unbindRootCloseHandlers();
    }
  }

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }

  handleKeyUp = e => {
    if (e.keyCode === ESC_KEY_CODE) {
      this.handleClose();
    }
  };

  handleDocumentClick = e => {
    if (!ReactDOM.findDOMNode(this).contains(e.target)) {
      this.handleClose();
    }
  };

  handleToggleOpen = e => {
    this.props.onToggleOpen(!this.props.open);
  };

  handleClose = () => {
    this.props.onToggleOpen(false);
  };

  renderContent() {
    const { children, transition: Transition } = this.props;

    return (
      <Transition>
        {React.Children.only(children)}
      </Transition>
    );
  }

  render() {
    return (
      <Container>
        {React.cloneElement(this.props.trigger, {
          onClick: this.handleToggleOpen,
          "aria-haspopup": true,
          "aria-expanded": this.props.open
        })}

        <TransitionGroup component={Layer}>
          {this.props.open ? this.renderContent() : null}
        </TransitionGroup>
      </Container>
    );
  }
}

export default Popout;
export const UncontrolledPopout = uncontrollable(Popout, {
  open: "onToggleOpen"
});
